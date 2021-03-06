import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';

export default ({
  alwaysOpen = false, iconSize = 16, placeholderText, navBarColor = 'dark', customSearchAction = null,
}) => {
  const [shouldSearchOpen, setShouldSearchOpen] = useState(false);
  const searchInput = useRef(null);
  let disabledBtn = true;

  useEffect(() => {
    const el = searchInput.current;
    if (shouldSearchOpen) {
      el.focus();
      // Wait for open searchbar animation to finish
      setTimeout(() => {
        disabledBtn = false;
      }, 250);
    } else {
      el.blur();
    }
  }, [shouldSearchOpen]);

  const handleSearchBtnMousedown = (event) => {
    // if open, prevent blur event so we don't get a race condition on click vs blur
    if (shouldSearchOpen) {
      event.preventDefault();
    } else {
      setShouldSearchOpen(true);
    }
  };

  const handleClick = (event) => {
    if (!disabledBtn) {
      event.preventDefault();
      if (customSearchAction) {
        customSearchAction(searchInput.current.value);
      } else {
        window.location.href = `/search/${searchInput.current.value}`;
      }
    }
  };

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

  const isSearchBarOpen = shouldSearchOpen || alwaysOpen;
  const navClassNames = `nav-search ${isSearchBarOpen ? 'open' : ''} ${navBarColor === 'light' ? 'light' : 'dark'}`;
  const btnClassNames = `nav-btn ${navBarColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'} transparent${!isSearchBarOpen ? ' border' : ''}`;
  const iconFill = isSearchBarOpen ? '#666666' : null;

  return (
    <div className={navClassNames}>
      <input ref={searchInput} onBlur={() => { setShouldSearchOpen(false); }} onKeyDown={handleKey} type="text" placeholder={placeholderText} />
      <button className={btnClassNames} onClick={handleClick} onMouseDown={handleSearchBtnMousedown} type="button">
        <SearchIcon fill={iconFill} height={iconSize} width={iconSize} />
      </button>
    </div>
  );
};
