import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { firstValueFrom } from "rxjs";
import { AppModule } from "../../app.module";
import { RequestService } from ".";

describe("testing the requests service.", () => {
  let service: RequestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [RequestService],
    }).compile();

    service = module.get<RequestService>(RequestService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an html content from an URL.", async () => {
    const url = process.env.TESTING_URL;
    const data = await firstValueFrom(service.executeGet(url));
    expect(data).not.toBeNull();
    expect(data.status).toBe(200);
  });
});
