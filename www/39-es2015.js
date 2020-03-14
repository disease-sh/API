(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/@ionic/core/dist/esm/ion-modal-md.entry.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-modal-md.entry.js ***!
  \*****************************************************************/
/*! exports provided: ion_modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_modal", function() { return Modal; });
/* harmony import */ var _core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-0a8d4d2e.js */ "./node_modules/@ionic/core/dist/esm/core-0a8d4d2e.js");
/* harmony import */ var _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-3c7f3790.js */ "./node_modules/@ionic/core/dist/esm/config-3c7f3790.js");
/* harmony import */ var _helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers-46f4a262.js */ "./node_modules/@ionic/core/dist/esm/helpers-46f4a262.js");
/* harmony import */ var _animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation-56279521.js */ "./node_modules/@ionic/core/dist/esm/animation-56279521.js");
/* harmony import */ var _cubic_bezier_1d592096_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubic-bezier-1d592096.js */ "./node_modules/@ionic/core/dist/esm/cubic-bezier-1d592096.js");
/* harmony import */ var _index_c38df685_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index-c38df685.js */ "./node_modules/@ionic/core/dist/esm/index-c38df685.js");
/* harmony import */ var _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants-3c3e1099.js */ "./node_modules/@ionic/core/dist/esm/constants-3c3e1099.js");
/* harmony import */ var _hardware_back_button_1ed0083a_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hardware-back-button-1ed0083a.js */ "./node_modules/@ionic/core/dist/esm/hardware-back-button-1ed0083a.js");
/* harmony import */ var _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./overlays-e336664a.js */ "./node_modules/@ionic/core/dist/esm/overlays-e336664a.js");
/* harmony import */ var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme-18cbe2cc.js */ "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");
/* harmony import */ var _framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./framework-delegate-c2e2e1f4.js */ "./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js");
/* harmony import */ var _index_1469ea79_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./index-1469ea79.js */ "./node_modules/@ionic/core/dist/esm/index-1469ea79.js");













// Defaults for the card swipe animation
const SwipeToCloseDefaults = {
    MIN_PRESENTING_SCALE: 0.93,
};
const createSwipeToCloseGesture = (el, animation, onDismiss) => {
    const height = el.offsetHeight;
    let isOpen = false;
    const canStart = (detail) => {
        const target = detail.event.target;
        if (target === null ||
            !target.closest) {
            return true;
        }
        const content = target.closest('ion-content');
        if (content === null) {
            return true;
        }
        // Target is in the content so we don't start the gesture.
        // We could be more nuanced here and allow it for content that
        // does not need to scroll.
        return false;
    };
    const onStart = () => {
        animation.progressStart(true, (isOpen) ? 1 : 0);
    };
    const onMove = (detail) => {
        const step = detail.deltaY / height;
        if (step < 0) {
            return;
        }
        animation.progressStep(step);
    };
    const onEnd = (detail) => {
        const velocity = detail.velocityY;
        const step = detail.deltaY / height;
        if (step < 0) {
            return;
        }
        const threshold = (detail.deltaY + velocity * 1000) / height;
        const shouldComplete = threshold >= 0.5;
        let newStepValue = (shouldComplete) ? -0.001 : 0.001;
        if (!shouldComplete) {
            animation.easing('cubic-bezier(1, 0, 0.68, 0.28)');
            newStepValue += Object(_cubic_bezier_1d592096_js__WEBPACK_IMPORTED_MODULE_4__["g"])([0, 0], [1, 0], [0.68, 0.28], [1, 1], step)[0];
        }
        else {
            animation.easing('cubic-bezier(0.32, 0.72, 0, 1)');
            newStepValue += Object(_cubic_bezier_1d592096_js__WEBPACK_IMPORTED_MODULE_4__["g"])([0, 0], [0.32, 0.72], [0, 1], [1, 1], step)[0];
        }
        const duration = (shouldComplete) ? computeDuration(step * height, velocity) : computeDuration((1 - step) * height, velocity);
        isOpen = shouldComplete;
        gesture.enable(false);
        animation
            .onFinish(() => {
            if (!shouldComplete) {
                gesture.enable(true);
            }
        })
            .progressEnd((shouldComplete) ? 1 : 0, newStepValue, duration);
        if (shouldComplete) {
            onDismiss();
        }
    };
    const gesture = Object(_index_c38df685_js__WEBPACK_IMPORTED_MODULE_5__["createGesture"])({
        el,
        gestureName: 'modalSwipeToClose',
        gesturePriority: 40,
        direction: 'y',
        threshold: 10,
        canStart,
        onStart,
        onMove,
        onEnd
    });
    return gesture;
};
const computeDuration = (remaining, velocity) => {
    return Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(400, remaining / Math.abs(velocity * 1.1), 500);
};

