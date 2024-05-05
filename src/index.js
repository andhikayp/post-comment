import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import ThemeProvider from 'react-bootstrap/ThemeProvider'


import './index.css';
import reportWebVitals from './reportWebVitals';
import { RootNavigation } from './root';

import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
        >
          <RootNavigation />
        </ThemeProvider>
      </React.StrictMode>
    </QueryClientProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
