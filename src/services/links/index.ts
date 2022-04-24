import { Injectable, Logger } from "@nestjs/common";
import { RequestService } from "../requests";
import { firstValueFrom } from "rxjs";
import IServiceResponse from "../../model/IServiceResponse";
import ILink from "../../model/ILink";
import { ParsingService } from "../parsing";
import { CacheService } from "../cache";

@Injectable()
export class LinksService {
  constructor(
    private requestService: RequestService,
    private parsingService: ParsingService,
    private cacheService: CacheService
  ) {}

  /**
   * @description Returns the first level links from a given page url.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param url A web page URL.
   * @returns A Promise<IServiceResponse> containing the collection of links.
   */
  async getLinks(url: string) {
    Logger.log(`processing url: ${url}`);
    Logger.log(`checking cache.`);

    // checking the cache to get the links
    const cacheResponse = await this.cacheService.get(url);
    if (cacheResponse) {
      Logger.log(`returning cached data.`);
      return <IServiceResponse<Array<ILink>>>{
        success: true,
        data: cacheResponse,
      };
    }

    try {
      Logger.log(`no data found in cache. retrieving html.`);
      const html = await firstValueFrom(this.requestService.executeGet(url));
      Logger.log(`parsiing the html content.`);
      const links = await this.parsingService.parse(html.data.toString());

      if (!links) {
        Logger.log(`no links found.`);
        return <IServiceResponse<Array<ILink>>>{
          success: false,
          errorMessage: ["No links found."],
        };
      }

      // caching the links
      Logger.log(`caching data.`);
      this.cacheService.add(url, links);

      Logger.log(`returning links.`);
      return <IServiceResponse<Array<ILink>>>{
        success: true,
        data: links.data,
      };
    } catch (error) {
      Logger.log(`an error ocurred.`);
      Logger.error(error);
      return <IServiceResponse<Array<ILink>>>{
        success: false,
        errorMessage: error,
      };
    }
  }
}
