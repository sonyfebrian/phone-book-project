import React, { useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import { useQuery, useMutation } from '@apollo/client'
import { GET_CONTACT_LIST, DELETE_CONTACT } from '../queries';

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phones: { number: string }[];
}

interface ContactData {
    contact: Contact[];
}

const Home: React.FC = () => {
    const { loading, error, data } = useQuery<ContactData>(GET_CONTACT_LIST);
    const [storedContacts, setStoredContacts] = useState<Contact[]>([]);

    const [deleteContact] = useMutation(DELETE_CONTACT);
    // const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    // const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
    useEffect(() => {
        if (data && data.contact) {
            setStoredContacts(data.contact);
        }
    }, [data]);

    const handleDeleteContact = async (id: number) => {
        try {
            await deleteContact({ variables: { id } });
            // Remove the deleted contact from the contactList
            setStoredContacts(storedContacts.filter((contact) => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
            // Handle error
        }
    };

    console.log(storedContacts, data, "datanew")
    useEffect(() => {
        // if (data?.contact) {
        //     localStorage.setItem('contact', JSON.stringify(data.contact));
        //     setStoredContacts(data.contact);
        // }
        localStorage.setItem('contact', JSON.stringify(storedContacts));
    }, [storedContacts]);

    useEffect(() => {
        const storedContactsJSON = localStorage.getItem('contact');
        if (storedContactsJSON) {
            const parsedStoredContacts = JSON.parse(storedContactsJSON);
            setStoredContacts(parsedStoredContacts);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <div className='container'>
                <ul className='list-item'>
                    {storedContacts.map((item, i) => {

                        return (
                            <li key={i}>
                                <ContactList item={item} onDelete={handleDeleteContact} />
                            </li>
                        );
                    })}
                </ul>
            </div>

        </>
    );
};

export default Home;
