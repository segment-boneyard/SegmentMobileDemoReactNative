import gql from 'graphql-tag';

export const Products = {
  attributes: gql`
    fragment ProductAttributes on Products {
      id
      description
      handle
      title
      productType
      Images(maxWidth: 100 first: 50){
        ...imagesFragment
      }
  }
  `
};

export const Images = {
  attributes: gql`
  fragment ImageAttributes on Images{
    id
    transformedSrc
    originalSrc
  }
  `
}
