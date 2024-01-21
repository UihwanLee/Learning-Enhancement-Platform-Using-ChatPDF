using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using TMPro;

public class ButtonManager : MonoBehaviour
{
    private int score = 0;

    [SerializeField]
    private TextMeshProUGUI sampleText;

    [SerializeField]
    private GameObject sendButton;

    [SerializeField]
    private GameObject listenButton;

    public int Score
    {
        get
        {
            return score;
        }
        set
        {
            score = value;
            sampleText.text = score.ToString();
            Debug.Log(score);
        }
    }

    public void BtnClick()
    {
        Score += 1;
    }

    // Button Active On/Off
    public void SetButton(GameObject button)
    {
        if(button.gameObject.activeSelf)
        {
            button.gameObject.SetActive(false);
            listenButton.SetActive(true);
            sendButton.SetActive(false);
        }
        else
        {
            button.gameObject.SetActive(true);
            listenButton.SetActive(false);
            sendButton.SetActive(true);
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }
}
