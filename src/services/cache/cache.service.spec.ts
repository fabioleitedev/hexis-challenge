import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import ILink from "../../model/ILink";
import { CacheService } from ".";

describe("testing the cache service.", () => {
  let service: CacheService;
  const key = process.env.TESTING_URL;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [CacheService, { provide: "CACHE_MANAGER", useFactory: jest.fn() }],
    }).compile();

    service = module.get<CacheService>(CacheService);
    await service.remove(key);
  });

  afterAll(async () => {
    await service.remove(key);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should add an object in the cache and return this object through the key.", async () => {
    const data: Array<ILink> = [{ href: key }];
    await service.add(key, data);

    const response = await service.get<Array<ILink>>(key);
    expect(response).not.toBeNull();
    expect(response).toBeTruthy();
    expect(response).toEqual(data);
  });
});
