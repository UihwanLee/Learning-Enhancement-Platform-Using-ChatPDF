using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class InterviewManager : MonoBehaviour
{
    // ���ͺ� ������
    [SerializeField]
    private GameObject[] interviewer;

    // ���� ������ ������
    private GameObject currentInterviewer;
    private Vector3 initPos;
    private Quaternion initRot;
    private int currentInterviewerIDX;

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
        initPos = currentInterviewer.GetComponent<Transform>().position;
        initRot = currentInterviewer.GetComponent<Transform>().rotation;
        currentInterviewerIDX = gender;
    }

    public void SetInterviewerAnimThink(int active)
    {
        bool isActive = (active >= 1) ? true : false;
        if(active >= 1)
        {
            currentInterviewer.GetComponent<Animator>().enabled = false;
            currentInterviewer.GetComponent<Transform>().position = initPos;
            currentInterviewer.GetComponent<Transform>().rotation = initRot;
            currentInterviewer.GetComponent<Animator>().enabled = true;
        }
        currentInterviewer.GetComponent<Animator>().SetBool("isListening", isActive);
    }

    public void SetTalking(int active)
    {
        bool isActive = (active >= 1) ? true : false;
        if (active >= 1)
        {
            currentInterviewer.GetComponent<Animator>().enabled = false;
            currentInterviewer.GetComponent<Transform>().position = initPos;
            currentInterviewer.GetComponent<Transform>().rotation = initRot;
            currentInterviewer.GetComponent<Animator>().enabled = true;
        }
        currentInterviewer.GetComponent<Animator>().SetBool("isTalking", true);
    }
}
