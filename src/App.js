import React from 'react';
import './App.css';
import { appTitle, appName, network } from './settings.js';
import HeaderBar from './components/HeaderBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';
import SnackMsg from './components/SnackMsg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function App() {
  const [viewSnack, setViewSnack] = React.useState(true);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          secondary: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff',
          }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar appTitle={appTitle}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + process.env.PUBLIC_URL + '/idea-box.svg' + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 10%',
          height: 500}}>
        {/* <ConnectWallet
          nbMiles={nbMiles}
          nextExpiration={nextExpiration}
          handleConnect={handleConnect}
          openViewMiles={openViewMiles}
          miles={miles}
          handleMiles={handleMiles} /> */}
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}> {/* {
            products.map(product =>
              <Grid item xs={4}>
                <Product
                  image={product.image}
                  title={product.title}
                  nbmiles={product.nbmiles}
                  state={productStates[product.pid]}
                  connected={ready}
                  contract={contract}
                  handleReceipt={handleReceipt}
                  openSnack={openSnack}>
                </Product>
              </Grid>
            )} */}
        </Grid>
      </Container>
      <Footer appName={appName}></Footer>
      {/* <ViewMiles open={viewMiles} onclose={closeViewMiles} theme={theme} miles={miles}/> */}
      <SnackMsg open={viewSnack} theme={theme}/>
    </ThemeProvider>

    </div>
  );
}

export default App;
