using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InterviewManager : MonoBehaviour
{
    // 인터뷰 프리팹
    [SerializeField]
    private GameObject[] interviewer;

    // 현재 면접관 프리팹
    private GameObject currentInterviewer;

    // 서버 클래스
    private Server server;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        currentInterviewer = null;

        if (server)
        {
            // 면접관 생성
            CreateInterviewer(server.GetInterViewGender());
        }
        else
        {
            CreateInterviewer(1);
        }
    }

    public void CreateInterviewer(int gender)
    {
        // 인터뷰 오브젝트 생성 및 초기화
        currentInterviewer = Instantiate(interviewer[gender]);
    }
}
