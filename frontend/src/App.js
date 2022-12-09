import { Routes,Route} from "react-router-dom";
import Homepage from './pages/homePage';
import React from 'react';
import Chatpage from './pages/chatPage';
import './App.css'

function App() {
  return (
    
      <div className="App">
        
        <Routes>
          
          <Route path="/chats" element={<Chatpage/>}/>
          <Route path="/" element={<Homepage/>} />

        </Routes>

     </div>

  );

}

export default App;