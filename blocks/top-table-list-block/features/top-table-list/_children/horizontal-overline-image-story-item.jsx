import React from 'react';
import { Image /* , Video */ } from '@wpmedia/engine-theme-sdk';
import ArticleDate from '@wpmedia/date-block';
import Byline from '@wpmedia/byline-block';
import Overline from '@wpmedia/overline-block';
import { ratiosFor } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';
import PromoLabel from './promo_label';
import discoverPromoType from './discover';

const HANDLE_COMPRESSED_IMAGE_PARAMS = false;

const HorizontalOverlineImageStoryItem = (props) => {
  const {
    websiteURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    secondaryFont,
    by,
    element,
    overlineDisplay,
    overlineUrl,
    overlineText,
    displayDate,
    id,
    customFields,
    arcSite,
    resizedImageOptions,
    placeholderResizedImageOptions,
    targetFallbackImage,
    imageRatio,
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateLG;
  const textClass = customFields.showImageLG
    ? 'col-sm-12 col-md-xl-6 flex-col'
    : 'col-sm-xl-12 flex-col';

  const overlineTmpl = () => {
    if (customFields.showOverlineLG && overlineDisplay) {
      return (
        <Overline
          customUrl={overlineUrl}
          customText={overlineText}
          className="overline"
          editable
        />
      );
    }
    return null;
  };

  const headlineTmpl = () => {
    if (customFields.showHeadlineLG && itemTitle) {
      return (
        <a href={websiteURL} title={itemTitle} className="lg-promo-headline">
          <Title primaryFont={primaryFont} className="lg-promo-headline">
            {itemTitle}
          </Title>
        </a>
      );
    }
    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionLG && descriptionText) {
      return (
        <DescriptionText
          secondaryFont={secondaryFont}
          className="description-text"
        >
          {descriptionText}
        </DescriptionText>
      );
    }
    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineLG && !checkObjectEmpty(element)) {
      return (
        <>
          {!checkObjectEmpty(element) ? (
            <Byline story={element} stylesFor="list" />
          ) : null}
          {/* The Separator will only be shown if there is at least one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
        </>
      );
    }
    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDateLG && displayDate) {
      return (
        <>
          <ArticleDate date={displayDate} />
        </>
      );
    }
    return null;
  };

  const ratios = ratiosFor('LG', imageRatio);
  // const videoUUID = element?.promo_items?.basic?.additional_properties?.videoId;
  const promoType = discoverPromoType(element);

  return (
    <>
      <article key={id} className="container-fluid large-promo">
        <div className="row lg-promo-padding-bottom">
          {/* {customFields.headlinePositionLG === 'above'
            && (customFields.showHeadlineLG
              || customFields.showDescriptionLG
              || customFields.showBylineLG
              || customFields.showDateLG) && (
              <div className={textClass}>
                {overlineTmpl()}
                {headlineTmpl()}
                {descriptionTmpl()}
                <div className="article-meta">
                  {byLineTmpl()}
                  {dateTmpl()}
                </div>
              </div>
          )} */}
          {/* {videoUUID && (
            <Video
              uuid={videoUUID}
              autoplay={false}
              aspectRatio={0.75}
              org="arcbrands"
              env="sandbox"
            />
          )} */}
          {customFields.showImageLG && /*! videoUUID && */ (
            <div className="col-sm-12 col-md-xl-6 flex-col">
              {imageURL !== '' ? (
                <a href={websiteURL} title={itemTitle}>
                  <Image
                    compressedThumborParams={HANDLE_COMPRESSED_IMAGE_PARAMS}
                    resizedImageOptions={resizedImageOptions}
                    url={imageURL}
                    alt={
                      itemTitle
                      || getProperties(arcSite).primaryLogoAlt
                      || 'Placeholder logo'
                    }
                    smallWidth={ratios.smallWidth}
                    smallHeight={ratios.smallHeight}
                    mediumWidth={ratios.mediumWidth}
                    mediumHeight={ratios.mediumHeight}
                    largeWidth={ratios.largeWidth}
                    largeHeight={ratios.largeHeight}
                    breakpoints={getProperties(arcSite)?.breakpoints}
                    resizerURL={getProperties(arcSite)?.resizerURL}
                  />
                  <PromoLabel type={promoType} />
                </a>
              ) : (
                <div className="image-wrapper">
                  <Image
                    compressedThumborParams={HANDLE_COMPRESSED_IMAGE_PARAMS}
                    smallWidth={ratios.smallWidth}
                    smallHeight={ratios.smallHeight}
                    mediumWidth={ratios.mediumWidth}
                    mediumHeight={ratios.mediumHeight}
                    largeWidth={ratios.largeWidth}
                    largeHeight={ratios.largeHeight}
                    alt={
                      itemTitle
                      || getProperties(arcSite).primaryLogoAlt
                      || 'Placeholder logo'
                    }
                    url={targetFallbackImage}
                    breakpoints={getProperties(arcSite)?.breakpoints}
                    resizedImageOptions={placeholderResizedImageOptions}
                    resizerURL={getProperties(arcSite)?.resizerURL}
                  />
                  <PromoLabel type={promoType} />
                </div>
              )}
            </div>
          )}
          {/* customFields.headlinePositionLG === 'below' && */
            (customFields.showHeadlineLG
              || customFields.showDescriptionLG
              || customFields.showBylineLG
              || customFields.showDateLG) && (
              <div className={textClass}>
                {overlineTmpl()}
                {headlineTmpl()}
                {descriptionTmpl()}
                <div className="article-meta">
                  {byLineTmpl()}
                  {dateTmpl()}
                </div>
              </div>
            )
          }
        </div>
      </article>
      <hr />
    </>
  );
};

export default HorizontalOverlineImageStoryItem;
