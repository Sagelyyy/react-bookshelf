import './App.css';
import React, {useState } from "react";
import Card from './components/Card';
import Modal from './components/Modal';


function App() {

  const [modalState, setModalState] = useState({
    isOpen: false
  })

  const modalHandler = () => {
    setModalState({isOpen: true})
  }

  return (
    <div className="App">
      <button onClick={modalHandler}>Click ME!</button>
      <Modal modalState={modalState} setModalState={setModalState}/>
      <Card />
    </div>
  );
}

export default App;
