import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, FileText, GraduationCap, TrendingUp } from "lucide-react";
import { FILIERES_ISTA } from "@/types";
import usePageTitle from "@/hooks/usePageTitle";

const Dashboard = () => {
  const { stagiaires } = useApp();
  const navigate = useNavigate();

  usePageTitle("Tableau de Bord");

  const totalStagiaires = stagiaires.length;
  const filiereStats = stagiaires.reduce((acc, s) => {
    acc[s.filiere] = (acc[s.filiere] || 0) + 1;
    return acc;
  }, {});

  const topFiliere = Object.entries(filiereStats).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const stats = [
    {
      title: "Total Stagiaires",
      value: totalStagiaires,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "CV Créés",
      value: totalStagiaires,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Top Filière",
      value: topFiliere?.[0] || "N/A",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de la gestion des CV
          </p>
        </div>
        <Button onClick={() => navigate("/stagiaires/nouveau")} size="lg">
          + Créer un CV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-xl md:text-2xl font-bold break-words">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Derniers Stagiaires Ajoutés</CardTitle>
        </CardHeader>
        <CardContent>
          {stagiaires.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucun stagiaire pour le moment
              </p>
              <Button onClick={() => navigate("/stagiaires/nouveau")} className="mt-4">
                Créer le premier CV
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {stagiaires
                .slice(-5)
                .reverse()
                .map((stagiaire) => (
                  <div
                    key={stagiaire.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
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
                      <div>
                        <p className="font-medium">
                          {stagiaire.prenom} {stagiaire.nom}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {stagiaire.filiere}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/stagiaires/cv/${stagiaire.id}`)}
                    >
                      Voir
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
