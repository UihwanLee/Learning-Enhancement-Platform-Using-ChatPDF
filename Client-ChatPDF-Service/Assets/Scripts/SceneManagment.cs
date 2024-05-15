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
        // Lobby 씬으로 이동
        SceneManager.LoadScene(1);
    }

    public void LoadLobbyAndCreateEvaluateRoom()
    {
        if (server) server.isCreateEvaluteRoom = true;
        // Lobby 씬으로 이동
        SceneManager.LoadScene(1);
    }

    public void LoadStudyRoom(StudyRoom room)
    {
        // StudyRoom 이동 전 성별 설정
        if (server)
        {
            server.SetPDFTitle(room.titlePDF);
            server.RequestStudyRoomDataUnity(room);
            server.SetCurrentStudyRoom(room);
        }

        // StudyRoom 씬으로 이동
        SceneManager.LoadScene(2);
    }

    public void LoadInterviewRoom(InterviewRoom room)
    {
        // InterviewRoom 이동 전 성별 설정
        if (server)
        {
            server.SetInterViewGender(room.interviewerGender);
            // room Data 전달
            server.RequestInterviewRoomDataUnity(room);
            server.SetCurrentInterviewRoom(room);
        }

        // InterviewRoom 씬으로 이동
        SceneManager.LoadScene(3);
    }

    public void LoadEvaluateRoom(InterviewRoom room)
    {
        // roomData 불러와서 logData 세팅
        if(server)
        {
            server.RequestEvaluateRoomDataUnity(room);
        }

        SceneManager.LoadScene(4);
    }
}
