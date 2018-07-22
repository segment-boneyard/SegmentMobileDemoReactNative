import { getProducts, flattenProps, getProductNodes, getVariantNodes } from '../../App/Sagas/ShopifySagas';
import { dummyData } from '../../App/Fixtures/shopify';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('Successful call to Shopify API.', () => {
  const gen = getProducts();
  const result = gen.next();
  console.log(JSON.stringify(result,null,2));
});

test('Successful data mapping from Shopify.', () => {
  //console.log(dummyData.products.edges);
  const nodes = getProductNodes(dummyData.products.edges);
  const variants = getVariantNodes(nodes);
  nodes.variants = variants;
  console.log(nodes);
});
