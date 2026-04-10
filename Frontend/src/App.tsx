import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import LandingPage from "./pages/LandingPage";
import CataloguePage from "./pages/CataloguePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookDetailPage from "./pages/BookDetailPage";
import BookEditPage from "./pages/BookEditPage";
import NotFound from "./pages/NotFound";

import Navbar from "./components/layout/Navbar";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/dashboard/DashboardPage";
import BooksPage from "./pages/dashboard/BooksPage";
import CategoriesPage from "./pages/dashboard/CategoriesPage";
import BorrowsPage from "./pages/dashboard/BorrowsPage";
import UsersPage from "./pages/dashboard/UsersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="/livre/:id" element={<BookDetailPage />} />
          <Route path="/livre/:id/editer" element={<BookEditPage />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <DashboardLayout />
                </div>
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="livres" element={<BooksPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="emprunts" element={<BorrowsPage />} />
            <Route path="utilisateurs" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
