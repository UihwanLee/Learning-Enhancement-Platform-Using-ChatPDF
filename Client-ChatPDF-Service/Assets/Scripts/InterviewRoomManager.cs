using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class InterviewRoomManager : MonoBehaviour
{
    [Header("InterviewRoom")]
    // InterviewRoom ������ �θ� ������Ʈ
    [SerializeField]
    private GameObject parent;

    // InterviewRoom ������
    [SerializeField]
    private GameObject prefab;

    // InterviewRoom ��ü�� ������ RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    [Header("UI")]
    // Title InputField
    [SerializeField]
    private TMP_InputField titleInputField;

    // ���� Ŭ����
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
    // �� �Ŵ��� Ŭ����
    [SerializeField]
    private SceneManagment sceneManager;

    // UI �Ŵ���
    [SerializeField]
    private UIManager uiManager;

    // Start is called before the first frame update
    void Start()
    {
        // Sever �ʱ�ȭ
        server = FindObjectOfType<Server>();

        // User �г��� �ʱ�ȭ
        SetUserNickName();


        // �� �ʱ� ����
        if (server)
        {
            newRoom = new InterviewRoom();
            roomDataList = server.GetInterviewRoomDataList();

            foreach(string roomData in roomDataList)
            {
                InitCreateRoom(roomData);
            }

            // �� ����
            SortRoomByID();

            // RoomSetting �ʱ�ȭ
            InitRoomSetting();
        }
    }

    private void SetUserNickName()
    {
        if(server)
        {
            TextMeshProUGUI nicknameText = GameObject.Find("NickName").GetComponent<TextMeshProUGUI>();
            nicknameText.text = server.GetUserNickName() + System.Environment.NewLine + "���� �κ�";
        }
    }

    public void SetRecommendRoom()
    {
        // ��õ �������� ����
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
        // �� ���� �ʱ�ȭ
        this.titleInputField.text = "������ �н���(" + roomList.Count + ")";
    }

    private void InitDocument()
    {
        // ���񽺿��� �����Ǵ� category �� �н� ���� �ʱ�ȭ
        documentHashList = server.GetDocumentHashList();
    }

    private void ChangeDocumentList(int category)
    {
        if (documentHashList.Count < category) return;
        if (server)
        {
            // ���� �������� ������ �ִ� ������� �н� ������ document �ʱ�ȭ
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
        // �Է� ���� ���� ����
        this.title = this.titleInputField.text;
    }

    public void SetCategory(int category)
    {
        // �н� ī�װ� ����
        switch (category)
        {
            case 0:
                this.category = "�˰���";
                ChangeDocumentList(0);
                break;
            case 1:
                this.category = "��Ʈ��ũ";
                ChangeDocumentList(1);
                break;
            case 2:
                this.category = "�ü��";
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
        // �н� ���� ����
        this.index = "";
    }

    public void SetInterviewerCount(int num)
    {
        // ������ �� ����
        this.interviewerCount = num;
    }

    public void SetInterviewerGender(int gender)
    {
        // ������ ���� ����
        this.interviewerGender = gender;
    }

    public void SetInterviewTime(float time)
    {
        // ���� �亯 �ð� �� ����
        this.interviewTime = time;
    }

    public void SetInterviewStyle(int style)
    {
        // ���� ��Ÿ�� ����
        this.interviewStyle = style;
    }

    public void TryCreateRoom()
    {
        // �� ���� �� ����ó��
    }

    private void InitCreateRoom(string roomData)
    {
        // �ʱ� �� ���� 
        JsonUtility.FromJsonOverwrite(roomData, newRoom);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
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

        // UI �� ��� ����
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.category + " | " + room.index + "</size>";
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => StartPrevInterview(room));
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(() => StartBaseInterview(room));
        room.gameObject.transform.GetChild(3).GetComponent<Button>().onClick.AddListener(() => DestroyRoom(room.id));
    }

    public void CreateRoom()
    {
        // Room ����
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        SetTitle();

        // Room Setting ����
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

        // UI �� ��� ����
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.category + " | " + room.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => StartPrevInterview(room));
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> StartBaseInterview(room));
        room.gameObject.transform.GetChild(3).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.id));

        // Room Data ����
        if (server)
        {
            server.SaveInterviewRoomData(room);
        }

        SortRoomByID();
    }

    public void SortRoomByID()
    {
        // ID ����� �� ����(������ ������ ����)
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
        // ī�װ� ����� �� ����(������ ������ ����)
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
        // prefab ������Ʈ ����
        Destroy(roomList[id]);

        // ����Ʈ���� ����
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
        // ������ ���ε� ��û
        server.UploadFile();
    }
}
