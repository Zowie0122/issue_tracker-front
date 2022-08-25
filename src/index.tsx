import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import './style/index.css';
import store from './store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#142850',
      light: '#92A9BD',
    },
    secondary: {
      light: '#F4F9F9',
      main: '#EEEEEE',
      dark: '#7F7C82',
    },
  },

  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Open Sans', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
