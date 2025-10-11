import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Trainees from "./pages/Trainees";
import CreateCV from "./pages/CreateCV";
import CVPreviewPage from "./pages/CVPreviewPage";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tableau-de-bord"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stagiaires"
              element={
                <ProtectedRoute>
                  <Trainees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stagiaires/nouveau"
              element={
                <ProtectedRoute>
                  <CreateCV />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stagiaires/modifier/:id"
              element={
                <ProtectedRoute>
                  <CreateCV />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stagiaires/cv/:id"
              element={
                <ProtectedRoute>
                  <CVPreviewPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
