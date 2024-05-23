refreshButton.addEventListener('click', function() {
  let num = parseInt(numInput.value);  // Read num from input
  let useBlackPieces = blackPiecesCheckbox.checked;
  let useBrightPieces = brightPiecesCheckbox.checked;
  canvas.width = img.width; // Reset canvas size 
  canvas.height = img.height;
  updateMosaic(); // Update the mosaic
});
refreshButton.addEventListener('click', function() {
  num = numInput.value;
  updateMosaic(); // Call the effect initially
});
updateMosaic(); // Call the effect initially