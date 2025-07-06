document.addEventListener('DOMContentLoaded', function() {
    // --- Get DOM Elements ---
    const canvas = document.getElementById('drawingCanvas');
    // Get the 2D rendering context for the canvas
    const ctx = canvas.getContext('2d'); 
    
    const colorPicker = document.getElementById('colorPicker');
    const clearButton = document.getElementById('clearButton');

    // --- Drawing State Variables ---
    let isDrawing = false; // True when mouse button is pressed down
    let lastX = 0;         // Last X coordinate of the mouse
    let lastY = 0;         // Last Y coordinate of the mouse

    // --- Initial Canvas Setup ---
    // Set default drawing properties
    ctx.strokeStyle = colorPicker.value; // Initial color from picker
    ctx.lineWidth = 5;                   // Thickness of the line
    ctx.lineCap = 'round';               // Round ends for lines
    ctx.lineJoin = 'round';              // Round corners for lines

    // --- Event Listeners ---

    // Mouse Down: Start drawing
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        // Update lastX and lastY to the current mouse position
        // offsetLeft/Top gets the position of the canvas relative to the document
        // e.clientX/Y gets the mouse position relative to the viewport
        lastX = e.clientX - canvas.offsetLeft;
        lastY = e.clientY - canvas.offsetTop;
        console.log(`Drawing started at: (${lastX}, ${lastY})`);
    });

    // Mouse Move: Draw lines while mouse button is pressed
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return; // Stop the function if not drawing
        
        // Calculate current mouse position relative to canvas
        const currentX = e.clientX - canvas.offsetLeft;
        const currentY = e.clientY - canvas.offsetTop;

        // Begin a new path
        ctx.beginPath();
        // Move to the last recorded position
        ctx.moveTo(lastX, lastY);
        // Draw a line to the current position
        ctx.lineTo(currentX, currentY);
        // Apply the stroke (draw the line)
        ctx.stroke();

        // Update lastX and lastY for the next segment of the line
        lastX = currentX;
        lastY = currentY;
    });

    // Mouse Up: Stop drawing
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        console.log('Drawing stopped.');
    });

    // Mouse Out (if mouse leaves canvas while drawing): Stop drawing
    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
        console.log('Mouse left canvas, drawing stopped.');
    });

    // Color Picker Change: Update drawing color
    colorPicker.addEventListener('input', (e) => {
        ctx.strokeStyle = e.target.value; // Set the stroke style to the selected color
        console.log('Color changed to:', e.target.value);
    });

    // Clear Button Click: Clear the entire canvas
    clearButton.addEventListener('click', () => {
        // clearRect(x, y, width, height) clears a rectangular area
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('Canvas cleared.');
    });
});