import { makeStyles, ThemeProvider } from '@material-ui/core';
import { theme } from './styles';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { Context } from './context/context';
import { useRouters } from './routes';
import React, { useEffect, useState } from 'react';

function App() {
  const { login, token, logout } = useAuth();

  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const routes = useRouters(isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Context.Provider value={{ token, login, logout }}>
            {isAuthenticated && <Redirect to={'/all'} />}
            {!isAuthenticated && <Redirect to={'/login'} />}

            <div className={classes.test}>{routes}</div>
          </Context.Provider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    background: '#0D1118'
  },
  test: {
    height: '100%',
    width: '100%'
  }
});

export default App;
