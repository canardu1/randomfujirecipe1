import React from 'react';
import { Camera, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserMenu } from './auth/UserMenu';
import { useAuth } from '../hooks/useAuth';

export function Navigation() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="bg-neutral-800 border-b border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="w-8 h-8 text-[#b87a4b]" />
              <span className="text-xl font-bold text-white">Fujifilm Recipe Generator</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/community"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/community'
                  ? 'bg-[#b87a4b] text-white'
                  : 'text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Users className="w-4 h-4" />
              Community
            </Link>
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}