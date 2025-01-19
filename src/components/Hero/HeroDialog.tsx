import React, { useEffect, useState } from "react";
import { HeroType } from "./hero.types";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface HeroDialogProps {
  isOpen?: boolean;
  onOpenChange?: (x: boolean) => void;
  heroInfo: HeroType;
  saveHeroInfo: (x: HeroType) => void;
}

const HeroDialog: React.FC<HeroDialogProps> = ({
  isOpen,
  onOpenChange,
  heroInfo,
  saveHeroInfo,
}) => {
  const [localHeroInfo, setLocalHeroInfo] = useState<HeroType>(heroInfo);

  useEffect(() => {
    setLocalHeroInfo(heroInfo);
  }, [heroInfo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalHeroInfo((prev: HeroType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await saveHeroInfo(localHeroInfo);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange?.(false)}>
      <DialogOverlay />
      <DialogContent className="overflow-auto max-h-svh space-y-2">
        <DialogTitle>Edit Hero Information</DialogTitle>
        <DialogDescription>
          Update your hero information below.
        </DialogDescription>
        <div className="">
          <label className="block mb-1">Message</label>
          <input
            type="text"
            name="message"
            value={localHeroInfo.message}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Introduction</label>
          <textarea
            name="introduction"
            value={localHeroInfo.introduction}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={localHeroInfo.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeroDialog;
