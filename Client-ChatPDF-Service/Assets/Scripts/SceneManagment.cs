using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneManagment : MonoBehaviour
{
    public void LoadLobby()
    {
        // Lobby ������ �̵�
        SceneManager.LoadScene(1);
    }

    public void LoadRoom()
    {
        // Room ������ �̵�
        SceneManager.LoadScene(2);
    }
}
