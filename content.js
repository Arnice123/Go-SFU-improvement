// Function to create and display the pop-up with an overlay
function showPopup() {
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    overlay.style.zIndex = '9999'; // Ensure it's above everything else
  
    // Create the pop-up
    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <h2>Hello!</h2>
        <p>This is a modal pop-up.</p>
        <button id="closePopup">Close</button>
      </div>
    `;
  
    // Append the overlay and pop-up to the body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  
    // Add event listener to close the pop-up and remove the overlay
    document.getElementById('closePopup').addEventListener('click', () => {
      popup.remove();
      overlay.remove();
    });
  }
  
  // Show the pop-up immediately when the page loads
  showPopup();
  
  // Show the pop-up every 2 minutes (120,000 milliseconds)
  setInterval(showPopup, 120000);