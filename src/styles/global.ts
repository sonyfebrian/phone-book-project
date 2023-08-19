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
  
  body {
    font-family: "Inter", sans-serif;
    background-color: #171b2f;
  }

  .icon {
    font-size: 29px;
    font-weight: bold;
  }
  .profile {
    width: 100%;
  max-width: 100px;
  height: auto;
  border-radius: 50%;
  }
  .container {
    padding: 0 20px; /* Default padding for both mobile and desktop */

    @media (min-width: 768px) {
      padding: 0 40px; /* Increased padding for desktop */
    }
  
    @media (min-width: 1200px) {
      padding: 0 80px; /* Even more padding for larger screens */
    }
  }

  .list-item {
    list-style: none; 
  }

  .list-item li{
    background: white;
    margin-top: 30px; 
    margin-bottom: 10px;
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
  z-index: 2;
  backdrop-filter: blur(20px);
  padding: 20px;
  padding-left: 40px;
  padding-right: 60px;
  }
`;