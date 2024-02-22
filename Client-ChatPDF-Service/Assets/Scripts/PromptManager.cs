using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class PromptManager : MonoBehaviour
{
    [SerializeField]
    string question;

    [SerializeField]
    string answer;

    [SerializeField]
    private TMP_InputField inputField;

    [SerializeField]
    private TextMeshProUGUI promptGUI;

    [DllImport("__Internal")]
    private static extern void SendAnswer(string answer);

    [DllImport("__Internal")]
    private static extern void ReplayQuestion();

    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void ListenAgain()
    {
        // ���� �ٽõ��
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    ReplayQuestion();
#endif
    }

    public void ReceiveQuestion(string _question)
    {
        // ���� �ޱ�
        question = _question;
        promptGUI.text = question;
    }

    public void SendAnswerUnity()
    {
        // �亯 ������
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendAnswer(answer);
#endif
    }
}
