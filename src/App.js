import './App.css';
import './theme.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useState, useRef } from "react";
import { ListBox } from 'primereact/listbox';
import { showCustomMessage } from "chrome";
import { request } from "navigator";
import { setCustomMessage } from "navigator";


function App() {
  
  const audioRef = useRef(null);
  const audioFiles = [    
    {label: "April Showers", value: '/audio/april_showers.mp3'},
    {label: "Can't Stop Me", value: '/audio/cant_stop_me.mp3'},
    {label: "Faidherbe Square", value: '/audio/faidherbe_square.mp3'},
  ];
  const LS_File = localStorage.getItem("audioFile");
  const LS_Label = localStorage.getItem("audioLabel");

  if (!LS_File) {
    localStorage.setItem("audioFile", "/audio/april_showers.mp3");
  }
  if (!LS_Label) {
    localStorage.setItem("audioLabel", "April Showers");
  }
  const [audioFile, setAudioFile] = useState(LS_File);
  const [audioLabel, setAudioLabel] = useState(LS_Label);
  
  request("screen").then((lock) => {
    const customMessage = {
      type: "music",
      title: audioLabel,
      albumArt: "favicon144.png",
    };

    setCustomMessage(customMessage);
    showCustomMessage();
    lock.release();
  });


  const setStartAt = (e) => {
    e.target.currentTime = localStorage.getItem("audioStart");
  }

  const playAudio = (i) => {
    setAudioFile(audioFiles[i].value);
    setAudioLabel(audioFiles[i].label);
    localStorage.setItem("audioFile", audioFiles[i].value);
    localStorage.setItem("audioLabel", audioFiles[i].label);
    localStorage.setItem("audioStart", "0");
  }
  const handleAudioChange = (e) => {
    const i = audioFiles.findIndex(el => el.value === e.target.value);
    playAudio(i);
  };

  const handleNextSong = () => {
    const index = audioFiles.findIndex(e => e.value === audioFile);
    const i = index === audioFiles.length - 1 ? 0 : index + 1;    
    playAudio(i);
  }

  const handlePreviousSong = () => {
    const index = audioFiles.findIndex(e => e.value === audioFile);
    const i = index === 0 ? audioFiles.length - 1 : index - 1;
    playAudio(i);    
  };

  const handleListen = (e) => {
    localStorage.setItem("audioStart", String(Math.round(e.target.currentTime)));
  }

  const itemTemplate = (option, index) => {
    const isSelected = option.value === audioFile;
    const className = isSelected ? "active" : "";
    return (
      <div className={className}>
        <span>{option.label}</span>
      </div>
    );
  };

 function handleSpeedChange(speed) {
    audioRef.current.audio.current.playbackRate = speed;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>SuenaTono</h1>
      </header>      
      <div className="container">
        <AudioPlayer ref={audioRef} onPlay={e => setStartAt(e)} src={audioFile} playbackRate={2} preload="auto" onListen={e => handleListen(e)} listenInterval={500} header={<h1>{audioLabel}</h1>} showSkipControls={true} onClickPrevious={handlePreviousSong} onClickNext={handleNextSong} customAdditionalControls={[]} customVolumeControls={[]} />
        <button className="button" onClick={() => handleSpeedChange(1)}>1X</button>
        <button className="button" onClick={() => handleSpeedChange(1.5)}>1.5X</button>
        <button className="button" onClick={() => handleSpeedChange(2)}>2X</button>
        <ListBox value={audioFiles[0]} options={audioFiles} onChange={handleAudioChange} optionLabel="label" optionValue="value" itemTemplate={itemTemplate} />
      </div>
      <div className="footer">
        <span>#RetoPWA de La Codificadora de Ideas para WebReactiva</span>
      </div>
    </div>
  );
}

export default App;
