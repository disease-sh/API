(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-searchbar-ios.entry.js":
  /*!**********************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-searchbar-ios.entry.js ***!
    \**********************************************************************/

  /*! exports provided: ion_searchbar */

  /***/
  function node_modulesIonicCoreDistEsmIonSearchbarIosEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_searchbar", function () {
      return Searchbar;
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

    const Searchbar = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.isCancelVisible = false;
        this.shouldAlignLeft = true;
        this.focused = false;
        this.noAnimate = true;
        /**
         * If `true`, enable searchbar animation.
         */

        this.animated = false;
        /**
         * Set the input's autocomplete property.
         */

        this.autocomplete = 'off';
        /**
         * Set the input's autocorrect property.
         */

        this.autocorrect = 'off';
        /**
         * Set the cancel button icon. Only applies to `md` mode.
         * Defaults to `"arrow-back-sharp"`.
         */

        this.cancelButtonIcon = _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].get('backButtonIcon', 'arrow-back-sharp');
        /**
         * Set the the cancel button text. Only applies to `ios` mode.
         */

        this.cancelButtonText = 'Cancel';
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke.
         */

        this.debounce = 250;
        /**
         * If `true`, the user cannot interact with the input.
         */

        this.disabled = false;
        /**
         * Set the input's placeholder.
         * `placeholder` can accept either plaintext or HTML as a string.
         * To display characters normally reserved for HTML, they
         * must be escaped. For example `<Ionic>` would become
         * `&lt;Ionic&gt;`
         *
         * For more information: [Security Documentation](https://ionicframework.com/docs/faq/security)
         */

        this.placeholder = 'Search';
        /**
         * Sets the behavior for the cancel button. Defaults to `"never"`.
         * Setting to `"focus"` shows the cancel button on focus.
         * Setting to `"never"` hides the cancel button.
         * Setting to `"always"` shows the cancel button regardless
         * of focus state.
         */

        this.showCancelButton = 'never';
        /**
         * If `true`, enable spellcheck on the input.
         */

        this.spellcheck = false;
        /**
         * Set the type of the input.
         */

        this.type = 'search';
        /**
         * the value of the searchbar.
         */

        this.value = '';
        /**
         * Clears the input field and triggers the control change.
         */

        this.onClearInput = ev => {
          this.ionClear.emit();

          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          } // setTimeout() fixes https://github.com/ionic-team/ionic/issues/7527
          // wait for 4 frames


          setTimeout(() => {
            const value = this.getValue();

            if (value !== '') {
              this.value = '';
              this.ionInput.emit();
            }
          }, 16 * 4);
        };
        /**
         * Clears the input field and tells the input to blur since
         * the clearInput function doesn't want the input to blur
         * then calls the custom cancel function if the user passed one in.
         */


        this.onCancelSearchbar = ev => {
          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          }

          this.ionCancel.emit();
          this.onClearInput();

          if (this.nativeInput) {
            this.nativeInput.blur();
          }
        };
        /**
         * Update the Searchbar input value when the input changes
         */


        this.onInput = ev => {
          const input = ev.target;

          if (input) {
            this.value = input.value;
          }

          this.ionInput.emit(ev);
        };
        /**
         * Sets the Searchbar to not focused and checks if it should align left
         * based on whether there is a value in the searchbar or not.
         */


        this.onBlur = () => {
          this.focused = false;
          this.ionBlur.emit();
          this.positionElements();
        };
        /**
         * Sets the Searchbar to focused and active on input focus.
         */


        this.onFocus = () => {
          this.focused = true;
          this.ionFocus.emit();
          this.positionElements();
        };

        this.ionInput = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionInput", 7);
        this.ionChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionChange", 7);
        this.ionCancel = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionCancel", 7);
        this.ionClear = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionClear", 7);
        this.ionBlur = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionBlur", 7);
        this.ionFocus = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionFocus", 7);
        this.ionStyle = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
      }

      debounceChanged() {
        this.ionChange = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["d"])(this.ionChange, this.debounce);
      }

      valueChanged() {
        const inputEl = this.nativeInput;
        const value = this.getValue();

        if (inputEl && inputEl.value !== value) {
          inputEl.value = value;
        }

        this.ionChange.emit({
          value
        });
      }

      showCancelButtonChanged() {
        requestAnimationFrame(() => {
          this.positionElements();
          this.el.forceUpdate();
        });
      }

      connectedCallback() {
        this.emitStyle();
      }

      componentDidLoad() {
        this.positionElements();
        this.debounceChanged();
        setTimeout(() => {
          this.noAnimate = false;
        }, 300);
      }

      emitStyle() {
        this.ionStyle.emit({
          'searchbar': true
        });
      }
      /**
       * Sets focus on the specified `ion-searchbar`. Use this method instead of the global
       * `input.focus()`.
       */


      async setFocus() {
        if (this.nativeInput) {
          this.nativeInput.focus();
        }
      }
      /**
       * Returns the native `<input>` element used under the hood.
       */


      getInputElement() {
        return Promise.resolve(this.nativeInput);
      }
      /**
       * Positions the input search icon, placeholder, and the cancel button
       * based on the input value and if it is focused. (ios only)
       */


      positionElements() {
        const value = this.getValue();
        const prevAlignLeft = this.shouldAlignLeft;
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const shouldAlignLeft = !this.animated || value.trim() !== '' || !!this.focused;
        this.shouldAlignLeft = shouldAlignLeft;

        if (mode !== 'ios') {
          return;
        }

        if (prevAlignLeft !== shouldAlignLeft) {
          this.positionPlaceholder();
        }

        if (this.animated) {
          this.positionCancelButton();
        }
      }
      /**
       * Positions the input placeholder
       */


      positionPlaceholder() {
        const inputEl = this.nativeInput;

        if (!inputEl) {
          return;
        }

        const isRTL = document.dir === 'rtl';
        const iconEl = (this.el.shadowRoot || this.el).querySelector('.searchbar-search-icon');

        if (this.shouldAlignLeft) {
          inputEl.removeAttribute('style');
          iconEl.removeAttribute('style');
        } else {
          // Create a dummy span to get the placeholder width
          const doc = document;
          const tempSpan = doc.createElement('span');
          tempSpan.innerText = this.placeholder || '';
          doc.body.appendChild(tempSpan); // Get the width of the span then remove it

          Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["r"])(() => {
            const textWidth = tempSpan.offsetWidth;
            tempSpan.remove(); // Calculate the input padding

            const inputLeft = 'calc(50% - ' + textWidth / 2 + 'px)'; // Calculate the icon margin

            const iconLeft = 'calc(50% - ' + (textWidth / 2 + 30) + 'px)'; // Set the input padding start and icon margin start

            if (isRTL) {
              inputEl.style.paddingRight = inputLeft;
              iconEl.style.marginRight = iconLeft;
            } else {
              inputEl.style.paddingLeft = inputLeft;
              iconEl.style.marginLeft = iconLeft;
            }
          });
        }
      }
      /**
       * Show the iOS Cancel button on focus, hide it offscreen otherwise
       */


      positionCancelButton() {
        const isRTL = document.dir === 'rtl';
        const cancelButton = (this.el.shadowRoot || this.el).querySelector('.searchbar-cancel-button');
        const shouldShowCancel = this.shouldShowCancelButton();

        if (cancelButton && shouldShowCancel !== this.isCancelVisible) {
          const cancelStyle = cancelButton.style;
          this.isCancelVisible = shouldShowCancel;

          if (shouldShowCancel) {
            if (isRTL) {
              cancelStyle.marginLeft = '0';
            } else {
              cancelStyle.marginRight = '0';
            }
          } else {
            const offset = cancelButton.offsetWidth;

            if (offset > 0) {
              if (isRTL) {
                cancelStyle.marginLeft = -offset + 'px';
              } else {
                cancelStyle.marginRight = -offset + 'px';
              }
            }
          }
        }
      }

      getValue() {
        return this.value || '';
      }

      hasValue() {
        return this.getValue() !== '';
      }
      /**
       * Determines whether or not the cancel button should be visible onscreen.
       * Cancel button should be shown if one of two conditions applies:
       * 1. `showCancelButton` is set to `always`.
       * 2. `showCancelButton` is set to `focus`, and the searchbar has been focused.
       */


      shouldShowCancelButton() {
        if (this.showCancelButton === 'never' || this.showCancelButton === 'focus' && !this.focused) {
          return false;
        }

        return true;
      }

      render() {
        const animated = this.animated && _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].getBoolean('animated', true);

        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const clearIcon = this.clearIcon || (mode === 'ios' ? 'close-circle' : 'close-sharp');
        const searchIcon = this.searchIcon || (mode === 'ios' ? 'search-outline' : 'search-sharp');
        const cancelButton = this.showCancelButton !== 'never' && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
          "aria-label": "cancel",
          type: "button",
          tabIndex: mode === 'ios' && !this.shouldShowCancelButton() ? -1 : undefined,
          onMouseDown: this.onCancelSearchbar,
          onTouchStart: this.onCancelSearchbar,
          class: "searchbar-cancel-button"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, mode === 'md' ? Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-icon", {
          "aria-hidden": "true",
          mode: mode,
          icon: this.cancelButtonIcon,
          lazy: false
        }) : this.cancelButtonText));
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "search",
          "aria-disabled": this.disabled ? 'true' : null,
          class: Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color)), {
            [mode]: true,
            'searchbar-animated': animated,
            'searchbar-disabled': this.disabled,
            'searchbar-no-animate': animated && this.noAnimate,
            'searchbar-has-value': this.hasValue(),
            'searchbar-left-aligned': this.shouldAlignLeft,
            'searchbar-has-focus': this.focused,
            'searchbar-should-show-cancel': this.shouldShowCancelButton()
          })
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "searchbar-input-container"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("input", {
          "aria-label": "search text",
          disabled: this.disabled,
          ref: el => this.nativeInput = el,
          class: "searchbar-input",
          inputMode: this.inputmode,
          onInput: this.onInput,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          placeholder: this.placeholder,
          type: this.type,
          value: this.getValue(),
          autoComplete: this.autocomplete,
          autoCorrect: this.autocorrect,
          spellCheck: this.spellcheck
        }), mode === 'md' && cancelButton, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-icon", {
          mode: mode,
          icon: searchIcon,
          lazy: false,
          class: "searchbar-search-icon"
        }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
          "aria-label": "reset",
          type: "button",
          "no-blur": true,
          class: "searchbar-clear-button",
          onMouseDown: this.onClearInput,
          onTouchStart: this.onClearInput
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-icon", {
          "aria-hidden": "true",
          mode: mode,
          icon: clearIcon,
          lazy: false,
          class: "searchbar-clear-icon"
        }))), mode === 'ios' && cancelButton);
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "debounce": ["debounceChanged"],
          "value": ["valueChanged"],
          "showCancelButton": ["showCancelButtonChanged"]
        };
      }

      static get style() {
        return ".sc-ion-searchbar-ios-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:.5;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;width:100%;color:var(--color);font-family:var(--ion-font-family,inherit);-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-searchbar-ios-h{color:var(--ion-color-contrast)}.ion-color.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{background:var(--ion-color-base)}.ion-color.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios, .ion-color.sc-ion-searchbar-ios-h .searchbar-clear-button.sc-ion-searchbar-ios, .ion-color.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{color:inherit}.searchbar-search-icon.sc-ion-searchbar-ios{color:var(--icon-color);pointer-events:none}.searchbar-input-container.sc-ion-searchbar-ios{display:block;position:relative;-ms-flex-negative:1;flex-shrink:1;width:100%}.searchbar-input.sc-ion-searchbar-ios{font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;width:100%;border:0;outline:none;background:var(--background);font-family:inherit;-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-input.sc-ion-searchbar-ios::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input.sc-ion-searchbar-ios::-ms-clear, .searchbar-input.sc-ion-searchbar-ios::-webkit-search-cancel-button{display:none}.searchbar-cancel-button.sc-ion-searchbar-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:none;height:100%;border:0;outline:none;color:var(--cancel-button-color);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-cancel-button.sc-ion-searchbar-ios > div.sc-ion-searchbar-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.searchbar-clear-button.sc-ion-searchbar-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:none;min-height:0;outline:none;color:var(--clear-button-color);-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-has-value.searchbar-has-focus.sc-ion-searchbar-ios-h .searchbar-clear-button.sc-ion-searchbar-ios{display:block}.searchbar-disabled.sc-ion-searchbar-ios-h{cursor:default;opacity:.4;pointer-events:none}.sc-ion-searchbar-ios-h{--background:rgba(var(--ion-text-color-rgb,0,0,0),0.07);--box-shadow:none;--cancel-button-color:var(--ion-color-primary,#3880ff);--clear-button-color:var(--ion-color-step-600,#666);--color:var(--ion-text-color,#000);--icon-color:var(--ion-color-step-600,#666);padding-left:12px;padding-right:12px;padding-top:12px;padding-bottom:12px;height:60px;contain:strict}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-searchbar-ios-h{padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}.searchbar-input-container.sc-ion-searchbar-ios{height:36px}.searchbar-search-icon.sc-ion-searchbar-ios{margin-left:calc(50% - 60px);left:5px;top:0;position:absolute;width:22px;height:100%;contain:strict}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.searchbar-search-icon.sc-ion-searchbar-ios{margin-left:unset;-webkit-margin-start:calc(50% - 60px);margin-inline-start:calc(50% - 60px)}}[dir=rtl].sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios, [dir=rtl] .sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios, [dir=rtl].sc-ion-searchbar-ios .searchbar-search-icon.sc-ion-searchbar-ios{left:unset;right:unset;right:5px}.searchbar-input.sc-ion-searchbar-ios{padding-left:28px;padding-right:28px;padding-top:0;padding-bottom:0;border-radius:10px;height:100%;font-size:17px;font-weight:400;contain:strict}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.searchbar-input.sc-ion-searchbar-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:28px;padding-inline-start:28px;-webkit-padding-end:28px;padding-inline-end:28px}}.searchbar-clear-button.sc-ion-searchbar-ios{right:0;top:0;background-position:50%;position:absolute;width:30px;height:100%;border:0;background-color:transparent}[dir=rtl].sc-ion-searchbar-ios-h .searchbar-clear-button.sc-ion-searchbar-ios, [dir=rtl] .sc-ion-searchbar-ios-h .searchbar-clear-button.sc-ion-searchbar-ios, [dir=rtl].sc-ion-searchbar-ios .searchbar-clear-button.sc-ion-searchbar-ios{left:unset;right:unset;left:0}.searchbar-clear-icon.sc-ion-searchbar-ios{width:18px;height:100%}.searchbar-cancel-button.sc-ion-searchbar-ios{padding-left:8px;padding-right:0;padding-top:0;padding-bottom:0;-ms-flex-negative:0;flex-shrink:0;background-color:transparent;font-size:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.searchbar-cancel-button.sc-ion-searchbar-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:0;padding-inline-end:0}}.searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{margin-left:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{padding-left:30px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios{padding-left:unset;-webkit-padding-start:30px;padding-inline-start:30px}}.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios, .searchbar-has-focus.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios, .searchbar-should-show-cancel.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{display:block}.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios, .searchbar-animated.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{-webkit-transition:all .3s ease;transition:all .3s ease}.searchbar-animated.searchbar-has-focus.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios, .searchbar-animated.searchbar-should-show-cancel.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{opacity:1;pointer-events:auto}.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{margin-right:-100%;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:all .3s ease;transition:all .3s ease;opacity:0;pointer-events:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.searchbar-animated.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{margin-right:unset;-webkit-margin-end:-100%;margin-inline-end:-100%}}.searchbar-no-animate.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios, .searchbar-no-animate.sc-ion-searchbar-ios-h .searchbar-input.sc-ion-searchbar-ios, .searchbar-no-animate.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{-webkit-transition-duration:0ms;transition-duration:0ms}.ion-color.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios{color:var(--ion-color-base)}\@media (any-hover:hover){.ion-color.sc-ion-searchbar-ios-h .searchbar-cancel-button.sc-ion-searchbar-ios:hover{color:var(--ion-color-tint)}}ion-toolbar.sc-ion-searchbar-ios-h, ion-toolbar .sc-ion-searchbar-ios-h{padding-top:1px;padding-bottom:15px;height:52px}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color), ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color){color:inherit}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-cancel-button.sc-ion-searchbar-ios, ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-cancel-button.sc-ion-searchbar-ios{color:currentColor}ion-toolbar.ion-color.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios, ion-toolbar.ion-color .sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios{color:currentColor;opacity:.5}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-input.sc-ion-searchbar-ios, ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-input.sc-ion-searchbar-ios{background:rgba(var(--ion-color-contrast-rgb),.07);color:currentColor}ion-toolbar.ion-color.sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-clear-button.sc-ion-searchbar-ios, ion-toolbar.ion-color .sc-ion-searchbar-ios-h:not(.ion-color) .searchbar-clear-button.sc-ion-searchbar-ios{color:currentColor;opacity:.5}";
      }

    };
    /***/
  }
}]);
//# sourceMappingURL=55-es5.js.map