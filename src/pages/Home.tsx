import React, { useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import { useQuery } from '@apollo/client'
import { GET_CONTACT_LIST } from '../queries';

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
    // const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    // const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
    useEffect(() => {
        if (data && data.contact) {
            setStoredContacts(data.contact);
        }
    }, [data]);

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
                        console.log('Rendering ContactList for item:', item); // Add this console.log
                        return (
                            <li key={i}>
                                <ContactList item={item} />
                            </li>
                        );
                    })}
                </ul>
            </div>

        </>
    );
};

export default Home;
