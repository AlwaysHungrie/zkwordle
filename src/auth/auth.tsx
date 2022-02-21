import React from 'react';
import { fakeAuthProvider } from './fakeAuthProvider';
import { Provider, chain, defaultChains, developmentChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

interface AuthContextType {
  user: any;
  signin: (account: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  return React.useContext(AuthContext);
}

const infuraId = process.env.INFURA_ID;
const chains = [...defaultChains, ...developmentChains];

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newAccount: string, callback: VoidFunction) => {
    if (!newAccount) return;

    return fakeAuthProvider.signin(() => {
      setUser(newAccount);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  // Set up connectors
  const connectors = () => {
    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
        },
      }),
    ];
  };

  return (
    <Provider connectors={connectors}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </Provider>
  );
}

export default AuthProvider;
