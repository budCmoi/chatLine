exports.id = 561;
exports.ids = [561];
exports.modules = {

/***/ 5321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__ default */ const { createProxy  } = __webpack_require__(1399);
module.exports = createProxy("C:\\Users\\Mohamed ali\\Desktop\\CODE\\chatLine\\apps\\web\\src\\components\\layout\\app-shell.tsx");


/***/ }),

/***/ 5851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ChatInput)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9539);
/* harmony import */ var _lib_cn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4386);




function ChatInput({ onSend , disabled =false , placeholder ="Posez votre question…"  }) {
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [focused, setFocused] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const textareaRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Auto-resize textarea
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
    }, [
        value
    ]);
    // Focus glow animation
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!wrapperRef.current) return;
        if (focused) {
            gsap__WEBPACK_IMPORTED_MODULE_3__/* .gsap.to */ .p8.to(wrapperRef.current, {
                boxShadow: "0 0 0 1px rgba(245,208,66,0.35), 0 0 30px rgba(245,208,66,0.08)",
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap__WEBPACK_IMPORTED_MODULE_3__/* .gsap.to */ .p8.to(wrapperRef.current, {
                boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.5)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [
        focused
    ]);
    const handleSend = ()=>{
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const canSend = value.trim().length > 0 && !disabled;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "sticky bottom-0 left-0 right-0 z-20 px-3 sm:px-4 pt-3",
        style: {
            paddingBottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))"
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "pb-14 md:pb-0",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "absolute bottom-full left-0 right-0 h-16 bg-gradient-to-t from-ink to-transparent pointer-events-none"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-3xl mx-auto relative",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            ref: wrapperRef,
                            className: "flex items-end gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-ink-card border border-rim backdrop-blur-xl transition-none",
                            style: {
                                boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.5)"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                    ref: textareaRef,
                                    value: value,
                                    onChange: (e)=>setValue(e.target.value),
                                    onKeyDown: handleKeyDown,
                                    onFocus: ()=>setFocused(true),
                                    onBlur: ()=>setFocused(false),
                                    placeholder: placeholder,
                                    disabled: disabled,
                                    rows: 1,
                                    className: (0,_lib_cn__WEBPACK_IMPORTED_MODULE_2__.cn)("flex-1 resize-none bg-transparent text-snow/90 placeholder-snow/25 text-sm leading-relaxed outline-none", "scrollbar-none overflow-hidden", disabled && "opacity-50 cursor-not-allowed"),
                                    style: {
                                        maxHeight: "160px"
                                    }
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "hidden sm:flex items-center gap-1.5 shrink-0 mb-0.5",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "text-[10px] text-snow/30 font-medium",
                                        children: "GPT-5"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    onClick: handleSend,
                                    disabled: !canSend,
                                    className: (0,_lib_cn__WEBPACK_IMPORTED_MODULE_2__.cn)("shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150", canSend ? "bg-gold text-ink hover:brightness-105 hover:scale-105 active:scale-95" : "bg-snow-dim text-snow/20 cursor-not-allowed"),
                                    "aria-label": "Envoyer",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SendIcon, {})
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-center text-[10px] text-snow/20 mt-2 hidden sm:block",
                            children: "ChatLine peut faire des erreurs. V\xe9rifiez les informations importantes."
                        })
                    ]
                })
            ]
        })
    });
}
function SendIcon() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        fill: "none",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
            d: "M12.5 1.5L6.5 7.5M12.5 1.5L9 12.5L6.5 7.5M12.5 1.5L1.5 5L6.5 7.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })
    });
}


/***/ })

};
;