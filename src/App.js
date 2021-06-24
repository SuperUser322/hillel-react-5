import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryClientProvider } from "react-query";

import store from "./services/store";
import history from "./services/history";
import queryClient from "./services/queryClient";
import { AppContainer } from "./AppContainer";
import "./shared/styles/main.scss";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer
            history={history}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
