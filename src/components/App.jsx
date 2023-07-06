import React, { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = useCallback(
    (name, number) => {
      const existingContact = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );
      if (existingContact) {
        alert('This name is already in contacts');
        return;
      }

      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
    },
    [contacts]
  );

  const handleFilterChange = useCallback(filter => {
    setFilter(filter);
  }, []);

  const deleteContact = useCallback(id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  }, []);

  return (
    <div className={css.container}>
      <div className={css.section}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={addContact} />
      </div>

      <div className={css.section}>
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
};
