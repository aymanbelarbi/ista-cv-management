import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, LayoutDashboard, Users, Plus, Menu } from "lucide-react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/tableau-de-bord", label: "Tableau de Bord", icon: LayoutDashboard },
    { path: "/stagiaires", label: "Stagiaires", icon: Users },
    { path: "/stagiaires/nouveau", label: "Créer un CV", icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-16" />
              <div>
                <h1 className="font-bold text-lg">Gestion des CV - ISTA Khemisset</h1>
                <p className="text-xs text-muted-foreground">
                  OFPPT - Administration
                </p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 p-4 border-b">
                            <img src="/logo.png" alt="Logo" className="h-12" />
                            <div>
                                <h1 className="font-bold text-md">Gestion des CV</h1>
                                <p className="text-xs text-muted-foreground">ISTA Khemisset</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-4 p-4">
                            {navItems.map((item) => (
                                <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left ${
                                    location.pathname === item.path
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                                >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                        <div className="mt-auto p-4 border-t">
                            <Button variant="outline" onClick={handleLogout} className="w-full">
                                <LogOut className="h-4 w-4 mr-2" />
                                Déconnexion
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
