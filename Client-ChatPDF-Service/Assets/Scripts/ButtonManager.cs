using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;

public class ButtonManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void StartSTT();

    [DllImport("__Internal")]
    private static extern void StopSTT();


    public void SetObject(GameObject obj)
    {
        if (obj.gameObject.activeSelf)
        {
            obj.gameObject.SetActive(false);
        }
        else
        {
            obj.gameObject.SetActive(true);
        }
    }

    public void StartVoice()
    {
        // ����ũ ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StartSTT();
#endif
    }

    public void StopVoice()
    {
        // ����ũ ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    StopSTT();
#endif
    }


    // Start is called before the first frame update
    void Start()
    {
        
    }
}
