(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-infinite-scroll_2-ios.entry.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-infinite-scroll_2-ios.entry.js ***!
    \******************************************************************************/

  /*! exports provided: ion_infinite_scroll, ion_infinite_scroll_content */

  /***/
  function node_modulesIonicCoreDistEsmIonInfiniteScroll_2IosEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_infinite_scroll", function () {
      return InfiniteScroll;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_infinite_scroll_content", function () {
      return InfiniteScrollContent;
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


    var _index_3476b023_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./index-3476b023.js */
    "./node_modules/@ionic/core/dist/esm/index-3476b023.js");

    const InfiniteScroll = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.thrPx = 0;
        this.thrPc = 0;
        this.didFire = false;
        this.isBusy = false;
        this.isLoading = false;
        /**
         * The threshold distance from the bottom
         * of the content to call the `infinite` output event when scrolled.
         * The threshold value can be either a percent, or
         * in pixels. For example, use the value of `10%` for the `infinite`
         * output event to get called when the user has scrolled 10%
         * from the bottom of the page. Use the value `100px` when the
         * scroll is within 100 pixels from the bottom of the page.
         */

        this.threshold = '15%';
        /**
         * If `true`, the infinite scroll will be hidden and scroll event listeners
         * will be removed.
         *
         * Set this to true to disable the infinite scroll from actively
         * trying to receive new data while scrolling. This is useful
         * when it is known that there is no more data that can be added, and
         * the infinite scroll is no longer needed.
         */

        this.disabled = false;
        /**
         * The position of the infinite scroll element.
         * The value can be either `top` or `bottom`.
         */

        this.position = 'bottom';

        this.onScroll = () => {
          const scrollEl = this.scrollEl;

          if (!scrollEl || !this.canStart()) {
            return 1;
          }

          const infiniteHeight = this.el.offsetHeight;

          if (infiniteHeight === 0) {
            // if there is no height of this element then do nothing
            return 2;
          }

          const scrollTop = scrollEl.scrollTop;
          const scrollHeight = scrollEl.scrollHeight;
          const height = scrollEl.offsetHeight;
          const threshold = this.thrPc !== 0 ? height * this.thrPc : this.thrPx;
          const distanceFromInfinite = this.position === 'bottom' ? scrollHeight - infiniteHeight - scrollTop - threshold - height : scrollTop - infiniteHeight - threshold;

          if (distanceFromInfinite < 0) {
            if (!this.didFire) {
              this.isLoading = true;
              this.didFire = true;
              this.ionInfinite.emit();
              return 3;
            }
          } else {
            this.didFire = false;
          }

          return 4;
        };

        this.ionInfinite = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionInfinite", 7);
      }

      thresholdChanged() {
        const val = this.threshold;

        if (val.lastIndexOf('%') > -1) {
          this.thrPx = 0;
          this.thrPc = parseFloat(val) / 100;
        } else {
          this.thrPx = parseFloat(val);
          this.thrPc = 0;
        }
      }

      disabledChanged() {
        const disabled = this.disabled;

        if (disabled) {
          this.isLoading = false;
          this.isBusy = false;
        }

        this.enableScrollEvents(!disabled);
      }

      async connectedCallback() {
        const contentEl = this.el.closest('ion-content');

        if (!contentEl) {
          console.error('<ion-infinite-scroll> must be used inside an <ion-content>');
          return;
        }

        this.scrollEl = await contentEl.getScrollElement();
        this.thresholdChanged();
        this.disabledChanged();

        if (this.position === 'top') {
          Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["w"])(() => {
            if (this.scrollEl) {
              this.scrollEl.scrollTop = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
            }
          });
        }
      }

      disconnectedCallback() {
        this.enableScrollEvents(false);
        this.scrollEl = undefined;
      }
      /**
       * Call `complete()` within the `ionInfinite` output event handler when
       * your async operation has completed. For example, the `loading`
       * state is while the app is performing an asynchronous operation,
       * such as receiving more data from an AJAX request to add more items
       * to a data list. Once the data has been received and UI updated, you
       * then call this method to signify that the loading has completed.
       * This method will change the infinite scroll's state from `loading`
       * to `enabled`.
       */


      async complete() {
        const scrollEl = this.scrollEl;

        if (!this.isLoading || !scrollEl) {
          return;
        }

        this.isLoading = false;

        if (this.position === 'top') {
          /**
           * New content is being added at the top, but the scrollTop position stays the same,
           * which causes a scroll jump visually. This algorithm makes sure to prevent this.
           * (Frame 1)
           *    - complete() is called, but the UI hasn't had time to update yet.
           *    - Save the current content dimensions.
           *    - Wait for the next frame using _dom.read, so the UI will be updated.
           * (Frame 2)
           *    - Read the new content dimensions.
           *    - Calculate the height difference and the new scroll position.
           *    - Delay the scroll position change until other possible dom reads are done using _dom.write to be performant.
           * (Still frame 2, if I'm correct)
           *    - Change the scroll position (= visually maintain the scroll position).
           *    - Change the state to re-enable the InfiniteScroll.
           *    - This should be after changing the scroll position, or it could
           *    cause the InfiniteScroll to be triggered again immediately.
           * (Frame 3)
           *    Done.
           */
          this.isBusy = true; // ******** DOM READ ****************
          // Save the current content dimensions before the UI updates

          const prev = scrollEl.scrollHeight - scrollEl.scrollTop; // ******** DOM READ ****************

          requestAnimationFrame(() => {
            Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["f"])(() => {
              // UI has updated, save the new content dimensions
              const scrollHeight = scrollEl.scrollHeight; // New content was added on top, so the scroll position should be changed immediately to prevent it from jumping around

              const newScrollTop = scrollHeight - prev; // ******** DOM WRITE ****************

              requestAnimationFrame(() => {
                Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["w"])(() => {
                  scrollEl.scrollTop = newScrollTop;
                  this.isBusy = false;
                });
              });
            });
          });
        }
      }

      canStart() {
        return !this.disabled && !this.isBusy && !!this.scrollEl && !this.isLoading;
      }

      enableScrollEvents(shouldListen) {
        if (this.scrollEl) {
          if (shouldListen) {
            this.scrollEl.addEventListener('scroll', this.onScroll);
          } else {
            this.scrollEl.removeEventListener('scroll', this.onScroll);
          }
        }
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const disabled = this.disabled;
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: {
            [mode]: true,
            'infinite-scroll-loading': this.isLoading,
            'infinite-scroll-enabled': !disabled
          }
        });
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "threshold": ["thresholdChanged"],
          "disabled": ["disabledChanged"]
        };
      }

      static get style() {
        return "ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}";
      }

    };
    const InfiniteScrollContent = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }

      componentDidLoad() {
        if (this.loadingSpinner === undefined) {
          const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
          this.loadingSpinner = _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].get('infiniteLoadingSpinner', _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
        }
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: {
            [mode]: true,
            // Used internally for styling
            ["infinite-scroll-content-".concat(mode)]: true
          }
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "infinite-loading"
        }, this.loadingSpinner && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "infinite-loading-spinner"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-spinner", {
          name: this.loadingSpinner
        })), this.loadingText && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "infinite-loading-text",
          innerHTML: Object(_index_3476b023_js__WEBPACK_IMPORTED_MODULE_2__["s"])(this.loadingText)
        })));
      }

      static get style() {
        return "ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line{stroke:var(--ion-color-step-600,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600,#666)}";
      }

    };
    /***/
  }
}]);
//# sourceMappingURL=26-es5.js.map