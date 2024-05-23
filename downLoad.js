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