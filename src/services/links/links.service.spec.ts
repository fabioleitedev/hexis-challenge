import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import { LinksService } from ".";
import { RequestService } from "../requests";
import { ParsingService } from "../parsing";
import { CACHE_MANAGER } from "@nestjs/common";
import { CacheService } from "../cache";
import { HttpModule } from "@nestjs/axios";

describe("testing the links service.", () => {
  let service: LinksService;
  let cacheService: CacheService;
  const url = process.env.TESTING_URL;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [
        LinksService,
        RequestService,
        ParsingService,
        CacheService,
        { provide: CACHE_MANAGER, useFactory: jest.fn() },
      ],
    }).compile();

    service = moduleRef.get<LinksService>(LinksService);
    cacheService = moduleRef.get<CacheService>(CacheService);
    await cacheService.remove(url);
  });

  afterAll(async () => {
    await cacheService.remove(url);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return the first level links from an URL.", async () => {
    const response = await service.getLinks(url);
    expect(response).not.toBeNull();
    expect(response.success).toBeTruthy();
    expect(response.data).not.toBeNull();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0].href).not.toBeNull();
  });

  it("should not return any link once the url does not exist.", async () => {
    const response = await service.getLinks(`${url}/does-not-exist`);
    expect(response).not.toBeNull();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
  });
});
