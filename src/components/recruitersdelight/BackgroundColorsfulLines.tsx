import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HeroType } from "../Hero/hero.types";
import { Skeleton } from "../ui/skeleton";

export function BackgroundLinesDemo({
  heroInfo,
  isLoading = true,
}: {
  heroInfo: HeroType;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-5 w-[80%] mx-auto h-screen">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-5 relative z-20 font-bold tracking-tight">
            {heroInfo.message}
          </h2>
          <p className="text-lg md:text-2xl lg:text-4xl mb-5">
            {heroInfo.introduction}
          </p>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            {heroInfo.description}
          </p>
        </BackgroundLines>
      )}
    </>
  );
}
