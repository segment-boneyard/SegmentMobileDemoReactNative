import { fetchProducts } from '../../App/Sagas/ShopifySagas';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('first calls API', () => {
  const step = stepper(fetchProducts);
});
