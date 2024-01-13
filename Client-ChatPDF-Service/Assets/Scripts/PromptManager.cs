using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using System.Runtime.InteropServices;

public class PromptManager : MonoBehaviour
{
    [SerializeField]
    string prompt;

    [SerializeField]
    private TextMeshProUGUI promptGUI;

    [DllImport("__Internal")]
    private static extern void sendPrompt(string prompt);

    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void Listen_Again()
    {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    sendPrompt(prompt);
#endif
    }

    public void ShowPrompt(string _prompt)
    {
        prompt = _prompt;
        promptGUI.text = prompt;
    }
}
