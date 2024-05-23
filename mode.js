function updateMosaic() {
  const mode = document.getElementById('modeSelect').value;
  const numTiles = 6;
  const tileSize = Math.floor(img.width / numTiles);
  let x = 0;
  let y = 0;
  let currentTile = 0;

  switch (mode) {
    case 'piece':
      while (y < img.height) {
        let pieceWidth = Math.max(minPieceSize, Math.floor(Math.random() * img.width / num));
        let pieceHeight = Math.max(minPieceSize, Math.floor(Math.random() * img.height / num));
        pieceWidth = (x + pieceWidth > img.width) ? (img.width - x) : pieceWidth;
        pieceHeight = (y + pieceHeight > img.height) ? (img.height - y) : pieceHeight;

        const offsetX = Math.floor(Math.random() * (pieceWidth / 2) * (Math.random() < 0.5 ? -1 : 1));
        const offsetY = Math.floor(Math.random() * (pieceHeight / 2) * (Math.random() < 0.5 ? -1 : 1));
        if (useBlackPieces == true && Math.random() < blackPieceProbability) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x, y, pieceWidth, pieceHeight);
        } else if (useBrightPieces == true && Math.random() < 0.2) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.drawImage(img, 
            x + offsetX, y + offsetY, 
            pieceWidth, pieceHeight,
            x, y,
            pieceWidth * brightnessFactor, pieceHeight * brightnessFactor
          );
          ctx.restore();
        } else {
          ctx.drawImage(img, 
            x + offsetX, y + offsetY,
            pieceWidth, pieceHeight, 
            x, y, 
            pieceWidth, pieceHeight
          );
        }

        x += pieceWidth;
        x = (x >= img.width) ? 0 : x;
        y += (x == 0) ? pieceHeight : 0;
      }
      break;

    case 'repair': {}
      case 'scanRender': {
        let numTilesX = 6;
        let numTilesY = 6;
        let tileSizeX, tileSizeY;
    
        function updateTileSizes() {
            tileSizeX = Math.floor(img.width / numTilesX);
            tileSizeY = Math.floor(img.height / numTilesY);
        }
    
        updateTileSizes(); // Initial calculation
    
        let currentTileX = 0;
        let currentTileY = 0;
        let movingRight = true;
    
        const interval = setInterval(() => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear with black
    
            let offsetX = 0;
            if (movingRight) {
                offsetX = tileSizeX * (currentTileX % (numTilesX - 1)); 
            } else {
                offsetX = tileSizeX * ((numTilesX - 1) - currentTileX % (numTilesX - 1)); 
            }
    
            const sourceTileX = currentTileX * tileSizeX;
            const sourceTileY = currentTileY * tileSizeY;
    
            ctx.drawImage(img, sourceTileX, sourceTileY, tileSizeX, tileSizeY, 
                              offsetX, currentTileY * tileSizeY, tileSizeX, tileSizeY);
    
            if (movingRight) {
                currentTileX++;
                if (currentTileX >= numTilesX - 1) {
                    currentTileX = 0;
                    currentTileY++;
                    movingRight = false;
                }
            } else {
                currentTileX++;
                if (currentTileX >= numTilesX - 1) {
                    currentTileX = 0;
                    currentTileY++;
                    movingRight = true;
                }
            }
    
            if (currentTileY >= numTilesY) {
                currentTileY = 0;
            }
        }, 1000 / 60);     
    }
    default:
      while (y < img.height) {
        let pieceWidth = Math.max(minPieceSize, Math.floor(Math.random() * img.width / num));
        let pieceHeight = Math.max(minPieceSize, Math.floor(Math.random() * img.height / num));
        pieceWidth = (x + pieceWidth > img.width) ? (img.width - x) : pieceWidth;
        pieceHeight = (y + pieceHeight > img.height) ? (img.height - y) : pieceHeight;

        ctx.drawImage(img, 
          x, y,
          pieceWidth, pieceHeight, 
          x, y, 
          pieceWidth, pieceHeight
        );

        x += pieceWidth;
        x = (x >= img.width) ? 0 : x;
        y += (x == 0) ? pieceHeight : 0;
      }
      break;
      case 'tileRender': {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        const numTilesX = 6;
        const numTilesY = 6;
        const tileSizeX = Math.floor(img.width / numTilesX);
        const tileSizeY = Math.floor(img.height / numTilesY);
        let currentTile = 0;
        let loops = 0;
        const quadrants = ['A', 'B', 'C', 'D'];
        const patterns = ['checkerboard', 'rhombus'];
  
        function drawPattern(pattern, quadrant) {
          const startX = quadrant === 'A' || quadrant === 'C' ? 0 : canvas.width / 2;
          const startY = quadrant === 'A' || quadrant === 'B' ? 0 : canvas.height / 2;
          const endX = startX + canvas.width / 2;
          const endY = startY + canvas.height / 2;
  
          for (let i = startX; i < endX; i += tileSizeX) {
            for (let j = startY; j < endY; j += tileSizeY) {
              const xOffset = i - startX; // Calculate the x offset within the quadrant
              const yOffset = j - startY; // Calculate the y offset within the quadrant
              if (pattern === 'checkerboard') {
                if ((xOffset / tileSizeX + yOffset / tileSizeY) % 2 === 0) {
                  ctx.drawImage(img, i, j, tileSizeX, tileSizeY, i, j, tileSizeX, tileSizeY);
                }
              } else if (pattern === 'rhombus') {
                if ((xOffset / tileSizeX + yOffset / tileSizeY) % 2 !== 0) {
                  ctx.drawImage(img, i, j, tileSizeX, tileSizeY, i, j, tileSizeX, tileSizeY);
                }
              }
            }
          }
        }
  
        const interval = setInterval(() => {
          ctx.fillStyle = 'cyan';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          const pattern = patterns[Math.floor(Math.random() * patterns.length)];
          const quadrant = quadrants[currentTile % quadrants.length];
  
          drawPattern(pattern, quadrant);
  
          currentTile++;
          if (currentTile >= numTilesX * numTilesY) {
            currentTile = 0;
            loops++;
            if (loops >= 2) {
              loops = 0;
            }
          }
        }, 1000 / 60); // 60 FPS
        break;
      }
  }
}
