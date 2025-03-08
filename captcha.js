// DOM Elements
const openPopupButton = document.getElementById('openPopup');
const imagePopup = document.getElementById('imagePopup');
const closeImagePopupButton = document.getElementById('closeImagePopup');
const imagePopupGrid = document.querySelector('.image-popup-grid');
const imagePopupResult = document.getElementById('imagePopupResult');

// Correct Image (Always the same image, but its position changes)
const correctImageName = 'image1.png'; // Always use this image as the correct one

// Function to open the popup
openPopupButton.addEventListener('click', () => {
  imagePopup.style.display = 'flex';
  loadImages();
});

// Function to close the popup
closeImagePopupButton.addEventListener('click', () => {
  imagePopup.style.display = 'none';
  imagePopupResult.textContent = ''; // Clear result message
});

// Function to load images into the grid
function loadImages() {
  imagePopupGrid.innerHTML = ''; // Clear previous images

  // Create an array of image filenames
  const images = [
    'image1.png',
    'image2.png',
    'image3.png',
    'image4.png',
    'image5.png',
    'image6.png',
    'image7.png',
    'image8.png',
    'image9.png'
  ];

  // Shuffle the array to randomize the positions
  const shuffledImages = shuffleArray(images);

  // Add the correct image to a random position
  const correctImageIndex = Math.floor(Math.random() * 9); // Random index (0-8)
  shuffledImages[correctImageIndex] = correctImageName;

  // Load the images into the grid
  shuffledImages.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL(`images/${image}`); // Use Chrome Extension path
    img.alt = `Image ${index + 1}`;
    img.addEventListener('click', () => handleImageClick(image === correctImageName));
    imagePopupGrid.appendChild(img);
  });
}

// Function to handle image clicks
function handleImageClick(isCorrect) {
  if (isCorrect) {
    imagePopupResult.textContent = 'Correct! You clicked the right image.';
    imagePopupResult.style.color = 'green';
  } else {
    imagePopupResult.textContent = 'Wrong! Try again.';
    imagePopupResult.style.color = 'red';
  }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}