"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export function TextGenerateEffectDemo({ words }: { words: string }) {
  return (
    <TextGenerateEffect words={words} className="w-[80%] md:w-[60%] mx-auto" />
  );
}
