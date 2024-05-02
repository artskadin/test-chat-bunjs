/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpClient, RequestParams } from './http-client';

export class Signin<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags auth
   * @name Signin
   * @request POST:/signin
   * @response `200` `void`
   */
  signin = (
    data: {
      /**
       * @minLength 5
       * @maxLength 20
       */
      username: string;
      /** @minLength 6 */
      password: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<void, any>({
      path: `/signin`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
