import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
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

const ContactList: React.FC = () => {
    const { loading, error, data, fetchMore } = useQuery<ContactData>(GET_CONTACT_LIST);

    const [storedContacts, setStoredContacts] = useState<Contact[]>([]);
    const [offset, setOffset] = useState<number>(0);


    const mergedContacts = [...storedContacts, ...(data?.contact || [])];
    console.log(data, "data grap")

    useEffect(() => {
        const storedData = localStorage.getItem('contactList');
        if (storedData) {
            setStoredContacts(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        if (data?.contact) {
            localStorage.setItem('contactList', JSON.stringify(data.contact));
            setStoredContacts(data.contact);
        }
    }, [data]);


    const loadMore = () => {
        fetchMore({
            variables: {
                offset: offset + 10,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    contact: [...prev.contact, ...fetchMoreResult.contact],
                };
            },
        });
        setOffset(offset + 10);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {mergedContacts.map((contact) => (
                    <li key={`local-${contact.id}`}>
                        {contact.first_name} {contact.last_name}
                        <ul>
                            {contact.phones.map((phone, index) => (
                                <li key={index}>{phone.number}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <button onClick={loadMore}>Load More</button>
        </div>
    );
};

export default ContactList;
