"use client";
import React, { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { SkillsSlidersType } from "./skillsSliders.types";
import EditComponent from "../EditComponent";
import { SkillsSlidersView } from "./SkillsSlidersView";
import { SkillsSlidersDialog } from "./SkillsSlidersDialog";

export const Skills = () => {
  const { portfolio, saveSkillsInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  return (
    <SkillsSliders
      saveSkillsInfo={saveSkillsInfo}
      skillsInfo={portfolio.skillsInfo}
      isEditing={isEditing}
      isLoading={isLoading}
    />
  );
};

export interface SkillsSlidersProp {
  isEditing: boolean;
  skillsInfo: SkillsSlidersType;
  isLoading: boolean;
  saveSkillsInfo: (x: SkillsSlidersType) => void;
}

const SkillsSliders: React.FC<SkillsSlidersProp> = ({
  isEditing,
  skillsInfo,
  saveSkillsInfo,
  isLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponent
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
    >
      <SkillsSlidersView skillsInfo={skillsInfo} isLoading={isLoading} />
      <SkillsSlidersDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        skillsInfo={skillsInfo}
        saveSkillsInfo={saveSkillsInfo}
      />
    </EditComponent>
  );
};
