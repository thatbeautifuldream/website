'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import { CommandPalette } from '../command-palette';

type TCommandPaletteContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const CommandPaletteContext = createContext<
  TCommandPaletteContextType | undefined
>(undefined);

export const useCommandPalette = () => {
  const context = useContext(CommandPaletteContext);
  if (context === undefined) {
    throw new Error(
      'useCommandPalette must be used within a CommandPaletteProvider'
    );
  }
  return context;
};

type TCommandPaletteProviderProps = {
  children: ReactNode;
};

export const CommandPaletteProvider = ({
  children,
}: TCommandPaletteProviderProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, toggle }}>
      {children}
      <CommandPalette onOpenChange={setOpen} open={open} />
    </CommandPaletteContext.Provider>
  );
};
