import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>\
      
    <CssBaseline />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>

    <App />

      <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

        </AuthProvider>
</QueryClientProvider>
  </React.StrictMode>,
);
