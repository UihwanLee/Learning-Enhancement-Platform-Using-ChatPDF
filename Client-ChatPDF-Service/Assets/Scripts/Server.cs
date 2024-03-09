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

    // Server에서 관리할 객체
    private string userNickName;
    private List<string> roomDataList = new List<string>();
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
        interviewGender = 1;
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    RequestData();
#endif
    }

    public void SaveRoomData(Room room)
    {
        // Room Data를 JSON 형식으로 변환하여 서버에 저장
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
        // roomData JSON 데이터 저장
        roomDataList.Add(roomData);
    }

    public List<string> GetRoomDataList()
    {
        // roomDataList 반환
        return roomDataList;
    }
}