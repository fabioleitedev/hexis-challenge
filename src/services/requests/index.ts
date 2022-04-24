import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class RequestService {
  constructor(private httpService: HttpService) {}

  /**
   * @description Execute a GET HTTP request using Axios.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @remarks The purpose is to minimize the dependency with third-party libraries in the project.
   * @param endpoint The endpoint URL to be called.
   * @param queryString The querystring parameters to be passed to the URL.
   * @returns The Promise typed object based on the type parameter informed.
   */
  executeGet<T>(endpoint: string, queryString?: string) {
    return this.httpService.get<T>(`${endpoint}${queryString || ""}`);
  }
}
