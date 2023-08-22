import styled from '@emotion/styled';

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem; 
  gap: 1rem; /* Equivalent to space-x-4 */
`;

export const Image = styled.img`
  width: 2rem; /* Equivalent to w-8 */
  height: 2rem; /* Equivalent to h-8 */
  border-radius: 50%; /* Equivalent to rounded-full */
`;

export const TextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Name = styled.p`
  font-size: 0.875rem; /* Equivalent to text-sm */
  font-weight: 500; /* Equivalent to font-medium */
  color: #000; /* Equivalent to text-gray-900 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Phone = styled.p`
  font-size: 0.875rem;
  color: #6b7280; /* Equivalent to text-gray-500 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const IconButton = styled.div`
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
`;
export const Heading = styled.h1`
font-size: 24px;
font-weight: bold;
max-width: 800px;
color: white;
border-bottom: 2px solid white;
margin: 0 auto 20px; 
padding-bottom: 5px;
@media (max-width: 768px) {
  /* Mobile view */
  margin: 0 10px 20px; /* Center horizontally and add bottom margin */
}
`;

export const WrapperButton = styled.div`
  flex: 1;
  display: flex;
  padding-top: 0.875rem; /* 14px */
  padding-bottom: 0.875rem; /* 14px */
  @media (min-width: 640px) {
    padding-top: 1rem; /* Equivalent to sm:py-4 */
  }
  justify-content: end;
  align-items: center;
`;



export const ContactCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
background: linear-gradient(
  to right bottom,
  rgba(255, 255, 255, 0.1),
  rgba(255, 255, 255, 0.06)
);
border-top: 1px solid rgba(255, 255, 255, 0.3);
border-left: 1px solid rgba(255, 255, 255, 0.3);
border-right: 1px solid rgba(255, 255, 255, 0.1);
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
background-clip: padding-box;
backdrop-filter: blur(20px);
border-radius: 10px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  gap: 1rem;
`;


export const ContactsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: 20px;
  margin: 20px auto;
  max-width: 800px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Change to 2 columns for desktop */

  }
  @media (max-width: 600px) {
    padding: 20px 30px; /* Add padding left and right on mobile */
  }
`;







