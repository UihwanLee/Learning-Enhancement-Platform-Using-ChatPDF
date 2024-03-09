using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class RoomManager : MonoBehaviour
{
    // Room 생성될 부모 오브젝트
    [SerializeField]
    private GameObject parent;

    // Room 프리팹
    [SerializeField]
    private GameObject prefab;

    // Title InputField
    [SerializeField]
    private TMP_InputField titleInputField;

    // Room 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    // 씬 매니저 클래스
    [SerializeField]
    private SceneManagment sceneManager;

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

    // 색상
    private Color changeColor;
    private string baseColor = "#BFBFBF";
    private string highlightedColor = "#FFFFFF";

    // Setting GUI
    [SerializeField]
    private GameObject roomSetting;
    [SerializeField]
    private TextMeshProUGUI roomSettingButton;
    private int roomSettingClicked;
    [SerializeField]
    private GameObject promptSetting;
    [SerializeField]
    private TextMeshProUGUI promptSettingButton;
    private int promptSettingClicked;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        // Setting Variable 초기화
        roomSettingClicked = 1;
        promptSettingClicked = 0;
    }

    public int CheckClicked(TextMeshProUGUI setting)
    {
        // 클릭한 상태인지 체크
        if (setting.gameObject.name == roomSettingButton.gameObject.name)
        {
            return roomSettingClicked;
        }
        else
        {
            return promptSettingClicked;
        }
    }

    public void EnterSetting(TextMeshProUGUI setting)
    {
        if (CheckClicked(setting) == 1) return;

        // 텍스트 활성화
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        setting.color = changeColor;
    }

    public void ExitSetting(TextMeshProUGUI setting)
    {
        if (CheckClicked(setting) == 1) return;

        // 텍스트 비활성화
        ColorUtility.TryParseHtmlString(baseColor, out changeColor);
        setting.color = changeColor;
    }

    public void ClickRoomSetting()
    {
        // RoomSetting 패널로 전환
        roomSettingClicked = 1;
        promptSettingClicked = 0;
        roomSetting.SetActive(true);
        promptSetting.SetActive(false);

        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        roomSettingButton.color = changeColor;

        ColorUtility.TryParseHtmlString(baseColor, out changeColor);
        promptSettingButton.color = changeColor;
    }

    public void ClickPromptSetting()
    {
        // PromptSetting 패널로 전환
        roomSettingClicked = 0;
        promptSettingClicked = 1;
        roomSetting.SetActive(false);
        promptSetting.SetActive(true);

        ColorUtility.TryParseHtmlString(baseColor, out changeColor);
        roomSettingButton.color = changeColor;

        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        promptSettingButton.color = changeColor;
    }

    public void SetRecommendRoom()
    {
        // 추천 설정으로 세팅
        InitTitle();
        SetCategory(0);
        SetIndex();
        SetInterviewerCount(1);
        SetInterviewerGender(1);
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

        room.roomData.interviewerGender = this.interviewerGender;
        //room.roomData.interviewer = this.interviewer;
        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(sceneManager.LoadRoom);
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.roomData.id));

        // Room Data 저장
        if (server)
        {
            server.SetInterViewGender(this.interviewerGender);
            server.SaveRoomData(room);
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
