using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;

public class Server : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void RequestData();

    [DllImport("__Internal")]
    private static extern void SendInterviewRoomData(string roomData);

    // Server에서 관리할 객체
    private string userNickName;
    private List<string> interviewRoomDataList = new List<string>();
    private int interviewGender;

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

    public void SaveInterviewRoomData(InterviewRoom room)
    {
        // Room Data를 JSON 형식으로 변환하여 서버에 저장
        string roomData = JsonUtility.ToJson(room);
        LoadInterviewRoomData(roomData);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendInterviewRoomData(roomData);
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
}