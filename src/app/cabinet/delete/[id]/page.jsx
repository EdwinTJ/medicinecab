"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from "next/navigation"
export default function Page({params: {id}}) {
  const [cabinetName, setCabinetName] = useState('');
  const router = useRouter();
  const isSession = async () =>{
    const { data:{session}} = await supabase.auth.getSession();

    if(!session){
      router.push("/auth");
  }
  };
  // Fetch cabinet details from Supabase
  const fetchCabinetDetails = async () => {
    try {
      const { data: medicinecabinets, error } = await supabase
        .from('medicinecabinets')
        .select('name')
        .eq('cabinet_id', id)
        .single();

      if (error) {
        throw error;
      }

      if (medicinecabinets) {
        setCabinetName(medicinecabinets.name);
      }
    } catch (error) {
      console.error('Error fetching cabinet details:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete cabinet from Supabase
      const { error } = await supabase
        .from('medicinecabinets')
        .delete()
        .eq('cabinet_id', id);

      if (error) {
        throw error;
      }
      console.log(`Cabinet ${id} deleted successfully`);
      router.push('/cabinet');
    } catch (error) {
      console.error('Error deleting cabinet:', error.message);
    }
  };

  useEffect(() => {fetchCabinetDetails();isSession();}, []);

  return (
    <>
      <main className="flex-grow flex items-center justify-center px-1">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Delete Cabinet</h1>
        <div className="mb-6 text-center">
          <p className="text-gray-700 mb-4">Are you sure you want to delete the cabinet:</p>
          <p className="text-red-500 font-semibold">{cabinetName}</p>
        </div>
        <div className="flex justify-center">
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-4 focus:outline-none">Delete</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg focus:outline-none">Cancel</button>
        </div>
      </div>
    </main>
    </>
  );
}