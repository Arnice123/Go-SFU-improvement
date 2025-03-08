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
  setInterval(showPopup, 20000);

function showConfirmation() {
  // Create the overlay div
  let overlay = document.createElement('div');
  overlay.id = 'confirmation-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';   // Full width
  overlay.style.height = '100vh';  // Full height
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Semi-transparent black
  overlay.style.opacity = '0';
  overlay.style.zIndex = '9999';  // Ensure it’s on top of other content
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';

  // Click Counter
  let clicks = 0;


  // Create content inside the overlay
  let overlayText = document.createElement('div');
  overlayText.style.color = 'white';
  overlayText.style.fontSize = '24px';
  overlayText.style.opacity = '0';
  overlayText.innerText = 'Hehe';

  // Add a confirmation button to the overlay
  let confirmButton = document.createElement('button');
  confirmButton.innerText = 'Yes, Proceed';
  confirmButton.style.width = '100vw';
  confirmButton.style.height = '100vh';
  confirmButton.style.opacity = "0";
  //confirmButton.style.marginTop = '20px';

  // Append the text and button to the overlay
  overlay.appendChild(overlayText);
  overlay.appendChild(confirmButton);

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Add event listener to handle confirmation button click
  confirmButton.addEventListener('click', function () {
      // You can add logic here to proceed after confirmation
      if (clicks < 2){
        clicks++;
      } 
      else{
        console.log('User confirmed!');
        overlay.remove();  // Remove the overlay after confirmation
      }
      
  });
}

// Show the confirmation overlay when the page loads
showConfirmation();
