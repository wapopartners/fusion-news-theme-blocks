import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import styled from 'styled-components';

const animationDurationMS = 250;

function getPrefersReducedMotion() {
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
}

const StyledInput = styled.input`
  transition: all ${animationDurationMS}ms cubic-bezier(0.49, 0.37, 0.45, 0.71);

  @media screen and (prefers-reduced-motion: reduce) { 
    transition: none !important;
  }
`;

function SearchBox({
  alwaysOpen = false,
  iconSize = 16, placeholderText, navBarColor = 'dark', customSearchAction = null,
}) {
  const [isSearchInputOpen, setSearchInputOpen] = useState(alwaysOpen);
  const [isPending, setIsPending] = useState(false);
  const searchInput = useRef(null);
  const preferReducedMotion = getPrefersReducedMotion();

  useEffect(() => {
    if (!preferReducedMotion) {
      setTimeout(() => {
        setIsPending(false);
      }, animationDurationMS);
    }
  }, [isSearchInputOpen, setIsPending, preferReducedMotion]);

  function handleClick(e) {
    if (isSearchInputOpen) {
      e.preventDefault();
      if (customSearchAction) {
        customSearchAction(searchInput.current.value);
      } else {
        window.location.href = `/search/${searchInput.current.value}`;
      }
      if (
        !preferReducedMotion
      ) {
        setIsPending(true);
      }
      setSearchInputOpen(false);
      searchInput.current.value = '';
    } else {
      searchInput.current.focus();
      if (
        !preferReducedMotion
      ) {
        setIsPending(true);
      }
      setSearchInputOpen(true);
    }
  }

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (customSearchAction) {
        customSearchAction(searchInput.current.value);
      } else {
        window.location.href = `/search/${searchInput.current.value}`;
      }
    }
  };

  const navClassNames = `nav-block-search ${isSearchInputOpen ? 'open' : ''} ${navBarColor === 'light' ? 'light' : 'dark'}`;
  const btnClassNames = `nav-btn ${navBarColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'} transparent${!isSearchInputOpen ? ' border' : ''}`;
  const iconFill = isSearchInputOpen ? '#666666' : null;

  return (
    <div className={navClassNames}>
      <StyledInput
        ref={searchInput}
        onKeyDown={handleKey}
        type="text"
        placeholder={placeholderText}
      />
      <button
        className={btnClassNames}
        onClick={handleClick}
        type="button"
        disabled={isPending}
        aria-label={isSearchInputOpen ? "Search the site's content" : 'Open the search input to search the site'}
      >
        <SearchIcon fill={iconFill} height={iconSize} width={iconSize} />
      </button>
    </div>
  );
}

export default SearchBox;
