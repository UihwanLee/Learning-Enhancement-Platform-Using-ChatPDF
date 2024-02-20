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
    public int interviewer;     // 면접자 수
    public int styleInterview;  // 면접 스타일
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
