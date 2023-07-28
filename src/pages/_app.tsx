import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { store } from '../store'
import { Provider } from 'react-redux'
import { api } from '../utils/api';

import '../styles/globals.css';
import { Loader } from '../components';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Loader />
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
