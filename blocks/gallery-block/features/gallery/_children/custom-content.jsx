import React from 'react';
import { useContent } from 'fusion:content';
import { Gallery } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';

const CustomContentGallery = ({ contentConfig, phrases, arcSite }) => {
  const { shouldCompress = false, resizerURL } = getProperties(arcSite);

  const content = useContent({
    source: contentConfig.contentService,
    query: {
      shouldCompress,
      ...contentConfig.contentConfigValues,
    },
  }) || {};
  const { content_elements: contentElements = [] } = content;

  return (
    <Gallery
      galleryElements={contentElements}
      resizerURL={resizerURL}
      ansId={content?._id ? content._id : ''}
      ansHeadline={content?.headlines?.basic ? content.headlines.basic : ''}
      expandPhrase={phrases.t('global.gallery-expand-button')}
      autoplayPhrase={phrases.t('global.gallery-autoplay-button')}
      pausePhrase={phrases.t('global.gallery-pause-autoplay-button')}
      pageCountPhrase={(current, total) => phrases.t('global.gallery-page-count-text', { current, total })}
      compressedThumborParams={shouldCompress}
    />
  );
};

export default CustomContentGallery;
