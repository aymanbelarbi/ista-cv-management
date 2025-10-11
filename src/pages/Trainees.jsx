import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, Edit, Eye } from "lucide-react";
import { FILIERES_ISTA } from "@/types";
import { toast } from "@/hooks/use-toast";
import usePageTitle from "@/hooks/usePageTitle";

const Trainees = () => {
  usePageTitle("Liste des Stagiaires");
  const { stagiaires, deleteStagiaire } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filiereFilter, setFiliereFilter] = useState("all");
  const [anneeFilter, setAnneeFilter] = useState("all");

  const filtered = stagiaires.filter((s) => {
    const matchesSearch =
      s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.matricule.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFiliere =
      filiereFilter === "all" || s.filiere === filiereFilter;
    const matchesAnnee =
      anneeFilter === "all" || s.anneePromotion === anneeFilter;

    return matchesSearch && matchesFiliere && matchesAnnee;
  });

  const handleDelete = (id, nom) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le stagiaire ${nom} ?`)) {
      deleteStagiaire(id);
      toast({
        title: "Stagiaire supprimé",
        description: "Le stagiaire a été supprimé avec succès",
      });
    }
  };


  const annees = Array.from(new Set(stagiaires.map((s) => s.anneePromotion)))
    .sort()
    .reverse();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Stagiaires</h1>
          <p className="text-muted-foreground mt-1">
            Liste complète des stagiaires et leurs CV
          </p>
        </div>
        <Button onClick={() => navigate("/stagiaires/nouveau")} size="lg">
          + Nouveau Stagiaire
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2 lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, prénom ou matricule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filiereFilter} onValueChange={setFiliereFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les filières" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les filières</SelectItem>
                {FILIERES_ISTA.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={anneeFilter} onValueChange={setAnneeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les années" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les années</SelectItem>
                {annees.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">Aucun stagiaire trouvé</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((stagiaire) => (
            <Card key={stagiaire.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {stagiaire.photo ? (
                      <img
                        src={stagiaire.photo}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-primary">
                        {stagiaire.prenom[0]}
                        {stagiaire.nom[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {stagiaire.prenom} {stagiaire.nom}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stagiaire.filiere} • Promotion {stagiaire.anneePromotion} • Matricule: {stagiaire.matricule}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/stagiaires/cv/${stagiaire.id}`)}
                    title="Aperçu du CV"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/stagiaires/modifier/${stagiaire.id}`)}
                    title="Modifier"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleDelete(
                        stagiaire.id,
                        `${stagiaire.prenom} ${stagiaire.nom}`
                      )
                    }
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Trainees;
