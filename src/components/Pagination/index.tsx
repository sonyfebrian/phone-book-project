import styled from '@emotion/styled';

export const Pagination = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;

@media (min-width: 768px) {
  flex-direction: row;
  justify-content: center; 
  align-items: center;
}
`;

export const LoadMoreButton = styled.button`
padding: 10px 20px;
border-radius: 10px;
background: linear-gradient(
  110deg,
  rgba(187, 20, 226),
  rgba(187, 20, 226),
  rgba(21, 32, 227)
);

border: none;
color: #f9f9f9;
font-weight: 500;
letter-spacing: 2px;
z-index: 3;
cursor: pointer;
transition: color 0.3s ease-in-out;

&:hover {
  color: #f9f9f9;
}
`;

export const PageInfo = styled.p`
font-size: 12px;
color: white;
margin: 10px 0;
z-index: 3;
`;

export const PaginationControlsContainer = styled.div`
width: 100%;
max-width: 600px; 
display: flex;
flex-direction: column;
align-items: center;
z-index: 3;
@media (min-width: 768px) {
  max-width: 50%; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
`;

export const ContactsPerPageContainer = styled.div`
display: flex;
align-items: center;
// margin-top: 10px;
z-index: 3;
label {
  margin-right: 10px;
  color:white
}

select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}
`;

export const BackToPageButton = styled.button`
padding: 10px 20px;

border-radius: 10px;
background: linear-gradient(
  110deg,
  rgba(187, 20, 226),
  rgba(187, 20, 226),
  rgba(21, 32, 227)
);

border: none;
color: #f9f9f9;
font-weight: 500;
letter-spacing: 2px;
z-index: 3;
cursor: pointer;
transition: color 0.3s ease-in-out;

&:hover {
  color: #f9f9f9;
}
`;
