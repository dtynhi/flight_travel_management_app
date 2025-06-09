import React, { createContext, useState } from 'react';
import LocalStorageService from '~/service/local-storage.service';
import IUser from '~/types/app/user.type';
import { IContextProviderProps } from '~/types/utils.type';

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: IUser | null;
  setProfile: React.Dispatch<React.SetStateAction<IUser | null>>;
  reset: () => void;
  shouldCheckAuth: boolean;
  setShouldCheckAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext = {
  profile: LocalStorageService.getProfileFromLS(),
  setProfile: () => null,
  reset: () => {},
  isAuthenticated: Boolean(LocalStorageService.getProfileFromLS()),
  setIsAuthenticated: () => null,
  shouldCheckAuth: true,
  setShouldCheckAuth: () => null
};

export const AppContext = createContext<IAppContext>(initialContext);

export const AppContextProvider = ({ children, defaultValue = initialContext }: IContextProviderProps<IAppContext>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated);
  const [profile, setProfile] = useState(defaultValue.profile);
  const [shouldCheckAuth, setShouldCheckAuth] = useState(defaultValue.shouldCheckAuth);

  const reset = () => {
    // Clear profile from local storage
    LocalStorageService.removeProfileFromLS();
    setIsAuthenticated(false);
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        reset: reset,
        isAuthenticated,
        setIsAuthenticated,
        shouldCheckAuth,
        setShouldCheckAuth
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
