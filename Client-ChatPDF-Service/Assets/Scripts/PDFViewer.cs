using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;
using TMPro;

public class PDFViewer : MonoBehaviour
{
    [SerializeField]
    private Sprite[] sampleImages;

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
        // ���� ������ �ʱ�ȭ
        SetPage(1);
    }

    private void SetPage(int page)
    {
        // ������ ���� ó��
        if (page < 1 || page > sampleImages.Length) return;

        this.page = page;

        // Button enabled ����
        prevButton.SetActive(page > 1);
        nextButton.SetActive(page < sampleImages.Length);

        // �̹��� ��ȯ
        pdfSlide.SetTexture("_MainTex", textureFromSprite(sampleImages[page]));

        // Page �ؽ�Ʈ ��ȯ
        currentPageText.text = page + "/" + sampleImages.Length;
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
