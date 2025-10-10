import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProfileStep = ({ formData, updateFormData }) => {
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="matricule">Matricule *</Label>
          <Input
            id="matricule"
            value={formData.matricule || ""}
            onChange={(e) => updateFormData("matricule", e.target.value)}
            placeholder="Ex: TSM2024001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo">Photo de profil</Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom *</Label>
          <Input
            id="nom"
            value={formData.nom || ""}
            onChange={(e) => updateFormData("nom", e.target.value)}
            placeholder="Nom de famille"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            value={formData.prenom || ""}
            onChange={(e) => updateFormData("prenom", e.target.value)}
            placeholder="Prénom"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateNaissance">Date de naissance</Label>
        <Input
          id="dateNaissance"
          type="date"
          value={formData.dateNaissance || ""}
          onChange={(e) => updateFormData("dateNaissance", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            value={formData.telephone || ""}
            onChange={(e) => updateFormData("telephone", e.target.value)}
            placeholder="06XXXXXXXX"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="email@exemple.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse</Label>
        <Textarea
          id="adresse"
          value={formData.adresse || ""}
          onChange={(e) => updateFormData("adresse", e.target.value)}
          placeholder="Adresse complète"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ProfileStep;
