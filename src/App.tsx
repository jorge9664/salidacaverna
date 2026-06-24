import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IndexEn from "./pages/IndexEn.tsx";
import NotFound from "./pages/NotFound.tsx";
import AuthPage from "./pages/Auth.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AdminArticles from "./pages/admin/AdminArticles.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminMessages from "./pages/admin/AdminMessages.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleDetail from "./pages/ArticleDetail.tsx";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { LanguageProvider } from "@/i18n/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<IndexEn />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/articulos" element={<Articles />} />
            <Route path="/articulos/:slug" element={<ArticleDetail />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
