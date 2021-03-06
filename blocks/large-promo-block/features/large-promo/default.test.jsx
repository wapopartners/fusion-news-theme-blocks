import React from 'react';
import { mount } from 'enzyme';
import LargePromo from './default';

const { default: mockData } = require('./mock-data');

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <div />,
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));
jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => (mockData)),
  useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
}));

const config = {
  itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
  showHeadline: true,
  showImage: true,
};

const mockFusionContext = {
  arcSite: 'the-sun',
};

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => mockFusionContext),
}));

describe('the large promo feature', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => mockFusionContext),
    }));
  });

  it('should have 1 container fluid class', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have two link elements by default', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('should link the headline to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('a.lg-promo-headline')).toHaveProp('href', url);
  });

  it('should link the image to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('a').at(1)).toHaveProp('href', url);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('Headline div should have class .col-md-xl-6 when show image is true', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('.col-md-xl-6')).toHaveLength(2);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      showImage: false,
    };
    const wrapper = mount(<LargePromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('headline div should have class .col-sm-xl-12 when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      showImage: false,
    };
    const wrapper = mount(<LargePromo customFields={noImgConfig} />);
    expect(wrapper.find('.col-sm-xl-12')).toHaveLength(1);
  });

  it('should only be one link when showHeadline is false and show image is true', () => {
    const noHeadlineConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: false,
      showImage: true,
    };
    const wrapper = mount(<LargePromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should have by default an 4:3 image ratio', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(283);
  });

  it('should accept a 16:9 ratio', () => {
    const myConfig = { ...config, imageRatio: '16:9' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(212);
  });

  it('should accept a 3:2 ratio', () => {
    const myConfig = { ...config, imageRatio: '3:2' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(251);
  });

  it('should accept a 4:3 ratio', () => {
    const myConfig = { ...config, imageRatio: '4:3' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(283);
  });
});
