using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InterviewManager : MonoBehaviour
{
    // ���ͺ� ������
    [SerializeField]
    private GameObject[] interviewer;

    // ���� ������ ������
    private GameObject currentInterviewer;

    // ���� Ŭ����
    private Server server;

    // Start is called before the first frame update
    void Start()
    {
        // Sever �ʱ�ȭ
        server = FindObjectOfType<Server>();

        currentInterviewer = null;

        if (server)
        {
            // ������ ����
            CreateInterviewer(server.GetInterViewGender());
        }
        else
        {
            CreateInterviewer(1);
        }
    }

    public void CreateInterviewer(int gender)
    {
        // ���ͺ� ������Ʈ ���� �� �ʱ�ȭ
        currentInterviewer = Instantiate(interviewer[gender]);
    }
}
