/* -------------------------------- PACKAGES -------------------------------- */

import test from 'tape';
import request from 'supertest';

/* -------------------------------------------------------------------------- */

import app from '../src/app';

/* ---------------------------------- TESTS --------------------------------- */

test('GET /', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      const expectedBody = 'Hello World!';
      const actualBody = res.text;

      t.error(err, 'No error');
      t.equal(actualBody, expectedBody, 'Retrieve body');
      t.end();
    });
});

/* -------------------------------------------------------------------------- */
