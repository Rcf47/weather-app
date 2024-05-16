"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/icons";
import { kelvinToCelcious } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { useState, useEffect } from "react";

function Temperature() {
  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { forecast } = useGlobalContext();
  const { main, timezone, name, weather } = forecast;

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formattedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");
      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);
    // Clear interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, [timezone]);

  if (!forecast || !weather) {
    return <Skeleton className="h-[25rem] w-full " />;
  }
  const temp = kelvinToCelcious(main?.temp);
  const minTemp = kelvinToCelcious(main?.temp_min);
  const maxTemp = kelvinToCelcious(main?.temp_max);

  const { main: weatherMain, description } = weather[0];

  // Live time update
  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain" || "Thunderstorm":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2  font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
