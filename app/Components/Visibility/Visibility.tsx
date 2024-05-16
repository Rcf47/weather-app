"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { eye } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";

function Visibility() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full " />;
  }
  const { visibility } = forecast;
  const visibilityInKm = Math.round(visibility / 1000);
  const getVisibilityText = (visibilityInKm: number) => {
    if (visibilityInKm > 9) {
      return "Excellent: Clear and vast view.";
    }
    if (visibilityInKm > 5) {
      return "Good: Easily to navigate.";
    }
    if (visibilityInKm > 2) {
      return "Moderate: Some limitations.";
    }
    if (visibilityInKm <= 2) {
      return "Poor: Restricted and unclear.";
    }
    return "Unavailable, Visibility data not available.";
  };
  const getVisibilityDescription = getVisibilityText(visibilityInKm);
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">{visibilityInKm} km</p>
      </div>
      <p className="text-sm">{getVisibilityDescription}</p>
    </div>
  );
}

export default Visibility;
