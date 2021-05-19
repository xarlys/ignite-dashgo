import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import { ReactQueryDevtools } from 'react-query/devtools';

import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

import { QueryClientProvider } from 'react-query';
import { makeServer } from '../services/mirage';
import { queryClient } from "../services/queryClient";


if(process.env.NODE_ENV === 'development'){
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
       <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>   
  )
}

export default MyApp