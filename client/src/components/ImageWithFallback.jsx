import { useState } from 'react';

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    // URL del placeholder. Puedes personalizar el color y el texto.
    const placeholderUrl = `https://placehold.co/600x400/334155/e2e8f0?text=Estamos+capturando+esta+imagen`;
    setImgSrc(placeholderUrl);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
