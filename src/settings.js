import { useState } from 'react';
import constate from "constate";

export function useSettings() {

  const [settings,setState] = useState({
    network  : 'florencenet',
    endpoint : 'https://florencenet.smartpy.io',
    contract : 'KT1HExwKZAywUaLJ9XENch6yR2k21ew25m81',
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
      return { ...s, contract: c };
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

