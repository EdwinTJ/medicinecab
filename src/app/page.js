"use client";
import Link from "next/link";
import {supabase} from "@/lib/supabase"
import { useEffect, useState } from "react";
export default function Home() {
    // State
    const [cabinets, setCabinets] = useState([]);

    const supaBaseCabinets = async () => {
        const { data:medicinecabinets, error } = await supabase
        .from('medicinecabinets')
        .select("*");
        if (medicinecabinets) {
            setCabinets(medicinecabinets);
        };
        if (error) console.log('error', error);  
    };
    
    useEffect(() => {
      supaBaseCabinets();
    }, []);
    
    // Placeholder data for cabinets and medicines about to expire
    // const cabinets = ['Cabinet 1', 'Cabinet 2', 'Cabinet 3'];
    const medicinesAboutToExpire = [
      { name: 'Medicine A', date: '2024-03-15', cabinet: 'Cabinet 1' },
      { name: 'Medicine B', date: '2024-03-17', cabinet: 'Cabinet 2' },
      { name: 'Medicine C', date: '2024-03-20', cabinet: 'Cabinet 3' },
    ];


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
    {/* Main content */}
    <main className="flex-grow flex items-center justify-center">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to Medicine Cab</h1>
        
        {/* Your cabinets */}
        <div className="text-left mb-8">
          <h2 className="text-lg font-semibold mb-4">Your cabinets</h2>
          <Link href="cabinet"><button className="ml-2 mb-3 bg-blue-500 text-white px-6 py-1 rounded">View Cabinet</button></Link>
          <ul className="space-y-2">
            {cabinets.map((cabinet) => (
              <li key={cabinet.cabinet_id}>
                <span className="font-semibold">{cabinet.name}</span>
                <Link href={`cabinet/${cabinet.cabinet_id}`}><button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">View Cabinet</button></Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Expire Soon */}
        <div className="text-left">
          <h2 className="text-lg font-semibold mb-4">Expire Soon</h2>
                  {/* Add New Medicine Button */}
        <div className="text-right mb-4">
          <Link href="../medicine/create"><button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Add New Medicine</button></Link>
        </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Cabinet</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicinesAboutToExpire.map((medicine, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{medicine.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{medicine.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{medicine.cabinet}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`cabinet/${index}`}><button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">View</button></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
    </div>
    );
}
