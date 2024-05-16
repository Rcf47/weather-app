"use client";
import { useGlobalContextUpdate } from "@/app/context/globalContext";
import defaultState from "@/app/utils/defaultState";

function DefaultCity() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedByCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="states flex flex-col gap-3 flex-1">
      <h2 className="flex items-center gap-2 font-medium">Top Cities</h2>
      <div className="flex flex-col gap-4">
        {defaultState.map((state, index) => {
          return (
            <div
              key={index}
              className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
              onClick={() => {
                getClickedByCoords(state.lat, state.lon);
              }}
            >
              <p className="px-6 py-4">{state.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DefaultCity;
