"use client"
import { useState } from 'react';

export default function Page({params: {id}}) {
     // Placeholder data for cabinet to be deleted
  const cabinetName = 'Cabinet 1';

  const handleDelete = () => {
    // Placeholder function for handling cabinet deletion
    console.log(`Deleting cabinet: ${cabinetName}`);
    // You can add your logic here to delete the cabinet
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Delete Cabinet</h1>
        <div className="mb-6 text-center">
          <p className="text-gray-700 mb-4">Are you sure you want to delete the cabinet:</p>
          <p className="text-red-500 font-semibold">{cabinetName}</p>
        </div>
        <div className="flex justify-center">
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-4 focus:outline-none">Delete</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg focus:outline-none">Cancel</button>
        </div>
      </div>
    </div>
  );
}