import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import usePageTitle from "@/hooks/usePageTitle";

const Login = () => {
  usePageTitle("Connexion");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'application de gestion des CV ISTA",
      });
      navigate("/tableau-de-bord");
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[380px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Accès Administrateur</h1>
            <p className="text-muted-foreground">
              Veuillez entrer vos identifiants pour continuer
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@ista.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full !mt-6">
              Se connecter
            </Button>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Démo: admin@ista.ma / admin123
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-8">
        <div className="text-center text-primary-foreground max-w-md flex flex-col items-center">
          <img src="/logo.png" alt="Logo" className="h-24 mx-auto mb-6" />
          <h2 className="text-4xl font-bold tracking-tight  whitespace-nowrap">Gestion des CV - ISTA Khemisset</h2>
          <p className="text-lg mt-4 text-primary-foreground/80">Une plateforme centralisée pour la gestion des parcours professionnels de nos lauréats</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
