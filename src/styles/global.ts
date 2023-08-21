import { css } from '@emotion/react'


export const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800&display=swap");

 
  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{overflow-x: hidden;}
  body {
    font-family: "Inter", sans-serif;
    background-color: #171b2f;
  }
  .cirlce1 {
    height: 20rem;
    width: 20rem;
    position: absolute;
    top: 50%;
    left: 73%;
  }
 
  .cirlce2 {
    height: 20rem;
    width: 20rem;
    position: absolute;
    top: 20%;
    left: 12%;
  }
 
`;