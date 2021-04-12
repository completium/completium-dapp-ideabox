import { useState } from 'react';
import constate from "constate";

export function useSettings() {

  const [settings,setState] = useState({
    network  : 'edo2net',
    endpoint : 'https://edonet.smartpy.io',
    contract : 'KT1QNURPMuFJSmTLRttRutb4gfJ6NS4BfsM6',
    show     : false,
  });

  const setNetwork = (nw) => { setState((s) => {
      return { ...s, network: nw };
    });
  }

  const setEndpoint = (ep) => { setState((s) => {
      return { ...s, endpoint: ep };
    });
  }

  const setContract = (c) => { setState((s) => {
      return { ...s, constract: c };
    });
  }

  const hideSettings = () => { setState((s) => {
      return { ...s, show: false };
    })
  }

  const showSettings = () => { setState((s) => {
      return { ...s, show: true };
    })
  }

  const getBcdUrl = () => {
    return 'https://better-call.dev/' + settings.network + '/' + settings.contract;

  }

  return { settings, setNetwork, setEndpoint, setContract, hideSettings, showSettings, getBcdUrl };
}

export const [SettingsProvider, useSettingsContext] = constate(useSettings);

export const githubUrl = "https://github.com/edukera/completium-dapp-ideabox"

export const appTitle = "Vote for the best ideas!"

export const appName = "IdeaCorp."

