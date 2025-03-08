// Function to create and display the pop-up
function showPopup() {
    // Check if the pop-up already exists
    if (document.getElementById('custom-popup')) {
      return; // Exit if the pop-up is already displayed
    }
  
    // Create the pop-up element
    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <h2>Hello!</h2>
        <p>This is a timed pop-up.</p>
        <button id="closePopup">Close</button>
      </div>
    `;
  
    // Append the pop-up to the body
    document.body.appendChild(popup);
  
    // Add event listener to close the pop-up
    document.getElementById('closePopup').addEventListener('click', () => {
      popup.remove();
    });
  }
  
  // Show the pop-up immediately when the page loads
  showPopup();
  
  // Show the pop-up every 2 minutes (120,000 milliseconds)
  setInterval(showPopup, 1200);