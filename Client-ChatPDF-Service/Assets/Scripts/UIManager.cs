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
        // Setting Variable �ʱ�ȭ
        roomSettingClicked = 1;
        promptSettingClicked = 0;

        // settingCliked �ʱ�ȭ
        settingButtonCliked = new int[settingsButtons.Count];
    }

    private int CheckSettingClicked(TextMeshProUGUI setting)
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
        if (CheckSettingClicked(setting) == 1) return;

        // �ؽ�Ʈ Ȱ��ȭ
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);
        setting.color = changeColor;
    }

    public void ExitSetting(TextMeshProUGUI setting)
    {
        if (CheckSettingClicked(setting) == 1) return;

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

    public void SetRecommandSprite()
    {
        // Category / PromptSetting Recommand Sprite�� ��ȯ
        ClickSettingButton(0);  // Category
        ClickSettingButton(4);  // InterviewerCount
        ClickSettingButton(7);  // InterviewerGender
        ClickSettingButton(8);  // InterviewTime
        ClickSettingButton(12);  // InterviewStyle
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

    public void SortDropdown(TMP_Dropdown select)
    {
        // Dropdown value�� �°� ����
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
