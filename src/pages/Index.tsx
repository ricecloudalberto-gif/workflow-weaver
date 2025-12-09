import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/pages/Dashboard";
import { Integrations } from "@/pages/Integrations";
import { Workflows } from "@/pages/Workflows";
import { Executions } from "@/pages/Executions";
import { Designer } from "@/pages/Designer";
import { Team } from "@/pages/Team";
import { Analytics } from "@/pages/Analytics";
import { Api } from "@/pages/Api";
import { Pricing } from "@/pages/Pricing";
import Settings from "@/pages/Settings";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Aperçu", subtitle: "Vue d'ensemble de votre plateforme" },
  "/integrations": { title: "Intégrations", subtitle: "Connectez vos applications" },
  "/workflows": { title: "Workflows", subtitle: "Gérez vos automatisations" },
  "/executions": { title: "Exécutions", subtitle: "Suivez les exécutions" },
  "/designer": { title: "Designer", subtitle: "Créez des diagrammes" },
  "/analytics": { title: "Analytique", subtitle: "Rapports et statistiques" },
  "/team": { title: "Équipe", subtitle: "Gérez votre équipe" },
  "/api": { title: "API", subtitle: "Documentation développeur" },
  "/pricing": { title: "Abonnement", subtitle: "Gérez votre abonnement" },
  "/settings": { title: "Paramètres", subtitle: "Configuration du compte" },
  "/help": { title: "Aide", subtitle: "Documentation et support" },
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState("/");

  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <Dashboard />;
      case "/integrations":
        return <Integrations />;
      case "/workflows":
        return <Workflows />;
      case "/executions":
        return <Executions />;
      case "/designer":
        return <Designer />;
      case "/team":
        return <Team />;
      case "/analytics":
        return <Analytics />;
      case "/api":
        return <Api />;
      case "/pricing":
        return <Pricing />;
      case "/settings":
        return <Settings />;
      default:
        return (
          <div className="p-6 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {pageConfig[currentPage]?.title || "Page"}
              </h2>
              <p className="text-muted-foreground">Bientôt disponible...</p>
            </div>
          </div>
        );
    }
  };

  const config = pageConfig[currentPage] || { title: "AI Studio", subtitle: "" };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="ml-64 transition-all duration-300">
        <Header title={config.title} subtitle={config.subtitle} />
        <div className="animate-fade-in">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Index;
