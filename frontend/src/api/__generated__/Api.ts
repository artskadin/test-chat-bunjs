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

import { HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @name GetApi
   * @request GET:/api/
   * @response `200` `void`
   */
  getApi = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @name PostApi
   * @request POST:/api/
   * @response `200` `void`
   */
  postApi = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @name GetApiTest
   * @request GET:/api/test
   * @response `200` `void`
   */
  getApiTest = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/test`,
      method: 'GET',
      ...params,
    });
}
