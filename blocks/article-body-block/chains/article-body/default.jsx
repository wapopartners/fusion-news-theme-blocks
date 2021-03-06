import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import VideoPlayer from '@wpmedia/video-player-block';
import {
  Gallery, ImageMetadata, Image,
} from '@wpmedia/engine-theme-sdk';

import Blockquote from './_children/blockquote';
import Header from './_children/heading';
import HTML from './_children/html';
import List from './_children/list';
import Oembed from './_children/oembed';
import Pullquote from './_children/pullquote';
import Table from './_children/table';
import './_articlebody.scss';

const HANDLE_COMPRESSED_IMAGE_PARAMS = false;

const StyledText = styled.p`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const StyledLink = styled.a`
  border-bottom: 1px solid ${(props) => props.primaryColor};
  color: ${(props) => props.primaryColor};
`;

function parseArticleItem(item, index, arcSite, phrases) {
  const {
    _id: key = index, type, content,
  } = item;
  // TODO: Split each type into a separate reusable component
  switch (type) {
    case 'text': {
      return (content && content.length > 0) ? (
        <StyledText
          primaryColor={getThemeStyle(arcSite)['primary-color']}
          className="body-paragraph"
          key={key}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null;
    }
    case 'image': {
      const {
        url,
        subtitle,
        caption,
        credits,
        alt_text: altText,
        resized_params: resizedImageOptions = {},
      } = item;

      return (url && url.length > 0) ? (
        <figure key={key}>
          <Image
            compressedThumborParams={HANDLE_COMPRESSED_IMAGE_PARAMS}
            resizedImageOptions={resizedImageOptions}
            url={url}
            alt={altText}
            smallWidth={768}
            smallHeight={0}
            mediumWidth={1024}
            mediumHeight={0}
            largeWidth={1440}
            largeHeight={0}
            breakpoints={getProperties(arcSite)?.breakpoints}
            resizerURL={getProperties(arcSite)?.resizerURL}
          />
          <figcaption>
            <ImageMetadata subtitle={subtitle} caption={caption} credits={credits} />
          </figcaption>
        </figure>
      ) : null;
    }

    case 'interstitial_link': {
      const { url } = item;
      if (!(url && content)) return null;
      const beforeContent = '[&nbsp;';
      const afterContent = '&nbsp;]';
      return (url && url.length > 0) ? (
        <Fragment key={key}>
          <p className="interstitial-link block-margin-bottom">
            <span dangerouslySetInnerHTML={{ __html: beforeContent }} />
            <StyledLink
              href={url}
              aria-label="Open related story"
              dangerouslySetInnerHTML={{ __html: content }}
              primaryColor={getThemeStyle(arcSite)['primary-color']}
            />
            <span dangerouslySetInnerHTML={{ __html: afterContent }} />
          </p>
        </Fragment>
      ) : null;
    }

    case 'raw_html': {
      return (content && content.length > 0) ? (
        <HTML
          key={key}
          id={key}
          content={content}
          primaryColor={getThemeStyle(arcSite)['primary-color']}
        />
      ) : null;
    }

    case 'list': {
      const { list_type: listType, items: listItems } = item;
      // eslint-disable-next-line arrow-body-style
      return (listItems && listItems.length > 0) ? (
        <Fragment key={key}>
          <List
            listType={listType}
            listItems={listItems}
            primaryColor={getThemeStyle(arcSite)['primary-color']}
          />
        </Fragment>
      ) : null;
    }

    case 'correction': {
      return (item.text && item.text.length > 0) ? (
        <Fragment key={key}>
          <section className="correction">
            <h6>{item.correction_type || 'Correction'}</h6>
            <div>{item.text}</div>
          </section>
        </Fragment>
      ) : null;
    }

    case 'header':
      return (item.content && item.content.length > 0) ? (
        <Header key={key} element={item} primaryColor={getThemeStyle(arcSite)['primary-color']} />
      ) : null;

    case 'oembed_response': {
      return item.raw_oembed ? (
        <Oembed key={key} element={item} />
      ) : null;
    }

    case 'table': {
      return item.rows ? (
        <Table key={key} element={item} />
      ) : null;
    }

    case 'quote':
      switch (item.subtype) {
        case 'pullquote':
          return (
            <Pullquote key={key} element={item} />
          );

        case 'blockquote':
        default:
          return (
            <Blockquote key={key} element={item} />
          );
      }
    case 'video':
      return (
        <section key={key} className="block-margin-bottom">
          <VideoPlayer embedMarkup={item.embed_html} />
        </section>
      );
    case 'gallery':
      return (
        <section key={key} className="block-margin-bottom gallery">
          <Gallery
            galleryElements={item.content_elements}
            resizerURL={getProperties(arcSite)?.resizerURL}
            ansId={item._id}
            ansHeadline={item.headlines.basic ? item.headlines.basic : ''}
            expandPhrase={phrases.t('global.gallery-expand-button')}
            autoplayPhrase={phrases.t('global.gallery-autoplay-button')}
            pausePhrase={phrases.t('global.gallery-pause-autoplay-button')}
            pageCountPhrase={(current, total) => phrases.t('global.gallery-page-count-text', { current, total })}
          />
        </section>
      );
    default:
      return null;
  }
}

const ArticleBody = styled.article`
  font-family: ${(props) => props.secondaryFont};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figcaption,
  table {
    font-family: ${(props) => props.primaryFont};
  }

  .body-paragraph,
  .interstitial-link,
  ol,
  ul,
  blockquote p,
  blockquote {
    font-family: ${(props) => props.secondaryFont};
  }
