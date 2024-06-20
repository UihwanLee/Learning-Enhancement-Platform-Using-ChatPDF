using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class StudyRoom : MonoBehaviour
{
    // Room Setting
    public int id;
    public string nickname;
    public string title;
    public string titlePDF;
    public string category;
    public List<string> indexes = new List<string>();
}
