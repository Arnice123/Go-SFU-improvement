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

        showCaptcha();
      }
      
  });
}

// Show the confirmation overlay when the page loads
showConfirmation();



// Function to create and display the pop-up with an overlay
function showCaptcha() {
  // Create the overlay
  const captcha = document.createElement('div');
  captcha.id = 'overlay';
  captcha.style.position = 'fixed';
  captcha.style.top = '0';
  captcha.style.left = '0';
  captcha.style.width = '100%';
  captcha.style.height = '100%';
  captcha.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
  captcha.style.zIndex = '9999'; // Ensure it's above everything else

  // Create the pop-up
  const capbox = document.createElement('div');
  capbox.id = 'custom-capbox';
  capbox.style.position = 'fixed';
  capbox.style.top = '50%';
  capbox.style.left = '50%';
  capbox.style.transform = 'translate(-50%, -50%)';
  capbox.style.backgroundColor = 'white';
  capbox.style.padding = '20px';
  capbox.style.borderRadius = '10px';
  capbox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  capbox.style.zIndex = '10000'; // Ensure it's above the overlay
  capbox.style.textAlign = 'center';

  // Popup content
  capbox.innerHTML = `
    <h2>Click the Goat!</h2>
    <div class="image-popup-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px;">
      <!-- Images will be dynamically inserted here -->
    </div>
    <p id="imagePopupResult" style="margin-top: 20px; font-size: 18px; color: #333;"></p>
  `;

  // Append the overlay and pop-up to the body
  document.body.appendChild(captcha);
  document.body.appendChild(capbox);

  // Load the images into the grid
  loadImages(capbox);

  // Function to load images into the grid
  function loadImages(capbox) {
    const imageCapboxGrid = capbox.querySelector('.image-capbox-grid');
    const imgversion = Math.floor(Math.random() * 2) + 1;
    const correctImageName = 'clebron'+imgversion.toString()+'.png'; // Always use this image as the correct one

    // Create arrays of pictures
    const lebronimages = [
      'clebron1.png',
      'clebron2.png'
    ];
    
    const jordanimages = [
      'cjordan1.png',
      'cjordan2.png'
    ];

    const goatimages = [
      'cgoat1.png',
      'cgoat2.png;'
    ];

    // Shuffle the array to randomize the positions
    const shuffledImages = shuffleArray(images);

    // Add the correct image to a random position
    const correctImageIndex = Math.floor(Math.random() * 3); // Random index (0-2)
    shuffledImages[correctImageIndex] = correctImageName;
    const randomint = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    if (randomint % 2 == 0)
    {
      shuffledImages[(correctImageIndex+1) % 3] = jordanimages[imgversion];
      shuffledImages[(correctImageIndex-1)+3 % 3] = goatimages[imgversion];
    }
    else{
      shuffledImages[(correctImageIndex+1) % 3] = goatimages[imgversion];
      shuffledImages[(correctImageIndex-1)+3 % 3] = jordanimages[imgversion];
    }

    // Load the images into the grid
    shuffledImages.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = chrome.runtime.getURL(`images/${image}`); // Use Chrome Extension path
      img.alt = `Image ${index + 1}`;
      img.style.width = '100%';
      img.style.cursor = 'pointer';
      img.style.border = '2px solid transparent';
      img.style.transition = 'border 0.3s ease';
      img.addEventListener('click', () => handleImageClick(image === correctImageName, popup, overlay));
      imagePopupGrid.appendChild(img);
    });
  }

  // Function to handle image clicks
  function handleImageClick(isCorrect, popup, overlay) {
    const imagePopupResult = popup.querySelector('#imagePopupResult');
    if (isCorrect) {
      imagePopupResult.textContent = 'Correct! You clicked the right image.';
      imagePopupResult.style.color = 'green';

      // Close the popup after a short delay
      setTimeout(() => {
        popup.remove();
        overlay.remove();
      }, 1000); // 1-second delay before closing
    } else {
      imagePopupResult.textContent = 'Wrong! Try again.';
      imagePopupResult.style.color = 'red';
    }
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}

// Show the pop-up immediately when the page loads
showPopup();

// Show the pop-up every 2 minutes (120,000 milliseconds)
setInterval(showPopup, 120000);