import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 600px;
  @media (max-width: 600px) {
    padding: 20px 30px; /* Add padding left and right on mobile */
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 5px;
  color: white
`;

export const Card = styled.div`
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
  border-radius: 10px !important;

  backdrop-filter: blur(20px);

  padding-bottom: 70px;
  padding-left: 80px;
  padding-right: 80px;
  padding: 20px;
  width: 100%;
  z-index: 2;
  margin-bottom: 20px;

`;


export const Input = styled.input`
  font-weight: 400;
  outline: none !important;
  border-radius: 8px !important;
  box-shadow: none;
margin-top:10px;
margin-bottom:10px;
  width: 100%;
  color: #f9f9f9;
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: white;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.06)
  );
  border-top: 2px solid rgba(255, 255, 255, 0.5);
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  background-clip: padding-box;
  border-radius: 10px !important;

  backdrop-filter: blur(40px);

 
`;

export const Button = styled.button`
padding: 10px 20px;
border-radius: 10px;
background: linear-gradient(
  110deg,
  rgba(187, 20, 226),
  rgba(187, 20, 226),
  rgba(21, 32, 227)
);
display: flex;
justify-content: center;
align-items: center;
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

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* Add gap between buttons if desired */
`;

