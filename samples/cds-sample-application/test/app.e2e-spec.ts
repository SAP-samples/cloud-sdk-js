import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setTestDestination } from '@sap-cloud-sdk/test-util';
import nock = require('nock');
import cds = require('@sap/cds');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await cds.connect.to('db');
    await cds
    .serve('all')
    .in(app);
    await app.init();

    setTestDestination({ 
      name: 'myDestinationName',
      url: 'https://my-destination-url.com',
      isTestDestination: true
    });
  });

  it('tests service handler implementation', () => {
    nock('https://my-destination-url.com')
      .get(/.*/)
      .reply(200);

    return request(app.getHttpServer())
      .get('/bupa/getAll()')
      .expect(200)
      .expect({"@odata.context":"$metadata#CapBusinessPartner","value":[]});
  });
});
