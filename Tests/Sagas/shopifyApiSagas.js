import { getProducts } from '../../App/Sagas/ShopifySagas';

const stepper = (fn) => (mock) => fn.next(mock).value;

test('first calls API', () => {
  const retVal = getProducts().next().value;
  console.log(retVal);
});
