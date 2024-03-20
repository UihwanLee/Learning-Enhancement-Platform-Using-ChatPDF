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

    public void LoadStudyRoom(string titlePDF)
    {
        // StudyRoom 이동 전 성별 설정
        if (server) server.SetPDFTitle(titlePDF);

        // StudyRoom 씬으로 이동
        SceneManager.LoadScene(2);
    }

    public void LoadInterviewRoom(int interviewGender)
    {
        // InterviewRoom 이동 전 성별 설정
        if (server) server.SetInterViewGender(interviewGender);

        // InterviewRoom 씬으로 이동
        SceneManager.LoadScene(3);
    }
}
