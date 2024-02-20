using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public struct RoomSettingData
{
    // Room Setting
    public string title;
    public string category;
    public int index;

    // Prompt Setting
    public int interviewer;     // ������ ��
    public int styleInterview;  // ���� ��Ÿ��
}

public class RoomSetting : MonoBehaviour
{
    private string title;
    private string category;
    private int index;

    private int interviewer;     
    private int styleInterview;  

    public void SetTitle(InputField title)
    {
        this.title = title.text;
    }
}
