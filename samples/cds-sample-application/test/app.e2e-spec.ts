import { Test, TestingModule } from '@nestjs/testing';
import nock = require('nock');
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import cds = require('@sap/cds');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cds.connect.to('db');
    await cds
    .serve('all')
    .in(app);
    await app.init();
  });

  it('tests service handler implementation', () => {
    nock(process.env.CLOUD_DESTINATION_URL)
      .get(/.*/)
      .reply(200);

    return request(app.getHttpServer())
      .get('/bupa/getAll()')
      .expect(200)
      .expect({"@odata.context":"$metadata#CapBusinessPartner","value":[]});
  });
});
