using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class InterviewRoom : MonoBehaviour
{
    // Room Setting
    public int id;
    public string title;
    public string category;
    public string document;
    public string index;

    // Prompt Setting
    public int interviewerCount;    // ������ ��
    public int interviewerGender;   // ������ ����
    public float interviewTime;       // ���� �亯 �ð�
    public int interviewStyle;      // ���� ��Ÿ��
}