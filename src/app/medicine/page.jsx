"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
const MedicinesTable = () => {
    const router = useRouter();

    const [cabinets, setCabinets] = useState([]);
    const [medicines, setMedicines] = useState([]);

    const isSession = async () =>{
        const { data:{session}} = await supabase.auth.getSession();
    
        if(!session){
          router.push("/auth");
      }
      };
    const supaBaseCabinets = async () => {
        const { data:medicinecabinets, error } = await supabase
        .from('medicinecabinets')
        .select("*");
        if (medicinecabinets) {
            setCabinets(medicinecabinets);
        };
        if (error) console.log('error', error);  
    };
    
    const supaBaseMedicines = async () => {
        const { data:medicines, error } = await supabase
        .from('medicines')
        .select("*");
        if (medicines) {
            setMedicines(medicines);
        };
        if (error) console.log('error', error);  
    };

    useEffect(() => {
        isSession();
        supaBaseCabinets();
        supaBaseMedicines();
        
    }, []);

      
    const getCabinetNameById = (cabinetId) => {
        const cabinet = cabinets.find((cabinet) => cabinet.cabinet_id === cabinetId);
        return cabinet ? cabinet.name : "";
      };

      
    return (
        <div className="mx-auto max-w-4xl p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Medicines</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Expiration Date</th>
                        <th className="border border-gray-300 px-4 py-2">Cabinet ID</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine.medicine_id}>
                            <td className="border border-gray-300 px-4 py-2">{medicine.medicine_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{medicine.expiration_date}</td>
                            <td className="border border-gray-300 px-4 py-2">{getCabinetNameById(medicine.cabinet_id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicinesTable;
