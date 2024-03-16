using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class Server : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void RequestData();

    [DllImport("__Internal")]
    private static extern void SendRoomData(string roomData);

    // Server���� ������ ��ü
    private string userNickName;
    private List<string> roomDataList = new List<string>();
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
        interviewGender = 1;
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestData();
#endif
    }

    public void SaveRoomData(Room room)
    {
        // Room Data�� JSON �������� ��ȯ�Ͽ� ������ ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    string roomData = JsonUtility.ToJson(room.roomData);
    SendRoomData(roomData);
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

    public void LoadRoomData(string roomData)
    {
        // roomData JSON ������ ����
        roomDataList.Add(roomData);
    }

    public List<string> GetRoomDataList()
    {
        // roomDataList ��ȯ
        return roomDataList;
    }
}