import { HttpModule } from "@nestjs/axios";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import * as request from "supertest";
import { CacheService } from "../services/cache";

describe("testing the sitemaps api.", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let cacheService: CacheService;
  const url = process.env.TESTING_URL;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [CacheService, { provide: "CACHE_MANAGER", useFactory: jest.fn() }],
    }).compile();

    app = moduleRef.createNestApplication();
    cacheService = moduleRef.get<CacheService>(CacheService);
    await cacheService.remove(url);
    await app.init();
  });

  afterAll(async () => {
    await cacheService.remove(url);
    app.close();
  });

  it("should return the first level links from an URL.", async () => {
    const response = await request(app.getHttpServer()).get(`/sitemaps/v1/urls?url=${url}`).expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).not.toBeNull();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0].href).not.toBeNull();
  });
});
