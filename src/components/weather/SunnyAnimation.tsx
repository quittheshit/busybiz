export function SunnyAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute top-8 right-8 w-24 h-24">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse" />

          <div className="absolute inset-0 animate-spin-slow">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-yellow-400 left-1/2 -ml-0.5 origin-bottom"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  top: '-32px',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/20 via-transparent to-transparent" />

      <style>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
