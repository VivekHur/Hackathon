// 360 Viewer Config
const totalFrames = 36;
const folderOne = "images/";

// Folder Paths
const beigeFolder = "ShoeImages/";
const pinkFolder = "shoepink/";
const imagePrefix = "Shoe";
const imageExtension = ".png";

let currentFrame = 1;
let isDragging = false;
let startX = 0;
let deltaX = 0; // Track the dragging distance
let currentImageFolder = beigeFolder; // Default folder

// DOM Elements
const colorBeigeIcon = document.getElementById("colorbeige");
const colorPinkIcon = document.getElementById("colorPink");
const shoeImg = document.getElementById("shoe");

// Preload Images
const preloadImages = (folder) => {
  const images = [];
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `${folderOne}${folder}${imagePrefix}${i}${imageExtension}`;
    images.push(img);
  }
  return images;
};

const beigeImages = preloadImages(beigeFolder);
const pinkImages = preloadImages(pinkFolder);
let images = beigeImages; // Default to beige

// Update Image Function
function updateImage() {
  shoeImg.src = `${folderOne}${currentImageFolder}${imagePrefix}${currentFrame}${imageExtension}`;
}

// Function to switch the folder and restart the 360 viewer
function switchColor(color) {
  if (color === "pink") {
    currentImageFolder = pinkFolder;
    shoeImg.style.transform = "scale(2)"; 

    images = pinkImages;
  } else {
    currentImageFolder = beigeFolder;
    shoeImg.style.transform = "scale(1)"; 

    images = beigeImages;
  }
  currentFrame = 1; // Reset to the first frame
  updateImage();
  updateSelection(color);
}

// Update Selected Color Styling
function updateSelection(color) {
  if (color === "pink") {
    colorPinkIcon.classList.add("selected");
    colorBeigeIcon.classList.remove("selected");
  } else {
    colorBeigeIcon.classList.add("selected");
    colorPinkIcon.classList.remove("selected");
  }
}

// Event Listeners for color icons
colorBeigeIcon.addEventListener("click", () => {
  switchColor("beige");
  colorBeigeIcon.classList.add("active");
  colorPinkIcon.classList.remove("active");
});

colorPinkIcon.addEventListener("click", () => {
  switchColor("pink");
  colorPinkIcon.classList.add("active");
  colorBeigeIcon.classList.remove("active");
});

colorBeigeIcon.addEventListener("mouseenter", () => {
  colorBeigeIcon.classList.add("hovered");
});

colorBeigeIcon.addEventListener("mouseleave", () => {
  colorBeigeIcon.classList.remove("hovered");
});

colorPinkIcon.addEventListener("mouseenter", () => {
  colorPinkIcon.classList.add("hovered");
});

colorPinkIcon.addEventListener("mouseleave", () => {
  colorPinkIcon.classList.remove("hovered");
});

// Auto Rotate
let autoRotateInterval;
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    if (!isDragging) {
      // Ensure auto-rotation only runs when not dragging
      currentFrame = (currentFrame % totalFrames) + 1;
      updateImage();
    }
  }, 100);
}

// Stop auto-rotation after 3 seconds (if not manually stopped by dragging)
setTimeout(() => {
  if (!isDragging) {
    startAutoRotate(); // Start auto-rotation if no drag was initiated
  }
}, 3000);

// Handle User Dragging
shoeImg.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent default drag behavior
  clearInterval(autoRotateInterval); // Stop auto-rotation on user interaction
  isDragging = true;
  startX = e.clientX;
  shoeImg.style.cursor = "grabbing"; // Change cursor when dragging
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  deltaX = e.clientX - startX; // Calculate horizontal drag movement
  // Update the image frame based on the dragging direction (left or right)
  if (Math.abs(deltaX) > 5) {
    currentFrame =
      ((currentFrame - Math.sign(deltaX) + totalFrames - 1) % totalFrames) + 1;
    startX = e.clientX; // Update startX for smoother interaction
    updateImage();
  }
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  shoeImg.style.cursor = "grab"; // Revert cursor after dragging
  startAutoRotate(); // Resume auto-rotation after the user stops dragging
});