`;

const ArticleBodyChain = ({ children }) => {
  const { globalContent: items = {}, customFields = {}, arcSite } = useFusionContext();
  const { content_elements: contentElements = [], location } = items;
  const { elementPlacement: adPlacementConfigObj = {} } = customFields;
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const adPlacements = Object.keys(adPlacementConfigObj).map(
    (key) => ({ feature: +key, paragraph: +adPlacementConfigObj[key] }),
  );

  const paragraphTotal = contentElements.filter((element) => element.type === 'text').length;

  let paragraphCounter = 0;
  const articleBody = [].concat(...contentElements.map((contentElement, index) => {
    if (contentElement.type === 'text') {
      // Start at 1 since the ad configs use one-based array indexes
      paragraphCounter += 1;

      const adsAfterParagraph = adPlacements.filter(
        (placement) => placement.paragraph === paragraphCounter,
      );

      if (paragraphCounter === 1 && location && contentElement.content.indexOf(`${location} &mdash;`) !== 0) {
        // eslint-disable-next-line no-param-reassign
        contentElement.content = `${location} &mdash; ${contentElement.content}`;
      }

      // The ad features should follow the content element if they exist, but not if
      // the current paragraph is the last or second-to-last paragraph.
      if (adsAfterParagraph.length && paragraphCounter < paragraphTotal - 1) {
        return [
          parseArticleItem(contentElement, index, arcSite, phrases),
          ...adsAfterParagraph.map((placement) => children[placement.feature - 1]),
        ];
      }
    }

    return parseArticleItem(contentElement, index, arcSite, phrases);
  }));

  return (
    <ArticleBody
      className="article-body-wrapper"
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
    >
      { articleBody }
    </ArticleBody>
  );
};

ArticleBodyChain.propTypes = {
  customFields: PropTypes.shape({
    elementPlacement: PropTypes.kvp.tag({
      label: 'Ad placements',
      group: 'Inline ads',
      description: 'Places your inline article body ads in the article body chain. For each ad feature in the chain, fill in two values below: Field 1) The position of the ad within the chain and Field 2) the paragraph number that this ad should follow in the article body. For example, entering 1 and 3 would mean that the first ad in the article body chain will be placed after the third paragraph in the article.',
    }),
  }),
};

ArticleBodyChain.label = 'Article Body – Arc Block';

export default ArticleBodyChain;
