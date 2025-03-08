// DOM Elements
const openPopupButton = document.getElementById('openPopup');
const imagePopup = document.getElementById('imagePopup');
const closeImagePopupButton = document.getElementById('closeImagePopup');
const imagePopupGrid = document.querySelector('.image-popup-grid');
const imagePopupResult = document.getElementById('imagePopupResult');

// Correct Image Index (Randomly chosen)
const correctImageIndex = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9

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
  for (let i = 1; i <= 9; i++) {
    const img = document.createElement('img');
    img.src = `images/image${i}.png`;
    img.alt = `Image ${i}`;
    img.addEventListener('click', () => handleImageClick(i));
    imagePopupGrid.appendChild(img);
  }
}

// Function to handle image clicks
function handleImageClick(clickedImageIndex) {
  if (clickedImageIndex === correctImageIndex) {
    imagePopupResult.textContent = 'Correct! You clicked the right image.';
    imagePopupResult.style.color = 'green';
  } else {
    imagePopupResult.textContent = 'Wrong! Try again.';
    imagePopupResult.style.color = 'red';
  }
}