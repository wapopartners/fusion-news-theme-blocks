import React from 'react';

const Twitter = ({ fill = '$ui-medium-primary-color', title = '', desc = '' }) => (
  <svg
    aria-labelledby="title"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="title" lang="en">{title}</title>
    <desc>{desc}</desc>
    <path
      d="M20.074 7.303c.014.189.014.378.014.567 0 5.76-4.384 12.397-12.397 12.397-2.469 0-4.762-.715-6.691-1.956.35.04.688.054 1.052.054a8.726 8.726 0 005.41-1.862 4.365 4.365 0 01-4.074-3.022c.27.04.54.068.823.068.39 0 .782-.054 1.146-.149a4.358 4.358 0 01-3.494-4.276V9.07c.58.324 1.255.526 1.97.553A4.354 4.354 0 011.89 5.995c0-.81.216-1.552.594-2.2a12.385 12.385 0 008.984 4.56 4.919 4.919 0 01-.108-.998A4.355 4.355 0 0115.717 3c1.255 0 2.388.526 3.184 1.376a8.578 8.578 0 002.765-1.052 4.345 4.345 0 01-1.916 2.4 8.735 8.735 0 002.51-.674 9.366 9.366 0 01-2.186 2.253z"
      fill={fill}
      fillRule="nonzero"
    />
  </svg>
);

export default Twitter;
