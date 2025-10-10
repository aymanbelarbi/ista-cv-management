import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILIERES_ISTA } from "@/types";

const FormationStep = ({ formData, updateFormData }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="filiere">Filière ISTA *</Label>
        <Select
          value={formData.filiere || ""}
          onValueChange={(value) => updateFormData("filiere", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une filière" />
          </SelectTrigger>
          <SelectContent>
            {FILIERES_ISTA.map((filiere) => (
              <SelectItem key={filiere} value={filiere}>
                {filiere}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="anneePromotion">Année de Promotion *</Label>
        <Select
          value={formData.anneePromotion || ""}
          onValueChange={(value) => updateFormData("anneePromotion", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez l'année" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="diplomeBac">Diplôme du Baccalauréat</Label>
        <Input
          id="diplomeBac"
          value={formData.diplomeBac || ""}
          onChange={(e) => updateFormData("diplomeBac", e.target.value)}
          placeholder="Ex: Baccalauréat Sciences Mathématiques"
        />
      </div>
    </div>
  );
};

export default FormationStep;
