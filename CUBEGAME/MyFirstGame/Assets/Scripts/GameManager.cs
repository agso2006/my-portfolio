using UnityEngine;
using UnityEngine.SceneManagement; // We use this when we want to go to another scene
public class GameManager : MonoBehaviour
{
    bool gameHasEnded = false;
    public float restartDelay = 1f;

    public GameObject completeLevelUI;

    public void CompleteLevel()
    {
        completeLevelUI.SetActive(true);
    }

    public void EndGame()
    {
        if (gameHasEnded == false)
        {
            gameHasEnded = true;
            Debug.Log("GAME OVER");
            Invoke("Restart", restartDelay);
        }

    }

    void Restart()
    {
        // SceneManager.GetActiveScene().name-->returns the name of the current scene
        // SceneManager.LoadScene()-->Load the scene
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
 