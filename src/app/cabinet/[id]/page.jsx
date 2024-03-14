"use client";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
export default function Page({params:{id}}) {

      // State
      const [cabinets, setCabinets] = useState([]);

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
      
      useEffect(() => {
        supaBaseCabinets();
      }, []);

      console.log(cabinets);
      // Extrating the data from the array
      const cabinetName = cabinets.length > 0 ? cabinets[0].name : '';
      const cabinetDescription = cabinets.length > 0 ? cabinets[0].description : '';
 // Placeholder data for list of medicines
 const medicines = [
    { name: 'Medicine A', expirationDate: '2024-03-15', reminder: false },
    { name: 'Medicine B', expirationDate: '2024-03-17', reminder: true },
    { name: 'Medicine C', expirationDate: '2024-03-20', reminder: false },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">List of Medicines</h2>
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
                  <td className="border border-gray-300 px-4 py-2">{medicine.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{medicine.expirationDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{medicine.reminder ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );}