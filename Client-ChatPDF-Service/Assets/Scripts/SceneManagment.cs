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

    public void LoadRoom(int interviewGender)
    {
        // Room �̵� �� ���� ����
        if(server) server.SetInterViewGender(interviewGender);

        // Room ������ �̵�
        SceneManager.LoadScene(2);
    }
}
