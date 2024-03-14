"use client";
import Link from "next/link";
export default  function Page() {
    // Placeholder data for cabinets
    const cabinets = ['Cabinet 1', 'Cabinet 2', 'Cabinet 3'];

  // Function to handle cabinet edit
  const handleEditCabinet = (cabinet) => {
    // Placeholder function for editing cabinet
    console.log(`Editing ${cabinet}`);
  };

  // Function to handle cabinet delete
  const handleDeleteCabinet = (cabinet) => {
    // Placeholder function for deleting cabinet
    console.log(`Deleting ${cabinet}`);
  };

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
            {cabinets.map((cabinet, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{cabinet}</td>
                <td className="border border-gray-300 px-4 py-2">
                <Link href={`cabinet/${index}`}><button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">View</button></Link>
                  <Link href={`cabinet/edit/${index}`}><button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button></Link>
                  <Link href={`cabinet/delete/${index}`}><button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></Link>
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