import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 0 20px; 

  @media (min-width: 768px) {
    padding: 0 40px; 
  }

  @media (min-width: 1200px) {
    padding: 0 80px; 
  }
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

export const Col = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContactInfoCol = styled.div`
  flex: 8;
  cursor: pointer;
`;

export const ContactName = styled.div`

  font-weight: 500;
  font-size: 20px;
  color: white;
  text-transform: capitalize;
  letter-spacing: 1px;
`;

export const ContactPhone = styled.div`
  opacity: 0.8;
  font-weight: 400;
  font-size: 16px;
  color: #f9f9f9;
  text-transform: capitalize;
  letter-spacing: 1px;
  margin-top: 5px;
`;


export const IconButton = styled.div`
  display: inline-block;
  margin-right: 10px;
`;
