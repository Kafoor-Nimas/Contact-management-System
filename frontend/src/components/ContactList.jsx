import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactList = ({ contacts, setContacts }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const query = `?status=${statusFilter}&search=${search}`;
      const fetchPromise = await axios
        .get(`http://localhost:5000/contacts${query}`)
        .then((res) => setContacts(res.data))
        .catch((err) => console.log(err));
      //set 1s delay to show loading spinner
      const delay = new Promise((resolve) => setTimeout(resolve, 1000));
      await Promise.all([fetchPromise, delay]);
      setLoading(false);
    };
    fetchContacts();
  }, [statusFilter, search, setContacts]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/contacts/${id}`, {
        status: newStatus,
      });
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === id ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`http://localhost:5000/contacts/${id}`);
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
      } catch (error) {
        console.log("Error deleting contact:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex gap-10">
        <select
          className="p-2 rounded bg-[#00277a] text-white cursor-pointer outline-0"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Interested">Interested</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or company"
          className="p-3 rounded w-full bg-[#eff4ff] outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-5 mt-10 gap-4">
          <img src="/loading-svgrepo-com.svg" alt="" width={80} height={80} />
          <p className="text-[#00277a] text-2xl font-semibold">Loading...</p>
        </div>
      ) : (
        <div>
          <div className="mt-10">
            {contacts.length === 0 && (
              <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-5 mt-10 gap-4 bg-[#fff]">
                <img
                  src="/no-contact.jpg"
                  alt="no-contact"
                  width={300}
                  height={300}
                />
                <p className="text-[#00277a] text-2xl font-semibold">
                  No contacts found
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-10 max-xl:grid-cols-1">
            {contacts.map((contact) => (
              <div key={contact._id}>
                <div className="bg-[#eff4ff] shadow-md rounded p-4 flex flex-col justify-between hover:shadow-lg transition">
                  <div>
                    <div className="text-gray-500 text-sm flex gap-2 mb-5 mt-0 justify-between items-center">
                      <h3 className="font-bold text-2xl text-[#00277a]">
                        {contact.name}
                      </h3>
                      <p className="text-[#00277a] p-2 px-4 rounded bg-[#d3e6ff] font-medium">
                        {contact.company}
                      </p>
                    </div>
                    <div className="text-[16px] flex gap-2 my-3 justify-between border-2 border-[#00277a21] px-3 p-3 max-sm:flex-col max-sm:gap-1 max-sm:p-4 mx-sm:px-6">
                      <p>📧 {contact.email}</p>
                      <p>📞 {contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <select
                      value={contact.status}
                      className="p-1 rounded cursor-pointer outline-0 shadow"
                      onChange={(e) =>
                        handleStatusChange(contact._id, e.target.value)
                      }
                    >
                      <option value="Interested">Interested</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
