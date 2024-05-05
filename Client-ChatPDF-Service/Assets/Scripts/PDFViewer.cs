using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;
using TMPro;
using UnityEngine.Networking;

public class PDFViewer : MonoBehaviour
{
    [SerializeField]
    private Sprite[] sampleImages;

    private List<Texture> textures = new List<Texture>();

    [SerializeField]
    private Material pdfSlide;

    [SerializeField]
    private GameObject prevButton;

    [SerializeField]
    private GameObject nextButton;

    [SerializeField]
    private TextMeshProUGUI currentPageText;

    [SerializeField]
    private Sprite[] buttonSprites;

    int page;

    // Start is called before the first frame update
    void Start()
    {
        textures.Clear();

        string url = "https://i.pinimg.com/564x/c6/3e/ff/c63effc78080418c1a4773e31d6fd1c5.jpg";
        GetTextureFromURL(url);

        string url2 = "https://i.pinimg.com/564x/c6/3e/ff/c63effc78080418c1a4773e31d6fd1c5.jpg";
        GetTextureFromURL(url2);

        Debug.Log(textures.Count);
    }

    private void SetPage(int page)
    {
        // 페이지 예외 처리
        if (page < 1 || page > textures.Count) return;

        this.page = page;

        // Button enabled 설정
        prevButton.SetActive(page > 1);
        nextButton.SetActive(page < textures.Count);

        // 이미지 변환
        pdfSlide.SetTexture("_MainTex", (Texture2D)textures[page-1]);

        // Page 텍스트 변환
        currentPageText.text = page + "/" + textures.Count;
    }

    public void GetTextureFromURL(string url)
    {
        StartCoroutine(GetTexture(url));
    }

    IEnumerator GetTexture(string url)
    {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(url);
        yield return www.SendWebRequest();
        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Texture myTexture = ((DownloadHandlerTexture)www.downloadHandler).texture;
            textures.Add((Texture2D)myTexture);
            Debug.Log(textures.Count);
            SetPage(1);
        }
    }

    public static Texture2D textureFromSprite(Sprite sprite)
    {
        if (sprite.rect.width != sprite.texture.width)
        {
            Texture2D newText = new Texture2D((int)sprite.rect.width, (int)sprite.rect.height);
            Color[] newColors = sprite.texture.GetPixels((int)sprite.textureRect.x,
                                                         (int)sprite.textureRect.y,
                                                         (int)sprite.textureRect.width,
                                                         (int)sprite.textureRect.height);
            newText.SetPixels(newColors);
            newText.Apply();
            return newText;
        }
        else
            return sprite.texture;
    }

    public void ClickPrevButton()
    {
        SetPage(page - 1);
    }

    public void ClickNextButton()
    {
        SetPage(page + 1);
    }

    public void EnterNextButton()
    {
        nextButton.GetComponent<Image>().sprite = buttonSprites[3];
    }

    public void EnterPrevButton()
    {
        prevButton.GetComponent<Image>().sprite = buttonSprites[2];
    }

    public void ExitNextButton()
    {
        nextButton.GetComponent<Image>().sprite = buttonSprites[1];
    }

    public void ExitPrevButton()
    {
        prevButton.GetComponent<Image>().sprite = buttonSprites[0];
    }
}
