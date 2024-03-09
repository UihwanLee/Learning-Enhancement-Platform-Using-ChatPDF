using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InterviewManager : MonoBehaviour
{
    // 인터뷰 프리팹
    [SerializeField]
    private GameObject[] interviewer;

    private GameObject currentInterviewer;

    // Start is called before the first frame update
    void Start()
    {
        // 면접관 생성
        CreateInterviewer(1);

        currentInterviewer = null;
    }

    public void CreateInterviewer(int gender)
    {
        // 인터뷰 오브젝트 생성 및 초기화
        currentInterviewer = Instantiate(interviewer[gender]);
    }
}
