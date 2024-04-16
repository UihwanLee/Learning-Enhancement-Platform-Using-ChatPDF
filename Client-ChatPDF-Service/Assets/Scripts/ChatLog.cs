using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ChatLog : MonoBehaviour
{
    [Header("UI")]
    [SerializeField]
    private GameObject ui_content;

    [SerializeField]
    private GameObject ui_message;

    [Header("Message")]
    [SerializeField]
    private GameObject message;

    [Header("Value")]
    [SerializeField]
    private float widht;

    [SerializeField]
    private float height;

    [SerializeField]
    private int max_text_origin_line;

    [SerializeField]
    private int max_text_line;

    [SerializeField]
    private float offset_content_message;

    [SerializeField]
    private float offset_message_text;


    public void SetText(string message)
    {
        // 메세지 지정
        this.message.GetComponent<TextMeshProUGUI>().text = message;
    }

    public void SetUISizeFit()
    {
        // Text 사이즈에 맞게 ui 조정
        float textHeight = message.GetComponent<RectTransform>().rect.height;

        // message height 조정
        ui_message.GetComponent<RectTransform>().sizeDelta = new Vector2(widht, textHeight + offset_message_text);

        // content height 조정
        ui_content.GetComponent<RectTransform>().sizeDelta = new Vector2(widht, textHeight + offset_message_text + offset_content_message);
    }
}
