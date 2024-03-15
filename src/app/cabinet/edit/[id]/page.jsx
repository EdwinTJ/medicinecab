"use client";
import { useState,useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
export default function Page({params: {id}}) {
  const router = useRouter();
 // State
 const [cabinetName, setCabinetName] = useState('');
 const [cabinetDescription, setCabinetDescription] = useState('');

  useEffect(() => {
    // Fetch cabinet details from Supabase and set local state
    const fetchCabinetDetails = async () => {
      const { data : medicinecabinets, error } = await supabase
        .from('medicinecabinets')
        .select()
        .eq('cabinet_id', id)
        .single();

      if (medicinecabinets) {
        setCabinetName(medicinecabinets.name);
        setCabinetDescription(medicinecabinets.description);
      }

      if (error) {
        console.error('Error fetching cabinet details:', error.message);
      }
    };

    fetchCabinetDetails();
  }, [id]); // Fetch cabinet details whenever `id` changes

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Update cabinet details in Supabase
    const { error } = await supabase
      .from('medicinecabinets')
      .update({ name: cabinetName, description: cabinetDescription })
      .eq('cabinet_id', id);

    if (error) {
      console.error('Error updating cabinet:', error.message);
    } else {
      console.log('Cabinet updated successfully!');
      router.push('/cabinet');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Cabinet {cabinetName}</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="cabinetName" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" id="cabinetName" value={cabinetName} onChange={(e) => setCabinetName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="cabinetDescription" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea id="cabinetDescription" value={cabinetDescription} onChange={(e) => setCabinetDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" rows="4"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}