document.getElementById("countBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const selectedText = window.getSelection().toString();
        const text = selectedText || document.body.innerText;

        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const chars = text.length;

        return { words, chars };
      },
    },
    (results) => {
      const wordCount = results[0].result.words;
      document.getElementById("words").innerText = wordCount;
      document.getElementById("chars").innerText = results[0].result.chars;

      // Average reading speed: 200 words per minute
      const readingTime = Math.ceil(wordCount / 200);
      document.getElementById("readingTime").innerText =
        readingTime + (readingTime === 1 ? " min" : " mins");
    },
  );
});
