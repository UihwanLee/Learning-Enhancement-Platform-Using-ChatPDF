using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.UIElements;
using Image = UnityEngine.UI.Image;
using UnityEngine.SceneManagement;

public class UIManager : MonoBehaviour
{
    [Header("Room Pannel")]
    [SerializeField]
    private GameObject[] roomPannels;
    [SerializeField]
    private TextMeshProUGUI[] roomPannelButtons;
    [SerializeField]
    private int[] roomPannelsClicked;

    [Header("Setting")]
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

    [Header("SettingButton")]
    [SerializeField]
    private List<GameObject> settingsButtons;
    [SerializeField]
    private Sprite highlightButtonSprite;
    [SerializeField]
    private Sprite baseButtonSprite;
    private int[] settingButtonCliked;

    // Color
    private Color changeColor;
    private string baseColor = "#BFBFBF";
    private string highlightedColor = "#FFFFFF";

    [Header("UI")]
    [SerializeField]
    private GameObject noticeUI;

    [Header("Manager")]
    [SerializeField]
    private StudyRoomManager studyRoomManager;
    [SerializeField]
    private InterviewRoomManager interviewRoomManager;

    // Start is called before the first frame update
    void Start()
    {
        // room panel ���� �ʱ�ȭ
        roomPannelsClicked = new int[roomPannelButtons.Length];
        roomPannelsClicked[0] = 1;

        // Setting Variable �ʱ�ȭ
        roomSettingClicked = 1;
        promptSettingClicked = 0;

        // settingCliked �ʱ�ȭ
        settingButtonCliked = new int[settingsButtons.Count];

        NoticeMessage("�ȳ��ϼ���!");
    }

    private int CheckButtonClicked(TextMeshProUGUI button)
    {
        // Ŭ���� �������� üũ
        if (button.gameObject.name == roomSettingButton.gameObject.name)
        {
            return roomSettingClicked;
        }
        else if (button.gameObject.name == promptSettingButton.gameObject.name)
        {
            return promptSettingClicked;
        }
        else
        {
            // Room Pannel ���� ��ȯ
            for(int i=0; i< roomPannelButtons.Length; i++)
            {
                if (button.gameObject.name == roomPannelButtons[i].name)
                {
                    return roomPannelsClicked[i];
                }
            }

            return 1;
        }
    }

    public void EnterButton(TextMeshProUGUI button)
    {
        if (CheckButtonClicked(button) == 1) return;

        // �ؽ�Ʈ Ȱ��ȭ
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        button.color = changeColor;
    }

    public void ExitButton(TextMeshProUGUI button)
    {
        if (CheckButtonClicked(button) == 1) return;

        // �ؽ�Ʈ ��Ȱ��ȭ
        ColorUtility.TryParseHtmlString(baseColor, out changeColor);
        button.color = changeColor;
    }

    public void ClickButton(TextMeshProUGUI button)
    {
        if (button.gameObject.name == roomSettingButton.gameObject.name)
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
        else if (button.gameObject.name == promptSettingButton.gameObject.name)
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
        else
        {
            for (int i = 0; i < roomPannels.Length; i++)
            {
                ColorUtility.TryParseHtmlString(baseColor, out changeColor);
                bool active = false;
                int clicked = 0;
                if (button.gameObject.name == roomPannelButtons[i].gameObject.name)
                {
                    clicked = 1;
                    ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
                    active = true;
                }
                roomPannelButtons[i].color = changeColor;
                roomPannels[i].gameObject.SetActive(active);
                roomPannelsClicked[i] = clicked;
            }
        }
    }

    public void SetRecommandState()
    {
        // Category / PromptSetting Recommand Sprite�� ��ȯ
        ClickSettingButton(0);  // Category
        ClickSettingButton(4);  // InterviewerCount
        ClickSettingButton(7);  // InterviewerGender
        ClickSettingButton(8);  // InterviewTime
        ClickSettingButton(12);  // InterviewStyle

        // �ʱ� roomSetting �гη� ����
        ClickButton(roomSettingButton);
    }

    public void EnterSettingButton(int id)
    {
        if (settingButtonCliked[id] == 1) return;

        // ���콺 ��ư ���� �� highlight Sprite ��ȯ
        settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
    }

    public void ExitSettingButton(int id)
    {
        if (settingButtonCliked[id] == 1) return;

        // ���콺 ��ư Ż�� �� base Sprite ��ȯ
        settingsButtons[id].GetComponent<Image>().sprite = baseButtonSprite;
    }

    public void ClickSettingButton(int id)
    {
        // ��ư id���� ���� Sprtie ����
        switch (id)
        {
            case 0:
            case 1:
            case 2:
            case 3:
                {
                    // Category
                    for (int i=0; i<4; i++) { settingsButtons[i].GetComponent<Image>().sprite = baseButtonSprite; settingButtonCliked[i] = 0; }
                    settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
                    settingButtonCliked[id] = 1;
                }
                break;
            case 4:
            case 5:
                {
                    // InterviewerCount
                    for (int i = 4; i < 6; i++) { settingsButtons[i].GetComponent<Image>().sprite = baseButtonSprite; settingButtonCliked[i] = 0; }
                    settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
                    settingButtonCliked[id] = 1;
                }
                break;
            case 6:
            case 7:
                {
                    // InterviewerGender
                    for (int i = 6; i < 8; i++) { settingsButtons[i].GetComponent<Image>().sprite = baseButtonSprite; settingButtonCliked[i] = 0; }
                    settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
                    settingButtonCliked[id] = 1;
                }
                break;
            case 8:
            case 9:
            case 10:
            case 11:
                {
                    // InterviewTime
                    for (int i = 8; i < 12; i++) { settingsButtons[i].GetComponent<Image>().sprite = baseButtonSprite; settingButtonCliked[i] = 0; }
                    settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
                    settingButtonCliked[id] = 1;
                }
                break;
            case 12:
            case 13:
            case 14:
                {
                    // InterviewStyle
                    for (int i = 12; i < 15; i++) { settingsButtons[i].GetComponent<Image>().sprite = baseButtonSprite; settingButtonCliked[i] = 0; } 
                    settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
                    settingButtonCliked[id] = 1;
                }
                break;
            default:
                break;
        }
    }

    public void SortStudyRoom(TMP_Dropdown select)
    {
        // Dropdown value�� �°� ����
        switch (select.value)
        {
            case 0:
                studyRoomManager.SortRoomByID();
                break;
            default:
                break;
        }
    }

    public void SortInterviewRoom(TMP_Dropdown select)
    {
        // Dropdown value�� �°� ����
        switch(select.value)
        {
            case 0:
                interviewRoomManager.SortRoomByID();
                break;
            case 1:
                interviewRoomManager.SortRoomByCategory();
                break;
            default:
                break;
        }
    }

    public void NoticeMessage(string message)
    {
        // ������ �����ٰ� �˸��� �κ�� ���ư��� UI ����

        // Notice UI ����
        noticeUI.SetActive(true);

        // noticeUI ����
        string content = "<size=24>" + message + "</size>";
        noticeUI.gameObject.transform.GetChild(2).GetComponent<TextMeshProUGUI>().text = content;
        noticeUI.gameObject.transform.GetChild(3).GetComponent<UnityEngine.UI.Button>().onClick.AddListener(() => Cancel());
    }

    public void Cancel()
    {
        noticeUI.SetActive(false);
    }
}
