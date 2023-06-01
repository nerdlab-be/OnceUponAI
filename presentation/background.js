function createBackground() {
  const canvasRef = document.getElementById('ourcanvas');
  const mousePosition = { x: 0, y: 0 };
  let isMouseMoving = false;
  let idleTimeoutId = null;

  const CanvasWidth = window.innerWidth;
  const CanvasHeight = window.innerHeight;
  const ctx = canvasRef.getContext('2d');
  let grad = null;

  const drawGradient = (x, y) => {
    ctx.fillStyle = 'rgba(78,119,191,1)';
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);
    try {
      grad = ctx.createRadialGradient(x, y, 0, x + 100, y + 100, 250);
    } catch (e) {
      grad = ctx.createRadialGradient(
        CanvasWidth / 2,
        CanvasHeight / 2,
        0,
        CanvasWidth / 2 + 100,
        CanvasHeight / 2 + 100,
        250
      );
    }
    grad.addColorStop(0, 'rgba(247,223,137,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);
  };

  const handleMouseMove = (evt) => {
    const { x, y } = getMousePos(canvasRef, evt);
    drawGradient(x, y);
    mousePosition.x = x;
    mousePosition.y = y;
    isMouseMoving = true;
    clearTimeout(idleTimeoutId);
  };

  const handleMouseIdle = () => {
    isMouseMoving = false;
    idleTimeoutId = null;
    const bounceBack = () => {
      const { x, y } = mousePosition;
      const nextX = x;
      const nextY = y;
      drawGradient(nextX, nextY);
      if (!isMouseMoving) {
        idleTimeoutId = requestAnimationFrame(bounceBack);
      }
    };
    idleTimeoutId = requestAnimationFrame(bounceBack);
  };

  const getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;

    return {
      x: Math.round((evt.clientX - rect.left) * scaleX),
      y: Math.round((evt.clientY - rect.top) * scaleY),
    };
  };

  document.addEventListener('mousemove', handleMouseMove);
  idleTimeoutId = setTimeout(handleMouseIdle, 500);

  drawGradient(mousePosition.x, mousePosition.y);
}

createBackground();
