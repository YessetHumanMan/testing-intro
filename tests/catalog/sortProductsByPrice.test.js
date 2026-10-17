const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const getProductsByIds = (ids) => ids.map((id) => products.find((product) => product.id === id));
const getIds = (items) => items.map(({ id }) => id);

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');

    expect(getIds(result)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products);

    expect(getIds(result)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selectedProducts = getProductsByIds([1, 3, 4]);
    const result = sortProductsByPrice(selectedProducts, 'asc');

    expect(getIds(result)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');

    expect(getIds(result)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selectedProducts = getProductsByIds([3, 1, 4]);
    const result = sortProductsByPrice(selectedProducts, 'desc');

    expect(getIds(result)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selectedProducts = getProductsByIds([5, 2, 6]);
    const result = sortProductsByPrice(selectedProducts, 'desc');

    expect(getIds(result)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = getProductsByIds([1, 3, 4]);

    sortProductsByPrice(selectedProducts, 'asc');

    expect(getIds(selectedProducts)).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = getProductsByIds([1, 3, 4]);

    sortProductsByPrice(selectedProducts, 'desc');

    expect(getIds(selectedProducts)).toEqual([1, 3, 4]);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    sortProductsByPrice(products);

    expect(getIds(products)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
