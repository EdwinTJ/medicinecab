"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
export default  function Page() {
        // State
        const [cabinets, setCabinets] = useState([]);

        const supaBaseCabinets = async () => {
            const { data: medicinecabinets, error } = await supabase
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
  
  return(
    <div className="bg-gray-100 min-h-screen flex flex-col">

    {/* Main content */}
    <main className="flex-grow flex items-center justify-center">
    <div className="max-w-lg w-full text-center">
      <h1 className="text-3xl font-bold mb-8">Cabinets</h1>
      
      {/* List of cabinets */}
      <div className="mb-4">
      <Link href="/cabinet/create"><button className="bg-blue-500 text-white px-2 py-1 rounded mb-4">Create Cabinet</button></Link>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cabinets.map((cabinet) => (
              <tr key={cabinet.cabinet_id}>
                <td className="border border-gray-300 px-4 py-2">{cabinet.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                <Link href={`cabinet/${cabinet.cabinet_id}`}><button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">View</button></Link>
                  <Link href={`cabinet/edit/${cabinet.cabinet_id}`}><button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button></Link>
                  <Link href={`cabinet/delete/${cabinet.cabinet_id}`}><button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></Link>
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