import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const RankSearchSection = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryIndex, setQueryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [yourPosition, setYourPosition] = useState(28);
  const [scrollProgress, setScrollProgress] = useState(0);

  const queries = [
    'Bedste frisør i København',
    'Massage i Herlev',
    'Fix min bil i Odense',
    'Rengøring i Aalborg',
    'Elektriker i Roskilde',
    'Tandlæge i Frederiksberg'
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const LISTINGS_PER_PAGE = 10;
  const STARTING_POSITION = 28;
  const LISTING_HEIGHT = 80;

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

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const scrollPercentage = (scrollTop / maxScroll) * 100;

      if (scrollPercentage >= 50) {
        const progress = Math.min((scrollPercentage - 50) / 50, 1);
        setScrollProgress(progress);

        const newPosition = Math.max(
          1,
          Math.round(STARTING_POSITION - progress * (STARTING_POSITION - 1))
        );
        setYourPosition(newPosition);
      } else {
        setScrollProgress(0);
        setYourPosition(STARTING_POSITION);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const regularListings = Array.from({ length: LISTINGS_PER_PAGE }, (_, i) => i + 1);

  const shouldShowYourBusinessInList = yourPosition <= LISTINGS_PER_PAGE;

  const getListingsWithYourBusiness = () => {
    if (!shouldShowYourBusinessInList) {
      return regularListings.map(pos => ({ position: pos, isYourBusiness: false }));
    }

    const listings = [];
    for (let i = 1; i <= LISTINGS_PER_PAGE; i++) {
      if (i === yourPosition) {
        listings.push({ position: yourPosition, isYourBusiness: true });
      } else if (i < yourPosition) {
        listings.push({ position: i, isYourBusiness: false });
      } else {
        listings.push({ position: i, isYourBusiness: false });
      }
    }
    return listings;
  };

  const listingsToDisplay = getListingsWithYourBusiness();

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
              Bliv fundet online
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-8">
              Se hvordan dit firma klatrer til tops i søgeresultaterne
            </p>
          </div>

          <div className="mb-12 max-w-3xl mx-auto">
            <div className="relative bg-white rounded-full shadow-lg border border-gray-200 px-6 py-4 flex items-center gap-4">
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
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
              <h3 className="text-lg font-semibold text-gray-900">
                Søgeresultater
              </h3>
            </div>

            <div
              ref={scrollContainerRef}
              className="relative overflow-y-auto"
              style={{
                height: `${LISTINGS_PER_PAGE * LISTING_HEIGHT}px`,
                scrollBehavior: 'smooth'
              }}
            >
              <div className="py-4">
                {listingsToDisplay.map((item, index) => (
                  <div
                    key={`listing-${index}`}
                    className={`
                      px-6 py-4 border-b border-gray-100 transition-all duration-500
                      ${
                        item.isYourBusiness
                          ? 'bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50 border-l-4 border-l-teal-500 shadow-md'
                          : 'bg-white hover:bg-gray-50'
                      }
                    `}
                    style={{
                      height: `${LISTING_HEIGHT}px`,
                      transform: item.isYourBusiness ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <div className="flex items-center gap-4 h-full">
                      <div
                        className={`
                          text-lg font-bold flex-shrink-0 w-12 text-center
                          ${
                            item.isYourBusiness
                              ? 'text-teal-600'
                              : 'text-gray-400'
                          }
                        `}
                      >
                        {item.position}
                      </div>

                      <div className="flex-1">
                        <div
                          className={`
                            font-semibold
                            ${
                              item.isYourBusiness
                                ? 'text-gray-900 text-lg'
                                : 'text-gray-700'
                            }
                          `}
                        >
                          {item.isYourBusiness ? (
                            <span className="flex items-center gap-2">
                              <span className="uppercase tracking-wide">
                                DIG - DIT FIRMA
                              </span>
                              <span className="text-teal-600">↑</span>
                            </span>
                          ) : (
                            `Andet firma ${item.position}`
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.isYourBusiness
                            ? 'Din virksomhed stiger i søgeresultaterne'
                            : 'Konkurrent virksomhed'}
                        </div>
                      </div>

                      {item.isYourBusiness && (
                        <div className="flex-shrink-0">
                          <div className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            Klatrer
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {!shouldShowYourBusinessInList && (
                  <div
                    className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50 border-l-4 border-l-teal-500 shadow-md transition-all duration-500"
                    style={{
                      height: `${LISTING_HEIGHT}px`,
                      transform: 'scale(1.02)',
                    }}
                  >
                    <div className="flex items-center gap-4 h-full">
                      <div className="text-lg font-bold flex-shrink-0 w-12 text-center text-teal-600">
                        {yourPosition}
                      </div>

                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-lg">
                          <span className="flex items-center gap-2">
                            <span className="uppercase tracking-wide">
                              DIG - DIT FIRMA
                            </span>
                            <span className="text-teal-600">↑</span>
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Din virksomhed stiger i søgeresultaterne
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                          Klatrer
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ height: '200px' }} />
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  <strong className="text-gray-900">Scroll ned</strong> for at se dit firma klatre til tops
                </p>
                <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold">
                  <span>Fra position {STARTING_POSITION}</span>
                  <span>→</span>
                  <span>Til #1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 leading-relaxed">
              Med vores SEO-optimering og lokale markedsføringsstrategier hjælper vi dit firma med at blive den
              <strong className="text-teal-600"> førstevalg</strong> når potentielle kunder søger efter dine ydelser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankSearchSection;
