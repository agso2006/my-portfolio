using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour {

    public Transform player; // Responsible for position, rotation, etc
    public Text scoreText; // Text for the Text(Script) component on the inspector

	// Update is called once per frame
	void Update () {

        scoreText.text = player.position.z.ToString("0");// Quotation for being not a float number
            
		
	}
}
