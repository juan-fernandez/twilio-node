/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V2 = require('../V2');
import { SerializableClass } from '../../../interfaces';

type FlowValidateStatus = 'draft'|'published';

/**
 * Initialize the FlowValidateList
 *
 * PLEASE NOTE that this class contains beta products that are subject to change.
 * Use them with caution.
 *
 * @param version - Version of the resource
 */
declare function FlowValidateList(version: V2): FlowValidateListInstance;

interface FlowValidateListInstance {
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a FlowValidateInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts: FlowValidateListInstanceUpdateOptions, callback?: (error: Error | null, items: FlowValidateListInstance) => any): Promise<FlowValidateInstance>;
}

/**
 * Options to pass to update
 *
 * @property commitMessage - The commit_message
 * @property definition - The definition
 * @property friendlyName - The friendly_name
 * @property status - The status
 */
interface FlowValidateListInstanceUpdateOptions {
  commitMessage?: string;
  definition: string;
  friendlyName: string;
  status: FlowValidateStatus;
}

interface FlowValidatePayload extends FlowValidateResource, Page.TwilioResponsePayload {
}

interface FlowValidateResource {
  valid: boolean;
}

interface FlowValidateSolution {
}


declare class FlowValidateInstance extends SerializableClass {
  /**
   * Initialize the FlowValidateContext
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   */
  constructor(version: V2, payload: FlowValidatePayload);

  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  valid: boolean;
}


declare class FlowValidatePage extends Page<V2, FlowValidatePayload, FlowValidateResource, FlowValidateInstance> {
  /**
   * Initialize the FlowValidatePage
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V2, response: Response<string>, solution: FlowValidateSolution);

  /**
   * Build an instance of FlowValidateInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: FlowValidatePayload): FlowValidateInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { FlowValidateInstance, FlowValidateList, FlowValidateListInstance, FlowValidateListInstanceUpdateOptions, FlowValidatePage, FlowValidatePayload, FlowValidateResource, FlowValidateSolution, FlowValidateStatus }