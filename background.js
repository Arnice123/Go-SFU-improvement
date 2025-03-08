// Function to inject the pop-up into the current tab
function showPopup() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      }
    });
  }
  
  // Show the pop-up every 2 minutes (120,000 milliseconds)
  setInterval(showPopup, 12000);