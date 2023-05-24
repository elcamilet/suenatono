import './App.css';
import './theme.css';
// import 'primereact/resources/themes/viva-dark/theme.css';
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

  const [audioFile, setAudioFile] = useState(null);
  const handleAudioChange = (e) => {
    setAudioFile(e.target.value);
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
        <AudioPlayer autoPlay src={audioFile} onPlay={e => console.log("onPlay")} />            
        <ListBox value={audioFiles[0]} options={audioFiles} onChange={handleAudioChange} optionLabel="label" optionValue="value" itemTemplate={itemTemplate} />            
      </div>
      <div className="footer">
        <span>#RetoPWA de WebReactiva</span><br/>
        <span>La Codificadora de Ideas</span>
      </div>
    </div>
  );
}

export default App;
