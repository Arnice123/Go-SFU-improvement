let isPopupDisplayed = false; // Flag to track if the pop-up is currently displayed

// Function to create and display the pop-up with an overlay
function showPopup() {
  // Check if the pop-up is already displayed
  if (isPopupDisplayed) {
    return; // Exit the function if the pop-up is already displayed
  }

  // Set the flag to true
  isPopupDisplayed = true;

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
        isPopupDisplayed = false; // Reset the flag
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

  let confirmation = document.createElement('div');
  confirmation.id = 'confirmation-overlay';
  confirmation.style.position = 'fixed';
  confirmation.style.top = '0';
  confirmation.style.left = '0';
  confirmation.style.width = '100vw';   // Full width
  confirmation.style.height = '100vh';  // Full height
  confirmation.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';  // Semi-transparent black
  confirmation.style.opacity = '0';
  confirmation.style.zIndex = '9999';  // Ensure it’s on top of other content
  confirmation.style.display = 'flex';
  confirmation.style.justifyContent = 'center';
  confirmation.style.alignItems = 'center';

  // Click Counter
  let clicks = 0;


  // Create content inside the overlay
  let confirmationText = document.createElement('div');
  confirmationText.style.color = 'white';
  confirmationText.style.fontSize = '24px';
  confirmationText.style.opacity = '0';
  confirmationText.innerText = 'Hehe';

  // Add a confirmation button to the overlay
  let confirmButton = document.createElement('button');
  confirmButton.innerText = 'Yes, Proceed';
  confirmButton.style.width = '100vw';
  confirmButton.style.height = '100vh';
  confirmButton.style.opacity = "0";
  //confirmButton.style.marginTop = '20px';

  // Append the text and button to the overlay
  confirmation.appendChild(confirmationText);
  confirmation.appendChild(confirmButton);

  // Append the overlay to the body
  document.body.appendChild(confirmation);

  // Add event listener to handle confirmation button click
  confirmButton.addEventListener('click', function () {
      // You can add logic here to proceed after confirmation
      if (clicks < 2){
        clicks++;
      } 
      else{
        console.log('User confirmed!');
        confirmation.remove();  // Remove the overlay after confirmation
      }
      
  });
}

// Show the confirmation overlay when the page loads
showConfirmation();