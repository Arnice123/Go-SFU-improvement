let isPopupDisplayed = false; // Flag to track if the pop-up is currently displayed
let scaleT = 1;
let increasing = true;
let zoomT = 1;

// set zoomT to a num between 0.7 and 1.3
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
  
  // Generate random numbers 
  if (operation === '+') {
    num1 = Math.floor(Math.random() * 50) + 1;
    num2 = Math.floor(Math.random() * 50) + 1;
    answer = num1 + num2;
  } else if (operation === '-') {
    num1 = Math.floor(Math.random() * 50) + 10;
    num2 = Math.floor(Math.random() * num1);
    answer = num1 - num2;
  } else if (operation === '*') {
    num1 = Math.floor(Math.random() * 12) + 1;
    num2 = Math.floor(Math.random() * 12) + 1;
    answer = num1 * num2;
  }
  
  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer
  };
}

// Function to add an calc to the math popup
function addcalcToMathPopup() {
    // This function will be called when the math popup is shown

    // Create the calc container
    const calcContainer = document.createElement('div');
    calcContainer.id = 'calc-container';
    calcContainer.style.marginTop = '20px';
    calcContainer.style.marginBottom = '20px';
    calcContainer.style.padding = '10px';
    calcContainer.style.backgroundColor = '#f5f0e6';
    calcContainer.style.border = '2px solid #8b4513';
    calcContainer.style.borderRadius = '5px';
    calcContainer.style.width = '100%';
    calcContainer.style.boxSizing = 'border-box';

    // Calc Title
    const calcTitle = document.createElement('h3');
    calcTitle.textContent = 'Calc';
    calcTitle.style.textAlign = 'center';
    calcTitle.style.margin = '0 0 10px 0';
    calcContainer.appendChild(calcTitle);

    // Calc Frame
    const calcFrame = document.createElement('div');
    calcFrame.style.display = 'flex';
    calcFrame.style.flexDirection = 'column';
    calcFrame.style.gap = '10px';
    calcFrame.style.backgroundColor = '#d9b38c';
    calcFrame.style.padding = '10px';
    calcFrame.style.borderRadius = '5px';

    // Create 2 rows for the calc (tens and ones)
    for (let row = 0; row < 2; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = `calc-row row-${row}`;
        rowContainer.style.display = 'flex';
        rowContainer.style.justifyContent = 'space-around';
        rowContainer.style.alignItems = 'center';
        rowContainer.style.height = '40px';
        rowContainer.style.borderBottom = '2px solid #8b4513';
        rowContainer.style.position = 'relative';

        // label for each row
        const rowLabel = document.createElement('div');
        rowLabel.style.position = 'absolute';
        rowLabel.style.left = '-5px';
        rowLabel.style.top = '50%';
        rowLabel.style.transform = 'translateY(-50%)';
        rowLabel.style.fontSize = '12px';
        rowLabel.style.fontWeight = 'bold';
        rowLabel.textContent = row === 0 ? 'Tens' : 'Ones';
        rowContainer.appendChild(rowLabel);

        // 10 beads per row
        for (let bead = 0; bead < 10; bead++) {
            const beadElement = document.createElement('div');
            beadElement.className = 'calc-bead';
            beadElement.dataset.row = row.toString();
            beadElement.dataset.position = bead.toString();
            beadElement.dataset.active = 'false';
            beadElement.style.width = '20px';
            beadElement.style.height = '20px';
            beadElement.style.backgroundColor = '#f0d0a0';
            beadElement.style.borderRadius = '50%';
            beadElement.style.cursor = 'pointer';
            beadElement.style.border = '1px solid #8b4513';
            beadElement.style.transition = 'all 0.2s ease';
            beadElement.style.transform = 'translateY(15px)';
            beadElement.style.position = 'relative';

            // dragging variables
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let initialTransformY = 15; 
            let fallInterval = null;

            // Resistance to movement
            const resistance = 0.95; 

            // Event listeners for drag-and-drop
            beadElement.addEventListener('mousedown', function (e) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialTransformY = parseFloat(this.style.transform.replace('translateY(', '').replace('px)', ''));
                this.style.transition = 'none'; // Ugly drag

                // Pause falling effect
                if (fallInterval) {
                    clearInterval(fallInterval);
                    fallInterval = null;
                }
            });

            beadElement.addEventListener('mousemove', function (e) {
                if (isDragging) {
                    const deltaY = (e.clientY - startY) * resistance; // Add resistance
                    const newTransformY = initialTransformY + deltaY;

                    // Prevent beads from leaving the row
                    if (newTransformY >= -15 && newTransformY <= 15) {
                        this.style.transform = `translateY(${newTransformY}px)`;
                    }
                }
            });

            beadElement.addEventListener('mouseup', function () {
                if (isDragging) {
                    isDragging = false;
                    this.style.transition = 'all 0.2s ease';

                    // Check for active beads
                    const currentTransformY = parseFloat(this.style.transform.replace('translateY(', '').replace('px)', ''));
                    if (currentTransformY <= 0) {
                        this.dataset.active = 'true';
                        this.style.backgroundColor = '#d35400';
                    } else {
                        this.dataset.active = 'false';
                        this.style.backgroundColor = '#f0d0a0';
                    }

                    // Make it fall
                    if (currentTransformY < 15) {
                        fallInterval = setInterval(() => {
                            const currentY = parseFloat(this.style.transform.replace('translateY(', '').replace('px)', ''));
                            if (currentY < 15) {
                                this.style.transform = `translateY(${currentY + 0.5}px)`;
                            } else {
                                clearInterval(fallInterval);
                                fallInterval = null;
                                this.dataset.active = 'false';
                                this.style.backgroundColor = '#f0d0a0';
                            }
                        }, 100); // Rate of fall
                    }

                    updatecalcValue();
                }
            });

            beadElement.addEventListener('mouseleave', function () {
                if (isDragging) {
                    isDragging = false;
                    this.style.transition = 'all 0.2s ease';

                    // Check for active beads
                    const currentTransformY = parseFloat(this.style.transform.replace('translateY(', '').replace('px)', ''));
                    if (currentTransformY <= 0) {
                        this.dataset.active = 'true';
                        this.style.backgroundColor = '#d35400';
                    } else {
                        this.dataset.active = 'false';
                        this.style.backgroundColor = '#f0d0a0';
                    }

                    // Make it fall
                    if (currentTransformY < 15) {
                        fallInterval = setInterval(() => {
                            const currentY = parseFloat(this.style.transform.replace('translateY(', '').replace('px)', ''));
                            if (currentY < 15) {
                                this.style.transform = `translateY(${currentY + 0.5}px)`; // Slowly fall back
                            } else {
                                clearInterval(fallInterval);
                                fallInterval = null;
                                this.dataset.active = 'false';
                                this.style.backgroundColor = '#f0d0a0';
                            }
                        }, 100); // Rate of fall
                    }

                    updatecalcValue();
                }
            });

            rowContainer.appendChild(beadElement);
        }

        calcFrame.appendChild(rowContainer);
    }

    // Value display
    const valueDisplay = document.createElement('div');
    valueDisplay.id = 'calc-value';
    valueDisplay.style.textAlign = 'center';
    valueDisplay.style.fontSize = '18px';
    valueDisplay.style.fontWeight = 'bold';
    valueDisplay.style.marginTop = '10px';
    valueDisplay.textContent = 'Value: 0';

    // Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset calc';
    resetButton.style.display = 'block';
    resetButton.style.margin = '10px auto 0';
    resetButton.style.padding = '5px 10px';
    resetButton.style.backgroundColor = '#8b4513';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '3px';
    resetButton.style.cursor = 'pointer';

    resetButton.addEventListener('click', function () {
        // Reset beads
        const beads = document.querySelectorAll('.calc-bead');
        beads.forEach(bead => {
            bead.dataset.active = 'false';
            bead.style.transform = 'translateY(15px)';
            bead.style.backgroundColor = '#f0d0a0';
        });

        // Update display
        updatecalcValue();
    });

    // Change the answer by clicking this button
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply to Answer';
    applyButton.style.display = 'block';
    applyButton.style.margin = '10px auto 0';
    applyButton.style.padding = '5px 10px';
    applyButton.style.backgroundColor = '#27ae60';
    applyButton.style.color = 'white';
    applyButton.style.border = 'none';
    applyButton.style.borderRadius = '3px';
    applyButton.style.cursor = 'pointer';

    applyButton.addEventListener('click', function () {
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            const calcValue = getcalcValue();
            answerInput.value = calcValue;
        }
    });

    // Add elements to container
    calcContainer.appendChild(calcFrame);
    calcContainer.appendChild(valueDisplay);
    calcContainer.appendChild(resetButton);
    calcContainer.appendChild(applyButton);

    // Update calc value display
    function updatecalcValue() {
        const value = getcalcValue();
        const valueDisplay = document.getElementById('calc-value');
        if (valueDisplay) {
            valueDisplay.textContent = `Value: ${value}`;
        }
    }

    // Calculate current calc value
    function getcalcValue() {
        let value = 0;

        // tens value
        const tensBeads = document.querySelectorAll('.calc-row.row-0 .calc-bead[data-active="true"]');
        value += tensBeads.length * 10;

        // ones value
        const onesBeads = document.querySelectorAll('.calc-row.row-1 .calc-bead[data-active="true"]');
        value += onesBeads.length;

        return value;
    }

    return calcContainer;
}
  
