using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class RoomManager : MonoBehaviour
{
    [SerializeField]
    private GameObject parent;

    [SerializeField]
    private GameObject prefab;

    [SerializeField]
    private TMP_InputField titleInputField;

    // Room 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    [SerializeField]
    private SceneManagment sceneManager;

    private string title;
    private string category;
    private int index;

    private int interviewer;
    private int styleInterview;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void OpenCreateRoom()
    {
        SetRecommendRoom();
    }

    public void SetRecommendRoom()
    {
        InitTitle();
        SetCategory(0);
        SetIndex();
        SetInterviewer(1);
    }

    public void InitTitle()
    {
        this.titleInputField.text = "나만의 학습방(" + roomList.Count + ")";
    }

    public void SetTitle()
    {
        this.title = this.titleInputField.text;
    }

    public void SetCategory(int category)
    {
        switch (category)
        {
            case 0:
                this.category = "알고리즘";
                break;
            case 1:
                this.category = "네트워크";
                break;
            case 2:
                this.category = "운영체제";
                break;
            case 3:
                this.category = "Web";
                break;
            default:
                break;
        }
    }

    public void SetIndex()
    {
        this.index = 0;
    }

    public void SetInterviewer(int num)
    {
        this.interviewer = num;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void TryCreateRoom()
    {

    }

    public void CreateRoom()
    {
        // Room 생성
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 설정
        SetTitle();

        // Room Setting 적용
        var room = roomObj.GetComponent<Room>();
        room.roomData.id = roomList.Count;
        room.roomData.title = this.title;
        room.roomData.category = this.category;
        room.roomData.index = this.index;
        //room.roomData.interviewer = this.interviewer;
        roomList.Add(roomObj);

        // UI 설정
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(sceneManager.LoadRoom);
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.roomData.id));
    }

    public void DestroyRoom(int id)
    {
        // prefab 오브젝트 삭제
        Destroy(roomList[id]);

        // 리스트에서 삭제
        for (int i = roomList.Count - 1; i >= 0; i--)
        {
            if(i== id)
            {
                roomList.Remove(roomList[i]);
            }
        }
    }
}
