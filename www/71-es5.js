(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[71], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-textarea-md.entry.js":
  /*!********************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-textarea-md.entry.js ***!
    \********************************************************************/

  /*! exports provided: ion_textarea */

  /***/
  function node_modulesIonicCoreDistEsmIonTextareaMdEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_textarea", function () {
      return Textarea;
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

    const Textarea = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-input-".concat(textareaIds++);
        this.didBlurAfterEdit = false;
        this.hasFocus = false;
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
         */

        this.autocapitalize = 'none';
        /**
         * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
         */

        this.autofocus = false;
        /**
         * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
         */

        this.clearOnEdit = false;
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke.
         */

        this.debounce = 0;
        /**
         * If `true`, the user cannot interact with the textarea.
         */

        this.disabled = false;
        /**
         * The name of the control, which is submitted with the form data.
         */

        this.name = this.inputId;
        /**
         * If `true`, the user cannot modify the value.
         */

        this.readonly = false;
        /**
         * If `true`, the user must fill in a value before submitting a form.
         */

        this.required = false;
        /**
         * If `true`, the element will have its spelling and grammar checked.
         */

        this.spellcheck = false;
        /**
         * If `true`, the element height will increase based on the value.
         */

        this.autoGrow = false;
        /**
         * The value of the textarea.
         */

        this.value = '';

        this.onInput = ev => {
          if (this.nativeInput) {
            this.value = this.nativeInput.value;
          }

          this.emitStyle();
          this.ionInput.emit(ev);
        };

        this.onFocus = () => {
          this.hasFocus = true;
          this.focusChange();
          this.ionFocus.emit();
        };

        this.onBlur = () => {
          this.hasFocus = false;
          this.focusChange();
          this.ionBlur.emit();
        };

        this.onKeyDown = () => {
          this.checkClearOnEdit();
        };

        this.ionChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionChange", 7);
        this.ionInput = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionInput", 7);
        this.ionStyle = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
        this.ionBlur = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionBlur", 7);
        this.ionFocus = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionFocus", 7);
      }

      debounceChanged() {
        this.ionChange = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["d"])(this.ionChange, this.debounce);
      }

      disabledChanged() {
        this.emitStyle();
      }
      /**
       * Update the native input element when the value changes
       */


      valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();

        if (nativeInput && nativeInput.value !== value) {
          nativeInput.value = value;
        }

        this.runAutoGrow();
        this.emitStyle();
        this.ionChange.emit({
          value
        });
      }

      connectedCallback() {
        this.emitStyle();
        this.debounceChanged();
        {
          this.el.dispatchEvent(new CustomEvent('ionInputDidLoad', {
            detail: this.el
          }));
        }
      }

      disconnectedCallback() {
        {
          document.dispatchEvent(new CustomEvent('ionInputDidUnload', {
            detail: this.el
          }));
        }
      }

      componentDidLoad() {
        this.runAutoGrow();
      } // TODO: performance hit, this cause layout thrashing


      runAutoGrow() {
        const nativeInput = this.nativeInput;

        if (nativeInput && this.autoGrow) {
          Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["f"])(() => {
            nativeInput.style.height = 'inherit';
            nativeInput.style.height = nativeInput.scrollHeight + 'px';
          });
        }
      }
      /**
       * Sets focus on the specified `ion-textarea`. Use this method instead of the global
       * `input.focus()`.
       */


      async setFocus() {
        if (this.nativeInput) {
          this.nativeInput.focus();
        }
      }
      /**
       * Returns the native `<textarea>` element used under the hood.
       */


      getInputElement() {
        return Promise.resolve(this.nativeInput);
      }

      emitStyle() {
        this.ionStyle.emit({
          'interactive': true,
          'textarea': true,
          'input': true,
          'interactive-disabled': this.disabled,
          'has-placeholder': this.placeholder != null,
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus
        });
      }
      /**
       * Check if we need to clear the text input if clearOnEdit is enabled
       */


      checkClearOnEdit() {
        if (!this.clearOnEdit) {
          return;
        } // Did the input value change after it was blurred and edited?


        if (this.didBlurAfterEdit && this.hasValue()) {
          // Clear the input
          this.value = '';
        } // Reset the flag


        this.didBlurAfterEdit = false;
      }

      focusChange() {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
          this.didBlurAfterEdit = true;
        }

        this.emitStyle();
      }

      hasValue() {
        return this.getValue() !== '';
      }

      getValue() {
        return this.value || '';
      }

      render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const value = this.getValue();
        const labelId = this.inputId + '-lbl';
        const label = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["f"])(this.el);

        if (label) {
          label.id = labelId;
        }

        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          "aria-disabled": this.disabled ? 'true' : null,
          class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color)), {
            [mode]: true
          })
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("textarea", {
          class: "native-textarea",
          ref: el => this.nativeInput = el,
          autoCapitalize: this.autocapitalize,
          autoFocus: this.autofocus,
          disabled: this.disabled,
          maxLength: this.maxlength,
          minLength: this.minlength,
          name: this.name,
          placeholder: this.placeholder || '',
          readOnly: this.readonly,
          required: this.required,
          spellCheck: this.spellcheck,
          cols: this.cols,
          rows: this.rows,
          wrap: this.wrap,
          onInput: this.onInput,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          onKeyDown: this.onKeyDown
        }, value));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "debounce": ["debounceChanged"],
          "disabled": ["disabledChanged"],
          "value": ["valueChanged"]
        };
      }

      static get style() {
        return ".sc-ion-textarea-md-h{--background:initial;--color:initial;--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:.5;--padding-top:0;--padding-bottom:0;--padding-start:0;--border-radius:0;display:block;position:relative;-ms-flex:1;flex:1;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);white-space:pre-wrap;z-index:2}.ion-color.sc-ion-textarea-md-h{background:initial;color:var(--ion-color-base)}ion-item.sc-ion-textarea-md-h, ion-item .sc-ion-textarea-md-h{-ms-flex-item-align:baseline;align-self:baseline}ion-item.sc-ion-textarea-md-h:not(.item-label), ion-item:not(.item-label) .sc-ion-textarea-md-h{--padding-start:0}.native-textarea.sc-ion-textarea-md{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;resize:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.native-textarea.sc-ion-textarea-md{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-textarea.sc-ion-textarea-md::-webkit-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::-moz-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md:-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::-ms-input-placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea.sc-ion-textarea-md::placeholder{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-textarea[disabled].sc-ion-textarea-md{opacity:.4}.cloned-input.sc-ion-textarea-md{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md, [dir=rtl] .sc-ion-textarea-md-h .cloned-input.sc-ion-textarea-md, [dir=rtl].sc-ion-textarea-md .cloned-input.sc-ion-textarea-md{left:unset;right:unset;right:0}.sc-ion-textarea-md-h{--padding-top:10px;--padding-end:0;--padding-bottom:11px;--padding-start:8px;margin-left:0;margin-right:0;margin-top:8px;margin-bottom:0;font-size:inherit}.item-label-floating.sc-ion-textarea-md-h, .item-label-floating .sc-ion-textarea-md-h, .item-label-stacked.sc-ion-textarea-md-h, .item-label-stacked .sc-ion-textarea-md-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0}";
      }

    };
    let textareaIds = 0;
    /***/
  }
}]);
//# sourceMappingURL=71-es5.js.map