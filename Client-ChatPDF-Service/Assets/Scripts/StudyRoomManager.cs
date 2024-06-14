using System;
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

    // InterviewRoom
    public StudyRoom newRoom;
    private List<string> roomDataList;

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

        // �� �ʱ� ����
        if (server)
        {
            newRoom = new StudyRoom();
            roomDataList = server.GetStudyRoomDataList();

            if(roomDataList.Count > 0)
            {
                foreach (string roomData in roomDataList)
                {
                    InitCreateRoom(roomData);
                }
            }

            // �� ����
            SortRoomByID();
        }
    }

    private void InitCreateRoom(string roomData)
    {

        // �ʱ� �� ���� 
        JsonUtility.FromJsonOverwrite(roomData, newRoom);

        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        var room = roomObj.GetComponent<StudyRoom>();
        room.id = newRoom.id;
        room.nickname = newRoom.nickname;
        room.title = newRoom.title;
        room.titlePDF = newRoom.titlePDF;
        room.category = newRoom.category;
        room.indexes = newRoom.indexes;

        roomList.Add(roomObj);

        // UI �� ��� ����
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.titlePDF;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadStudyRoom(room));

        if (server)
        {
            server.AddDocument(room.category, room.titlePDF);
        }
    }

    public static void SplitString(string input, out string firstPart, out string secondPart, out string thirdPart, out string FourPart, out string FithPart, out string SixPart, out string SevenPart)
    {
        char[] delimiter = { '/' };
        string[] parts = input.Split(delimiter, StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length >= 2)
        {
            firstPart = parts[0];
            secondPart = parts[1];
            thirdPart = parts[2];
            FourPart = parts[3];
            FithPart = parts[4];
            SixPart = parts[5];
            SevenPart = parts[6];
        }
        else
        {
            firstPart = input;
            secondPart = string.Empty;
            thirdPart = string.Empty;
            FourPart = string.Empty;
            FithPart = string.Empty;
            SixPart = string.Empty;
            SevenPart = string.Empty;
        }
    }

    public void CreateRoom(string data)
    {
        string category, file, index1, index2, index3, index4, index5;
        SplitString(data, out category, out file, out index1, out index2, out index3, out index4, out index5);

        // Room ����
        var roomObj = Instantiate(prefab, parent.transform) as GameObject;

        // Room Setting ����
        var room = roomObj.GetComponent<StudyRoom>();
        room.id = roomList.Count;
        if(server) room.nickname = server.GetUserNickName();
        room.title = "������ �н���(" + roomList.Count + ")";
        room.category = category;
        room.titlePDF = file;
        room.indexes[0] = index1;
        room.indexes[1] = index2;
        room.indexes[2] = index3;
        room.indexes[3] = index4;
        room.indexes[4] = index5;

        roomList.Add(roomObj);

        // UI �� ��� ����
        string roomTitle = "<size=36>" + room.title + "|</size> " + " <size=20>" + room.titlePDF;
        room.gameObject.transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = roomTitle;
        room.gameObject.transform.GetChild(1).GetComponent<Button>().onClick.AddListener(() => sceneManager.LoadStudyRoom(room));

        // Room Data ����
        if (server)
        {
            server.SaveStudyRoomData(room);
            server.AddDocument(category, file);
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
