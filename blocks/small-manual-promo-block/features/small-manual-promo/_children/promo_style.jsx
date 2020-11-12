function getPromoStyle(position = 'right', element = 'container') {
  const imagePositionClassMapping = {
    right: {
      container: 'image-right horizontal row',
      margin: 'image-right',
      headlineMargin: 'margin-md-right',
    },
    left: {
      container: 'image-left horizontal row',
      margin: 'image-left',
      headlineMargin: 'margin-md-left',
    },
    above: {
      container: 'image-above vertical',
      margin: ' image-above',
      headlineMargin: 'margin-md-top',
    },
    below: {
      container: 'image-below vertical',
      margin: 'margin-sm-bottom image-below',
      headlineMargin: 'margin-md-bottom',
    },
  };
  const promoClasses = imagePositionClassMapping[position][element];
  return promoClasses;
}
export default getPromoStyle;
