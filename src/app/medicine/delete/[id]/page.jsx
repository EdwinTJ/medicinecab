"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Page({params: {id}}) {

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
        const { error } = await supabase
            .from('medicines')
            .delete()
            .eq('medicine_id', id);
        if (error) {
            console.error('Error updating medicine:', error.message);
        } else {
            console.log('Medicine updated successfully!');
            router.push('/');
        }
        } catch (error) {
        console.error('Error updating medicine:', error.message);
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Delete Cabinet</h1>
          <div className="mb-6 text-center">
            <p className="text-gray-700 mb-4">Are you sure you want to delete the cabinet:</p>
            <p className="text-red-500 font-semibold">{medicineName}</p>
          </div>
          <div className="flex justify-center">
            <button onClick={handleFormSubmit} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-4 focus:outline-none">Delete</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg focus:outline-none">Cancel</button>
          </div>
        </div>
      </div>
    )
}