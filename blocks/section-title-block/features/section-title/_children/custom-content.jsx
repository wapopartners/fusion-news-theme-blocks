import React from 'react';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import SectionTitle from './section-title';

const CustomContentSectionTitle = ({ contentConfig }) => {
  const { arcSite } = useFusionContext();

  const content = useContent({
    source: contentConfig.contentService,
    query: {
      ...contentConfig.contentConfigValues,
      shouldCompress: getProperties(arcSite).shouldCompress || false,
    },
  }) || {};

  return <SectionTitle content={content} />;
};

export default CustomContentSectionTitle;
