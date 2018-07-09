import { getProducts } from '../../App/Sagas/ShopifySagas';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('Successful call to Shopify API.', () => {
  const gen = getProducts();
  const result = gen.next();
  console.log(result);
});
