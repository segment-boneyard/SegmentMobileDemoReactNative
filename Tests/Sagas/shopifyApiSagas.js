import { getProducts } from '../../App/Sagas/ShopifySagas';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('first calls API', () => {
  const gen = getProducts();
  gen.next();
  const result = gen.next();
  console.log(result);
});
