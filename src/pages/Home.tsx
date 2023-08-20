import React, { useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import { useQuery, useMutation, gql } from '@apollo/client'
import { GET_CONTACT_LIST, DELETE_CONTACT, ADD_CONTACT } from '../queries';

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
    const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
    const [newContactData, setNewContactData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });


    const [deleteContact] = useMutation(DELETE_CONTACT);
    const [addContact] = useMutation(ADD_CONTACT);
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


            if (favoriteContacts.some((contact) => contact.id === id)) {
                const updatedFavoriteContacts = favoriteContacts.filter((contact) => contact.id !== id);
                setFavoriteContacts(updatedFavoriteContacts);
                localStorage.setItem('favoriteContacts', JSON.stringify(updatedFavoriteContacts));
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            // Handle error
        }
    };

    console.log(storedContacts, favoriteContacts, "data old")
    console.log(favoriteContacts, "datanew")
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

        const storedFavoriteContacts = localStorage.getItem('favoriteContacts');
        if (storedFavoriteContacts) {
            setFavoriteContacts(JSON.parse(storedFavoriteContacts));
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    //add favorite 
    const handleToggleFavorite = (id: number) => {
        const contactToToggle = storedContacts.find((contact) => contact.id === id);

        if (contactToToggle) {
            if (favoriteContacts.includes(contactToToggle)) {
                // Remove from favoriteContacts
                const updatedFavoriteContacts = favoriteContacts.filter((contact) => contact.id !== id);
                setFavoriteContacts(updatedFavoriteContacts);
                localStorage.setItem('favoriteContacts', JSON.stringify(updatedFavoriteContacts));

            } else {
                // Add to favoriteContacts and remove from contactList
                const updatedFavoriteContacts = [...favoriteContacts, contactToToggle];
                setFavoriteContacts(updatedFavoriteContacts);
                setStoredContacts(storedContacts.filter((contact) => contact.id !== id));
                localStorage.setItem('favoriteContacts', JSON.stringify(updatedFavoriteContacts));
            }
        }
    };


    //new contact
    const handleAddContact = async () => {
        try {
            const { firstName, lastName, phoneNumber } = newContactData;

            // Check if the contact name is unique and doesn't have special characters
            // const isNameValid = storedContacts.every(
            //     contact =>
            //         contact.first_name.toLowerCase() !== firstName.toLowerCase() &&
            //         /^[a-zA-Z\s]*$/.test(firstName) && /^[a-zA-Z\s]*$/.test(lastName)
            // );

            // if (!isNameValid) {
            //     console.error('Contact name must be unique and not contain special characters.');
            //     return;
            // }
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

    return (
        <>
            <div className='container'>
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
                <h1>Favorite</h1>
                {favoriteContacts.length > 0 && (
                    <ul className='list-item'>
                        {favoriteContacts.map((item, i) => (
                            <li key={i}>
                                <ContactList item={item} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />
                            </li>
                        ))}
                    </ul>
                )}

                <h1 style={{ color: "white" }}>contact list</h1>
                <ul className='list-item'>
                    {storedContacts.map((item, i) => {

                        return (
                            <li key={i}>
                                <ContactList item={item} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />
                            </li>
                        );
                    })}
                </ul>

            </div>

        </>
    );
};

export default Home;
