/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../../../base/Page');
import Response = require('../../../../../http/response');
import Understand = require('../../../Understand');
import { SerializableClass } from '../../../../../interfaces';

/**
 * Initialize the TaskStatisticsList
 *
 * PLEASE NOTE that this class contains preview products that are subject to
 * change. Use them with caution. If you currently do not have developer preview
 * access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 * @param assistantSid - The unique ID of the parent Assistant.
 * @param taskSid - The unique ID of the Task associated with this Field.
 */
declare function TaskStatisticsList(version: Understand, assistantSid: string, taskSid: string): TaskStatisticsListInstance;

interface TaskStatisticsListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): TaskStatisticsContext;
  /**
   * Constructs a task_statistics
   */
  get(): TaskStatisticsContext;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

interface TaskStatisticsPayload extends TaskStatisticsResource, Page.TwilioResponsePayload {
}

interface TaskStatisticsResource {
  account_sid: string;
  assistant_sid: string;
  fields_count: number;
  samples_count: number;
  task_sid: string;
  url: string;
}

interface TaskStatisticsSolution {
  assistantSid?: string;
  taskSid?: string;
}


declare class TaskStatisticsContext {
  /**
   * Initialize the TaskStatisticsContext
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param assistantSid - The unique ID of the parent Assistant.
   * @param taskSid - The unique ID of the Task associated with this Field.
   */
  constructor(version: Understand, assistantSid: string, taskSid: string);

  /**
   * fetch a TaskStatisticsInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: TaskStatisticsInstance) => any): Promise<TaskStatisticsInstance>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}


declare class TaskStatisticsInstance extends SerializableClass {
  /**
   * Initialize the TaskStatisticsContext
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param assistantSid - The unique ID of the parent Assistant.
   * @param taskSid - The unique ID of the Task associated with this Field.
   */
  constructor(version: Understand, payload: TaskStatisticsPayload, assistantSid: string, taskSid: string);

  private _proxy: TaskStatisticsContext;
  accountSid: string;
  assistantSid: string;
  /**
   * fetch a TaskStatisticsInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: TaskStatisticsInstance) => any): Promise<TaskStatisticsInstance>;
  fieldsCount: number;
  samplesCount: number;
  taskSid: string;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  url: string;
}


declare class TaskStatisticsPage extends Page<Understand, TaskStatisticsPayload, TaskStatisticsResource, TaskStatisticsInstance> {
  /**
   * Initialize the TaskStatisticsPage
   *
   * PLEASE NOTE that this class contains preview products that are subject to
   * change. Use them with caution. If you currently do not have developer preview
   * access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: Understand, response: Response<string>, solution: TaskStatisticsSolution);

  /**
   * Build an instance of TaskStatisticsInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: TaskStatisticsPayload): TaskStatisticsInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { TaskStatisticsContext, TaskStatisticsInstance, TaskStatisticsList, TaskStatisticsListInstance, TaskStatisticsPage, TaskStatisticsPayload, TaskStatisticsResource, TaskStatisticsSolution }
