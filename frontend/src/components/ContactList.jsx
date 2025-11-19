import React, { useState } from "react";

const ContactList = ({ contacts, setContacts }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  return (
    <div>
      <div className="flex gap-10">
        <select className="p-2 rounded bg-[#00277a] text-white cursor-pointer outline-0" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
    </div>
  );
};

export default ContactList;