/**
 * iOS Modal Enter Animation for the Card presentation style
 */
const iosEnterAnimation = (baseEl, presentingEl) => {
    // The top translate Y for the presenting element
    const backdropAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
        'pointer-events': 'none'
    })
        .afterClearStyles(['pointer-events']);
    const wrapperAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .beforeStyles({ 'opacity': 1 })
        .fromTo('transform', 'translateY(100vh)', 'translateY(0vh)');
    const baseAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
        .addElement(baseEl)
        .easing('cubic-bezier(0.32,0.72,0,1)')
        .duration(500)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]);
    if (presentingEl) {
        /**
         * Fallback for browsers that does not support `max()` (ex: Firefox)
         * No need to wrry about statusbar padding since engines like Gecko
         * are not used as the engine for standlone Cordova/Capacitor apps
         */
        const transformOffset = (!CSS.supports('width', 'max(0px, 1px)')) ? '30px' : 'max(30px, var(--ion-safe-area-top))';
        const modalTransform = (presentingEl.tagName === 'ION-MODAL' && presentingEl.presentingElement !== undefined) ? '-10px' : transformOffset;
        const bodyEl = document.body;
        const toPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
        const finalTransform = `translateY(${modalTransform}) scale(${toPresentingScale})`;
        const presentingAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
            .beforeStyles({
            'transform': 'translateY(0)',
            'transform-origin': 'top center',
            'overflow': 'hidden'
        })
            .afterStyles({
            'transform': finalTransform
        })
            .beforeAddWrite(() => bodyEl.style.setProperty('background-color', 'black'))
            .addElement(presentingEl)
            .keyframes([
            { offset: 0, filter: 'contrast(1)', transform: 'translateY(0px) scale(1)', borderRadius: '0px' },
            { offset: 1, filter: 'contrast(0.85)', transform: finalTransform, borderRadius: '10px 10px 0 0' }
        ]);
        baseAnimation.addAnimation(presentingAnimation);
    }
    return baseAnimation;
};

/**
 * iOS Modal Leave Animation
 */
const iosLeaveAnimation = (baseEl, presentingEl, duration = 500) => {
    const backdropAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
    const wrapperAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .beforeStyles({ 'opacity': 1 })
        .fromTo('transform', 'translateY(0vh)', 'translateY(100vh)');
    const baseAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
        .addElement(baseEl)
        .easing('cubic-bezier(0.32,0.72,0,1)')
        .duration(duration)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    if (presentingEl) {
        const transformOffset = (!CSS.supports('width', 'max(0px, 1px)')) ? '30px' : 'max(30px, var(--ion-safe-area-top))';
        const modalTransform = (presentingEl.tagName === 'ION-MODAL' && presentingEl.presentingElement !== undefined) ? '-10px' : transformOffset;
        const bodyEl = document.body;
        const currentPresentingScale = SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
        const presentingAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])()
            .addElement(presentingEl)
            .beforeClearStyles(['transform'])
            .afterClearStyles(['transform'])
            .onFinish(currentStep => {
            // only reset background color if this is the last card-style modal
            if (currentStep !== 1) {
                return;
            }
            presentingEl.style.setProperty('overflow', '');
            const numModals = Array.from(bodyEl.querySelectorAll('ion-modal')).filter(m => m.presentingElement !== undefined).length;
            if (numModals <= 1) {
                bodyEl.style.setProperty('background-color', '');
            }
        })
            .keyframes([
            { offset: 0, filter: 'contrast(0.85)', transform: `translateY(${modalTransform}) scale(${currentPresentingScale})`, borderRadius: '10px 10px 0 0' },
            { offset: 1, filter: 'contrast(1)', transform: 'translateY(0px) scale(1)', borderRadius: '0px' }
        ]);
        baseAnimation.addAnimation(presentingAnimation);
    }
    return baseAnimation;
};

