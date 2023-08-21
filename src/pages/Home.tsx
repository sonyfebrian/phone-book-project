
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, } from '@apollo/client'
import { GET_CONTACT_LIST, DELETE_CONTACT, ADD_CONTACT } from '../queries';
// import blob1 from "../assets/blob1.svg"
// import blob2 from "../assets/blob2.svg"
import useLocalStorage from '@/hooks/useLocalStorage';
import ListCard from '@/components/ListCard';
import SearchForm from '@/components/SearchForm';
import FavoriteCard from '@/components/FavoriteCard';
import { Container, Card, Input, Button } from '@/components/ContactForm';



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
    const [storedContacts, setStoredContacts] = useLocalStorage<Contact[]>('storedContacts', []);
    const [favoriteContacts, setFavoriteContacts] = useLocalStorage<Contact[]>('favoriteContacts', []);
    const [newContactData, setNewContactData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        phoneNumber1: '',
        phoneNumber2: ''

    });
    const [query, setQuery] = useState<string>("")


    const [deleteContact] = useMutation(DELETE_CONTACT);
    const [addContact] = useMutation(ADD_CONTACT);

    useEffect(() => {
        if (data && data.contact) {
            setStoredContacts(data.contact);
        }
    }, [data, setStoredContacts]);

    const handleDeleteContact = async (id: number) => {
        try {
            await deleteContact({ variables: { id } });

            setStoredContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));

            if (favoriteContacts.some(contact => contact.id === id)) {
                const updatedFavoriteContacts = favoriteContacts.filter(contact => contact.id !== id);
                setFavoriteContacts(updatedFavoriteContacts);
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    console.log(storedContacts, favoriteContacts, "data old")
    console.log(favoriteContacts, "datanew")




    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;



    const handleToggleFavorite = (id: number) => {
        const contactToToggle = storedContacts.find(contact => contact.id === id);

        if (contactToToggle) {
            if (favoriteContacts.includes(contactToToggle)) {
                const updatedFavoriteContacts = favoriteContacts.filter(contact => contact.id !== id);
                setFavoriteContacts(updatedFavoriteContacts);
            } else {
                const updatedFavoriteContacts = [...favoriteContacts, contactToToggle];
                setFavoriteContacts(updatedFavoriteContacts);
                setStoredContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
            }
        }
    };


    //new contact
    // const handleAddContact = async () => {
    //     try {
    //         const { firstName, lastName, phoneNumber } = newContactData;

    //         // Check if the contact name is unique and doesn't have special characters
    //         // const isNameValid = storedContacts.every(
    //         //     contact =>
    //         //         contact.first_name.toLowerCase() !== firstName.toLowerCase() &&
    //         //         /^[a-zA-Z\s]*$/.test(firstName) && /^[a-zA-Z\s]*$/.test(lastName)
    //         // );

    //         // if (!isNameValid) {
    //         //     console.error('Contact name must be unique and not contain special characters.');
    //         //     return;
    //         // }
    //         const response = await addContact({
    //             variables: {
    //                 first_name: firstName,
    //                 last_name: lastName,
    //                 phones: [{ number: phoneNumber }],
    //             },
    //             update: (cache, { data }) => {
    //                 if (data && data.insert_contact) {
    //                     const newContact = data.insert_contact.returning[0];

    //                     // Update the cache to include the new contact
    //                     cache.modify({
    //                         fields: {
    //                             contact(existingContacts = []) {
    //                                 const newContactRef = cache.writeFragment({
    //                                     data: newContact,
    //                                     fragment: gql`
    //                                         fragment NewContact on Contact {
    //                                             id
    //                                             first_name
    //                                             last_name
    //                                             phones {
    //                                                 number
    //                                             }
    //                                         }
    //                                     `,
    //                                 });

    //                                 return [...existingContacts, newContactRef];
    //                             },
    //                         },
    //                     });

    //                     // Update local state and storage
    //                     setStoredContacts(prevContacts => [...prevContacts, newContact]);
    //                     localStorage.setItem('contactList', JSON.stringify([...storedContacts, newContact]));
    //                 }
    //             },
    //         });

    //         console.log('New contact added:', response);

    //         // Reset form fields
    //         setNewContactData({
    //             firstName: '',
    //             lastName: '',
    //             phoneNumber: '',
    //         });
    //     } catch (error) {
    //         console.error('Error adding new contact:', error);
    //     }
    // };
    const handleAddContact = async () => {
        try {
            const { firstName, lastName, phoneNumber, phoneNumber1, phoneNumber2 } = newContactData;


            const isNameValid = storedContacts.every(
                contact =>
                    contact.first_name.toLowerCase() !== firstName.toLowerCase() &&
                    /^[a-zA-Z\s]*$/.test(firstName) && /^[a-zA-Z\s]*$/.test(lastName)
            );

            if (!isNameValid) {
                console.error('Contact name must be unique and not contain special characters.');
                return;
            }

            if (phoneNumber === phoneNumber1 || phoneNumber === phoneNumber2 || phoneNumber1 === phoneNumber2) {
                console.error('Phone numbers must be unique.');
                return;
            }

            const response = await addContact({
                variables: {
                    first_name: firstName,
                    last_name: lastName,
                    phones: [
                        { number: phoneNumber },
                        { number: phoneNumber1 },
                        { number: phoneNumber2 }
                    ],
                },
            });

            if (response.data && response.data.insert_contact) {
                const newContact = response.data.insert_contact.returning[0];


                setStoredContacts(prevContacts => [...prevContacts, newContact]);


                setNewContactData({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    phoneNumber1: '',
                    phoneNumber2: ''
                });
            }
        } catch (error) {
            console.error('Error adding new contact:', error);
        }
    };
    const filteredContacts = storedContacts.filter(contact =>
        contact.first_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(query.toLowerCase())
    );


    console.log(filteredContacts, "data pencarian")

    return (
        <>


            <SearchForm setQuery={setQuery} query={query} />

            {/* <img src={blob1} alt="blob1" className="cirlce1" />
                <img src={blob2} alt="blob2" className="cirlce2" /> */}

            <Container>
                <Card>
                    <label>First Name: </label>
                    <Input
                        type="text"
                        value={newContactData.firstName}
                        onChange={(e) => setNewContactData({ ...newContactData, firstName: e.target.value })}
                    />
                    <label>Last Name: </label>
                    <Input
                        type="text"
                        value={newContactData.lastName}
                        onChange={(e) => setNewContactData({ ...newContactData, lastName: e.target.value })}
                    />
                    <div>
                        <label>Phone Number: </label>
                        <Input
                            type="text"
                            value={newContactData.phoneNumber}
                            onChange={(e) => setNewContactData({ ...newContactData, phoneNumber: e.target.value })}
                        />
                    </div>

                    <Input
                        type="text"
                        placeholder="Phone Number 2"
                        value={newContactData.phoneNumber1}
                        onChange={e => setNewContactData({ ...newContactData, phoneNumber1: e.target.value })}
                    />
                    <Input
                        type="text"
                        placeholder="Phone Number 3"
                        value={newContactData.phoneNumber2}
                        onChange={e => setNewContactData({ ...newContactData, phoneNumber2: e.target.value })}
                    />
                    <Button onClick={handleAddContact}>Add Contact</Button>
                </Card>

            </Container>

            <h1>Favorite</h1>
            {favoriteContacts.length > 0 && (

                <FavoriteCard favoriteContacts={favoriteContacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />

            )}

            <h1 style={{ color: "white" }}>contact list</h1>
            <ListCard filteredContacts={filteredContacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />
        </>
    );
};

export default Home;
