import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Table = ({ users, onRemove }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">Branch</th>
            <th className="px-6 py-3">Passout Year</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {users?.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">
                {user.username}
              </td>
              <td className="px-6 py-4">{user.first_name}</td>
              <td className="px-6 py-4">{user.last_name}</td>
              <td className="px-6 py-4">{user.field_of_study}</td>
              <td className="px-6 py-4">{user.graduation_year}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onRemove(user)}
                  className="text-red-500 hover:text-red-700 transition hover:cursor-pointer"
                  title="Remove User"
                >
                  <FaTrashAlt size={16} />
                </button>
              </td>
            </tr>
          ))}
          {users?.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
