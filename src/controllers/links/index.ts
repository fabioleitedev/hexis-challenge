import { Controller, Get, HttpCode, HttpException, HttpStatus, Query } from "@nestjs/common";
import { LinksService } from "../../services/links";

@Controller("/sitemaps")
export class LinksController {
  constructor(private linksService: LinksService) {}

  /**
   * @description Returns the first level links from a given URL.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @param url The web page URL.
   * @returns A Promise<IServiceResponse> containing the collection of links.
   */
  @Get("/v1/urls")
  @HttpCode(200)
  async getLinks(@Query("url") url: string) {
    const response = await this.linksService.getLinks(url);
    return response;
  }
}
