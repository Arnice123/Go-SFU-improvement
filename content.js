let isPopupDisplayed = false; // Flag to track if the pop-up is currently displayed
let scaleT = 1;
let increasing = true;
function scaleTimer(){
  if (increasing){
    scaleT += 0.02;
    if (scaleT >= 1.5){
      increasing = false;
    }
  }
  else{
    scaleT-=0.02;
    if (scaleT <= 1){
      increasing = true;
    }
  }
}
setInterval(scaleTimer, 50);

// Function to generate a random math question
function generateMathQuestion() {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1, num2, answer;
  
  // Generate appropriate numbers based on operation
  if (operation === '+') {
    num1 = Math.floor(Math.random() * 50) + 1;
    num2 = Math.floor(Math.random() * 50) + 1;
    answer = num1 + num2;
  } else if (operation === '-') {
    num1 = Math.floor(Math.random() * 50) + 10;
    num2 = Math.floor(Math.random() * num1); // Ensure positive result
    answer = num1 - num2;
  } else if (operation === '*') {
    num1 = Math.floor(Math.random() * 12) + 1; // Keep multiplication simple
    num2 = Math.floor(Math.random() * 12) + 1;
    answer = num1 * num2;
  }
  
  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer
  };
}

// Function to create and display the pop-up with an overlay
function showPopup() {
  // Check if the pop-up is already displayed
  if (isPopupDisplayed) {
    return; // Exit the function if the pop-up is already displayed
  }

  // Set the flag to true
  isPopupDisplayed = true;
  
  // Generate a math question
  const mathProblem = generateMathQuestion();

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
      <p>Solve this math problem to continue:</p>
      <p id="mathQuestion"><strong>${mathProblem.question}</strong></p>
      <input type="number" id="answerInput" placeholder="Enter your answer" />
      <button id="submitAnswer">Submit</button>
      <p id="errorMessage" style="color: red; display: none;">Incorrect answer. Try again.</p>
    </div>
  `;

  // Append the overlay and pop-up to the body
  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // Set focus on the input field
  const answerInput = document.getElementById('answerInput');
  answerInput.focus();

  let attemptCount = 0; // Track the number of attempts

  // Add event listener to check the answer
  document.getElementById('submitAnswer').addEventListener('click', () => {
    const errorMessage = document.getElementById('errorMessage');
    if (attemptCount == 0)
    {
        errorMessage.style.display = 'block'; // Show error message
        answerInput.value = ''; // Clear the input field
        attemptCount++; // Increment attempt count
    }
    else {
        // Check if the answer is correct
        if (parseInt(answerInput.value) === mathProblem.answer) {
            popup.remove();
            overlay.remove();
            isPopupDisplayed = false; // Reset the flag
        } else {
            errorMessage.style.display = 'block'; // Show error message
            answerInput.value = ''; // Clear the input field
            // Generate a new math problem after an incorrect answer
            const newMathProblem = generateMathQuestion();
            document.getElementById('mathQuestion').innerHTML = `<strong>${newMathProblem.question}</strong>`;
            mathProblem.question = newMathProblem.question;
            mathProblem.answer = newMathProblem.answer;
        }
    }
    
  });

  // Make the Enter key work for submitting
  answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('submitAnswer').click();
    }
  });

  // Ensure the input field remains focusable
  answerInput.addEventListener('blur', () => {
    answerInput.focus();
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
  confirmation.style.zIndex = '9999';  // Ensure it's on top of other content
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
        showCaptchaOverlay();
      }
      
  });
}

// Show the confirmation overlay when the page loads
showConfirmation();

function showCaptchaOverlay() {
  // Remove existing overlay if it exists
  if (document.getElementById("captcha-overlay")) return;

  // Create the overlay background
  const captcha = document.createElement("div");
  captcha.id = "captcha-captcha";
  captcha.style.position = "fixed";
  captcha.style.top = "0";
  captcha.style.left = "0";
  captcha.style.width = "100vw";
  captcha.style.height = "100vh";
  captcha.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  captcha.style.display = "flex";
  captcha.style.flexDirection = "column";
  captcha.style.alignItems = "center";
  captcha.style.justifyContent = "center";
  captcha.style.zIndex = "9999";

  // Create the popup box
  const popup = document.createElement("div");
  popup.style.backgroundColor = "#fff";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px";
  popup.style.textAlign = "center";
  popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  
  // Title
  const title = document.createElement("h2");
  title.innerText = "CAPTCHA: Select the Image of The Goat!";
  popup.appendChild(title);

  // Image container (grid)
  const imageGrid = document.createElement("div");
  imageGrid.style.display = "flex";
  imageGrid.style.gap = "10px";
  popup.appendChild(imageGrid);

  // Image filenames (inside your extension folder)
  const allImages = ["cgoat1.png", "cjordan1.png", "clebron1.png"];
  const correctImage = allImages[2]; // Random correct image
  const shuffledImages = [...allImages].sort(() => Math.random() - 0.5); // Shuffle images

  // Function to handle image clicks
  function handleImageClick(isCorrect) {
      if (isCorrect) {
          alert("✅ Correct! You may proceed.");
          captcha.remove();
          showAd();
      } else {
          alert("❌ Wrong! Try again.");
      }
  }

  // Create image elements
  shuffledImages.forEach((image) => {
      const img = document.createElement("img");
      img.src = chrome.runtime.getURL(`images/${image}`);
      img.alt = "Captcha Image";
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.cursor = "pointer";
      img.style.border = "2px solid transparent";
      img.style.transition = "border 0.3s ease";

      img.addEventListener("click", () => handleImageClick(image === correctImage));
      imageGrid.appendChild(img);
  });

  // Append everything
  captcha.appendChild(popup);
  document.body.appendChild(captcha);
}


function showAd() {
  // Check if the popup already exists
  //if (document.getElementById('popup-ad')) return;
  const ads = {
    0 : "https://cdn.discordapp.com/attachments/1232875162064654468/1348071381882896384/shane1.png?ex=67ce20cf&is=67cccf4f&hm=72e88cb50b8503797d2f3dd91fbd6ca1932a59c4d215a8cc085f0266e8638800&",
    1 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348074143945457846/image.png?ex=67ce2361&is=67ccd1e1&hm=483486c0ba21d340f3aeab4e84c598511e2f7dba8d370b5795c5a9492e97581b&",
    2 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348075587381760132/shane3.png?ex=67ce24ba&is=67ccd33a&hm=c4bf5986836f06787c950492391f0369a92e3e3ece33802795bad16092b9f18a&",
    3 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348076720019865650/shane4.png?ex=67ce25c8&is=67ccd448&hm=7b24a975105418cc49ae85a61f64321b5183fa7cb50748d8b9c910a703519868&"
  };

  // Create the overlay (background for popup)
  const ad = document.createElement('div');
  ad.id = 'popup-ad-ad';
  ad.style.position = 'fixed';
  ad.style.top = '0';
  ad.style.left = '0';
  ad.style.width = '0vw';
  ad.style.height = '0vh';
  ad.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  ad.style.zIndex = '9998'; // Behind the popup content
  ad.style.opacity = '0'
  document.body.appendChild(ad);

  // Create the popup content
  const popup = document.createElement('div');
  popup.id = 'popup-ad';
  popup.style.position = 'fixed';
  popup.style.top = (Math.floor(Math.random()*75)).toString() +'%';
  popup.style.left = (Math.floor(Math.random()*75)).toString() +'%';
  popup.style.height = '15vh';
  popup.style.width = '15vw';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = 'white';
  popup.style.padding = '0px';
  popup.style.borderRadius = '0px';
  popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
  popup.style.textAlign = 'center';
  popup.style.zIndex = '9999'; // On top of the overlay
  popup.innerHTML = `
      <img src="${ads[Math.floor(Math.random()*4)]}" alt="Ad Image" style="max-width: 100%; height: auto; margin-bottom: 15px;">
      <button id="close-ad">Close Ad</button>
  `;
  

  const image = popup.querySelector('img');

// Add event listener to remove popup when image is clicked
  image.addEventListener('click', () => {
    popup.remove(); // Remove the popup when the image is clicked
    
  });
  
  function scaleImage() {
    
    image.style.transform = `scale(${scaleT})`;
  }

  setInterval(scaleImage, 50);
  


  

  // Scale the image every 50 milliseconds (this makes the scaling smooth)

  // Append the popup to the body
  document.body.appendChild(popup);
  
  
  // Close the popup when the close button is clicked
  document.getElementById('close-ad').addEventListener('click', () => {
      ad.remove(); // Remove the overlay
      popup.remove(); // Remove the popup
  });
}

// Show the popup after 3-8 seconds
setInterval(showAd, Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000); // 3s - 8s

let fakeLoadingEnabled = false;

let randomProgress = (Math.floor(Math.random()*1) + 1).toString();
// Show a fake loading screen after clicking a link
function showFakeLoading(){

  // Create loading screen overlay
  if (fakeLoadingEnabled == true)
  {
    return;
  }
  fakeLoadingEnabled = true;
  let loading = document.createElement('div');
  loading.id = 'loading-overlay';
  loading.style.position = 'fixed';
  loading.style.top = '0';
  loading.style.left = '0';
  loading.style.width = '100vw';   // Full width
  loading.style.height = '100vh';  // Full height
  loading.style.backgroundColor = 'rgba(255, 255, 255, 1)';  // Semi-transparent black
  loading.style.opacity = '1';
  loading.style.zIndex = '9999';  // Ensure it's on top of other content
  loading.style.display = 'flex';
  loading.style.justifyContent = 'center';
  loading.style.alignItems = 'center';
 

  // Set loading text
  let loadingText = document.createElement('div');
  loadingText.style.color = 'rgba(0,0,0,1)';
  loadingText.style.fontSize = '24px';
  loadingText.style.opacity = '1';
  loadingText.style.textAlign = 'center';
  loadingText.innerHTML = `
  <div>
    <h2>Loading...</h2>
  </div>`;


  // Make Progress Text
  let randomProgress = (Math.floor(Math.random()*100) + 1).toString();
  let progressText = document.createElement('div');
  progressText.style.color = 'rgba(0,0,0,1)';
  progressText.style.fontSize = '20px';
  progressText.style.opactiy = '1';
  progressText.innerText = " Progress: "+ randomProgress;
  progressText.style.textAlign = 'center';
  progressText.style.marginTop = '10px';

  let count = 1;

setInterval(() => {
    
    randomProgress = ((Number(randomProgress) + (Math.floor(Math.random()*10) + 1)));
    if (randomProgress > 99) {
      randomProgress = "99."; // Convert to string so we can append 9s
      randomProgress += "9".repeat(count); // Append one more "9" each time
      count++;
  }
    randomProgress.toString();
    progressText.innerText = `Progress: ${randomProgress}`;
}, 500);

  
  loading.appendChild(loadingText);
  loading.appendChild(progressText);
  document.body.appendChild(loading);

  
  
  

  setTimeout(() => {
    loading.remove(); // Removes the overlay after 5 seconds
    loadingText.remove();
    progressText.remove();
    fakeLoadingEnabled = false;
  }, 15000);
  
}
showFakeLoading();


function changeZoom(){
  let newZoom = 0.9 + Math.random() * (1.1 - 0.9);
  document.body.style.transform = `scale(${newZoom})`;  // Zoom in 150%
  document.body.style.transformOrigin = "0 0";   // Prevent shifting
  document.body.style.width = `${newZoom*100}`;     
}

//setInterval(changeChangeZoom,1000)
  
function changeChangeZoom(){
    if(fakeLoadingEnabled == false && isPopupDisplayed == false){
    setInterval(changeZoom,500);
    } 
}

//"matches": ["https://sims.erp.sfu.ca/*","https://www.sfu.ca/*"],