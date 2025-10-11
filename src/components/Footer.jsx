const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto print:hidden">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gestion des CV - ISTA Khemisset. Tous droits réservés.
        </p>
        <p className="text-center text-xs text-muted-foreground/80 mt-1">
          Développé par Ayman Belarbi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
