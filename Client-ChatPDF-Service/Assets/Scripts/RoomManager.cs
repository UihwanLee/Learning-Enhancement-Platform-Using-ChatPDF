using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class RoomManager : MonoBehaviour
{
    // Room ������ �θ� ������Ʈ
    [SerializeField]
    private GameObject parent;

    // Room ������
    [SerializeField]
    private GameObject prefab;

    // Title InputField
    [SerializeField]
    private TMP_InputField titleInputField;

    // Room ��ü�� ������ RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    // �� �Ŵ��� Ŭ����
    [SerializeField]
    private SceneManagment sceneManager;

    // ���� Ŭ����
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

    // ����
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
        // Sever �ʱ�ȭ
        server = FindObjectOfType<Server>();

        // Setting Variable �ʱ�ȭ
        roomSettingClicked = 1;
        promptSettingClicked = 0;
    }

    public int CheckClicked(TextMeshProUGUI setting)
    {
        // Ŭ���� �������� üũ
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

        // �ؽ�Ʈ Ȱ��ȭ
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        setting.color = changeColor;
    }

    public void ExitSetting(TextMeshProUGUI setting)
    {
        if (CheckClicked(setting) == 1) return;

        // �ؽ�Ʈ ��Ȱ��ȭ
        ColorUtility.TryParseHtmlString(baseColor, out changeColor);
        setting.color = changeColor;
    }

    public void ClickRoomSetting()
    {
        // RoomSetting �гη� ��ȯ
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
        // PromptSetting �гη� ��ȯ
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
        // ��õ �������� ����
        InitTitle();
        SetCategory(0);
        SetIndex();
        SetInterviewerCount(1);
        SetInterviewerGender(1);
    }

    public void InitTitle()
    {
        // �� ���� �ʱ�ȭ
        this.titleInputField.text = "������ �н���(" + roomList.Count + ")";
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
                break;
            case 1:
                this.category = "��Ʈ��ũ";
                break;
            case 2:
                this.category = "�ü��";
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
        // �н� ���� ����
        this.index = 0;
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

    public void CreateRoom()
    {
        // Room ����
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        SetTitle();

        // Room Setting ����
        var room = roomObj.GetComponent<Room>();
        room.roomData.id = roomList.Count;
        room.roomData.title = this.title;
        room.roomData.category = this.category;
        room.roomData.index = this.index;

        room.roomData.interviewerGender = this.interviewerGender;
        //room.roomData.interviewer = this.interviewer;
        roomList.Add(roomObj);

        // UI �� ��� ����
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(sceneManager.LoadRoom);
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.roomData.id));

        // Room Data ����
        if (server)
        {
            server.SetInterViewGender(this.interviewerGender);
            server.SaveRoomData(room);
        }
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
            }
        }
    }
}
