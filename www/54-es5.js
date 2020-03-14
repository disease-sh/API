(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-route_4.entry.js":
  /*!****************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-route_4.entry.js ***!
    \****************************************************************/

  /*! exports provided: ion_route, ion_route_redirect, ion_router, ion_router_link */

  /***/
  function node_modulesIonicCoreDistEsmIonRoute_4EntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_route", function () {
      return Route;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_route_redirect", function () {
      return RouteRedirect;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_router", function () {
      return Router;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_router_link", function () {
      return RouterLink;
    });
    /* harmony import */


    var _core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./core-0a8d4d2e.js */
    "./node_modules/@ionic/core/dist/esm/core-0a8d4d2e.js");
    /* harmony import */


    var _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./config-3c7f3790.js */
    "./node_modules/@ionic/core/dist/esm/config-3c7f3790.js");
    /* harmony import */


    var _helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./helpers-46f4a262.js */
    "./node_modules/@ionic/core/dist/esm/helpers-46f4a262.js");
    /* harmony import */


    var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./theme-18cbe2cc.js */
    "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");

    const Route = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * Relative path that needs to match in order for this route to apply.
         *
         * Accepts paths similar to expressjs so that you can define parameters
         * in the url /foo/:bar where bar would be available in incoming props.
         */

        this.url = '';
        this.ionRouteDataChanged = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteDataChanged", 7);
      }

      onUpdate(newValue) {
        this.ionRouteDataChanged.emit(newValue);
      }

      onComponentProps(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        const keys1 = newValue ? Object.keys(newValue) : [];
        const keys2 = oldValue ? Object.keys(oldValue) : [];

        if (keys1.length !== keys2.length) {
          this.onUpdate(newValue);
          return;
        }

        for (const key of keys1) {
          if (newValue[key] !== oldValue[key]) {
            this.onUpdate(newValue);
            return;
          }
        }
      }

      connectedCallback() {
        this.ionRouteDataChanged.emit();
      }

      static get watchers() {
        return {
          "url": ["onUpdate"],
          "component": ["onUpdate"],
          "componentProps": ["onComponentProps"]
        };
      }

    };
    const RouteRedirect = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.ionRouteRedirectChanged = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteRedirectChanged", 7);
      }

      propDidChange() {
        this.ionRouteRedirectChanged.emit();
      }

      connectedCallback() {
        this.ionRouteRedirectChanged.emit();
      }

      static get watchers() {
        return {
          "from": ["propDidChange"],
          "to": ["propDidChange"]
        };
      }

    };
    const ROUTER_INTENT_NONE = 'root';
    const ROUTER_INTENT_FORWARD = 'forward';
    const ROUTER_INTENT_BACK = 'back';

    const generatePath = segments => {
      const path = segments.filter(s => s.length > 0).join('/');
      return '/' + path;
    };

    const chainToPath = chain => {
      const path = [];

      for (const route of chain) {
        for (const segment of route.path) {
          if (segment[0] === ':') {
            const param = route.params && route.params[segment.slice(1)];

            if (!param) {
              return null;
            }

            path.push(param);
          } else if (segment !== '') {
            path.push(segment);
          }
        }
      }

      return path;
    };

    const writePath = (history, root, useHash, path, direction, state) => {
      let url = generatePath([...parsePath(root), ...path]);

      if (useHash) {
        url = '#' + url;
      }

      if (direction === ROUTER_INTENT_FORWARD) {
        history.pushState(state, '', url);
      } else {
        history.replaceState(state, '', url);
      }
    };

    const removePrefix = (prefix, path) => {
      if (prefix.length > path.length) {
        return null;
      }

      if (prefix.length <= 1 && prefix[0] === '') {
        return path;
      }

      for (let i = 0; i < prefix.length; i++) {
        if (prefix[i].length > 0 && prefix[i] !== path[i]) {
          return null;
        }
      }

      if (path.length === prefix.length) {
        return [''];
      }

      return path.slice(prefix.length);
    };

    const readPath = (loc, root, useHash) => {
      let pathname = loc.pathname;

      if (useHash) {
        const hash = loc.hash;
        pathname = hash[0] === '#' ? hash.slice(1) : '';
      }

      const prefix = parsePath(root);
      const path = parsePath(pathname);
      return removePrefix(prefix, path);
    };

    const parsePath = path => {
      if (path == null) {
        return [''];
      }

      const segments = path.split('/').map(s => s.trim()).filter(s => s.length > 0);

      if (segments.length === 0) {
        return [''];
      } else {
        return segments;
      }
    };

    const printRoutes = routes => {
      console.group("[ion-core] ROUTES[".concat(routes.length, "]"));

      for (const chain of routes) {
        const path = [];
        chain.forEach(r => path.push(...r.path));
        const ids = chain.map(r => r.id);
        console.debug("%c ".concat(generatePath(path)), 'font-weight: bold; padding-left: 20px', '=>\t', "(".concat(ids.join(', '), ")"));
      }

      console.groupEnd();
    };

    const printRedirects = redirects => {
      console.group("[ion-core] REDIRECTS[".concat(redirects.length, "]"));

      for (const redirect of redirects) {
        if (redirect.to) {
          console.debug('FROM: ', "$c ".concat(generatePath(redirect.from)), 'font-weight: bold', ' TO: ', "$c ".concat(generatePath(redirect.to)), 'font-weight: bold');
        }
      }

      console.groupEnd();
    };

    const writeNavState = async (root, chain, direction, index, changed = false) => {
      try {
        // find next navigation outlet in the DOM
        const outlet = searchNavNode(root); // make sure we can continue interacting the DOM, otherwise abort

        if (index >= chain.length || !outlet) {
          return changed;
        }

        await outlet.componentOnReady();
        const route = chain[index];
        const result = await outlet.setRouteId(route.id, route.params, direction); // if the outlet changed the page, reset navigation to neutral (no direction)
        // this means nested outlets will not animate

        if (result.changed) {
          direction = ROUTER_INTENT_NONE;
          changed = true;
        } // recursively set nested outlets


        changed = await writeNavState(result.element, chain, direction, index + 1, changed); // once all nested outlets are visible let's make the parent visible too,
        // using markVisible prevents flickering

        if (result.markVisible) {
          await result.markVisible();
        }

        return changed;
      } catch (e) {
        console.error(e);
        return false;
      }
    };

    const readNavState = async root => {
      const ids = [];
      let outlet;
      let node = root; // tslint:disable-next-line:no-constant-condition

      while (true) {
        outlet = searchNavNode(node);

        if (outlet) {
          const id = await outlet.getRouteId();

          if (id) {
            node = id.element;
            id.element = undefined;
            ids.push(id);
          } else {
            break;
          }
        } else {
          break;
        }
      }

      return {
        ids,
        outlet
      };
    };

    const waitUntilNavNode = () => {
      if (searchNavNode(document.body)) {
        return Promise.resolve();
      }

      return new Promise(resolve => {
        window.addEventListener('ionNavWillLoad', resolve, {
          once: true
        });
      });
    };

    const QUERY = ':not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet';

    const searchNavNode = root => {
      if (!root) {
        return undefined;
      }

      if (root.matches(QUERY)) {
        return root;
      }

      const outlet = root.querySelector(QUERY);
      return outlet ? outlet : undefined;
    };

    const matchesRedirect = (input, route) => {
      const {
        from,
        to
      } = route;

      if (to === undefined) {
        return false;
      }

      if (from.length > input.length) {
        return false;
      }

      for (let i = 0; i < from.length; i++) {
        const expected = from[i];

        if (expected === '*') {
          return true;
        }

        if (expected !== input[i]) {
          return false;
        }
      }

      return from.length === input.length;
    };

    const routeRedirect = (path, routes) => {
      return routes.find(route => matchesRedirect(path, route));
    };

    const matchesIDs = (ids, chain) => {
      const len = Math.min(ids.length, chain.length);
      let i = 0;

      for (; i < len; i++) {
        if (ids[i].toLowerCase() !== chain[i].id) {
          break;
        }
      }

      return i;
    };

    const matchesPath = (inputPath, chain) => {
      const segments = new RouterSegments(inputPath);
      let matchesDefault = false;
      let allparams;

      for (let i = 0; i < chain.length; i++) {
        const path = chain[i].path;

        if (path[0] === '') {
          matchesDefault = true;
        } else {
          for (const segment of path) {
            const data = segments.next(); // data param

            if (segment[0] === ':') {
              if (data === '') {
                return null;
              }

              allparams = allparams || [];
              const params = allparams[i] || (allparams[i] = {});
              params[segment.slice(1)] = data;
            } else if (data !== segment) {
              return null;
            }
          }

          matchesDefault = false;
        }
      }

      const matches = matchesDefault ? matchesDefault === (segments.next() === '') : true;

      if (!matches) {
        return null;
      }

      if (allparams) {
        return chain.map((route, i) => ({
          id: route.id,
          path: route.path,
          params: mergeParams(route.params, allparams[i])
        }));
      }

      return chain;
    };

    const mergeParams = (a, b) => {
      if (!a && b) {
        return b;
      } else if (a && !b) {
        return a;
      } else if (a && b) {
        return Object.assign(Object.assign({}, a), b);
      }

      return undefined;
    };

    const routerIDsToChain = (ids, chains) => {
      let match = null;
      let maxMatches = 0;
      const plainIDs = ids.map(i => i.id);

      for (const chain of chains) {
        const score = matchesIDs(plainIDs, chain);

        if (score > maxMatches) {
          match = chain;
          maxMatches = score;
        }
      }

      if (match) {
        return match.map((route, i) => ({
          id: route.id,
          path: route.path,
          params: mergeParams(route.params, ids[i] && ids[i].params)
        }));
      }

      return null;
    };

    const routerPathToChain = (path, chains) => {
      let match = null;
      let matches = 0;

      for (const chain of chains) {
        const matchedChain = matchesPath(path, chain);

        if (matchedChain !== null) {
          const score = computePriority(matchedChain);

          if (score > matches) {
            matches = score;
            match = matchedChain;
          }
        }
      }

      return match;
    };

    const computePriority = chain => {
      let score = 1;
      let level = 1;

      for (const route of chain) {
        for (const path of route.path) {
          if (path[0] === ':') {
            score += Math.pow(1, level);
          } else if (path !== '') {
            score += Math.pow(2, level);
          }

          level++;
        }
      }

      return score;
    };

    class RouterSegments {
      constructor(path) {
        this.path = path.slice();
      }

      next() {
        if (this.path.length > 0) {
          return this.path.shift();
        }

        return '';
      }

    }

    const readRedirects = root => {
      return Array.from(root.children).filter(el => el.tagName === 'ION-ROUTE-REDIRECT').map(el => {
        const to = readProp(el, 'to');
        return {
          from: parsePath(readProp(el, 'from')),
          to: to == null ? undefined : parsePath(to)
        };
      });
    };

    const readRoutes = root => {
      return flattenRouterTree(readRouteNodes(root));
    };

    const readRouteNodes = (root, node = root) => {
      return Array.from(node.children).filter(el => el.tagName === 'ION-ROUTE' && el.component).map(el => {
        const component = readProp(el, 'component');

        if (component == null) {
          throw new Error('component missing in ion-route');
        }

        return {
          path: parsePath(readProp(el, 'url')),
          id: component.toLowerCase(),
          params: el.componentProps,
          children: readRouteNodes(root, el)
        };
      });
    };

    const readProp = (el, prop) => {
      if (prop in el) {
        return el[prop];
      }

      if (el.hasAttribute(prop)) {
        return el.getAttribute(prop);
      }

      return null;
    };

    const flattenRouterTree = nodes => {
      const routes = [];

      for (const node of nodes) {
        flattenNode([], routes, node);
      }

      return routes;
    };

    const flattenNode = (chain, routes, node) => {
      const s = chain.slice();
      s.push({
        id: node.id,
        path: node.path,
        params: node.params
      });

      if (node.children.length === 0) {
        routes.push(s);
        return;
      }

      for (const sub of node.children) {
        flattenNode(s, routes, sub);
      }
    };

    const Router = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.previousPath = null;
        this.busy = false;
        this.state = 0;
        this.lastState = 0;
        /**
         * By default `ion-router` will match the routes at the root path ("/").
         * That can be changed when
         *
         */

        this.root = '/';
        /**
         * The router can work in two "modes":
         * - With hash: `/index.html#/path/to/page`
         * - Without hash: `/path/to/page`
         *
         * Using one or another might depend in the requirements of your app and/or where it's deployed.
         *
         * Usually "hash-less" navigation works better for SEO and it's more user friendly too, but it might
         * requires additional server-side configuration in order to properly work.
         *
         * On the otherside hash-navigation is much easier to deploy, it even works over the file protocol.
         *
         * By default, this property is `true`, change to `false` to allow hash-less URLs.
         */

        this.useHash = true;
        this.ionRouteWillChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteWillChange", 7);
        this.ionRouteDidChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteDidChange", 7);
      }

      async componentWillLoad() {
        console.debug('[ion-router] router will load');
        await waitUntilNavNode();
        console.debug('[ion-router] found nav');
        await this.onRoutesChanged();
      }

      componentDidLoad() {
        window.addEventListener('ionRouteRedirectChanged', Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.onRedirectChanged.bind(this), 10));
        window.addEventListener('ionRouteDataChanged', Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.onRoutesChanged.bind(this), 100));
      }

      onPopState() {
        const direction = this.historyDirection();
        const path = this.getPath();
        console.debug('[ion-router] URL changed -> update nav', path, direction);
        return this.writeNavStateRoot(path, direction);
      }

      onBackButton(ev) {
        ev.detail.register(0, () => this.back());
      }
      /**
       * Navigate to the specified URL.
       *
       * @param url The url to navigate to.
       * @param direction The direction of the animation. Defaults to `"forward"`.
       */


      push(url, direction = 'forward') {
        if (url.startsWith('.')) {
          url = new URL(url, window.location.href).pathname;
        }

        console.debug('[ion-router] URL pushed -> updating nav', url, direction);
        const path = parsePath(url);
        this.setPath(path, direction);
        return this.writeNavStateRoot(path, direction);
      }
      /**
       * Go back to previous page in the window.history.
       */


      back() {
        window.history.back();
        return Promise.resolve(this.waitPromise);
      }
      /** @internal */


      async printDebug() {
        console.debug('CURRENT PATH', this.getPath());
        console.debug('PREVIOUS PATH', this.previousPath);
        printRoutes(readRoutes(this.el));
        printRedirects(readRedirects(this.el));
      }
      /** @internal */


      async navChanged(direction) {
        if (this.busy) {
          console.warn('[ion-router] router is busy, navChanged was cancelled');
          return false;
        }

        const {
          ids,
          outlet
        } = await readNavState(window.document.body);
        const routes = readRoutes(this.el);
        const chain = routerIDsToChain(ids, routes);

        if (!chain) {
          console.warn('[ion-router] no matching URL for ', ids.map(i => i.id));
          return false;
        }

        const path = chainToPath(chain);

        if (!path) {
          console.warn('[ion-router] router could not match path because some required param is missing');
          return false;
        }

        console.debug('[ion-router] nav changed -> update URL', ids, path);
        this.setPath(path, direction);
        await this.safeWriteNavState(outlet, chain, ROUTER_INTENT_NONE, path, null, ids.length);
        return true;
      }

      onRedirectChanged() {
        const path = this.getPath();

        if (path && routeRedirect(path, readRedirects(this.el))) {
          this.writeNavStateRoot(path, ROUTER_INTENT_NONE);
        }
      }

      onRoutesChanged() {
        return this.writeNavStateRoot(this.getPath(), ROUTER_INTENT_NONE);
      }

      historyDirection() {
        const win = window;

        if (win.history.state === null) {
          this.state++;
          win.history.replaceState(this.state, win.document.title, win.document.location && win.document.location.href);
        }

        const state = win.history.state;
        const lastState = this.lastState;
        this.lastState = state;

        if (state > lastState) {
          return ROUTER_INTENT_FORWARD;
        } else if (state < lastState) {
          return ROUTER_INTENT_BACK;
        } else {
          return ROUTER_INTENT_NONE;
        }
      }

      async writeNavStateRoot(path, direction) {
        if (!path) {
          console.error('[ion-router] URL is not part of the routing set');
          return false;
        } // lookup redirect rule


        const redirects = readRedirects(this.el);
        const redirect = routeRedirect(path, redirects);
        let redirectFrom = null;

        if (redirect) {
          this.setPath(redirect.to, direction);
          redirectFrom = redirect.from;
          path = redirect.to;
        } // lookup route chain


        const routes = readRoutes(this.el);
        const chain = routerPathToChain(path, routes);

        if (!chain) {
          console.error('[ion-router] the path does not match any route');
          return false;
        } // write DOM give


        return this.safeWriteNavState(document.body, chain, direction, path, redirectFrom);
      }

      async safeWriteNavState(node, chain, direction, path, redirectFrom, index = 0) {
        const unlock = await this.lock();
        let changed = false;

        try {
          changed = await this.writeNavState(node, chain, direction, path, redirectFrom, index);
        } catch (e) {
          console.error(e);
        }

        unlock();
        return changed;
      }

      async lock() {
        const p = this.waitPromise;
        let resolve;
        this.waitPromise = new Promise(r => resolve = r);

        if (p !== undefined) {
          await p;
        }

        return resolve;
      }

      async writeNavState(node, chain, direction, path, redirectFrom, index = 0) {
        if (this.busy) {
          console.warn('[ion-router] router is busy, transition was cancelled');
          return false;
        }

        this.busy = true; // generate route event and emit will change

        const routeEvent = this.routeChangeEvent(path, redirectFrom);

        if (routeEvent) {
          this.ionRouteWillChange.emit(routeEvent);
        }

        const changed = await writeNavState(node, chain, direction, index);
        this.busy = false;

        if (changed) {
          console.debug('[ion-router] route changed', path);
        } // emit did change


        if (routeEvent) {
          this.ionRouteDidChange.emit(routeEvent);
        }

        return changed;
      }

      setPath(path, direction) {
        this.state++;
        writePath(window.history, this.root, this.useHash, path, direction, this.state);
      }

      getPath() {
        return readPath(window.location, this.root, this.useHash);
      }

      routeChangeEvent(path, redirectFromPath) {
        const from = this.previousPath;
        const to = generatePath(path);
        this.previousPath = to;

        if (to === from) {
          return null;
        }

        const redirectedFrom = redirectFromPath ? generatePath(redirectFromPath) : null;
        return {
          from,
          redirectedFrom,
          to
        };
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

    };
    const RouterLink = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */

        this.routerDirection = 'forward';

        this.onClick = ev => {
          Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["o"])(this.href, ev, this.routerDirection);
        };
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const attrs = {
          href: this.href,
          rel: this.rel,
          target: this.target
        };
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          onClick: this.onClick,
          class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color)), {
            [mode]: true,
            'ion-activatable': true
          })
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("a", Object.assign({}, attrs), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
      }

      static get style() {
        return ":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}";
      }

    };
    /***/
  }
}]);
//# sourceMappingURL=54-es5.js.map