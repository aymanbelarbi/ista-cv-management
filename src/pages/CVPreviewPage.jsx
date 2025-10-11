import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import CVPreview from '@/components/cv-preview/CVPreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import usePageTitle from '@/hooks/usePageTitle';

const CVPreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStagiaire } = useApp();
  const stagiaire = getStagiaire(id);

  usePageTitle(stagiaire ? `CV de ${stagiaire.prenom} ${stagiaire.nom}` : 'Aperçu du CV');

  const handlePrint = () => {
    window.print();
  };

  if (!stagiaire) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Stagiaire non trouvé</h1>
        <Button onClick={() => navigate('/stagiaires')} className="mt-4">Retour à la liste</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => navigate('/stagiaires')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </Button>
      </div>
      <div className="print-container">
        <CVPreview formData={stagiaire} />
      </div>
       <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CVPreviewPage;
