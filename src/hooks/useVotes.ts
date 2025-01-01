import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useVotes() {
  const { user } = useAuth();
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserVotes();
    } else {
      setUserVotes(new Set());
      setLoading(false);
    }
  }, [user]);

  const fetchUserVotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('recipe_votes')
        .select('recipe_id')
        .eq('user_id', user?.id);

      if (fetchError) throw fetchError;

      setUserVotes(new Set(data?.map(vote => vote.recipe_id) || []));
    } catch (err) {
      console.error('Error fetching votes:', err);
      setError('Failed to fetch votes');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (recipeId: string) => {
    if (!user) return;

    try {
      setError(null);
      const isVoted = userVotes.has(recipeId);
      
      const { error: voteError } = await supabase.rpc('handle_vote', {
        p_user_id: user.id,
        p_recipe_id: recipeId,
        p_action: isVoted ? 'remove' : 'add'
      });

      if (voteError) throw voteError;

      // Update local state optimistically
      setUserVotes(prev => {
        const next = new Set(prev);
        if (isVoted) {
          next.delete(recipeId);
        } else {
          next.add(recipeId);
        }
        return next;
      });

      // Refetch to ensure consistency
      await fetchUserVotes();
    } catch (err) {
      console.error('Error handling vote:', err);
      setError('Failed to process vote');
      // Revert optimistic update on error
      await fetchUserVotes();
    }
  };

  return {
    userVotes,
    handleVote,
    loading,
    error
  };
}