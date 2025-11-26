import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search } from 'lucide-react';

const RankSearchSection = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryIndex, setQueryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const queries = [
    'Bedste frisør i København',
    'Massage i Herlev',
    'Fix min bil i Odense',
    'Rengøring i Aalborg',
    'Elektriker i Roskilde',
    'Tandlæge i Frederiksberg'
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const TOTAL_BUSINESSES = 30;
  const YOUR_STARTING_POSITION = 26;

  const currentRank = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [YOUR_STARTING_POSITION, 1]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [0, -(YOUR_STARTING_POSITION - 1) * 70]
  );

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
  }, [currentQuery, isDeleting, queryIndex, queries]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-to-b from-gray-50 to-white py-20"
    >
      <div className="sticky top-20 px-6 md:px-12 lg:px-20">
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

            <div className="relative h-[500px] overflow-hidden">
              <motion.div style={{ y: translateY }} className="py-4">
                {Array.from({ length: TOTAL_BUSINESSES }).map((_, index) => {
                  const position = index + 1;
                  const isYourBusiness = position === YOUR_STARTING_POSITION;

                  return (
                    <motion.div
                      key={position}
                      className={`
                        px-6 py-4 border-b border-gray-100 transition-all duration-300
                        ${
                          isYourBusiness
                            ? 'bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50 border-l-4 border-l-teal-500 shadow-md'
                            : 'bg-white hover:bg-gray-50'
                        }
                      `}
                      style={{
                        height: '70px'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`
                            text-lg font-bold flex-shrink-0 w-12 text-center
                            ${
                              isYourBusiness
                                ? 'text-teal-600'
                                : 'text-gray-400'
                            }
                          `}
                        >
                          {isYourBusiness ? (
                            <motion.span>
                              {Math.round(currentRank.get())}
                            </motion.span>
                          ) : (
                            position
                          )}
                        </motion.div>

                        <div className="flex-1">
                          <div
                            className={`
                              font-semibold
                              ${
                                isYourBusiness
                                  ? 'text-gray-900 text-lg'
                                  : 'text-gray-700'
                              }
                            `}
                          >
                            {isYourBusiness ? (
                              <span className="flex items-center gap-2">
                                <span className="uppercase tracking-wide">
                                  DIG / DIT FIRMA
                                </span>
                                <span className="text-teal-600">→</span>
                              </span>
                            ) : (
                              `Andet firma ${position}`
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {isYourBusiness
                              ? 'Din virksomhed stiger i søgeresultaterne'
                              : 'Konkurrent virksomhed'}
                          </div>
                        </div>

                        {isYourBusiness && (
                          <div className="flex-shrink-0">
                            <div className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                              Klatrer
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  <strong className="text-gray-900">Scroll ned</strong> for at se dit firma klatre til tops
                </p>
                <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold">
                  <span>Fra position {YOUR_STARTING_POSITION}</span>
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
