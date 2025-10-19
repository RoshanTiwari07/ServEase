import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  shouldFocusSearch: boolean;
  setShouldFocusSearch: (focus: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      shouldFocusSearch,
      setShouldFocusSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}