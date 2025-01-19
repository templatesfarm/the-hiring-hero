"use client";
import React, { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { HeroType } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import EditComponent from "../EditComponent";
import { HeroBeamPathView } from "./HeroBeamView";
import HeroDialog from "../Hero/HeroDialog";
import { BackgroundLinesDemo } from "./BackgroundColorsfulLines";

export const Hero = () => {
  const { portfolio, saveHeroInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  return (
    <HeroBeam
      isEditing={isEditing}
      heroInfo={portfolio.heroInfo}
      saveHeroInfo={saveHeroInfo}
      isLoading={isLoading}
    />
  );
};

export interface HeroBeamProps {
  isEditing: boolean;
  heroInfo: HeroType;
  saveHeroInfo: (x: HeroType) => void;
  isLoading: boolean;
}

export const HeroBeam: React.FC<HeroBeamProps> = ({
  isEditing,
  heroInfo,
  saveHeroInfo,
  isLoading,
}) => {
  console.log("🚀 ~ heroInfo:", heroInfo);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponent
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
    >
      <BackgroundLinesDemo heroInfo={heroInfo} isLoading={isLoading} />
      <HeroDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        saveHeroInfo={saveHeroInfo}
        heroInfo={heroInfo}
      />
    </EditComponent>
  );
};
