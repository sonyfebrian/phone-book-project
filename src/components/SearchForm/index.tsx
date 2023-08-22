import React from 'react';
import { Container, Header, HeaderSearchForm, Input, } from './styled';
import styled from "@emotion/styled";

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  @media (max-width: 778px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;




interface Props {

    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<Props> = ({ query, setQuery }) => {
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    return (
        <>
            <Header>
                <HeaderContainer>

                    <HeaderSearchForm>
                        <Input
                            type="search"
                            placeholder="Search..."
                            value={query}
                            onChange={handleFilterChange}
                        />



                    </HeaderSearchForm>
                </HeaderContainer>
            </Header>

        </>

    );
};

export default SearchForm;