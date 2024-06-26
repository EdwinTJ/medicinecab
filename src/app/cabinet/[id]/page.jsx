"use client";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({params:{id}}) {
  const router = useRouter();

      // State
      const [cabinets, setCabinets] = useState([]);
      const [medicines, setMedicines] = useState([]);

      const isSession = async () =>{
        const { data:{session}} = await supabase.auth.getSession();
    
        if(!session){
          router.push("/auth");
      }
      };

      const supaBaseCabinets = async () => {
          const { data: medicinecabinets, error } = await supabase
          .from('medicinecabinets')
          .select()
          .eq('cabinet_id', id);
          if (medicinecabinets) {
              setCabinets(medicinecabinets);
          };
          if (error) console.log('error', error);  
      };

      const supaBaseMedicines = async () => {
          const { data: medicines, error } = await supabase
          .from('medicines')
          .select()
          .eq('cabinet_id', id);
          if (medicines) {
              setMedicines(medicines);
          };
          if (error) console.log('error', error);
      };
      
      useEffect(() => {
        supaBaseCabinets();
        supaBaseMedicines();
        isSession();
      }, []);


      
      // Extrating the data from the array
      const cabinetName = cabinets.length > 0 ? cabinets[0].name : '';
      const cabinetDescription = cabinets.length > 0 ? cabinets[0].description : '';


  return (
<>
<main className="flex-grow flex items-center justify-center px-1">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">{cabinetName} Cabinet</h1>
        <p className='text-3xl font-bold text-center mb-4'>
          {cabinetDescription}
        </p>

        {/* Add New Medicine Button */}
        <div className="text-right mb-4">
          <Link href="../medicine/create"><button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Add New Medicine</button></Link>
        </div>

        {/* List of Medicines */}
        {/* List of Medicines or Cabinet empty */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">List of Medicines</h2>
          {medicines.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Expiration Date</th>
                  <th className="border border-gray-300 px-4 py-2">Reminder</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{medicine.medicine_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{medicine.expiration_date}</td>
                    <td className="border border-gray-300 px-4 py-2">{medicine.reminder ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Cabinet empty</p>
          )}
        </div>
      </div>
    </main>
    </>
  );}