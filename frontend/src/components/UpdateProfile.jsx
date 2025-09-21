import React, { useState } from "react";

function UpdateProfile({closeModal}) {
  const [updatedName, setUpdatedName] = useState(localStorage.getItem("name") || "Lawrence Cruz");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name",updatedName)
    closeModal();
  };

  return (
    <div onClick={()=>closeModal()} className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center h-screen w-screen z-10">
      <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
