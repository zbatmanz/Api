const WebSocket = require('ws');
 const axios = require('axios');


const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('Received: ' + message);
        
        if (message){
         async function sendSingleMessage() {
         try {
           const response = await axios.post('https://freeuseapis.vercel.app/api/chat', {
              messages: [{content: "Hello World",role: "user"}]});
              console.log(response.data["body"]["response"])
              ws.send(response.data["body"]["response"]);
         } catch (error) {
         ws.send('Error:', error.response ? error.response.data : error.message);
         }}
         sendSingleMessage();
        }
    });

    ws.on('close', function () {
        console.log('Connection closed');
    });
});
console.log('WebSocket server started on port 3000');