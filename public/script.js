const messagesList = document.getElementById('messages-list');
const entryInput = document.getElementById('entry-input');
const sendButton = document.getElementById('send-button');

// send message to server on button click
//this line defines an arrow function and assigns it as a callback to the onclick event of the button
sendButton.onclick = () => {
  const message = entryInput.value;
  // empty the value of the message input
  entryInput.value = '';
  
  // form a POST request to the server
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // this is the body of the request as a JSON string
    body: JSON.stringify({ 
      message: message
    }),
  };

  // send the request to the server
  fetch('/api/send', request);
}

// fetch messages from server every second
// this line defines an arrow function and assigns it as a callback to the setInterval function
// the arrow function is async because it uses the await keyword to wait for the fetch to complete
setInterval(async () => {
  // fetch messages from server
  const response = await fetch('/api/messages');
  // parse the response as JSON
  const result = await response.json();

  // empty the messages list
  messagesList.innerHTML = '';

  // add each message to the messages list
  for (const message of result.messages) {
    // create a new span element
    const span = document.createElement('span');
    // add the message class to the span
    span.classList.add('message');
    // set the text content of the span to the message
    span.textContent = message;
    // add the span to the messages list
    messagesList.appendChild(span);
  };

}, 1000);
// 1000 milliseconds = 1 second
