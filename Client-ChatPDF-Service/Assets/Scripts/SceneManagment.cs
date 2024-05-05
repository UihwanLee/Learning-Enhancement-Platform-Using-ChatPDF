using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneManagment : MonoBehaviour
{
    private Server server;

    private void Start()
    {
        server = FindObjectOfType<Server>();
    }


    public void LoadLobby()
    {
        // Lobby ������ �̵�
        SceneManager.LoadScene(1);
    }

    public void LoadStudyRoom(string titlePDF)
    {
        // StudyRoom �̵� �� ���� ����
        if (server) server.SetPDFTitle(titlePDF);

        // StudyRoom ������ �̵�
        SceneManager.LoadScene(2);
    }

    public void LoadInterviewRoom(InterviewRoom room)
    {
        // InterviewRoom �̵� �� ���� ����
        if (server)
        {
            server.SetInterViewGender(room.interviewerGender);
            // room Data ����
            server.RequestInterviewRoomDataUnity(room);
        }

        // InterviewRoom ������ �̵�
        SceneManager.LoadScene(3);
    }

    public void LoadEvaluateRoom(int id)
    {
        // roomData �ҷ��ͼ� logData ����
        if(server)
        {

        }

        SceneManager.LoadScene(4);
    }
}
