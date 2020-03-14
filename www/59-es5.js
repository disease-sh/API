(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[59], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-select_3-ios.entry.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-select_3-ios.entry.js ***!
    \*********************************************************************/

  /*! exports provided: ion_select, ion_select_option, ion_select_popover */

  /***/
  function node_modulesIonicCoreDistEsmIonSelect_3IosEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_select", function () {
      return Select;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_select_option", function () {
      return SelectOption;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_select_popover", function () {
      return SelectPopover;
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


    var _hardware_back_button_1ed0083a_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./hardware-back-button-1ed0083a.js */
    "./node_modules/@ionic/core/dist/esm/hardware-back-button-1ed0083a.js");
    /* harmony import */


    var _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./overlays-e336664a.js */
    "./node_modules/@ionic/core/dist/esm/overlays-e336664a.js");
    /* harmony import */


    var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./theme-18cbe2cc.js */
    "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");

    const watchForOptions = (containerEl, tagName, onChange) => {
      const mutation = new MutationObserver(mutationList => {
        onChange(getSelectedOption(mutationList, tagName));
      });
      mutation.observe(containerEl, {
        childList: true,
        subtree: true
      });
      return mutation;
    };

    const getSelectedOption = (mutationList, tagName) => {
      let newOption;
      mutationList.forEach(mut => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < mut.addedNodes.length; i++) {
          newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
        }
      });
      return newOption;
    };

    const findCheckedOption = (el, tagName) => {
      if (el.nodeType !== 1) {
        return undefined;
      }

      const options = el.tagName === tagName.toUpperCase() ? [el] : Array.from(el.querySelectorAll(tagName));
      return options.find(o => o.value === el.value);
    };

    const Select = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-sel-".concat(selectIds++);
        this.didInit = false;
        this.isExpanded = false;
        /**
         * If `true`, the user cannot interact with the select.
         */

        this.disabled = false;
        /**
         * The text to display on the cancel button.
         */

        this.cancelText = 'Cancel';
        /**
         * The text to display on the ok button.
         */

        this.okText = 'OK';
        /**
         * The name of the control, which is submitted with the form data.
         */

        this.name = this.inputId;
        /**
         * If `true`, the select can accept multiple values.
         */

        this.multiple = false;
        /**
         * The interface the select should use: `action-sheet`, `popover` or `alert`.
         */

        this.interface = 'alert';
        /**
         * Any additional options that the `alert`, `action-sheet` or `popover` interface
         * can take. See the [AlertController API docs](../../alert/AlertController/#create), the
         * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) and the
         * [PopoverController API docs](../../popover/PopoverController/#create) for the
         * create options for each interface.
         */

        this.interfaceOptions = {};

        this.onClick = ev => {
          this.setFocus();
          this.open(ev);
        };

        this.onFocus = () => {
          this.ionFocus.emit();
        };

        this.onBlur = () => {
          this.ionBlur.emit();
        };

        this.ionChange = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionChange", 7);
        this.ionCancel = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionCancel", 7);
        this.ionFocus = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionFocus", 7);
        this.ionBlur = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionBlur", 7);
        this.ionStyle = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
      }

      disabledChanged() {
        this.emitStyle();
      }

      valueChanged() {
        this.emitStyle();

        if (this.didInit) {
          this.ionChange.emit({
            value: this.value
          });
        }
      }

      async connectedCallback() {
        this.updateOverlayOptions();
        this.emitStyle();
        this.mutationO = watchForOptions(this.el, 'ion-select-option', async () => {
          this.updateOverlayOptions();
        });
      }

      disconnectedCallback() {
        if (this.mutationO) {
          this.mutationO.disconnect();
          this.mutationO = undefined;
        }
      }

      componentDidLoad() {
        this.didInit = true;
      }
      /**
       * Open the select overlay. The overlay is either an alert, action sheet, or popover,
       * depending on the `interface` property on the `ion-select`.
       *
       * @param event The user interface event that called the open.
       */


      async open(event) {
        if (this.disabled || this.isExpanded) {
          return undefined;
        }

        const overlay = this.overlay = await this.createOverlay(event);
        this.isExpanded = true;
        overlay.onDidDismiss().then(() => {
          this.overlay = undefined;
          this.isExpanded = false;
          this.setFocus();
        });
        await overlay.present();
        return overlay;
      }

      createOverlay(ev) {
        let selectInterface = this.interface;

        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
          console.warn("Select interface cannot be \"".concat(selectInterface, "\" with a multi-value select. Using the \"alert\" interface instead."));
          selectInterface = 'alert';
        }

        if (selectInterface === 'popover' && !ev) {
          console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.');
          selectInterface = 'alert';
        }

        if (selectInterface === 'popover') {
          return this.openPopover(ev);
        }

        if (selectInterface === 'action-sheet') {
          return this.openActionSheet();
        }

        return this.openAlert();
      }

      updateOverlayOptions() {
        const overlay = this.overlay;

        if (!overlay) {
          return;
        }

        const childOpts = this.childOpts;
        const value = this.value;

        switch (this.interface) {
          case 'action-sheet':
            overlay.buttons = this.createActionSheetButtons(childOpts, value);
            break;

          case 'popover':
            const popover = overlay.querySelector('ion-select-popover');

            if (popover) {
              popover.options = this.createPopoverOptions(childOpts, value);
            }

            break;

          case 'alert':
            const inputType = this.multiple ? 'checkbox' : 'radio';
            overlay.inputs = this.createAlertInputs(childOpts, inputType, value);
            break;
        }
      }

      createActionSheetButtons(data, selectValue) {
        const actionSheetButtons = data.map(option => {
          const value = getOptionValue(option);
          return {
            role: isOptionSelected(value, selectValue, this.compareWith) ? 'selected' : '',
            text: option.textContent,
            handler: () => {
              this.value = value;
            }
          };
        }); // Add "cancel" button

        actionSheetButtons.push({
          text: this.cancelText,
          role: 'cancel',
          handler: () => {
            this.ionCancel.emit();
          }
        });
        return actionSheetButtons;
      }

      createAlertInputs(data, inputType, selectValue) {
        return data.map(o => {
          const value = getOptionValue(o);
          return {
            type: inputType,
            label: o.textContent || '',
            value,
            checked: isOptionSelected(value, selectValue, this.compareWith),
            disabled: o.disabled
          };
        });
      }

      createPopoverOptions(data, selectValue) {
        return data.map(o => {
          const value = getOptionValue(o);
          return {
            text: o.textContent || '',
            value,
            checked: isOptionSelected(value, selectValue, this.compareWith),
            disabled: o.disabled,
            handler: () => {
              this.value = value;
              this.close();
            }
          };
        });
      }

      async openPopover(ev) {
        const interfaceOptions = this.interfaceOptions;
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const value = this.value;
        const popoverOpts = Object.assign(Object.assign({
          mode
        }, interfaceOptions), {
          component: 'ion-select-popover',
          cssClass: ['select-popover', interfaceOptions.cssClass],
          event: ev,
          componentProps: {
            header: interfaceOptions.header,
            subHeader: interfaceOptions.subHeader,
            message: interfaceOptions.message,
            value,
            options: this.createPopoverOptions(this.childOpts, value)
          }
        });
        return _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_4__["c"].create(popoverOpts);
      }

      async openActionSheet() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const interfaceOptions = this.interfaceOptions;
        const actionSheetOpts = Object.assign(Object.assign({
          mode
        }, interfaceOptions), {
          buttons: this.createActionSheetButtons(this.childOpts, this.value),
          cssClass: ['select-action-sheet', interfaceOptions.cssClass]
        });
        return _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_4__["b"].create(actionSheetOpts);
      }

      async openAlert() {
        const label = this.getLabel();
        const labelText = label ? label.textContent : null;
        const interfaceOptions = this.interfaceOptions;
        const inputType = this.multiple ? 'checkbox' : 'radio';
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const alertOpts = Object.assign(Object.assign({
          mode
        }, interfaceOptions), {
          header: interfaceOptions.header ? interfaceOptions.header : labelText,
          inputs: this.createAlertInputs(this.childOpts, inputType, this.value),
          buttons: [{
            text: this.cancelText,
            role: 'cancel',
            handler: () => {
              this.ionCancel.emit();
            }
          }, {
            text: this.okText,
            handler: selectedValues => {
              this.value = selectedValues;
            }
          }],
          cssClass: ['select-alert', interfaceOptions.cssClass, this.multiple ? 'multiple-select-alert' : 'single-select-alert']
        });
        return _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_4__["a"].create(alertOpts);
      }
      /**
       * Close the select interface.
       */


      close() {
        // TODO check !this.overlay || !this.isFocus()
        if (!this.overlay) {
          return Promise.resolve(false);
        }

        return this.overlay.dismiss();
      }

      getLabel() {
        return Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["f"])(this.el);
      }

      hasValue() {
        return this.getText() !== '';
      }

      get childOpts() {
        return Array.from(this.el.querySelectorAll('ion-select-option'));
      }

      getText() {
        const selectedText = this.selectedText;

        if (selectedText != null && selectedText !== '') {
          return selectedText;
        }

        return generateText(this.childOpts, this.value, this.compareWith);
      }

      setFocus() {
        if (this.buttonEl) {
          this.buttonEl.focus();
        }
      }

      emitStyle() {
        this.ionStyle.emit({
          'interactive': true,
          'select': true,
          'has-placeholder': this.placeholder != null,
          'has-value': this.hasValue(),
          'interactive-disabled': this.disabled,
          'select-disabled': this.disabled
        });
      }

      render() {
        const {
          placeholder,
          name,
          disabled,
          isExpanded,
          value,
          el
        } = this;
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        const labelId = this.inputId + '-lbl';
        const label = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["f"])(el);

        if (label) {
          label.id = labelId;
        }

        let addPlaceholderClass = false;
        let selectText = this.getText();

        if (selectText === '' && placeholder != null) {
          selectText = placeholder;
          addPlaceholderClass = true;
        }

        Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["a"])(true, el, name, parseValue(value), disabled);
        const selectTextClasses = {
          'select-text': true,
          'select-placeholder': addPlaceholderClass
        };
        const textPart = addPlaceholderClass ? 'placeholder' : 'text';
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          onClick: this.onClick,
          role: "combobox",
          "aria-haspopup": "dialog",
          "aria-disabled": disabled ? 'true' : null,
          "aria-expanded": "".concat(isExpanded),
          "aria-labelledby": labelId,
          class: {
            [mode]: true,
            'in-item': Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_5__["h"])('ion-item', el),
            'select-disabled': disabled
          }
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: selectTextClasses,
          part: textPart
        }, selectText), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "select-icon",
          role: "presentation",
          part: "icon"
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          class: "select-icon-inner",
          part: "icon-inner"
        })), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
          type: "button",
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          disabled: disabled,
          ref: btnEl => this.buttonEl = btnEl
        }));
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get watchers() {
        return {
          "disabled": ["disabledChanged"],
          "placeholder": ["disabledChanged"],
          "value": ["valueChanged"]
        };
      }

      static get style() {
        return ":host{--placeholder-color:currentColor;--placeholder-opacity:0.33;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family,inherit);overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static;max-width:45%}:host(.select-disabled){opacity:.4;pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}.select-placeholder{color:var(--placeholder-color);opacity:var(--placeholder-opacity)}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.select-icon{position:relative;opacity:.33}.select-text{-ms-flex:1;flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-icon-inner{left:5px;top:50%;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;pointer-events:none}:host-context([dir=rtl]) .select-icon-inner,[dir=rtl] .select-icon-inner{left:unset;right:unset;right:5px}:host{--padding-top:10px;--padding-end:10px;--padding-bottom:10px;--padding-start:20px}.select-icon{width:12px;height:18px}";
      }

    };

    const isOptionSelected = (currentValue, compareValue, compareWith) => {
      if (currentValue === undefined) {
        return false;
      }

      if (Array.isArray(currentValue)) {
        return currentValue.some(val => compareOptions(val, compareValue, compareWith));
      } else {
        return compareOptions(currentValue, compareValue, compareWith);
      }
    };

    const getOptionValue = el => {
      const value = el.value;
      return value === undefined ? el.textContent || '' : value;
    };

    const parseValue = value => {
      if (value == null) {
        return undefined;
      }

      if (Array.isArray(value)) {
        return value.join(',');
      }

      return value.toString();
    };

    const compareOptions = (currentValue, compareValue, compareWith) => {
      if (typeof compareWith === 'function') {
        return compareWith(currentValue, compareValue);
      } else if (typeof compareWith === 'string') {
        return currentValue[compareWith] === compareValue[compareWith];
      } else {
        return Array.isArray(compareValue) ? compareValue.includes(currentValue) : currentValue === compareValue;
      }
    };

    const generateText = (opts, value, compareWith) => {
      if (value === undefined) {
        return '';
      }

      if (Array.isArray(value)) {
        return value.map(v => textForValue(opts, v, compareWith)).filter(opt => opt !== null).join(', ');
      } else {
        return textForValue(opts, value, compareWith) || '';
      }
    };

    const textForValue = (opts, value, compareWith) => {
      const selectOpt = opts.find(opt => {
        return compareOptions(getOptionValue(opt), value, compareWith);
      });
      return selectOpt ? selectOpt.textContent : null;
    };

    let selectIds = 0;
    const SelectOption = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.inputId = "ion-selopt-".concat(selectOptionIds++);
        /**
         * If `true`, the user cannot interact with the select option.
         */

        this.disabled = false;
      }

      render() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          role: "option",
          id: this.inputId,
          class: Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this)
        });
      }

      get el() {
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
      }

      static get style() {
        return ":host{display:none}";
      }

    };
    let selectOptionIds = 0;
    const SelectPopover = class {
      constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /** Array of options for the popover */

        this.options = [];
      }

      onSelect(ev) {
        const option = this.options.find(o => o.value === ev.target.value);

        if (option) {
          Object(_overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_4__["s"])(option.handler);
        }
      }

      render() {
        const checkedOption = this.options.find(o => o.checked);
        const checkedValue = checkedOption ? checkedOption.value : undefined;
        return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
          class: Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this)
        }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-list", null, this.header !== undefined && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-list-header", null, this.header), (this.subHeader !== undefined || this.message !== undefined) && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-item", null, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-label", {
          class: "ion-text-wrap"
        }, this.subHeader !== undefined && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h3", null, this.subHeader), this.message !== undefined && Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("p", null, this.message))), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-radio-group", {
          value: checkedValue
        }, this.options.map(option => Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-item", null, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-label", null, option.text), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-radio", {
          value: option.value,
          disabled: option.disabled
        }))))));
      }

      static get style() {
        return ".sc-ion-select-popover-h ion-list.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:-1px;margin-bottom:-1px}.sc-ion-select-popover-h ion-label.sc-ion-select-popover, .sc-ion-select-popover-h ion-list-header.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";
      }

    };
    /***/
  }
}]);
//# sourceMappingURL=59-es5.js.map