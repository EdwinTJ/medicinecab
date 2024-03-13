import React from 'react'
import Link from 'next/link'
function Navbar() {
  return (
    <><nav className="bg-blue-500 p-4">
    <div className="flex justify-between items-center">
      <div className="text-white font-bold text-xl">Medicine Cab</div>
      <div className="flex space-x-4">
        <Link href="/" className="text-white"><p>Home</p></Link>
        <Link href="/cabinet" className="text-white"><p>Cabinet</p></Link>
        <a href="/help" className="text-white">Help</a>
      </div>
    </div>
  </nav>
  </>  )
}

export default Navbar