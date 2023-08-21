import React from 'react';
import { FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Icon from "@/assets/usericon.svg"
import { ContactsContainer, ContactCard, Image, Name, Phone, TextContainer, WrapperButton, IconButton } from './styled';

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phones: { number: string }[];
}



interface Props {
    favoriteContacts: Contact[];
    onDelete: (id: number) => void;
    onToggleFavorite: (id: number) => void;
}
const FavoriteCard: React.FC<Props> = ({ favoriteContacts, onDelete, onToggleFavorite }) => {


    return (
        <>
            <ContactsContainer>
                {favoriteContacts.map(contact => (
                    <ContactCard key={contact.id}>


                        <FaStar
                            onClick={() => onToggleFavorite(contact.id)}
                            size={26}
                            className=" text-white"
                            style={{ opacity: "65%" }}
                        />
                        <Image src={Icon} alt="icon image" />
                        <TextContainer><Name>{contact.first_name} {contact.last_name}</Name>

                            {contact.phones.map(phone => (
                                <Phone key={phone.number}>{phone.number}</Phone>
                            ))}</TextContainer>

                        <WrapperButton> <IconButton onClick={() => onDelete(contact.id)}>

                            <MdDelete color="#FF6370" className="icon" style={{ zIndex: '1' }} />
                            <MdEdit className="icon" color="#54eafe" />
                        </IconButton>
                        </WrapperButton>
                    </ContactCard>
                ))}
            </ContactsContainer>
        </>
    );
};

export default FavoriteCard;