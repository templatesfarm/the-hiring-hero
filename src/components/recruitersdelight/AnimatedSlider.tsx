"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSliderProps {
  rating: number;
  label: string;
}

const MotionSlider = motion(Slider);

export default function AnimatedSliderWithScale({
  rating,
  label,
}: AnimatedSliderProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const max = 10;
  const skipInterval = 2; // Set to 1 to allow no text skipping
  const ticks = [...Array(max + 1)].map((_, i) => i);

  // Easing function for smooth animation
  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animationDuration = 1500; // 1.5 seconds
          const startTime = Date.now();

          const animateValue = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1); // Clamp between 0 and 1
            const easedProgress = easeInOutQuad(progress);
            setDisplayValue(Math.round(easedProgress * rating * 10));

            if (progress < 1) {
              requestAnimationFrame(animateValue);
            }
          };

          requestAnimationFrame(animateValue);
        }
      },
      { threshold: 1.0 } // Trigger when fully in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rating]);

  return (
    <div className="space-y-4" ref={ref}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={`slider-${label}`} className="leading-6">
          {label}
        </Label>
      </div>
      <MotionSlider
        id={`slider-${label}`}
        value={[displayValue]}
        min={0}
        max={100}
        step={1}
        aria-label={`${label} slider`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={displayValue}
        className="[&>:last-child>span]:rounded"
      />
      <span
        className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
        aria-hidden="true"
      >
        {ticks.map((_, i) => (
          <span
            key={i}
            className="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span
              className={cn(
                "h-1 w-px bg-muted-foreground/70",
                i % skipInterval !== 0 && "h-0.5"
              )}
            />
            <span className={cn(i % skipInterval !== 0 && "opacity-0")}>
              {i}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
