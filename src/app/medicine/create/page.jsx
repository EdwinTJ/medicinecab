"use client";
import AddMedicineForm from "@/app/componets/AddMedicineForm";
// Page component including the AddMedicineForm
export default function Page({ params: { id } }) {
  // Placeholder data for list of cabinets
  const cabinets = ['Cabinet 1', 'Cabinet 2', 'Cabinet 3'];

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