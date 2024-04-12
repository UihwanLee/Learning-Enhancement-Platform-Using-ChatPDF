using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class PromptManager : MonoBehaviour
{
    [Header("Value")]
    [SerializeField]
    string question;

    [SerializeField]
    string answer;

    [Header("UI")]
    [SerializeField]
    private TMP_InputField inputField;

    [SerializeField]
    private TextMeshProUGUI promptGUI;

    [Header("Log")]
    [SerializeField]
    private GameObject logParent;

    [SerializeField]
    private GameObject prefabQuestionLog;

    [SerializeField]
    private GameObject prefabAnswerLog;

    [DllImport("__Internal")]
    private static extern void StartInterview();

    [DllImport("__Internal")]
    private static extern void SendAnswer(string answer);

    [DllImport("__Internal")]
    private static extern void ReplayQuestion();


    // Start is called before the first frame update
    void Start()
    {
        AddQuestionLog("�ȳ��ϼ�����������ȯ�Դϴٹݰ����ϴ�ó���˰ڽ��ϴ�.");
        AddAnswerLog("�ȳ��ϼ���. ���� ����ȯ�Դϴ�. �ݰ����ϴ�. ó�� �˰ڽ��ϴ�. ���� �Ϸ� �Ǽ���! ���̿�");
    }

    public void StartInterviewUnity()
    {
        // ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StartInterview();
#endif
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
    answer = inputField.text;
    SendAnswer(answer);
#endif
    }

    public void SetChatLogSize()
    {
        for(int i=0; i< logParent.transform.childCount; i++) 
        {
            var log = logParent.transform.GetChild(i).GetComponent<ChatLog>();
            log.SetUISizeFit();
        }
    }

    public void AddQuestionLog(string message)
    {
        // Question Log �߰�
        var question_log = Instantiate(prefabQuestionLog, logParent.transform) as GameObject;
        var log = question_log.GetComponent<ChatLog>();
        log.SetText(message);

        ChangeChatUISize();
    }

    public void AddAnswerLog(string message)
    {
        // Answer Log �߰�
        var answer_log = Instantiate(prefabAnswerLog, logParent.transform) as GameObject;
        var log = answer_log.GetComponent<ChatLog>();
        log.SetText(message);

        ChangeChatUISize();
    }

    IEnumerator ChangeChatUISize()
    {
        yield return new WaitForSeconds(1.0f);

        SetChatLogSize();
    }
}
