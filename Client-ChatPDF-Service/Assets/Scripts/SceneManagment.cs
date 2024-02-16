using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneManagment : MonoBehaviour
{
    public void LoadLobby()
    {
        SceneManager.LoadScene(1);
    }

    public void LoadRoom()
    {
        SceneManager.LoadScene(2);
    }
}
