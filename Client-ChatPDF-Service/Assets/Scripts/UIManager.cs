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
        // room panel 변수 초기화
        roomPannelsClicked = new int[roomPannelButtons.Length];
        roomPannelsClicked[0] = 1;

        // Setting Variable 초기화
        roomSettingClicked = 1;
        promptSettingClicked = 0;

        // settingCliked 초기화
        settingButtonCliked = new int[settingsButtons.Count];

        NoticeMessage("안녕하세요!");
    }

    private int CheckButtonClicked(TextMeshProUGUI button)
    {
        // 클릭한 상태인지 체크
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
            // Room Pannel 상태 반환
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

        // 텍스트 활성화
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        button.color = changeColor;
    }

    public void ExitButton(TextMeshProUGUI button)
    {
        if (CheckButtonClicked(button) == 1) return;

        // 텍스트 비활성화
        ColorUtility.TryParseHtmlString(baseColor, out changeColor);
        button.color = changeColor;
    }

    public void ClickButton(TextMeshProUGUI button)
    {
        if (button.gameObject.name == roomSettingButton.gameObject.name)
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
        else if (button.gameObject.name == promptSettingButton.gameObject.name)
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
        // Category / PromptSetting Recommand Sprite로 변환
        ClickSettingButton(0);  // Category
        ClickSettingButton(4);  // InterviewerCount
        ClickSettingButton(7);  // InterviewerGender
        ClickSettingButton(8);  // InterviewTime
        ClickSettingButton(12);  // InterviewStyle

        // 초기 roomSetting 패널로 세팅
        ClickButton(roomSettingButton);
    }

    public void EnterSettingButton(int id)
    {
        if (settingButtonCliked[id] == 1) return;

        // 마우스 버튼 진입 시 highlight Sprite 변환
        settingsButtons[id].GetComponent<Image>().sprite = highlightButtonSprite;
    }

    public void ExitSettingButton(int id)
    {
        if (settingButtonCliked[id] == 1) return;

        // 마우스 버튼 탈출 시 base Sprite 변환
        settingsButtons[id].GetComponent<Image>().sprite = baseButtonSprite;
    }

    public void ClickSettingButton(int id)
    {
        // 버튼 id값에 따른 Sprtie 조정
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
        // Dropdown value에 맞게 정렬
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
        // Dropdown value에 맞게 정렬
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
        // 면접이 끝났다고 알리고 로비로 돌아가는 UI 생성

        // Notice UI 생성
        noticeUI.SetActive(true);

        // noticeUI 설정
        string content = "<size=24>" + message + "</size>";
        noticeUI.gameObject.transform.GetChild(2).GetComponent<TextMeshProUGUI>().text = content;
        noticeUI.gameObject.transform.GetChild(3).GetComponent<UnityEngine.UI.Button>().onClick.AddListener(() => Cancel());
    }

    public void Cancel()
    {
        noticeUI.SetActive(false);
    }
}
