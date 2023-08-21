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
background-color: white;

`


export const Button = styled('button')`
background-color: #2185d0;
color: #ffffff;
text-shadow: none;
background-image: none;
padding: 0.6rem 1.5rem;
margin-left: 15px;
border-radius: 3px;
cursor: pointer;
@media (max-width: 778px) {
  margin-left: 0;
  margin-top: 10px;
}

`

export const LogoText = styled('h3')`
margin: 0;

`

export const HeaderSearchForm = styled('div')`
  margin-left: auto;
`;