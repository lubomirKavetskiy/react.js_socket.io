import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import './App.css';

const SOCKET_SERVER_URL = 'http://localhost:3001';
const SOCKET_EVENT = {
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
};

const socket = io.connect(SOCKET_SERVER_URL);

function App() {
  const [value, setValue] = useState('');
  const [receivedMsg, setReceivedMsg] = useState('');

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, (data) => {
      setReceivedMsg(data.msg);
    });
  }, []);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSendMessage = () => {
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, { msg: value });

    setValue('');
  };

  return (
    <div className="App">
      <input
        value={value}
        onChange={handleInputChange}
        placeholder="Type message"
      />
      <button onClick={handleSendMessage}>Send message</button>
      {receivedMsg && <p>Received message: {receivedMsg}</p>}
    </div>
  );
}

export default App;
