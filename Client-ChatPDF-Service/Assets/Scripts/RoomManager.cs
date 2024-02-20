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

    // Room ��ü�� ������ RoomList
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
        this.titleInputField.text = "������ �н���(" + roomList.Count + ")";
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
                this.category = "�˰���";
                break;
            case 1:
                this.category = "��Ʈ��ũ";
                break;
            case 2:
                this.category = "�ü��";
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
        // Room ����
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        SetTitle();

        // Room Setting ����
        var room = roomObj.GetComponent<Room>();
        room.roomData.id = roomList.Count;
        room.roomData.title = this.title;
        room.roomData.category = this.category;
        room.roomData.index = this.index;
        //room.roomData.interviewer = this.interviewer;
        roomList.Add(roomObj);

        // UI ����
        string roomTitle = "<size=36>" + room.roomData.title + "|</size> " + " <size=20>" + room.roomData.category + " | " + room.roomData.index + "</size>" ;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(sceneManager.LoadRoom);
        room.gameObject.transform.GetChild(2).GetComponent<Button>().onClick.AddListener(()=> DestroyRoom(room.roomData.id));
    }

    public void DestroyRoom(int id)
    {
        // prefab ������Ʈ ����
        Destroy(roomList[id]);

        // ����Ʈ���� ����
        for (int i = roomList.Count - 1; i >= 0; i--)
        {
            if(i== id)
            {
                roomList.Remove(roomList[i]);
            }
        }
    }
}
