(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[68], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js":
  /*!**************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js ***!
    \**************************************************************/

  /*! exports provided: ion_tab, ion_tabs */

  /***/
  function node_modulesIonicCoreDistEsmIonTab_2EntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_tab", function () {
      return Tab;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_tabs", function () {
      return Tabs;
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


    var _framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./framework-delegate-c2e2e1f4.js */
    "./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js");

    const Tab = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.loaded = false;
        /** @internal */

        this.active = false;
      }

      async componentWillLoad() {
        if (this.active) {
          await this.setActive();
        }
      }
      /** Set the active component for the tab */


      async setActive() {
        await this.prepareLazyLoaded();
        this.active = true;
      }

      changeActive(isActive) {
        if (isActive) {
          this.prepareLazyLoaded();
        }
      }

      prepareLazyLoaded() {
        if (!this.loaded && this.component != null) {
          this.loaded = true;

          try {
            return Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_2__["a"])(this.delegate, this.el, this.component, ['ion-page']);
          } catch (e) {
            console.error(e);
          }
        }

        return Promise.resolve(undefined);
      }

      render() {
        const {
          tab,
          active,
          component
        } = this;
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "tabpanel",
          "aria-hidden": !active ? 'true' : null,
          "aria-labelledby": "tab-button-".concat(tab),
          class: {
            'ion-page': component === undefined,
            'tab-hidden': !active
          }
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "active": ["changeActive"]
        };
      }

      static get style() {
        return ":host(.tab-hidden){display:none!important}";
      }

    };
    const Tabs = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.transitioning = false;
        /** @internal */

        this.useRouter = false;

        this.onTabClicked = ev => {
          const {
            href,
            tab
          } = ev.detail;

          if (this.useRouter && href !== undefined) {
            const router = document.querySelector('ion-router');

            if (router) {
              router.push(href);
            }
          } else {
            this.select(tab);
          }
        };

        this.ionNavWillLoad = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionNavWillLoad", 7);
        this.ionTabsWillChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionTabsWillChange", 3);
        this.ionTabsDidChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionTabsDidChange", 3);
      }

      async componentWillLoad() {
        if (!this.useRouter) {
          this.useRouter = !!document.querySelector('ion-router') && !this.el.closest('[no-router]');
        }

        if (!this.useRouter) {
          const tabs = this.tabs;

          if (tabs.length > 0) {
            await this.select(tabs[0]);
          }
        }

        this.ionNavWillLoad.emit();
      }

      componentWillRender() {
        const tabBar = this.el.querySelector('ion-tab-bar');

        if (tabBar) {
          const tab = this.selectedTab ? this.selectedTab.tab : undefined;
          tabBar.selectedTab = tab;
        }
      }
      /**
       * Select a tab by the value of its `tab` property or an element reference.
       *
       * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
       */


      async select(tab) {
        const selectedTab = getTab(this.tabs, tab);

        if (!this.shouldSwitch(selectedTab)) {
          return false;
        }

        await this.setActive(selectedTab);
        await this.notifyRouter();
        this.tabSwitch();
        return true;
      }
      /**
       * Get a specific tab by the value of its `tab` property or an element reference.
       *
       * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
       */


      async getTab(tab) {
        return getTab(this.tabs, tab);
      }
      /**
       * Get the currently selected tab.
       */


      getSelected() {
        return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
      }
      /** @internal */


      async setRouteId(id) {
        const selectedTab = getTab(this.tabs, id);

        if (!this.shouldSwitch(selectedTab)) {
          return {
            changed: false,
            element: this.selectedTab
          };
        }

        await this.setActive(selectedTab);
        return {
          changed: true,
          element: this.selectedTab,
          markVisible: () => this.tabSwitch()
        };
      }
      /** @internal */


      async getRouteId() {
        const tabId = this.selectedTab && this.selectedTab.tab;
        return tabId !== undefined ? {
          id: tabId,
          element: this.selectedTab
        } : undefined;
      }

      setActive(selectedTab) {
        if (this.transitioning) {
          return Promise.reject('transitioning already happening');
        }

        this.transitioning = true;
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({
          tab: selectedTab.tab
        });
        selectedTab.active = true;
        return Promise.resolve();
      }

      tabSwitch() {
        const selectedTab = this.selectedTab;
        const leavingTab = this.leavingTab;
        this.leavingTab = undefined;
        this.transitioning = false;

        if (!selectedTab) {
          return;
        }

        if (leavingTab !== selectedTab) {
          if (leavingTab) {
            leavingTab.active = false;
          }

          this.ionTabsDidChange.emit({
            tab: selectedTab.tab
          });
        }
      }

      notifyRouter() {
        if (this.useRouter) {
          const router = document.querySelector('ion-router');

          if (router) {
            return router.navChanged('forward');
          }
        }

        return Promise.resolve(false);
      }

      shouldSwitch(selectedTab) {
        const leavingTab = this.selectedTab;
        return selectedTab !== undefined && selectedTab !== leavingTab && !this.transitioning;
      }

      get tabs() {
        return Array.from(this.el.querySelectorAll('ion-tab'));
      }

      render() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          onIonTabButtonClick: this.onTabClicked
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "top"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "tabs-inner"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
          name: "bottom"
        }));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get style() {
        return ":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}";
      }

    };

    const getTab = (tabs, tab) => {
      const tabEl = typeof tab === 'string' ? tabs.find(t => t.tab === tab) : tab;

      if (!tabEl) {
        console.error("tab with id: \"".concat(tabEl, "\" does not exist"));
      }

      return tabEl;
    };
    /***/

  }
}]);
//# sourceMappingURL=68-es5.js.map