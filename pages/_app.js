import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import { store } from '../services/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

let persistor = persistStore(store);

const theme = createTheme({
  palette: {
    type: "dark"
  }
});


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
    </Provider>
    </ThemeProvider>
  );
}

export default MyApp