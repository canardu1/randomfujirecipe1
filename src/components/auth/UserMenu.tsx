import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AuthModal } from './AuthModal';

interface UserMenuProps {
  user: any | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="relative group">
        <button className="flex items-center gap-2 text-white">
          <User className="w-5 h-5" />
          <span className="text-sm">{user.email}</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg py-1 hidden group-hover:block">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-neutral-700"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="flex items-center gap-2 text-white"
      >
        <User className="w-5 h-5" />
        <span className="text-sm">Sign in</span>
      </button>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}