import React, { createContext, useState, useRef, useMemo } from 'react'; 

// Crear el contexto
export const AudioContext = createContext(null);

// Proveedor del contexto
export const AudioProvider = ({ children, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));
  audioRef.current.loop = true; // Queremos que la música se repita

  const togglePlay = () => {
    const wasPlaying = isPlaying;
    setIsPlaying(!wasPlaying);
    if (!wasPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
        setIsPlaying(false); // Revertir estado si falla la reproducción
      });
    } else {
      audioRef.current.pause();
    }
  };

  // Usamos useMemo para evitar que el objeto de contexto se recree en cada render
  const value = useMemo(() => ({
    isPlaying,
    togglePlay,
  }), [isPlaying]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};