// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/bespoke/lib/bespoke.js":[function(require,module,exports) {
var from = function (opts, plugins) {
  var parent = (opts.parent || opts).nodeType === 1 ? opts.parent || opts : document.querySelector(opts.parent || opts),
      slides = [].filter.call(typeof opts.slides === 'string' ? parent.querySelectorAll(opts.slides) : opts.slides || parent.children, function (el) {
    return el.nodeName !== 'SCRIPT';
  }),
      activeSlide = slides[0],
      listeners = {},
      activate = function (index, customData) {
    if (!slides[index]) {
      return;
    }

    fire('deactivate', createEventData(activeSlide, customData));
    activeSlide = slides[index];
    fire('activate', createEventData(activeSlide, customData));
  },
      slide = function (index, customData) {
    if (arguments.length) {
      fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
    } else {
      return slides.indexOf(activeSlide);
    }
  },
      step = function (offset, customData) {
    var slideIndex = slides.indexOf(activeSlide) + offset;

    fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
  },
      on = function (eventName, callback) {
    (listeners[eventName] || (listeners[eventName] = [])).push(callback);
    return off.bind(null, eventName, callback);
  },
      off = function (eventName, callback) {
    listeners[eventName] = (listeners[eventName] || []).filter(function (listener) {
      return listener !== callback;
    });
  },
      fire = function (eventName, eventData) {
    return (listeners[eventName] || []).reduce(function (notCancelled, callback) {
      return notCancelled && callback(eventData) !== false;
    }, true);
  },
      createEventData = function (el, eventData) {
    eventData = eventData || {};
    eventData.index = slides.indexOf(el);
    eventData.slide = el;
    return eventData;
  },
      deck = {
    on: on,
    off: off,
    fire: fire,
    slide: slide,
    next: step.bind(null, 1),
    prev: step.bind(null, -1),
    parent: parent,
    slides: slides
  };

  (plugins || []).forEach(function (plugin) {
    plugin(deck);
  });

  activate(0);

  return deck;
};

