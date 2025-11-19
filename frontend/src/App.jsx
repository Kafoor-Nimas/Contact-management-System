import React from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

const App = () => {
  const [contacts, setContacts] = React.useState([]);

  return (
    <div>
      <div className="p-8 max-w-[1440px] mx-auto grid grid-cols-3 gap-[70px]">
        <div className="col-span-1 space-y-4">
          <h1 className="text-[32px] font-bold mb-10 text-[#00277a]">
            Contact Management
          </h1>
          <ContactForm contacts={contacts} setContacts={setContacts} />
        </div>
        <div className="col-span-2">
          <ContactList contacts={contacts} setContacts={setContacts} />
        </div>
      </div>
    </div>
  );
};

export default App;
