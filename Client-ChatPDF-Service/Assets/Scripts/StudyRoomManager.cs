using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class StudyRoomManager : MonoBehaviour
{
    [Header("StudyRoom")]
    // StudyRoom ������ �θ� ������Ʈ
    [SerializeField]
    private GameObject parent;

    // StudyRoom ������
    [SerializeField]
    private GameObject prefab;

    // StudyRoom ��ü�� ������ RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    // RoomSetting variable
    private string title;
    private string titlePDF;

    // ���� Ŭ����
    private Server server;

    [Header("Manager")]
    // �� �Ŵ��� Ŭ����
    [SerializeField]
    private SceneManagment sceneManager;

    // Start is called before the first frame update
    void Start()
    {
        // Sever �ʱ�ȭ
        server = FindObjectOfType<Server>();

        // �ʱ� StudyRoom ����
        CreateRecommendStudyRoom();
    }

    private void CreateRecommendStudyRoom()
    {
        this.title = "�˰���";
        this.titlePDF = "Alogrithm Notes";

        CreateRoom();
    }

    public void CreateRoom()
    {
        // Room ����
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        var room = roomObj.GetComponent<StudyRoom>();
        room.id = roomList.Count;
        room.title = this.title;
        room.titlePDF = this.titlePDF;

        roomList.Add(roomObj);

        // UI �� ��� ����
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.titlePDF;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadStudyRoom(room.titlePDF));

        // Room Data ����
        if (server)
        {
            //server.SaveInterviewRoomData(room);
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
}
