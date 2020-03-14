(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-radio_2-ios.entry.js":
  /*!********************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-radio_2-ios.entry.js ***!
    \********************************************************************/

  /*! exports provided: ion_radio, ion_radio_group */

  /***/
  function node_modulesIonicCoreDistEsmIonRadio_2IosEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_radio", function () {
      return Radio;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_radio_group", function () {
      return RadioGroup;
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

    const Radio = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-rb-".concat(radioButtonIds++);
        this.radioGroup = null;
        /**
         * If `true`, the radio is selected.
         */

        this.checked = false;
        /**
         * The name of the control, which is submitted with the form data.
         */

        this.name = this.inputId;
        /**
         * If `true`, the user cannot interact with the radio.
         */

        this.disabled = false;

        this.updateState = () => {
          if (this.radioGroup) {
            this.checked = this.radioGroup.value === this.value;
          }
        };

        this.onFocus = () => {
          this.ionFocus.emit();
        };

        this.onBlur = () => {
          this.ionBlur.emit();
        };

        this.ionStyle = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
        this.ionFocus = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionFocus", 7);
        this.ionBlur = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionBlur", 7);
      }

      connectedCallback() {
        if (this.value === undefined) {
          this.value = this.inputId;
        }

        const radioGroup = this.radioGroup = this.el.closest('ion-radio-group');

        if (radioGroup) {
          this.updateState();
          radioGroup.addEventListener('ionChange', this.updateState);
        }
      }

      disconnectedCallback() {
        const radioGroup = this.radioGroup;

        if (radioGroup) {
          radioGroup.removeEventListener('ionChange', this.updateState);
          this.radioGroup = null;
        }
      }

      componentWillLoad() {
        this.emitStyle();
      }

      emitStyle() {
        this.ionStyle.emit({
          'radio-checked': this.checked,
          'interactive-disabled': this.disabled
        });
      }

      render() {
        const {
          inputId,
          disabled,
          checked,
          color,
          el
        } = this;
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const labelId = inputId + '-lbl';
        const label = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["f"])(el);

        if (label) {
          label.id = labelId;
        }

        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "radio",
          "aria-disabled": disabled ? 'true' : null,
          "aria-checked": "".concat(checked),
          "aria-labelledby": labelId,
          class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(color)), {
            [mode]: true,
            'in-item': Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["h"])('ion-item', el),
            'interactive': true,
            'radio-checked': checked,
            'radio-disabled': disabled
          })
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "radio-icon"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "radio-inner"
        })), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
          type: "button",
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          disabled: disabled
        }));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "color": ["emitStyle"],
          "checked": ["emitStyle"],
          "disabled": ["emitStyle"]
        };
      }

      static get style() {
        return ":host{--inner-border-radius:50%;display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:layout size style}.radio-icon,button{width:100%;height:100%}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}:host{--color-checked:var(--ion-color-primary,#3880ff);width:15px;height:24px}:host(.ion-color.radio-checked) .radio-inner{border-color:var(--ion-color-base)}.item-radio.item-ios ion-label{margin-left:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-radio.item-ios ion-label{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.radio-inner{width:33%;height:50%}:host(.radio-checked) .radio-inner{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}:host(.radio-disabled){opacity:.3}:host(.ion-focused) .radio-icon:after{border-radius:var(--inner-border-radius);left:-9px;top:-8px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint,#4c8dff);content:\"\";opacity:.2}:host-context([dir=rtl]).ion-focused .radio-icon:after,:host-context([dir=rtl]):host(.ion-focused) .radio-icon:after{left:unset;right:unset;right:-9px}:host(.in-item){margin-left:10px;margin-right:11px;margin-top:8px;margin-bottom:8px;display:block;position:static}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item){margin-left:unset;margin-right:unset;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:11px;margin-inline-end:11px}}:host(.in-item[slot=start]){margin-left:3px;margin-right:21px;margin-top:8px;margin-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:21px;margin-inline-end:21px}}";
      }

    };
    let radioButtonIds = 0;
    const RadioGroup = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-rg-".concat(radioGroupIds++);
        this.labelId = "".concat(this.inputId, "-lbl");
        /**
         * If `true`, the radios can be deselected.
         */

        this.allowEmptySelection = false;
        /**
         * The name of the control, which is submitted with the form data.
         */

        this.name = this.inputId;

        this.onClick = ev => {
          const selectedRadio = ev.target && ev.target.closest('ion-radio');

          if (selectedRadio) {
            const currentValue = this.value;
            const newValue = selectedRadio.value;

            if (newValue !== currentValue) {
              this.value = newValue;
            } else if (this.allowEmptySelection) {
              this.value = undefined;
            }
          }
        };

        this.ionChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionChange", 7);
      }

      valueChanged(value) {
        this.ionChange.emit({
          value
        });
      }

      async connectedCallback() {
        // Get the list header if it exists and set the id
        // this is used to set aria-labelledby
        const el = this.el;
        const header = el.querySelector('ion-list-header') || el.querySelector('ion-item-divider');

        if (header) {
          const label = header.querySelector('ion-label');

          if (label) {
            this.labelId = label.id = this.name + '-lbl';
          }
        }
      }

      render() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "radiogroup",
          "aria-labelledby": this.labelId,
          onClick: this.onClick,
          class: Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this)
        });
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "value": ["valueChanged"]
        };
      }

    };
    let radioGroupIds = 0;
    /***/
  }
}]);
//# sourceMappingURL=45-es5.js.map