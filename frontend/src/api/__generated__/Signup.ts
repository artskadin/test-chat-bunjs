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

export class Signup<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
 * No description
 *
 * @tags auth
 * @name Signup
 * @request POST:/signup
 * @response `200` `{
    username: string,

}`
 */
  signup = (
    data: {
      /**
       * @minLength 5
       * @maxLength 20
       */
      username: string;
      /** @minLength 6 */
      password: string;
      role?: 'admin' | 'user';
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        username: string;
      },
      any
    >({
      path: `/signup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
