import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { useAuth } from '../auth/auth';

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let from = (location.state as { from: any })?.from?.pathname || '/';

  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }] = useAccount();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!accountData || !accountData.address) return;
    event.preventDefault();

    auth.signin(accountData.address, () => {
      history.replace(from);
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      {accountData ? (
        <>
          <p>{accountData.address}</p>
          <form onSubmit={handleSubmit}>
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <div>
          {data.connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
            </button>
          ))}

          {error && <div>{error?.message ?? 'Failed to connect'}</div>}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
