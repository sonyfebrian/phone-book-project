import styled from '@emotion/styled';

export const Input = styled('input')`
  outline: 0;
  padding: 0.6rem 1rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  min-width: 280px;
  
  &:focus,
  &:active {
    border-color: #85b7d9;
  }
  @media (max-width: 778px) {
    margin-top: 10px;
  }

`;

export const Container = styled('div')`
max-width: 960px;
padding: 15px;
margin: 0 auto;

`;

export const Header = styled('header')`
background-color: #171b2f;


`



export const HeaderSearchForm = styled('div')`
margin: 0 auto;
`;