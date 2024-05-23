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