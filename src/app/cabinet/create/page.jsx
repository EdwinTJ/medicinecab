"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter();
  const isSession = async () =>{
    const { data:{session}} = await supabase.auth.getSession();

    if(!session){
      router.push("/auth");
  }
  };
  // State
  const [user_id, setUser_id] = useState('');
  const [cabinetName, setCabinetName] = useState('');
  const [cabinetDescription, setCabinetDescription] = useState('');

  const supaBaseCabinets = async () => {
    const { data, error } = await supabase
      .from('medicinecabinets')
      .insert([
        { user_id, name: cabinetName, description: cabinetDescription }
      ]);

    if (data) {
      console.log('Cabinet created successfully:', data);
    }

    if (error) {
      console.error('Error creating cabinet:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    supaBaseCabinets();
    router.push('/cabinet');
  };

  useEffect(() => {isSession();}, []);

    return( 
      <>
      <main className="flex-grow flex items-center justify-center px-1">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Cabinet</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="user_id" className="block text-gray-700 font-semibold mb-2">user_id</label>
          <input type="text" id="user_id" value={user_id} onChange={(e) => setUser_id(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="cabinetName" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="cabinetName" value={cabinetName} onChange={(e) => setCabinetName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="cabinetDescription" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="cabinetDescription" value={cabinetDescription} onChange={(e) => setCabinetDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" rows="4"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Create</button>
        </div>
      </form>
    </div>
  </main>
  </>
  );
}