document.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  shoeImg.style.cursor = "grab"; // Revert cursor after dragging
  startAutoRotate(); // Resume auto-rotation after the user stops dragging
});

// Initialize the first image and set up auto-rotation
updateImage();
startAutoRotate();

/* ------------------------------------TOP SELLING PRODUCTS---------------------------------------- */
// Group the divs based on the desired movement
let outerDiagonal = [
  document.getElementById("item-1"),
  document.getElementById("item-4"),
  document.getElementById("item-13"),
  document.getElementById("item-16"),
];
let outerAngle1 = [
  document.getElementById("item-2"),
  document.getElementById("item-9"),
  document.getElementById("item-12"),
  document.getElementById("item-15"),
];
let outerAngle2 = [
  document.getElementById("item-3"),
  document.getElementById("item-5"),
  document.getElementById("item-8"),
  document.getElementById("item-14"),
];
let innerDiagonal = [
  document.getElementById("item-6"),
  document.getElementById("item-7"),
  document.getElementById("item-10"),
  document.getElementById("item-11"),
];

const gridContainer = document.querySelector(".grid-container"); // The container of the grid
let gridStart = 0;

// Calculate the scroll position where the grid comes into focus
const updateGridStart = () => {
  const rect = gridContainer.getBoundingClientRect();
  gridStart = window.scrollY + rect.top - 140;
};

// Run the calculation on page load and resize
updateGridStart();
window.addEventListener("resize", updateGridStart);

// Add scroll event listener
window.addEventListener("scroll", () => {
  const value = window.scrollY - gridStart; // Start the effect when the grid comes into view

  if (value < 0) return; // Exit if the grid is not in focus

  let fadeValue = Math.max(1 - value / 500, 0); // Fades out to 0 opacity at scrollY of 500

  const moveAndFade = (item, xMultiplier, yMultiplier) => {
    item.style.transform = `translate(${value * xMultiplier}px, ${
      value * yMultiplier
    }px)`;
    item.style.opacity = fadeValue;
  };

  // Apply the movement and fade to the div groups
  outerDiagonal.forEach((item) => {
    const id = item.id;
    if (id === "item-1") moveAndFade(item, -0.5, -0.5);
    if (id === "item-4") moveAndFade(item, 0.5, -0.5);
    if (id === "item-13") moveAndFade(item, -0.5, 0.5);
    if (id === "item-16") moveAndFade(item, 0.5, 0.5);
  });

  outerAngle1.forEach((item) => {
    const id = item.id;
    if (id === "item-2") moveAndFade(item, 0.3, -0.2);
    if (id === "item-9") moveAndFade(item, -0.3, 0.2);
    if (id === "item-12") moveAndFade(item, 0.3, 0.2);
    if (id === "item-15") moveAndFade(item, -0.3, 0.2);
  });

  outerAngle2.forEach((item) => {
    const id = item.id;
    if (id === "item-3") moveAndFade(item, 0.4, -0.3);
    if (id === "item-5") moveAndFade(item, -0.4, -0.3);
    if (id === "item-8") moveAndFade(item, 0.4, 0.3);
    if (id === "item-14") moveAndFade(item, -0.4, 0.3);
  });

  innerDiagonal.forEach((item) => {
    const id = item.id;
    if (id === "item-6") moveAndFade(item, -0.2, -0.2);
    if (id === "item-7") moveAndFade(item, 0.2, -0.2);
    if (id === "item-10") moveAndFade(item, -0.2, 0.2);
    if (id === "item-11") moveAndFade(item, 0.2, 0.2);
  });
});

/* ------------------------------------TOP SELLING PRODUCTS---------------------------------------- */
