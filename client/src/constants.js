export const URL_GEOCODE =
  "https://geocode-maps.yandex.ru/1.x/?apikey=2fcf50c3-38d1-4cda-a5a9-da7983b01137&format=json&geocode=";
export const URL_SERVER = "http://localhost:8081";

export const INPUT_DATA = [
  {
    lable: "town",
    text: "Название населенного пункта",
  },
  {
    lable: "population",
    text: "Население",
  },
  {
    lable: "waterFlow",
    text: "Расход воды",
  },
  {
    lable: "hours",
    text: "Количество часов обеспечения водой в сутки (рекомендуется 20):",
  },
  {
    lable: "min",
    text: "Количество минут на сброс воды из водопровода (рекомендуется 60):",
  },
  {
    text: "Выбор трубы",
  },
  {
    lable: "quotient",
    text: "Безразмерный коэффициент, численно равный сумме среднемесячных отрицательных температур за зиму в городе:",
  },
  {
    lable: "length",
    text: "Длина выбранной трубы:",
  },
];

export const MAX_DICTANCE = 0.4;

export const MIN_DICTANCE = 0.1;
