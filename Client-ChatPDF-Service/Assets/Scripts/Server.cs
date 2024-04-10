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
    private static extern void DeleteInterviewRoomData(int roomDataID);

    [DllImport("__Internal")]
    private static extern void RequestUploadFile();

    // Server에서 관리할 객체
    private string userNickName;
    private List<string> studyRoomDataList = new List<string>();
    private List<string> interviewRoomDataList = new List<string>();
    private int interviewGender;
    private string pdfTitle;

    // Room Setting
    private List<List<string>> documentHashList = new List<List<string>>();
    private List<string> category_algo = new List<string> { "algo.pdf" };
    private List<string> category_network = new List<string> { "network.pdf" };
    private List<string> category_operating_system = new List<string> { "operating_system.pdf" };
    private List<string> category_web = new List<string> { "web.pdf" };

    private void Awake()
    {
        // 오브젝트 유지
        DontDestroyOnLoad(gameObject);
    }

    // Start is called before the first frame update
    void Start()
    {
        /* 서버에 roomDataList를 갱신
         [갱신 목록]
           - 사용자 데이터
           - room 데이터
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
        nicknameText.text = userNickName + "님의 학습 증진 서비스";
    }

    public void SaveStudyRoomData(StudyRoom room)
    {
        // Room Data를 JSON 형식으로 변환하여 서버에 저장
        string roomData = JsonUtility.ToJson(room);
        LoadStudyRoomData(roomData);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendStudyRoomData(roomData);
#endif
    }

    public void SaveInterviewRoomData(InterviewRoom room)
    {
        // Room Data를 JSON 형식으로 변환하여 서버에 저장
        string roomData = JsonUtility.ToJson(room);
        LoadInterviewRoomData(roomData);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendInterviewRoomData(roomData);
#endif
    }

    public void RemoveInterviewRoomData(int roomID)
    {
        // roomData 제거
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
        // roomData JSON 데이터 저장
        studyRoomDataList.Add(roomData);
    }

    public void LoadInterviewRoomData(string roomData)
    {
        // roomData JSON 데이터 저장
        interviewRoomDataList.Add(roomData);
    }

    public List<string> GetInterviewRoomDataList()
    {
        // roomDataList 반환
        return interviewRoomDataList;
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
        // pdf, pptx 문서 업로드 함수 호출
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
        documentHashList.Add(category_web);
    }

    public void AddAlgoDocument(int category, string file)
    {
        if (category < 0 || category >= documentHashList.Count()) return;

        documentHashList[category].Add(file);
    }
}