(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tap-click-606f325e-js"],{

/***/ "./node_modules/@ionic/core/dist/esm/tap-click-606f325e.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/tap-click-606f325e.js ***!
  \*****************************************************************/
/*! exports provided: startTapClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTapClick", function() { return startTapClick; });
/* harmony import */ var _helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers-46f4a262.js */ "./node_modules/@ionic/core/dist/esm/helpers-46f4a262.js");


const startTapClick = (config) => {
    let lastTouch = -MOUSE_WAIT * 10;
    let lastActivated = 0;
    let scrollingEl;
    let activatableEle;
    let activeRipple;
    let activeDefer;
    const useRippleEffect = config.getBoolean('animated', true) && config.getBoolean('rippleEffect', true);
    const clearDefers = new WeakMap();
    const isScrolling = () => {
        return scrollingEl !== undefined && scrollingEl.parentElement !== null;
    };
    // Touch Events
    const onTouchStart = (ev) => {
        lastTouch = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev);
        pointerDown(ev);
    };
    const onTouchEnd = (ev) => {
        lastTouch = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev);
        pointerUp(ev);
    };
    const onMouseDown = (ev) => {
        const t = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev) - MOUSE_WAIT;
        if (lastTouch < t) {
            pointerDown(ev);
        }
    };
    const onMouseUp = (ev) => {
        const t = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev) - MOUSE_WAIT;
        if (lastTouch < t) {
            pointerUp(ev);
        }
    };
    const cancelActive = () => {
        clearTimeout(activeDefer);
        activeDefer = undefined;
        if (activatableEle) {
            removeActivated(false);
            activatableEle = undefined;
        }
    };
    const pointerDown = (ev) => {
        if (activatableEle || isScrolling()) {
            return;
        }
        scrollingEl = undefined;
        setActivatedElement(getActivatableTarget(ev), ev);
    };
    const pointerUp = (ev) => {
        setActivatedElement(undefined, ev);
    };
    const setActivatedElement = (el, ev) => {
        // do nothing
        if (el && el === activatableEle) {
            return;
        }
        clearTimeout(activeDefer);
        activeDefer = undefined;
        const { x, y } = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev);
        // deactivate selected
        if (activatableEle) {
            if (clearDefers.has(activatableEle)) {
                throw new Error('internal error');
            }
            if (!activatableEle.classList.contains(ACTIVATED)) {
                addActivated(activatableEle, x, y);
            }
            removeActivated(true);
        }
        // activate
        if (el) {
            const deferId = clearDefers.get(el);
            if (deferId) {
                clearTimeout(deferId);
                clearDefers.delete(el);
            }
            const delay = isInstant(el) ? 0 : ADD_ACTIVATED_DEFERS;
            el.classList.remove(ACTIVATED);
            activeDefer = setTimeout(() => {
                addActivated(el, x, y);
                activeDefer = undefined;
            }, delay);
        }
        activatableEle = el;
    };
    const addActivated = (el, x, y) => {
        lastActivated = Date.now();
        el.classList.add(ACTIVATED);
        const rippleEffect = useRippleEffect && getRippleEffect(el);
        if (rippleEffect && rippleEffect.addRipple) {
            removeRipple();
            activeRipple = rippleEffect.addRipple(x, y);
        }
    };
    const removeRipple = () => {
        if (activeRipple !== undefined) {
            activeRipple.then(remove => remove());
            activeRipple = undefined;
        }
    };
    const removeActivated = (smooth) => {
        removeRipple();
        const active = activatableEle;
        if (!active) {
            return;
        }
        const time = CLEAR_STATE_DEFERS - Date.now() + lastActivated;
        if (smooth && time > 0 && !isInstant(active)) {
            const deferId = setTimeout(() => {
                active.classList.remove(ACTIVATED);
                clearDefers.delete(active);
            }, CLEAR_STATE_DEFERS);
            clearDefers.set(active, deferId);
        }
        else {
            active.classList.remove(ACTIVATED);
        }
    };
    const doc = document;
    doc.addEventListener('ionScrollStart', ev => {
        scrollingEl = ev.target;
        cancelActive();
    });
    doc.addEventListener('ionScrollEnd', () => {
        scrollingEl = undefined;
    });
    doc.addEventListener('ionGestureCaptured', cancelActive);
    doc.addEventListener('touchstart', onTouchStart, true);
    doc.addEventListener('touchcancel', onTouchEnd, true);
    doc.addEventListener('touchend', onTouchEnd, true);
    doc.addEventListener('mousedown', onMouseDown, true);
    doc.addEventListener('mouseup', onMouseUp, true);
};
const getActivatableTarget = (ev) => {
    if (ev.composedPath) {
        const path = ev.composedPath();
        for (let i = 0; i < path.length - 2; i++) {
            const el = path[i];
            if (el.classList && el.classList.contains('ion-activatable')) {
                return el;
            }
        }
    }
    else {
        return ev.target.closest('.ion-activatable');
    }
};
const isInstant = (el) => {
    return el.classList.contains('ion-activatable-instant');
};
const getRippleEffect = (el) => {
    if (el.shadowRoot) {
        const ripple = el.shadowRoot.querySelector('ion-ripple-effect');
        if (ripple) {
            return ripple;
        }
    }
    return el.querySelector('ion-ripple-effect');
};
const ACTIVATED = 'ion-activated';
const ADD_ACTIVATED_DEFERS = 200;
const CLEAR_STATE_DEFERS = 200;
const MOUSE_WAIT = 2500;




/***/ })

}]);
//# sourceMappingURL=tap-click-606f325e-js-es2015.js.map