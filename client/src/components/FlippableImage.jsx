import React, { useState, useEffect } from 'react';
import { ImageIcon, AlertTriangle, Check } from 'lucide-react';

const FlippableImage = ({ src, title, description, points = [], accentColor = 'orange' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageStatus, setImageStatus] = useState('loading');

  useEffect(() => {
    setImageStatus('loading');
    if (!src) {
      setImageStatus('error');
      return;
    }
    const img = new Image();
    img.src = src;
    const handleLoad = () => setImageStatus('loaded');
    const handleError = () => setImageStatus('error');
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  const accentColors = {
    orange: {
      bgGradient: 'from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800',
      separator: 'bg-orange-300',
      check: 'text-orange-200'
    },
    blue: {
      bgGradient: 'from-sky-600 to-sky-700 dark:from-sky-700 dark:to-sky-800',
      separator: 'bg-sky-300',
      check: 'text-sky-200'
    }
  };
  const selectedAccent = accentColors[accentColor] || accentColors.orange;

  const renderFrontContent = () => {
    switch (imageStatus) {
      case 'loading':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
            <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 animate-pulse" />
          </div>
        );
      case 'error':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 dark:text-red-500 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">No se pudo cargar la imagen.</span>
          </div>
        );
      case 'loaded':
        return (
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="group w-full h-full"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full cursor-pointer transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Lado Frontal (Anverso) */}
        <div className="absolute w-full h-full rounded-lg overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
          {renderFrontContent()}
        </div>

        {/* --- MEJORA FINAL: Diseño del reverso centrado, con más padding y texto más grande --- */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br ${selectedAccent.bgGradient} rounded-lg shadow-lg p-6 flex flex-col justify-center text-center`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-white">
            <h4 className="text-2xl font-bold font-serif mb-2">{title}</h4>
            <p className="text-sm font-light leading-relaxed opacity-90 mb-4">{description}</p>
            
            {points && points.length > 0 && (
              <>
                <div className={`w-16 h-0.5 ${selectedAccent.separator} bg-opacity-75 mb-4 mx-auto`}></div>
                {/* La lista ahora se muestra en una sola columna para un mejor centrado */}
                <ul className="space-y-2 inline-block text-left mx-auto">
                  {points.map((point, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${selectedAccent.check}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippableImage;
