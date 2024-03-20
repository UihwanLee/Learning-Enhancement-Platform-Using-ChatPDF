using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraZoomManager : MonoBehaviour
{
    // 마우스 휠 속도
    [SerializeField]
    private float WheelSpeed = 10;

    private Camera ZoomCamera;

    // Start is called before the first frame update
    void Start()
    {
        ZoomCamera = Camera.main;
    }

    // Update is called once per frame
    void Update()
    {
        CameraZoomUpdate();
    }

    private void CameraZoomUpdate()
    {
        if (ZoomCamera.orthographic)
        {
            ZoomCamera.orthographicSize -= Input.GetAxis("Mouse ScrollWheel") * WheelSpeed;
        }
        else
        {
            // Zoom IN/OUT
            ZoomCamera.fieldOfView -= Input.GetAxis("Mouse ScrollWheel") * WheelSpeed;

            // 예외 처리
            if (ZoomCamera.fieldOfView > 60) ZoomCamera.fieldOfView = 60;
            if (ZoomCamera.fieldOfView < 10) ZoomCamera.fieldOfView = 10;
        }
    }
}
