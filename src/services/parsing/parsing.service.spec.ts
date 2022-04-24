import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import { ParsingService } from ".";
import { RequestService } from "../requests";
import { HttpModule } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

describe("testing the parsing service.", () => {
  let service: ParsingService;
  let requestService: RequestService;
  let parsingService: ParsingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [ParsingService, RequestService],
    }).compile();

    service = module.get<ParsingService>(ParsingService);
    requestService = module.get<RequestService>(RequestService);
    parsingService = module.get<ParsingService>(ParsingService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return the first level links from an URL.", async () => {
    const url = process.env.TESTING_URL;
    const html = await firstValueFrom(requestService.executeGet(url));
    const response = await parsingService.parse(html.data.toString());

    expect(response).not.toBeNull();
    expect(response.success).toBeTruthy();
    expect(response.data).not.toBeNull();

    const links = response.data;
    expect(links).not.toBeNull();
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].href).not.toBeNull();
  });
});
