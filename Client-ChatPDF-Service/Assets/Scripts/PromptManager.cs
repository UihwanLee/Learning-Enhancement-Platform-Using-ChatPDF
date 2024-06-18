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
    private List<string> questionLogList = new List<string>();
    private List<string> answerLogList = new List<string>();

    [SerializeField]
    private GameObject logParent;

    [SerializeField]
    private GameObject prefabQuestionLog;

    [SerializeField]
    private GameObject prefabAnswerLog;

    // 서버 클래스
    private Server server;

    [DllImport("__Internal")]
    private static extern void StartInterview(string roomData);

    [DllImport("__Internal")]
    private static extern void SendAnswer(string answer);
    [DllImport("__Internal")]
    private static extern void SendAnswerPre(string answer);

    [DllImport("__Internal")]
    private static extern void ReplayQuestion();


    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        if (server)
        {
            questionLogList = server.GetQuestionList();
            answerLogList = server.GetAnswerList();

            InitializeLog();
        }
    }

    private void Update()
    {
        SetChatLogSize();
    }

    public void StartInterviewUnity()
    {
        // 면접 시작
        string roomData = server.GetCurrentInterviewRoom();
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StartInterview(roomData);
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
        // 사전면접 -> SendAnserPre 호출
        // 면접 -> SendAnser 호출
        if(server)
        {
            InterviewRoom room = server.GetInterviewRoom();
            if(room.interviewType == 0)
            {
                SendAnwerPreInterview();
            }
            else
            {
                SendAnwerInterview();
            }
        }
    }

    public void SendAnwerPreInterview()
    {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    answer = inputField.text;
    SendAnswer(answer);
#endif
    }

    public void SendAnwerInterview()
    {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    answer = inputField.text;
    SendAnswer(answer);
#endif
    }

    private void InitializeLog()
    {
        for(int i=0; i<questionLogList.Count; i++) 
        {
            var question_log = Instantiate(prefabQuestionLog, logParent.transform) as GameObject;
            var log = question_log.GetComponent<ChatLog>();
            log.SetText(questionLogList[i]);

            if (i<answerLogList.Count)
            {
                var answer_log = Instantiate(prefabAnswerLog, logParent.transform) as GameObject;
                log = answer_log.GetComponent<ChatLog>();
                log.SetText(answerLogList[i]);
            }
        }
    }

    public void SetChatLogSize()
    {
        if (logParent.transform.childCount == 0) return;

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

        if (server) server.AddQuestionLogData(message);
    }

    public void AddAnswerLog(string message)
    {
        // Answer Log 추가
        var answer_log = Instantiate(prefabAnswerLog, logParent.transform) as GameObject;
        var log = answer_log.GetComponent<ChatLog>();
        log.SetText(message);

        if(server) server.AddAnswerLogData(message);
    }
}
