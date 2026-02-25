import { useEffect, useState } from 'react';

interface Raindrop {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
}

export function RainAnimation() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const drops: Raindrop[] = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 2,
      });
    }
    setRaindrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 w-0.5 h-12 bg-gradient-to-b from-blue-400 to-transparent opacity-60"
          style={{
            left: `${drop.left}%`,
            animation: `rain ${drop.animationDuration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes rain {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
