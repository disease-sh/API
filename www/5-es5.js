(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-app_8-md.entry.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-app_8-md.entry.js ***!
    \*****************************************************************/

  /*! exports provided: ion_app, ion_buttons, ion_content, ion_footer, ion_header, ion_router_outlet, ion_title, ion_toolbar */

  /***/
  function node_modulesIonicCoreDistEsmIonApp_8MdEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_app", function () {
      return App;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_buttons", function () {
      return Buttons;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_content", function () {
      return Content;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_footer", function () {
      return Footer;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_header", function () {
      return Header;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_router_outlet", function () {
      return RouterOutlet;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_title", function () {
      return ToolbarTitle;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_toolbar", function () {
      return Toolbar;
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


    var _cubic_bezier_1d592096_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./cubic-bezier-1d592096.js */
    "./node_modules/@ionic/core/dist/esm/cubic-bezier-1d592096.js");
    /* harmony import */


    var _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./constants-3c3e1099.js */
    "./node_modules/@ionic/core/dist/esm/constants-3c3e1099.js");
    /* harmony import */


    var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./theme-18cbe2cc.js */
    "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");
    /* harmony import */


    var _framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./framework-delegate-c2e2e1f4.js */
    "./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js");
    /* harmony import */


    var _index_1469ea79_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./index-1469ea79.js */
    "./node_modules/@ionic/core/dist/esm/index-1469ea79.js");

    const App = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }

      componentDidLoad() {
        {
          rIC(() => {
            const isHybrid = Object(_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["i"])(window, 'hybrid');

            if (!_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('_testing')) {
              __webpack_require__.e(
              /*! import() | tap-click-606f325e-js */
              "tap-click-606f325e-js").then(__webpack_require__.bind(null,
              /*! ./tap-click-606f325e.js */
              "./node_modules/@ionic/core/dist/esm/tap-click-606f325e.js")).then(module => module.startTapClick(_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"]));
            }

            if (_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('statusTap', isHybrid)) {
              __webpack_require__.e(
              /*! import() | status-tap-2ec46489-js */
              "status-tap-2ec46489-js").then(__webpack_require__.bind(null,
              /*! ./status-tap-2ec46489.js */
              "./node_modules/@ionic/core/dist/esm/status-tap-2ec46489.js")).then(module => module.startStatusTap());
            }

            if (_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('inputShims', needInputShims())) {
              __webpack_require__.e(
              /*! import() | input-shims-a4fc53ac-js */
              "input-shims-a4fc53ac-js").then(__webpack_require__.bind(null,
              /*! ./input-shims-a4fc53ac.js */
              "./node_modules/@ionic/core/dist/esm/input-shims-a4fc53ac.js")).then(module => module.startInputShims(_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"]));
            }

            if (_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('hardwareBackButton', isHybrid)) {
              Promise.resolve().then(__webpack_require__.bind(null,
              /*! ./hardware-back-button-1ed0083a.js */
              "./node_modules/@ionic/core/dist/esm/hardware-back-button-1ed0083a.js")).then(module => module.startHardwareBackButton());
            }

            __webpack_require__.e(
            /*! import() | focus-visible-70713a0c-js */
            "focus-visible-70713a0c-js").then(__webpack_require__.bind(null,
            /*! ./focus-visible-70713a0c.js */
            "./node_modules/@ionic/core/dist/esm/focus-visible-70713a0c.js")).then(module => module.startFocusVisible());
          });
        }
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: {
            [mode]: true,
            'ion-page': true,
            'force-statusbar-padding': _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('_forceStatusbarPadding')
          }
        });
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get style() {
        return "html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";
      }

    };

    const needInputShims = () => {
      return Object(_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["i"])(window, 'ios') && Object(_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["i"])(window, 'mobile');
    };

    const rIC = callback => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
      } else {
        setTimeout(callback, 32);
      }
    };

    const Buttons = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * If true, buttons will disappear when its
         * parent toolbar has fully collapsed if the toolbar
         * is not the first toolbar. If the toolbar is the
         * first toolbar, the buttons will be hidden and will
         * only be shown once all toolbars have fully collapsed.
         *
         * Only applies in `ios` mode with `collapse` set to
         * `true` on `ion-header`.
         *
         * Typically used for [Collapsible Large Titles](https://ionicframework.com/docs/api/title#collapsible-large-titles)
         */

        this.collapse = false;
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: {
            [mode]: true,
            ['buttons-collapse']: this.collapse
          }
        });
      }

      static get style() {
        return ".sc-ion-buttons-md-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99}.sc-ion-buttons-md-s  ion-button {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;--padding-top:0;--padding-bottom:0;--padding-start:8px;--padding-end:8px;--box-shadow:none;margin-left:2px;margin-right:2px;height:32px;font-size:14px;font-weight:500}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-buttons-md-s  ion-button {margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px}}.sc-ion-buttons-md-s  ion-button:not(.button-round) {--border-radius:2px}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button {--color:initial;--color-focused:var(--ion-color-contrast);--color-hover:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-contrast);--background-hover:var(--ion-color-contrast)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button-solid , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button-solid {--background:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-shade);--background-hover:var(--ion-color-base);--color:var(--ion-color-base);--color-focused:var(--ion-color-base);--color-hover:var(--ion-color-base)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button-outline , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button-outline {--border-color:var(--ion-color-contrast)}.sc-ion-buttons-md-s  .button-has-icon-only.button-clear {--padding-top:12px;--padding-end:12px;--padding-bottom:12px;--padding-start:12px;--border-radius:50%;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:48px;height:48px}.sc-ion-buttons-md-s  .button {--background-hover:currentColor}.sc-ion-buttons-md-s  .button-solid {--color:var(--ion-toolbar-background,var(--ion-background-color,#fff));--background:var(--ion-toolbar-color,var(--ion-text-color,#424242));--background-activated:transparent;--background-focused:currentColor}.sc-ion-buttons-md-s  .button-outline {--border-color:currentColor}.sc-ion-buttons-md-s  .button-clear , .sc-ion-buttons-md-s  .button-outline {--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor}.sc-ion-buttons-md-s  ion-icon[slot=start] {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-right:.3em;font-size:1.4em}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-buttons-md-s  ion-icon[slot=start] {margin-right:unset;-webkit-margin-end:.3em;margin-inline-end:.3em}}.sc-ion-buttons-md-s  ion-icon[slot=end] {margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-left:.4em;font-size:1.4em}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-buttons-md-s  ion-icon[slot=end] {margin-left:unset;-webkit-margin-start:.4em;margin-inline-start:.4em}}.sc-ion-buttons-md-s  ion-icon[slot=icon-only] {padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.8em}";
      }

    };
    const Content = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        this.cTop = -1;
        this.cBottom = -1;
        this.mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this); // Detail is used in a hot loop in the scroll event, by allocating it here
        // V8 will be able to inline any read/write to it since it's a monomorphic class.
        // https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html

        this.detail = {
          scrollTop: 0,
          scrollLeft: 0,
          type: 'scroll',
          event: undefined,
          startX: 0,
          startY: 0,
          startTime: 0,
          currentX: 0,
          currentY: 0,
          velocityX: 0,
          velocityY: 0,
          deltaX: 0,
          deltaY: 0,
          currentTime: 0,
          data: undefined,
          isScrolling: true
        };
        /**
         * If `true`, the content will scroll behind the headers
         * and footers. This effect can easily be seen by setting the toolbar
         * to transparent.
         */

        this.fullscreen = false;
        /**
         * If you want to enable the content scrolling in the X axis, set this property to `true`.
         */

        this.scrollX = false;
        /**
         * If you want to disable the content scrolling in the Y axis, set this property to `false`.
         */

        this.scrollY = true;
        /**
         * Because of performance reasons, ionScroll events are disabled by default, in order to enable them
         * and start listening from (ionScroll), set this property to `true`.
         */

        this.scrollEvents = false;
        this.ionScrollStart = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionScrollStart", 7);
        this.ionScroll = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionScroll", 7);
        this.ionScrollEnd = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionScrollEnd", 7);
      }

      disconnectedCallback() {
        this.onScrollEnd();
      }

      componentDidLoad() {
        this.resize();
      }

      onClick(ev) {
        if (this.isScrolling) {
          ev.preventDefault();
          ev.stopPropagation();
        }
      }

      shouldForceOverscroll() {
        const {
          forceOverscroll,
          mode
        } = this;
        return forceOverscroll === undefined ? mode === 'ios' && Object(_config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["i"])('ios') : forceOverscroll;
      }

      resize() {
        if (this.fullscreen) {
          Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["f"])(this.readDimensions.bind(this));
        } else if (this.cTop !== 0 || this.cBottom !== 0) {
          this.cTop = this.cBottom = 0;
          this.el.forceUpdate();
        }
      }

      readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;

        if (dirty) {
          this.cTop = top;
          this.cBottom = bottom;
          this.el.forceUpdate();
        }
      }

      onScroll(ev) {
        const timeStamp = Date.now();
        const shouldStart = !this.isScrolling;
        this.lastScroll = timeStamp;

        if (shouldStart) {
          this.onScrollStart();
        }

        if (!this.queued && this.scrollEvents) {
          this.queued = true;
          Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["f"])(ts => {
            this.queued = false;
            this.detail.event = ev;
            updateScrollDetail(this.detail, this.scrollEl, ts, shouldStart);
            this.ionScroll.emit(this.detail);
          });
        }
      }
      /**
       * Get the element where the actual scrolling takes place.
       * This element can be used to subscribe to `scroll` events or manually modify
       * `scrollTop`. However, it's recommended to use the API provided by `ion-content`:
       *
       * i.e. Using `ionScroll`, `ionScrollStart`, `ionScrollEnd` for scrolling events
       * and `scrollToPoint()` to scroll the content into a certain point.
       */


      getScrollElement() {
        return Promise.resolve(this.scrollEl);
      }
      /**
       * Scroll to the top of the component.
       *
       * @param duration The amount of time to take scrolling to the top. Defaults to `0`.
       */


      scrollToTop(duration = 0) {
        return this.scrollToPoint(undefined, 0, duration);
      }
      /**
       * Scroll to the bottom of the component.
       *
       * @param duration The amount of time to take scrolling to the bottom. Defaults to `0`.
       */


      scrollToBottom(duration = 0) {
        const y = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
        return this.scrollToPoint(undefined, y, duration);
      }
      /**
       * Scroll by a specified X/Y distance in the component.
       *
       * @param x The amount to scroll by on the horizontal axis.
       * @param y The amount to scroll by on the vertical axis.
       * @param duration The amount of time to take scrolling by that amount.
       */


      scrollByPoint(x, y, duration) {
        return this.scrollToPoint(x + this.scrollEl.scrollLeft, y + this.scrollEl.scrollTop, duration);
      }
      /**
       * Scroll to a specified X/Y location in the component.
       *
       * @param x The point to scroll to on the horizontal axis.
       * @param y The point to scroll to on the vertical axis.
       * @param duration The amount of time to take scrolling to that point. Defaults to `0`.
       */


      async scrollToPoint(x, y, duration = 0) {
        const el = this.scrollEl;

        if (duration < 32) {
          if (y != null) {
            el.scrollTop = y;
          }

          if (x != null) {
            el.scrollLeft = x;
          }

          return;
        }

        let resolve;
        let startTime = 0;
        const promise = new Promise(r => resolve = r);
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const deltaY = y != null ? y - fromY : 0;
        const deltaX = x != null ? x - fromX : 0; // scroll loop

        const step = timeStamp => {
          const linearTime = Math.min(1, (timeStamp - startTime) / duration) - 1;
          const easedT = Math.pow(linearTime, 3) + 1;

          if (deltaY !== 0) {
            el.scrollTop = Math.floor(easedT * deltaY + fromY);
          }

          if (deltaX !== 0) {
            el.scrollLeft = Math.floor(easedT * deltaX + fromX);
          }

          if (easedT < 1) {
            // do not use DomController here
            // must use nativeRaf in order to fire in the next frame
            // TODO: remove as any
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }; // chill out for a frame first


        requestAnimationFrame(ts => {
          startTime = ts;
          step(ts);
        });
        return promise;
      }

      onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
          isScrolling: true
        });

        if (this.watchDog) {
          clearInterval(this.watchDog);
        } // watchdog


        this.watchDog = setInterval(() => {
          if (this.lastScroll < Date.now() - 120) {
            this.onScrollEnd();
          }
        }, 100);
      }

      onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;

        if (this.isScrolling) {
          this.isScrolling = false;
          this.ionScrollEnd.emit({
            isScrolling: false
          });
        }
      }

      render() {
        const {
          scrollX,
          scrollY
        } = this;
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const forceOverscroll = this.shouldForceOverscroll();

        const transitionShadow = mode === 'ios' && _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('experimentalTransitionShadow', true);

        this.resize();
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__["c"])(this.color)), {
            [mode]: true,
            'content-sizing': Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__["h"])('ion-popover', this.el),
            'overscroll': forceOverscroll
          }),
          style: {
            '--offset-top': "".concat(this.cTop, "px"),
            '--offset-bottom': "".concat(this.cBottom, "px")
          }
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          id: "background-content"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("main", {
          class: {
            'inner-scroll': true,
            'scroll-x': scrollX,
            'scroll-y': scrollY,
            'overscroll': (scrollX || scrollY) && forceOverscroll
          },
          ref: el => this.scrollEl = el,
          onScroll: this.scrollEvents ? ev => this.onScroll(ev) : undefined
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), transitionShadow ? Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "transition-effect"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "transition-cover"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "transition-shadow"
        })) : null, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "fixed"
        }));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get style() {
        return ":host{--background:var(--ion-background-color,#fff);--color:var(--ion-text-color,#000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;-ms-flex:1;flex:1;width:100%;height:100%;margin:0!important;padding:0!important;font-family:var(--ion-font-family,inherit);contain:size style}:host(.ion-color) .inner-scroll{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.outer-content){--background:var(--ion-color-step-50,#f2f2f2)}#background-content{background:var(--background)}#background-content,.inner-scroll{left:0;right:0;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);position:absolute}.inner-scroll{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:calc(var(--padding-top) + var(--offset-top));padding-bottom:calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom));color:var(--color);-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.inner-scroll{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.scroll-x,.scroll-y{-webkit-overflow-scrolling:touch;will-change:scroll-position;-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-y{-ms-touch-action:pan-y;touch-action:pan-y;overflow-y:var(--overflow)}.scroll-x{-ms-touch-action:pan-x;touch-action:pan-x;overflow-x:var(--overflow)}.scroll-x.scroll-y{-ms-touch-action:auto;touch-action:auto}.overscroll:after,.overscroll:before{position:absolute;width:1px;height:1px;content:\"\"}.overscroll:before{bottom:-1px}.overscroll:after{top:-1px}:host(.content-sizing){contain:none}:host(.content-sizing) .inner-scroll{position:relative}.transition-effect{display:none;left:-100%;opacity:0;pointer-events:none}.transition-cover,.transition-effect{position:absolute;width:100%;height:100%}.transition-cover{right:0;background:#000;opacity:.1}.transition-shadow{display:block;position:absolute;right:0;width:10px;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTE3MDgzRkQ5QTkyMTFFOUEwNzQ5MkJFREE1NUY2MjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3MDgzRkU5QTkyMTFFOUEwNzQ5MkJFREE1NUY2MjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTcwODNGQjlBOTIxMUU5QTA3NDkyQkVEQTU1RjYyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMTcwODNGQzlBOTIxMUU5QTA3NDkyQkVEQTU1RjYyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmePEuQAAABNSURBVHjaYvz//z8DIxAwMDAwATGMhmFmPDQuOSZks0AMmoJBaQHjkPfB0Lfg/2gQjVow+HPy/yHvg9GiYjQfjMbBqAWjFgy/4hogwADYqwdzxy5BuwAAAABJRU5ErkJggg==);background-repeat:repeat-y;background-size:10px 16px}::slotted([slot=fixed]){position:absolute}";
      }

    };

    const getParentElement = el => {
      if (el.parentElement) {
        // normal element with a parent element
        return el.parentElement;
      }

      if (el.parentNode && el.parentNode.host) {
        // shadow dom's document fragment
        return el.parentNode.host;
      }

      return null;
    };

    const getPageElement = el => {
      const tabs = el.closest('ion-tabs');

      if (tabs) {
        return tabs;
      }

      const page = el.closest('ion-app,ion-page,.ion-page,page-inner');

      if (page) {
        return page;
      }

      return getParentElement(el);
    }; // ******** DOM READ ****************


    const updateScrollDetail = (detail, el, timestamp, shouldStart) => {
      const prevX = detail.currentX;
      const prevY = detail.currentY;
      const prevT = detail.currentTime;
      const currentX = el.scrollLeft;
      const currentY = el.scrollTop;
      const timeDelta = timestamp - prevT;

      if (shouldStart) {
        // remember the start positions
        detail.startTime = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
      }

      detail.currentTime = timestamp;
      detail.currentX = detail.scrollLeft = currentX;
      detail.currentY = detail.scrollTop = currentY;
      detail.deltaX = currentX - detail.startX;
      detail.deltaY = currentY - detail.startY;

      if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
      }
    };

    const Footer = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * If `true`, the footer will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         *
         * Note: In order to scroll content behind the footer, the `fullscreen`
         * attribute needs to be set on the content.
         */

        this.translucent = false;
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const translucent = this.translucent;
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "contentinfo",
          class: {
            [mode]: true,
            // Used internally for styling
            ["footer-".concat(mode)]: true,
            ["footer-translucent"]: translucent,
            ["footer-translucent-".concat(mode)]: translucent
          }
        }, mode === 'ios' && translucent && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "footer-background"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
      }

      static get style() {
        return "ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom,0)}.footer-md:before{left:0;top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==\");background-repeat:repeat-x;content:\"\"}:host-context([dir=rtl]) .footer-md:before,[dir=rtl] .footer-md:before{left:unset;right:unset;right:0;background-position:right 0 top 0}.footer-md.ion-no-border:before{display:none}";
      }

    };
    const TRANSITION = 'all 0.2s ease-in-out';

    const cloneElement = tagName => {
      const getCachedEl = document.querySelector("".concat(tagName, ".ion-cloned-element"));

      if (getCachedEl !== null) {
        return getCachedEl;
      }

      const clonedEl = document.createElement(tagName);
      clonedEl.classList.add('ion-cloned-element');
      clonedEl.style.setProperty('display', 'none');
      document.body.appendChild(clonedEl);
      return clonedEl;
    };

    const createHeaderIndex = headerEl => {
      if (!headerEl) {
        return;
      }

      const toolbars = headerEl.querySelectorAll('ion-toolbar');
      return {
        el: headerEl,
        toolbars: Array.from(toolbars).map(toolbar => {
          const ionTitleEl = toolbar.querySelector('ion-title');
          return {
            el: toolbar,
            background: toolbar.shadowRoot.querySelector('.toolbar-background'),
            ionTitleEl,
            innerTitleEl: ionTitleEl ? ionTitleEl.shadowRoot.querySelector('.toolbar-title') : null,
            ionButtonsEl: Array.from(toolbar.querySelectorAll('ion-buttons')) || []
          };
        }) || []
      };
    };

    const handleContentScroll = (scrollEl, scrollHeaderIndex, contentEl) => {
      Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["f"])(() => {
        const scrollTop = scrollEl.scrollTop;
        const scale = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(1, 1 + -scrollTop / 500, 1.1); // Native refresher should not cause titles to scale

        const nativeRefresher = contentEl.querySelector('ion-refresher.refresher-native');

        if (nativeRefresher === null) {
          Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["w"])(() => {
            scaleLargeTitles(scrollHeaderIndex.toolbars, scale);
          });
        }
      });
    };

    const setToolbarBackgroundOpacity = (toolbar, opacity) => {
      if (opacity === undefined) {
        toolbar.background.style.removeProperty('--opacity');
      } else {
        toolbar.background.style.setProperty('--opacity', opacity.toString());
      }
    };

    const handleToolbarBorderIntersection = (ev, mainHeaderIndex) => {
      if (!ev[0].isIntersecting) {
        return;
      }
      /**
       * There is a bug in Safari where overflow scrolling on a non-body element
       * does not always reset the scrollTop position to 0 when letting go. It will
       * set to 1 once the rubber band effect has ended. This causes the background to
       * appear slightly on certain app setups.
       */


      const scale = ev[0].intersectionRatio > 0.9 ? 0 : (1 - ev[0].intersectionRatio) * 100 / 75;
      mainHeaderIndex.toolbars.forEach(toolbar => {
        setToolbarBackgroundOpacity(toolbar, scale === 1 ? undefined : scale);
      });
    };
    /**
     * If toolbars are intersecting, hide the scrollable toolbar content
     * and show the primary toolbar content. If the toolbars are not intersecting,
     * hide the primary toolbar content and show the scrollable toolbar content
     */


    const handleToolbarIntersection = (ev, mainHeaderIndex, scrollHeaderIndex) => {
      Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["w"])(() => {
        handleToolbarBorderIntersection(ev, mainHeaderIndex);
        const event = ev[0];
        const intersection = event.intersectionRect;
        const intersectionArea = intersection.width * intersection.height;
        const rootArea = event.rootBounds.width * event.rootBounds.height;
        const isPageHidden = intersectionArea === 0 && rootArea === 0;
        const leftDiff = Math.abs(intersection.left - event.boundingClientRect.left);
        const rightDiff = Math.abs(intersection.right - event.boundingClientRect.right);
        const isPageTransitioning = intersectionArea > 0 && (leftDiff >= 5 || rightDiff >= 5);

        if (isPageHidden || isPageTransitioning) {
          return;
        }

        if (event.isIntersecting) {
          setHeaderActive(mainHeaderIndex, false);
          setHeaderActive(scrollHeaderIndex);
        } else {
          /**
           * There is a bug with IntersectionObserver on Safari
           * where `event.isIntersecting === false` when cancelling
           * a swipe to go back gesture. Checking the intersection
           * x, y, width, and height provides a workaround. This bug
           * does not happen when using Safari + Web Animations,
           * only Safari + CSS Animations.
           */
          const hasValidIntersection = intersection.x === 0 && intersection.y === 0 || intersection.width !== 0 && intersection.height !== 0;

          if (hasValidIntersection) {
            setHeaderActive(mainHeaderIndex);
            setHeaderActive(scrollHeaderIndex, false);
            setToolbarBackgroundOpacity(mainHeaderIndex.toolbars[0]);
          }
        }
      });
    };

    const setHeaderActive = (headerIndex, active = true) => {
      if (active) {
        headerIndex.el.classList.remove('header-collapse-condense-inactive');
      } else {
        headerIndex.el.classList.add('header-collapse-condense-inactive');
      }
    };

    const scaleLargeTitles = (toolbars = [], scale = 1, transition = false) => {
      toolbars.forEach(toolbar => {
        const ionTitle = toolbar.ionTitleEl;
        const titleDiv = toolbar.innerTitleEl;

        if (!ionTitle || ionTitle.size !== 'large') {
          return;
        }

        titleDiv.style.transformOrigin = 'left center';
        titleDiv.style.transition = transition ? TRANSITION : '';
        titleDiv.style.transform = "scale3d(".concat(scale, ", ").concat(scale, ", 1)");
      });
    };

    const Header = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.collapsibleHeaderInitialized = false;
        /**
         * If `true`, the header will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         *
         * Note: In order to scroll content behind the header, the `fullscreen`
         * attribute needs to be set on the content.
         */

        this.translucent = false;
      }

      async componentDidLoad() {
        await this.checkCollapsibleHeader();
      }

      async componentDidUpdate() {
        await this.checkCollapsibleHeader();
      }

      componentDidUnload() {
        this.destroyCollapsibleHeader();
      }

      async checkCollapsibleHeader() {
        // Determine if the header can collapse
        const hasCollapse = this.collapse === 'condense';
        const canCollapse = hasCollapse && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this) === 'ios' ? hasCollapse : false;

        if (!canCollapse && this.collapsibleHeaderInitialized) {
          this.destroyCollapsibleHeader();
        } else if (canCollapse && !this.collapsibleHeaderInitialized) {
          const pageEl = this.el.closest('ion-app,ion-page,.ion-page,page-inner');
          const contentEl = pageEl ? pageEl.querySelector('ion-content') : null;
          await this.setupCollapsibleHeader(contentEl, pageEl);
        }
      }

      destroyCollapsibleHeader() {
        if (this.intersectionObserver) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = undefined;
        }

        if (this.scrollEl && this.contentScrollCallback) {
          this.scrollEl.removeEventListener('scroll', this.contentScrollCallback);
          this.contentScrollCallback = undefined;
        }

        if (this.collapsibleMainHeader) {
          this.collapsibleMainHeader.classList.remove('header-collapse-main');
          this.collapsibleMainHeader = undefined;
        }
      }

      async setupCollapsibleHeader(contentEl, pageEl) {
        if (!contentEl || !pageEl) {
          console.error('ion-header requires a content to collapse, make sure there is an ion-content.');
          return;
        }

        this.scrollEl = await contentEl.getScrollElement();
        const headers = pageEl.querySelectorAll('ion-header');
        this.collapsibleMainHeader = Array.from(headers).find(header => header.collapse !== 'condense');

        if (!this.collapsibleMainHeader) {
          return;
        }

        const mainHeaderIndex = createHeaderIndex(this.collapsibleMainHeader);
        const scrollHeaderIndex = createHeaderIndex(this.el);

        if (!mainHeaderIndex || !scrollHeaderIndex) {
          return;
        }

        setHeaderActive(mainHeaderIndex, false);
        mainHeaderIndex.toolbars.forEach(toolbar => {
          setToolbarBackgroundOpacity(toolbar, 0);
        });
        /**
         * Handle interaction between toolbar collapse and
         * showing/hiding content in the primary ion-header
         * as well as progressively showing/hiding the main header
         * border as the top-most toolbar collapses or expands.
         */

        const toolbarIntersection = ev => {
          handleToolbarIntersection(ev, mainHeaderIndex, scrollHeaderIndex);
        };

        this.intersectionObserver = new IntersectionObserver(toolbarIntersection, {
          root: contentEl,
          threshold: [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        });
        this.intersectionObserver.observe(scrollHeaderIndex.toolbars[scrollHeaderIndex.toolbars.length - 1].el);
        /**
         * Handle scaling of large iOS titles and
         * showing/hiding border on last toolbar
         * in primary header
         */

        this.contentScrollCallback = () => {
          handleContentScroll(this.scrollEl, scrollHeaderIndex, contentEl);
        };

        this.scrollEl.addEventListener('scroll', this.contentScrollCallback);
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["w"])(() => {
          cloneElement('ion-title');
          cloneElement('ion-back-button');

          if (this.collapsibleMainHeader !== undefined) {
            this.collapsibleMainHeader.classList.add('header-collapse-main');
          }
        });
        this.collapsibleHeaderInitialized = true;
      }

      render() {
        const {
          translucent
        } = this;
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const collapse = this.collapse || 'none';
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "banner",
          class: {
            [mode]: true,
            // Used internally for styling
            ["header-".concat(mode)]: true,
            ["header-translucent"]: this.translucent,
            ["header-collapse-".concat(collapse)]: true,
            ["header-translucent-".concat(mode)]: this.translucent
          }
        }, mode === 'ios' && translucent && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "header-background"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get style() {
        return "ion-header{display:block;position:relative;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top,0)}.header-md:after{left:0;bottom:-5px;background-position:left 0 top -2px;position:absolute;width:100%;height:5px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);background-repeat:repeat-x;content:\"\"}:host-context([dir=rtl]) .header-md:after,[dir=rtl] .header-md:after{left:unset;right:unset;right:0;background-position:right 0 top -2px}.header-collapse-condense,.header-md.ion-no-border:after{display:none}";
      }

    };
    const RouterOutlet = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.animationEnabled = true;
        /**
         * The mode determines which platform styles to use.
         */

        this.mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        /**
         * If `true`, the router-outlet should animate the transition of components.
         */

        this.animated = true;
        this.ionNavWillLoad = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionNavWillLoad", 7);
        this.ionNavWillChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionNavWillChange", 3);
        this.ionNavDidChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionNavDidChange", 3);
      }

      swipeHandlerChanged() {
        if (this.gesture) {
          this.gesture.enable(this.swipeHandler !== undefined);
        }
      }

      async connectedCallback() {
        this.gesture = (await __webpack_require__.e(
        /*! import() | swipe-back-d2cdbf9a-js */
        "swipe-back-d2cdbf9a-js").then(__webpack_require__.bind(null,
        /*! ./swipe-back-d2cdbf9a.js */
        "./node_modules/@ionic/core/dist/esm/swipe-back-d2cdbf9a.js"))).createSwipeBackGesture(this.el, () => !!this.swipeHandler && this.swipeHandler.canStart() && this.animationEnabled, () => this.swipeHandler && this.swipeHandler.onStart(), step => this.ani && this.ani.progressStep(step), (shouldComplete, step, dur) => {
          if (this.ani) {
            this.animationEnabled = false;
            this.ani.onFinish(() => {
              this.animationEnabled = true;

              if (this.swipeHandler) {
                this.swipeHandler.onEnd(shouldComplete);
              }
            }, {
              oneTimeCallback: true
            }); // Account for rounding errors in JS

            let newStepValue = shouldComplete ? -0.001 : 0.001;
            /**
             * Animation will be reversed here, so need to
             * reverse the easing curve as well
             *
             * Additionally, we need to account for the time relative
             * to the new easing curve, as `stepValue` is going to be given
             * in terms of a linear curve.
             */

            if (!shouldComplete) {
              this.ani.easing('cubic-bezier(1, 0, 0.68, 0.28)');
              newStepValue += Object(_cubic_bezier_1d592096_js__WEBPACK_IMPORTED_MODULE_3__["g"])([0, 0], [1, 0], [0.68, 0.28], [1, 1], step)[0];
            } else {
              newStepValue += Object(_cubic_bezier_1d592096_js__WEBPACK_IMPORTED_MODULE_3__["g"])([0, 0], [0.32, 0.72], [0, 1], [1, 1], step)[0];
            }

            this.ani.progressEnd(shouldComplete ? 1 : 0, newStepValue, dur);
          }
        });
        this.swipeHandlerChanged();
      }

      componentWillLoad() {
        this.ionNavWillLoad.emit();
      }

      disconnectedCallback() {
        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = undefined;
        }
      }
      /** @internal */


      async commit(enteringEl, leavingEl, opts) {
        const unlock = await this.lock();
        let changed = false;

        try {
          changed = await this.transition(enteringEl, leavingEl, opts);
        } catch (e) {
          console.error(e);
        }

        unlock();
        return changed;
      }
      /** @internal */


      async setRouteId(id, params, direction) {
        const changed = await this.setRoot(id, params, {
          duration: direction === 'root' ? 0 : undefined,
          direction: direction === 'back' ? 'back' : 'forward'
        });
        return {
          changed,
          element: this.activeEl
        };
      }
      /** @internal */


      async getRouteId() {
        const active = this.activeEl;
        return active ? {
          id: active.tagName,
          element: active
        } : undefined;
      }

      async setRoot(component, params, opts) {
        if (this.activeComponent === component) {
          return false;
        } // attach entering view to DOM


        const leavingEl = this.activeEl;
        const enteringEl = await Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_6__["a"])(this.delegate, this.el, component, ['ion-page', 'ion-page-invisible'], params);
        this.activeComponent = component;
        this.activeEl = enteringEl; // commit animation

        await this.commit(enteringEl, leavingEl, opts);
        await Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_6__["d"])(this.delegate, leavingEl);
        return true;
      }

      async transition(enteringEl, leavingEl, opts = {}) {
        if (leavingEl === enteringEl) {
          return false;
        } // emit nav will change event


        this.ionNavWillChange.emit();
        const {
          el,
          mode
        } = this;

        const animated = this.animated && _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('animated', true);

        const animationBuilder = this.animation || opts.animationBuilder || _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].get('navAnimation');

        await Object(_index_1469ea79_js__WEBPACK_IMPORTED_MODULE_7__["t"])(Object.assign({
          mode,
          animated,
          animationBuilder,
          enteringEl,
          leavingEl,
          baseEl: el,
          progressCallback: opts.progressAnimation ? ani => this.ani = ani : undefined
        }, opts)); // emit nav changed event

        this.ionNavDidChange.emit();
        return true;
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

      render() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null);
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "swipeHandler": ["swipeHandlerChanged"]
        };
      }

      static get style() {
        return ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}";
      }

    };
    const ToolbarTitle = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.ionStyle = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
      }

      sizeChanged() {
        this.emitStyle();
      }

      connectedCallback() {
        this.emitStyle();
      }

      emitStyle() {
        const size = this.getSize();
        this.ionStyle.emit({
          ["title-".concat(size)]: true
        });
      }

      getSize() {
        return this.size !== undefined ? this.size : 'default';
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const size = this.getSize();
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: Object.assign({
            [mode]: true,
            ["title-".concat(size)]: true
          }, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__["c"])(this.color))
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "toolbar-title"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "size": ["sizeChanged"]
        };
      }

      static get style() {
        return ":host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{padding-left:20px;padding-right:20px;padding-top:0;padding-bottom:0;font-size:20px;font-weight:500;letter-spacing:.0125em}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}:host(.title-small){width:100%;height:100%;font-size:15px;font-weight:400}";
      }

    };
    const Toolbar = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.childrenStyles = new Map();
      }

      componentWillLoad() {
        const buttons = Array.from(this.el.querySelectorAll('ion-buttons'));
        const firstButtons = buttons.find(button => {
          return button.slot === 'start';
        });

        if (firstButtons) {
          firstButtons.classList.add('buttons-first-slot');
        }

        const buttonsReversed = buttons.reverse();
        const lastButtons = buttonsReversed.find(button => button.slot === 'end') || buttonsReversed.find(button => button.slot === 'primary') || buttonsReversed.find(button => button.slot === 'secondary');

        if (lastButtons) {
          lastButtons.classList.add('buttons-last-slot');
        }
      }

      childrenStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.childrenStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
          const childKey = "toolbar-".concat(key);
          const newValue = updatedStyles[key];

          if (newValue !== childStyles[childKey]) {
            hasStyleChange = true;
          }

          if (newValue) {
            newStyles[childKey] = true;
          }
        });

        if (hasStyleChange) {
          this.childrenStyles.set(tagName, newStyles);
          this.el.forceUpdate();
        }
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const childStyles = {};
        this.childrenStyles.forEach(value => {
          Object.assign(childStyles, value);
        });
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: Object.assign(Object.assign({
            'in-toolbar': Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__["h"])('ion-toolbar', this.el),
            [mode]: true
          }, childStyles), Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__["c"])(this.color))
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "toolbar-background"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "toolbar-container"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "start"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "secondary"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "toolbar-content"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "primary"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "end"
        })));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get style() {
        return ":host{--border-width:0;--border-style:solid;--opacity:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toolbar-container{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.toolbar-background{top:0;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:var(--opacity);z-index:-1;pointer-events:none}.toolbar-background,::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background,var(--ion-background-color,#fff));--color:var(--ion-toolbar-color,var(--ion-text-color,#424242));--border-color:var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,#c1c4cd)));--padding-top:0;--padding-bottom:0;--padding-start:0;--padding-end:0;--min-height:56px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:3;order:3;min-width:0;max-width:100%}::slotted(ion-segment){min-height:var(--min-height)}::slotted(.buttons-first-slot){margin-left:4px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(.buttons-first-slot){margin-left:unset;-webkit-margin-start:4px;margin-inline-start:4px}}::slotted(.buttons-last-slot){margin-right:4px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(.buttons-last-slot){margin-right:unset;-webkit-margin-end:4px;margin-inline-end:4px}}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:4;order:4}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}";
      }

    };
    /***/
  }
}]);
//# sourceMappingURL=5-es5.js.map