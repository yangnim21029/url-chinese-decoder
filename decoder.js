// decoder.js
export class UrlDecoder {
  #isDecoded = false; // 私有屬性
  #encodedUrlPattern = /\/(?<encodedPart>[^\/\s]+)/gu; // 使用 'u' 修飾符支持 Unicode
  #originalContentMap = new WeakMap();

  constructor() {
    // 使用綁定的方法，避免多次綁定
    this.decodeUrlsInTextNodes = this.decodeUrlsInTextNodes.bind(this);
  }

  toggleDecode() {
    this.#isDecoded = !this.#isDecoded;
    this.decodeUrlsInTextNodes(document.body);
  }

  decodeUrlsInTextNodes(element) {
    if (element.nodeType === Node.TEXT_NODE) {
      const originalText = element.nodeValue ?? '';

      if (!this.#isDecoded) {
        element.nodeValue =
          this.#originalContentMap.get(element) ?? originalText;
        return;
      }

      if (!this.#originalContentMap.has(element)) {
        this.#originalContentMap.set(element, originalText);
      }

      const decodedText = originalText.replaceAll(
        this.#encodedUrlPattern,
        (match, encodedPart) => {
          try {
            const decodedPart = decodeURIComponent(encodedPart);
            return `/${decodedPart}`;
          } catch (e) {
            console.warn(`無法解碼 URL 部分: ${encodedPart}`, e);
            return match;
          }
        }
      );

      if (decodedText !== originalText) {
        element.nodeValue = decodedText;
      }
    } else if (
      element.nodeType === Node.ELEMENT_NODE &&
      !['SCRIPT', 'STYLE'].includes(element.tagName)
    ) {
      for (const child of element.childNodes) {
        this.decodeUrlsInTextNodes(child);
      }
    }
  }
}
