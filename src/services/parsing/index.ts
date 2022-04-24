import { Injectable } from "@nestjs/common";
import { parse } from "node-html-parser";
import ILink from "../../model/ILink";
import IServiceResponse from "../../model/IServiceResponse";

@Injectable()
export class ParsingService {
  /**
   * @description Parse the HTML content.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @remarks The purpose is to minimize the dependency with third-party libraries in the project.
   * @param html The HTML content to be parsed.
   * @returns A Promise<IServiceResponse> with the web page's links.
   */
  async parse(html: string) {
    const parsedHtml = parse(html);
    const htmlElements = parsedHtml.querySelectorAll("a");

    if (!htmlElements) {
      return <IServiceResponse<Array<ILink>>>{
        success: false,
        errorMessage: ["No links found."],
      };
    }

    const links: Array<ILink> = [];
    for (const element of htmlElements) {
      links.push({ href: element.attributes.href });
    }

    return <IServiceResponse<Array<ILink>>>{
      success: true,
      data: links,
    };
  }
}
