// src/hooks/useAuth.js
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const token = localStorage.getItem('token');

      if (token) {
        // Call logout API to invalidate token on server
        await fetch(`${BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      // Even if API call fails, we still clear local storage and redirect
      console.error('Logout API error:', error);
    } finally {
      // Clear all auth-related data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');

      setIsLoggingOut(false);

      // Redirect to homepage
      router.push('/');
    }
  }, [router, isLoggingOut]);

  return { logout, isLoggingOut };
}
