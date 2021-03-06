/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';
import getThemeStyle from 'fusion:themes';
import './overline.scss';

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const StyledText = styled.span`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

function getLocation(uri) {
  let url;
  if (typeof window === 'undefined') {
    url = new URL(uri, 'http://example.com');
  } else {
    url = document.createElement('a');
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    url.href = uri;
    if (url.host === '') {
      url.href = `${url.href}`;
    }
  }
  return url;
}

function fixTrailingSlash(item) {
  const url = getLocation(item);

  if (url.hash || url.search || url.pathname.match(/\./)) {
    return item;
  }

  if (item[item.length - 1] !== '/') {
    return `${item}/`;
  }
  return item;
}

const Overline = (props) => {
  const { globalContent: content = {}, arcSite } = useFusionContext();
  const { editableContent } = useEditableContent();
  const { customText, customUrl, editable } = props;

  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText,
  } = (content.label && content.label.basic) || {};
  const shouldUseLabel = !!(labelDisplay);

  const {
    _id: sectionUrl,
    name: sectionText,
  } = (content.websites
    && content.websites[arcSite]
    && content.websites[arcSite].website_section) || {};

  const shouldUseProps = !!((customText && customUrl));
  const useGlobalContent = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];

  const [text, url] = shouldUseProps ? [customText, customUrl] : useGlobalContent;
  const edit = editable ? { ...editableContent(content, text) } : {};

  if (url) {
    return (
      <StyledLink
        href={fixTrailingSlash(url)}
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
        {...edit}
        suppressContentEditableWarning
      >
        {text}
      </StyledLink>
    );
  }

  if (text) {
    return (
      <StyledText
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
        {...edit}
        suppressContentEditableWarning
      >
        {text}
      </StyledText>
    );
  }

  return null;
};

Overline.label = 'Overline – Arc Block';

Overline.propTypes = {
  customText: PropTypes.string,
  customUrl: PropTypes.string,
};

export default Overline;
