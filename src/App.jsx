import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact } from './redux/contactsSlice.js';
import { updateFilter } from './redux/filtersSlice.js';
import { nanoid } from '@reduxjs/toolkit';

import ContactForm from './components/ContactForm.jsx';
import SearchBox from './components/SearchBox.jsx';
import ContactList from './components/ContactList.jsx';
import './App.css';

const C_KEY = 'contacts';

function App() {
    // const [contacts, setContacts] = useState(() => {
    //     const savedContacts = localStorage.getItem(C_KEY);
    //     if (savedContacts !== null) {
    //         return JSON.parse(savedContacts);
    //     }
    //
    //     return contactList;
    // });
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filters.name);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem(C_KEY, JSON.stringify(contacts));
    }, [contacts]);

    const addNewContact = (newContact) => {
        newContact.id = nanoid();
        dispatch(addContact(newContact));
    };

    const deleteContact = (id) => {
        dispatch(removeContact(id));
    };

    const setFilter = (name) => {
        dispatch(updateFilter(name));
    }

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            <h1>Phonebook</h1>
            <ContactForm addContact={addNewContact} />
            <SearchBox
                value={filter}
                onFilter={setFilter}
            />
            <ContactList
                list={filteredContacts}
                removeContact={deleteContact}
            />
        </>
    );
}

export default App;
