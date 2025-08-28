import React, { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
// --- CAMBIO 1: Importamos los íconos desde la librería ---
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

const AudioToggleButton = () => {
  const { isPlaying, togglePlay } = useContext(AudioContext);

  if (!togglePlay) return null;

  // --- CAMBIO 2: Lógica de clases simplificada para el borde ---
  const ringClasses = isPlaying 
    ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-light-card dark:ring-offset-brand-dark' 
    : '';

  return (
    <button
      onClick={togglePlay}
      title='Música: "Cénit Digital" extraída de https://www.fiftysounds.com/es/'
      className={`
        p-2 rounded-full 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        focus:outline-none focus:ring-2 focus:ring-gray-500
        transition-all duration-300 ease-in-out
        ${ringClasses}
      `}
      aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
    >
      {/* Usamos los componentes de la librería */}
      {isPlaying 
        ? <HiSpeakerWave className="w-6 h-6" /> 
        : <HiSpeakerXMark className="w-6 h-6" />
      }
    </button>
  );
};

export default AudioToggleButton;    