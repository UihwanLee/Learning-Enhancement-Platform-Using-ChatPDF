using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class EvaluateRoomManager : MonoBehaviour
{
    [Header("InterviewRoom")]
    // InterviewRoom 생성될 부모 오브젝트
    [SerializeField]
    private GameObject parent;

    // InterviewRoom 프리팹
    [SerializeField]
    private GameObject prefab;

    // InterviewRoom 전체를 관리할 RoomList
    [SerializeField]
    private List<GameObject> roomList = new List<GameObject>();
    public InterviewRoom newRoom;
    private List<string> roomDataList;

    // 서버 클래스
    private Server server;

    [Header("Manager")]
    // 씬 매니저 클래스
    [SerializeField]
    private SceneManagment sceneManager;

    // UI 매니저
    [SerializeField]
    private UIManager uiManager;

    // Start is called before the first frame update
    void Start()
    {
        // Sever 초기화
        server = FindObjectOfType<Server>();

        // 방 초기 생성
        if (server)
        {
            roomDataList = server.GetInterviewRoomDataList();

            foreach (string roomData in roomDataList)
            {
                InitCreateRoom(roomData);
            }

            // 방 정렬
            SortRoomByID();

            // RoomSetting 초기화
            //InitRoomSetting();
        }
    }

    private void InitCreateRoom(string roomData)
    {
        // 초기 방 생성 
        JsonUtility.FromJsonOverwrite(roomData, newRoom);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 적용
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

        // UI 방 목록 생성
        string roomTitle = "<size=36> 평가 |" + room.title + "|</size> " + " <size=20>" + room.title;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadEvaluateRoom(room));
    }

    public void CreateRoom(InterviewRoom interviewRoom)
    {
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting 적용
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

        // UI 방 목록 생성
        string roomTitle = "<size=36> 평가 |" + room.title + "|</size> " + " <size=20>" + room.title;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadEvaluateRoom(room));

        // Room Data 저장
        if (server)
        {
            server.SaveEvaluateRommData(room);
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

    public void SortRoomByCategory()
    {
        // 카테고리 순대로 방 정렬(생성된 순으로 정렬)
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
