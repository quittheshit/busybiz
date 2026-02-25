import { useState, useEffect } from 'react';

export type WeatherType = 'Snow' | 'Rain' | 'Sunny' | 'Cloudy' | 'Normal';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherType>('Normal');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const webhookUrl = import.meta.env.VITE_WEATHER_WEBHOOK_URL;

        if (!webhookUrl) {
          throw new Error('Weather webhook URL not configured');
        }

        const response = await fetch(webhookUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch weather: ${response.statusText}`);
        }

        const data = await response.json();

        const weatherValue = data.weather || data.Weather || 'Normal';

        if (['Snow', 'Rain', 'Sunny', 'Cloudy', 'Normal'].includes(weatherValue)) {
          setWeather(weatherValue as WeatherType);
        } else {
          setWeather('Normal');
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setWeather('Normal');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 60000);

    return () => clearInterval(interval);
  }, []);

  return { weather, isLoading, error };
}
