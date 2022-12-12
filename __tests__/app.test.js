const app = require('../app.js')
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');


afterAll(() => {
  if (db.end) db.end();
});

beforeEach(() => seed(testData));

describe('1. GET / api/categories', () => {
  test("respond with a json object containing a key of `categories` with a value of an array of all the category objects", () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toMatchObject(({
            slug: expect.any(String),
            description: expect.any(String),
          })
          );
        });
      });
  });
  test('404: non-existent route', () => {
    return request(app)
      .get('/api/category')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('path not found, soz!');
      })
  });
});