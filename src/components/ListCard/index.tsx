import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Icon from "@/assets/usericon.svg"
import { ContactsContainer, Heading, ContactCard, Image, Name, Phone, TextContainer, WrapperButton, IconButton } from './styled';

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phones: { number: string }[];
}



interface Props {
    filteredContacts: Contact[];
    onDelete: (id: number) => void;
    onToggleFavorite: (id: number) => void;
}

const ListCard: React.FC<Props> = ({ filteredContacts, onDelete, onToggleFavorite }) => {


    return (
        <>
            <Heading>My Contact</Heading>
            <ContactsContainer>

                {filteredContacts.map(contact => (
                    <ContactCard key={contact.id}>
                        <IconButton onClick={() => onToggleFavorite(contact.id)}>

                            <FaRegStar size={22} className=" text-white" />
                        </IconButton>

                        <Image src={Icon} alt="icon image" />
                        <TextContainer><Name>{contact.first_name} {contact.last_name}</Name>

                            {contact.phones.map(phone => (
                                <Phone key={phone.number}>{phone.number}</Phone>
                            ))}</TextContainer>

                        <WrapperButton> <IconButton onClick={() => onDelete(contact.id)}>

                            <MdDelete color="#FF6370" className="icon" style={{ zIndex: '1' }} />
                        </IconButton>
                        </WrapperButton>
                    </ContactCard>
                ))}
            </ContactsContainer>
        </>

    );
};

export default ListCard;