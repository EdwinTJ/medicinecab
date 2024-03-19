"use client";
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditMedicinePage({ params: { id } }) {
    const router = useRouter();

    const [medicine, setMedicine] = useState(null);
    const [medicineName, setMedicineName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [selectedCabinetId, setSelectedCabinetId] = useState('');
    const [cabinets, setCabinets] = useState([]);

    const fetchMedicine = async () => {
        try {
            const { data: medicine, error } = await supabase
                .from('medicines')
                .select()
                .eq('medicine_id', id)
                .single();
            if (medicine) {
                setMedicine(medicine);
                setMedicineName(medicine.medicine_name);
                setExpirationDate(medicine.expiration_date);
                setSelectedCabinetId(medicine.cabinet_id);
            }
            if (error) console.log('error', error);
        } catch (error) {
            console.error('Error fetching medicine:', error.message);
        }
    };

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
        fetchMedicine();
        fetchCabinets();

    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {  error } = await supabase
                .from('medicines')
                .update({
                    medicine_name: medicineName,
                    expiration_date: expirationDate,
                    cabinet_id: selectedCabinetId,
                })
                .eq('medicine_id', id);
            if (error) {
                console.error('Error updating medicine:', error.message);
            }
            else{
                console.log('Medicine updated successfully!');
                router.push(`/cabinet/${medicine.cabinet_id}`);   
            }
        } catch (error) {
            console.error('Error updating medicine:', error.message);
        }
    };

    return (<>
        <main className="flex-grow flex items-center justify-center px-1">

        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">Edit Medicine</h1>
            {medicine ? (
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="medicineName" className="block text-gray-700 font-semibold mb-2">Name:</label>
                        <input
                            type="text"
                            id="medicineName"
                            value={medicineName}
                            onChange={(e) => setMedicineName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="expirationDate" className="block text-gray-700 font-semibold mb-2">Expiration Date:</label>
                        <input
                            type="date"
                            id="expirationDate"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="selectedCabinet" className="block text-gray-700 font-semibold mb-2">Cabinet</label>
                        <select
                            id="selectedCabinet"
                            value={selectedCabinetId}
                            onChange={(e) => setSelectedCabinetId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select Cabinet</option>
                            {cabinets.map((cabinet) => (
                                <option key={cabinet.cabinet_id} value={cabinet.cabinet_id}>{cabinet.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Update Medicine</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </main>
        </>
    );
}
