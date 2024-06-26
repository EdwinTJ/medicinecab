"use client";
import { useState} from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
// AddMedicineForm component for adding a new medicine
const AddMedicineForm = ({ cabinets }) => {
  const router = useRouter();
  const [medicineName, setMedicineName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [selectedCabinet, setSelectedCabinet] = useState('');

  const supabaseCreteaMedicine = async ()=>{
    const {data,error } = await supabase
  .from('medicines')
  .insert([
    {medicine_name:medicineName,expiration_date:expirationDate,cabinet_id:selectedCabinet}
  ]);

  if (data) {
    console.log('Cabinet created successfully:', data);
  }

  if (error) {
    console.error('Error creating cabinet:', error);
  }

}

  console.log('Cabinets:', cabinets);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    supabaseCreteaMedicine();
    router.push('/');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="medicineName" className="block text-gray-700 font-semibold mb-2">Name</label>
        <input type="text" id="medicineName" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="mb-4">
        <label htmlFor="expirationDate" className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
        <input type="date" id="expirationDate" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="mb-4">
        <label htmlFor="selectedCabinet" className="block text-gray-700 font-semibold mb-2">Cabinet</label>
        <select id="selectedCabinet" value={selectedCabinet} onChange={(e) => setSelectedCabinet(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
          <option value="">Select Cabinet</option>
          {cabinets.map((cabinet) => (
            <option key={cabinet.cabinet_id} value={cabinet.cabinet_id}>{cabinet.name}</option>
          ))}
        </select>
      </div>
      <div className="text-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Add Medicine</button>
      </div>
    </form>
  );
};

export default AddMedicineForm;