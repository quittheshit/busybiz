import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

export function SnowAnimation() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 text-white opacity-80"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(20px);
          }
        }
      `}</style>
    </div>
  );
}
