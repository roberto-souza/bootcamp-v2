import React from 'react';

import { AuthProvider, useAuth } from './auth';

export { useAuth };

const AppProvider: React.FC = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export default AppProvider;
