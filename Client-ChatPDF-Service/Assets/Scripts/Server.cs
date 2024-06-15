using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;

public class Server : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void RequestData();

    [DllImport("__Internal")]
    private static extern void SendStudyRoomData(string roomData);

    [DllImport("__Internal")]
    private static extern void SendInterviewRoomData(string roomData);

    [DllImport("__Internal")]
    private static extern void SendEvaluateRoomData(string roomData);

    [DllImport("__Internal")]
    private static extern void DeleteInterviewRoomData(int roomDataID);

    [DllImport("__Internal")]
    private static extern void RequestUploadFile();
    [DllImport("__Internal")]
    private static extern void RequestStudyRoomData(string roomData);

    [DllImport("__Internal")]
    private static extern void RequestInterviewRoomData(string roomData);

    [DllImport("__Internal")]
    private static extern void RequestEvaluateRoomData(string roomData);

    // Server���� ������ ��ü
    private string userNickName;
    private List<string> studyRoomDataList = new List<string>();
    private List<string> interviewRoomDataList = new List<string>();
    private List<string> evaluateRoomDataList = new List<string>();
    private int interviewGender;
    private string pdfTitle;

    // Room Setting
    private List<List<string>> documentHashList = new List<List<string>>();
    private List<string> category_algo = new List<string> { };
    private List<string> category_network = new List<string> { };
    private List<string> category_operating_system = new List<string> {  };
    private List<string> category_database = new List<string> { };

    // Log Data
    private List<string> questionLogList = new List<string>();
    private List<string> answerLogList = new List<string>();
    private List<string> modelAnswerLogList = new List<string>();
    private List<string> comprehensiveEvaluationList = new List<string>();

    // roomData
    private StudyRoom currentStudyRoom;
    private InterviewRoom currentInterviewRoom;
    public bool isCreateEvaluteRoom = false;

    private void Awake()
    {
        // ������Ʈ ����
        DontDestroyOnLoad(gameObject);
    }

    // Start is called before the first frame update
    void Start()
    {
        /* ������ roomDataList�� ����
         [���� ���]
           - ����� ������
           - room ������
        */
        userNickName = string.Empty;
        interviewGender = 1;
        InitDocument();
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestData();
#endif
    }

    public void SetUserNickName(string nickName)
    {
        userNickName = nickName;
        TextMeshProUGUI nicknameText = GameObject.Find("NickName").GetComponent<TextMeshProUGUI>();
        nicknameText.text = userNickName + "���� �н� ���� ����";
    }

    public void SaveStudyRoomData(StudyRoom room)
    {
        // Room Data�� JSON �������� ��ȯ�Ͽ� ������ ����
        string roomData = JsonUtility.ToJson(room);
        LoadStudyRoomData(roomData);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendStudyRoomData(roomData);
#endif
    }

    public void SaveInterviewRoomData(InterviewRoom room)
    {
        // Room Data�� JSON �������� ��ȯ�Ͽ� ������ ����
        string roomData = JsonUtility.ToJson(room);
        LoadInterviewRoomData(roomData);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendInterviewRoomData(roomData);
#endif
    }

    public void SaveEvaluateRommData(InterviewRoom room)
    {
        // Room Data�� JSON �������� ��ȯ�Ͽ� ������ ����
        string roomData = JsonUtility.ToJson(room);
        LoadEvaluateRoomData(roomData);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendEvaluateRoomData(roomData);
#endif
    }

    public void RemoveInterviewRoomData(int roomID)
    {
        // roomData ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    DeleteInterviewRoomData(roomID);
#endif
    }

    public void SetInterViewGender(int gender)
    {
        interviewGender = gender;
    }

    public int GetInterViewGender() { return interviewGender; }

    public void LoadUserData(string nickname)
    {
        userNickName = nickname;
    }

    public void LoadStudyRoomData(string roomData)
    {
        // roomData JSON ������ ����
        studyRoomDataList.Add(roomData);
    }

    public void LoadInterviewRoomData(string roomData)
    {
        // roomData JSON ������ ����
        interviewRoomDataList.Add(roomData);
    }

    public void LoadEvaluateRoomData(string roomData)
    {
        // roomData JSON ������ ����
        evaluateRoomDataList.Add(roomData);
    }

    public List<string> GetStudyRoomDataList()
    {
        // roomDataList ��ȯ
        return studyRoomDataList;
    }

    public List<string> GetInterviewRoomDataList()
    {
        // roomDataList ��ȯ
        return interviewRoomDataList;
    }

    public List<string> GetEvaluateRoomDataList()
    {
        // roomDataList ��ȯ
        return evaluateRoomDataList;
    }

    public void RequestStudyRoomDataUnity(StudyRoom room)
    {
        // ���� ������ Study Room Data ������ �ѱ�
        string roomData = JsonUtility.ToJson(room);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestStudyRoomData(roomData);
#endif
    }

    public void RequestInterviewRoomDataUnity(InterviewRoom room)
    {
        // ���� ������ Interview Room Data ������ �ѱ�
        string roomData = JsonUtility.ToJson(room);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestInterviewRoomData(roomData);
#endif
    }

    public void RequestEvaluateRoomDataUnity(InterviewRoom room)
    {
        // ���� ������ Evaluate Room Data ������ �ѱ�
        string roomData = JsonUtility.ToJson(room);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestEvaluateRoomData(roomData);
#endif
    }

    public string GetUserNickName() 
    {  
        return userNickName;
    }

    public void SetPDFTitle(string title)
    {
        pdfTitle = title;
    }

    public void UploadFile()
    {
        // pdf, pptx ���� ���ε� �Լ� ȣ��
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestUploadFile();
#endif
    }

    public List<List<string>> GetDocumentHashList() { return documentHashList; }

    private void InitDocument()
    {
        documentHashList.Add(category_algo);
        documentHashList.Add(category_network);
        documentHashList.Add(category_operating_system);
        documentHashList.Add(category_database);
    }

    public void AddDocument(string category, string file)
    {
        switch(category)
        {
            case "�˰���":
                documentHashList[0].Add(file);
                break;
            case "��Ʈ��ũ":
                documentHashList[1].Add(file);
                break;
            case "�ü��":
                documentHashList[2].Add(file);
                break;
            case "�����ͺ��̽�":
                documentHashList[3].Add(file);
                break;
            default:
                break;
        }
    }

    public List<string> SetIndexByDocument(string document)
    {
        // ������ ���� ���� ����
        for(int i=0; i<studyRoomDataList.Count; i++)
        {
            StudyRoom newRoom = new StudyRoom();
            JsonUtility.FromJsonOverwrite(studyRoomDataList[i], newRoom);

            if (document == newRoom.titlePDF)
            {
                return newRoom.indexes;
            }
        }

        List<string> empty = new List<string>();
        return empty;
    }

    public void ClearLogData()
    {
        questionLogList.Clear();
        answerLogList.Clear();
        modelAnswerLogList.Clear();
        comprehensiveEvaluationList.Clear();
    }

    public void AddQuestionLogData(string message)
    {
        questionLogList.Add(message);
    }

    public void AddAnswerLogData(string message)
    {
        answerLogList.Add(message);
    }

    public void AddModelAnswerLogData(string message)
    {
        modelAnswerLogList.Add(message);
    }

    public void AddComprehensiveEvaluationLogData(string message)
    {
        comprehensiveEvaluationList.Add(message);
    }

    public void SetCurrentStudyRoom(StudyRoom room)
    {
        currentStudyRoom = room;
    }

    public void SetCurrentInterviewRoom(InterviewRoom room)
    {
        currentInterviewRoom = room;
    }

    public string GetCurrentInterviewRoom()
    {
        string roomData = JsonUtility.ToJson(currentInterviewRoom);
        return roomData;
    }

    public StudyRoom GetStudyRoom() { return  currentStudyRoom; }
    public InterviewRoom GetInterviewRoom() {  return currentInterviewRoom; }

    public List<string> GetQuestionList() { return questionLogList; }
    public List<string> GetAnswerList() { return answerLogList; }
    public List<string> GetModelAnswerList() { return modelAnswerLogList; }
    public List<string> GetComprehensiveEvaluationList() { return comprehensiveEvaluationList; }
}