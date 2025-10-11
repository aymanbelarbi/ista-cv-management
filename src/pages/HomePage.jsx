import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
      <div className="flex flex-col items-center gap-6">
        <img src="/logo.png" alt="Logo" className="h-24" />
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Gestion des CV - ISTA Khemisset
          </h1>
          <p className="text-lg text-muted-foreground">
            Bienvenue sur l'application de gestion des CV
          </p>
        </div>
        <Button size="lg" onClick={() => navigate('/login')}>
          Commencer
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
