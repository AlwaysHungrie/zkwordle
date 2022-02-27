import { useLocation, Route, Redirect } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { useAuth } from './auth';

function RequireAuth({ children, ...rest }: any) {
  // const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }] = useAccount();
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accountData?.address && auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default RequireAuth;
