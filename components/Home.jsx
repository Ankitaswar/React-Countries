import React, { useState } from 'react'
import SearchBar from './SearchBar'
import SeletMenu from './SeletMenu'
import CountryList from './CountriesList'
import useTheme from '../hooks/useTheme';

export default function Home() {
  const [query, setQuery] = useState('');
  const [isDark] = useTheme();

  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SeletMenu setQuery={setQuery} />
      </div>
      <CountryList query={query} />
    </main>
  )
}
