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
        // �޼��� ����
        this.message.GetComponent<TextMeshProUGUI>().text = message;
    }

    public void SetUISizeFit()
    {
        // Text ����� �°� ui ����
        float textHeight = message.GetComponent<RectTransform>().rect.height;

        // message height ����
        ui_message.GetComponent<RectTransform>().sizeDelta = new Vector2(widht, textHeight + offset_message_text);

        // content height ����
        ui_content.GetComponent<RectTransform>().sizeDelta = new Vector2(widht, textHeight + offset_message_text + offset_content_message);
    }
}
