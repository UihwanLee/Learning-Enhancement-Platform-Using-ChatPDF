using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneManagment : MonoBehaviour
{
    public void LoadLobby()
    {
        // Lobby æ¿¿∏∑Œ ¿Ãµø
        SceneManager.LoadScene(1);
    }

    public void LoadRoom()
    {
        // Room æ¿¿∏∑Œ ¿Ãµø
        SceneManager.LoadScene(2);
    }
}
