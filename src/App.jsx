import contactList from './contacts.json';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm.jsx';
import SearchBox from './components/SearchBox.jsx';
import ContactList from './components/ContactList.jsx';
import './App.css';

const C_KEY = 'contacts';

function App() {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem(C_KEY);
        if (savedContacts !== null) {
            return JSON.parse(savedContacts);
        }

        return contactList;
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem(C_KEY, JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (newContact) => {
        newContact.id = nanoid();
        setContacts([...contacts, newContact]);
    };

    const removeContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} />
            <SearchBox
                value={filter}
                onFilter={setFilter}
            />
            <ContactList
                list={filteredContacts}
                removeContact={removeContact}
            />
        </>
    );
}

export default App;
