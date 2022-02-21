import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { useAuth } from '../auth/auth';

function AuthStatus() {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  let auth = useAuth();
  let navigate = useNavigate();

  const renderAuthStatus = () => {
    if (accountData) {
      if (auth.user) {
        return (
          <p>
            Welcome {auth.user}!{' '}
            <button
              onClick={() => {
                auth.signout(() => navigate('/'));
              }}
            >
              Sign out
            </button>
          </p>
        );
      }
      return <p>Not signed in</p>;
    }
    return <p>Wallet not connected</p>;
  };

  const renderWalletStatus = () => {
    if (accountData) {
      return (
        <div>
          {accountData.ens?.avatar ? (
            <img src={accountData.ens?.avatar} alt="ENS Avatar" />
          ) : null}
          <div>
            {accountData.ens?.name
              ? `${accountData.ens?.name} (${accountData.address})`
              : accountData.address}
          </div>
          <div>Connected to {accountData!.connector?.name}</div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      );
    }
  };

  return (
    <>
      {renderWalletStatus()}
      {renderAuthStatus()}
    </>
  )
}

export default AuthStatus;
