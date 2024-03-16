"use client";
import AddMedicineForm from "@/app/componets/AddMedicineForm";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
// Page component including the AddMedicineForm
export default  function Page ({ params: { id } }) {
  const [cabinets, setCabinets] = useState([]);
  
  const fetchCabinets = async () => {
    try {
      const { data, error } = await supabase.from('medicinecabinets').select('*');
      if (data) {
        setCabinets(data);
        console.log('Cabinets:', data);
      }
      if (error) {
        console.error('Error fetching cabinets:', error.message);
      }
    } catch (error) {
      console.error('Error fetching cabinets:', error.message);
    }
  }; 

  useEffect(() => {
    fetchCabinets();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Medicine</h1>
        {/* Add Medicine Form */}
        <AddMedicineForm cabinets={cabinets} />
      </div>
    </div>
  );
}