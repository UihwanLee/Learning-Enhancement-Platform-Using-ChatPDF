using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class InterviewRoomManager : MonoBehaviour
{
    [Header("InterviewRoom")]
    // InterviewRoom 생성될 부모 오브젝트
    [SerializeField]
    private GameObject parent;

    // InterviewRoom 프리팹
    [SerializeField]
    private GameObject prefab;

    // InterviewRoom 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    [Header("UI")]
    // Title InputField
    [SerializeField]
    private TMP_InputField titleInputField;

    // 서버 클래스
    private Server server;

    [Header("Room Setting")]
    // RoomSetting variable
    private string title;
    private string category;
    private string document;
    private string index;

    private List<List<string>> documentHashList = new List<List<string>>();
    [SerializeField]
    private TMP_Dropdown dropdown_document;
    [SerializeField]
    private TMP_Dropdown dropdown_index;

    // PromptSetting variable
    private int interviewerCount;
    private int interviewerGender;
    private int interviewStyle;
    private float interviewTime;

    // InterviewRoom
    public InterviewRoom newRoom;
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
        if (server)
        {
            newRoom = new InterviewRoom();
            roomDataList = server.GetInterviewRoomDataList();

            foreach(string roomData in roomDataList)
            {
                InitCreateRoom(roomData);
            }

            // 방 정렬
            SortRoomByID();

            // RoomSetting 초기화
            InitRoomSetting();
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

        uiManager.SetRecommandState();
    }

    private void InitRoomSetting()
    {
        InitDocument();
    }

    public void InitTitle()
    {
        // 방 제목 초기화
        this.titleInputField.text = "나만의 학습방(" + roomList.Count + ")";
    }

    private void InitDocument()
    {
        // 서비스에서 제공되는 category 별 학습 문서 초기화
        documentHashList = server.GetDocumentHashList();
    }

    private void ChangeDocumentList(int category)
    {
        if (documentHashList.Count < category) return;
        if (server)
        {
            // 현재 서버에서 가지고 있는 사용자의 학습 문서별 document 초기화
            dropdown_document.options.Clear();

            List<string> documentList = documentHashList[category];

            for (int i = 0; i < documentList.Count; i++)
            {
                dropdown_document.options.Add(new TMP_Dropdown.OptionData(documentList[i], null));
            }

            dropdown_document.RefreshShownValue();
        }
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
                ChangeDocumentList(0);
                break;
            case 1:
                this.category = "네트워크";
                ChangeDocumentList(1);
                break;
            case 2:
                this.category = "운영체제";
                ChangeDocumentList(2);
                break;
            case 3:
                this.category = "Web";
                ChangeDocumentList(3);
                break;
            default:
                break;
        }
    }

    private void ChangeDocument()
    {

    }

    public void SetDocument()
    {

    }

    public void SetIndex()
    {
        // 학습 목차 설정
        this.index = "";
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
        JsonUtility.FromJsonOverwrite(roomData, newRoom);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 적용
        var room = roomObj.GetComponent<InterviewRoom>();
        room.id = newRoom.id;
        if(server) room.user_id = server.GetUserNickName();
        room.title = newRoom.title;
        room.category = newRoom.category;
        room.index = newRoom.index;

        room.interviewerCount = newRoom.interviewerCount;
        room.interviewerGender = newRoom.interviewerGender;
        room.interviewTime = newRoom.interviewTime;
        room.interviewStyle = newRoom.interviewStyle;

        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.category + " | " + room.index + "</size>";
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => StartPrevInterview(room));
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(() => StartBaseInterview(room));
        room.gameObject.transform.GetChild(3).GetComponent<Button>().onClick.AddListener(() => DestroyRoom(room.id));
    }

    public void CreateRoom()
    {
        // Room 생성
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 설정
        SetTitle();

        // Room Setting 적용
        var room = roomObj.GetComponent<InterviewRoom>();
        room.id = roomList.Count;
        if (server) room.user_id = server.GetUserNickName();
        room.title = this.title;
        room.category = this.category;
        room.index = this.index;

        room.interviewType = 0;
        room.interviewerCount = this.interviewerCount;
        room.interviewerGender = this.interviewerGender;
        room.interviewTime = this.interviewTime;
        room.interviewStyle = this.interviewStyle;

        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.category + " | " + room.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => StartPrevInterview(room));
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> StartBaseInterview(room));
        room.gameObject.transform.GetChild(3).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.id));

        // Room Data 저장
        if (server)
        {
            server.SaveInterviewRoomData(room);
        }

        SortRoomByID();
    }

    public void SortRoomByID()
    {
        // ID 순대로 방 정렬(생성된 순으로 정렬)
        roomList.Sort((a, b) => {
            InterviewRoom roomA = a.GetComponent<InterviewRoom>();
            InterviewRoom roomB = b.GetComponent<InterviewRoom>();
            if (roomA != null && roomB != null)
            {
                return roomB.id.CompareTo(roomA.id);
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
            InterviewRoom roomA = a.GetComponent<InterviewRoom>();
            InterviewRoom roomB = b.GetComponent<InterviewRoom>();
            if (roomA != null && roomB != null)
            {
                return roomB.category.CompareTo(roomA.category);
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

    public void StartPrevInterview(InterviewRoom room)
    {
        room.interviewType = 0;
        sceneManager.LoadInterviewRoom(room);
    }

    public void StartBaseInterview(InterviewRoom room)
    {
        room.interviewType = 1;
        sceneManager.LoadInterviewRoom(room);
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
                server.RemoveInterviewRoomData(i);
            }
        }
    }

    public void UploadFile()
    {
        // 서버에 업로드 요청
        server.UploadFile();
    }
}
