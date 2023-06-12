import './App.css';
import './theme.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useState } from "react";
import { ListBox } from 'primereact/listbox';

function App() {

  const audioFiles = [    
    {label: "April Showers", value: '/audio/april_showers.mp3'},
    {label: "Can't Stop Me", value: '/audio/cant_stop_me.mp3'},
    {label: "Faidherbe Square", value: '/audio/faidherbe_square.mp3'},
  ];

  const LS_File = localStorage.getItem("audioFile");
  const LS_Label = localStorage.getItem("audioLabel");
  const LS_Start = localStorage.getItem("audioStart");
  if (!LS_File) {
    localStorage.setItem("audioFile", "/audio/april_showers.mp3");
  }
  if (!LS_Label) {
    localStorage.setItem("audioLabel", "April Showers");
  }
  if (!LS_Start) {
    localStorage.setItem("audioStart", "0");
  }
  const [audioFile, setAudioFile] = useState(LS_File);
  const [audioLabel, setAudioLabel] = useState(LS_Label);
  const [startAt, setStartAt] = useState(LS_Start);

  const playAudio = (i) => {
    setAudioFile(audioFiles[i].value);
    setAudioLabel(audioFiles[i].label);
    setStartAt("0");
    localStorage.setItem("audioFile", audioFiles[i].value);
    localStorage.setItem("audioLabel", audioFiles[i].label);
    localStorage.setItem("audioStart", startAt);
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
    setStartAt(e.target.currentTime);
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

  fetch(audioFile);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SuenaTono</h1>
      </header>      
      <div className="container">
        <AudioPlayer id="suenaTono" src={audioFile} preload="auto" onListen={e => handleListen(e)} header={<h1>{audioLabel}</h1>} showSkipControls={true} onClickPrevious={handlePreviousSong} onClickNext={handleNextSong} customAdditionalControls={[]} customVolumeControls={[]} />
        <ListBox value={audioFiles[0]} options={audioFiles} onChange={handleAudioChange} optionLabel="label" optionValue="value" itemTemplate={itemTemplate} />
      </div>
      <div className="footer">
        <span>#RetoPWA de La Codificadora de Ideas para WebReactiva</span>
      </div>
    </div>
  );
}

export default App;
