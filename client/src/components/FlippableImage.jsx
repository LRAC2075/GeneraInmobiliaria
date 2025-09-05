import React, { useState, useEffect } from 'react';
import { Check, ImageIcon, AlertTriangle } from 'lucide-react';

const FlippableImage = ({ src, title, description, points = [] }) => {
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

  const renderFrontContent = () => {
    switch (imageStatus) {
      case 'loading':
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-lg">
            <ImageIcon className="w-12 h-12 text-neutral-400 dark:text-neutral-500 animate-pulse" />
          </div>
        );
      case 'error':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 dark:text-red-500 mb-2" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">No se pudo cargar la imagen.</span>
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

        {/* Lado Trasero (Reverso) con texto responsivo mejorado */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-accent-600 to-accent-700 dark:from-accent-700 dark:to-accent-800 rounded-lg shadow-lg p-4 sm:p-6 flex flex-col justify-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-white">
            <h4 className="text-xl md:text-2xl font-bold font-serif mb-2">{title}</h4>
            <p className="text-base md:text-lg font-light leading-snug opacity-90 mb-4">{description}</p>
            
            {points && points.length > 0 && (
              <>
                <div className="w-1/3 h-px bg-accent-300 bg-opacity-75 mb-4 mx-auto"></div>
                <ul className="space-y-2 inline-block text-left mx-auto">
                  {points.map((point, index) => (
                    <li key={index} className="flex items-start text-sm md:text-base">
                      <Check className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-accent-200" />
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