// Math Capcha
function showPopup() {
    // No dupes
    if (isPopupDisplayed) {
        return;
    }
  
    isPopupDisplayed = true;
    
    // Generate a math question
    const mathProblem = generateMathQuestion();
  
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    overlay.style.zIndex = '9999'; // Ensure it's above everything else
  
    // Create pop-up
    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Access Restricted</h2>
            <p>Solve this math problem to prove you're a human:</p>
            <p id="mathQuestion"><strong>${mathProblem.question}</strong></p>
            <button id="showCalcButton">Show Calculator</button>
            <div id="calcContainer" style="display: none;"></div>
            <input type="number" id="answerInput" placeholder="Enter your answer" />
            <button id="submitAnswer">Submit</button>
            <p id="errorMessage" style="color: red; display: none;">Incorrect answer. Try again.</p>
        </div>
    `;
  
    // Show overlay and popup
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  
    // Add calc button
    document.getElementById('showCalcButton').addEventListener('click', () => {
        const calcContainer = document.getElementById('calcContainer');
        if (calcContainer) {
            // no dupe calcs
            if (calcContainer.children.length === 0) {
            const calcElement = addcalcToMathPopup();
            calcContainer.appendChild(calcElement);
            }
            // Toggle the calc
            calcContainer.style.display = calcContainer.style.display === 'none' ? 'block' : 'none';
            
            // Update button text based calc state
            const showCalcButton = document.getElementById('showCalcButton');
            showCalcButton.textContent = calcContainer.style.display === 'none' ? 'Show Calculator' : 'Hide Calculator';
        }
    });
  
    // Focus on input box
    const answerInput = document.getElementById('answerInput');
    answerInput.focus();
  
    let attemptCount = 0;
  
    // Check answer
    document.getElementById('submitAnswer').addEventListener('click', () => {
        const errorMessage = document.getElementById('errorMessage');
        if (attemptCount == 0)
        {
            // tell them they fail and clear input
            errorMessage.style.display = 'block'; 
            answerInput.value = '';
            attemptCount++;
        }
        else {
            // Check for answer
            if (parseInt(answerInput.value) === mathProblem.answer) {
                // clear overlay and such if correct
                popup.remove();
                overlay.remove();
                isPopupDisplayed = false; 
                if (window.location.href.includes("https://myschedule.erp.sfu.ca/")){
                  setInterval(showAd, 1500);
                }
                else{
                  setInterval(showAd, Math.floor(Math.random() * (3000  + 1)) + 3000);
                }
                
            } else {
                // reset and make a new question
                errorMessage.style.display = 'block';
                answerInput.value = '';
                const newMathProblem = generateMathQuestion();
                document.getElementById('mathQuestion').innerHTML = `<strong>${newMathProblem.question}</strong>`;
                mathProblem.question = newMathProblem.question;
                mathProblem.answer = newMathProblem.answer;
            }
        }
      
    });
  
    // All 'Enter' to work as a key for entering
    answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('submitAnswer').click();
        }
    });
  
    // make sure input is the focus
    answerInput.addEventListener('blur', () => {
        answerInput.focus();
    });
  }


let requiredClicks = Math.floor(Math.random()*6)+2;

function showConfirmation() {
  // Create overlay
  let confirmation = document.createElement('div');
  confirmation.id = 'confirmation-overlay';
  confirmation.style.position = 'fixed';
  confirmation.style.top = '0';
  confirmation.style.left = '0';
  confirmation.style.width = '100vw';
  confirmation.style.height = '100vh';
  confirmation.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
  confirmation.style.opacity = '0';
  confirmation.style.zIndex = '9999'; 
  confirmation.style.display = 'flex';
  confirmation.style.justifyContent = 'center';
  confirmation.style.alignItems = 'center';

  let clicks = 0;

  // Create content
  let confirmationText = document.createElement('div');
  confirmationText.style.color = 'white';
  confirmationText.style.fontSize = '24px';
  confirmationText.style.opacity = '0';
  confirmationText.innerText = 'Hehe';

  let confirmButton = document.createElement('button');
  confirmButton.innerText = 'Yes, Proceed';
  confirmButton.style.width = '100vw';
  confirmButton.style.height = '100vh';
  confirmButton.style.opacity = "0";

  // Add text, button, overlay to doc
  confirmation.appendChild(confirmationText);
  confirmation.appendChild(confirmButton);

  document.body.appendChild(confirmation);

  // confirm clicks
  confirmButton.addEventListener('click', function () {
      // jumpscare if clicking less than required
      if (clicks < requiredClicks){
        clicks++;
        showJumpscare();
      } 
      else{
        // Remove overlay after confirmation
        console.log('User confirmed!');
        confirmation.remove();  
        showCaptchaOverlay();
      }
      
  });
}

// Show confirmation overlay when the page loads
showConfirmation();

function showCaptchaOverlay() {
  // Ensure no duplicate captchas
  if (document.getElementById("captcha-overlay")) return;

  // make overlay background
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

  // Create popup box
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

  // Image filenames
  const allImages = ["cgoat1.png", "cjordan1.png", "clebron1.png"];
  const correctImage = allImages[2]; // lebron james
  const shuffledImages = [...allImages].sort(() => Math.random() - 0.5); // Shuffle images

  // Image Clicks
  function handleImageClick(isCorrect) {
      if (isCorrect) {
          alert("✅ Correct! You may proceed.");
          captcha.remove();
          popup.remove();
      } else {
          alert("❌ Wrong! Try again.");
      }
  }

  // Image parts
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

  // Add everything
  captcha.appendChild(popup);
  document.body.appendChild(captcha);
}


function showAd() {
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
        13 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348184109733777499/christian1-2.png?ex=67ce89cb&is=67cd384b&hm=7ca5dcb84e831becf643877f0d37b2c4fa8c2eddaebbe2f0f3495c0fff7524d6&",
        14 : "https://cdn.discordapp.com/attachments/1348007906460569722/1348184109733777499/christian1-2.png?ex=67ce89cb&is=67cd384b&hm=7ca5dcb84e831becf643877f0d37b2c4fa8c2eddaebbe2f0f3495c0fff7524d6&"
    };

    // Create overlay
    const ad = document.createElement('div');
    ad.id = 'popup-ad-ad';
    ad.style.position = 'fixed';
    ad.style.top = '0';
    ad.style.left = '0';
    ad.style.width = '0vw';
    ad.style.height = '0vh';
    ad.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    ad.style.zIndex = '9998';
    ad.style.opacity = '0'
    document.body.appendChild(ad);

    // Create popup
    const popup = document.createElement('div');
    popup.id = 'popup-ad';
    popup.style.position = 'fixed';
    popup.style.top = '0%';
    popup.style.left = (Math.floor(Math.random()*60)+15).toString() +'%';
    popup.style.height = '15vh';
    popup.style.width = '15vw';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '0px';
    popup.style.borderRadius = '0px';
    popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '9999'; // On top of the overlay
    popup.style.marginTop = (Math.floor(Math.random()*50)+10).toString() +'%';
    popup.innerHTML = `
        <img src="${ads[Math.round(Math.random()*14)]}" alt="Ad Image" style="max-width: 100%; height: auto; margin-bottom: 15px;">
        <button id="close-ad">Close Ad</button>
    `;
    

    const image = popup.querySelector('img');

    // Remove popup on click
    image.addEventListener('click', () => {
        popup.remove();        
    });
    
    function scaleImage() {        
        image.style.transform = `scale(${scaleT})`;
    }

    setInterval(scaleImage, 50);    

    // Add popups
    document.body.appendChild(popup);
    
    document.getElementById('close-ad').addEventListener('click', () => {
        ad.remove();
        popup.remove();
    });
}

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
    loading.style.width = '100vw'; 
    loading.style.height = '100vh';
    loading.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    loading.style.opacity = '1';
    loading.style.zIndex = '9999';
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

    // increment the progress counter randomly, once you hit 99% set it to 99.9999999999999...
    setInterval(() => {        
        randomProgress = ((Number(randomProgress) + (Math.floor(Math.random()*10) + 1)));
        if (randomProgress > 99) {
            randomProgress = "99."; 
            randomProgress += "9".repeat(count);
            count++;
        }
        randomProgress.toString();
        progressText.innerText = `Progress: ${randomProgress}`;
    }, 500);

    // Add to screen
    loading.appendChild(loadingText);
    loading.appendChild(progressText);
    document.body.appendChild(loading);

    // remove overlay at a certain point and call remaining attackers
    setTimeout(() => {
        loading.remove(); 
        loadingText.remove();
        progressText.remove();
        fakeLoadingEnabled = false;
        showPopup();
        //setInterval(showAd, Math.floor(Math.random() * (6000  + 1)) + 3000);
        if (window.location.href.includes("https://myschedule.erp.sfu.ca/"))
        {
          console.log("myschedule");
          setInterval(showJumpscare, 1500);
        }
        else{
          setInterval(showJumpscare, Math.round(Math.random()*15000)+6000);
        }
        
    }, 9000);
  
}

showFakeLoading();

function changeZoom(){
    // zoom in between 0.7 abd 1.3
    document.body.style.transform = `scale(${zoomT})`;
    document.body.style.transformOrigin = "0 0";
    document.body.style.width = `${zoomT*100}`;     
}
if (window.location.href.includes("https://myschedule.erp.sfu.ca/")){
  setInterval(changeChangeZoom,500);
}
else{
  setInterval(changeChangeZoom,1000);
}
let zoomcalled = false;

// call the change zoom once
function changeChangeZoom(){
    if(fakeLoadingEnabled == false && isPopupDisplayed == false && zoomcalled == false){
      zoomcalled = true;
      if (window.location.href.includes("https://myschedule.erp.sfu.ca/")){
        setInterval(changeZoom,250);
      }
      else{
        setInterval(changeZoom,500);
      }
      
    } 
}

let faces ={
  0: "https://cdn.discordapp.com/attachments/1348007906460569722/1348207050319986801/SeleneDelgado.webp?ex=67ce9f29&is=67cd4da9&hm=3801b3950df163cb7637a56094f5cf4fb99a7a98efa32a0e7dcb98d230720414&",
  1: "https://cdn.discordapp.com/attachments/1348007906460569722/1348200380311535627/misty1.jpg?ex=67ce98f3&is=67cd4773&hm=9f67b68e5a37799eb9baa4bc27827f7faf533d0bc613febf16edb80a38f71cca&"
};

function showJumpscare() {
    // Create the image
    const flashImg = document.createElement('img');
    flashImg.src = faces[Math.floor(Math.random()*2-0.01)];
    flashImg.style.position = 'fixed';
    flashImg.style.top = '0';
    flashImg.style.left = '0';
    flashImg.style.width = '75vw';
    flashImg.style.height = '75vh';
    flashImg.style.objectFit = 'cover';
    flashImg.style.zIndex = '99999';
    flashImg.style.opacity = '1';
    flashImg.style.pointerEvents = 'none';
    flashImg.style.margin = '50px';

    
    // Append 
    document.body.appendChild(flashImg);

    // Create and play scream
    const audio = new Audio(chrome.runtime.getURL('assets/scream1.mp3'));
    audio.play();

    // Remove the image after 500MS
    setTimeout(() => {
        flashImg.remove();
    }, 500);
}


