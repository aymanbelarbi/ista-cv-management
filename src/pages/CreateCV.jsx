import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import ProfileStep from "@/components/cv-form/ProfileStep";
import FormationStep from "@/components/cv-form/FormationStep";
import ExperienceStep from "@/components/cv-form/ExperienceStep";
import CompetencesStep from "@/components/cv-form/CompetencesStep";
import CVPreview from "@/components/cv-preview/CVPreview";

const CreateCV = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addStagiaire, updateStagiaire, getStagiaire } = useApp();
  const isEdit = !!id;
  const existingStagiaire = isEdit ? getStagiaire(id) : null;

  const [currentTab, setCurrentTab] = useState("profile");
  const [formData, setFormData] = useState(
    existingStagiaire || {
      matricule: "",
      nom: "",
      prenom: "",
      dateNaissance: "",
      telephone: "",
      email: "",
      adresse: "",
      photo: "",
      filiere: "",
      anneePromotion: "",
      diplomeBac: "",
      experiences: [],
      competencesTechniques: [],
      softSkills: [],
      langues: [],
    }
  );

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Validation
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.filiere
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const stagiaire = {
      id: isEdit ? id : Date.now().toString(),
      matricule: formData.matricule || "",
      nom: formData.nom,
      prenom: formData.prenom,
      dateNaissance: formData.dateNaissance || "",
      telephone: formData.telephone || "",
      email: formData.email,
      adresse: formData.adresse || "",
      photo: formData.photo,
      filiere: formData.filiere,
      anneePromotion: formData.anneePromotion || "",
      diplomeBac: formData.diplomeBac || "",
      experiences: formData.experiences || [],
      competencesTechniques: formData.competencesTechniques || [],
      softSkills: formData.softSkills || [],
      langues: formData.langues || [],
      createdAt: existingStagiaire?.createdAt || new Date().toISOString(),
    };

    if (isEdit) {
      updateStagiaire(id, stagiaire);
      toast({
        title: "CV mis à jour",
        description: "Le CV a été modifié avec succès",
      });
    } else {
      addStagiaire(stagiaire);
      toast({
        title: "CV créé",
        description: "Le CV a été créé avec succès",
      });
    }

    navigate("/students");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Modifier" : "Créer"} un CV
        </h1>
        <p className="text-muted-foreground mt-1">
          Remplissez le formulaire pour {isEdit ? "modifier" : "créer"} un CV
          professionnel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Informations du Stagiaire</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="formation">Formation</TabsTrigger>
                <TabsTrigger value="experience">Expérience</TabsTrigger>
                <TabsTrigger value="competences">Compétences</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <ProfileStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
                <div className="flex justify-end">
                  <Button onClick={() => setCurrentTab("formation")}>
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="formation" className="space-y-4 mt-6">
                <FormationStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab("profile")}
                  >
                    Précédent
                  </Button>
                  <Button onClick={() => setCurrentTab("experience")}>
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4 mt-6">
                <ExperienceStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab("formation")}
                  >
                    Précédent
                  </Button>
                  <Button onClick={() => setCurrentTab("competences")}>
                    Suivant
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="competences" className="space-y-4 mt-6">
                <CompetencesStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab("experience")}
                  >
                    Précédent
                  </Button>
                  <Button onClick={handleSubmit}>
                    {isEdit ? "Mettre à jour" : "Créer le CV"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="sticky top-6">
          <CVPreview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateCV;
