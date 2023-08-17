import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}> <React.StrictMode>
    <App />
  </React.StrictMode></ApolloProvider>
  ,
)
