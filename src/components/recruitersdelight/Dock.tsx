import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconFileCv,
  IconHome,
} from "@tabler/icons-react";
import { useDownload } from "@/app/hooks/useDownload";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import EditComponent from "../EditComponent";
import PersonalInfoDialog from "./PersonalInfoDialog";
import { PersonalInfoType, SocialMediaType } from "./personalInfo.types";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";

export const Dock = () => {
  const {
    portfolio: { personalInfo },
    savePersonalInfo,
    isLoading,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <FloatingDockEditable
      isEditing={isEditing}
      personalInfo={personalInfo}
      savePersonalInfo={savePersonalInfo}
      setTheme={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      theme={theme}
      isLoading={isLoading}
    />
  );
};

export interface FloatingDockEditProps {
  isEditing: boolean;
  personalInfo: PersonalInfoType;
  savePersonalInfo: (x: PersonalInfoType) => void;
  setTheme: () => void;
  theme?: string;
  isLoading: boolean;
}

export const FloatingDockEditable: React.FC<FloatingDockEditProps> = ({
  isEditing,
  personalInfo,
  savePersonalInfo,
  setTheme,
  theme,
  isLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponent
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
      className="absolute top-0 w-full mx-auto h-24"
    >
      <FloatingDockDemo
        socialMediaLinks={personalInfo.socialMedia}
        resumeName={personalInfo.resumeName}
        setTheme={setTheme}
        theme={theme}
        isLoading={isLoading}
        className="bg-slate-100 dark:bg-neutral-900"
      />
      <PersonalInfoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        personalInfo={personalInfo}
        savePersonalInfo={savePersonalInfo}
      />
    </EditComponent>
  );
};

export function FloatingDockDemo({
  socialMediaLinks,
  resumeName = "",
  className,
  setTheme,
  theme,
  isLoading,
}: {
  socialMediaLinks: SocialMediaType;
  resumeName?: string;
  className?: string;
  setTheme: () => void;
  theme?: string;
  isLoading: boolean;
}) {
  const { handleDownload } = useDownload();
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Download CV",
      icon: (
        <IconFileCv className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      onClick: () => handleDownload(resumeName),
    },
    {
      title: "Youtube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.youtube,
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.linkedIn,
    },

    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.xdotcom,
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.github,
    },
  ];
  return (
    <div className={cn("flex justify-evenly flex-row px-5 max-w-7xl mx-auto")}>
      <div className="flex items-center justify-center w-full fixed top-8 z-40">
        {isLoading ? (
          <div className="mx-auto flex gap-2 h-16 md:gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3">
            {/* <div className="w-[350px] flex flex-row gap-4 justify-start items-center"> */}
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            {/* </div> */}
          </div>
        ) : (
          <FloatingDock
            items={links}
            setTheme={setTheme}
            theme={theme}
            className={className}
          />
        )}
      </div>
    </div>
  );
}
