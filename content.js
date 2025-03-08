// Create the pop-up element
const popup = document.createElement('div');
popup.style.position = 'fixed';
popup.style.top = '50%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.backgroundColor = 'white';
popup.style.border = '2px solid #ccc';
popup.style.padding = '20px';
popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
popup.style.zIndex = '10000';
popup.style.textAlign = 'center';
popup.innerHTML = `
  <h2>Hello!</h2>
  <p>This is a friendly pop-up.</p>
  <button id="closePopup">Close</button>
`;

// Append the pop-up to the body
document.body.appendChild(popup);

// Add event listener to close the pop-up
popup.querySelector('#closePopup').addEventListener('click', () => {
  popup.remove();
});