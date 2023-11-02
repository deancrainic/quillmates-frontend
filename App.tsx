import React from 'react';
import AuthProvider from './src/context/AuthContext';
import AppContainer from './src/components/AppContainer';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
};

export default App;
