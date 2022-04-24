import { CACHE_MANAGER } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CacheService } from "../../services/cache";
import { ParsingService } from "../../services/parsing";
import { RequestService } from "../../services/requests";
import { AppModule } from "../../app.module";
import { LinksService } from "../../services/links";
import { LinksController } from ".";
import { HttpModule } from "@nestjs/axios";
import { assert } from "console";

describe("testing the links controller.", () => {
  let controller: LinksController;
  const url = process.env.TESTING_URL;
  let cacheService: CacheService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      controllers: [LinksController],
      providers: [
        LinksService,
        ParsingService,
        CacheService,
        RequestService,
        { provide: CACHE_MANAGER, useFactory: jest.fn() },
      ],
    }).compile();

    controller = moduleRef.get<LinksController>(LinksController);
    cacheService = moduleRef.get<CacheService>(CacheService);
    await cacheService.remove(url);
  });

  afterAll(async () => {
    await cacheService.remove(url);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return the first level links from an URL.", async () => {
    const response = await controller.getLinks(url);
    expect(response).not.toBeNull();
    expect(response.success).toBeTruthy();
    expect(response.data).not.toBeNull();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0].href).not.toBeNull();
  });

  it("should not return any link once the url does not exist.", async () => {
    const response = await controller.getLinks(`${url}/does-not-exist`);
    expect(response).not.toBeNull();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
  });
});
