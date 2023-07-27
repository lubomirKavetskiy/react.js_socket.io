import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import './App.css';

const SOCKET_SERVER_URL = 'http://localhost:3001';
const SOCKET_EVENT = {
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
  JOIN_ROOM: 'join_room',
};

const socket = io.connect(SOCKET_SERVER_URL);

function App() {
  const [roomValue, setRoomValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [receivedMsg, setReceivedMsg] = useState('');

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, (data) => {
      setReceivedMsg(data.msg);
    });
  }, []);

  const handleChangeRoom = (e) => {
    setRoomValue(e.target.value);
  };

  const handleJoinRoom = () => {
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, roomValue);

    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, { msg: inputValue });

    setInputValue('');
  };

  return (
    <div className="App">
      <div>
        <input
          value={roomValue}
          onChange={handleChangeRoom}
          placeholder="Join room..."
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>

      <div>
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type message..."
        />
        <button onClick={handleSendMessage}>Send message</button>
      </div>
      {receivedMsg && <p>Received message: {receivedMsg}</p>}
    </div>
  );
}

export default App;
