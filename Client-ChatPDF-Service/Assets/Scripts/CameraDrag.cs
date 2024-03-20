using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraDrag : MonoBehaviour
{
    [SerializeField] private Vector2 xBoundWorld;
    [SerializeField] private Vector2 yBoundWorld;
    [SerializeField] public bool HorizentalDrag = true;
    [SerializeField] public bool VerticalDrag = true;
    [SerializeField] public float speedFactor = 10;

    private float leftLimit;
    private float rightLimit;
    private float topLimit;
    private float downLimit;

    public bool allowDrag = true;
    private void Start()
    {
        CalculateLimitsBasedOnAspectRatio();
    }

    private void Update()
    {
        CalculateBoundWorld();
    }

    public void UpdateBounds(Vector2 xBoundNew, Vector2 yBoundNew)
    {
        xBoundWorld = xBoundNew;
        yBoundWorld = yBoundNew;
        CalculateLimitsBasedOnAspectRatio();
    }

    private void CalculateBoundWorld()
    {
        float offset_x = 0;
        float offset_y = 0;
        if (Camera.main.fieldOfView < 60 && Camera.main.fieldOfView > 0)
        {
            offset_x = (60 - Camera.main.fieldOfView) / 10 * 2;
            offset_y = (60 - Camera.main.fieldOfView) / 10 * 2;
        }

        Vector2 xBoundNew = new Vector2(-offset_x, offset_x);
        Vector2 yBoundNew = new Vector2(-offset_y, offset_y);

        UpdateBounds(xBoundNew, yBoundNew);
    }

    private void CalculateLimitsBasedOnAspectRatio()
    {
        leftLimit = xBoundWorld.x - Camera.main.ViewportToWorldPoint(new Vector3(0, 0, 0)).x;
        rightLimit = xBoundWorld.y - Camera.main.ViewportToWorldPoint(new Vector3(1, 0, 0)).x;
        downLimit = yBoundWorld.x - Camera.main.ViewportToWorldPoint(new Vector3(0, 0, 0)).y;
        topLimit = yBoundWorld.y - Camera.main.ViewportToWorldPoint(new Vector3(0, 1, 0)).y;
    }

    Vector3 lastPosView; // we use viewport because we don't want devices pixel density affect our swipe speed
    private void LateUpdate()
    {
        if (allowDrag)
        {
            if (Input.GetMouseButtonDown(0))
            {
                lastPosView = Camera.main.ScreenToViewportPoint(Input.mousePosition);
            }
            else if (Input.GetMouseButton(0))
            {
                var newPosView = Camera.main.ScreenToViewportPoint(Input.mousePosition);
                var cameraMovment = (lastPosView - newPosView) * speedFactor;
                lastPosView = newPosView;

                cameraMovment = Limit2Bound(cameraMovment);

                if (HorizentalDrag)
                    Camera.main.transform.Translate(new Vector3(cameraMovment.x, 0, 0));
                if (VerticalDrag)
                    Camera.main.transform.Translate(new Vector3(0, cameraMovment.y, 0));
            }
        }
    }

    private Vector3 Limit2Bound(Vector3 distanceView)
    {
        if (distanceView.x < 0) // Check left limit
        {
            if (Camera.main.transform.position.x + distanceView.x < leftLimit)
            {
                distanceView.x = leftLimit - Camera.main.transform.position.x;
            }
        }
        else // Check right limit
        {
            if (Camera.main.transform.position.x + distanceView.x > rightLimit)
            {
                distanceView.x = rightLimit - Camera.main.transform.position.x;
            }
        }

        if (distanceView.y < 0) // Check down limit
        {
            if (Camera.main.transform.position.y + distanceView.y < downLimit)
            {
                distanceView.y = downLimit - Camera.main.transform.position.y;
            }
        }
        else // Check top limit
        {
            if (Camera.main.transform.position.y + distanceView.y > topLimit)
            {
                distanceView.y = topLimit - Camera.main.transform.position.y;
            }
        }

        return distanceView;
    }

}
