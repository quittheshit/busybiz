import { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export function CloudyAnimation() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const cloudArray: Cloud[] = [];
    for (let i = 0; i < 8; i++) {
      cloudArray.push({
        id: i,
        top: Math.random() * 40 + 10,
        size: Math.random() * 80 + 60,
        duration: Math.random() * 20 + 30,
        delay: Math.random() * 10,
      });
    }
    setClouds(cloudArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-200/10" />

      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute opacity-60"
          style={{
            top: `${cloud.top}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            animation: `drift ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/4 w-1/2 h-3/4 bg-gray-400 rounded-full" />
            <div className="absolute bottom-0 left-0 w-2/5 h-2/3 bg-gray-400 rounded-full" />
            <div className="absolute bottom-0 right-0 w-2/5 h-2/3 bg-gray-400 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/2 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes drift {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120vw);
          }
        }
      `}</style>
    </div>
  );
}
