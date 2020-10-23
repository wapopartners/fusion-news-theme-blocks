/* eslint-disable comma-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import adMap from './ad-mapping';
import ArcAdminAd from './_children/ArcAdminAd';
import ArcAdsInstance from './_children/ArcAdsInstance';
import { getAdObject, setPageTargeting } from './ad-helper';
import './ads.scss';

/** === ArcAd Component === */
const ArcAd = (props) => {
  const propsWithContext = {
    ...useAppContext(),
    ...useFusionContext(),
    ...props,
  };
  const { customFields } = props;
  const [config] = useState(
    getAdObject({
      ...customFields,
      ...propsWithContext,
    }),
  );
  // istanbul ignore next
  const isAMP = () => (!!(propsWithContext.outputType && propsWithContext.outputType === 'amp'));

  const {
    arcSite,
    customFields: {
      debug,
      displayAdLabel,
    }
  } = propsWithContext;
  const siteVars = getProperties(arcSite);

  const registerAd = useCallback(() => {
    const publisherIds = { dfp_publisher_id: siteVars.dfpId };
    ArcAdsInstance
      .getInstance(siteVars, () => {
        setPageTargeting(propsWithContext);
      })
      .registerAd({
        params: config,
        publisherIds,
        debug,
      });
  }, [config]);

  useEffect(() => {
    registerAd();
  }, [registerAd]);

  const {
    id, adClass, adType, dimensions, slotName, display,
  } = config;
  const { isAdmin } = propsWithContext;

  return (
    <div
      id={`arcad_feature-${id}`}
      className="arcad_feature margin-md-bottom"
    >
      <div className="arcad_container">
        {!isAdmin && displayAdLabel && !isAMP() && (
          <div className={`advertisement-label advertisement-label--${display}`}>
            {siteVars.advertisementLabel || 'ADVERTISEMENT'}
          </div>
        )}
        {!isAdmin && !isAMP() && (
          <div id={id} className={`arcad ad-${adClass}`} />
        )}
        <ArcAdminAd
          adClass={adClass}
          adName={adType}
          slotName={slotName}
          dimensions={dimensions}
        />
      </div>
    </div>
  );
};

/** PropTypes */

const adTypes = Object.keys(adMap);
const adTypeLabels = {};
adTypes.forEach((adType) => {
  adTypeLabels[adType] = adMap[adType].adLabel;
});

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    adType: PropTypes.oneOf(adTypes).tag({
      name: 'Ad Type',
      labels: adTypeLabels,
      defaultValue: '1x1px',
      required: true,
      hidden: false,
    }),
    display: PropTypes.oneOf([
      'all', 'mobile', 'desktop',
    ]).tag({
      name: 'Display',
      labels: {
        all: 'All',
        mobile: 'Mobile',
        desktop: 'Desktop',
      },
      defaultValue: 'all',
      required: false,
      hidden: false,
    }),
    displayAdLabel: PropTypes.boolean.tag({
      name: 'Display Advertisement Label?',
      defaultValue: true,
    }),
  }),
};

ArcAd.label = 'Google Ad – Arc Block';
export default ArcAd;