
/**
 * A Model is a structured object which, through the use of ES6 Proxies, can
 * publish to subscribers any changes to any values within its structure,
 * including Array mutations.
 */
function Model(defaultSubscriber, initialValue) {
  var model;
  var subscribers = [ ];

  // Call all subscriber functions
  var publish = function() {
    subscribers.forEach((subscriber) => {
      try {
        subscriber(model);
      } catch(err) {
        console.error(err);
      }
    });
  };

  // Wrap a proxy around an object and each of its object children, recursively.
  // Proxy is created post-recursion, so that the setters aren't triggered for
  // every step of the process.
  function recursiveProxy(obj, handler) {
    var newObj = obj;
    if(newObj !== null && typeof newObj === 'object' && !newObj._isProxy && !(newObj instanceof Date)) {
      Object.keys(newObj).forEach((key) => {
        newObj[key] = recursiveProxy(obj[key], handler);
      });
      Object.defineProperty(newObj, '_isProxy', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: true
      });
      newObj = new Proxy(newObj, handler);
    }
    return newObj;
  }

  /*** This is where the magic happens ***/
  var proxyHandler = {

    // intercept property assignment behavior
    set: (obj, prop, val) => {

      // if assignment value is an object, wrap it in its own proxy (recursive)
      if(val !== null && typeof val === 'object') {
        val = recursiveProxy(val, proxyHandler);
      }

      // the default behavior to store the value
      obj[prop] = val;

      // publish to subscribers
      publish();

      // indicate success
      return true;
    },

    deleteProperty: (obj, prop) => {

      // the default behavior
      delete obj[prop];

      // publish to subscribers
      publish();

      // indicate success
      return true;
    },

  }


  // Contruct Model instance as proxy to initial value
  if(initialValue !== null && typeof initialValue === 'object') {

    // re-assign all object values to trigger the proxy setter
    model = recursiveProxy(initialValue, proxyHandler);
  }

  // Add a subscriber function, to be called on changes
  model.addSubscriber = function(subscriber) {
    var subscriberFunction;

    // If subscriber is a React component - a common use case - add its setState
    // function as a subscriber
    if(typeof subscriber.setState === 'function') {
      subscriberFunction = () => subscriber.setState({});
    } else if(typeof subscriber === 'function') {
      subscriberFunction = subscriber;
    }

    subscribers.push(subscriberFunction);
  };

  // Add default subscriber
  if(defaultSubscriber !== null) {
    model.addSubscriber(defaultSubscriber);
  }

  // Return new instance
  return model;
}
