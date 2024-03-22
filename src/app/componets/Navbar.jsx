"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
const Navbar = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      setUser(user);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      return;
    }
    setUser(null);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">Medicine Cab</div>
        <div className="flex space-x-4">
          {user ? (
            <>
            <button onClick={logout}>Logout</button>
            <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/cabinet" className="text-white">
            Cabinet
          </Link>
          <Link href="/help" className="text-white">
            Help
          </Link>
            </>
          ) : (
            <Link href="/auth/login" className="text-white">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
