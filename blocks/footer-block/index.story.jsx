import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Footer } from './features/footer/default';

export default {
  title: 'Footer Footer',
  decorators: [withKnobs],
};

const mockPayload = [
  {
    _id: 'terms-of-use',
    name: 'Terms of Use',
    children: [
      {
        display_name: 'Terms of Service',
        url: 'www.some-website',
        _id: 'column-item-1',
      },
      {
        display_name: 'RSS Terms of Service',
        url: 'www.some-website2',
        _id: 'column-item-2',
      },
      {
        display_name: 'Some other Terms of Service',
        url: 'www.some-website3',
        _id: 'column-item-3',
      },
    ],
  },
  {
    _id: 'contact-us',
    name: 'Contact Us',
    children: [
      {
        display_name: 'Phone',
        url: 'www.phone.com',
        _id: 'column-item-4',
      },
      {
        display_name: 'Email',
        url: 'www.email.com',
        _id: 'column-item-5',
      },
      {
        display_name: 'Fax',
        url: 'www.who-uses-fax.com',
        _id: 'column-item-6',
      },
    ],
  },
  {
    _id: 'about-us',
    name: 'About Us',
    children: [
      {
        display_name: 'Events',
        url: 'www.events.com',
        _id: 'column-item-7',
      },
      {
        display_name: 'Careers',
        url: 'www.plz-hire-me.com',
        _id: 'column-item-8',
      },
      {
        display_name: 'The Team',
        url: 'www.the-world.com',
        _id: 'column-item-9',
      },
      {
        display_name: 'External Link',
        node_type: 'link',
        url: 'https://www.the-world.com',
        _id: 'column-item-10',
      },
    ],
  },
  {
    _id: 'get-us',
    name: '',
    children: [
      {
        display_name: 'Why Our Product',
        url: 'www.plz-buy-our-products.com',
        _id: 'column-item-11',
      },
      {
        display_name: 'Pricing',
        url: 'www.the-dollars.com',
        _id: 'column-item-12',
      },
    ],
  },
  {
    _id: 'blank-colum',
    name: '',
  },
];

export const customFooter = () => {
  const lightBackgroundLogo = 'https://arcdesignsystem.com/img/arc-logo-black.svg';
  const lightBackgroundLogoAlt = 'light logo alt text';
  const primaryLogo = 'https://www.klartale.no/img/klartale/klartale-logo-new.svg';
  const primaryLogoAlt = 'primary logo alt text';

  const primaryFont = text('primaryFont (web-safe)', 'Arial');

  // should be links?
  const facebookPage = true;
  // should be links?
  const twitterUsername = true;

  // should be links?
  const rssUrl = true;

  const copyrightText = 'All rights reserved (dibs)';
  const footerColumns = mockPayload;

  return (
    <footer>
      {/* todo: factor footer into component? */}
      <Footer
        lightBackgroundLogo={lightBackgroundLogo}
        lightBackgroundLogoAlt={lightBackgroundLogoAlt}
        primaryLogo={primaryLogo}
        primaryLogoAlt={primaryLogoAlt}
        primaryFont={primaryFont}
        facebookPage={facebookPage}
        twitterUsername={twitterUsername}
        rssUrl={rssUrl}
        copyrightText={copyrightText}
        footerColumns={footerColumns}
      />
    </footer>
  );
};
