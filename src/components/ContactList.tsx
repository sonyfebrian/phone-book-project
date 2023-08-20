import React from 'react';
// import {  useMutation, gql } from '@apollo/client';
// import { GET_CONTACT_LIST, DELETE_CONTACT, ADD_CONTACT, } from '../queries';
// import {
//     Container,
//     SearchInput,
//     ContactListStyle,
//     ContactItem,
//     Button,
//     // PaginationButtons,
//     Header,
// } from './StyledComponents';
import { Col, Row, ContactInfoCol, ContactName, ContactPhone, IconButton } from '../styles/card';
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";


interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phones: { number: string }[];
}

interface Props {
    item: Contact;
    onDelete: (id: number) => void;
    onToggleFavorite: (id: number) => void;

}

const ContactList: React.FC<Props> = ({ item, onDelete, onToggleFavorite, }) => {
    // const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
    // const [contactList, setContactList] = useState<Contact[]>([])
    // console.log(favoriteContacts, "favorit props")

    // console.log(contactList, "contact props")


    // const handleToggleFavorite = (id: number) => {
    //     const contactToToggle = item;

    //     if (contactToToggle) {
    //         if (favoriteContacts.includes(contactToToggle)) {
    //             setFavoriteContacts(favoriteContacts.filter((contact) => contact.id !== id));
    //         } else {
    //             setFavoriteContacts([...favoriteContacts, contactToToggle]);
    //             setContactList(contactList.filter((contact) => contact.id !== id));
    //         }
    //     }
    // };
    // const { loading, error, data, fetchMore } = useQuery<ContactData>(GET_CONTACT_LIST);

    // const [storedContacts, setStoredContacts] = useState<Contact[]>([]);

    //mutation
    // const [deleteContact] = useMutation(DELETE_CONTACT);
    // const [addContact] = useMutation(ADD_CONTACT);
    // const [newContactData, setNewContactData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     phoneNumber: '',
    // });
    // const [offset, setOffset] = useState<number>(0);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const contactsPerPage = 10;

    // const mergedContacts = [...storedContacts, ...(data?.contact || [])];
    // console.log(searchTerm, "data grap")


    // useEffect(() => {
    //     const storedData = localStorage.getItem('contactList');
    //     if (storedData) {
    //         setStoredContacts(JSON.parse(storedData));
    //     }
    // }, []);

    // useEffect(() => {
    //     if (data?.contact) {
    //         localStorage.setItem('contactList', JSON.stringify(data.contact));
    //         setStoredContacts(data.contact);
    //     }
    // }, [data]);

    //load more funct
    // const loadMore = () => {
    //     fetchMore({
    //         variables: {
    //             offset: offset + 10,
    //         },
    //         updateQuery: (prev, { fetchMoreResult }) => {
    //             if (!fetchMoreResult) return prev;
    //             return {
    //                 contact: [...prev.contact, ...fetchMoreResult.contact],
    //             };
    //         },
    //     });
    //     setOffset(offset + 10);
    // };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    //delete func
    // const handleDeleteContact = async (id: number) => {
    //     try {
    //         await deleteContact({
    //             variables: { id },
    //             update: (cache) => {
    //                 const updatedContacts = storedContacts.filter(contact => contact.id !== id);
    //                 setStoredContacts(updatedContacts);
    //                 localStorage.setItem('contactList', JSON.stringify(updatedContacts));

    //                 cache.writeQuery({
    //                     query: GET_CONTACT_LIST,
    //                     data: {
    //                         contact: updatedContacts,
    //                     },
    //                 });
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error deleting contact:', error);
    //     }
    // };

    //add func
    // const handleAddContact = async () => {
    //     try {
    //         const { firstName, lastName, phoneNumber } = newContactData;

    //         // Check if the contact name is unique and doesn't have special characters
    //         const isNameValid = storedContacts.every(
    //             contact =>
    //                 contact.first_name.toLowerCase() !== firstName.toLowerCase() &&
    //                 /^[a-zA-Z\s]*$/.test(firstName) && /^[a-zA-Z\s]*$/.test(lastName)
    //         );

    //         if (!isNameValid) {
    //             console.error('Contact name must be unique and not contain special characters.');
    //             return;
    //         }
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


    //serach
    // const filteredContacts = mergedContacts.filter(contact =>
    //     contact.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // const indexOfLastContact = currentPage * contactsPerPage;
    // const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    // const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <>
            <Row>
                <Col>
                    <div className='icon'>
                        <IconButton onClick={() => onToggleFavorite(item.id)}>
                            Add to Favorites
                            <FaStar size={22} className=" text-white" />
                        </IconButton>

                        <FaRegStar
                            size={26}
                            className=" text-white"
                            style={{ opacity: "65%" }}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='profile'>
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-10 h-10"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </Col>
                <ContactInfoCol >
                    <ContactName>{item.last_name} {item.last_name}</ContactName>
                    {item.phones.map((phone, index) => (
                        <ContactPhone key={index}>{phone.number}</ContactPhone>
                    ))}

                </ContactInfoCol>
                <Col>
                    <IconButton onClick={() => onDelete(item.id)}>
                        Add to Favorites
                        <MdDelete color="#FF6370" className="icon" style={{ zIndex: '1' }} />
                    </IconButton>
                    <IconButton>
                        <MdEdit className="icon" color="#54eafe" />
                    </IconButton>
                </Col>
            </Row>

            {/* <Container>
                <Header>  <h2>Contact List</h2>
                    <SearchInput
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Header>

                <ContactListStyle>  <ul>
                    {filteredContacts.map(contact => (
                        <ContactItem key={`contact-${contact.id}`}>
                            {contact.first_name} {contact.last_name}
                            <Button onClick={() => handleDeleteContact(contact.id)}>Delete</Button>
                            <ul>
                                {contact.phones.map((phone, index) => (
                                    <li key={`contact-${contact.id}-phone-${index}`}>{phone.number}</li>
                                ))}
                            </ul>
                        </ContactItem>
                    ))}
                </ul></ContactListStyle>


                <ul>
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
        </ul>
                <button onClick={loadMore}>Load More</button>
                <PaginationButtons>
                    <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous Page
                    </Button>
                    <Button onClick={() => paginate(currentPage + 1)} disabled={currentContacts.length < contactsPerPage}>
                        Next Page
                    </Button>
                </PaginationButtons>
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
            </Container> */}
        </>

    );
};

export default ContactList;
