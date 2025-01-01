import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Image, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface AdminStats {
  totalUsers: number;
  totalRecipes: number;
  totalVotes: number;
}

export function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRecipes: 0,
    totalVotes: 0
  });

  useEffect(() => {
    checkAdminStatus();
    if (isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate('/');
      return;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchStats = async () => {
    const { count: userCount } = await supabase
      .from('auth.users')
      .select('id', { count: 'exact' });

    const { count: recipeCount } = await supabase
      .from('public_recipes')
      .select('id', { count: 'exact' });

    const { count: voteCount } = await supabase
      .from('recipe_votes')
      .select('id', { count: 'exact' });

    setStats({
      totalUsers: userCount || 0,
      totalRecipes: recipeCount || 0,
      totalVotes: voteCount || 0
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-neutral-400">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="fuji-panel p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#b87a4b]" />
            <div>
              <h3 className="text-lg font-medium text-white">Total Users</h3>
              <p className="text-2xl font-bold text-[#b87a4b]">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="fuji-panel p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Image className="w-8 h-8 text-[#b87a4b]" />
            <div>
              <h3 className="text-lg font-medium text-white">Public Recipes</h3>
              <p className="text-2xl font-bold text-[#b87a4b]">{stats.totalRecipes}</p>
            </div>
          </div>
        </div>

        <div className="fuji-panel p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-[#b87a4b]" />
            <div>
              <h3 className="text-lg font-medium text-white">Total Votes</h3>
              <p className="text-2xl font-bold text-[#b87a4b]">{stats.totalVotes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add more admin features here */}
    </div>
  );
}