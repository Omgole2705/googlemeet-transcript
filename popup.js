document.addEventListener("DOMContentLoaded", function () {
    const startCaptureButton = document.getElementById("startCapture");
    const stopCaptureButton = document.getElementById("stopCapture");

  
    // Initialize Chrome extension messaging
    const tabQueryInfo = { active: true, currentWindow: true };
    console.log('here')
    function startAudioCapture() {
      console.log("TRANSCRIPTION LOG STARTED");
      let transcriptions = [];
      let previousContent = '';
      let button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe fzRBVc tmJved xHd4Cb rmHNDe")[0];
      button.click();
      const element = document.getElementsByClassName("iOzk7")[0];
      if (element) {
          element.style.visibility = "hidden";
      }
      console.log(element);
  
      const handleContentChange = (mutationsList, observer) => {
          for (const mutation of mutationsList) {
              if (mutation.type === "characterData" && mutation.target.data) {
                  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
                  const newContent = element.textContent.trim();
  
                  if (newContent !== previousContent && newContent !== '') {
                      const contentWithTimestamp = `${timestamp}: ${newContent}`;
                      console.log("prev:", previousContent);
                      console.log("new:", newContent);
  
                      if (previousContent) {
                          previousContent = previousContent.slice(0, -1);
                      }
  
                      if (!transcriptions.length) {
                          transcriptions.push(contentWithTimestamp);
                      } else if (transcriptions.length && !newContent.includes(previousContent)) {
                          transcriptions.push(contentWithTimestamp);
                      } else if (transcriptions.length && newContent.includes(previousContent)) {
                          transcriptions[transcriptions.length - 1] = contentWithTimestamp;
                      }
  
                      console.log("array:", transcriptions);
                      localStorage.setItem("transcriptions", JSON.stringify(transcriptions));
  
                      // Update the data-display element with the latest transcription
                      const dataDisplay = document.getElementById("data-display");
                      if (dataDisplay) {
                          dataDisplay.innerHTML = transcriptions.join('<br>');
                      }
                  }
                  previousContent = newContent;
              }
          }
      };
  
      const observer = new MutationObserver(handleContentChange);
      const observerConfig = {
          childList: true,
          subtree: true,
          characterData: true,
      };
      observer.observe(element, observerConfig);
  
      chrome.runtime.sendMessage(extensionId, { type: "startCapture" });
  }
  
  
    // Function to stop audio capture in the content script
    function stopAudioCapture() {
      console.log("TRANSCRIPTION LOG STOPPED");
      const transcriptions = localStorage.getItem("transcriptions")
      console.log('Stopping transcript:', JSON.parse(transcriptions));
      downloadArrayAsTextFile(JSON.parse(transcriptions), "transcript.txt")
      document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe fzRBVc tmJved xHd4Cb rmHNDe")[0].click();
      const extensionId = "nldfjaoejnhmfdpipllocfnfkkdcjfil"; // Replace with your extension's ID

      chrome.runtime.sendMessage(extensionId, { type: "stopCapture" });

      function downloadArrayAsTextFile(array, fileName) {
        // Create a blob with the array's content and set its type to plain text
        const blob = new Blob([array.join('\n')], { type: 'text/plain' });
      
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
      
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
      
        // Trigger a click event on the anchor to initiate the download
        a.click();
      
        // Clean up: remove the temporary anchor and URL object
        URL.revokeObjectURL(url);
      }
      
    }
  });
  