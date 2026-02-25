import { useWeather } from '../../hooks/useWeather';
import { SnowAnimation } from './SnowAnimation';
import { RainAnimation } from './RainAnimation';
import { SunnyAnimation } from './SunnyAnimation';
import { CloudyAnimation } from './CloudyAnimation';

export function WeatherOverlay() {
  const { weather } = useWeather();

  if (weather === 'Normal') {
    return null;
  }

  return (
    <>
      {weather === 'Snow' && <SnowAnimation />}
      {weather === 'Rain' && <RainAnimation />}
      {weather === 'Sunny' && <SunnyAnimation />}
    </>
  );
}
