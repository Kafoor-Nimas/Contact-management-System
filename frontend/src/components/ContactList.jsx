import React, { useState } from "react";

const ContactList = ({ contacts, setContacts }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex gap-10">
        <select name="" id=""></select>
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
