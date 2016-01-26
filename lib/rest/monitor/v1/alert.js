'use strict';

var _ = require('lodash');
var Q = require('q');
var InstanceContext = require('../../../base/InstanceContext');
var InstanceResource = require('../../../base/InstanceResource');
var Page = require('../../../base/Page');
var deserialize = require('../../../base/deserialize');
var serialize = require('../../../base/serialize');
var values = require('../../../base/values');

var AlertPage;
var AlertList;
var AlertInstance;
var AlertContext;

/**
 * Initialize the AlertPage
 *
 * @param {Version} version - Version that contains the resource
 * @param {Response} response - Response from the API
 *
 * @returns AlertPage
 */
function AlertPage(version, response) {
  Page.prototype.constructor.call(this, version, response);

  // Path Solution
  this._solution = {};
}

_.extend(AlertPage.prototype, Page.prototype);
AlertPage.prototype.constructor = AlertPage;

/**
 * Build an instance of AlertInstance
 *
 * @param {obj} payload - Payload response from the API
 *
 * @returns AlertInstance
 */
AlertPage.prototype.getInstance = function getInstance(payload) {
  return new AlertInstance(
    this._version,
    payload
  );
};


/**
 * Initialize the AlertList
 *
 * @param {Version} version - Version that contains the resource
 *
 * @returns AlertList
 */
