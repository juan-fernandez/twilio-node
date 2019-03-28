/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../../base/Page');
import Response = require('../../../../http/response');
import V1 = require('../../V1');
import { SerializableClass } from '../../../../interfaces';

/**
 * Initialize the NumberList
 *
 * @param version - Version of the resource
 */
declare function NumberList(version: V1): NumberListInstance;

interface NumberListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): NumberContext;
  /**
   * Constructs a number
   *
   * @param number - The phone number to fetch
   */
  get(number: string): NumberContext;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

interface NumberPayload extends NumberResource, Page.TwilioResponsePayload {
}

interface NumberResource {
  country: string;
  inbound_call_price: string;
  iso_country: string;
  number: string;
  outbound_call_price: string;
  price_unit: string;
  url: string;
}

interface NumberSolution {
}


declare class NumberContext {
  /**
   * Initialize the NumberContext
   *
   * @param version - Version of the resource
   * @param number - The phone number to fetch
   */
  constructor(version: V1, number: string);

  /**
   * fetch a NumberInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: NumberInstance) => any): Promise<NumberInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}


declare class NumberInstance extends SerializableClass {
  /**
   * Initialize the NumberContext
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param number - The phone number to fetch
   */
  constructor(version: V1, payload: NumberPayload, number: string);

  private _proxy: NumberContext;
  country: string;
  /**
   * fetch a NumberInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: NumberInstance) => any): void;
  inboundCallPrice: string;
  isoCountry: string;
  number: string;
  outboundCallPrice: string;
  priceUnit: string;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  url: string;
}


declare class NumberPage extends Page<V1, NumberPayload, NumberResource, NumberInstance> {
  /**
   * Initialize the NumberPage
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: NumberSolution);

  /**
   * Build an instance of NumberInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: NumberPayload): NumberInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { NumberContext, NumberInstance, NumberList, NumberListInstance, NumberPage, NumberPayload, NumberResource, NumberSolution }
