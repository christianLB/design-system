import React, { createContext, useContext, useState } from 'react';

interface NavigationState {
  activePath: string;
  setActivePath: (path: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const NavigationContext = createContext<NavigationState | undefined>(undefined);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePath, setActivePath] = useState<string>(
    window.location.pathname
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const value: NavigationState = {
    activePath,
    setActivePath,
    sidebarCollapsed,
    setSidebarCollapsed,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
