using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class PromptManager : MonoBehaviour
{
    [SerializeField]
    string cur_prompt;

    [SerializeField]
    private TextMeshProUGUI promptGUI;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void ShowPrompt(string prompt)
    {
        cur_prompt = prompt;
        promptGUI.text = cur_prompt;
    }
}