/**
 * Md Modal Enter Animation
 */
const mdEnterAnimation = (baseEl) => {
    const baseAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
    const backdropAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
    const wrapperAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
        'pointer-events': 'none'
    })
        .afterClearStyles(['pointer-events']);
    wrapperAnimation
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .keyframes([
        { offset: 0, opacity: 0.01, transform: 'translateY(40px)' },
        { offset: 1, opacity: 1, transform: 'translateY(0px)' }
    ]);
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(280)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

/**
 * Md Modal Leave Animation
 */
const mdLeaveAnimation = (baseEl) => {
    const baseAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
    const backdropAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
    const wrapperAnimation = Object(_animation_56279521_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
    wrapperAnimation
        .addElement(wrapperEl)
        .keyframes([
        { offset: 0, opacity: 0.99, transform: 'translateY(0px)' },
        { offset: 1, opacity: 0, transform: 'translateY(40px)' }
    ]);
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.47,0,0.745,0.715)')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

const Modal = class {
    constructor(hostRef) {
        Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        // Whether or not modal is being dismissed via gesture
        this.gestureAnimationDismissing = false;
        this.presented = false;
        this.mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * If `true`, the modal will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, a backdrop will be displayed behind the modal.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the modal will animate.
         */
        this.animated = true;
        /**
         * If `true`, the modal can be swiped to dismiss. Only applies in iOS mode.
         */
        this.swipeToClose = false;
        this.onBackdropTap = () => {
            this.dismiss(undefined, _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["B"]);
        };
        this.onDismiss = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.dismiss();
        };
        this.onLifecycle = (modalEvent) => {
            const el = this.usersElement;
            const name = LIFECYCLE_MAP[modalEvent.type];
            if (el && name) {
                const ev = new CustomEvent(name, {
                    bubbles: false,
                    cancelable: false,
                    detail: modalEvent.detail
                });
                el.dispatchEvent(ev);
            }
        };
        Object(_overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["d"])(this.el);
        this.didPresent = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionModalDidPresent", 7);
        this.willPresent = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionModalWillPresent", 7);
        this.willDismiss = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionModalWillDismiss", 7);
        this.didDismiss = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionModalDidDismiss", 7);
    }
    /**
     * Present the modal overlay after it has been created.
     */
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector(`.modal-wrapper`);
        if (!container) {
            throw new Error('container is undefined');
        }
        const componentProps = Object.assign(Object.assign({}, this.componentProps), { modal: this.el });
        this.usersElement = await Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_10__["a"])(this.delegate, container, this.component, ['ion-page'], componentProps);
        await Object(_index_1469ea79_js__WEBPACK_IMPORTED_MODULE_11__["d"])(this.usersElement);
        await Object(_overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["e"])(this, 'modalEnter', iosEnterAnimation, mdEnterAnimation, this.presentingElement);
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        if (this.swipeToClose && mode === 'ios') {
            // All of the elements needed for the swipe gesture
            // should be in the DOM and referenced by now, except
            // for the presenting el
            const animationBuilder = this.leaveAnimation || _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__["b"].get('modalLeave', iosLeaveAnimation);
            const ani = this.animation = animationBuilder(this.el, this.presentingElement);
            this.gesture = createSwipeToCloseGesture(this.el, ani, () => {
                /**
                 * While the gesture animation is finishing
                 * it is possible for a user to tap the backdrop.
                 * This would result in the dismiss animation
                 * being played again. Typically this is avoided
                 * by setting `presented = false` on the overlay
                 * component; however, we cannot do that here as
                 * that would prevent the element from being
                 * removed from the DOM.
                 */
                this.gestureAnimationDismissing = true;
                this.animation.onFinish(async () => {
                    await this.dismiss(undefined, 'gesture');
                    this.gestureAnimationDismissing = false;
                });
            });
            this.gesture.enable(true);
        }
    }
    /**
     * Dismiss the modal overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the modal. For example, 'cancel' or 'backdrop'.
     */
    async dismiss(data, role) {
        if (this.gestureAnimationDismissing && role !== 'gesture') {
            return false;
        }
        const enteringAnimation = _overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["h"].get(this) || [];
        const dismissed = await Object(_overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["f"])(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation, this.presentingElement);
        if (dismissed) {
            await Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_10__["d"])(this.delegate, this.usersElement);
            if (this.animation) {
                this.animation.destroy();
            }
            enteringAnimation.forEach(ani => ani.destroy());
        }
        this.animation = undefined;
        return dismissed;
    }
    /**
     * Returns a promise that resolves when the modal did dismiss.
     */
    onDidDismiss() {
        return Object(_overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["g"])(this.el, 'ionModalDidDismiss');
    }
    /**
     * Returns a promise that resolves when the modal will dismiss.
     */
    onWillDismiss() {
        return Object(_overlays_e336664a_js__WEBPACK_IMPORTED_MODULE_8__["g"])(this.el, 'ionModalWillDismiss');
    }
    render() {
        const mode = Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        return (Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["H"], { "no-router": true, "aria-modal": "true", class: Object.assign({ [mode]: true, [`modal-card`]: this.presentingElement !== undefined && mode === 'ios' }, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_9__["g"])(this.cssClass)), style: {
                zIndex: `${20000 + this.overlayIndex}`,
            }, onIonBackdropTap: this.onBackdropTap, onIonDismiss: this.onDismiss, onIonModalDidPresent: this.onLifecycle, onIonModalWillPresent: this.onLifecycle, onIonModalWillDismiss: this.onLifecycle, onIonModalDidDismiss: this.onLifecycle }, Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }), Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { role: "dialog", class: "modal-wrapper" })));
    }
    get el() { return Object(_core_0a8d4d2e_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this); }
    static get style() { return ".sc-ion-modal-md-h{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color,#fff);--box-shadow:none;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:strict}.overlay-hidden.sc-ion-modal-md-h{display:none}.modal-wrapper.sc-ion-modal-md{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-md-h{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}\@media only screen and (min-width:768px) and (min-height:768px){.sc-ion-modal-md-h{--width:600px;--height:600px}}.sc-ion-modal-md-h{--backdrop-opacity:var(--ion-backdrop-opacity,0.32)}\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-md-h{--border-radius:2px;--box-shadow:0 28px 48px rgba(0,0,0,0.4)}}.modal-wrapper.sc-ion-modal-md{-webkit-transform:translate3d(0,40px,0);transform:translate3d(0,40px,0);opacity:.01}"; }
};
const LIFECYCLE_MAP = {
    'ionModalDidPresent': 'ionViewDidEnter',
    'ionModalWillPresent': 'ionViewWillEnter',
    'ionModalWillDismiss': 'ionViewWillLeave',
    'ionModalDidDismiss': 'ionViewDidLeave',
};




/***/ })

}]);
//# sourceMappingURL=39-es2015.js.map