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

    // Start is called before the first frame update
    void Start()
    {
        
    }
}
