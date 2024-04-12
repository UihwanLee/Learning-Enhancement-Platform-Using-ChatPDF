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
        AddQuestionLog("안녕하세요저는이의환입니다반갑습니다처음뵙겠습니다.");
        AddAnswerLog("안녕하세요. 저는 이의환입니다. 반갑습니다. 처음 뵙겠습니다. 좋은 하루 되세요! 하이요");
    }

    public void StartInterviewUnity()
    {
        // 면접 시작
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StartInterview();
#endif
    }

    public void ListenAgain()
    {
        // 질문 다시듣기
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    ReplayQuestion();
#endif
    }

    public void ReceiveQuestion(string _question)
    {
        // 질문 받기
        question = _question;
        promptGUI.text = question;
    }

    public void SendAnswerUnity()
    {
        // 답변 보내기
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
        // Question Log 추가
        var question_log = Instantiate(prefabQuestionLog, logParent.transform) as GameObject;
        var log = question_log.GetComponent<ChatLog>();
        log.SetText(message);

        ChangeChatUISize();
    }

    public void AddAnswerLog(string message)
    {
        // Answer Log 추가
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
