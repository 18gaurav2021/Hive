// app.tsx

import React from 'react';
import { OidcProvider } from '@axa-fr/react-oidc';
import oidcConfig from '../../app/oidc-config'; // Assuming this is your OIDC configuration file
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from '../../hive/pages/login'; // Path to your login component
import DashboardPage from './page'; // Path to your main dashboard page

function App() {
  return (
    <OidcProvider configuration={oidcConfig}>
      <Router>
        <Route path="/login" Component={LoginPage} />
        <Route path="/" Component={DashboardPage} />
        {/* Add more routes as needed */}
      </Router>
    </OidcProvider>
  );
}

export default App;
