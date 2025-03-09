let isPopupDisplayed = false; // Flag to track if the pop-up is currently displayed
let scaleT = 1;
let increasing = true;
let zoomT = 1;
function zoomTimer(){
  zoomT = 0.9 + Math.random() * (1.3 - 0.7);
}
setInterval(zoomTimer,1000);
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
      <p>Solve this math problem to prove you're a human:</p>
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


// Show the pop-up every 2 minutes (120,000 milliseconds)
//setInterval(showPopup, 120000);
let requiredClicks = Math.floor(Math.random()*6)+2;

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
      if (clicks < requiredClicks){
        clicks++;
        showJumpscare();
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
          popup.remove();
          //showAd();
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
    3 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348076720019865650/shane4.png?ex=67ce25c8&is=67ccd448&hm=7b24a975105418cc49ae85a61f64321b5183fa7cb50748d8b9c910a703519868&",
    4 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348184034684964864/778-858-0535.png?ex=67ce89b9&is=67cd3839&hm=0d7d7e480c4834189e5eb7ecbdffe483554a47774b421c6809d4549230ce4c44&",//john pork
    5 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348184109733777499/christian1-2.png?ex=67ce89cb&is=67cd384b&hm=7ca5dcb84e831becf643877f0d37b2c4fa8c2eddaebbe2f0f3495c0fff7524d6&", //christian 1
    6 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348184110224642152/chair1.png?ex=67ce89cb&is=67cd384b&hm=696408bd66b8020cb375c2fa25a466a3cb0f50767df5a596278cccf230eb102b&", //Chair 1
    7 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348185294431846482/jake1.png?ex=67ce8ae6&is=67cd3966&hm=cd4171ccdc0b169106a0870bf9066b3acee4ba924a3bdaa54a32d6a7cedd5be8&",
    8 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348185360194076693/christian2.png?ex=67ce8af5&is=67cd3975&hm=15f7f87ffb39cdd2c24d5450bfb7c5ecde276cd7843a391ba31c1505689d9d6b&", //Chirstian2
    9 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348185739933913139/bryan1.png?ex=67ce8b50&is=67cd39d0&hm=e57a9b5a619ed1bfc014fe12f5413b7d3f535589b7460fcac87156672adf66ad&", //Bryan 1
    10 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348185944016027740/Big_Buff_Athletic_Men_less_than_12_kilometers_away.png?ex=67ce8b81&is=67cd3a01&hm=cfae34686abce70340f674c65108c9ad61cfba591df1d1ee86992db8009990f0&",//draymond1
    11 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348186143727812679/arya1.png?ex=67ce8bb0&is=67cd3a30&hm=c3ea975bbf616f15a38533243de67b21ed13d2eb13cf3eeb797742369fcc1de6&", // arya 1
    12 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348194357425082518/kai1-3.png?ex=67ce9357&is=67cd41d7&hm=d55273ba5170f61c34c0080ed2fc95c262665b3c9a6531da4f94555e6853c0b2&", // kai 1
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
  popup.style.top = '0%';
  popup.style.left = (Math.floor(Math.random()*50)+25).toString() +'%';
  popup.style.height = '15vh';
  popup.style.width = '15vw';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = 'white';
  popup.style.padding = '0px';
  popup.style.borderRadius = '0px';
  popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
  popup.style.textAlign = 'center';
  popup.style.zIndex = '9999'; // On top of the overlay
  popup.style.marginTop = (Math.floor(Math.random()*40)+15).toString() +'%';
  popup.innerHTML = `
      <img src="${ads[Math.round(Math.random()*12)]}" alt="Ad Image" style="max-width: 100%; height: auto; margin-bottom: 15px;">
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
//setInterval(showAd,500); // 3s - 8s
//setInterval(showAd, Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000); // 3s - 8s

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
    setInterval(showAd, Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000);
    setInterval(showJumpscare, Math.round(Math.random()*15000-6000)+6000);
    showPopup();
  }, 15000);
  
}
showFakeLoading();

function changeZoom(){
  
  document.body.style.transform = `scale(${zoomT})`;  // Zoom in 150%
  document.body.style.transformOrigin = "0 0";   // Prevent shifting
  document.body.style.width = `${zoomT*100}`;     
}

setInterval(changeChangeZoom,1000)
let zoomcalled = false;
function changeChangeZoom(){
    if(fakeLoadingEnabled == false && isPopupDisplayed == false && zoomcalled == false){
      zoomcalled = true;
      setInterval(changeZoom,500);
    } 
}
let faces ={
  0: "https://cdn.discordapp.com/attachments/1348007906460569722/1348207050319986801/SeleneDelgado.webp?ex=67ce9f29&is=67cd4da9&hm=3801b3950df163cb7637a56094f5cf4fb99a7a98efa32a0e7dcb98d230720414&",
  1: "https://cdn.discordapp.com/attachments/1348007906460569722/1348200380311535627/misty1.jpg?ex=67ce98f3&is=67cd4773&hm=9f67b68e5a37799eb9baa4bc27827f7faf533d0bc613febf16edb80a38f71cca&"
};
function showJumpscare() {
  // Create the image element
  const flashImg = document.createElement('img');
  flashImg.src = faces[Math.floor(Math.random()*2-0.01)];
  flashImg.style.position = 'fixed';
  flashImg.style.top = '0';
  flashImg.style.left = '0';
  flashImg.style.width = '75vw';
  flashImg.style.height = '75vh';
  flashImg.style.objectFit = 'cover'; // Ensures the image covers the screen
  flashImg.style.zIndex = '99999';
  flashImg.style.opacity = '1';
  flashImg.style.pointerEvents = 'none'; // Prevents blocking user interaction
  flashImg.style.margin = '50px';

  
  // Append it to the body
  document.body.appendChild(flashImg);

  // Create the audio element
  const audio = new Audio(chrome.runtime.getURL('assets/scream1.mp3'));

  // Play sound
  audio.play();

  // Remove the image after the duration
  setTimeout(() => {
      flashImg.remove();
  }, 500);
}


