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
// Other Controls
const changeImageButton = document.getElementById('changeImageButton');
const imageUpload = document.getElementById('imageUpload');
const refImage = document.getElementById('refImage'); // Assuming you have an <img> tag with id='refImage'
const downloadButton = document.getElementById('downloadButton');
const modeSelect = document.getElementById('modeSelect');
canvas.width = img.width;
canvas.height = img.height;