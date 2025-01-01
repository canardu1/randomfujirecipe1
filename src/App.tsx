import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { RecipeGenerator } from './pages/RecipeGenerator';
import { CommunityRecipes } from './pages/CommunityRecipes';
import { AdminPanel } from './pages/AdminPanel';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neutral-900">
        <Navigation />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<RecipeGenerator user={user} />} />
            <Route path="/community" element={<CommunityRecipes />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}