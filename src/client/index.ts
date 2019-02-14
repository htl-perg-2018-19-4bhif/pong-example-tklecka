window.addEventListener('load', async () => {  
    // Establish connection with socket.io server. Note that this just works
    // because `<script src="/socket.io/socket.io.js"></script>` is in index.html
    const socket = io();
  
    // Handle browser's keydown event
    document.addEventListener('keydown', event => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        // Send ArrowKey message to server
        socket.emit('ArrowKey', event.code);
      }
    });
  
    // Handle ArrowKey message received from server (i.e. user pressed
    // an arrow key in a different browser window).
    socket.on('ArrowKey', code => {
      // Add code of the pressed key to HTML list
      console.log(code);
    })
  });