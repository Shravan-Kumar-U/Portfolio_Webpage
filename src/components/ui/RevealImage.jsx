import { useRef, useState, useCallback } from 'react';

/**
 * RevealImage — A component that shows a grayscale image and reveals the
 * original color only around the cursor / touch position using a radial
 * gradient mask. Works on both desktop (mousemove) and mobile/tablet (touchmove).
 *
 * Props:
 *  - src        : image URL
 *  - alt        : alt text
 *  - className  : additional classes for the wrapper div
 *  - radius     : reveal circle radius in px (default 120)
 */
export default function RevealImage({ src, alt, className = '', radius = 120 }) {
  const containerRef = useRef(null);
  const [maskPos, setMaskPos] = useState(null); // null when not hovered/touched

  const updatePosition = useCallback((clientX, clientY) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setMaskPos({ x, y });
  }, []);

  const handleMouseMove = useCallback((e) => {
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    if (touch) updatePosition(touch.clientX, touch.clientY);
  }, [updatePosition]);

  const handleLeave = useCallback(() => {
    setMaskPos(null);
  }, []);

  // Build the radial gradient mask for the color layer
  const maskStyle = maskPos
    ? {
        WebkitMaskImage: `radial-gradient(circle ${radius}px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 100%)`,
        maskImage: `radial-gradient(circle ${radius}px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 100%)`,
      }
    : {
        WebkitMaskImage: 'radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)',
        maskImage: 'radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)',
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
    >
      {/* Base layer: grayscale image (always visible) */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter grayscale"
        draggable={false}
      />

      {/* Color layer: full-color image, revealed only at cursor/touch position */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-none"
        style={maskStyle}
      />
    </div>
  );
}
