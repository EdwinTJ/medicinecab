"use client";
import Link from "next/link";
import {supabase} from "@/lib/supabase"
import { useEffect, useState,useCallback } from "react";
import { useRouter } from 'next/navigation';
// Styles
import {Button, Tab} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";

export default function Home() {
    

      // State
      const [cabinets, setCabinets] = useState([]);
      const [medicines, setMedicines] = useState([]);
      const [user, setUser] = useState(null);
  // Redirect if user is logged in
  const router = useRouter();
  
    useEffect(() => {
      const checkSession = async () =>{
        const { data:{session}} = await supabase.auth.getSession();
        if(session){
        setUser(session.user);
        if(session.user.id){
          fetchCabinet(session.user.id);
        }
      }
    
        if(!session){
          router.push("/auth");
      }
      };
      fetchMedicines();
      checkSession();
    }, []);
    
    const fetchCabinet = async (userId) => {
      const { data:medicinecabinets, error } = await supabase
      .from('medicinecabinets')
      .select("*")
      .eq('user_id', userId);
      if (medicinecabinets) {
          setCabinets(medicinecabinets);
      };
      if (error) console.log('error cabinets', error);  
  };

  const fetchMedicines = async () => {
    const { data:medicines, error } = await supabase
    .from('medicines')
    .select("*");
    if (medicines) {
        setMedicines(medicines);
    };
    if (error) console.log('error mediciens', error);  
};


    const getCabinetNameById = (cabinetId) => {
      const cabinet = cabinets.find((cabinet) => cabinet.cabinet_id === cabinetId);
      return cabinet ? cabinet.name : "";
    };

        return (<>
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-1">
        <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to Medicine Cab</h1>
        {user ? (
            <p>Hello, {user.email}</p>
          ) : (
            <p>Hello, Please Login</p>
          )}
        {/* Your cabinets */}
   {user ? (
                    <div className="flex justify-center">
                        <div className="text-left mb-8">
                            <h2 className="text-lg font-semibold mb-4">Your cabinets</h2>
                            <Link href="cabinet">
                                <Button className="ml-2 mb-3" color="primary">View All Cabinet</Button>
                            </Link>
                            <ul className="space-y-2">
                                {cabinets.map((cabinet) => (
                                    <li key={cabinet.cabinet_id}>
                                        <span className="font-semibold">{cabinet.name}</span>
                                        <Link href={`cabinet/${cabinet.cabinet_id}`}>
                                            <Button className="ml-2 px-2 py-1" color="primary">View Cabinet</Button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
<></>
                )}

          {/* Expire Soon */}
          {user ? (
                 <>
                      <div className="text-left">
                      <h2 className="text-lg font-semibold mb-4">Expire Soon</h2>
                      </div>
                      <div className="flex justify-end items-center mb-2">
                        <div className="text-right mb-2">
                          <Link href="../medicine">
                            <Button className="mr-2 px-4 py-2" color="primary">View All</Button>
                            </Link>
                        </div>
                        <div className="text-right mb-2">
                          <Link href="../medicine/create">
                            <Button className="px-4 py-2" color="primary">Add Medicine</Button>
                            </Link>
                        </div>
                      </div>
                      <table className="w-full border-collapse border border-gray-300">
                          <thead className="bg-gray-200">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                          <th className="border border-gray-300 px-4 py-2">Expiration</th>
                          <th className="border border-gray-300 px-4 py-2">Cabinet</th>
                          <th className="border border-gray-300 px-4 py-2">Actions</th>
              
                          </tr>
                        </thead>
                        <tbody>
                          {medicines.map((medicine) => (
                            <tr key={medicine.medicine_id}>
                              <td className="border border-gray-300 px-4 py-2">{medicine.medicine_name}</td>
                              <td className="border border-gray-300 px-4 py-2">{medicine.expiration_date}</td>
                              <td className="border border-gray-300 px-4 py-2">{getCabinetNameById(medicine.cabinet_id)}</td>
              
                              <td className="border border-gray-300 px-4 py-2">
                              <Link href={`medicine/edit/${medicine.medicine_id}`}><button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button></Link>
                                <Link href={`medicine/delete/${medicine.medicine_id}`}><button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table></>
          ) : (
           <></>
          )}
          
        </div>
      </main>
      </>
      );
  }