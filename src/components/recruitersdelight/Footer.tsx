import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Skeleton } from "../ui/skeleton";
import { ScratchToReveal } from "../ui/scratch-to-reveal";
import { useEffect, useState } from "react";

export default function Footer() {
  const { portfolio, isLoading } = usePortfolioStore();
  const { personalInfo } = portfolio || {};

  const [dimensions, setDimensions] = useState({ width: 300, height: 60 });

  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const width = Math.max(Math.min(screenWidth * 0.75, 600), 200); // Width between 300px and 600px
      const height = width / 5; // Keep the aspect ratio (120 / 600 = 1 / 5)
      setDimensions({ width, height });
    };

    updateDimensions(); // Initial dimensions
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto w-[90%] sm:w-[70%] md:w-[50%] space-y-4">
        <Skeleton className="w-full h-16 sm:h-20" />
        <Skeleton className="w-full h-16 sm:h-20" />
      </div>
    );
  }

  return (
    <ScratchToReveal
      width={dimensions.width} // Dynamic width
      height={dimensions.height} // Dynamic height
      minScratchPercentage={35}
      text="Scratch to Contact Me"
      textStyle={{ fontSize: "3vw" }}
      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 mx-auto p-4 sm:p-6"
      gradientColors={["#9a3412", "#ea580c", "#fb923c"]}
    >
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        {/* Content to be revealed */}
        <p className="text-base sm:text-lg md:text-xl font-bold dark:text-gray-300 text-gray-800">
          {personalInfo?.email || "Email not available"}
        </p>
        <p className="text-sm sm:text-md md:text-lg font-semibold dark:text-gray-300 text-gray-900">
          {personalInfo?.contactNumber || "Phone number not available"}
        </p>
      </div>
    </ScratchToReveal>
  );
}
