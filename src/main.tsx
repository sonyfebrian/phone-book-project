import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Global styles={globalStyles} />
      <App />
    </React.StrictMode>
  </ApolloProvider>
  ,
)
