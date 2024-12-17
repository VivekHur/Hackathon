// Parallax Effect
let text = document.getElementById("text");
let plant = document.getElementById("plant");
let leaf = document.getElementById("leaf");
let hill1 = document.getElementById("hill1");
let hill2 = document.getElementById("hill2");
let hill3 = document.getElementById("hill3");
let hill4 = document.getElementById("hill4");
let hill5 = document.getElementById("hill5");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  text.style.marginTop = value * 2.5 + "px";
  leaf.style.top = value * -1.5 + "px";
  leaf.style.left = value * 1.5 + "px";
  hill5.style.left = value * 1.5 + "px";
  hill4.style.left = value * -1.5 + "px";
});

// 360 Viewer Config
const totalFrames = 36;
const imageFolder = "ShoeImages/";
const imagePrefix = "Shoe";
const imageExtension = ".png";

let currentFrame = 1;
let isDragging = false;
let startX = 0;
let deltaX = 0; // Track the dragging distance

// DOM Elements
const shoeImg = document.getElementById("shoe");

// Preload Images
const images = [];
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = `${imageFolder}${imagePrefix}${i}${imageExtension}`;
  images.push(img);
}

// Update Image Function
function updateImage() {
  shoeImg.src = `${imageFolder}${imagePrefix}${currentFrame}${imageExtension}`;
}

// Auto Rotate
let autoRotateInterval;
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    if (!isDragging) {  // Ensure auto-rotation only runs when not dragging
      currentFrame = (currentFrame % totalFrames) + 1;
      updateImage();
    }
  }, 100);
}

// Stop auto-rotation after 3 seconds (if not manually stopped by dragging)
setTimeout(() => {
  if (!isDragging) {
    startAutoRotate();  // Start auto-rotation if no drag was initiated
  }
}, 3000);

// Handle User Dragging
shoeImg.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent default drag behavior
  clearInterval(autoRotateInterval); // Stop auto-rotation on user interaction
  isDragging = true;
  startX = e.clientX;
  shoeImg.style.cursor = "grabbing";  // Change cursor when dragging
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  deltaX = e.clientX - startX;  // Calculate horizontal drag movement
  // Update the image frame based on the dragging direction (left or right)
  if (Math.abs(deltaX) > 5) {
    currentFrame = (currentFrame - Math.sign(deltaX) + totalFrames - 1) % totalFrames + 1;
    startX = e.clientX; // Update startX for smoother interaction
    updateImage();
  }
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  shoeImg.style.cursor = "grab";  // Revert cursor after dragging
  startAutoRotate();  // Resume auto-rotation after the user stops dragging
});

document.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  shoeImg.style.cursor = "grab";  // Revert cursor after dragging
  startAutoRotate();  // Resume auto-rotation after the user stops dragging
});

// Initialize the first image and set up auto-rotation
updateImage();
startAutoRotate();
