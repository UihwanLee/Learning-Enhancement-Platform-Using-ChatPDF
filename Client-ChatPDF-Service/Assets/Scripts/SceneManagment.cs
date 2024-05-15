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

    public void LoadLobbyAndCreateEvaluateRoom()
    {
        if (server) server.isCreateEvaluteRoom = true;
        // Lobby ������ �̵�
        SceneManager.LoadScene(1);
    }

    public void LoadStudyRoom(StudyRoom room)
    {
        // StudyRoom �̵� �� ���� ����
        if (server)
        {
            server.SetPDFTitle(room.titlePDF);
            server.RequestStudyRoomDataUnity(room);
            server.SetCurrentStudyRoom(room);
        }

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
            server.SetCurrentInterviewRoom(room);
        }

        // InterviewRoom ������ �̵�
        SceneManager.LoadScene(3);
    }

    public void LoadEvaluateRoom(InterviewRoom room)
    {
        // roomData �ҷ��ͼ� logData ����
        if(server)
        {
            server.RequestEvaluateRoomDataUnity(room);
        }

        SceneManager.LoadScene(4);
    }
}
