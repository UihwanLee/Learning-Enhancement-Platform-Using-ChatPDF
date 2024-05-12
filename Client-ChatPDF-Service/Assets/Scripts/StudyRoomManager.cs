using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class StudyRoomManager : MonoBehaviour
{
    [Header("StudyRoom")]
    // StudyRoom 생성될 부모 오브젝트
    [SerializeField]
    private GameObject parent;

    // StudyRoom 프리팹
    [SerializeField]
    private GameObject prefab;

    // StudyRoom 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();

    // RoomSetting variable
    private string title;
    private string titlePDF;

    // InterviewRoom
    public StudyRoom newRoom;
    private List<string> roomDataList;

    // 서버 클래스
    private Server server;

    [Header("Manager")]
    // 씬 매니저 클래스
    [SerializeField]
    private SceneManagment sceneManager;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        // 방 초기 생성
        if (server)
        {
            newRoom = new StudyRoom();
            roomDataList = server.GetInterviewRoomDataList();

            if(roomDataList.Count > 0)
            {
                foreach (string roomData in roomDataList)
                {
                    InitCreateRoom(roomData);
                }
            }
            else
            {
                // 초기 StudyRoom 생성
                CreateRecommendStudyRoom();
            }

            // 방 정렬
            SortRoomByID();
        }
    }

    private void CreateRecommendStudyRoom()
    {
        this.title = "알고리즘";
        this.titlePDF = "Alogrithm Notes";

        CreateRoom(this.title, this.titlePDF);
    }

    private void InitCreateRoom(string roomData)
    {
        // 초기 방 생성 
        JsonUtility.FromJsonOverwrite(roomData, newRoom);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 적용
        var room = roomObj.GetComponent<StudyRoom>();
        room.id = roomList.Count;
        room.title = this.title;
        room.titlePDF = this.titlePDF;

        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.titlePDF;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadStudyRoom(room.titlePDF));
    }

    public void CreateRoom(string category, string pdf)
    {
        // Room 생성
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 적용
        var room = roomObj.GetComponent<StudyRoom>();
        room.id = roomList.Count;
        room.title = category;
        room.titlePDF = pdf;
        room.category = category;

        roomList.Add(roomObj);

        // UI 방 목록 생성
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.titlePDF;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadStudyRoom(room.titlePDF));

        // Room Data 저장
        if (server)
        {
            server.SaveStudyRoomData(room);
        }

        SortRoomByID();
    }

    public void SortRoomByID()
    {
        // ID 순대로 방 정렬(생성된 순으로 정렬)
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
