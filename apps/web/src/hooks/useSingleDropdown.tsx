import {
  PropsWithChildren,
  useMemo,
  createContext,
  useState,
  useContext,
} from 'react';

interface SingleDropdownHandles {
  dropdownOpen: string;
  openDropdown(dropdown: string): void;
  closeDropdown: () => void;
}

const SingleDropdownContext = createContext<SingleDropdownHandles>(
  {} as SingleDropdownHandles,
);

export const SingleDropdown: React.FC<PropsWithChildren> = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState<string>();

  function openDropdown(dropdown: string): void {
    setDropdownOpen(prev => (prev !== dropdown ? dropdown : undefined));
  }

  function closeDropdown(): void {
    setDropdownOpen(undefined);
  }

  const contextValue = useMemo(
    () =>
      ({
        dropdownOpen,
        openDropdown,
        closeDropdown,
      } as SingleDropdownHandles),
    [dropdownOpen, openDropdown, closeDropdown],
  );

  return (
    <SingleDropdownContext.Provider value={contextValue}>
      {children}
    </SingleDropdownContext.Provider>
  );
};

export function useSingleDropdown(): SingleDropdownHandles {
  const context = useContext(SingleDropdownContext);

  if (!context) {
    throw new Error('useSingleDropdown must be used within an provider.');
  }

  return context;
}
