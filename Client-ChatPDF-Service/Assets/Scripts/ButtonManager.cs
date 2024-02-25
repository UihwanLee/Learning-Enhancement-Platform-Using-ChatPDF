using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.UIElements;

public class ButtonManager : MonoBehaviour
{
    [SerializeField]
    private GameObject chatPannel;

    [SerializeField]
    private GameObject subtitlePannel;

    [SerializeField]
    private GameObject buttons;

    [SerializeField]
    private Sprite[] baseSprites;

    [SerializeField]
    private Sprite[] highlightSprites;

    [SerializeField]
    private List<bool> buttonsClicked = new List<bool>();

    private Color changeColor;
    private string baseColor = "#A5A7AA";
    private string highlightedColor = "#26EB60";

    [DllImport("__Internal")]
    private static extern void StartSTT();

    [DllImport("__Internal")]
    private static extern void StopSTT();

    // Start is called before the first frame update
    void Start()
    {
        for (int i=0; i< buttons.transform.childCount-1; i++)
        {
            buttonsClicked.Add(false);
        }
    }


    public void SetObject(GameObject obj)
    {
        if (obj.gameObject.activeSelf)
        {
            obj.gameObject.SetActive(false);
        }
        else
        {
            obj.gameObject.SetActive(true);
        }
    }

    private void ChangeHighlight(int idx)
    {
        // 색상 변경
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);

        // 마우스 Enter시 Highlight Sprite로 변경
        buttons.transform.GetChild(idx).gameObject.GetComponent<UnityEngine.UI.Image>().sprite = highlightSprites[idx];

        // 마우스 Enter시 Highlight Color로 text 변경
        buttons.transform.GetChild(idx).gameObject.transform.GetChild(0).gameObject.GetComponent<TextMeshProUGUI>().color = changeColor;
    }

    private void ChangeBase(int idx)
    {
        // 색상 변경
        ColorUtility.TryParseHtmlString(baseColor, out changeColor);

        // 마우스 Enter시 Base Sprite로 변경
        buttons.transform.GetChild(idx).gameObject.GetComponent<UnityEngine.UI.Image>().sprite = baseSprites[idx];

        // 마우스 Enter시 Base Color로 text 변경
        buttons.transform.GetChild(idx).gameObject.transform.GetChild(0).gameObject.GetComponent<TextMeshProUGUI>().color = changeColor;
    }

    public void EnterButton(int idx)
    {
        // 버튼이 눌러져 있는 상태면 return
        if (buttonsClicked[idx]) return;

        ChangeHighlight(idx);
    }

    public void ExitButton(int idx)
    {
        // 버튼이 눌러져 있는 상태면 return
        if (buttonsClicked[idx]) return;

        ChangeBase(idx); 
    }

    public void ClickButton(int idx)
    {
        // Replay 버튼일시 제외
        if (idx == 1) return;

        if (!buttonsClicked[idx])
        {
            ChangeHighlight(idx);
            buttonsClicked[idx] = true;

            // Microphone일 시 마이크 녹음 시작
            if(idx==0) StartVoice();

            // Subtitle일 시 자막 띄우기
            if (idx == 2) subtitlePannel.SetActive(true);

            // Chat Button일 시 Chat Pannel 활성화
            if (idx==3) chatPannel.SetActive(true);
        }
        else
        {
            ChangeBase(idx);
            buttonsClicked[idx] = false;

            // Microphone일 시 마이크 녹음 중지
            if (idx == 0) StopVoice();

            // Subtitle일 시 자막 지우기
            if (idx == 2) subtitlePannel.SetActive(false);

            // Chat Button일 시 Chat Pannel 비활성화
            if (idx == 3) chatPannel.SetActive(false);
        }
    }

    public void StartVoice()
    {
        // 마이크 녹음 시작
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StartSTT();
#endif
    }

    public void StopVoice()
    {
        // 마이크 녹음 중지
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StopSTT();
#endif
    }
}
