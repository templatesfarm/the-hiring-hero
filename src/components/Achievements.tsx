"use client";

import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { IconAward, IconCarambola, IconCertificate } from "@tabler/icons-react";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseProgressTimerProps {
  duration: number;
  interval?: number;
  onComplete?: () => void;
}

function useProgressTimer({
  duration,
  interval = 100,
  onComplete,
}: UseProgressTimerProps) {
  const [progress, setProgress] = useState(duration);
  const timerRef = useRef(0);
  const timerState = useRef({
    startTime: 0,
    remaining: duration,
    isPaused: false,
  });

  const cleanup = useCallback(() => {
    window.clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setProgress(duration);
    timerState.current = {
      startTime: 0,
      remaining: duration,
      isPaused: false,
    };
  }, [duration, cleanup]);

  const start = useCallback(() => {
    const state = timerState.current;
    state.startTime = Date.now();
    state.isPaused = false;

    timerRef.current = window.setInterval(() => {
      const elapsedTime = Date.now() - state.startTime;
      const remaining = Math.max(0, state.remaining - elapsedTime);

      setProgress(remaining);

      if (remaining <= 0) {
        cleanup();
        onComplete?.();
      }
    }, interval);
  }, [interval, cleanup, onComplete]);

  const pause = useCallback(() => {
    const state = timerState.current;
    if (!state.isPaused) {
      cleanup();
      state.remaining = Math.max(
        0,
        state.remaining - (Date.now() - state.startTime)
      );
      state.isPaused = true;
    }
  }, [cleanup]);

  const resume = useCallback(() => {
    const state = timerState.current;
    if (state.isPaused && state.remaining > 0) {
      start();
    }
  }, [start]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    progress,
    start,
    pause,
    resume,
    reset,
  };
}

export default function Achievements() {
  const [open, setOpen] = useState(false);
  const toastDuration = 5000;
  const { progress, start, pause, resume, reset } = useProgressTimer({
    duration: toastDuration,
    onComplete: () => setOpen(false),
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen) {
        reset();
        start();
      }
    },
    [reset, start]
  );

  useEffect(() => {
    const Interval = setInterval(() => {
      handleOpenChange(true);
    }, 8000);
    return () => {
      clearInterval(Interval);
    };
  }, [handleOpenChange]);

  return (
    <ToastProvider swipeDirection="left">
      <Toast
        open={open}
        onOpenChange={handleOpenChange}
        onPause={pause}
        onResume={resume}
      >
        <div className="flex w-full justify-between gap-3">
          <BadgeType type={""} />

          <div className="flex grow flex-col gap-3">
            <div className="space-y-1">
              <ToastTitle>Your request was completed!</ToastTitle>
              <ToastDescription>
                It demonstrates that the task or request has been processed.
              </ToastDescription>
            </div>
          </div>
          <ToastClose asChild>
            <Button
              variant="ghost"
              className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
              aria-label="Close notification"
            >
              <X
                size={16}
                strokeWidth={2}
                className="opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Button>
          </ToastClose>
        </div>
        <div className="contents" aria-hidden="true">
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-primary"
            style={{
              width: `${(progress / toastDuration) * 100}%`,
              transition: "width 100ms linear",
            }}
          />
        </div>
      </Toast>
      <ToastViewport className="sm:left-0 sm:right-auto" />
    </ToastProvider>
  );
}

const BadgeType = ({ type = "" }: { type: string }) => {
  if (type === "award") {
    return (
      <IconAward
        className="mt-0.5 shrink-0 text-foreground"
        size={28}
        strokeWidth={2}
        aria-hidden="true"
      />
    );
  } else if (type === "certification") {
    return (
      <IconCertificate
        className="mt-0.5 shrink-0 text-foreground"
        size={28}
        strokeWidth={2}
        aria-hidden="true"
      />
    );
  }
  return (
    <IconCarambola
      className="mt-0.5 shrink-0 text-foreground"
      size={28}
      strokeWidth={2}
      aria-hidden="true"
    />
  );
};
