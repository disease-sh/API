(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-checkbox-md.entry.js":
  /*!********************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-checkbox-md.entry.js ***!
    \********************************************************************/

  /*! exports provided: ion_checkbox */

  /***/
  function node_modulesIonicCoreDistEsmIonCheckboxMdEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_checkbox", function () {
      return Checkbox;
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

    const Checkbox = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-cb-".concat(checkboxIds++);
        /**
         * The name of the control, which is submitted with the form data.
         */

        this.name = this.inputId;
        /**
         * If `true`, the checkbox is selected.
         */

        this.checked = false;
        /**
         * If `true`, the checkbox will visually appear as indeterminate.
         */

        this.indeterminate = false;
        /**
         * If `true`, the user cannot interact with the checkbox.
         */

        this.disabled = false;
        /**
         * The value of the toggle does not mean if it's checked or not, use the `checked`
         * property for that.
         *
         * The value of a toggle is analogous to the value of a `<input type="checkbox">`,
         * it's only used when the toggle participates in a native `<form>`.
         */

        this.value = 'on';

        this.onClick = () => {
          this.setFocus();
          this.checked = !this.checked;
          this.indeterminate = false;
        };

        this.onFocus = () => {
          this.ionFocus.emit();
        };

        this.onBlur = () => {
          this.ionBlur.emit();
        };

        this.ionChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionChange", 7);
        this.ionFocus = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionFocus", 7);
        this.ionBlur = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionBlur", 7);
        this.ionStyle = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
      }

      componentWillLoad() {
        this.emitStyle();
      }

      checkedChanged(isChecked) {
        this.ionChange.emit({
          checked: isChecked,
          value: this.value
        });
        this.emitStyle();
      }

      disabledChanged() {
        this.emitStyle();
      }

      emitStyle() {
        this.ionStyle.emit({
          'checkbox-checked': this.checked,
          'interactive-disabled': this.disabled
        });
      }

      setFocus() {
        if (this.buttonEl) {
          this.buttonEl.focus();
        }
      }

      render() {
        const {
          inputId,
          indeterminate,
          disabled,
          checked,
          value,
          color,
          el
        } = this;
        const labelId = inputId + '-lbl';
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const label = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["f"])(el);

        if (label) {
          label.id = labelId;
        }

        Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["a"])(true, el, this.name, checked ? value : '', disabled);
        let path = indeterminate ? Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
          d: "M6 12L18 12"
        }) : Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
          d: "M5.9,12.5l3.8,3.8l8.8-8.8"
        });

        if (mode === 'md') {
          path = indeterminate ? Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
            d: "M2 12H22"
          }) : Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
            d: "M1.73,12.91 8.1,19.28 22.79,4.59"
          });
        }

        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          onClick: this.onClick,
          role: "checkbox",
          "aria-disabled": disabled ? 'true' : null,
          "aria-checked": "".concat(checked),
          "aria-labelledby": labelId,
          class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(color)), {
            [mode]: true,
            'in-item': Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["h"])('ion-item', el),
            'checkbox-checked': checked,
            'checkbox-disabled': disabled,
            'checkbox-indeterminate': indeterminate,
            'interactive': true
          })
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", {
          class: "checkbox-icon",
          viewBox: "0 0 24 24"
        }, path), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
          type: "button",
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          disabled: this.disabled,
          ref: btnEl => this.buttonEl = btnEl
        }));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "checked": ["checkedChanged"],
          "disabled": ["disabledChanged"]
        };
      }

      static get style() {
        return ":host{--background-checked:var(--ion-color-primary,#3880ff);--border-color-checked:var(--ion-color-primary,#3880ff);--checkmark-color:var(--ion-color-primary-contrast,#fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-color){--background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.checkbox-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:calc(var(--size) * .125);--border-width:2px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb,0,0,0),0.51);--checkmark-width:3;--background:var(--ion-item-background,var(--ion-background-color,#fff));--transition:background 180ms cubic-bezier(0.4,0,0.2,1);--size:18px;width:var(--size);height:var(--size)}.checkbox-icon path{stroke-dasharray:30;stroke-dashoffset:30}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{stroke-dashoffset:0;-webkit-transition:stroke-dashoffset 90ms linear 90ms;transition:stroke-dashoffset 90ms linear 90ms}:host(.checkbox-disabled){opacity:.3}:host(.in-item){margin-left:0;margin-right:0;margin-top:18px;margin-bottom:18px;display:block;position:static}:host(.in-item[slot=start]){margin-left:4px;margin-right:36px;margin-top:18px;margin-bottom:18px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px}}";
      }

    };
    let checkboxIds = 0;
    /***/
  }
}]);
//# sourceMappingURL=17-es5.js.map