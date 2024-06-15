using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EvaluateLogManager : MonoBehaviour
{
    [Header("Log")]
    private List<string> questionLogList = new List<string>();
    private List<string> answerLogList = new List<string>();
    private List<string> modelAnswerLogList = new List<string>();
    private List<string> comprehensiveEvaluationList = new List<string>();

    [SerializeField]
    private GameObject logParent;

    [SerializeField]
    private GameObject prefabQuestionLog;

    [SerializeField]
    private GameObject prefabAnswerLog;

    [SerializeField]
    private GameObject prefabModelLog;

    // 서버 클래스
    private Server server;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        if (server)
        {
            questionLogList = server.GetQuestionList();
            answerLogList = server.GetAnswerList();
            modelAnswerLogList = server.GetModelAnswerList();

            InitializeLog();
        }
    }

    private void Update()
    {
        SetChatLogSize();
    }

    private void InitializeLog()
    {
        for (int i = 0; i < questionLogList.Count; i++)
        {
            var question_log = Instantiate(prefabQuestionLog, logParent.transform) as GameObject;
            var log = question_log.GetComponent<ChatLog>();
            log.SetText(questionLogList[i]);

            if (i < answerLogList.Count)
            {
                var answer_log = Instantiate(prefabAnswerLog, logParent.transform) as GameObject;
                log = answer_log.GetComponent<ChatLog>();
                log.SetText(answerLogList[i]);
            }

            if(i < modelAnswerLogList.Count)
            {
                var model_log = Instantiate(prefabModelLog, logParent.transform) as GameObject;
                log = model_log.GetComponent<ChatLog>();
                log.SetText(modelAnswerLogList[i]);
            }

            if(i < comprehensiveEvaluationList.Count)
            {
                var evaluate_log = Instantiate(prefabQuestionLog, logParent.transform) as GameObject;
                log = evaluate_log.GetComponent<ChatLog>();
                log.SetText(comprehensiveEvaluationList[i]);
            }
        }
    }

    public void SetChatLogSize()
    {
        if (logParent.transform.childCount == 0) return;

        for (int i = 0; i < logParent.transform.childCount; i++)
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
    }

    public void AddAnswerLog(string message)
    {
        // Answer Log 추가
        var answer_log = Instantiate(prefabAnswerLog, logParent.transform) as GameObject;
        var log = answer_log.GetComponent<ChatLog>();
        log.SetText(message);
    }

    public void AddCorrectLog(string message)
    {
        // 모범답안 Log 추가
        var answer_log = Instantiate(prefabModelLog, logParent.transform) as GameObject;
        var log = answer_log.GetComponent<ChatLog>();
        log.SetText(message);

        if (server) server.AddModelAnswerLogData(message);
    }
}
