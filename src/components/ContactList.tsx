import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_CONTACT_LIST, DELETE_CONTACT, ADD_CONTACT, } from '../queries';

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

    //mutation
    const [deleteContact] = useMutation(DELETE_CONTACT);
    const [addContact] = useMutation(ADD_CONTACT);
    const [newContactData, setNewContactData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [offset, setOffset] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState('');

    const mergedContacts = [...storedContacts, ...(data?.contact || [])];
    console.log(searchTerm, "data grap")


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

    //load more funct
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

    //delete func
    const handleDeleteContact = async (id: number) => {
        try {
            await deleteContact({
                variables: { id },
                update: (cache) => {
                    const updatedContacts = storedContacts.filter(contact => contact.id !== id);
                    setStoredContacts(updatedContacts);
                    localStorage.setItem('contactList', JSON.stringify(updatedContacts));

                    cache.writeQuery({
                        query: GET_CONTACT_LIST,
                        data: {
                            contact: updatedContacts,
                        },
                    });
                },
            });
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    //add func
    const handleAddContact = async () => {
        try {
            const { firstName, lastName, phoneNumber } = newContactData;

            // Check if the contact name is unique and doesn't have special characters
            const isNameValid = storedContacts.every(
                contact =>
                    contact.first_name.toLowerCase() !== firstName.toLowerCase() &&
                    /^[a-zA-Z\s]*$/.test(firstName) && /^[a-zA-Z\s]*$/.test(lastName)
            );

            if (!isNameValid) {
                console.error('Contact name must be unique and not contain special characters.');
                return;
            }
            const response = await addContact({
                variables: {
                    first_name: firstName,
                    last_name: lastName,
                    phones: [{ number: phoneNumber }],
                },
                update: (cache, { data }) => {
                    if (data && data.insert_contact) {
                        const newContact = data.insert_contact.returning[0];

                        // Update the cache to include the new contact
                        cache.modify({
                            fields: {
                                contact(existingContacts = []) {
                                    const newContactRef = cache.writeFragment({
                                        data: newContact,
                                        fragment: gql`
                                            fragment NewContact on Contact {
                                                id
                                                first_name
                                                last_name
                                                phones {
                                                    number
                                                }
                                            }
                                        `,
                                    });

                                    return [...existingContacts, newContactRef];
                                },
                            },
                        });

                        // Update local state and storage
                        setStoredContacts(prevContacts => [...prevContacts, newContact]);
                        localStorage.setItem('contactList', JSON.stringify([...storedContacts, newContact]));
                    }
                },
            });

            console.log('New contact added:', response);

            // Reset form fields
            setNewContactData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
            });
        } catch (error) {
            console.error('Error adding new contact:', error);
        }
    };


    //serach
    const filteredContacts = mergedContacts.filter(contact =>
        contact.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div>
            <h2>Contact List</h2>
            <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredContacts.map(contact => (
                    <li key={`contact-${contact.id}`}>
                        {contact.first_name} {contact.last_name}
                        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                        <ul>
                            {contact.phones.map((phone, index) => (
                                <li key={`contact-${contact.id}-phone-${index}`}>{phone.number}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* <ul>
                {mergedContacts.map((contact) => (
                    <li key={`contact-${contact.id}`}>
                        {contact.first_name} {contact.last_name}
                        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                        <ul>
                            {contact.phones.map((phone, index) => (
                                <li key={`contact-${contact.id}-phone-${index}`}>{phone.number}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul> */}
            <button onClick={loadMore}>Load More</button>
            <h2>Add New Contact</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddContact(); }}>
                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        value={newContactData.firstName}
                        onChange={(e) => setNewContactData({ ...newContactData, firstName: e.target.value })}
                    />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={newContactData.lastName}
                        onChange={(e) => setNewContactData({ ...newContactData, lastName: e.target.value })}
                    />
                </div>
                <div>
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        value={newContactData.phoneNumber}
                        onChange={(e) => setNewContactData({ ...newContactData, phoneNumber: e.target.value })}
                    />
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default ContactList;
