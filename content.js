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
        <h2>Access Restricted</h2>
        <p>Enter the codeword to close this pop-up:</p>
        <input type="text" id="codewordInput" placeholder="Enter codeword" />
        <button id="submitCodeword">Submit</button>
        <p id="errorMessage" style="color: red; display: none;">Incorrect codeword. Try again.</p>
      </div>
    `;
  
    // Append the overlay and pop-up to the body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  
    let attemptCount = 0; // Track the number of attempts
  
    // Add event listener to check the codeword
    document.getElementById('submitCodeword').addEventListener('click', () => {
      const codewordInput = document.getElementById('codewordInput');
      const errorMessage = document.getElementById('errorMessage');
  
      // Always show an error message on the first attempt
      if (attemptCount === 0) {
        errorMessage.style.display = 'block'; // Show error message
        codewordInput.value = ''; // Clear the input field
        attemptCount++; // Increment attempt count
      } else {
        // Check if the codeword is correct on the second attempt
        if (codewordInput.value === 'secret123') { // Replace 'secret123' with your desired codeword
          popup.remove();
          overlay.remove();
        } else {
          errorMessage.style.display = 'block'; // Show error message
          codewordInput.value = ''; // Clear the input field
        }
      }
    });
  }
  
// Show the pop-up immediately when the page loads
showPopup();

// Show the pop-up every 2 minutes (120,000 milliseconds)
setInterval(showPopup, 120000);

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