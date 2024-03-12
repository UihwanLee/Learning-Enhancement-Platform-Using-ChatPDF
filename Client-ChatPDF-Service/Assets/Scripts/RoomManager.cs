using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using static Unity.VisualScripting.Metadata;

public class RoomManager : MonoBehaviour
{
    [Header("Room")]
    // Room 생성될 부모 오브젝트
    [SerializeField]
    private GameObject parent;

    // Room 프리팹
    [SerializeField]
    private GameObject prefab;

    // Room 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    [Header("UI")]
    // Title InputField
    [SerializeField]
    private TMP_InputField titleInputField;

    // 서버 클래스
    private Server server;

    // RoomSetting variable
    private string title;
    private string category;
    private int index;

    // PromptSetting variable
    private int interviewerCount;
    private int interviewerGender;
    private int interviewStyle;
    private float interviewTime;

    // Room
    private RoomData newRoom;
    private List<string> roomDataList;

    [Header("Manager")]
    // 씬 매니저 클래스
    [SerializeField]
    private SceneManagment sceneManager;

    // UI 매니저
    [SerializeField]
    private UIManager uiManager;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        // User 닉네임 초기화
        SetUserNickName();

        // 방 초기 생성
        if(server)
        {
            roomDataList = server.GetRoomDataList();

            foreach(string roomData in roomDataList)
            {
                InitCreateRoom(roomData);
            }

            // 방 정렬
            SortRoomByID();
        }
    }

    private void SetUserNickName()
    {
        if(server)
        {
            TextMeshProUGUI nicknameText = GameObject.Find("NickName").GetComponent<TextMeshProUGUI>();
            nicknameText.text = server.GetUserNickName() + System.Environment.NewLine + "님의 로비";
        }
    }

    public void SetRecommendRoom()
    {
        // 추천 설정으로 세팅
        InitTitle();
        SetCategory(0);
        SetIndex();
        SetInterviewerCount(1);
        SetInterviewerGender(1);
        SetInterviewTime(60.0f);
        SetInterviewStyle(0);

        uiManager.SetRecommandSprite();
    }

    public void InitTitle()
    {
        // 방 제목 초기화
        this.titleInputField.text = "나만의 학습방(" + roomList.Count + ")";
    }

    public void SetTitle()
    {
        // 입력 받은 제목 설정
        this.title = this.titleInputField.text;
    }

    public void SetCategory(int category)
    {
        // 학습 카테고리 설정
        switch (category)
        {
            case 0:
                this.category = "알고리즘";
                break;
            case 1:
                this.category = "네트워크";
                break;
            case 2:
                this.category = "운영체제";
                break;
            case 3:
                this.category = "Web";
                break;
            default:
                break;
        }
    }

    public void SetIndex()
    {
        // 학습 목차 설정
        this.index = 0;
    }

    public void SetInterviewerCount(int num)
    {
        // 면접자 수 설정
        this.interviewerCount = num;
    }

    public void SetInterviewerGender(int gender)
    {
        // 면접자 성별 설정
        this.interviewerGender = gender;
    }

    public void SetInterviewTime(float time)
    {
        // 면접 답변 시간 초 설정
        this.interviewTime = time;
    }

    public void SetInterviewStyle(int style)
    {
        // 면접 스타일 설정
        this.interviewStyle = style;
    }

    public void TryCreateRoom()
    {
        // 방 생성 전 예외처리
    }

    private void InitCreateRoom(string roomData)
    {
        // 초기 방 생성 
        newRoom = JsonUtility.FromJson<RoomData>(roomData);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 적용
        var room = roomObj.GetComponent<Room>();
        room.roomData.id = newRoom.id;
        room.roomData.title = newRoom.title;
        room.roomData.category = newRoom.category;
        room.roomData.index = newRoom.index;

        room.roomData.interviewerCount = newRoom.interviewerCount;
        room.roomData.interviewerGender = newRoom.interviewerGender;
        room.roomData.interviewTime = newRoom.interviewTime;
        room.roomData.interviewStyle = newRoom.interviewStyle;

        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>";
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadRoom(room.roomData.interviewerGender));
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(() => DestroyRoom(room.roomData.id));
    }

    public void CreateRoom()
    {
        // Room 생성
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 설정
        SetTitle();

        // Room Setting 적용
        var room = roomObj.GetComponent<Room>();
        room.roomData.id = roomList.Count;
        room.roomData.title = this.title;
        room.roomData.category = this.category;
        room.roomData.index = this.index;

        room.roomData.interviewerCount = this.interviewerCount;
        room.roomData.interviewerGender = this.interviewerGender;
        room.roomData.interviewTime = this.interviewTime;
        room.roomData.interviewStyle = this.interviewStyle;

        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(()=> sceneManager.LoadRoom(room.roomData.interviewerGender));
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.roomData.id));

        // Room Data 저장
        if (server)
        {
            server.SaveRoomData(room);
        }

        SortRoomByID();
    }

    public void SortRoomByID()
    {
        // ID 순대로 방 정렬(생성된 순으로 정렬)
        roomList.Sort((a, b) => {
            Room roomA = a.GetComponent<Room>();
            Room roomB = b.GetComponent<Room>();
            if (roomA != null && roomB != null)
            {
                return roomB.roomData.id.CompareTo(roomA.roomData.id);
            }
            else
            {
                Debug.LogError("Room component not found on child object.");
                return 0;
            }
        });

        for (int i = 0; i < roomList.Count; i++)
        {
            roomList[i].transform.SetSiblingIndex(i);
        }
    }

    public void SortRoomByCategory()
    {
        // 카테고리 순대로 방 정렬(생성된 순으로 정렬)
        roomList.Sort((a, b) => {
            Room roomA = a.GetComponent<Room>();
            Room roomB = b.GetComponent<Room>();
            if (roomA != null && roomB != null)
            {
                return roomB.roomData.category.CompareTo(roomA.roomData.category);
            }
            else
            {
                Debug.LogError("Room component not found on child object.");
                return 0;
            }
        });

        for (int i = 0; i < roomList.Count; i++)
        {
            roomList[i].transform.SetSiblingIndex(i);
        }
    }

    public void DestroyRoom(int id)
    {
        // prefab 오브젝트 삭제
        Destroy(roomList[id]);

        // 리스트에서 삭제
        for (int i = roomList.Count - 1; i >= 0; i--)
        {
            if(i== id)
            {
                roomList.Remove(roomList[i]);
            }
        }
    }
}
