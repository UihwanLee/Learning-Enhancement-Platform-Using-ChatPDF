using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class InterviewRoom : MonoBehaviour
{
    // Room Setting
    public int id;
    public string nickname;
    public string title;
    public string category;
    public string document;
    public string index;

    // Prompt Setting
    public int interviewType;       // 사전조사 or 기본면접
    public int interviewerCount;    // 면접자 수
    public int interviewerGender;   // 면접자 성별
    public float interviewTime;       // 면접 답변 시간
    public int interviewStyle;      // 면접 스타일
}
