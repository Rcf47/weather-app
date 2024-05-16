import moment from "moment";

export const kelvinToCelcious = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};
export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};
export const formatNumber = (number: number) => {
  return number >= 1000000
    ? (number / 1000000).toFixed(1) + "M"
    : number >= 1000
      ? (number / 1000).toFixed(1) + "K"
      : number;
};
export const airQualityText = [
  {
    rating: 10,
    description: "very good",
  },
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];
