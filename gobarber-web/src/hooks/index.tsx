import React from 'react';

import { AuthProvider, useAuth } from './auth';
import { ToastProvider, useToast } from './toast';

export { useAuth, useToast };

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
