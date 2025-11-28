import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { Search } from 'lucide-react';

const RankSearchSection = memo(() => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryIndex, setQueryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [yourPosition, setYourPosition] = useState(28);
  const [wheelProgress, setWheelProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const queries = [
    'Bedste frisør i København',
    'Massage i Herlev',
    'Fix min bil i Odense',
    'Rengøring i Aalborg',
    'Elektriker i Roskilde',
    'Tandlæge i Frederiksberg'
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const VISIBLE_LISTINGS = 8;
  const STARTING_POSITION = 28;
  const LISTING_HEIGHT = 65;

  useEffect(() => {
    const targetQuery = queries[queryIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentQuery.length < targetQuery.length) {
            setCurrentQuery(targetQuery.slice(0, currentQuery.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentQuery.length > 0) {
            setCurrentQuery(currentQuery.slice(0, -1));
          } else {
            setIsDeleting(false);
            setQueryIndex((prev) => (prev + 1) % queries.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentQuery, isDeleting, queryIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const easeOutCubic = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  const animatePosition = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const duration = prefersReducedMotion ? 800 : 2500;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easeOutCubic(progress);

    const newPosition = Math.max(
      1,
      Math.round(STARTING_POSITION - easedProgress * (STARTING_POSITION - 1))
    );

    setYourPosition(newPosition);
    setWheelProgress(easedProgress);

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animatePosition);
    } else {
      startTimeRef.current = null;
      animationFrameRef.current = null;
    }
  }, [prefersReducedMotion, easeOutCubic]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }

            startTimeRef.current = null;
            animationFrameRef.current = requestAnimationFrame(animatePosition);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animatePosition]);

  const generateListings = () => {
    const listings = [];

    if (yourPosition > VISIBLE_LISTINGS) {
      for (let i = 1; i <= VISIBLE_LISTINGS - 1; i++) {
        listings.push({
          position: i,
          name: `Andet firma ${i}`,
          isYourBusiness: false
        });
      }

      listings.push({
        position: yourPosition,
        name: 'DIG - DIT FIRMA',
        isYourBusiness: true
      });
    } else {
      let currentPos = 1;
      let insertedYourBusiness = false;

      for (let i = 0; i < VISIBLE_LISTINGS; i++) {
        if (currentPos === yourPosition && !insertedYourBusiness) {
          listings.push({
            position: yourPosition,
            name: 'DIG - DIT FIRMA',
            isYourBusiness: true
          });
          insertedYourBusiness = true;
          currentPos++;
        } else {
          listings.push({
            position: currentPos,
            name: `Andet firma ${currentPos}`,
            isYourBusiness: false
          });
          currentPos++;
        }
      }
    }

    return listings;
  };

  const displayListings = generateListings();

  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20 md:py-24">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Bliv fundet online
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-6">
              Se hvordan dit firma klatrer til tops i søgeresultaterne
            </p>
          </div>

          <div className="mb-10 max-w-3xl mx-auto">
            <div className="relative bg-slate-700/50 rounded-full shadow-2xl border-2 border-amber-500/30 px-6 py-4 flex items-center gap-4 backdrop-blur-sm">
              <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="flex-1 text-white text-base md:text-lg font-light">
                {currentQuery}
                <span
                  className={`inline-block w-0.5 h-5 bg-amber-400 ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transition: 'opacity 0.1s' }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border-2 border-amber-500/30 overflow-hidden">
            <div className="p-4 border-b-2 border-amber-500/30 bg-gradient-to-r from-slate-700 to-slate-800">
              <h3 className="text-base font-semibold text-white uppercase tracking-wide">
                Søgeresultater
              </h3>
            </div>

            <div
              ref={scrollContainerRef}
              className="relative overflow-hidden"
              style={{
                height: `${VISIBLE_LISTINGS * LISTING_HEIGHT}px`,
              }}
            >
              <div>
                {displayListings.map((listing, index) => (
                  <div
                    key={`${listing.position}-${listing.isYourBusiness ? 'your' : 'other'}-${index}`}
                    className={`
                      px-6 py-3 border-b border-slate-700/50 transition-all duration-300 ease-out will-change-transform
                      ${
                        listing.isYourBusiness
                          ? 'bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 border-l-4 border-l-teal-400 shadow-lg shadow-teal-500/20'
                          : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }
                    `}
                    style={{
                      height: `${LISTING_HEIGHT}px`,
                      transform: listing.isYourBusiness ? 'scale(1.01)' : 'scale(1)',
                      transformOrigin: 'center',
                      backfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'antialiased',
                    }}
                  >
                    <div className="flex items-center gap-6 h-full">
                      <div
                        className={`
                          text-xl font-bold flex-shrink-0 w-10 text-left
                          ${
                            listing.isYourBusiness
                              ? 'text-teal-400'
                              : 'text-white/40'
                          }
                        `}
                      >
                        {listing.position}
                      </div>

                      <div className="flex-1">
                        <div
                          className={`
                            font-semibold
                            ${
                              listing.isYourBusiness
                                ? 'text-white text-base'
                                : 'text-white/70 text-base'
                            }
                          `}
                        >
                          {listing.isYourBusiness ? (
                            <span className="uppercase tracking-wide">
                              {listing.name}
                            </span>
                          ) : (
                            listing.name
                          )}
                        </div>
                        <div className="text-xs text-white/60 mt-0.5">
                          {listing.isYourBusiness
                            ? 'Din virksomhed stiger i søgeresultaterne'
                            : 'Konkurrent virksomhed'}
                        </div>
                      </div>

                      {/* No more "klatrer" badge here */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={triggerRef} className="p-4 bg-gradient-to-r from-slate-700 to-slate-800 border-t-2 border-amber-500/30">
              <div className="text-center">
                <p className="text-xs text-white/80 mb-1.5">
                  <strong className="text-white">Scroll ned</strong> for at se dit firma klatre til tops
                </p>
                <div className="flex items-center justify-center gap-2 text-teal-400 font-semibold text-sm">
                  <span>Fra position {STARTING_POSITION}</span>
                  <span>→</span>
                  <span>Til #1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center max-w-2xl mx-auto">
            <p className="text-white/90 leading-relaxed text-base">
              Med vores SEO-optimering og lokale markedsføringsstrategier hjælper vi dit firma med at blive det
              <strong className="text-teal-400"> første valg</strong> når potentielle kunder søger efter dine ydelser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

RankSearchSection.displayName = 'RankSearchSection';

export default RankSearchSection;
