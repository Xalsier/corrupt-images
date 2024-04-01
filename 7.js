window.onload = function() {
    const img = new Image(); 
    img.src = document.getElementById('refImage').src; // Update if your image filename is different
    const canvas = document.getElementById('corruptedCanvas');
    const ctx = canvas.getContext('2d');
    const numInput = document.getElementById('numInput');
    const blackPiecesCheckbox = document.getElementById('blackPiecesCheckbox');
    const brightPiecesCheckbox = document.getElementById('brightPiecesCheckbox');
    const refreshButton = document.getElementById('refreshButton');
  
    // Control variables
    let num = 3; // Mosaic level (affects number of pieces)
    const minPieceSize = 10; // Minimum size of a piece 
  
    // Fun booleans
    let useBlackPieces = true; // Enable/disable black pieces
    let useBrightPieces = true;  // Enable/disable bright pieces
    const blackPieceProbability = 0.1;  // Chance of a piece being black 
    const brightnessFactor = 5; // How much brighter bright pieces are
  
    // Mosaic Effect Function (Now called 'updateMosaic')
    function updateMosaic() { 
      let x = 0;
      let y = 0;
  
      while (y < img.height) {
        let pieceWidth = Math.max(minPieceSize, Math.floor(Math.random() * img.width / num));
        let pieceHeight = Math.max(minPieceSize,  Math.floor(Math.random() * img.height / num));
  
        // Ensure we don't go beyond image boundaries
        if (x + pieceWidth > img.width) {
          pieceWidth = img.width - x;
        }
        if (y + pieceHeight > img.height) {
          pieceHeight = img.height - y;
        }
  
        // Randomly offset for each piece 
        const offsetX = Math.floor(Math.random() * (pieceWidth / 2) * (Math.random() < 0.5 ? -1 : 1));
        const offsetY = Math.floor(Math.random() * (pieceHeight / 2) * (Math.random() < 0.5 ? -1 : 1));
  
        // Random effects logic
        if (useBlackPieces = true && Math.random() < blackPieceProbability) {
          ctx.fillStyle = 'black';  // Fill with black
          ctx.fillRect(x, y, pieceWidth, pieceHeight);
        } else if (useBrightPieces = true && Math.random() < 0.2) { // Example probability
          ctx.save(); // Save the current context state
          ctx.globalCompositeOperation = 'lighter'; // Use 'lighter' blend mode
          ctx.drawImage(img, 
                        x + offsetX, y + offsetY, 
                        pieceWidth, pieceHeight,
                        x, y,
                        pieceWidth * brightnessFactor, pieceHeight * brightnessFactor // Scale up
                       );
          ctx.restore(); // Restore the context state
        } else {
          // Default: draw the image piece normally
          ctx.drawImage(img, 
                        x + offsetX, y + offsetY,
                        pieceWidth, pieceHeight,  
                        x, y,                     
                        pieceWidth, pieceHeight 
                       ); 
        }
  
        x += pieceWidth; 
        if (x >= img.width) {
          x = 0; // Reset x for next row
          y += pieceHeight;
        }
      }
    }
  
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Event Listener for Refresh Button
      refreshButton.addEventListener('click', function() {
        let num = parseInt(numInput.value);  // Read num from input
        if (blackPiecesCheckbox.checked) {
            let useBlackPieces = true;
        } else {
            let useBlackPieces = false;
        }
        const useBlackPieces = blackPiecesCheckbox.checked;
        const useBrightPieces = brightPiecesCheckbox.checked;
  
        canvas.width = img.width; // Reset canvas size 
        canvas.height = img.height;
  
        updateMosaic(); // Update the mosaic
      });
      refreshButton.addEventListener('click', function() {
        num = numInput.value;
        modeSelect = document.getElementById('modeSelect');
        updateMosaic(); // Call the effect initially

    });
      updateMosaic(); // Call the effect initially
    };

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
      const canvas = document.getElementById('corruptedCanvas');
  
      // Use toDataURL for convenient download functionality
      const dataURL = canvas.toDataURL('image/png'); // or 'image/jpeg' for JPG
  
      // Create a temporary link element 
      const link = document.createElement('a');
      link.download = 'corrupted-image.png'; // Set filename 
      link.href = dataURL;
      document.body.appendChild(link); // Required for some browsers
      link.click();
      document.body.removeChild(link); // Cleanup
    });

    const changeImageButton = document.getElementById('changeImageButton');
    const imageUpload = document.getElementById('imageUpload');
    const refImage = document.getElementById('refImage'); // Assuming you have an <img> tag with id='refImage'
  
    changeImageButton.addEventListener('click', function() {
      imageUpload.click(); // Trigger the hidden file input
    });
  
    imageUpload.addEventListener('change', function(event) {
      const file = event.target.files[0]; 
      if (file.type.startsWith('image/')){
        const reader = new FileReader();
        reader.onload = function(readerEvent) {
          refImage.src = readerEvent.target.result;  // Update reference image
  
          // After the new image loads, update mosaic 
          refImage.onload = function() {
              img.src = document.getElementById('refImage').src; // Update if your image filename is different
              updateMosaic();  // Call your updateMosaic function to re-render
          };
        }
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file");
      }
    }); 
  };
  