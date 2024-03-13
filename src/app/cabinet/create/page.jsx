"use client";
import { useState } from 'react';
export default function Page() {
    const [cabinetName, setCabinetName] = useState('');
    const [cabinetDescription, setCabinetDescription] = useState('');
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      // Placeholder function for handling form submission
      console.log('Cabinet Name:', cabinetName);
      console.log('Cabinet Description:', cabinetDescription);
      // You can add your logic here to submit the form data
    };
    return( 
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Cabinet</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="cabinetName" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="cabinetName" value={cabinetName} onChange={(e) => setCabinetName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="cabinetDescription" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="cabinetDescription" value={cabinetDescription} onChange={(e) => setCabinetDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" rows="4"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none">Create</button>
        </div>
      </form>
    </div>
  </div>
  );
}