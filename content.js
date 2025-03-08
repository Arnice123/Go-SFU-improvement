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