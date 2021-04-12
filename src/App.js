import React from 'react';
import './App.css';
import { appTitle, appName, SettingsProvider, useSettingsContext } from './settings.js';
import HeaderBar from './components/HeaderBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';
import SnackMsg from './components/SnackMsg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Idea from './components/Idea';
import AddIdea from './components/AddIdea';
import IdeaForm from './components/IdeaForm';
import SortIdea from './components/SortIdea';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Account from './components/Account';
import LinearProgress from '@material-ui/core/LinearProgress';
import { /* compressToBase64, decompressFromBase64, */ decompressFromUint8Array/* , compressToUint8Array */ } from 'lz-string'
import { DAppProvider, useReady, useConnect, useAccountPkh } from './dapp';
import { TezosToolkit } from '@taquito/taquito';
import Link from '@material-ui/core/Link';
import { SettingsPanel } from './components/Settings';

function SortIdeas(ideas, by) {
  var newideas = ideas.sort((i1, i2) => {
    if (by === 'sort by votes') {
      return i2.nbvotes - i1.nbvotes;
    } else if (by === 'sort by creation') {
      return i2.creation - i1.creation;
    } else if (by === 'sort by author') {
      return i2.author - i1.author;
    } else if (by === 'sort by id') {
      return i1.id - i2.id;
    } else {
      return true;
    }
  });
  return newideas;
}

function App() {
  return (
    <DAppProvider appName={appName}>
      <SettingsProvider>
      <React.Suspense fallback={null}>
        <PageRouter />
      </React.Suspense>
      </SettingsProvider>
    </DAppProvider>
  );
}

/* const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

function compressAll (ideas) {
  ideas.forEach(idea => {
    console.info(idea.id);
    console.info(toHexString(compressToUint8Array(idea.title)));
    console.info(toHexString(compressToUint8Array(idea.desc)));
  });
} */
/*
function decompressAll (ideas) {
  return ideas.map(idea => { return {
      id : idea.id,
      title: decompressFromBase64(idea.title),
      desc: decompressFromBase64(idea.desc),
      author: idea.author,
      creation: idea.creation
  }});
} */

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

function PageRouter() {
  const ready = useReady();
  const connect = useConnect();
  const accountAddress = useAccountPkh();
  const { settings, getBcdUrl } = useSettingsContext();

/*   compressAll(mockupIdeas);
 */
  const [contract, setContract] = React.useState(null);
  const [storage, setStorage] = React.useState({ status: false, ideas: [], votes: [] });

  const handleConnect = React.useCallback(async () => {
    try {
      await connect(settings.network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect]);

  const [viewSnack, setViewSnack] = React.useState(false);
  const [ideaForm, setIdeaForm]   = React.useState(false);
  const [ideaSort, setIdeaSort]   = React.useState('');

  const clearStorage = () => {
    setStorage({ status: false, ideas: [], votes: [] });
  }

  async function loadIdeaxBoxContent () {
    try {
      const Tezos = new TezosToolkit(settings.endpoint);
      var contract  = await Tezos.contract.at(settings.contract);
      var cstorage   = await contract.storage();
      var winners = [];
      cstorage.selected.forEach(w => winners.push(parseInt(0+w)));
      var ids = [];
      cstorage.idea.forEach((i, k, m) => {
        ids.push({
          id:       k,
          title:    decompressFromUint8Array(fromHexString(i.title)),
          desc:     decompressFromUint8Array(fromHexString(i.desc)),
          author:   i.author,
          nbvotes:  parseInt(0+i.nbvotes,10),
          creation: (i.creation+'').substring(0,10),
          winner:   winners.includes(parseInt(k))
        });
      });
      var votes = [];
      cstorage.voter.forEach((v,k,m) => {
        votes[k] = parseInt(0+v,10)
      });
      ids = SortIdeas(ids,'sort by creation');
      console.log(ids);
      setStorage({
        status: (0+cstorage._state === '00'),
        ideas: ids,
        votes: votes,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  if (storage.ideas.length === 0) {
    loadIdeaxBoxContent().then(console.log('content loaded'));
  }

  function isVoter () {
    if (storage.votes === undefined) {
      return false;
    } else {
      return accountAddress in storage.votes
    }
  }

  //var ideas = decompressAll(mockupIdeas)
  //ideas = SortIdeas(ideas,ideaSort);

  const prefersDarkMode = false; /*useMediaQuery('(prefers-color-scheme: dark)');*/
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

  const handleAddIdea = () => {
    setIdeaForm(true);
  }

  const closeIdeaForm = () => {
    setIdeaForm(false);
  }

  const handleSort = (sort) => {
    setIdeaSort(sort);
    setStorage({
      status: storage.status,
      ideas: SortIdeas(storage.ideas,sort),
      votes: storage.votes,
    })
  }

  const handleReceipt = () => {
    setViewSnack(false);
    loadIdeaxBoxContent().then(console.log('content loaded'));
  }

  const openSnack = () => {
    setViewSnack(true);
  }

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar theme={theme} appTitle={appTitle} handleConnect={handleConnect} />
      <Container maxWidth="md" style={{
          height: 120}}>
        { (ready)? (
            <Account account={accountAddress}  isvoter={isVoter()} nbvotes={storage.votes[accountAddress]}/>
          ):(
            <div style={{
              height: 500,
             /*  backgroundImage : "url(" + process.env.PUBLIC_URL + '/idea-box.svg)',
              backgroundRepeat  : 'no-repeat',
              backgroundPosition: 'right 50% top 10%', */}} />
          )
        }
        </Container>
        <Container maxWidth="md">
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}>
          <Grid item xs={12}>
            <Link href={getBcdUrl() + "/operations"} rel="noopener" underline="none" target="_blank">
            <Chip
              label={"Box " + settings.contract + ((storage.status) ? " is active" : " is closed") }
              color={ (storage.status) ? "secondary" : "default" }
              clickable
              onDelete={() => {}}
              deleteIcon={ (storage.status) ? <DoneIcon /> : <ClearIcon />}
              variant="outlined"
            />
            </Link>
          </Grid>
          { (storage.ideas.length === 0) ?(
              <Grid item xs={12}>
                <LinearProgress color="secondary" style={{ marginTop: 60 }}/>
              </Grid>
            ):(
              <Grid item >
                <SortIdea onClick={handleSort}/>
              </Grid>
            )
          }
          {
            storage.ideas.map(idea =>
              <Grid item xs={12}>
                <Idea
                  id={idea.id}
                  title={idea.title}
                  desc={idea.desc}
                  author={idea.author}
                  creation={idea.creation}
                  nbvotes={idea.nbvotes}
                  winner={idea.winner}
                  boxopen={storage.status && ready && isVoter()}
                  openSnack={openSnack}
                  handleReceipt={handleReceipt}>
                </Idea>
              </Grid>
            )}
        </Grid>
      </Container>
      { (storage.status && ready && isVoter() && (!viewSnack)) ? <AddIdea onClick={handleAddIdea}/> : <div/> }
      <Footer appName={appName}></Footer>
      <IdeaForm
        open={ideaForm}
        onclose={closeIdeaForm}
        theme={theme}
        account={accountAddress}
        openSnack={openSnack}
        handleReceipt={handleReceipt}
      />
      <SettingsPanel clearStorage={ clearStorage }/>
      <SnackMsg open={viewSnack} theme={theme}/>
    </ThemeProvider>

    </div>
  );
}

export default App;
