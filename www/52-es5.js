(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-reorder_2-md.entry.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-reorder_2-md.entry.js ***!
    \*********************************************************************/

  /*! exports provided: ion_reorder, ion_reorder_group */

  /***/
  function node_modulesIonicCoreDistEsmIonReorder_2MdEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_reorder", function () {
      return Reorder;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_reorder_group", function () {
      return ReorderGroup;
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


    var _haptic_c8f1473e_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./haptic-c8f1473e.js */
    "./node_modules/@ionic/core/dist/esm/haptic-c8f1473e.js");

    const Reorder = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }

      onClick(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const reorderIcon = mode === 'ios' ? 'reorder-three-outline' : 'reorder-two-sharp';
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: mode
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-icon", {
          name: reorderIcon,
          lazy: false,
          class: "reorder-icon"
        })));
      }

      static get style() {
        return ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px;font-size:31px;opacity:.3}";
      }

    };
    const ReorderGroup = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.lastToIndex = -1;
        this.cachedHeights = [];
        this.scrollElTop = 0;
        this.scrollElBottom = 0;
        this.scrollElInitial = 0;
        this.containerTop = 0;
        this.containerBottom = 0;
        this.state = 0
        /* Idle */
        ;
        /**
         * If `true`, the reorder will be hidden.
         */

        this.disabled = true;
        this.ionItemReorder = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionItemReorder", 7);
      }

      disabledChanged() {
        if (this.gesture) {
          this.gesture.enable(!this.disabled);
        }
      }

      async connectedCallback() {
        const contentEl = this.el.closest('ion-content');

        if (contentEl) {
          this.scrollEl = await contentEl.getScrollElement();
        }

        this.gesture = (await Promise.resolve().then(__webpack_require__.bind(null,
        /*! ./index-c38df685.js */
        "./node_modules/@ionic/core/dist/esm/index-c38df685.js"))).createGesture({
          el: this.el,
          gestureName: 'reorder',
          gesturePriority: 110,
          threshold: 0,
          direction: 'y',
          passive: false,
          canStart: detail => this.canStart(detail),
          onStart: ev => this.onStart(ev),
          onMove: ev => this.onMove(ev),
          onEnd: () => this.onEnd()
        });
        this.disabledChanged();
      }

      disconnectedCallback() {
        this.onEnd();

        if (this.gesture) {
          this.gesture.destroy();
          this.gesture = undefined;
        }
      }
      /**
       * Completes the reorder operation. Must be called by the `ionItemReorder` event.
       *
       * If a list of items is passed, the list will be reordered and returned in the
       * proper order.
       *
       * If no parameters are passed or if `true` is passed in, the reorder will complete
       * and the item will remain in the position it was dragged to. If `false` is passed,
       * the reorder will complete and the item will bounce back to its original position.
       *
       * @param listOrReorder A list of items to be sorted and returned in the new order or a
       * boolean of whether or not the reorder should reposition the item.
       */


      complete(listOrReorder) {
        return Promise.resolve(this.completeSync(listOrReorder));
      }

      canStart(ev) {
        if (this.selectedItemEl || this.state !== 0
        /* Idle */
        ) {
            return false;
          }

        const target = ev.event.target;
        const reorderEl = target.closest('ion-reorder');

        if (!reorderEl) {
          return false;
        }

        const item = findReorderItem(reorderEl, this.el);

        if (!item) {
          return false;
        }

        ev.data = item;
        return true;
      }

      onStart(ev) {
        ev.event.preventDefault();
        const item = this.selectedItemEl = ev.data;
        const heights = this.cachedHeights;
        heights.length = 0;
        const el = this.el;
        const children = el.children;

        if (!children || children.length === 0) {
          return;
        }

        let sum = 0;

        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          sum += child.offsetHeight;
          heights.push(sum);
          child.$ionIndex = i;
        }

        const box = el.getBoundingClientRect();
        this.containerTop = box.top;
        this.containerBottom = box.bottom;

        if (this.scrollEl) {
          const scrollBox = this.scrollEl.getBoundingClientRect();
          this.scrollElInitial = this.scrollEl.scrollTop;
          this.scrollElTop = scrollBox.top + AUTO_SCROLL_MARGIN;
          this.scrollElBottom = scrollBox.bottom - AUTO_SCROLL_MARGIN;
        } else {
          this.scrollElInitial = 0;
          this.scrollElTop = 0;
          this.scrollElBottom = 0;
        }

        this.lastToIndex = indexForItem(item);
        this.selectedItemHeight = item.offsetHeight;
        this.state = 1
        /* Active */
        ;
        item.classList.add(ITEM_REORDER_SELECTED);
        Object(_haptic_c8f1473e_js__WEBPACK_IMPORTED_MODULE_2__["a"])();
      }

      onMove(ev) {
        const selectedItem = this.selectedItemEl;

        if (!selectedItem) {
          return;
        } // Scroll if we reach the scroll margins


        const scroll = this.autoscroll(ev.currentY); // // Get coordinate

        const top = this.containerTop - scroll;
        const bottom = this.containerBottom - scroll;
        const currentY = Math.max(top, Math.min(ev.currentY, bottom));
        const deltaY = scroll + currentY - ev.startY;
        const normalizedY = currentY - top;
        const toIndex = this.itemIndexForTop(normalizedY);

        if (toIndex !== this.lastToIndex) {
          const fromIndex = indexForItem(selectedItem);
          this.lastToIndex = toIndex;
          Object(_haptic_c8f1473e_js__WEBPACK_IMPORTED_MODULE_2__["b"])();
          this.reorderMove(fromIndex, toIndex);
        } // Update selected item position


        selectedItem.style.transform = "translateY(".concat(deltaY, "px)");
      }

      onEnd() {
        const selectedItemEl = this.selectedItemEl;
        this.state = 2
        /* Complete */
        ;

        if (!selectedItemEl) {
          this.state = 0
          /* Idle */
          ;
          return;
        }

        const toIndex = this.lastToIndex;
        const fromIndex = indexForItem(selectedItemEl);

        if (toIndex === fromIndex) {
          this.completeSync();
        } else {
          this.ionItemReorder.emit({
            from: fromIndex,
            to: toIndex,
            complete: this.completeSync.bind(this)
          });
        }

        Object(_haptic_c8f1473e_js__WEBPACK_IMPORTED_MODULE_2__["c"])();
      }

      completeSync(listOrReorder) {
        const selectedItemEl = this.selectedItemEl;

        if (selectedItemEl && this.state === 2
        /* Complete */
        ) {
            const children = this.el.children;
            const len = children.length;
            const toIndex = this.lastToIndex;
            const fromIndex = indexForItem(selectedItemEl);

            if (toIndex !== fromIndex && (!listOrReorder || listOrReorder === true)) {
              const ref = fromIndex < toIndex ? children[toIndex + 1] : children[toIndex];
              this.el.insertBefore(selectedItemEl, ref);
            }

            if (Array.isArray(listOrReorder)) {
              listOrReorder = reorderArray(listOrReorder, fromIndex, toIndex);
            }

            for (let i = 0; i < len; i++) {
              children[i].style['transform'] = '';
            }

            selectedItemEl.style.transition = '';
            selectedItemEl.classList.remove(ITEM_REORDER_SELECTED);
            this.selectedItemEl = undefined;
            this.state = 0
            /* Idle */
            ;
          }

        return listOrReorder;
      }

      itemIndexForTop(deltaY) {
        const heights = this.cachedHeights;
        let i = 0; // TODO: since heights is a sorted array of integers, we can do
        // speed up the search using binary search. Remember that linear-search is still
        // faster than binary-search for small arrays (<64) due CPU branch misprediction.

        for (i = 0; i < heights.length; i++) {
          if (heights[i] > deltaY) {
            break;
          }
        }

        return i;
      }
      /********* DOM WRITE ********* */


      reorderMove(fromIndex, toIndex) {
        const itemHeight = this.selectedItemHeight;
        const children = this.el.children;

        for (let i = 0; i < children.length; i++) {
          const style = children[i].style;
          let value = '';

          if (i > fromIndex && i <= toIndex) {
            value = "translateY(".concat(-itemHeight, "px)");
          } else if (i < fromIndex && i >= toIndex) {
            value = "translateY(".concat(itemHeight, "px)");
          }

          style['transform'] = value;
        }
      }

      autoscroll(posY) {
        if (!this.scrollEl) {
          return 0;
        }

        let amount = 0;

        if (posY < this.scrollElTop) {
          amount = -SCROLL_JUMP;
        } else if (posY > this.scrollElBottom) {
          amount = SCROLL_JUMP;
        }

        if (amount !== 0) {
          this.scrollEl.scrollBy(0, amount);
        }

        return this.scrollEl.scrollTop - this.scrollElInitial;
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: {
            [mode]: true,
            'reorder-enabled': !this.disabled,
            'reorder-list-active': this.state !== 0
            /* Idle */

          }
        });
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "disabled": ["disabledChanged"]
        };
      }

      static get style() {
        return ".reorder-list-active>*{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none!important;transition:none!important;-webkit-box-shadow:0 0 10px rgba(0,0,0,.4);box-shadow:0 0 10px rgba(0,0,0,.4);opacity:.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translateZ(0);transform:translateZ(0)}";
      }

    };

    const indexForItem = element => {
      return element['$ionIndex'];
    };

    const findReorderItem = (node, container) => {
      let parent;

      while (node) {
        parent = node.parentElement;

        if (parent === container) {
          return node;
        }

        node = parent;
      }

      return undefined;
    };

    const AUTO_SCROLL_MARGIN = 60;
    const SCROLL_JUMP = 10;
    const ITEM_REORDER_SELECTED = 'reorder-selected';

    const reorderArray = (array, from, to) => {
      const element = array[from];
      array.splice(from, 1);
      array.splice(to, 0, element);
      return array.slice();
    };
    /***/

  }
}]);
//# sourceMappingURL=52-es5.js.map