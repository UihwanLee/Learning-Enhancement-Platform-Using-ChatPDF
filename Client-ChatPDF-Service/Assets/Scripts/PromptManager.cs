using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class PromptManager : MonoBehaviour
{
    [SerializeField]
    string prompt;

    [SerializeField]
    private TMP_InputField inputField;

    [SerializeField]
    private TextMeshProUGUI promptGUI;

    [DllImport("__Internal")]
    private static extern void sendPrompt(string prompt);

    [DllImport("__Internal")]
    private static extern void listenPrompt();

    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void ListenAgain()
    {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    listenPrompt();
#endif
    }

    public void Send()
    {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    prompt = inputField.text;
    sendPrompt(prompt);
#endif
    }

    public void ReceivePrompt(string _prompt)
    {
        prompt = _prompt;
        promptGUI.text = prompt;
    }
}
