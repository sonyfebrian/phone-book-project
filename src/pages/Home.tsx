
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, } from '@apollo/client'
import Swal from 'sweetalert2';
import useLocalStorage from '@/hooks/useLocalStorage';
import blob1 from "@/assets/blob1.svg"
import ListCard from '@/components/ListCard';
import SearchForm from '@/components/SearchForm';
import FavoriteCard from '@/components/FavoriteCard';
import ButtonFloating from '@/components/Button';
import { Container, Card, Input, Button, ButtonsContainer } from '@/components/ContactForm';
import { Pagination, PaginationControlsContainer, LoadMoreButton, PageInfo, BackToPageButton, ContactsPerPageContainer } from '@/components/Pagination';
import { GET_CONTACT_LIST } from '@/graphql/queries';
import { ADD_CONTACT, DELETE_CONTACT } from '@/graphql/mutations';





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
    // State
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
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
    const [showForm, setShowForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // GraphQL queries and mutations
    const { loading, error, data } = useQuery<ContactData>(GET_CONTACT_LIST, {
        variables: { limit, offset },
    });
    const [deleteContact] = useMutation(DELETE_CONTACT);
    const [addContact] = useMutation(ADD_CONTACT);


    // Effects
    useEffect(() => {
        if (data && data.contact) {
            setStoredContacts(data.contact);
        }
    }, [data, setStoredContacts]);

    // Event Handlers
    const handleDeleteContact = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Contact',
                text: 'Are you sure you want to delete this contact?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                await deleteContact({ variables: { id } });

                setStoredContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));

                if (favoriteContacts.some(contact => contact.id === id)) {
                    const updatedFavoriteContacts = favoriteContacts.filter(contact => contact.id !== id);
                    setFavoriteContacts(updatedFavoriteContacts);
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The contact has been deleted.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error deleting contact: ' + error
            });
        }
    };

    const fetchMoreContacts = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    const updateLimit = (newLimit: number) => {
        setLimit(newLimit);
        setOffset(0);
    };


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

    const handleClick = () => {
        setShowForm(prevShowForm => !prevShowForm);
        setFormSubmitted(false);
    };

    const handleAddContact = async () => {
        try {
            const { firstName, lastName, phoneNumber, phoneNumber1, phoneNumber2 } = newContactData;


            const isNameValid = storedContacts.every(
                contact =>
                    contact.first_name.toLowerCase() !== firstName.toLowerCase() &&
                    /^[a-zA-Z\s]*$/.test(firstName) && /^[a-zA-Z\s]*$/.test(lastName)
            );

            if (!isNameValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contact name must be unique and not contain special characters.'
                });
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
                Swal.fire({
                    icon: 'success',
                    title: 'Contact Added',
                    text: 'New contact has been successfully added!',
                    confirmButtonText: 'OK'
                });
                setFormSubmitted(true);
            }
        } catch (error) {



            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error adding new contact: ' + error
            });
        }
    };

    // Filtering
    const filteredContacts = storedContacts.filter(contact =>
        contact.first_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(query.toLowerCase())
    );

    // Rendering
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>


            <SearchForm setQuery={setQuery} query={query} />

            <img src={blob1} alt="blob1" className="cirlce1" />

            <ButtonFloating onClick={handleClick} />
            {showForm && !formSubmitted ? (<Container>
                <Card>

                    <Input
                        type="text"
                        placeholder="Input Your First Name.."
                        value={newContactData.firstName}
                        onChange={(e) => setNewContactData({ ...newContactData, firstName: e.target.value })}
                    />

                    <Input
                        type="text"
                        placeholder="Input Your Last Name.."
                        value={newContactData.lastName}
                        onChange={(e) => setNewContactData({ ...newContactData, lastName: e.target.value })}
                    />


                    <Input
                        type="text"
                        placeholder="Input Your Phone Number.."
                        value={newContactData.phoneNumber}
                        onChange={(e) => setNewContactData({ ...newContactData, phoneNumber: e.target.value })}
                    />



                    <Input
                        type="text"
                        placeholder="Input Your Phone Number 2.."
                        value={newContactData.phoneNumber1}
                        onChange={e => setNewContactData({ ...newContactData, phoneNumber1: e.target.value })}
                    />


                    <Input
                        type="text"
                        placeholder="Input Your Phone Number 3.."
                        value={newContactData.phoneNumber2}
                        onChange={e => setNewContactData({ ...newContactData, phoneNumber2: e.target.value })}
                    />
                    <ButtonsContainer>
                        <Button onClick={handleAddContact}>Add Contact</Button>
                        <Button onClick={handleClick}>Cancel</Button>
                    </ButtonsContainer>
                </Card>

            </Container>) : <>

                {favoriteContacts.length > 0 && (
                    <FavoriteCard favoriteContacts={favoriteContacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />
                )}


                <ListCard filteredContacts={filteredContacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />

                <Pagination>
                    <PaginationControlsContainer>
                        <LoadMoreButton onClick={fetchMoreContacts}>Load More</LoadMoreButton>
                        <PageInfo>
                            Showing {offset + 1} - {Math.min(offset + limit, filteredContacts.length)} contacts
                        </PageInfo>
                        <ContactsPerPageContainer>
                            <label>Contacts per page: </label>
                            <select value={limit} onChange={e => updateLimit(Number(e.target.value))}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                {/* Add more options as needed */}
                            </select>
                            <BackToPageButton onClick={() => setOffset(0)}>Back to Page 1</BackToPageButton>
                        </ContactsPerPageContainer>
                    </PaginationControlsContainer>
                </Pagination>

            </>}

            {/* 
            <h1>Favorite</h1>
            {favoriteContacts.length > 0 && (

                <FavoriteCard favoriteContacts={favoriteContacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />

            )}

            <h1 style={{ color: "white" }}>contact list</h1>
            <ListCard filteredContacts={filteredContacts} onDelete={handleDeleteContact} onToggleFavorite={handleToggleFavorite} /> */}
        </>
    );
};

export default Home;
