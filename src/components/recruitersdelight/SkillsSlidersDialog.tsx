"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { SkillSliderType, SkillsSlidersType } from "./skillsSliders.types";

interface SkillsDialogProps {
  isOpen: boolean;
  onOpenChange: (x: boolean) => void;
  skillsInfo: SkillsSlidersType;
  saveSkillsInfo: (x: SkillsSlidersType) => void;
}

export const SkillsSlidersDialog: React.FC<SkillsDialogProps> = ({
  isOpen,
  onOpenChange,
  skillsInfo,
  saveSkillsInfo,
}) => {
  const [displayName, setDisplayName] = useState<string>(
    skillsInfo.displayName
  );
  const [skills, setSkills] = useState<SkillSliderType[]>(skillsInfo.skills);
  const [newSkill, setNewSkill] = useState<SkillSliderType>({
    name: "",
    rating: 8.5,
  });

  useEffect(() => {
    setSkills(skillsInfo.skills);
  }, [skillsInfo.skills]);

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.rating > 0) {
      setSkills((prev) => [...prev, newSkill]);
      setNewSkill({ name: "", rating: 8.5 });
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSave = async () => {
    try {
      await saveSkillsInfo({
        displayName,
        skills,
      });
      onOpenChange(false);
      setSkills([]);
    } catch (error) {
      console.error("Failed to save skills:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle className="text-center mt-5">Skills Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="skill" className="text-right">
            Category Name
          </Label>
          <Input
            id="skill"
            value={displayName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayName(e.target.value)
            }
            className="col-span-3"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center mt-5">Add New Skill</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skill" className="text-right">
              Skill
            </Label>
            <Input
              id="skill"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={newSkill.rating}
              onChange={(e) =>
                setNewSkill({
                  ...newSkill,
                  rating: parseFloat(parseFloat(e.target.value).toFixed(1)),
                })
              }
              className="col-span-3"
            />
          </div>
          <Button onClick={handleAddSkill} className="ml-auto">
            Add
          </Button>
        </div>
        <div className="space-y-2 max-h-48 overflow-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-secondary p-2 rounded-md"
            >
              <span>
                {skill.name} - {skill.rating}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSkill(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="mt-4 w-full">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};
