// index.js
import { UrlDecoder } from './decoder.js';
import { addToggleButton, showAlertMessage } from './ui.js';

const urlDecoder = new UrlDecoder();
urlDecoder.toggleDecode(); // 默認進行初次解碼

addToggleButton(urlDecoder);
showAlertMessage('URL 中文解碼擴展已啟動');

// 使用新的 API，如 requestIdleCallback
requestIdleCallback(() => {
  // 執行性能敏感的操作
  observeMutations();
});

function observeMutations() {
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (
          node.nodeType === Node.TEXT_NODE ||
          (node.nodeType === Node.ELEMENT_NODE &&
            !['SCRIPT', 'STYLE'].includes(node.tagName))
        ) {
          urlDecoder.decodeUrlsInTextNodes(node);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
