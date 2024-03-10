using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.UIElements;
using Image = UnityEngine.UI.Image;

public class UIManager : MonoBehaviour
{
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

    [Header("Manager")]
    [SerializeField]
    private RoomManager roomManager;

    // Start is called before the first frame update
    void Start()
    {
        // Setting Variable 초기화
        roomSettingClicked = 1;
        promptSettingClicked = 0;

        // settingCliked 초기화
        settingButtonCliked = new int[settingsButtons.Count];
    }

    private int CheckSettingClicked(TextMeshProUGUI setting)
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
        if (CheckSettingClicked(setting) == 1) return;

        // 텍스트 활성화
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        setting.color = changeColor;
    }

    public void ExitSetting(TextMeshProUGUI setting)
    {
        if (CheckSettingClicked(setting) == 1) return;

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

    public void SetRecommandSprite()
    {
        // Category / PromptSetting Recommand Sprite로 변환
        ClickSettingButton(0);  // Category
        ClickSettingButton(4);  // InterviewerCount
        ClickSettingButton(7);  // InterviewerGender
        ClickSettingButton(8);  // InterviewTime
        ClickSettingButton(12);  // InterviewStyle
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

    public void SortDropdown(TMP_Dropdown select)
    {
        // Dropdown value에 맞게 정렬
        switch(select.value)
        {
            case 0:
                roomManager.SortRoomByID();
                break;
            case 1:
                roomManager.SortRoomByCategory();
                break;
            default:
                break;
        }
    }
}
