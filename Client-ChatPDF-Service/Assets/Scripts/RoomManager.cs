using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class RoomManager : MonoBehaviour
{
    [SerializeField]
    private GameObject parent;

    [SerializeField]
    private GameObject prefab;

    [SerializeField]
    private TMP_InputField titleInputField;

    // Room 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    [SerializeField]
    private SceneManagment sceneManager;

    private Server sever;

    private string title;
    private string category;
    private int index;

    private int interviewerCount;
    private int interviewerGender;
    private int interviewStyle;
    private float interviewTime;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        sever = FindObjectOfType<Server>();
    }

    public void SetRecommendRoom()
    {
        // 추천 설정으로 세팅
        InitTitle();
        SetCategory(0);
        SetIndex();
        SetInterviewerCount(1);
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
        //room.roomData.interviewer = this.interviewer;
        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(sceneManager.LoadRoom);
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.roomData.id));

        // Room Data 저장
        sever.SaveRoomData(room);
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
