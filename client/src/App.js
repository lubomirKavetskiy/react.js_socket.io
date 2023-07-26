import { useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const handleSendMessage = () => {
    socket.emit('send_message', { msg: 'Hello world' });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      alert('hello');
    });
  }, [socket]);

  return (
    <div className="App">
      <input placeholder="Type message" />
      <button onClick={handleSendMessage}>Send message</button>
      {}
    </div>
  );
}

export default App;
