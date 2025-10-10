import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, FileText, GraduationCap, TrendingUp } from "lucide-react";
import { FILIERES_ISTA } from "@/types";

const Dashboard = () => {
  const { stagiaires } = useApp();
  const navigate = useNavigate();

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
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "CV Créés",
      value: totalStagiaires,
      icon: FileText,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Filières",
      value: FILIERES_ISTA.length,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Top Filière",
      value: topFiliere?.[0]?.substring(0, 15) || "N/A",
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
        <Button onClick={() => navigate("/create-cv")} size="lg">
          + Créer un CV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
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
              <Button onClick={() => navigate("/create-cv")} className="mt-4">
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
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">
                          {stagiaire.prenom[0]}
                          {stagiaire.nom[0]}
                        </span>
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
                      onClick={() => navigate(`/students`)}
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