function AlertList(version) {
  function AlertListInstance(sid) {
    return AlertListInstance.get(sid);
  }

  AlertListInstance._version = version;
  // Path Solution
  AlertListInstance._solution = {};
  AlertListInstance._uri = _.template(
    '/Alerts' // jshint ignore:line
  )(AlertListInstance._solution);
  /**
   * Streams AlertInstance records from the API.
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * @param {Function} opts.callback - A callback function to process records
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         list() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {string} [opts.logLevel] - The log_level
   * @param {moment} [opts.startDateBefore] - The start_date
   * @param {moment} [opts.startDate] - The start_date
   * @param {moment} [opts.startDateAfter] - The start_date
   * @param {moment} [opts.endDateBefore] - The end_date
   * @param {moment} [opts.endDate] - The end_date
   * @param {moment} [opts.endDateAfter] - The end_date
   */
  AlertListInstance.each = function each(opts) {
    if (!(opts && 'callback' in opts)) {
      throw new Error('opts.callback parameter required');
    }

    var currentPage = 1;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    var deferred = Q.defer();
    function fetchNextPage(fn) {
      var promise = fn();

      promise.then(function(page) {
        if (_.isEmpty(page.instances)) {
          deferred.resolve();
        }

        _.each(page.instances, opts.callback);

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          deferred.resolve();
        } else {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(deferred.reject);
    }

    fetchNextPage(_.bind(this.page, this, opts));

    return deferred.promise;
  };

  /**
   * Lists AlertInstance records from the API as a list.
   *
   * @param {string} [opts.logLevel] - The log_level
   * @param {moment} [opts.startDateBefore] - The start_date
   * @param {moment} [opts.startDate] - The start_date
   * @param {moment} [opts.startDateAfter] - The start_date
   * @param {moment} [opts.endDateBefore] - The end_date
   * @param {moment} [opts.endDate] - The end_date
   * @param {moment} [opts.endDateAfter] - The end_date
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   *
   * @returns {Array} A list of records
   */
  AlertListInstance.list = function list(opts) {
    opts = opts || {};

    var allResources = [];
    opts.callback = function(resource) {
      allResources.push(resource);
    };

    var promise = this.each(opts);
    promise = promise.then(function() {
      return allResources;
    });

    return promise;
  };

  /**
   * Retrieve a single page of AlertInstance records from the API.
   * Request is executed immediately
   *
   * @param {string} [opts.logLevel] - The log_level
   * @param {moment} [opts.startDateBefore] - The start_date
   * @param {moment} [opts.startDate] - The start_date
   * @param {moment} [opts.startDateAfter] - The start_date
   * @param {moment} [opts.endDateBefore] - The end_date
   * @param {moment} [opts.endDate] - The end_date
   * @param {moment} [opts.endDateAfter] - The end_date
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   *
   * @returns Page of AlertInstance
   */
  AlertListInstance.page = function page(opts) {
    opts = opts || {};
    var params = values.of({
      'LogLevel': opts.logLevel,
      'StartDate<': serialize.iso8601Date(opts.startDateBefore),
      'StartDate': serialize.iso8601Date(opts.startDate),
      'StartDate>': serialize.iso8601Date(opts.startDateAfter),
      'EndDate<': serialize.iso8601Date(opts.endDateBefore),
      'EndDate': serialize.iso8601Date(opts.endDate),
      'EndDate>': serialize.iso8601Date(opts.endDateAfter),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = version.page(
      'GET',
      this._uri,
      { params: params }
    );

    promise = promise.then(function(response) {
      return new AlertPage(
        this._version,
        response
      );
    }.bind(this));

    return promise;
  };

  /**
   * Constructs a AlertContext
   *
   * @param {string} sid - The sid
   *
   * @returns AlertContext
   */
  AlertListInstance.get = function get(sid) {
    return new AlertContext(
      this._version,
      sid
    );
  };

  return AlertListInstance;
}


/**
 * Initialize the AlertContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {object} payload - The instance payload
 * @param {sid} sid - The sid
 *
 * @returns {AlertContext}
 */
function AlertInstance(version, payload, sid) {
  InstanceResource.prototype.constructor.call(this, version);

  // Marshaled Properties
  this._properties = {
    accountSid: payload.account_sid, // jshint ignore:line,
    alertText: payload.alert_text, // jshint ignore:line,
    apiVersion: payload.api_version, // jshint ignore:line,
    dateCreated: deserialize.iso8601DateTime(payload.date_created), // jshint ignore:line,
    dateGenerated: deserialize.iso8601DateTime(payload.date_generated), // jshint ignore:line,
    dateUpdated: deserialize.iso8601DateTime(payload.date_updated), // jshint ignore:line,
    errorCode: payload.error_code, // jshint ignore:line,
    logLevel: payload.log_level, // jshint ignore:line,
    moreInfo: payload.more_info, // jshint ignore:line,
    requestMethod: payload.request_method, // jshint ignore:line,
    requestUrl: payload.request_url, // jshint ignore:line,
    resourceSid: payload.resource_sid, // jshint ignore:line,
    sid: payload.sid, // jshint ignore:line,
    url: payload.url, // jshint ignore:line,
    requestVariables: payload.request_variables, // jshint ignore:line,
    responseBody: payload.response_body, // jshint ignore:line,
    responseHeaders: payload.response_headers, // jshint ignore:line,
  };

  // Context
  this._context = undefined;
  this._solution = {
    sid: sid || this._properties.sid,
  };
}

_.extend(AlertInstance.prototype, InstanceResource.prototype);
AlertInstance.prototype.constructor = AlertInstance;

Object.defineProperty(AlertInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new AlertContext(
        this._version,
        this._solution.sid
      );
    }

    return this._context;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'accountSid', {
  get: function() {
    return this._properties.accountSid;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'alertText', {
  get: function() {
    return this._properties.alertText;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'apiVersion', {
  get: function() {
    return this._properties.apiVersion;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'dateCreated', {
  get: function() {
    return this._properties.dateCreated;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'dateGenerated', {
  get: function() {
    return this._properties.dateGenerated;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'dateUpdated', {
  get: function() {
    return this._properties.dateUpdated;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'errorCode', {
  get: function() {
    return this._properties.errorCode;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'logLevel', {
  get: function() {
    return this._properties.logLevel;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'moreInfo', {
  get: function() {
    return this._properties.moreInfo;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'requestMethod', {
  get: function() {
    return this._properties.requestMethod;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'requestUrl', {
  get: function() {
    return this._properties.requestUrl;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'requestVariables', {
  get: function() {
    return this._properties.requestVariables;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'resourceSid', {
  get: function() {
    return this._properties.resourceSid;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'responseBody', {
  get: function() {
    return this._properties.responseBody;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'responseHeaders', {
  get: function() {
    return this._properties.responseHeaders;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'sid', {
  get: function() {
    return this._properties.sid;
  },
});

Object.defineProperty(AlertInstance.prototype,
  'url', {
  get: function() {
    return this._properties.url;
  },
});

/**
 * Fetch a AlertInstance
 *
 * @returns Fetched AlertInstance
 */
AlertInstance.prototype.fetch = function fetch() {
  return this._proxy.fetch();
};

/**
 * Deletes the AlertInstance
 *
 * @returns true if delete succeeds, false otherwise
 */
AlertInstance.prototype.remove = function remove() {
  return this._proxy.remove();
};


/**
 * Initialize the AlertContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {sid} sid - The sid
 *
 * @returns {AlertContext}
 */
function AlertContext(version, sid) {
  InstanceContext.prototype.constructor.call(this, version);

  // Path Solution
  this._solution = {
    sid: sid,
  };
  this._uri = _.template(
    '/Alerts/<%= sid %>' // jshint ignore:line
  )(this._solution);
}

_.extend(AlertContext.prototype, InstanceContext.prototype);
AlertContext.prototype.constructor = AlertContext;

/**
 * Fetch a AlertInstance
 *
 * @returns Fetched AlertInstance
 */
AlertContext.prototype.fetch = function fetch() {
  var params = values.of({});

  var promise = this._version.fetch({
    method: 'GET',
    uri: this._uri,
    params: params,
  });

  promise = promise.then(function(payload) {
    return new AlertInstance(
      this._version,
      payload,
      this._solution.sid
    );
  }.bind(this));

  return promise;
};

/**
 * Deletes the AlertInstance
 *
 * @returns true if delete succeeds, false otherwise
 */
AlertContext.prototype.remove = function remove() {
  return this._version.remove({
    method: 'DELETE',
    uri: this._uri
  });
};

module.exports = {
  AlertPage: AlertPage,
  AlertList: AlertList,
  AlertInstance: AlertInstance,
  AlertContext: AlertContext
};