using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class EvaluateRoomManager : MonoBehaviour
{
    [Header("InterviewRoom")]
    // InterviewRoom ������ �θ� ������Ʈ
    [SerializeField]
    private GameObject parent;

    // InterviewRoom ������
    [SerializeField]
    private GameObject prefab;

    // InterviewRoom ��ü�� ������ RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();
    public InterviewRoom newRoom;
    private List<string> roomDataList;

    // ���� Ŭ����
    private Server server;

    [Header("Manager")]
    // �� �Ŵ��� Ŭ����
    [SerializeField]
    private SceneManagment sceneManager;

    // UI �Ŵ���
    [SerializeField]
    private UIManager uiManager;

    // Start is called before the first frame update
    void Start()
    {
        // Sever �ʱ�ȭ
        server = FindObjectOfType<Server>();

        // �� �ʱ� ����
        if (server)
        {
            roomDataList = server.GetInterviewRoomDataList();

            foreach (string roomData in roomDataList)
            {
                InitCreateRoom(roomData);
            }

            // �� ����
            SortRoomByID();

            // RoomSetting �ʱ�ȭ
            //InitRoomSetting();
        }
    }

    private void InitCreateRoom(string roomData)
    {
        // �ʱ� �� ���� 
        JsonUtility.FromJsonOverwrite(roomData, newRoom);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        var room = roomObj.GetComponent<InterviewRoom>();
        room.id = newRoom.id;
        room.title = newRoom.title;
        room.category = newRoom.category;
        room.index = newRoom.index;

        room.interviewerCount = newRoom.interviewerCount;
        room.interviewerGender = newRoom.interviewerGender;
        room.interviewTime = newRoom.interviewTime;
        room.interviewStyle = newRoom.interviewStyle;

        roomList.Add(roomObj);

        // UI �� ��� ����
        string roomTitle = "<size=36> �� |" + room.title + "|</size> " + " <size=20>" + room.title;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadEvaluateRoom(room));
    }

    public void CreateRoom(InterviewRoom interviewRoom)
    {
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        var room = roomObj.GetComponent<InterviewRoom>();
        room.id = interviewRoom.id;
        room.title = interviewRoom.title;
        room.category = interviewRoom.category;
        room.index = interviewRoom.index;
        room.document = interviewRoom.document;

        room.interviewType = interviewRoom.interviewType;
        room.interviewerCount = interviewRoom.interviewerCount;
        room.interviewerGender = interviewRoom.interviewerGender;
        room.interviewTime = interviewRoom.interviewTime;
        room.interviewStyle = interviewRoom.interviewStyle;

        roomList.Add(roomObj);

        // UI �� ��� ����
        string roomTitle = "<size=36> �� |" + room.title + "|</size> " + " <size=20>" + room.title;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadEvaluateRoom(room));

        // Room Data ����
        if (server)
        {
            server.SaveEvaluateRommData(room);
        }

        SortRoomByID();
    }

    public void SortRoomByID()
    {
        // ID ����� �� ����(������ ������ ����)
        roomList.Sort((a, b) => {
            InterviewRoom roomA = a.GetComponent<InterviewRoom>();
            InterviewRoom roomB = b.GetComponent<InterviewRoom>();
            if (roomA != null && roomB != null)
            {
                return roomB.id.CompareTo(roomA.id);
            }
            else
            {
                Debug.LogError("Room component not found on child object.");
                return 0;
            }
        });

        for (int i = 0; i < roomList.Count; i++)
        {
            roomList[i].transform.SetSiblingIndex(i);
        }
    }

    public void SortRoomByCategory()
    {
        // ī�װ� ����� �� ����(������ ������ ����)
        roomList.Sort((a, b) => {
            InterviewRoom roomA = a.GetComponent<InterviewRoom>();
            InterviewRoom roomB = b.GetComponent<InterviewRoom>();
            if (roomA != null && roomB != null)
            {
                return roomB.category.CompareTo(roomA.category);
            }
            else
            {
                Debug.LogError("Room component not found on child object.");
                return 0;
            }
        });

        for (int i = 0; i < roomList.Count; i++)
        {
            roomList[i].transform.SetSiblingIndex(i);
        }
    }
}
