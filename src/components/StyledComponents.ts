import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;


export const Header = styled.header`
display: flex;
justify-content: space-evenly;
color: #fff;
background: linear-gradient(90deg, rgba(111,177,127,1) 0%, rgba(154,173,89,1) 100%);
padding: 2em 0;
align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ContactListStyle = styled.ul`
list-style-type: none;
padding: 0;
margin: 0;
`;

export const ContactItem = styled.li`
border: 1px solid #ddd;
margin-top: -1px; /* Prevent double borders */
background-color: #f6f6f6;
padding: 12px;
text-decoration: none;
font-size: 18px;
color: black;
display: block
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PaginationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;