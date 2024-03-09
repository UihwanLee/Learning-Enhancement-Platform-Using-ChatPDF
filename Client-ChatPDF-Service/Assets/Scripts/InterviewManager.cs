using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InterviewManager : MonoBehaviour
{
    // ���ͺ� ������
    [SerializeField]
    private GameObject[] interviewer;

    private GameObject currentInterviewer;

    // Start is called before the first frame update
    void Start()
    {
        // ������ ����
        CreateInterviewer(1);

        currentInterviewer = null;
    }

    public void CreateInterviewer(int gender)
    {
        // ���ͺ� ������Ʈ ���� �� �ʱ�ȭ
        currentInterviewer = Instantiate(interviewer[gender]);
    }
}
