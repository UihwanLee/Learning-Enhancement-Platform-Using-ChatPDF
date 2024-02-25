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
        // ���� ����
        ColorUtility.TryParseHtmlString(highlightedColor, out changeColor);

        // ���콺 Enter�� Highlight Sprite�� ����
        buttons.transform.GetChild(idx).gameObject.GetComponent<UnityEngine.UI.Image>().sprite = highlightSprites[idx];

        // ���콺 Enter�� Highlight Color�� text ����
        buttons.transform.GetChild(idx).gameObject.transform.GetChild(0).gameObject.GetComponent<TextMeshProUGUI>().color = changeColor;
    }

    private void ChangeBase(int idx)
    {
        // ���� ����
        ColorUtility.TryParseHtmlString(baseColor, out changeColor);

        // ���콺 Enter�� Base Sprite�� ����
        buttons.transform.GetChild(idx).gameObject.GetComponent<UnityEngine.UI.Image>().sprite = baseSprites[idx];

        // ���콺 Enter�� Base Color�� text ����
        buttons.transform.GetChild(idx).gameObject.transform.GetChild(0).gameObject.GetComponent<TextMeshProUGUI>().color = changeColor;
    }

    public void EnterButton(int idx)
    {
        // ��ư�� ������ �ִ� ���¸� return
        if (buttonsClicked[idx]) return;

        ChangeHighlight(idx);
    }

    public void ExitButton(int idx)
    {
        // ��ư�� ������ �ִ� ���¸� return
        if (buttonsClicked[idx]) return;

        ChangeBase(idx); 
    }

    public void ClickButton(int idx)
    {
        // Replay ��ư�Ͻ� ����
        if (idx == 1) return;

        if (!buttonsClicked[idx])
        {
            ChangeHighlight(idx);
            buttonsClicked[idx] = true;

            // Microphone�� �� ����ũ ���� ����
            if(idx==0) StartVoice();

            // Subtitle�� �� �ڸ� ����
            if (idx == 2) subtitlePannel.SetActive(true);

            // Chat Button�� �� Chat Pannel Ȱ��ȭ
            if (idx==3) chatPannel.SetActive(true);
        }
        else
        {
            ChangeBase(idx);
            buttonsClicked[idx] = false;

            // Microphone�� �� ����ũ ���� ����
            if (idx == 0) StopVoice();

            // Subtitle�� �� �ڸ� �����
            if (idx == 2) subtitlePannel.SetActive(false);

            // Chat Button�� �� Chat Pannel ��Ȱ��ȭ
            if (idx == 3) chatPannel.SetActive(false);
        }
    }

    public void StartVoice()
    {
        // ����ũ ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StartSTT();
#endif
    }

    public void StopVoice()
    {
        // ����ũ ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StopSTT();
#endif
    }
}