module.exports = {
  from: from
};
},{}],"node_modules/bespoke-keys/lib/bespoke-keys.js":[function(require,module,exports) {
module.exports = function (options) {
  return function (deck) {
    var isHorizontal = options !== 'vertical';

    document.addEventListener('keydown', function (e) {
      if (e.which == 34 || // PAGE DOWN
      e.which == 32 && !e.shiftKey || // SPACE WITHOUT SHIFT
      isHorizontal && e.which == 39 || // RIGHT
      !isHorizontal && e.which == 40 // DOWN
      ) {
          deck.next();
        }

      if (e.which == 33 || // PAGE UP
      e.which == 32 && e.shiftKey || // SPACE + SHIFT
      isHorizontal && e.which == 37 || // LEFT
      !isHorizontal && e.which == 38 // UP
      ) {
          deck.prev();
        }
    });
  };
};
},{}],"node_modules/bespoke-vcr/lib/bespoke-vcr.js":[function(require,module,exports) {
var getRecordings = function () {
  var recordings = localStorage['bespoke-vcr'];
  return recordings ? JSON.parse(recordings) : [];
},
    getLatestRecording = function () {
  var recordings = getRecordings();
  return recordings.length ? recordings[recordings.length - 1] : undefined;
},
    save = function (recordings) {
  localStorage['bespoke-vcr'] = JSON.stringify(recordings);
},
    clear = function () {
  delete localStorage['bespoke-vcr'];
};

var vcr = function (options) {
  return function (deck) {
    options = options || {};
    options.reporter = options.reporter || 'console';

    var recordings = getRecordings() || [],
        frames = options.recording || getLatestRecording(),
        report = typeof options.reporter === 'string' ? vcr.reporters[options.reporter] : options.reporter,
        recordStartTime,
        isRecording = false,
        isPlaying = false;

    var status = function () {
      var indicator = document.createElement('div'),
          size = '8px';

      indicator.style.width = size;
      indicator.style.height = size;
      indicator.style.borderRadius = size;
      indicator.style.position = 'absolute';
      indicator.style.left = '4px';
      indicator.style.bottom = '4px';
      indicator.style.backgroundColor = 'transparent';
      document.body.appendChild(indicator);

      return {
        red: function () {
          indicator.style.backgroundColor = 'red';
        },
        green: function () {
          indicator.style.backgroundColor = 'green';
        },
        clear: function () {
          indicator.style.backgroundColor = 'transparent';
        }
      };
    }();

    var record = function () {
      if (isRecording) {
        return stop();
      }

      deck.slide(0);

      isRecording = true;
      isPlaying = false;
      status.red();

      report('Recording to local storage...');
      recordStartTime = new Date().getTime();

      frames = [];
      recordings.push(frames);
    };

    var play = function () {
      if (isRecording) {
        stop();
      }

      if (frames.length === 0) {
        return;
      }

      isPlaying = true;
      status.green();

      report('Playing the following recording:', frames);

      deck.slide(0);
      frames.forEach(function (frame) {
        setTimeout(function () {
          if (frame.command) {
            deck[frame.command].apply(null, frame.arguments || []);
          } else {
            report('Playback complete');
            isPlaying = false;
            status.clear();
          }
        }, frame.timeout);
      });
    };

    var stop = function () {
      if (isRecording) {
        frames.push({
          timeout: new Date().getTime() - recordStartTime
        });
        save(recordings);
        report('Successfully recorded the following to local storage:', frames);
      }

      isRecording = false;
      isPlaying = false;
      status.clear();
    };

    ['next', 'prev', 'slide'].forEach(function (command) {
      deck.on(command, function (e) {
        var frame = {
          command: command,
          timeout: new Date().getTime() - recordStartTime
        };

        if (command === 'slide') {
          frame.arguments = [e.index];
        }

        if (isRecording) {
          frames.push(frame);
          save(recordings);
        }
      });
    });

    var setupRemote = options.remote || function (remote) {
      window.addEventListener('keydown', function (e) {
        var P = 80,
            R = 82,
            S = 83;

        switch (e.which) {
          case R:
            remote.record();
            break;
          case S:
            remote.stop();
            break;
          case P:
            remote.play();
            break;
        }
      });
    },
        controls = {
      record: record,
      play: play,
      stop: stop
    };

    setupRemote(controls);
  };
};

vcr.reporters = {
  console: function (title, data) {
    console.log('BESPOKE-VCR: ' + title + '\n' + (data ? JSON.stringify(data, null, 2) + '\n' : ''));
  }
};

vcr.latest = function () {
  vcr.reporters.console('Latest recording:', getLatestRecording());
};

vcr.all = function () {
  vcr.reporters.console('All recordings:', getRecordings());
};

vcr.clear = clear;

module.exports = vcr;
},{}],"main.js":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var bespoke = require('bespoke');
var bespokeKeys = require('bespoke-keys');
var bespokeVcr = require('bespoke-vcr');

window.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
  }
});

bespoke.from('body', [bespokeKeys('vertical'), bespokeVcr({
  recording: createTimeline([0.75, 1, 1, 4, 5, 2, 4, 5, 25, 5])
})]).on('activate', function (_ref) {
  var slide = _ref.slide;

  slide.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  });

  return false;
});

function createTimeline(timeouts) {
  return timeouts.reduce(function (timeline, timeout, index) {
    return [].concat(_toConsumableArray(timeline), [{
      command: 'slide',
      arguments: [index + 1],
      timeout: timeline[timeline.length - 1].timeout + toMilliseconds(timeout)
    }]);
  }, [{ timeout: 0 }]);
}

function toMilliseconds(minutes) {
  return minutes * 1000;
  return minutes * 60 * 1000;
}
},{"bespoke":"node_modules/bespoke/lib/bespoke.js","bespoke-keys":"node_modules/bespoke-keys/lib/bespoke-keys.js","bespoke-vcr":"node_modules/bespoke-vcr/lib/bespoke-vcr.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '33693' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.9f8ee7ae.map