const BASE_URL = 'https://www.7timer.info/bin/civil.php?';

export function getWeather(lon: number, lat: number, tzshift: number) {
  return fetch(
    `${BASE_URL}lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=${tzshift}`
  );
}
