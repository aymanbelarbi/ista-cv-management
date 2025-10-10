import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { NIVEAUX_LANGUE } from "@/types";

const CompetencesStep = ({ formData, updateFormData }) => {
  const [newTechSkill, setNewTechSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newLangue, setNewLangue] = useState({ langue: "", niveau: "" });

  const addTechSkill = () => {
    if (newTechSkill.trim()) {
      updateFormData("competencesTechniques", [
        ...(formData.competencesTechniques || []),
        newTechSkill.trim(),
      ]);
      setNewTechSkill("");
    }
  };

  const removeTechSkill = (skill) => {
    updateFormData(
      "competencesTechniques",
      formData.competencesTechniques.filter((s) => s !== skill)
    );
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      updateFormData("softSkills", [
        ...(formData.softSkills || []),
        newSoftSkill.trim(),
      ]);
      setNewSoftSkill("");
    }
  };

  const removeSoftSkill = (skill) => {
    updateFormData(
      "softSkills",
      formData.softSkills.filter((s) => s !== skill)
    );
  };

  const addLangue = () => {
    if (newLangue.langue && newLangue.niveau) {
      updateFormData("langues", [...(formData.langues || []), newLangue]);
      setNewLangue({ langue: "", niveau: "" });
    }
  };

  const removeLangue = (index) => {
    updateFormData(
      "langues",
      formData.langues.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Compétences Techniques</Label>
        <div className="flex gap-2">
          <Input
            value={newTechSkill}
            onChange={(e) => setNewTechSkill(e.target.value)}
            placeholder="Ex: HTML/CSS, AutoCAD, C#..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTechSkill())
            }
          />
          <Button type="button" onClick={addTechSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.competencesTechniques?.map((skill) => (
            <Badge key={skill} variant="secondary" className="pl-3 pr-1">
              {skill}
              <button
                onClick={() => removeTechSkill(skill)}
                className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Soft Skills</Label>
        <div className="flex gap-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Ex: Travail d'équipe, Communication..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSoftSkill())
            }
          />
          <Button type="button" onClick={addSoftSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.softSkills?.map((skill) => (
            <Badge key={skill} variant="secondary" className="pl-3 pr-1">
              {skill}
              <button
                onClick={() => removeSoftSkill(skill)}
                className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Langues</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={newLangue.langue}
            onChange={(e) =>
              setNewLangue({ ...newLangue, langue: e.target.value })
            }
            placeholder="Ex: Français, Anglais..."
          />
          <div className="flex gap-2">
            <Select
              value={newLangue.niveau}
              onValueChange={(value) =>
                setNewLangue({ ...newLangue, niveau: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                {NIVEAUX_LANGUE.map((niveau) => (
                  <SelectItem key={niveau} value={niveau}>
                    {niveau}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" onClick={addLangue}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {formData.langues?.map((langue, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <span>
                <strong>{langue.langue}</strong>: {langue.niveau}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLangue(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetencesStep;
