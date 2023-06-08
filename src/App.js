import './App.css';
import './theme.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useState, useEffect } from "react";
import { ListBox } from 'primereact/listbox';

function App() {
  // const [audio, setAudio] = useState(null);
  // console.log('audio file: '+ audio.currentSrc);
  
  const audioFiles = [    
    {label: "April Showers", value: '/audio/april_showers.mp3'},
    {label: "Can't Stop Me", value: '/audio/cant_stop_me.mp3'},
    {label: "Faidherbe Square", value: '/audio/faidherbe_square.mp3'},
  ];


   useEffect(() => {
    async function loadAudio() {
      // const audioUrl = "/audio/april_showers.mp3";
      const audioUrls = ['/audio/april_showers.mp3', '/audio/cant_stop_me.mp3', '/audio/faidherbe_square.mp3']
      let response;

      try {
        // Intenta cargar el archivo de audio desde la red
        response = await fetch(audioUrls);
      } catch (err) {
        // Si no se puede acceder a la red, intenta cargar el archivo de audio desde la caché
        const cache = await caches.open("CacheSuenaTono");
        response = await cache.match(audioUrls);
      }

      // Convierte la respuesta en un objeto de audio y establece el estado del componente
      const audioBlob = await response.blob();
      const audioObject = new Audio(URL.createObjectURL(audioBlob));
      audioObject.load();
      // setAudio(audioObject);
    }

    loadAudio();
  }, []);

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


  const playAudio = (i) => {
    setAudioFile(audioFiles[i].value);
    setAudioLabel(audioFiles[i].label);
    localStorage.setItem("audioFile", audioFiles[i].value);
    localStorage.setItem("audioLabel", audioFiles[i].label);
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

  const itemTemplate = (option, index) => {
    const isSelected = option.value === audioFile;
    const className = isSelected ? "active" : "";
    return (
      <div className={className}>
        <span>{option.label}</span>
      </div>
    );
  };

    
    return (
      <div className="App">
      <header className="App-header">
        <h1>SuenaTono</h1>
      </header>      
      <div className="container">
        <AudioPlayer src={audioFile} header={<h1>{audioLabel}</h1>} showSkipControls={true} onClickPrevious={handlePreviousSong} onClickNext={handleNextSong} customAdditionalControls={[]} customVolumeControls={[]} />
        <ListBox value={audioFiles[0]} options={audioFiles} onChange={handleAudioChange} optionLabel="label" optionValue="value" itemTemplate={itemTemplate} />
      </div>
      <div className="footer">
        <span>#RetoPWA de La Codificadora de Ideas para WebReactiva</span>
      </div>
    </div>
  );
}

export default App;
