using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Room : MonoBehaviour
{
    public RoomData roomData;

    public void SaveData()
    {
        string data = JsonUtility.ToJson(roomData);
        Debug.Log(data);
    }
}

[System.Serializable]
public class RoomData
{
    // Room Setting
    public int id;
    public string title;
    public string category;
    public int index;

    // Prompt Setting
    public int interviewerCount;    // 면접자 수
    public int interviewerGender;   // 면접자 성별
    public int interviewTime;       // 면접 답변 시간
    public int interviewStyle;      // 면접 스타일

}
