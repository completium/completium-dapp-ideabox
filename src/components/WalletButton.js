import React from 'react';
import { useReady, useWallet } from '../dapp';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const WalletButton = (props) => {
  const ready = useReady();
  const wallet = useWallet();
  return ((ready) ? (
        <div></div>
      ) :(wallet ? (
          <Button color="secondary"
            disableElevation
            size="small"
            style={{ color: 'white', position: 'absolute', right: '160px' }}
            onClick={props.handleConnect}>
            connect to wallet
          </Button>
        ):(
          <Link href="https://templewallet.com/" rel="noopener" underline="none" style={{
            position: 'absolute',
            right: '160px'
          }}>
            <Button variant="contained" size="small" disableElevation
              style={{
                backgroundColor: '#ed8936',
                color: 'white',
                fontWeight: 'bold',
                }}>
              Install Temple
            </Button>
          </Link>
      )));
}

export default WalletButton;
