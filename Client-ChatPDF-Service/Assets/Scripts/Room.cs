using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Room : MonoBehaviour
{
    public RoomData roomData;
}

[System.Serializable]
public class RoomData
{
    // Room Setting
    public int      id;
    public string   title;
    public string   category;
    public int      index;

    // Prompt Setting
    public int      interviewerCount;    // ������ ��
    public int      interviewerGender;   // ������ ����
    public float    interviewTime;       // ���� �亯 �ð�
    public int      interviewStyle;      // ���� ��Ÿ��

}
