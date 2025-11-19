import React, { useEffect, useState } from "react";

const ContactList = ({ contacts, setContacts }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [contacts]);

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
              <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-5 mt-10 gap-4">
                <img
                  src="/no-contact.jpg"
                  alt="no-contact"
                  width={200}
                  height={200}
                />
                <p className="text-[#00277a] text-2xl font-semibold">
                  No contacts found
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-10">
            {contacts.map((contact) => {
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
                    <div className="text-[16px] flex gap-2 my-3 justify-between border-2 border-[#00277a21] px-3 p-3">
                      <p>📧 {contact.email}</p>
                      <p>📞 {contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <select
                      value={contact.status}
                      className="p-1 rounded cursor-pointer outline-0 shadow"
                    >
                      <option value="Interested">Interested</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
