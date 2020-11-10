function getPromoStyle(position = 'right', element = 'container') {
  const imagePositionClassMapping = {
    right: {
      container: 'image-right horizontal row',
      margin: 'image-right',
      headlineMargin: '',
    },
    left: {
      container: 'image-left horizontal row',
      margin: 'image-left',
      headlineMargin: 'margin-sm-left',
    },
    above: {
      container: 'image-above vertical',
      margin: ' image-above margin-sm-top margin-sm-bottom',
      headlineMargin: '',
    },
    below: {
      container: 'image-below vertical',
      margin: 'margin-sm-top image-below',
      headlineMargin: '',
    },
  };
  const promoClasses = imagePositionClassMapping[position][element];
  return promoClasses;
}
export default getPromoStyle;
