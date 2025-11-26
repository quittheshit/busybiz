import { useState, useEffect, useRef, memo } from 'react';
import { Search } from 'lucide-react';

const RankSearchSection = memo(() => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryIndex, setQueryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [yourPosition, setYourPosition] = useState(28);
  const [wheelProgress, setWheelProgress] = useState(0);

  const queries = [
    'Bedste frisør i København',
    'Massage i Herlev',
    'Fix min bil i Odense',
    'Rengøring i Aalborg',
    'Elektriker i Roskilde',
    'Tandlæge i Frederiksberg'
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY;
      const sensitivity = 0.001;

      setWheelProgress((prev) => {
        const newProgress = Math.max(0, Math.min(1, prev + delta * sensitivity));

        const newPosition = Math.max(
          1,
          Math.round(STARTING_POSITION - newProgress * (STARTING_POSITION - 1))
        );
        setYourPosition(newPosition);

        return newProgress;
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

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
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4">
              Bliv fundet online
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-6">
              Se hvordan dit firma klatrer til tops i søgeresultaterne
            </p>
          </div>

          <div className="mb-8 max-w-3xl mx-auto">
            <div className="relative bg-white rounded-full shadow-lg border border-gray-200 px-6 py-3 flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 text-gray-700 text-base md:text-lg font-light">
                {currentQuery}
                <span
                  className={`inline-block w-0.5 h-5 bg-blue-600 ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transition: 'opacity 0.1s' }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
              <h3 className="text-base font-semibold text-gray-900">
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
                      px-6 py-3 border-b border-gray-100 transition-all duration-500 ease-in-out
                      ${
                        listing.isYourBusiness
                          ? 'bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50 border-l-4 border-l-teal-500 shadow-md'
                          : 'bg-white hover:bg-gray-50'
                      }
                    `}
                    style={{
                      height: `${LISTING_HEIGHT}px`,
                      transform: listing.isYourBusiness ? 'scale(1.01)' : 'scale(1)',
                    }}
                  >
                    <div className="flex items-center gap-6 h-full">
                      <div
                        className={`
                          text-xl font-bold flex-shrink-0 w-10 text-left
                          ${
                            listing.isYourBusiness
                              ? 'text-teal-600'
                              : 'text-gray-400'
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
                                ? 'text-gray-900 text-base'
                                : 'text-gray-700 text-base'
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
                        <div className="text-xs text-gray-500 mt-0.5">
                          {listing.isYourBusiness
                            ? 'Din virksomhed stiger i søgeresultaterne'
                            : 'Konkurrent virksomhed'}
                        </div>
                      </div>

                      {listing.isYourBusiness && (
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                            <span>↑</span>
                            <span>Klatrer</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1.5">
                  <strong className="text-gray-900">Scroll ned</strong> for at se dit firma klatre til tops
                </p>
                <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold text-sm">
                  <span>Fra position {STARTING_POSITION}</span>
                  <span>→</span>
                  <span>Til #1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-sm">
              Med vores SEO-optimering og lokale markedsføringsstrategier hjælper vi dit firma med at blive den
              <strong className="text-teal-600"> førstevalg</strong> når potentielle kunder søger efter dine ydelser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

RankSearchSection.displayName = 'RankSearchSection';

export default RankSearchSection;
