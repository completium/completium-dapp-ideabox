import React from 'react';
import './App.css';
import { appTitle, appName, contractAddress, network } from './settings.js';
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
import { /* compressToBase64, decompressFromBase64, */ decompressFromUint8Array } from 'lz-string'
import { DAppProvider, useReady, useConnect, useAccountPkh } from './dapp';
import { Tezos } from '@taquito/taquito';

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
      <React.Suspense fallback={null}>
        <PageRouter />
      </React.Suspense>
    </DAppProvider>
  );
}

/* function compressAll (ideas) {
  ideas.forEach(idea => {
    console.info(idea.id);
    console.info(compressToBase64(idea.title));
    console.info(compressToBase64(idea.desc));
  });
}

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

  const [contract, setContract] = React.useState(null);
  const [storage, setStorage] = React.useState({ status: false, ideas: [], votes: [] });

  const handleConnect = React.useCallback(async () => {
    try {
      await connect(network);
    } catch (err) {
      alert(err.message);
    };
  }, [connect]);

  const [viewSnack, setViewSnack] = React.useState(false);
  const [ideaForm, setIdeaForm]   = React.useState(false);
  const [ideaSort, setIdeaSort]   = React.useState('');

  async function loadIdeaxBoxContent () {
    try {
      Tezos.setProvider({rpc: 'https://testnet-tezos.giganode.io/'});
      var contract  = await Tezos.contract.at(contractAddress);
      var cstorage   = await contract.storage();
      var ids = [];
      cstorage.idea.forEach((i, k, m) => {
        ids.push({
          id:       k,
          title:    (k !== "8" && k !== "2" && k !== "3")? decompressFromUint8Array(fromHexString(i.title)):"title",
          desc:     (k !== "2" && k !== "4" && k !== "7")? decompressFromUint8Array(fromHexString(i.desc)):"desc",
          author:   i.author,
          nbvotes:  parseInt(0+i.nbvotes,10),
          creation: (i.creation+'').substring(0,10),
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
        votes: votes
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  if (storage.ideas.length === 0) {
    loadIdeaxBoxContent().then(console.log('content loaded'));
  }

  function isVoter () {
    return accountAddress in storage.votes
  }

  //var ideas = decompressAll(mockupIdeas)
  //ideas = SortIdeas(ideas,ideaSort);

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
      ideas: SortIdeas(storage.ideas,sort)
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
      <HeaderBar appTitle={appTitle} handleConnect={handleConnect} />
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + process.env.PUBLIC_URL + '/idea-box.svg)',
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 10%',
          height: 410}}>
        { (ready)? (<Account account={accountAddress}  isvoter={isVoter()} nbvotes={storage.votes[accountAddress]}/>):(<div />) }
        </Container>
        <Container maxWidth="md">
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}>
          <Grid item xs={12}>
            <Chip
              label={"Box " + contractAddress + ((storage.status) ? " is active" : "is closed") }
              color={ (storage.status) ? "secondary" : "default" }
              clickable
              onDelete={() => {}}
              deleteIcon={ (storage.status) ? <DoneIcon /> : <ClearIcon />}
              variant="outlined"
            />
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
      <IdeaForm open={ideaForm} onclose={closeIdeaForm} theme={theme} account={"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"}/>
      <SnackMsg open={viewSnack} theme={theme}/>
    </ThemeProvider>

    </div>
  );
}

export default App;
