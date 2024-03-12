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

    // Server���� ������ ��ü
    private string userNickName;
    private List<string> interviewRoomDataList = new List<string>();
    private int interviewGender;

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

    public void SaveInterviewRoomData(InterviewRoom room)
    {
        // Room Data�� JSON �������� ��ȯ�Ͽ� ������ ����
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
        // roomData JSON ������ ����
        interviewRoomDataList.Add(roomData);
    }

    public List<string> GetInterviewRoomDataList()
    {
        // roomDataList ��ȯ
        return interviewRoomDataList;
    }

    public string GetUserNickName() 
    {  
        return userNickName;
    }
}