import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const ExperienceStep = ({ formData, updateFormData }) => {
  const [newExp, setNewExp] = useState({
    entreprise: "",
    poste: "",
    dateDebut: "",
    dateFin: "",
    missions: ["", "", ""],
  });

  const addExperience = () => {
    if (newExp.entreprise && newExp.poste) {
      const exp = {
        id: Date.now().toString(),
        entreprise: newExp.entreprise,
        poste: newExp.poste,
        dateDebut: newExp.dateDebut || "",
        dateFin: newExp.dateFin || "",
        missions: newExp.missions?.filter((m) => m.trim() !== "") || [],
      };
      updateFormData("experiences", [...(formData.experiences || []), exp]);
      setNewExp({
        entreprise: "",
        poste: "",
        dateDebut: "",
        dateFin: "",
        missions: ["", "", ""],
      });
    }
  };

  const removeExperience = (id) => {
    updateFormData(
      "experiences",
      formData.experiences.filter((e) => e.id !== id)
    );
  };

  const updateMission = (index, value) => {
    const missions = [...(newExp.missions || [])];
    missions[index] = value;
    setNewExp({ ...newExp, missions });
  };

  return (
    <div className="space-y-4">
      {formData.experiences?.map((exp) => (
        <Card key={exp.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">
              {exp.poste} - {exp.entreprise}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              {exp.dateDebut} - {exp.dateFin}
            </p>
            <ul className="list-disc list-inside mt-2">
              {exp.missions.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ajouter une Expérience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entreprise">Entreprise</Label>
              <Input
                id="entreprise"
                value={newExp.entreprise || ""}
                onChange={(e) =>
                  setNewExp({ ...newExp, entreprise: e.target.value })
                }
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="poste">Poste</Label>
              <Input
                id="poste"
                value={newExp.poste || ""}
                onChange={(e) =>
                  setNewExp({ ...newExp, poste: e.target.value })
                }
                placeholder="Intitulé du poste"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateDebut">Date de début</Label>
              <Input
                id="dateDebut"
                type="month"
                value={newExp.dateDebut || ""}
                onChange={(e) =>
                  setNewExp({ ...newExp, dateDebut: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFin">Date de fin</Label>
              <Input
                id="dateFin"
                type="month"
                value={newExp.dateFin || ""}
                onChange={(e) =>
                  setNewExp({ ...newExp, dateFin: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Missions principales (3 maximum)</Label>
            {[0, 1, 2].map((i) => (
              <Textarea
                key={i}
                value={newExp.missions?.[i] || ""}
                onChange={(e) => updateMission(i, e.target.value)}
                placeholder={`Mission ${i + 1}`}
                rows={2}
              />
            ))}
          </div>

          <Button onClick={addExperience} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter l'expérience
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceStep;
