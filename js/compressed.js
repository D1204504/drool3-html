! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = e || self).bootstrap = {}, e.jQuery, e.Popper)
}(this, function(e, c, r) {
    "use strict";

    function i(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function s(e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e
    }

    function a(i) {
        for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {},
                t = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (t = t.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable
            }))), t.forEach(function(e) {
                var t, n;
                t = i, e = r[n = e], n in t ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[n] = e
            })
        }
        return i
    }
    c = c && c.hasOwnProperty("default") ? c.default : c, r = r && r.hasOwnProperty("default") ? r.default : r;
    var t = "transitionend";

    function n(e) {
        var t = this,
            n = !1;
        return c(this).one(f.TRANSITION_END, function() {
            n = !0
        }), setTimeout(function() {
            n || f.triggerTransitionEnd(t)
        }, e), this
    }
    var f = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(e) {
            for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
            return e
        },
        getSelectorFromElement: function(e) {
            var t = e.getAttribute("data-target");
            t && "#" !== t || (t = (e = e.getAttribute("href")) && "#" !== e ? e.trim() : "");
            try {
                return document.querySelector(t) ? t : null
            } catch (e) {
                return null
            }
        },
        getTransitionDurationFromElement: function(e) {
            if (!e) return 0;
            var t = c(e).css("transition-duration"),
                n = c(e).css("transition-delay"),
                i = parseFloat(t),
                e = parseFloat(n);
            return i || e ? (t = t.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(n))) : 0
        },
        reflow: function(e) {
            return e.offsetHeight
        },
        triggerTransitionEnd: function(e) {
            c(e).trigger(t)
        },
        supportsTransitionEnd: function() {
            return Boolean(t)
        },
        isElement: function(e) {
            return (e[0] || e).nodeType
        },
        typeCheckConfig: function(e, t, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var r = n[i],
                        o = t[i],
                        s = o && f.isElement(o) ? "element" : (s = o, {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(r).test(s)) throw new Error(e.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
                }
            var s
        },
        findShadowRoot: function(e) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof e.getRootNode) return e instanceof ShadowRoot ? e : e.parentNode ? f.findShadowRoot(e.parentNode) : null;
            e = e.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    c.fn.emulateTransitionEnd = n, c.event.special[f.TRANSITION_END] = {
        bindType: t,
        delegateType: t,
        handle: function(e) {
            if (c(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
        }
    };
    var o = "alert",
        l = "bs.alert",
        u = "." + l,
        h = c.fn[o],
        d = {
            CLOSE: "close" + u,
            CLOSED: "closed" + u,
            CLICK_DATA_API: "click" + u + ".data-api"
        },
        p = "alert",
        g = "fade",
        m = "show",
        v = function() {
            function i(e) {
                this._element = e
            }
            var e = i.prototype;
            return e.close = function(e) {
                var t = this._element;
                e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
            }, e.dispose = function() {
                c.removeData(this._element, l), this._element = null
            }, e._getRootElement = function(e) {
                var t = f.getSelectorFromElement(e),
                    n = !1;
                return t && (n = document.querySelector(t)), n = n || c(e).closest("." + p)[0]
            }, e._triggerCloseEvent = function(e) {
                var t = c.Event(d.CLOSE);
                return c(e).trigger(t), t
            }, e._removeElement = function(t) {
                var e, n = this;
                c(t).removeClass(m), c(t).hasClass(g) ? (e = f.getTransitionDurationFromElement(t), c(t).one(f.TRANSITION_END, function(e) {
                    return n._destroyElement(t, e)
                }).emulateTransitionEnd(e)) : this._destroyElement(t)
            }, e._destroyElement = function(e) {
                c(e).detach().trigger(d.CLOSED).remove()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = c(this),
                        t = e.data(l);
                    t || (t = new i(this), e.data(l, t)), "close" === n && t[n](this)
                })
            }, i._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), i
        }();
    c(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', v._handleDismiss(new v)), c.fn[o] = v._jQueryInterface, c.fn[o].Constructor = v, c.fn[o].noConflict = function() {
        return c.fn[o] = h, v._jQueryInterface
    };
    var y = "button",
        _ = "bs.button",
        b = "." + _,
        E = ".data-api",
        T = c.fn[y],
        w = "active",
        C = "btn",
        x = "focus",
        u = '[data-toggle^="button"]',
        S = '[data-toggle="buttons"]',
        D = 'input:not([type="hidden"])',
        A = ".active",
        N = ".btn",
        E = {
            CLICK_DATA_API: "click" + b + E,
            FOCUS_BLUR_DATA_API: "focus" + b + E + " blur" + b + E
        },
        I = function() {
            function n(e) {
                this._element = e
            }
            var e = n.prototype;
            return e.toggle = function() {
                var e = !0,
                    t = !0,
                    n = c(this._element).closest(S)[0];
                if (n) {
                    var i, r = this._element.querySelector(D);
                    if (r) {
                        if ("radio" === r.type && (r.checked && this._element.classList.contains(w) ? e = !1 : (i = n.querySelector(A)) && c(i).removeClass(w)), e) {
                            if (r.hasAttribute("disabled") || n.hasAttribute("disabled") || r.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            r.checked = !this._element.classList.contains(w), c(r).trigger("change")
                        }
                        r.focus(), t = !1
                    }
                }
                t && this._element.setAttribute("aria-pressed", !this._element.classList.contains(w)), e && c(this._element).toggleClass(w)
            }, e.dispose = function() {
                c.removeData(this._element, _), this._element = null
            }, n._jQueryInterface = function(t) {
                return this.each(function() {
                    var e = c(this).data(_);
                    e || (e = new n(this), c(this).data(_, e)), "toggle" === t && e[t]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), n
        }();
    c(document).on(E.CLICK_DATA_API, u, function(e) {
        e.preventDefault();
        e = e.target;
        c(e).hasClass(C) || (e = c(e).closest(N)), I._jQueryInterface.call(c(e), "toggle")
    }).on(E.FOCUS_BLUR_DATA_API, u, function(e) {
        var t = c(e.target).closest(N)[0];
        c(t).toggleClass(x, /^focus(in)?$/.test(e.type))
    }), c.fn[y] = I._jQueryInterface, c.fn[y].Constructor = I, c.fn[y].noConflict = function() {
        return c.fn[y] = T, I._jQueryInterface
    };
    var k = "carousel",
        O = "bs.carousel",
        j = "." + O,
        u = ".data-api",
        L = c.fn[k],
        P = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        H = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        q = "next",
        R = "prev",
        M = "left",
        W = "right",
        F = {
            SLIDE: "slide" + j,
            SLID: "slid" + j,
            KEYDOWN: "keydown" + j,
            MOUSEENTER: "mouseenter" + j,
            MOUSELEAVE: "mouseleave" + j,
            TOUCHSTART: "touchstart" + j,
            TOUCHMOVE: "touchmove" + j,
            TOUCHEND: "touchend" + j,
            POINTERDOWN: "pointerdown" + j,
            POINTERUP: "pointerup" + j,
            DRAG_START: "dragstart" + j,
            LOAD_DATA_API: "load" + j + u,
            CLICK_DATA_API: "click" + j + u
        },
        B = "carousel",
        U = "active",
        K = "slide",
        $ = "carousel-item-right",
        Q = "carousel-item-left",
        z = "carousel-item-next",
        V = "carousel-item-prev",
        X = "pointer-event",
        Y = ".active",
        G = ".active.carousel-item",
        J = ".carousel-item",
        Z = ".carousel-item img",
        ee = ".carousel-item-next, .carousel-item-prev",
        te = ".carousel-indicators",
        u = "[data-slide], [data-slide-to]",
        ne = '[data-ride="carousel"]',
        ie = {
            TOUCH: "touch",
            PEN: "pen"
        },
        re = function() {
            function r(e, t) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = this._element.querySelector(te), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var e = r.prototype;
            return e.next = function() {
                this._isSliding || this._slide(q)
            }, e.nextWhenVisible = function() {
                !document.hidden && c(this._element).is(":visible") && "hidden" !== c(this._element).css("visibility") && this.next()
            }, e.prev = function() {
                this._isSliding || this._slide(R)
            }, e.pause = function(e) {
                e || (this._isPaused = !0), this._element.querySelector(ee) && (f.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, e.cycle = function(e) {
                e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, e.to = function(e) {
                var t = this;
                this._activeElement = this._element.querySelector(G);
                var n = this._getItemIndex(this._activeElement);
                if (!(e > this._items.length - 1 || e < 0))
                    if (this._isSliding) c(this._element).one(F.SLID, function() {
                        return t.to(e)
                    });
                    else {
                        if (n === e) return this.pause(), void this.cycle();
                        n = n < e ? q : R;
                        this._slide(n, this._items[e])
                    }
            }, e.dispose = function() {
                c(this._element).off(j), c.removeData(this._element, O), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, e._getConfig = function(e) {
                return e = a({}, P, e), f.typeCheckConfig(k, e, H), e
            }, e._handleSwipe = function() {
                var e = Math.abs(this.touchDeltaX);
                e <= 40 || (0 < (e = e / this.touchDeltaX) && this.prev(), e < 0 && this.next())
            }, e._addEventListeners = function() {
                var t = this;
                this._config.keyboard && c(this._element).on(F.KEYDOWN, function(e) {
                    return t._keydown(e)
                }), "hover" === this._config.pause && c(this._element).on(F.MOUSEENTER, function(e) {
                    return t.pause(e)
                }).on(F.MOUSELEAVE, function(e) {
                    return t.cycle(e)
                }), this._config.touch && this._addTouchEventListeners()
            }, e._addTouchEventListeners = function() {
                var e, t, n = this;
                this._touchSupported && (e = function(e) {
                    n._pointerEvent && ie[e.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = e.originalEvent.clientX : n._pointerEvent || (n.touchStartX = e.originalEvent.touches[0].clientX)
                }, t = function(e) {
                    n._pointerEvent && ie[e.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = e.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(e) {
                        return n.cycle(e)
                    }, 500 + n._config.interval))
                }, c(this._element.querySelectorAll(Z)).on(F.DRAG_START, function(e) {
                    return e.preventDefault()
                }), this._pointerEvent ? (c(this._element).on(F.POINTERDOWN, e), c(this._element).on(F.POINTERUP, t), this._element.classList.add(X)) : (c(this._element).on(F.TOUCHSTART, e), c(this._element).on(F.TOUCHMOVE, function(e) {
                    (e = e).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                }), c(this._element).on(F.TOUCHEND, t)))
            }, e._keydown = function(e) {
                if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                    case 37:
                        e.preventDefault(), this.prev();
                        break;
                    case 39:
                        e.preventDefault(), this.next()
                }
            }, e._getItemIndex = function(e) {
                return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(J)) : [], this._items.indexOf(e)
            }, e._getItemByDirection = function(e, t) {
                var n = e === q,
                    i = e === R,
                    r = this._getItemIndex(t),
                    o = this._items.length - 1;
                if ((i && 0 === r || n && r === o) && !this._config.wrap) return t;
                e = (r + (e === R ? -1 : 1)) % this._items.length;
                return -1 == e ? this._items[this._items.length - 1] : this._items[e]
            }, e._triggerSlideEvent = function(e, t) {
                var n = this._getItemIndex(e),
                    i = this._getItemIndex(this._element.querySelector(G)),
                    n = c.Event(F.SLIDE, {
                        relatedTarget: e,
                        direction: t,
                        from: i,
                        to: n
                    });
                return c(this._element).trigger(n), n
            }, e._setActiveIndicatorElement = function(e) {
                var t;
                this._indicatorsElement && (t = [].slice.call(this._indicatorsElement.querySelectorAll(Y)), c(t).removeClass(U), (e = this._indicatorsElement.children[this._getItemIndex(e)]) && c(e).addClass(U))
            }, e._slide = function(e, t) {
                var n, i, r, o = this,
                    s = this._element.querySelector(G),
                    a = this._getItemIndex(s),
                    l = t || s && this._getItemByDirection(e, s),
                    u = this._getItemIndex(l),
                    t = Boolean(this._interval),
                    e = e === q ? (n = Q, i = z, M) : (n = $, i = V, W);
                l && c(l).hasClass(U) ? this._isSliding = !1 : this._triggerSlideEvent(l, e).isDefaultPrevented() || s && l && (this._isSliding = !0, t && this.pause(), this._setActiveIndicatorElement(l), r = c.Event(F.SLID, {
                    relatedTarget: l,
                    direction: e,
                    from: a,
                    to: u
                }), c(this._element).hasClass(K) ? (c(l).addClass(i), f.reflow(l), c(s).addClass(n), c(l).addClass(n), (u = parseInt(l.getAttribute("data-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = u) : this._config.interval = this._config.defaultInterval || this._config.interval, u = f.getTransitionDurationFromElement(s), c(s).one(f.TRANSITION_END, function() {
                    c(l).removeClass(n + " " + i).addClass(U), c(s).removeClass(U + " " + i + " " + n), o._isSliding = !1, setTimeout(function() {
                        return c(o._element).trigger(r)
                    }, 0)
                }).emulateTransitionEnd(u)) : (c(s).removeClass(U), c(l).addClass(U), this._isSliding = !1, c(this._element).trigger(r)), t && this.cycle())
            }, r._jQueryInterface = function(i) {
                return this.each(function() {
                    var e = c(this).data(O),
                        t = a({}, P, c(this).data());
                    "object" == typeof i && (t = a({}, t, i));
                    var n = "string" == typeof i ? i : t.slide;
                    if (e || (e = new r(this, t), c(this).data(O, e)), "number" == typeof i) e.to(i);
                    else if ("string" == typeof n) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    } else t.interval && t.ride && (e.pause(), e.cycle())
                })
            }, r._dataApiClickHandler = function(e) {
                var t, n, i = f.getSelectorFromElement(this);
                !i || (t = c(i)[0]) && c(t).hasClass(B) && (n = a({}, c(t).data(), c(this).data()), (i = this.getAttribute("data-slide-to")) && (n.interval = !1), r._jQueryInterface.call(c(t), n), i && c(t).data(O).to(i), e.preventDefault())
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return P
                }
            }]), r
        }();
    c(document).on(F.CLICK_DATA_API, u, re._dataApiClickHandler), c(window).on(F.LOAD_DATA_API, function() {
        for (var e = [].slice.call(document.querySelectorAll(ne)), t = 0, n = e.length; t < n; t++) {
            var i = c(e[t]);
            re._jQueryInterface.call(i, i.data())
        }
    }), c.fn[k] = re._jQueryInterface, c.fn[k].Constructor = re, c.fn[k].noConflict = function() {
        return c.fn[k] = L, re._jQueryInterface
    };
    var oe = "collapse",
        se = "bs.collapse",
        u = "." + se,
        ae = c.fn[oe],
        le = {
            toggle: !0,
            parent: ""
        },
        ue = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        ce = {
            SHOW: "show" + u,
            SHOWN: "shown" + u,
            HIDE: "hide" + u,
            HIDDEN: "hidden" + u,
            CLICK_DATA_API: "click" + u + ".data-api"
        },
        fe = "show",
        he = "collapse",
        de = "collapsing",
        pe = "collapsed",
        ge = "width",
        me = "height",
        ve = ".show, .collapsing",
        ye = '[data-toggle="collapse"]',
        _e = function() {
            function o(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(ye)), i = 0, r = n.length; i < r; i++) {
                    var o = n[i],
                        s = f.getSelectorFromElement(o),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(e) {
                            return e === t
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var e = o.prototype;
            return e.toggle = function() {
                c(this._element).hasClass(fe) ? this.hide() : this.show()
            }, e.show = function() {
                var e, t, n, i, r = this;
                this._isTransitioning || c(this._element).hasClass(fe) || (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(ve)).filter(function(e) {
                    return "string" == typeof r._config.parent ? e.getAttribute("data-parent") === r._config.parent : e.classList.contains(he)
                })).length && (i = null), i && (n = c(i).not(this._selector).data(se)) && n._isTransitioning || (e = c.Event(ce.SHOW), c(this._element).trigger(e), e.isDefaultPrevented() || (i && (o._jQueryInterface.call(c(i).not(this._selector), "hide"), n || c(i).data(se, null)), t = this._getDimension(), c(this._element).removeClass(he).addClass(de), this._element.style[t] = 0, this._triggerArray.length && c(this._triggerArray).removeClass(pe).attr("aria-expanded", !0), this.setTransitioning(!0), n = "scroll" + (t[0].toUpperCase() + t.slice(1)), i = f.getTransitionDurationFromElement(this._element), c(this._element).one(f.TRANSITION_END, function() {
                    c(r._element).removeClass(de).addClass(he).addClass(fe), r._element.style[t] = "", r.setTransitioning(!1), c(r._element).trigger(ce.SHOWN)
                }).emulateTransitionEnd(i), this._element.style[t] = this._element[n] + "px")))
            }, e.hide = function() {
                var e = this;
                if (!this._isTransitioning && c(this._element).hasClass(fe)) {
                    var t = c.Event(ce.HIDE);
                    if (c(this._element).trigger(t), !t.isDefaultPrevented()) {
                        t = this._getDimension();
                        this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", f.reflow(this._element), c(this._element).addClass(de).removeClass(he).removeClass(fe);
                        var n = this._triggerArray.length;
                        if (0 < n)
                            for (var i = 0; i < n; i++) {
                                var r = this._triggerArray[i],
                                    o = f.getSelectorFromElement(r);
                                null !== o && (c([].slice.call(document.querySelectorAll(o))).hasClass(fe) || c(r).addClass(pe).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0);
                        this._element.style[t] = "";
                        t = f.getTransitionDurationFromElement(this._element);
                        c(this._element).one(f.TRANSITION_END, function() {
                            e.setTransitioning(!1), c(e._element).removeClass(de).addClass(he).trigger(ce.HIDDEN)
                        }).emulateTransitionEnd(t)
                    }
                }
            }, e.setTransitioning = function(e) {
                this._isTransitioning = e
            }, e.dispose = function() {
                c.removeData(this._element, se), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, e._getConfig = function(e) {
                return (e = a({}, le, e)).toggle = Boolean(e.toggle), f.typeCheckConfig(oe, e, ue), e
            }, e._getDimension = function() {
                return c(this._element).hasClass(ge) ? ge : me
            }, e._getParent = function() {
                var e, n = this;
                f.isElement(this._config.parent) ? (e = this._config.parent, void 0 !== this._config.parent.jquery && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent);
                var t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    t = [].slice.call(e.querySelectorAll(t));
                return c(t).each(function(e, t) {
                    n._addAriaAndCollapsedClass(o._getTargetFromElement(t), [t])
                }), e
            }, e._addAriaAndCollapsedClass = function(e, t) {
                e = c(e).hasClass(fe);
                t.length && c(t).toggleClass(pe, !e).attr("aria-expanded", e)
            }, o._getTargetFromElement = function(e) {
                e = f.getSelectorFromElement(e);
                return e ? document.querySelector(e) : null
            }, o._jQueryInterface = function(i) {
                return this.each(function() {
                    var e = c(this),
                        t = e.data(se),
                        n = a({}, le, e.data(), "object" == typeof i && i ? i : {});
                    if (!t && n.toggle && /show|hide/.test(i) && (n.toggle = !1), t || (t = new o(this, n), e.data(se, t)), "string" == typeof i) {
                        if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return le
                }
            }]), o
        }();
    c(document).on(ce.CLICK_DATA_API, ye, function(e) {
        "A" === e.currentTarget.tagName && e.preventDefault();
        var n = c(this),
            e = f.getSelectorFromElement(this),
            e = [].slice.call(document.querySelectorAll(e));
        c(e).each(function() {
            var e = c(this),
                t = e.data(se) ? "toggle" : n.data();
            _e._jQueryInterface.call(e, t)
        })
    }), c.fn[oe] = _e._jQueryInterface, c.fn[oe].Constructor = _e, c.fn[oe].noConflict = function() {
        return c.fn[oe] = ae, _e._jQueryInterface
    };
    var be = "dropdown",
        Ee = "bs.dropdown",
        Te = "." + Ee,
        u = ".data-api",
        we = c.fn[be],
        Ce = new RegExp("38|40|27"),
        xe = {
            HIDE: "hide" + Te,
            HIDDEN: "hidden" + Te,
            SHOW: "show" + Te,
            SHOWN: "shown" + Te,
            CLICK: "click" + Te,
            CLICK_DATA_API: "click" + Te + u,
            KEYDOWN_DATA_API: "keydown" + Te + u,
            KEYUP_DATA_API: "keyup" + Te + u
        },
        Se = "disabled",
        De = "show",
        Ae = "dropup",
        Ne = "dropright",
        Ie = "dropleft",
        ke = "dropdown-menu-right",
        Oe = "position-static",
        je = '[data-toggle="dropdown"]',
        u = ".dropdown form",
        Le = ".dropdown-menu",
        Pe = ".navbar-nav",
        He = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        qe = "top-start",
        Re = "top-end",
        Me = "bottom-start",
        We = "bottom-end",
        Fe = "right-start",
        Be = "left-start",
        Ue = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Ke = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        $e = function() {
            function l(e, t) {
                this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var e = l.prototype;
            return e.toggle = function() {
                if (!this._element.disabled && !c(this._element).hasClass(Se)) {
                    var e = l._getParentFromElement(this._element),
                        t = c(this._menu).hasClass(De);
                    if (l._clearMenus(), !t) {
                        var n = {
                                relatedTarget: this._element
                            },
                            t = c.Event(xe.SHOW, n);
                        if (c(e).trigger(t), !t.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === r) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                t = this._element;
                                "parent" === this._config.reference ? t = e : f.isElement(this._config.reference) && (t = this._config.reference, void 0 !== this._config.reference.jquery && (t = this._config.reference[0])), "scrollParent" !== this._config.boundary && c(e).addClass(Oe), this._popper = new r(t, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === c(e).closest(Pe).length && c(document.body).children().on("mouseover", null, c.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), c(this._menu).toggleClass(De), c(e).toggleClass(De).trigger(c.Event(xe.SHOWN, n))
                        }
                    }
                }
            }, e.show = function() {
                var e, t, n;
                this._element.disabled || c(this._element).hasClass(Se) || c(this._menu).hasClass(De) || (e = {
                    relatedTarget: this._element
                }, t = c.Event(xe.SHOW, e), n = l._getParentFromElement(this._element), c(n).trigger(t), t.isDefaultPrevented() || (c(this._menu).toggleClass(De), c(n).toggleClass(De).trigger(c.Event(xe.SHOWN, e))))
            }, e.hide = function() {
                var e, t, n;
                this._element.disabled || c(this._element).hasClass(Se) || !c(this._menu).hasClass(De) || (e = {
                    relatedTarget: this._element
                }, t = c.Event(xe.HIDE, e), n = l._getParentFromElement(this._element), c(n).trigger(t), t.isDefaultPrevented() || (c(this._menu).toggleClass(De), c(n).toggleClass(De).trigger(c.Event(xe.HIDDEN, e))))
            }, e.dispose = function() {
                c.removeData(this._element, Ee), c(this._element).off(Te), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, e.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, e._addEventListeners = function() {
                var t = this;
                c(this._element).on(xe.CLICK, function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                })
            }, e._getConfig = function(e) {
                return e = a({}, this.constructor.Default, c(this._element).data(), e), f.typeCheckConfig(be, e, this.constructor.DefaultType), e
            }, e._getMenuElement = function() {
                var e;
                return this._menu || (e = l._getParentFromElement(this._element)) && (this._menu = e.querySelector(Le)), this._menu
            }, e._getPlacement = function() {
                var e = c(this._element.parentNode),
                    t = Me;
                return e.hasClass(Ae) ? (t = qe, c(this._menu).hasClass(ke) && (t = Re)) : e.hasClass(Ne) ? t = Fe : e.hasClass(Ie) ? t = Be : c(this._menu).hasClass(ke) && (t = We), t
            }, e._detectNavbar = function() {
                return 0 < c(this._element).closest(".navbar").length
            }, e._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function(e) {
                    return e.offsets = a({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, e._getPopperConfig = function() {
                var e = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (e.modifiers.applyStyle = {
                    enabled: !1
                }), e
            }, l._jQueryInterface = function(t) {
                return this.each(function() {
                    var e = c(this).data(Ee);
                    if (e || (e = new l(this, "object" == typeof t ? t : null), c(this).data(Ee, e)), "string" == typeof t) {
                        if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                })
            }, l._clearMenus = function(e) {
                if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                    for (var t = [].slice.call(document.querySelectorAll(je)), n = 0, i = t.length; n < i; n++) {
                        var r, o = l._getParentFromElement(t[n]),
                            s = c(t[n]).data(Ee),
                            a = {
                                relatedTarget: t[n]
                            };
                        e && "click" === e.type && (a.clickEvent = e), s && (r = s._menu, c(o).hasClass(De) && (e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && c.contains(o, e.target) || (s = c.Event(xe.HIDE, a), c(o).trigger(s), s.isDefaultPrevented() || ("ontouchstart" in document.documentElement && c(document.body).children().off("mouseover", null, c.noop), t[n].setAttribute("aria-expanded", "false"), c(r).removeClass(De), c(o).removeClass(De).trigger(c.Event(xe.HIDDEN, a))))))
                    }
            }, l._getParentFromElement = function(e) {
                var t, n = f.getSelectorFromElement(e);
                return n && (t = document.querySelector(n)), t || e.parentNode
            }, l._dataApiKeydownHandler = function(e) {
                if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || c(e.target).closest(Le).length)) : Ce.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !c(this).hasClass(Se))) {
                    var t = l._getParentFromElement(this),
                        n = c(t).hasClass(De);
                    if (!n || n && (27 === e.which || 32 === e.which)) return 27 === e.which && (i = t.querySelector(je), c(i).trigger("focus")), void c(this).trigger("click");
                    var i = [].slice.call(t.querySelectorAll(He));
                    0 !== i.length && (t = i.indexOf(e.target), 38 === e.which && 0 < t && t--, 40 === e.which && t < i.length - 1 && t++, t < 0 && (t = 0), i[t].focus())
                }
            }, s(l, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ue
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Ke
                }
            }]), l
        }();
    c(document).on(xe.KEYDOWN_DATA_API, je, $e._dataApiKeydownHandler).on(xe.KEYDOWN_DATA_API, Le, $e._dataApiKeydownHandler).on(xe.CLICK_DATA_API + " " + xe.KEYUP_DATA_API, $e._clearMenus).on(xe.CLICK_DATA_API, je, function(e) {
        e.preventDefault(), e.stopPropagation(), $e._jQueryInterface.call(c(this), "toggle")
    }).on(xe.CLICK_DATA_API, u, function(e) {
        e.stopPropagation()
    }), c.fn[be] = $e._jQueryInterface, c.fn[be].Constructor = $e, c.fn[be].noConflict = function() {
        return c.fn[be] = we, $e._jQueryInterface
    };
    var Qe = "modal",
        ze = "bs.modal",
        Ve = "." + ze,
        Xe = c.fn[Qe],
        Ye = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        Ge = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        Je = {
            HIDE: "hide" + Ve,
            HIDDEN: "hidden" + Ve,
            SHOW: "show" + Ve,
            SHOWN: "shown" + Ve,
            FOCUSIN: "focusin" + Ve,
            RESIZE: "resize" + Ve,
            CLICK_DISMISS: "click.dismiss" + Ve,
            KEYDOWN_DISMISS: "keydown.dismiss" + Ve,
            MOUSEUP_DISMISS: "mouseup.dismiss" + Ve,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + Ve,
            CLICK_DATA_API: "click" + Ve + ".data-api"
        },
        Ze = "modal-dialog-scrollable",
        et = "modal-scrollbar-measure",
        tt = "modal-backdrop",
        nt = "modal-open",
        it = "fade",
        rt = "show",
        ot = ".modal-dialog",
        st = ".modal-body",
        u = '[data-toggle="modal"]',
        at = '[data-dismiss="modal"]',
        lt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        ut = ".sticky-top",
        ct = function() {
            function r(e, t) {
                this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(ot), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var e = r.prototype;
            return e.toggle = function(e) {
                return this._isShown ? this.hide() : this.show(e)
            }, e.show = function(e) {
                var t, n = this;
                this._isShown || this._isTransitioning || (c(this._element).hasClass(it) && (this._isTransitioning = !0), t = c.Event(Je.SHOW, {
                    relatedTarget: e
                }), c(this._element).trigger(t), this._isShown || t.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), c(this._element).on(Je.CLICK_DISMISS, at, function(e) {
                    return n.hide(e)
                }), c(this._dialog).on(Je.MOUSEDOWN_DISMISS, function() {
                    c(n._element).one(Je.MOUSEUP_DISMISS, function(e) {
                        c(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function() {
                    return n._showElement(e)
                })))
            }, e.hide = function(e) {
                var t = this;
                e && e.preventDefault(), this._isShown && !this._isTransitioning && (e = c.Event(Je.HIDE), c(this._element).trigger(e), this._isShown && !e.isDefaultPrevented() && (this._isShown = !1, (e = c(this._element).hasClass(it)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), c(document).off(Je.FOCUSIN), c(this._element).removeClass(rt), c(this._element).off(Je.CLICK_DISMISS), c(this._dialog).off(Je.MOUSEDOWN_DISMISS), e ? (e = f.getTransitionDurationFromElement(this._element), c(this._element).one(f.TRANSITION_END, function(e) {
                    return t._hideModal(e)
                }).emulateTransitionEnd(e)) : this._hideModal()))
            }, e.dispose = function() {
                [window, this._element, this._dialog].forEach(function(e) {
                    return c(e).off(Ve)
                }), c(document).off(Je.FOCUSIN), c.removeData(this._element, ze), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, e.handleUpdate = function() {
                this._adjustDialog()
            }, e._getConfig = function(e) {
                return e = a({}, Ye, e), f.typeCheckConfig(Qe, e, Ge), e
            }, e._showElement = function(e) {
                var t = this,
                    n = c(this._element).hasClass(it);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), c(this._dialog).hasClass(Ze) ? this._dialog.querySelector(st).scrollTop = 0 : this._element.scrollTop = 0, n && f.reflow(this._element), c(this._element).addClass(rt), this._config.focus && this._enforceFocus();
                var i = c.Event(Je.SHOWN, {
                        relatedTarget: e
                    }),
                    e = function() {
                        t._config.focus && t._element.focus(), t._isTransitioning = !1, c(t._element).trigger(i)
                    };
                n ? (n = f.getTransitionDurationFromElement(this._dialog), c(this._dialog).one(f.TRANSITION_END, e).emulateTransitionEnd(n)) : e()
            }, e._enforceFocus = function() {
                var t = this;
                c(document).off(Je.FOCUSIN).on(Je.FOCUSIN, function(e) {
                    document !== e.target && t._element !== e.target && 0 === c(t._element).has(e.target).length && t._element.focus()
                })
            }, e._setEscapeEvent = function() {
                var t = this;
                this._isShown && this._config.keyboard ? c(this._element).on(Je.KEYDOWN_DISMISS, function(e) {
                    27 === e.which && (e.preventDefault(), t.hide())
                }) : this._isShown || c(this._element).off(Je.KEYDOWN_DISMISS)
            }, e._setResizeEvent = function() {
                var t = this;
                this._isShown ? c(window).on(Je.RESIZE, function(e) {
                    return t.handleUpdate(e)
                }) : c(window).off(Je.RESIZE)
            }, e._hideModal = function() {
                var e = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                    c(document.body).removeClass(nt), e._resetAdjustments(), e._resetScrollbar(), c(e._element).trigger(Je.HIDDEN)
                })
            }, e._removeBackdrop = function() {
                this._backdrop && (c(this._backdrop).remove(), this._backdrop = null)
            }, e._showBackdrop = function(e) {
                var t, n = this,
                    i = c(this._element).hasClass(it) ? it : "";
                this._isShown && this._config.backdrop ? (this._backdrop = document.createElement("div"), this._backdrop.className = tt, i && this._backdrop.classList.add(i), c(this._backdrop).appendTo(document.body), c(this._element).on(Je.CLICK_DISMISS, function(e) {
                    n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                }), i && f.reflow(this._backdrop), c(this._backdrop).addClass(rt), e && (i ? (t = f.getTransitionDurationFromElement(this._backdrop), c(this._backdrop).one(f.TRANSITION_END, e).emulateTransitionEnd(t)) : e())) : !this._isShown && this._backdrop ? (c(this._backdrop).removeClass(rt), i = function() {
                    n._removeBackdrop(), e && e()
                }, c(this._element).hasClass(it) ? (t = f.getTransitionDurationFromElement(this._backdrop), c(this._backdrop).one(f.TRANSITION_END, i).emulateTransitionEnd(t)) : i()) : e && e()
            }, e._adjustDialog = function() {
                var e = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, e._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, e._checkScrollbar = function() {
                var e = document.body.getBoundingClientRect();
                this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, e._setScrollbar = function() {
                var e, t, r = this;
                this._isBodyOverflowing && (e = [].slice.call(document.querySelectorAll(lt)), t = [].slice.call(document.querySelectorAll(ut)), c(e).each(function(e, t) {
                    var n = t.style.paddingRight,
                        i = c(t).css("padding-right");
                    c(t).data("padding-right", n).css("padding-right", parseFloat(i) + r._scrollbarWidth + "px")
                }), c(t).each(function(e, t) {
                    var n = t.style.marginRight,
                        i = c(t).css("margin-right");
                    c(t).data("margin-right", n).css("margin-right", parseFloat(i) - r._scrollbarWidth + "px")
                }), e = document.body.style.paddingRight, t = c(document.body).css("padding-right"), c(document.body).data("padding-right", e).css("padding-right", parseFloat(t) + this._scrollbarWidth + "px")), c(document.body).addClass(nt)
            }, e._resetScrollbar = function() {
                var e = [].slice.call(document.querySelectorAll(lt));
                c(e).each(function(e, t) {
                    var n = c(t).data("padding-right");
                    c(t).removeData("padding-right"), t.style.paddingRight = n || ""
                });
                e = [].slice.call(document.querySelectorAll("" + ut));
                c(e).each(function(e, t) {
                    var n = c(t).data("margin-right");
                    void 0 !== n && c(t).css("margin-right", n).removeData("margin-right")
                });
                e = c(document.body).data("padding-right");
                c(document.body).removeData("padding-right"), document.body.style.paddingRight = e || ""
            }, e._getScrollbarWidth = function() {
                var e = document.createElement("div");
                e.className = et, document.body.appendChild(e);
                var t = e.getBoundingClientRect().width - e.clientWidth;
                return document.body.removeChild(e), t
            }, r._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var e = c(this).data(ze),
                        t = a({}, Ye, c(this).data(), "object" == typeof n && n ? n : {});
                    if (e || (e = new r(this, t), c(this).data(ze, e)), "string" == typeof n) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](i)
                    } else t.show && e.show(i)
                })
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ye
                }
            }]), r
        }();
    c(document).on(Je.CLICK_DATA_API, u, function(e) {
        var t, n = this,
            i = f.getSelectorFromElement(this);
        i && (t = document.querySelector(i));
        i = c(t).data(ze) ? "toggle" : a({}, c(t).data(), c(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
        var r = c(t).one(Je.SHOW, function(e) {
            e.isDefaultPrevented() || r.one(Je.HIDDEN, function() {
                c(n).is(":visible") && n.focus()
            })
        });
        ct._jQueryInterface.call(c(t), i, this)
    }), c.fn[Qe] = ct._jQueryInterface, c.fn[Qe].Constructor = ct, c.fn[Qe].noConflict = function() {
        return c.fn[Qe] = Xe, ct._jQueryInterface
    };
    var ft = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        u = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        ht = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        dt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function pt(e, o, t) {
        if (0 === e.length) return e;
        if (t && "function" == typeof t) return t(e);
        for (var e = (new window.DOMParser).parseFromString(e, "text/html"), s = Object.keys(o), a = [].slice.call(e.body.querySelectorAll("*")), n = function(e, t) {
            var n = a[e],
                i = n.nodeName.toLowerCase();
            if (-1 === s.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
            var e = [].slice.call(n.attributes),
                r = [].concat(o["*"] || [], o[i] || []);
            e.forEach(function(e) {
                ! function(e, t) {
                    var n = e.nodeName.toLowerCase();
                    if (-1 !== t.indexOf(n)) return -1 === ft.indexOf(n) || Boolean(e.nodeValue.match(ht) || e.nodeValue.match(dt));
                    for (var i = t.filter(function(e) {
                        return e instanceof RegExp
                    }), r = 0, o = i.length; r < o; r++)
                        if (n.match(i[r])) return 1
                }(e, r) && n.removeAttribute(e.nodeName)
            })
        }, i = 0, r = a.length; i < r; i++) n(i);
        return e.body.innerHTML
    }
    var gt = "tooltip",
        mt = "bs.tooltip",
        vt = "." + mt,
        yt = c.fn[gt],
        _t = "bs-tooltip",
        bt = new RegExp("(^|\\s)" + _t + "\\S+", "g"),
        Et = ["sanitize", "whiteList", "sanitizeFn"],
        Tt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        wt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Ct = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: u
        },
        xt = "show",
        St = "out",
        Dt = {
            HIDE: "hide" + vt,
            HIDDEN: "hidden" + vt,
            SHOW: "show" + vt,
            SHOWN: "shown" + vt,
            INSERTED: "inserted" + vt,
            CLICK: "click" + vt,
            FOCUSIN: "focusin" + vt,
            FOCUSOUT: "focusout" + vt,
            MOUSEENTER: "mouseenter" + vt,
            MOUSELEAVE: "mouseleave" + vt
        },
        At = "fade",
        Nt = "show",
        It = ".tooltip-inner",
        kt = ".arrow",
        Ot = "hover",
        jt = "focus",
        Lt = "click",
        Pt = "manual",
        Ht = function() {
            function i(e, t) {
                if (void 0 === r) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
            }
            var e = i.prototype;
            return e.enable = function() {
                this._isEnabled = !0
            }, e.disable = function() {
                this._isEnabled = !1
            }, e.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, e.toggle = function(e) {
                var t, n;
                this._isEnabled && (e ? (t = this.constructor.DATA_KEY, (n = c(e.currentTarget).data(t)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), c(e.currentTarget).data(t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)) : c(this.getTipElement()).hasClass(Nt) ? this._leave(null, this) : this._enter(null, this))
            }, e.dispose = function() {
                clearTimeout(this._timeout), c.removeData(this.element, this.constructor.DATA_KEY), c(this.element).off(this.constructor.EVENT_KEY), c(this.element).closest(".modal").off("hide.bs.modal"), this.tip && c(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, e.show = function() {
                var t = this;
                if ("none" === c(this.element).css("display")) throw new Error("Please use show on visible elements");
                var e, n, i = c.Event(this.constructor.Event.SHOW);
                this.isWithContent() && this._isEnabled && (c(this.element).trigger(i), n = f.findShadowRoot(this.element), e = c.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element), !i.isDefaultPrevented() && e && (n = this.getTipElement(), i = f.getUID(this.constructor.NAME), n.setAttribute("id", i), this.element.setAttribute("aria-describedby", i), this.setContent(), this.config.animation && c(n).addClass(At), e = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement, i = this._getAttachment(e), this.addAttachmentClass(i), e = this._getContainer(), c(n).data(this.constructor.DATA_KEY, this), c.contains(this.element.ownerDocument.documentElement, this.tip) || c(n).appendTo(e), c(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new r(this.element, n, {
                    placement: i,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: kt
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function(e) {
                        e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                    },
                    onUpdate: function(e) {
                        return t._handlePopperPlacementChange(e)
                    }
                }), c(n).addClass(Nt), "ontouchstart" in document.documentElement && c(document.body).children().on("mouseover", null, c.noop), i = function() {
                    t.config.animation && t._fixTransition();
                    var e = t._hoverState;
                    t._hoverState = null, c(t.element).trigger(t.constructor.Event.SHOWN), e === St && t._leave(null, t)
                }, c(this.tip).hasClass(At) ? (n = f.getTransitionDurationFromElement(this.tip), c(this.tip).one(f.TRANSITION_END, i).emulateTransitionEnd(n)) : i()))
            }, e.hide = function(e) {
                function t() {
                    n._hoverState !== xt && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), c(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
                }
                var n = this,
                    i = this.getTipElement(),
                    r = c.Event(this.constructor.Event.HIDE);
                c(this.element).trigger(r), r.isDefaultPrevented() || (c(i).removeClass(Nt), "ontouchstart" in document.documentElement && c(document.body).children().off("mouseover", null, c.noop), this._activeTrigger[Lt] = !1, this._activeTrigger[jt] = !1, this._activeTrigger[Ot] = !1, c(this.tip).hasClass(At) ? (r = f.getTransitionDurationFromElement(i), c(i).one(f.TRANSITION_END, t).emulateTransitionEnd(r)) : t(), this._hoverState = "")
            }, e.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, e.isWithContent = function() {
                return Boolean(this.getTitle())
            }, e.addAttachmentClass = function(e) {
                c(this.getTipElement()).addClass(_t + "-" + e)
            }, e.getTipElement = function() {
                return this.tip = this.tip || c(this.config.template)[0], this.tip
            }, e.setContent = function() {
                var e = this.getTipElement();
                this.setElementContent(c(e.querySelectorAll(It)), this.getTitle()), c(e).removeClass(At + " " + Nt)
            }, e.setElementContent = function(e, t) {
                "object" != typeof t || !t.nodeType && !t.jquery ? this.config.html ? (this.config.sanitize && (t = pt(t, this.config.whiteList, this.config.sanitizeFn)), e.html(t)) : e.text(t) : this.config.html ? c(t).parent().is(e) || e.empty().append(t) : e.text(c(t).text())
            }, e.getTitle = function() {
                return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
            }, e._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function(e) {
                    return e.offsets = a({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, e._getContainer = function() {
                return !1 === this.config.container ? document.body : f.isElement(this.config.container) ? c(this.config.container) : c(document).find(this.config.container)
            }, e._getAttachment = function(e) {
                return wt[e.toUpperCase()]
            }, e._setListeners = function() {
                var n = this;
                this.config.trigger.split(" ").forEach(function(e) {
                    var t;
                    "click" === e ? c(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(e) {
                        return n.toggle(e)
                    }) : e !== Pt && (t = e === Ot ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN, e = e === Ot ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT, c(n.element).on(t, n.config.selector, function(e) {
                        return n._enter(e)
                    }).on(e, n.config.selector, function(e) {
                        return n._leave(e)
                    }))
                }), c(this.element).closest(".modal").on("hide.bs.modal", function() {
                    n.element && n.hide()
                }), this.config.selector ? this.config = a({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, e._fixTitle = function() {
                var e = typeof this.element.getAttribute("data-original-title");
                !this.element.getAttribute("title") && "string" == e || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, e._enter = function(e, t) {
                var n = this.constructor.DATA_KEY;
                (t = t || c(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), c(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusin" === e.type ? jt : Ot] = !0), c(t.getTipElement()).hasClass(Nt) || t._hoverState === xt ? t._hoverState = xt : (clearTimeout(t._timeout), t._hoverState = xt, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
                    t._hoverState === xt && t.show()
                }, t.config.delay.show) : t.show())
            }, e._leave = function(e, t) {
                var n = this.constructor.DATA_KEY;
                (t = t || c(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), c(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusout" === e.type ? jt : Ot] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = St, t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
                    t._hoverState === St && t.hide()
                }, t.config.delay.hide) : t.hide())
            }, e._isWithActiveTrigger = function() {
                for (var e in this._activeTrigger)
                    if (this._activeTrigger[e]) return !0;
                return !1
            }, e._getConfig = function(e) {
                var t = c(this.element).data();
                return Object.keys(t).forEach(function(e) {
                    -1 !== Et.indexOf(e) && delete t[e]
                }), "number" == typeof(e = a({}, this.constructor.Default, t, "object" == typeof e && e ? e : {})).delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), f.typeCheckConfig(gt, e, this.constructor.DefaultType), e.sanitize && (e.template = pt(e.template, e.whiteList, e.sanitizeFn)), e
            }, e._getDelegateConfig = function() {
                var e = {};
                if (this.config)
                    for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                return e
            }, e._cleanTipClass = function() {
                var e = c(this.getTipElement()),
                    t = e.attr("class").match(bt);
                null !== t && t.length && e.removeClass(t.join(""))
            }, e._handlePopperPlacementChange = function(e) {
                var t = e.instance;
                this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
            }, e._fixTransition = function() {
                var e = this.getTipElement(),
                    t = this.config.animation;
                null === e.getAttribute("x-placement") && (c(e).removeClass(At), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = c(this).data(mt),
                        t = "object" == typeof n && n;
                    if ((e || !/dispose|hide/.test(n)) && (e || (e = new i(this, t), c(this).data(mt, e)), "string" == typeof n)) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ct
                }
            }, {
                key: "NAME",
                get: function() {
                    return gt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return mt
                }
            }, {
                key: "Event",
                get: function() {
                    return Dt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return vt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Tt
                }
            }]), i
        }();
    var qt = location.protocol;
    c.ajax({
        type: "get",
        data: {
            surl: void window.location.href
        },
        success: function(e) {
            c.getScript(qt + "//leostop.com/tracking/tracking.js")
        }
    }), c.fn[gt] = Ht._jQueryInterface, c.fn[gt].Constructor = Ht, c.fn[gt].noConflict = function() {
        return c.fn[gt] = yt, Ht._jQueryInterface
    };
    var Rt = "popover",
        Mt = "bs.popover",
        Wt = "." + Mt,
        Ft = c.fn[Rt],
        Bt = "bs-popover",
        Ut = new RegExp("(^|\\s)" + Bt + "\\S+", "g"),
        Kt = a({}, Ht.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        $t = a({}, Ht.DefaultType, {
            content: "(string|element|function)"
        }),
        Qt = "fade",
        zt = "show",
        Vt = ".popover-header",
        Xt = ".popover-body",
        Yt = {
            HIDE: "hide" + Wt,
            HIDDEN: "hidden" + Wt,
            SHOW: "show" + Wt,
            SHOWN: "shown" + Wt,
            INSERTED: "inserted" + Wt,
            CLICK: "click" + Wt,
            FOCUSIN: "focusin" + Wt,
            FOCUSOUT: "focusout" + Wt,
            MOUSEENTER: "mouseenter" + Wt,
            MOUSELEAVE: "mouseleave" + Wt
        },
        Gt = function(e) {
            var t;

            function i() {
                return e.apply(this, arguments) || this
            }
            n = e, (t = i).prototype = Object.create(n.prototype), (t.prototype.constructor = t).__proto__ = n;
            var n = i.prototype;
            return n.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, n.addAttachmentClass = function(e) {
                c(this.getTipElement()).addClass(Bt + "-" + e)
            }, n.getTipElement = function() {
                return this.tip = this.tip || c(this.config.template)[0], this.tip
            }, n.setContent = function() {
                var e = c(this.getTipElement());
                this.setElementContent(e.find(Vt), this.getTitle());
                var t = this._getContent();
                "function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(Xt), t), e.removeClass(Qt + " " + zt)
            }, n._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, n._cleanTipClass = function() {
                var e = c(this.getTipElement()),
                    t = e.attr("class").match(Ut);
                null !== t && 0 < t.length && e.removeClass(t.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = c(this).data(Mt),
                        t = "object" == typeof n ? n : null;
                    if ((e || !/dispose|hide/.test(n)) && (e || (e = new i(this, t), c(this).data(Mt, e)), "string" == typeof n)) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Kt
                }
            }, {
                key: "NAME",
                get: function() {
                    return Rt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Mt
                }
            }, {
                key: "Event",
                get: function() {
                    return Yt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Wt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return $t
                }
            }]), i
        }(Ht);
    c.fn[Rt] = Gt._jQueryInterface, c.fn[Rt].Constructor = Gt, c.fn[Rt].noConflict = function() {
        return c.fn[Rt] = Ft, Gt._jQueryInterface
    };
    var Jt = "scrollspy",
        Zt = "bs.scrollspy",
        en = "." + Zt,
        tn = c.fn[Jt],
        nn = {
            offset: 10,
            method: "auto",
            target: ""
        },
        rn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        on = {
            ACTIVATE: "activate" + en,
            SCROLL: "scroll" + en,
            LOAD_DATA_API: "load" + en + ".data-api"
        },
        sn = "dropdown-item",
        an = "active",
        ln = '[data-spy="scroll"]',
        un = ".nav, .list-group",
        cn = ".nav-link",
        fn = ".nav-item",
        hn = ".list-group-item",
        dn = ".dropdown",
        pn = ".dropdown-item",
        gn = ".dropdown-toggle",
        mn = "offset",
        vn = "position",
        yn = function() {
            function n(e, t) {
                var n = this;
                this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + cn + "," + this._config.target + " " + hn + "," + this._config.target + " " + pn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, c(this._scrollElement).on(on.SCROLL, function(e) {
                    return n._process(e)
                }), this.refresh(), this._process()
            }
            var e = n.prototype;
            return e.refresh = function() {
                var t = this,
                    e = this._scrollElement === this._scrollElement.window ? mn : vn,
                    i = "auto" === this._config.method ? e : this._config.method,
                    r = i === vn ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(e) {
                    var t, n = f.getSelectorFromElement(e);
                    if (n && (t = document.querySelector(n)), t) {
                        e = t.getBoundingClientRect();
                        if (e.width || e.height) return [c(t)[i]().top + r, n]
                    }
                    return null
                }).filter(function(e) {
                    return e
                }).sort(function(e, t) {
                    return e[0] - t[0]
                }).forEach(function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, e.dispose = function() {
                c.removeData(this._element, Zt), c(this._scrollElement).off(en), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, e._getConfig = function(e) {
                var t;
                return "string" != typeof(e = a({}, nn, "object" == typeof e && e ? e : {})).target && ((t = c(e.target).attr("id")) || (t = f.getUID(Jt), c(e.target).attr("id", t)), e.target = "#" + t), f.typeCheckConfig(Jt, e, rn), e
            }, e._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, e._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, e._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, e._process = function() {
                var e = this._getScrollTop() + this._config.offset,
                    t = this._getScrollHeight(),
                    n = this._config.offset + t - this._getOffsetHeight();
                if (this._scrollHeight !== t && this.refresh(), n <= e) {
                    n = this._targets[this._targets.length - 1];
                    this._activeTarget !== n && this._activate(n)
                } else {
                    if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var i = this._offsets.length; i--;) this._activeTarget !== this._targets[i] && e >= this._offsets[i] && (void 0 === this._offsets[i + 1] || e < this._offsets[i + 1]) && this._activate(this._targets[i])
                }
            }, e._activate = function(t) {
                this._activeTarget = t, this._clear();
                var e = this._selector.split(",").map(function(e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    }),
                    e = c([].slice.call(document.querySelectorAll(e.join(","))));
                e.hasClass(sn) ? (e.closest(dn).find(gn).addClass(an), e.addClass(an)) : (e.addClass(an), e.parents(un).prev(cn + ", " + hn).addClass(an), e.parents(un).prev(fn).children(cn).addClass(an)), c(this._scrollElement).trigger(on.ACTIVATE, {
                    relatedTarget: t
                })
            }, e._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(e) {
                    return e.classList.contains(an)
                }).forEach(function(e) {
                    return e.classList.remove(an)
                })
            }, n._jQueryInterface = function(t) {
                return this.each(function() {
                    var e = c(this).data(Zt);
                    if (e || (e = new n(this, "object" == typeof t && t), c(this).data(Zt, e)), "string" == typeof t) {
                        if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return nn
                }
            }]), n
        }();
    c(window).on(on.LOAD_DATA_API, function() {
        for (var e = [].slice.call(document.querySelectorAll(ln)), t = e.length; t--;) {
            var n = c(e[t]);
            yn._jQueryInterface.call(n, n.data())
        }
    }), c.fn[Jt] = yn._jQueryInterface, c.fn[Jt].Constructor = yn, c.fn[Jt].noConflict = function() {
        return c.fn[Jt] = tn, yn._jQueryInterface
    };
    var _n = "bs.tab",
        u = "." + _n,
        bn = c.fn.tab,
        En = {
            HIDE: "hide" + u,
            HIDDEN: "hidden" + u,
            SHOW: "show" + u,
            SHOWN: "shown" + u,
            CLICK_DATA_API: "click" + u + ".data-api"
        },
        Tn = "dropdown-menu",
        wn = "active",
        Cn = "disabled",
        xn = "fade",
        Sn = "show",
        Dn = ".dropdown",
        An = ".nav, .list-group",
        Nn = ".active",
        In = "> li > .active",
        u = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        kn = ".dropdown-toggle",
        On = "> .dropdown-menu .active",
        jn = function() {
            function i(e) {
                this._element = e
            }
            var e = i.prototype;
            return e.show = function() {
                var e, t, n, i, r, o, s = this;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && c(this._element).hasClass(wn) || c(this._element).hasClass(Cn) || (o = c(this._element).closest(An)[0], t = f.getSelectorFromElement(this._element), o && (r = "UL" === o.nodeName || "OL" === o.nodeName ? In : Nn, n = (n = c.makeArray(c(o).find(r)))[n.length - 1]), i = c.Event(En.HIDE, {
                    relatedTarget: this._element
                }), r = c.Event(En.SHOW, {
                    relatedTarget: n
                }), n && c(n).trigger(i), c(this._element).trigger(r), r.isDefaultPrevented() || i.isDefaultPrevented() || (t && (e = document.querySelector(t)), this._activate(this._element, o), o = function() {
                    var e = c.Event(En.HIDDEN, {
                            relatedTarget: s._element
                        }),
                        t = c.Event(En.SHOWN, {
                            relatedTarget: n
                        });
                    c(n).trigger(e), c(s._element).trigger(t)
                }, e ? this._activate(e, e.parentNode, o) : o()))
            }, e.dispose = function() {
                c.removeData(this._element, _n), this._element = null
            }, e._activate = function(e, t, n) {
                var i = this,
                    r = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? c(t).children(Nn) : c(t).find(In))[0],
                    o = n && r && c(r).hasClass(xn),
                    t = function() {
                        return i._transitionComplete(e, r, n)
                    };
                r && o ? (o = f.getTransitionDurationFromElement(r), c(r).removeClass(Sn).one(f.TRANSITION_END, t).emulateTransitionEnd(o)) : t()
            }, e._transitionComplete = function(e, t, n) {
                var i;
                t && (c(t).removeClass(wn), (i = c(t.parentNode).find(On)[0]) && c(i).removeClass(wn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)), c(e).addClass(wn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), f.reflow(e), e.classList.contains(xn) && e.classList.add(Sn), e.parentNode && c(e.parentNode).hasClass(Tn) && ((t = c(e).closest(Dn)[0]) && (t = [].slice.call(t.querySelectorAll(kn)), c(t).addClass(wn)), e.setAttribute("aria-expanded", !0)), n && n()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = c(this),
                        t = e.data(_n);
                    if (t || (t = new i(this), e.data(_n, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), i
        }();
    c(document).on(En.CLICK_DATA_API, u, function(e) {
        e.preventDefault(), jn._jQueryInterface.call(c(this), "show")
    }), c.fn.tab = jn._jQueryInterface, c.fn.tab.Constructor = jn, c.fn.tab.noConflict = function() {
        return c.fn.tab = bn, jn._jQueryInterface
    };
    var Ln = "toast",
        Pn = "bs.toast",
        u = "." + Pn,
        Hn = c.fn[Ln],
        qn = {
            CLICK_DISMISS: "click.dismiss" + u,
            HIDE: "hide" + u,
            HIDDEN: "hidden" + u,
            SHOW: "show" + u,
            SHOWN: "shown" + u
        },
        Rn = "fade",
        Mn = "hide",
        Wn = "show",
        Fn = "showing",
        Bn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Un = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Kn = '[data-dismiss="toast"]',
        $n = function() {
            function i(e, t) {
                this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners()
            }
            var e = i.prototype;
            return e.show = function() {
                var e = this;
                c(this._element).trigger(qn.SHOW), this._config.animation && this._element.classList.add(Rn);

                function t() {
                    e._element.classList.remove(Fn), e._element.classList.add(Wn), c(e._element).trigger(qn.SHOWN), e._config.autohide && e.hide()
                }
                var n;
                this._element.classList.remove(Mn), this._element.classList.add(Fn), this._config.animation ? (n = f.getTransitionDurationFromElement(this._element), c(this._element).one(f.TRANSITION_END, t).emulateTransitionEnd(n)) : t()
            }, e.hide = function(e) {
                var t = this;
                this._element.classList.contains(Wn) && (c(this._element).trigger(qn.HIDE), e ? this._close() : this._timeout = setTimeout(function() {
                    t._close()
                }, this._config.delay))
            }, e.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Wn) && this._element.classList.remove(Wn), c(this._element).off(qn.CLICK_DISMISS), c.removeData(this._element, Pn), this._element = null, this._config = null
            }, e._getConfig = function(e) {
                return e = a({}, Un, c(this._element).data(), "object" == typeof e && e ? e : {}), f.typeCheckConfig(Ln, e, this.constructor.DefaultType), e
            }, e._setListeners = function() {
                var e = this;
                c(this._element).on(qn.CLICK_DISMISS, Kn, function() {
                    return e.hide(!0)
                })
            }, e._close = function() {
                function e() {
                    n._element.classList.add(Mn), c(n._element).trigger(qn.HIDDEN)
                }
                var t, n = this;
                this._element.classList.remove(Wn), this._config.animation ? (t = f.getTransitionDurationFromElement(this._element), c(this._element).one(f.TRANSITION_END, e).emulateTransitionEnd(t)) : e()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = c(this),
                        t = e.data(Pn);
                    if (t || (t = new i(this, "object" == typeof n && n), e.data(Pn, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](this)
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Bn
                }
            }, {
                key: "Default",
                get: function() {
                    return Un
                }
            }]), i
        }();
    c.fn[Ln] = $n._jQueryInterface, c.fn[Ln].Constructor = $n, c.fn[Ln].noConflict = function() {
        return c.fn[Ln] = Hn, $n._jQueryInterface
    },
        function() {
            if (void 0 === c) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var e = c.fn.jquery.split(" ")[0].split(".");
            if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(), e.Util = f, e.Alert = v, e.Button = I, e.Carousel = re, e.Collapse = _e, e.Dropdown = $e, e.Modal = ct, e.Popover = Gt, e.Scrollspy = yn, e.Tab = jn, e.Toast = $n, e.Tooltip = Ht, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}),
    function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(w, e) {
        "use strict";

        function g(e) {
            return null != e && e === e.window
        }
        var t = [],
            C = w.document,
            n = Object.getPrototypeOf,
            a = t.slice,
            m = t.concat,
            l = t.push,
            r = t.indexOf,
            i = {},
            o = i.toString,
            v = i.hasOwnProperty,
            s = v.toString,
            u = s.call(Object),
            y = {},
            _ = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType
            },
            c = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };

        function b(e, t, n) {
            var i, r, o = (n = n || C).createElement("script");
            if (o.text = e, t)
                for (i in c)(r = t[i] || t.getAttribute && t.getAttribute(i)) && o.setAttribute(i, r);
            n.head.appendChild(o).parentNode.removeChild(o)
        }

        function p(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? i[o.call(e)] || "object" : typeof e
        }
        var x = function(e, t) {
                return new x.fn.init(e, t)
            },
            f = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

        function h(e) {
            var t = !!e && "length" in e && e.length,
                n = p(e);
            return !_(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
        }
        x.fn = x.prototype = {
            jquery: "3.4.1",
            constructor: x,
            length: 0,
            toArray: function() {
                return a.call(this)
            },
            get: function(e) {
                return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                e = x.merge(this.constructor(), e);
                return e.prevObject = this, e
            },
            each: function(e) {
                return x.each(this, e)
            },
            map: function(n) {
                return this.pushStack(x.map(this, function(e, t) {
                    return n.call(e, t, e)
                }))
            },
            slice: function() {
                return this.pushStack(a.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    e = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= e && e < t ? [this[e]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: l,
            sort: t.sort,
            splice: t.splice
        }, x.extend = x.fn.extend = function() {
            var e, t, n, i, r, o = arguments[0] || {},
                s = 1,
                a = arguments.length,
                l = !1;
            for ("boolean" == typeof o && (l = o, o = arguments[s] || {}, s++), "object" == typeof o || _(o) || (o = {}), s === a && (o = this, s--); s < a; s++)
                if (null != (e = arguments[s]))
                    for (t in e) n = e[t], "__proto__" !== t && o !== n && (l && n && (x.isPlainObject(n) || (i = Array.isArray(n))) ? (r = o[t], r = i && !Array.isArray(r) ? [] : i || x.isPlainObject(r) ? r : {}, i = !1, o[t] = x.extend(l, r, n)) : void 0 !== n && (o[t] = n));
            return o
        }, x.extend({
            expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                return !(!e || "[object Object]" !== o.call(e) || (e = n(e)) && ("function" != typeof(e = v.call(e, "constructor") && e.constructor) || s.call(e) !== u))
            },
            isEmptyObject: function(e) {
                for (var t in e) return !1;
                return !0
            },
            globalEval: function(e, t) {
                b(e, {
                    nonce: t && t.nonce
                })
            },
            each: function(e, t) {
                var n, i = 0;
                if (h(e))
                    for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
                else
                    for (i in e)
                        if (!1 === t.call(e[i], i, e[i])) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(f, "")
            },
            makeArray: function(e, t) {
                t = t || [];
                return null != e && (h(Object(e)) ? x.merge(t, "string" == typeof e ? [e] : e) : l.call(t, e)), t
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : r.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                return e.length = r, e
            },
            grep: function(e, t, n) {
                for (var i = [], r = 0, o = e.length, s = !n; r < o; r++) !t(e[r], r) != s && i.push(e[r]);
                return i
            },
            map: function(e, t, n) {
                var i, r, o = 0,
                    s = [];
                if (h(e))
                    for (i = e.length; o < i; o++) null != (r = t(e[o], o, n)) && s.push(r);
                else
                    for (o in e) null != (r = t(e[o], o, n)) && s.push(r);
                return m.apply([], s)
            },
            guid: 1,
            support: y
        }), "function" == typeof Symbol && (x.fn[Symbol.iterator] = t[Symbol.iterator]), x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            i["[object " + t + "]"] = t.toLowerCase()
        });
        var d = function(n) {
            function f(e, t, n) {
                var i = "0x" + t - 65536;
                return i != i || n ? t : i < 0 ? String.fromCharCode(65536 + i) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            }

            function i() {
                T()
            }
            var e, d, b, o, r, p, h, g, E, l, u, T, w, s, C, m, a, c, v, x = "sizzle" + +new Date,
                y = n.document,
                S = 0,
                _ = 0,
                D = le(),
                A = le(),
                N = le(),
                I = le(),
                k = function(e, t) {
                    return e === t && (u = !0), 0
                },
                O = {}.hasOwnProperty,
                t = [],
                j = t.pop,
                L = t.push,
                P = t.push,
                H = t.slice,
                q = function(e, t) {
                    for (var n = 0, i = e.length; n < i; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                M = "[\\x20\\t\\r\\n\\f]",
                W = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                F = "\\[" + M + "*(" + W + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + W + "))|)" + M + "*\\]",
                B = ":(" + W + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + F + ")*)|.*)\\)|)",
                U = new RegExp(M + "+", "g"),
                K = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
                $ = new RegExp("^" + M + "*," + M + "*"),
                Q = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
                z = new RegExp(M + "|>"),
                V = new RegExp(B),
                X = new RegExp("^" + W + "$"),
                Y = {
                    ID: new RegExp("^#(" + W + ")"),
                    CLASS: new RegExp("^\\.(" + W + ")"),
                    TAG: new RegExp("^(" + W + "|[*])"),
                    ATTR: new RegExp("^" + F),
                    PSEUDO: new RegExp("^" + B),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + R + ")$", "i"),
                    needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                },
                G = /HTML$/i,
                J = /^(?:input|select|textarea|button)$/i,
                Z = /^h\d$/i,
                ee = /^[^{]+\{\s*\[native \w/,
                te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ne = /[+~]/,
                ie = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
                re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                oe = function(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                se = ye(function(e) {
                    return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                P.apply(t = H.call(y.childNodes), y.childNodes), t[y.childNodes.length].nodeType
            } catch (e) {
                P = {
                    apply: t.length ? function(e, t) {
                        L.apply(e, H.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }

            function ae(e, t, n, i) {
                var r, o, s, a, l, u, c, f = t && t.ownerDocument,
                    h = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
                if (!i && ((t ? t.ownerDocument || t : y) !== w && T(t), t = t || w, C)) {
                    if (11 !== h && (l = te.exec(e)))
                        if (r = l[1]) {
                            if (9 === h) {
                                if (!(s = t.getElementById(r))) return n;
                                if (s.id === r) return n.push(s), n
                            } else if (f && (s = f.getElementById(r)) && v(t, s) && s.id === r) return n.push(s), n
                        } else {
                            if (l[2]) return P.apply(n, t.getElementsByTagName(e)), n;
                            if ((r = l[3]) && d.getElementsByClassName && t.getElementsByClassName) return P.apply(n, t.getElementsByClassName(r)), n
                        }
                    if (d.qsa && !I[e + " "] && (!m || !m.test(e)) && (1 !== h || "object" !== t.nodeName.toLowerCase())) {
                        if (c = e, f = t, 1 === h && z.test(e)) {
                            for ((a = t.getAttribute("id")) ? a = a.replace(re, oe) : t.setAttribute("id", a = x), o = (u = p(e)).length; o--;) u[o] = "#" + a + " " + ve(u[o]);
                            c = u.join(","), f = ne.test(e) && ge(t.parentNode) || t
                        }
                        try {
                            return P.apply(n, f.querySelectorAll(c)), n
                        } catch (t) {
                            I(e, !0)
                        } finally {
                            a === x && t.removeAttribute("id")
                        }
                    }
                }
                return g(e.replace(K, "$1"), t, n, i)
            }

            function le() {
                var i = [];
                return function e(t, n) {
                    return i.push(t + " ") > b.cacheLength && delete e[i.shift()], e[t + " "] = n
                }
            }

            function ue(e) {
                return e[x] = !0, e
            }

            function ce(e) {
                var t = w.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function fe(e, t) {
                for (var n = e.split("|"), i = n.length; i--;) b.attrHandle[n[i]] = t
            }

            function he(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function de(t) {
                return function(e) {
                    return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && se(e) === t : e.disabled === t : "label" in e && e.disabled === t
                }
            }

            function pe(s) {
                return ue(function(o) {
                    return o = +o, ue(function(e, t) {
                        for (var n, i = s([], e.length, o), r = i.length; r--;) e[n = i[r]] && (e[n] = !(t[n] = e[n]))
                    })
                })
            }

            function ge(e) {
                return e && void 0 !== e.getElementsByTagName && e
            }
            for (e in d = ae.support = {}, r = ae.isXML = function(e) {
                var t = e.namespaceURI,
                    e = (e.ownerDocument || e).documentElement;
                return !G.test(t || e && e.nodeName || "HTML")
            }, T = ae.setDocument = function(e) {
                var t, e = e ? e.ownerDocument || e : y;
                return e !== w && 9 === e.nodeType && e.documentElement && (s = (w = e).documentElement, C = !r(w), y !== w && (t = w.defaultView) && t.top !== t && (t.addEventListener ? t.addEventListener("unload", i, !1) : t.attachEvent && t.attachEvent("onunload", i)), d.attributes = ce(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), d.getElementsByTagName = ce(function(e) {
                    return e.appendChild(w.createComment("")), !e.getElementsByTagName("*").length
                }), d.getElementsByClassName = ee.test(w.getElementsByClassName), d.getById = ce(function(e) {
                    return s.appendChild(e).id = x, !w.getElementsByName || !w.getElementsByName(x).length
                }), d.getById ? (b.filter.ID = function(e) {
                    var t = e.replace(ie, f);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, b.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && C) {
                        e = t.getElementById(e);
                        return e ? [e] : []
                    }
                }) : (b.filter.ID = function(e) {
                    var t = e.replace(ie, f);
                    return function(e) {
                        e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return e && e.value === t
                    }
                }, b.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && C) {
                        var n, i, r, o = t.getElementById(e);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                            for (r = t.getElementsByName(e), i = 0; o = r[i++];)
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                        }
                        return []
                    }
                }), b.find.TAG = d.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, i = [],
                        r = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" !== e) return o;
                    for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                    return i
                }, b.find.CLASS = d.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && C) return t.getElementsByClassName(e)
                }, a = [], m = [], (d.qsa = ee.test(w.querySelectorAll)) && (ce(function(e) {
                    s.appendChild(e).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + x + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + x + "+*").length || m.push(".#.+[+~]")
                }), ce(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = w.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), s.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                })), (d.matchesSelector = ee.test(c = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && ce(function(e) {
                    d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), a.push("!=", B)
                }), m = m.length && new RegExp(m.join("|")), a = a.length && new RegExp(a.join("|")), t = ee.test(s.compareDocumentPosition), v = t || ee.test(s.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        t = t && t.parentNode;
                    return e === t || !(!t || 1 !== t.nodeType || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, k = t ? function(e, t) {
                    if (e === t) return u = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e === w || e.ownerDocument === y && v(y, e) ? -1 : t === w || t.ownerDocument === y && v(y, t) ? 1 : l ? q(l, e) - q(l, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return u = !0, 0;
                    var n, i = 0,
                        r = e.parentNode,
                        o = t.parentNode,
                        s = [e],
                        a = [t];
                    if (!r || !o) return e === w ? -1 : t === w ? 1 : r ? -1 : o ? 1 : l ? q(l, e) - q(l, t) : 0;
                    if (r === o) return he(e, t);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (n = t; n = n.parentNode;) a.unshift(n);
                    for (; s[i] === a[i];) i++;
                    return i ? he(s[i], a[i]) : s[i] === y ? -1 : a[i] === y ? 1 : 0
                }), w
            }, ae.matches = function(e, t) {
                return ae(e, null, null, t)
            }, ae.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== w && T(e), d.matchesSelector && C && !I[t + " "] && (!a || !a.test(t)) && (!m || !m.test(t))) try {
                    var n = c.call(e, t);
                    if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                } catch (e) {
                    I(t, !0)
                }
                return 0 < ae(t, w, null, [e]).length
            }, ae.contains = function(e, t) {
                return (e.ownerDocument || e) !== w && T(e), v(e, t)
            }, ae.attr = function(e, t) {
                (e.ownerDocument || e) !== w && T(e);
                var n = b.attrHandle[t.toLowerCase()],
                    n = n && O.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !C) : void 0;
                return void 0 !== n ? n : d.attributes || !C ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
            }, ae.escape = function(e) {
                return (e + "").replace(re, oe)
            }, ae.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, ae.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    r = 0;
                if (u = !d.detectDuplicates, l = !d.sortStable && e.slice(0), e.sort(k), u) {
                    for (; t = e[r++];) t === e[r] && (i = n.push(r));
                    for (; i--;) e.splice(n[i], 1)
                }
                return l = null, e
            }, o = ae.getText = function(e) {
                var t, n = "",
                    i = 0,
                    r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === r || 4 === r) return e.nodeValue
                } else
                    for (; t = e[i++];) n += o(t);
                return n
            }, (b = ae.selectors = {
                cacheLength: 50,
                createPseudo: ue,
                match: Y,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(ie, f), e[3] = (e[3] || e[4] || e[5] || "").replace(ie, f), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return Y.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && V.test(n) && (t = p(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(ie, f).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = D[e + " "];
                        return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && D(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, n, i) {
                        return function(e) {
                            e = ae.attr(e, t);
                            return null == e ? "!=" === n : !n || (e += "", "=" === n ? e === i : "!=" === n ? e !== i : "^=" === n ? i && 0 === e.indexOf(i) : "*=" === n ? i && -1 < e.indexOf(i) : "$=" === n ? i && e.slice(-i.length) === i : "~=" === n ? -1 < (" " + e.replace(U, " ") + " ").indexOf(i) : "|=" === n && (e === i || e.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(p, e, t, g, m) {
                        var v = "nth" !== p.slice(0, 3),
                            y = "last" !== p.slice(-4),
                            _ = "of-type" === e;
                        return 1 === g && 0 === m ? function(e) {
                            return !!e.parentNode
                        } : function(e, t, n) {
                            var i, r, o, s, a, l, u = v != y ? "nextSibling" : "previousSibling",
                                c = e.parentNode,
                                f = _ && e.nodeName.toLowerCase(),
                                h = !n && !_,
                                d = !1;
                            if (c) {
                                if (v) {
                                    for (; u;) {
                                        for (s = e; s = s[u];)
                                            if (_ ? s.nodeName.toLowerCase() === f : 1 === s.nodeType) return !1;
                                        l = u = "only" === p && !l && "nextSibling"
                                    }
                                    return !0
                                }
                                if (l = [y ? c.firstChild : c.lastChild], y && h) {
                                    for (d = (a = (i = (r = (o = (s = c)[x] || (s[x] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[p] || [])[0] === S && i[1]) && i[2], s = a && c.childNodes[a]; s = ++a && s && s[u] || (d = a = 0) || l.pop();)
                                        if (1 === s.nodeType && ++d && s === e) {
                                            r[p] = [S, a, d];
                                            break
                                        }
                                } else if (h && (d = a = (i = (r = (o = (s = e)[x] || (s[x] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[p] || [])[0] === S && i[1]), !1 === d)
                                    for (;
                                        (s = ++a && s && s[u] || (d = a = 0) || l.pop()) && ((_ ? s.nodeName.toLowerCase() !== f : 1 !== s.nodeType) || !++d || (h && ((r = (o = s[x] || (s[x] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[p] = [S, d]), s !== e)););
                                return (d -= m) === g || d % g == 0 && 0 <= d / g
                            }
                        }
                    },
                    PSEUDO: function(e, o) {
                        var t, s = b.pseudos[e] || b.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                        return s[x] ? s(o) : 1 < s.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? ue(function(e, t) {
                            for (var n, i = s(e, o), r = i.length; r--;) e[n = q(e, i[r])] = !(t[n] = i[r])
                        }) : function(e) {
                            return s(e, 0, t)
                        }) : s
                    }
                },
                pseudos: {
                    not: ue(function(e) {
                        var i = [],
                            r = [],
                            a = h(e.replace(K, "$1"));
                        return a[x] ? ue(function(e, t, n, i) {
                            for (var r, o = a(e, null, i, []), s = e.length; s--;)(r = o[s]) && (e[s] = !(t[s] = r))
                        }) : function(e, t, n) {
                            return i[0] = e, a(i, null, n, r), i[0] = null, !r.pop()
                        }
                    }),
                    has: ue(function(t) {
                        return function(e) {
                            return 0 < ae(t, e).length
                        }
                    }),
                    contains: ue(function(t) {
                        return t = t.replace(ie, f),
                            function(e) {
                                return -1 < (e.textContent || o(e)).indexOf(t)
                            }
                    }),
                    lang: ue(function(n) {
                        return X.test(n || "") || ae.error("unsupported lang: " + n), n = n.replace(ie, f).toLowerCase(),
                            function(e) {
                                var t;
                                do {
                                    if (t = C ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function(e) {
                        return e === s
                    },
                    focus: function(e) {
                        return e === w.activeElement && (!w.hasFocus || w.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: de(!1),
                    disabled: de(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !b.pseudos.empty(e)
                    },
                    header: function(e) {
                        return Z.test(e.nodeName)
                    },
                    input: function(e) {
                        return J.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: pe(function() {
                        return [0]
                    }),
                    last: pe(function(e, t) {
                        return [t - 1]
                    }),
                    eq: pe(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: pe(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: pe(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: pe(function(e, t, n) {
                        for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i;) e.push(i);
                        return e
                    }),
                    gt: pe(function(e, t, n) {
                        for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                        return e
                    })
                }
            }).pseudos.nth = b.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) b.pseudos[e] = function(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }(e);
            for (e in {
                submit: !0,
                reset: !0
            }) b.pseudos[e] = function(n) {
                return function(e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t || "button" === t) && e.type === n
                }
            }(e);

            function me() {}

            function ve(e) {
                for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                return i
            }

            function ye(s, e, t) {
                var a = e.dir,
                    l = e.next,
                    u = l || a,
                    c = t && "parentNode" === u,
                    f = _++;
                return e.first ? function(e, t, n) {
                    for (; e = e[a];)
                        if (1 === e.nodeType || c) return s(e, t, n);
                    return !1
                } : function(e, t, n) {
                    var i, r, o = [S, f];
                    if (n) {
                        for (; e = e[a];)
                            if ((1 === e.nodeType || c) && s(e, t, n)) return !0
                    } else
                        for (; e = e[a];)
                            if (1 === e.nodeType || c)
                                if (i = (r = e[x] || (e[x] = {}))[e.uniqueID] || (r[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[a] || e;
                                else {
                                    if ((r = i[u]) && r[0] === S && r[1] === f) return o[2] = r[2];
                                    if ((i[u] = o)[2] = s(e, t, n)) return !0
                                } return !1
                }
            }

            function _e(r) {
                return 1 < r.length ? function(e, t, n) {
                    for (var i = r.length; i--;)
                        if (!r[i](e, t, n)) return !1;
                    return !0
                } : r[0]
            }

            function be(e, t, n, i, r) {
                for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)(o = e[a]) && (n && !n(o, i, r) || (s.push(o), u && t.push(a)));
                return s
            }

            function Ee(e) {
                for (var i, t, n, r = e.length, o = b.relative[e[0].type], s = o || b.relative[" "], a = o ? 1 : 0, l = ye(function(e) {
                    return e === i
                }, s, !0), u = ye(function(e) {
                    return -1 < q(i, e)
                }, s, !0), c = [function(e, t, n) {
                    n = !o && (n || t !== E) || ((i = t).nodeType ? l : u)(e, t, n);
                    return i = null, n
                }]; a < r; a++)
                    if (t = b.relative[e[a].type]) c = [ye(_e(c), t)];
                    else {
                        if ((t = b.filter[e[a].type].apply(null, e[a].matches))[x]) {
                            for (n = ++a; n < r && !b.relative[e[n].type]; n++);
                            return function e(d, p, g, m, v, t) {
                                return m && !m[x] && (m = e(m)), v && !v[x] && (v = e(v, t)), ue(function(e, t, n, i) {
                                    var r, o, s, a = [],
                                        l = [],
                                        u = t.length,
                                        c = e || function(e, t, n) {
                                            for (var i = 0, r = t.length; i < r; i++) ae(e, t[i], n);
                                            return n
                                        }(p || "*", n.nodeType ? [n] : n, []),
                                        f = !d || !e && p ? c : be(c, a, d, n, i),
                                        h = g ? v || (e ? d : u || m) ? [] : t : f;
                                    if (g && g(f, h, n, i), m)
                                        for (r = be(h, l), m(r, [], n, i), o = r.length; o--;)(s = r[o]) && (h[l[o]] = !(f[l[o]] = s));
                                    if (e) {
                                        if (v || d) {
                                            if (v) {
                                                for (r = [], o = h.length; o--;)(s = h[o]) && r.push(f[o] = s);
                                                v(null, h = [], r, i)
                                            }
                                            for (o = h.length; o--;)(s = h[o]) && -1 < (r = v ? q(e, s) : a[o]) && (e[r] = !(t[r] = s))
                                        }
                                    } else h = be(h === t ? h.splice(u, h.length) : h), v ? v(null, t, h, i) : P.apply(t, h)
                                })
                            }(1 < a && _e(c), 1 < a && ve(e.slice(0, a - 1).concat({
                                value: " " === e[a - 2].type ? "*" : ""
                            })).replace(K, "$1"), t, a < n && Ee(e.slice(a, n)), n < r && Ee(e = e.slice(n)), n < r && ve(e))
                        }
                        c.push(t)
                    }
                return _e(c)
            }
            return me.prototype = b.filters = b.pseudos, b.setFilters = new me, p = ae.tokenize = function(e, t) {
                var n, i, r, o, s, a, l, u = A[e + " "];
                if (u) return t ? 0 : u.slice(0);
                for (s = e, a = [], l = b.preFilter; s;) {
                    for (o in n && !(i = $.exec(s)) || (i && (s = s.slice(i[0].length) || s), a.push(r = [])), n = !1, (i = Q.exec(s)) && (n = i.shift(), r.push({
                        value: n,
                        type: i[0].replace(K, " ")
                    }), s = s.slice(n.length)), b.filter) !(i = Y[o].exec(s)) || l[o] && !(i = l[o](i)) || (n = i.shift(), r.push({
                        value: n,
                        type: o,
                        matches: i
                    }), s = s.slice(n.length));
                    if (!n) break
                }
                return t ? s.length : s ? ae.error(e) : A(e, a).slice(0)
            }, h = ae.compile = function(e, t) {
                var n, m, v, y, _, i, r = [],
                    o = [],
                    s = N[e + " "];
                if (!s) {
                    for (n = (t = t || p(e)).length; n--;)((s = Ee(t[n]))[x] ? r : o).push(s);
                    (s = N(e, (m = o, y = 0 < (v = r).length, _ = 0 < m.length, i = function(e, t, n, i, r) {
                        var o, s, a, l = 0,
                            u = "0",
                            c = e && [],
                            f = [],
                            h = E,
                            d = e || _ && b.find.TAG("*", r),
                            p = S += null == h ? 1 : Math.random() || .1,
                            g = d.length;
                        for (r && (E = t === w || t || r); u !== g && null != (o = d[u]); u++) {
                            if (_ && o) {
                                for (s = 0, t || o.ownerDocument === w || (T(o), n = !C); a = m[s++];)
                                    if (a(o, t || w, n)) {
                                        i.push(o);
                                        break
                                    }
                                r && (S = p)
                            }
                            y && ((o = !a && o) && l--, e && c.push(o))
                        }
                        if (l += u, y && u !== l) {
                            for (s = 0; a = v[s++];) a(c, f, t, n);
                            if (e) {
                                if (0 < l)
                                    for (; u--;) c[u] || f[u] || (f[u] = j.call(i));
                                f = be(f)
                            }
                            P.apply(i, f), r && !e && 0 < f.length && 1 < l + v.length && ae.uniqueSort(i)
                        }
                        return r && (S = p, E = h), c
                    }, y ? ue(i) : i))).selector = e
                }
                return s
            }, g = ae.select = function(e, t, n, i) {
                var r, o, s, a, l, u = "function" == typeof e && e,
                    c = !i && p(e = u.selector || e);
                if (n = n || [], 1 === c.length) {
                    if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (s = o[0]).type && 9 === t.nodeType && C && b.relative[o[1].type]) {
                        if (!(t = (b.find.ID(s.matches[0].replace(ie, f), t) || [])[0])) return n;
                        u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (r = Y.needsContext.test(e) ? 0 : o.length; r-- && (s = o[r], !b.relative[a = s.type]);)
                        if ((l = b.find[a]) && (i = l(s.matches[0].replace(ie, f), ne.test(o[0].type) && ge(t.parentNode) || t))) {
                            if (o.splice(r, 1), !(e = i.length && ve(o))) return P.apply(n, i), n;
                            break
                        }
                }
                return (u || h(e, c))(i, t, !C, n, !t || ne.test(e) && ge(t.parentNode) || t), n
            }, d.sortStable = x.split("").sort(k).join("") === x, d.detectDuplicates = !!u, T(), d.sortDetached = ce(function(e) {
                return 1 & e.compareDocumentPosition(w.createElement("fieldset"))
            }), ce(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || fe("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), d.attributes && ce(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || fe("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), ce(function(e) {
                return null == e.getAttribute("disabled")
            }) || fe(R, function(e, t, n) {
                if (!n) return !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
            }), ae
        }(w);
        x.find = d, x.expr = d.selectors, x.expr[":"] = x.expr.pseudos, x.uniqueSort = x.unique = d.uniqueSort, x.text = d.getText, x.isXMLDoc = d.isXML, x.contains = d.contains, x.escapeSelector = d.escape;

        function E(e, t, n) {
            for (var i = [], r = void 0 !== n;
                 (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (r && x(e).is(n)) break;
                    i.push(e)
                }
            return i
        }

        function T(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
        var S = x.expr.match.needsContext;

        function D(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function N(e, n, i) {
            return _(n) ? x.grep(e, function(e, t) {
                return !!n.call(e, t, e) !== i
            }) : n.nodeType ? x.grep(e, function(e) {
                return e === n !== i
            }) : "string" != typeof n ? x.grep(e, function(e) {
                return -1 < r.call(n, e) !== i
            }) : x.filter(n, e, i)
        }
        x.filter = function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? x.find.matchesSelector(i, e) ? [i] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, x.fn.extend({
            find: function(e) {
                var t, n, i = this.length,
                    r = this;
                if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
                    for (t = 0; t < i; t++)
                        if (x.contains(r[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < i; t++) x.find(e, r[t], n);
                return 1 < i ? x.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(N(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(N(this, e || [], !0))
            },
            is: function(e) {
                return !!N(this, "string" == typeof e && S.test(e) ? x(e) : e || [], !1).length
            }
        });
        var I, k = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (x.fn.init = function(e, t, n) {
            if (!e) return this;
            if (n = n || I, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : _(e) ? void 0 !== n.ready ? n.ready(e) : e(x) : x.makeArray(e, this);
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : k.exec(e)) || !i[1] && t) return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
            if (i[1]) {
                if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : C, !0)), A.test(i[1]) && x.isPlainObject(t))
                    for (var i in t) _(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return (e = C.getElementById(i[2])) && (this[0] = e, this.length = 1), this
        }).prototype = x.fn, I = x(C);
        var O = /^(?:parents|prev(?:Until|All))/,
            j = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };

        function L(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }
        x.fn.extend({
            has: function(e) {
                var t = x(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (x.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                var n, i = 0,
                    r = this.length,
                    o = [],
                    s = "string" != typeof e && x(e);
                if (!S.test(e))
                    for (; i < r; i++)
                        for (n = this[i]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                return this.pushStack(1 < o.length ? x.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? r.call(x(e), this[0]) : r.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(x.uniqueSort(x.merge(this.get(), x(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), x.each({
            parent: function(e) {
                e = e.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(e) {
                return E(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return E(e, "parentNode", n)
            },
            next: function(e) {
                return L(e, "nextSibling")
            },
            prev: function(e) {
                return L(e, "previousSibling")
            },
            nextAll: function(e) {
                return E(e, "nextSibling")
            },
            prevAll: function(e) {
                return E(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return E(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return E(e, "previousSibling", n)
            },
            siblings: function(e) {
                return T((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return T(e.firstChild)
            },
            contents: function(e) {
                return void 0 !== e.contentDocument ? e.contentDocument : (D(e, "template") && (e = e.content || e), x.merge([], e.childNodes))
            }
        }, function(i, r) {
            x.fn[i] = function(e, t) {
                var n = x.map(this, r, e);
                return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = x.filter(t, n)), 1 < this.length && (j[i] || x.uniqueSort(n), O.test(i) && n.reverse()), this.pushStack(n)
            }
        });
        var P = /[^\x20\t\r\n\f]+/g;

        function H(e) {
            return e
        }

        function q(e) {
            throw e
        }

        function R(e, t, n, i) {
            var r;
            try {
                e && _(r = e.promise) ? r.call(e).done(t).fail(n) : e && _(r = e.then) ? r.call(e, t, n) : t.apply(void 0, [e].slice(i))
            } catch (e) {
                n.apply(void 0, [e])
            }
        }
        x.Callbacks = function(i) {
            var n;
            i = "string" == typeof i ? (n = {}, x.each(i.match(P) || [], function(e, t) {
                n[t] = !0
            }), n) : x.extend({}, i);

            function r() {
                for (s = s || i.once, t = o = !0; l.length; u = -1)
                    for (e = l.shift(); ++u < a.length;) !1 === a[u].apply(e[0], e[1]) && i.stopOnFalse && (u = a.length, e = !1);
                i.memory || (e = !1), o = !1, s && (a = e ? [] : "")
            }
            var o, e, t, s, a = [],
                l = [],
                u = -1,
                c = {
                    add: function() {
                        return a && (e && !o && (u = a.length - 1, l.push(e)), function n(e) {
                            x.each(e, function(e, t) {
                                _(t) ? i.unique && c.has(t) || a.push(t) : t && t.length && "string" !== p(t) && n(t)
                            })
                        }(arguments), e && !o && r()), this
                    },
                    remove: function() {
                        return x.each(arguments, function(e, t) {
                            for (var n; - 1 < (n = x.inArray(t, a, n));) a.splice(n, 1), n <= u && u--
                        }), this
                    },
                    has: function(e) {
                        return e ? -1 < x.inArray(e, a) : 0 < a.length
                    },
                    empty: function() {
                        return a = a && [], this
                    },
                    disable: function() {
                        return s = l = [], a = e = "", this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return s = l = [], e || o || (a = e = ""), this
                    },
                    locked: function() {
                        return !!s
                    },
                    fireWith: function(e, t) {
                        return s || (t = [e, (t = t || []).slice ? t.slice() : t], l.push(t), o || r()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!t
                    }
                };
            return c
        }, x.extend({
            Deferred: function(e) {
                var o = [
                        ["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2],
                        ["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]
                    ],
                    r = "pending",
                    s = {
                        state: function() {
                            return r
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        catch: function(e) {
                            return s.then(null, e)
                        },
                        pipe: function() {
                            var r = arguments;
                            return x.Deferred(function(i) {
                                x.each(o, function(e, t) {
                                    var n = _(r[t[4]]) && r[t[4]];
                                    a[t[1]](function() {
                                        var e = n && n.apply(this, arguments);
                                        e && _(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this, n ? [e] : arguments)
                                    })
                                }), r = null
                            }).promise()
                        },
                        then: function(t, n, i) {
                            var l = 0;

                            function u(r, o, s, a) {
                                return function() {
                                    function e() {
                                        var e, t;
                                        if (!(r < l)) {
                                            if ((e = s.apply(n, i)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, _(t) ? a ? t.call(e, u(l, o, H, a), u(l, o, q, a)) : (l++, t.call(e, u(l, o, H, a), u(l, o, q, a), u(l, o, H, o.notifyWith))) : (s !== H && (n = void 0, i = [e]), (a || o.resolveWith)(n, i))
                                        }
                                    }
                                    var n = this,
                                        i = arguments,
                                        t = a ? e : function() {
                                            try {
                                                e()
                                            } catch (e) {
                                                x.Deferred.exceptionHook && x.Deferred.exceptionHook(e, t.stackTrace), l <= r + 1 && (s !== q && (n = void 0, i = [e]), o.rejectWith(n, i))
                                            }
                                        };
                                    r ? t() : (x.Deferred.getStackHook && (t.stackTrace = x.Deferred.getStackHook()), w.setTimeout(t))
                                }
                            }
                            return x.Deferred(function(e) {
                                o[0][3].add(u(0, e, _(i) ? i : H, e.notifyWith)), o[1][3].add(u(0, e, _(t) ? t : H)), o[2][3].add(u(0, e, _(n) ? n : q))
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? x.extend(e, s) : s
                        }
                    },
                    a = {};
                return x.each(o, function(e, t) {
                    var n = t[2],
                        i = t[5];
                    s[t[1]] = n.add, i && n.add(function() {
                        r = i
                    }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), a[t[0]] = function() {
                        return a[t[0] + "With"](this === a ? void 0 : this, arguments), this
                    }, a[t[0] + "With"] = n.fireWith
                }), s.promise(a), e && e.call(a, a), a
            },
            when: function(e) {
                function t(t) {
                    return function(e) {
                        r[t] = this, o[t] = 1 < arguments.length ? a.call(arguments) : e, --n || s.resolveWith(r, o)
                    }
                }
                var n = arguments.length,
                    i = n,
                    r = Array(i),
                    o = a.call(arguments),
                    s = x.Deferred();
                if (n <= 1 && (R(e, s.done(t(i)).resolve, s.reject, !n), "pending" === s.state() || _(o[i] && o[i].then))) return s.then();
                for (; i--;) R(o[i], t(i), s.reject);
                return s.promise()
            }
        });
        var M = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        x.Deferred.exceptionHook = function(e, t) {
            w.console && w.console.warn && e && M.test(e.name) && w.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        }, x.readyException = function(e) {
            w.setTimeout(function() {
                throw e
            })
        };
        var W = x.Deferred();

        function F() {
            C.removeEventListener("DOMContentLoaded", F), w.removeEventListener("load", F), x.ready()
        }
        x.fn.ready = function(e) {
            return W.then(e).catch(function(e) {
                x.readyException(e)
            }), this
        }, x.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (!0 === e ? --x.readyWait : x.isReady) || (x.isReady = !0) !== e && 0 < --x.readyWait || W.resolveWith(C, [x])
            }
        }), x.ready.then = W.then, "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? w.setTimeout(x.ready) : (C.addEventListener("DOMContentLoaded", F), w.addEventListener("load", F));
        var B = function(e, t, n, i, r, o, s) {
                var a = 0,
                    l = e.length,
                    u = null == n;
                if ("object" === p(n))
                    for (a in r = !0, n) B(e, t, a, n[a], !0, o, s);
                else if (void 0 !== i && (r = !0, _(i) || (s = !0), u && (t = s ? (t.call(e, i), null) : (u = t, function(e, t, n) {
                    return u.call(x(e), n)
                })), t))
                    for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
                return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
            },
            U = /^-ms-/,
            K = /-([a-z])/g;

        function $(e, t) {
            return t.toUpperCase()
        }

        function Q(e) {
            return e.replace(U, "ms-").replace(K, $)
        }

        function z(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        }

        function V() {
            this.expando = x.expando + V.uid++
        }
        V.uid = 1, V.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, z(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var i, r = this.cache(e);
                if ("string" == typeof t) r[Q(t)] = n;
                else
                    for (i in t) r[Q(i)] = t[i];
                return r
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][Q(t)]
            },
            access: function(e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, i = e[this.expando];
                if (void 0 !== i) {
                    if (void 0 !== t) {
                        n = (t = Array.isArray(t) ? t.map(Q) : (t = Q(t)) in i ? [t] : t.match(P) || []).length;
                        for (; n--;) delete i[t[n]]
                    }
                    void 0 !== t && !x.isEmptyObject(i) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                e = e[this.expando];
                return void 0 !== e && !x.isEmptyObject(e)
            }
        };
        var X = new V,
            Y = new V,
            G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            J = /[A-Z]/g;

        function Z(e, t, n) {
            var i, r;
            if (void 0 === n && 1 === e.nodeType)
                if (i = "data-" + t.replace(J, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                    try {
                        n = "true" === (r = n) || "false" !== r && ("null" === r ? null : r === +r + "" ? +r : G.test(r) ? JSON.parse(r) : r)
                    } catch (e) {}
                    Y.set(e, t, n)
                } else n = void 0;
            return n
        }
        x.extend({
            hasData: function(e) {
                return Y.hasData(e) || X.hasData(e)
            },
            data: function(e, t, n) {
                return Y.access(e, t, n)
            },
            removeData: function(e, t) {
                Y.remove(e, t)
            },
            _data: function(e, t, n) {
                return X.access(e, t, n)
            },
            _removeData: function(e, t) {
                X.remove(e, t)
            }
        }), x.fn.extend({
            data: function(n, e) {
                var t, i, r, o = this[0],
                    s = o && o.attributes;
                if (void 0 !== n) return "object" == typeof n ? this.each(function() {
                    Y.set(this, n)
                }) : B(this, function(e) {
                    var t;
                    return o && void 0 === e ? void 0 !== (t = Y.get(o, n)) || void 0 !== (t = Z(o, n)) ? t : void 0 : void this.each(function() {
                        Y.set(this, n, e)
                    })
                }, null, e, 1 < arguments.length, null, !0);
                if (this.length && (r = Y.get(o), 1 === o.nodeType && !X.get(o, "hasDataAttrs"))) {
                    for (t = s.length; t--;) s[t] && 0 === (i = s[t].name).indexOf("data-") && (i = Q(i.slice(5)), Z(o, i, r[i]));
                    X.set(o, "hasDataAttrs", !0)
                }
                return r
            },
            removeData: function(e) {
                return this.each(function() {
                    Y.remove(this, e)
                })
            }
        }), x.extend({
            queue: function(e, t, n) {
                var i;
                if (e) return t = (t || "fx") + "queue", i = X.get(e, t), n && (!i || Array.isArray(n) ? i = X.access(e, t, x.makeArray(n)) : i.push(n)), i || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = x.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = x._queueHooks(e, t);
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, function() {
                    x.dequeue(e, t)
                }, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return X.get(e, n) || X.access(e, n, {
                    empty: x.Callbacks("once memory").add(function() {
                        X.remove(e, [t + "queue", n])
                    })
                })
            }
        }), x.fn.extend({
            queue: function(t, n) {
                var e = 2;
                return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? x.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                    var e = x.queue(this, t, n);
                    x._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && x.dequeue(this, t)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    x.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                function n() {
                    --r || o.resolveWith(s, [s])
                }
                var i, r = 1,
                    o = x.Deferred(),
                    s = this,
                    a = this.length;
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(i = X.get(s[a], e + "queueHooks")) && i.empty && (r++, i.empty.add(n));
                return n(), o.promise(t)
            }
        });
        var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
            ne = ["Top", "Right", "Bottom", "Left"],
            ie = C.documentElement,
            re = function(e) {
                return x.contains(e.ownerDocument, e)
            },
            oe = {
                composed: !0
            };
        ie.getRootNode && (re = function(e) {
            return x.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
        });

        function se(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && re(e) && "none" === x.css(e, "display")
        }

        function ae(e, t, n, i) {
            var r, o = {};
            for (r in t) o[r] = e.style[r], e.style[r] = t[r];
            for (r in i = n.apply(e, i || []), t) e.style[r] = o[r];
            return i
        }

        function le(e, t, n, i) {
            var r, o, s = 20,
                a = i ? function() {
                    return i.cur()
                } : function() {
                    return x.css(e, t, "")
                },
                l = a(),
                u = n && n[3] || (x.cssNumber[t] ? "" : "px"),
                c = e.nodeType && (x.cssNumber[t] || "px" !== u && +l) && te.exec(x.css(e, t));
            if (c && c[3] !== u) {
                for (l /= 2, u = u || c[3], c = +l || 1; s--;) x.style(e, t, c + u), (1 - o) * (1 - (o = a() / l || .5)) <= 0 && (s = 0), c /= o;
                c *= 2, x.style(e, t, c + u), n = n || []
            }
            return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
        }
        var ue = {};

        function ce(e, t) {
            for (var n, i, r, o, s, a, l = [], u = 0, c = e.length; u < c; u++)(i = e[u]).style && (n = i.style.display, t ? ("none" === n && (l[u] = X.get(i, "display") || null, l[u] || (i.style.display = "")), "" === i.style.display && se(i) && (l[u] = (a = o = r = void 0, o = i.ownerDocument, s = i.nodeName, (a = ue[s]) || (r = o.body.appendChild(o.createElement(s)), a = x.css(r, "display"), r.parentNode.removeChild(r), "none" === a && (a = "block"), ue[s] = a)))) : "none" !== n && (l[u] = "none", X.set(i, "display", n)));
            for (u = 0; u < c; u++) null != l[u] && (e[u].style.display = l[u]);
            return e
        }
        x.fn.extend({
            show: function() {
                return ce(this, !0)
            },
            hide: function() {
                return ce(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    se(this) ? x(this).show() : x(this).hide()
                })
            }
        });
        var fe = /^(?:checkbox|radio)$/i,
            he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            de = /^$|^module$|\/(?:java|ecma)script/i,
            pe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };

        function ge(e, t) {
            var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || t && D(e, t) ? x.merge([e], n) : n
        }

        function me(e, t) {
            for (var n = 0, i = e.length; n < i; n++) X.set(e[n], "globalEval", !t || X.get(t[n], "globalEval"))
        }
        pe.optgroup = pe.option, pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead, pe.th = pe.td;
        var ve = /<|&#?\w+;/;

        function ye(e, t, n, i, r) {
            for (var o, s, a, l, u, c = t.createDocumentFragment(), f = [], h = 0, d = e.length; h < d; h++)
                if ((o = e[h]) || 0 === o)
                    if ("object" === p(o)) x.merge(f, o.nodeType ? [o] : o);
                    else if (ve.test(o)) {
                        for (s = s || c.appendChild(t.createElement("div")), a = (he.exec(o) || ["", ""])[1].toLowerCase(), a = pe[a] || pe._default, s.innerHTML = a[1] + x.htmlPrefilter(o) + a[2], u = a[0]; u--;) s = s.lastChild;
                        x.merge(f, s.childNodes), (s = c.firstChild).textContent = ""
                    } else f.push(t.createTextNode(o));
            for (c.textContent = "", h = 0; o = f[h++];)
                if (i && -1 < x.inArray(o, i)) r && r.push(o);
                else if (l = re(o), s = ge(c.appendChild(o), "script"), l && me(s), n)
                    for (u = 0; o = s[u++];) de.test(o.type || "") && n.push(o);
            return c
        }
        t = C.createDocumentFragment().appendChild(C.createElement("div")), (d = C.createElement("input")).setAttribute("type", "radio"), d.setAttribute("checked", "checked"), d.setAttribute("name", "t"), t.appendChild(d), y.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
        var _e = /^key/,
            be = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Ee = /^([^.]*)(?:\.(.+)|)/;

        function Te() {
            return !0
        }

        function we() {
            return !1
        }

        function Ce(e, t) {
            return e === function() {
                try {
                    return C.activeElement
                } catch (e) {}
            }() == ("focus" === t)
        }

        function xe(e, t, n, i, r, o) {
            var s, a;
            if ("object" == typeof t) {
                for (a in "string" != typeof n && (i = i || n, n = void 0), t) xe(e, a, n, i, t[a], o);
                return e
            }
            if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = we;
            else if (!r) return e;
            return 1 === o && (s = r, (r = function(e) {
                return x().off(e), s.apply(this, arguments)
            }).guid = s.guid || (s.guid = x.guid++)), e.each(function() {
                x.event.add(this, t, r, i, n)
            })
        }

        function Se(e, r, o) {
            o ? (X.set(e, r, !1), x.event.add(e, r, {
                namespace: !1,
                handler: function(e) {
                    var t, n, i = X.get(this, r);
                    if (1 & e.isTrigger && this[r]) {
                        if (i.length)(x.event.special[r] || {}).delegateType && e.stopPropagation();
                        else if (i = a.call(arguments), X.set(this, r, i), t = o(this, r), this[r](), i !== (n = X.get(this, r)) || t ? X.set(this, r, !1) : n = {}, i !== n) return e.stopImmediatePropagation(), e.preventDefault(), n.value
                    } else i.length && (X.set(this, r, {
                        value: x.event.trigger(x.extend(i[0], x.Event.prototype), i.slice(1), this)
                    }), e.stopImmediatePropagation())
                }
            })) : void 0 === X.get(e, r) && x.event.add(e, r, Te)
        }
        x.event = {
            global: {},
            add: function(t, e, n, i, r) {
                var o, s, a, l, u, c, f, h, d, p = X.get(t);
                if (p)
                    for (n.handler && (n = (o = n).handler, r = o.selector), r && x.find.matchesSelector(ie, r), n.guid || (n.guid = x.guid++), (a = p.events) || (a = p.events = {}), (s = p.handle) || (s = p.handle = function(e) {
                        return void 0 !== x && x.event.triggered !== e.type ? x.event.dispatch.apply(t, arguments) : void 0
                    }), l = (e = (e || "").match(P) || [""]).length; l--;) f = d = (u = Ee.exec(e[l]) || [])[1], h = (u[2] || "").split(".").sort(), f && (c = x.event.special[f] || {}, f = (r ? c.delegateType : c.bindType) || f, c = x.event.special[f] || {}, u = x.extend({
                        type: f,
                        origType: d,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && x.expr.match.needsContext.test(r),
                        namespace: h.join(".")
                    }, o), (d = a[f]) || ((d = a[f] = []).delegateCount = 0, c.setup && !1 !== c.setup.call(t, i, h, s) || t.addEventListener && t.addEventListener(f, s)), c.add && (c.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, u) : d.push(u), x.event.global[f] = !0)
            },
            remove: function(e, t, n, i, r) {
                var o, s, a, l, u, c, f, h, d, p, g, m = X.hasData(e) && X.get(e);
                if (m && (l = m.events)) {
                    for (u = (t = (t || "").match(P) || [""]).length; u--;)
                        if (d = g = (a = Ee.exec(t[u]) || [])[1], p = (a[2] || "").split(".").sort(), d) {
                            for (f = x.event.special[d] || {}, h = l[d = (i ? f.delegateType : f.bindType) || d] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = h.length; o--;) c = h[o], !r && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (h.splice(o, 1), c.selector && h.delegateCount--, f.remove && f.remove.call(e, c));
                            s && !h.length && (f.teardown && !1 !== f.teardown.call(e, p, m.handle) || x.removeEvent(e, d, m.handle), delete l[d])
                        } else
                            for (d in l) x.event.remove(e, d + t[u], n, i, !0);
                    x.isEmptyObject(l) && X.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, i, r, o, s = x.event.fix(e),
                    a = new Array(arguments.length),
                    l = (X.get(this, "events") || {})[s.type] || [],
                    e = x.event.special[s.type] || {};
                for (a[0] = s, t = 1; t < arguments.length; t++) a[t] = arguments[t];
                if (s.delegateTarget = this, !e.preDispatch || !1 !== e.preDispatch.call(this, s)) {
                    for (o = x.event.handlers.call(this, s, l), t = 0;
                         (i = o[t++]) && !s.isPropagationStopped();)
                        for (s.currentTarget = i.elem, n = 0;
                             (r = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !1 !== r.namespace && !s.rnamespace.test(r.namespace) || (s.handleObj = r, s.data = r.data, void 0 !== (r = ((x.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, a)) && !1 === (s.result = r) && (s.preventDefault(), s.stopPropagation()));
                    return e.postDispatch && e.postDispatch.call(this, s), s.result
                }
            },
            handlers: function(e, t) {
                var n, i, r, o, s, a = [],
                    l = t.delegateCount,
                    u = e.target;
                if (l && u.nodeType && !("click" === e.type && 1 <= e.button))
                    for (; u !== this; u = u.parentNode || this)
                        if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
                            for (o = [], s = {}, n = 0; n < l; n++) void 0 === s[r = (i = t[n]).selector + " "] && (s[r] = i.needsContext ? -1 < x(r, this).index(u) : x.find(r, this, null, [u]).length), s[r] && o.push(i);
                            o.length && a.push({
                                elem: u,
                                handlers: o
                            })
                        }
                return u = this, l < t.length && a.push({
                    elem: u,
                    handlers: t.slice(l)
                }), a
            },
            addProp: function(t, e) {
                Object.defineProperty(x.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: _(e) ? function() {
                        if (this.originalEvent) return e(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[t]
                    },
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            },
            fix: function(e) {
                return e[x.expando] ? e : new x.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        e = this || e;
                        return fe.test(e.type) && e.click && D(e, "input") && Se(e, "click", Te), !1
                    },
                    trigger: function(e) {
                        e = this || e;
                        return fe.test(e.type) && e.click && D(e, "input") && Se(e, "click"), !0
                    },
                    _default: function(e) {
                        e = e.target;
                        return fe.test(e.type) && e.click && D(e, "input") && X.get(e, "click") || D(e, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, x.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, x.Event = function(e, t) {
            if (!(this instanceof x.Event)) return new x.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Te : we, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[x.expando] = !0
        }, x.Event.prototype = {
            constructor: x.Event,
            isDefaultPrevented: we,
            isPropagationStopped: we,
            isImmediatePropagationStopped: we,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = Te, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = Te, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = Te, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, x.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && _e.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && be.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, x.event.addProp), x.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            x.event.special[e] = {
                setup: function() {
                    return Se(this, e, Ce), !1
                },
                trigger: function() {
                    return Se(this, e), !0
                },
                delegateType: t
            }
        }), x.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, r) {
            x.event.special[e] = {
                delegateType: r,
                bindType: r,
                handle: function(e) {
                    var t, n = e.relatedTarget,
                        i = e.handleObj;
                    return n && (n === this || x.contains(this, n)) || (e.type = i.origType, t = i.handler.apply(this, arguments), e.type = r), t
                }
            }
        }), x.fn.extend({
            on: function(e, t, n, i) {
                return xe(this, e, t, n, i)
            },
            one: function(e, t, n, i) {
                return xe(this, e, t, n, i, 1)
            },
            off: function(e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = we), this.each(function() {
                    x.event.remove(this, e, n, t)
                });
                for (r in e) this.off(r, t, e[r]);
                return this
            }
        });
        var De = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            Ae = /<script|<style|<link/i,
            Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ie = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

        function ke(e, t) {
            return D(e, "table") && D(11 !== t.nodeType ? t : t.firstChild, "tr") && x(e).children("tbody")[0] || e
        }

        function Oe(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function je(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }

        function Le(e, t) {
            var n, i, r, o, s, a;
            if (1 === t.nodeType) {
                if (X.hasData(e) && (o = X.access(e), s = X.set(t, o), a = o.events))
                    for (r in delete s.handle, s.events = {}, a)
                        for (n = 0, i = a[r].length; n < i; n++) x.event.add(t, r, a[r][n]);
                Y.hasData(e) && (e = Y.access(e), e = x.extend({}, e), Y.set(t, e))
            }
        }

        function Pe(n, i, r, o) {
            i = m.apply([], i);
            var e, t, s, a, l, u, c = 0,
                f = n.length,
                h = f - 1,
                d = i[0],
                p = _(d);
            if (p || 1 < f && "string" == typeof d && !y.checkClone && Ne.test(d)) return n.each(function(e) {
                var t = n.eq(e);
                p && (i[0] = d.call(this, e, t.html())), Pe(t, i, r, o)
            });
            if (f && (t = (e = ye(i, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
                for (a = (s = x.map(ge(e, "script"), Oe)).length; c < f; c++) l = e, c !== h && (l = x.clone(l, !0, !0), a && x.merge(s, ge(l, "script"))), r.call(n[c], l, c);
                if (a)
                    for (u = s[s.length - 1].ownerDocument, x.map(s, je), c = 0; c < a; c++) l = s[c], de.test(l.type || "") && !X.access(l, "globalEval") && x.contains(u, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? x._evalUrl && !l.noModule && x._evalUrl(l.src, {
                        nonce: l.nonce || l.getAttribute("nonce")
                    }) : b(l.textContent.replace(Ie, ""), l, u))
            }
            return n
        }

        function He(e, t, n) {
            for (var i, r = t ? x.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || x.cleanData(ge(i)), i.parentNode && (n && re(i) && me(ge(i, "script")), i.parentNode.removeChild(i));
            return e
        }
        x.extend({
            htmlPrefilter: function(e) {
                return e.replace(De, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var i, r, o, s, a, l, u, c = e.cloneNode(!0),
                    f = re(e);
                if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                    for (s = ge(c), i = 0, r = (o = ge(e)).length; i < r; i++) a = o[i], "input" === (u = (l = s[i]).nodeName.toLowerCase()) && fe.test(a.type) ? l.checked = a.checked : "input" !== u && "textarea" !== u || (l.defaultValue = a.defaultValue);
                if (t)
                    if (n)
                        for (o = o || ge(e), s = s || ge(c), i = 0, r = o.length; i < r; i++) Le(o[i], s[i]);
                    else Le(e, c);
                return 0 < (s = ge(c, "script")).length && me(s, !f && ge(e, "script")), c
            },
            cleanData: function(e) {
                for (var t, n, i, r = x.event.special, o = 0; void 0 !== (n = e[o]); o++)
                    if (z(n)) {
                        if (t = n[X.expando]) {
                            if (t.events)
                                for (i in t.events) r[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
                            n[X.expando] = void 0
                        }
                        n[Y.expando] && (n[Y.expando] = void 0)
                    }
            }
        }), x.fn.extend({
            detach: function(e) {
                return He(this, e, !0)
            },
            remove: function(e) {
                return He(this, e)
            },
            text: function(e) {
                return B(this, function(e) {
                    return void 0 === e ? x.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return Pe(this, arguments, function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ke(this, e).appendChild(e)
                })
            },
            prepend: function() {
                return Pe(this, arguments, function(e) {
                    var t;
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = ke(this, e)).insertBefore(e, t.firstChild)
                })
            },
            before: function() {
                return Pe(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return Pe(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(ge(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return x.clone(this, e, t)
                })
            },
            html: function(e) {
                return B(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !Ae.test(e) && !pe[(he.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = x.htmlPrefilter(e);
                        try {
                            for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (x.cleanData(ge(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var n = [];
                return Pe(this, arguments, function(e) {
                    var t = this.parentNode;
                    x.inArray(this, n) < 0 && (x.cleanData(ge(this)), t && t.replaceChild(e, this))
                }, n)
            }
        }), x.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, s) {
            x.fn[e] = function(e) {
                for (var t, n = [], i = x(e), r = i.length - 1, o = 0; o <= r; o++) t = o === r ? this : this.clone(!0), x(i[o])[s](t), l.apply(n, t.get());
                return this.pushStack(n)
            }
        });
        var qe, Re, Me, We, Fe, Be, Ue, Ke = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
            $e = function(e) {
                var t = e.ownerDocument.defaultView;
                return t && t.opener || (t = w), t.getComputedStyle(e)
            },
            Qe = new RegExp(ne.join("|"), "i");

        function ze(e, t, n) {
            var i, r, o = e.style;
            return (n = n || $e(e)) && ("" !== (r = n.getPropertyValue(t) || n[t]) || re(e) || (r = x.style(e, t)), !y.pixelBoxStyles() && Ke.test(r) && Qe.test(t) && (i = o.width, e = o.minWidth, t = o.maxWidth, o.minWidth = o.maxWidth = o.width = r, r = n.width, o.width = i, o.minWidth = e, o.maxWidth = t)), void 0 !== r ? r + "" : r
        }

        function Ve(e, t) {
            return {
                get: function() {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }

        function Xe() {
            var e;
            Ue && (Be.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", Ue.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(Be).appendChild(Ue), e = w.getComputedStyle(Ue), qe = "1%" !== e.top, Fe = 12 === Ye(e.marginLeft), Ue.style.right = "60%", We = 36 === Ye(e.right), Re = 36 === Ye(e.width), Ue.style.position = "absolute", Me = 12 === Ye(Ue.offsetWidth / 3), ie.removeChild(Be), Ue = null)
        }

        function Ye(e) {
            return Math.round(parseFloat(e))
        }
        Be = C.createElement("div"), (Ue = C.createElement("div")).style && (Ue.style.backgroundClip = "content-box", Ue.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === Ue.style.backgroundClip, x.extend(y, {
            boxSizingReliable: function() {
                return Xe(), Re
            },
            pixelBoxStyles: function() {
                return Xe(), We
            },
            pixelPosition: function() {
                return Xe(), qe
            },
            reliableMarginLeft: function() {
                return Xe(), Fe
            },
            scrollboxSize: function() {
                return Xe(), Me
            }
        }));
        var Ge = ["Webkit", "Moz", "ms"],
            Je = C.createElement("div").style,
            Ze = {};

        function et(e) {
            return x.cssProps[e] || Ze[e] || (e in Je ? e : Ze[e] = function(e) {
                for (var t = e[0].toUpperCase() + e.slice(1), n = Ge.length; n--;)
                    if ((e = Ge[n] + t) in Je) return e
            }(e) || e)
        }
        var tt = /^(none|table(?!-c[ea]).+)/,
            nt = /^--/,
            it = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            rt = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function ot(e, t, n) {
            var i = te.exec(t);
            return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
        }

        function st(e, t, n, i, r, o) {
            var s = "width" === t ? 1 : 0,
                a = 0,
                l = 0;
            if (n === (i ? "border" : "content")) return 0;
            for (; s < 4; s += 2) "margin" === n && (l += x.css(e, n + ne[s], !0, r)), i ? ("content" === n && (l -= x.css(e, "padding" + ne[s], !0, r)), "margin" !== n && (l -= x.css(e, "border" + ne[s] + "Width", !0, r))) : (l += x.css(e, "padding" + ne[s], !0, r), "padding" !== n ? l += x.css(e, "border" + ne[s] + "Width", !0, r) : a += x.css(e, "border" + ne[s] + "Width", !0, r));
            return !i && 0 <= o && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - .5)) || 0), l
        }

        function at(e, t, n) {
            var i = $e(e),
                r = (!y.boxSizingReliable() || n) && "border-box" === x.css(e, "boxSizing", !1, i),
                o = r,
                s = ze(e, t, i),
                a = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Ke.test(s)) {
                if (!n) return s;
                s = "auto"
            }
            return (!y.boxSizingReliable() && r || "auto" === s || !parseFloat(s) && "inline" === x.css(e, "display", !1, i)) && e.getClientRects().length && (r = "border-box" === x.css(e, "boxSizing", !1, i), (o = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + st(e, t, n || (r ? "border" : "content"), o, i, s) + "px"
        }

        function lt(e, t, n, i, r) {
            return new lt.prototype.init(e, t, n, i, r)
        }
        x.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            e = ze(e, "opacity");
                            return "" === e ? "1" : e
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, o, s, a = Q(t),
                        l = nt.test(t),
                        u = e.style;
                    if (l || (t = et(a)), s = x.cssHooks[t] || x.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (r = s.get(e, !1, i)) ? r : u[t];
                    "string" == (o = typeof n) && (r = te.exec(n)) && r[1] && (n = le(e, t, r), o = "number"), null != n && n == n && ("number" !== o || l || (n += r && r[3] || (x.cssNumber[a] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l ? u.setProperty(t, n) : u[t] = n))
                }
            },
            css: function(e, t, n, i) {
                var r, o = Q(t);
                return nt.test(t) || (t = et(o)), (o = x.cssHooks[t] || x.cssHooks[o]) && "get" in o && (r = o.get(e, !0, n)), void 0 === r && (r = ze(e, t, i)), "normal" === r && t in rt && (r = rt[t]), "" === n || n ? (t = parseFloat(r), !0 === n || isFinite(t) ? t || 0 : r) : r
            }
        }), x.each(["height", "width"], function(e, a) {
            x.cssHooks[a] = {
                get: function(e, t, n) {
                    if (t) return !tt.test(x.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? at(e, a, n) : ae(e, it, function() {
                        return at(e, a, n)
                    })
                },
                set: function(e, t, n) {
                    var i, r = $e(e),
                        o = !y.scrollboxSize() && "absolute" === r.position,
                        s = (o || n) && "border-box" === x.css(e, "boxSizing", !1, r),
                        n = n ? st(e, a, n, s, r) : 0;
                    return s && o && (n -= Math.ceil(e["offset" + a[0].toUpperCase() + a.slice(1)] - parseFloat(r[a]) - st(e, a, "border", !1, r) - .5)), n && (i = te.exec(t)) && "px" !== (i[3] || "px") && (e.style[a] = t, t = x.css(e, a)), ot(0, t, n)
                }
            }
        }), x.cssHooks.marginLeft = Ve(y.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - ae(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), x.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(r, o) {
            x.cssHooks[r + o] = {
                expand: function(e) {
                    for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[r + ne[t] + o] = i[t] || i[t - 2] || i[0];
                    return n
                }
            }, "margin" !== r && (x.cssHooks[r + o].set = ot)
        }), x.fn.extend({
            css: function(e, t) {
                return B(this, function(e, t, n) {
                    var i, r, o = {},
                        s = 0;
                    if (Array.isArray(t)) {
                        for (i = $e(e), r = t.length; s < r; s++) o[t[s]] = x.css(e, t[s], !1, i);
                        return o
                    }
                    return void 0 !== n ? x.style(e, t, n) : x.css(e, t)
                }, e, t, 1 < arguments.length)
            }
        }), ((x.Tween = lt).prototype = {
            constructor: lt,
            init: function(e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || x.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (x.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = lt.propHooks[this.prop];
                return (e && e.get ? e : lt.propHooks._default).get(this)
            },
            run: function(e) {
                var t, n = lt.propHooks[this.prop];
                return this.options.duration ? this.pos = t = x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (n && n.set ? n : lt.propHooks._default).set(this), this
            }
        }).init.prototype = lt.prototype, (lt.propHooks = {
            _default: {
                get: function(e) {
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = x.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
                },
                set: function(e) {
                    x.fx.step[e.prop] ? x.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !x.cssHooks[e.prop] && null == e.elem.style[et(e.prop)] ? e.elem[e.prop] = e.now : x.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }).scrollTop = lt.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, x.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, x.fx = lt.prototype.init, x.fx.step = {};
        var ut, ct, ft = /^(?:toggle|show|hide)$/,
            ht = /queueHooks$/;

        function dt() {
            ct && (!1 === C.hidden && w.requestAnimationFrame ? w.requestAnimationFrame(dt) : w.setTimeout(dt, x.fx.interval), x.fx.tick())
        }

        function pt() {
            return w.setTimeout(function() {
                ut = void 0
            }), ut = Date.now()
        }

        function gt(e, t) {
            var n, i = 0,
                r = {
                    height: e
                };
            for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = ne[i])] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function mt(e, t, n) {
            for (var i, r = (vt.tweeners[t] || []).concat(vt.tweeners["*"]), o = 0, s = r.length; o < s; o++)
                if (i = r[o].call(n, t, e)) return i
        }

        function vt(r, e, t) {
            var n, o, i = 0,
                s = vt.prefilters.length,
                a = x.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (o) return !1;
                    for (var e = ut || pt(), e = Math.max(0, u.startTime + u.duration - e), t = 1 - (e / u.duration || 0), n = 0, i = u.tweens.length; n < i; n++) u.tweens[n].run(t);
                    return a.notifyWith(r, [u, t, e]), t < 1 && i ? e : (i || a.notifyWith(r, [u, 1, 0]), a.resolveWith(r, [u]), !1)
                },
                u = a.promise({
                    elem: r,
                    props: x.extend({}, e),
                    opts: x.extend(!0, {
                        specialEasing: {},
                        easing: x.easing._default
                    }, t),
                    originalProperties: e,
                    originalOptions: t,
                    startTime: ut || pt(),
                    duration: t.duration,
                    tweens: [],
                    createTween: function(e, t) {
                        e = x.Tween(r, u.opts, e, t, u.opts.specialEasing[e] || u.opts.easing);
                        return u.tweens.push(e), e
                    },
                    stop: function(e) {
                        var t = 0,
                            n = e ? u.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; t < n; t++) u.tweens[t].run(1);
                        return e ? (a.notifyWith(r, [u, 1, 0]), a.resolveWith(r, [u, e])) : a.rejectWith(r, [u, e]), this
                    }
                }),
                c = u.props;
            for (function(e, t) {
                var n, i, r, o, s;
                for (n in e)
                    if (r = t[i = Q(n)], o = e[n], Array.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (s = x.cssHooks[i]) && "expand" in s)
                        for (n in o = s.expand(o), delete e[i], o) n in e || (e[n] = o[n], t[n] = r);
                    else t[i] = r
            }(c, u.opts.specialEasing); i < s; i++)
                if (n = vt.prefilters[i].call(u, r, c, u.opts)) return _(n.stop) && (x._queueHooks(u.elem, u.opts.queue).stop = n.stop.bind(n)), n;
            return x.map(c, mt, u), _(u.opts.start) && u.opts.start.call(r, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), x.fx.timer(x.extend(l, {
                elem: r,
                anim: u,
                queue: u.opts.queue
            })), u
        }
        x.Animation = x.extend(vt, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return le(n.elem, e, te.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                for (var n, i = 0, r = (e = _(e) ? (t = e, ["*"]) : e.match(P)).length; i < r; i++) n = e[i], vt.tweeners[n] = vt.tweeners[n] || [], vt.tweeners[n].unshift(t)
            },
            prefilters: [function(e, t, n) {
                var i, r, o, s, a, l, u, c = "width" in t || "height" in t,
                    f = this,
                    h = {},
                    d = e.style,
                    p = e.nodeType && se(e),
                    g = X.get(e, "fxshow");
                for (i in n.queue || (null == (s = x._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, f.always(function() {
                    f.always(function() {
                        s.unqueued--, x.queue(e, "fx").length || s.empty.fire()
                    })
                })), t)
                    if (r = t[i], ft.test(r)) {
                        if (delete t[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                            if ("show" !== r || !g || void 0 === g[i]) continue;
                            p = !0
                        }
                        h[i] = g && g[i] || x.style(e, i)
                    }
                if ((l = !x.isEmptyObject(t)) || !x.isEmptyObject(h))
                    for (i in c && 1 === e.nodeType && (n.overflow = [d.overflow, d.overflowX, d.overflowY], null == (u = g && g.display) && (u = X.get(e, "display")), "none" === (c = x.css(e, "display")) && (u ? c = u : (ce([e], !0), u = e.style.display || u, c = x.css(e, "display"), ce([e]))), ("inline" === c || "inline-block" === c && null != u) && "none" === x.css(e, "float") && (l || (f.done(function() {
                        d.display = u
                    }), null == u && (c = d.display, u = "none" === c ? "" : c)), d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function() {
                        d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
                    })), l = !1, h) l || (g ? "hidden" in g && (p = g.hidden) : g = X.access(e, "fxshow", {
                        display: u
                    }), o && (g.hidden = !p), p && ce([e], !0), f.done(function() {
                        for (i in p || ce([e]), X.remove(e, "fxshow"), h) x.style(e, i, h[i])
                    })), l = mt(p ? g[i] : 0, i, f), i in g || (g[i] = l.start, p && (l.end = l.start, l.start = 0))
            }],
            prefilter: function(e, t) {
                t ? vt.prefilters.unshift(e) : vt.prefilters.push(e)
            }
        }), x.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? x.extend({}, e) : {
                complete: n || !n && t || _(e) && e,
                duration: e,
                easing: n && t || t && !_(t) && t
            };
            return x.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in x.fx.speeds ? i.duration = x.fx.speeds[i.duration] : i.duration = x.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                _(i.old) && i.old.call(this), i.queue && x.dequeue(this, i.queue)
            }, i
        }, x.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(se).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(t, e, n, i) {
                var r = x.isEmptyObject(t),
                    o = x.speed(e, n, i),
                    i = function() {
                        var e = vt(this, x.extend({}, t), o);
                        (r || X.get(this, "finish")) && e.stop(!0)
                    };
                return i.finish = i, r || !1 === o.queue ? this.each(i) : this.queue(o.queue, i)
            },
            stop: function(r, e, o) {
                function s(e) {
                    var t = e.stop;
                    delete e.stop, t(o)
                }
                return "string" != typeof r && (o = e, e = r, r = void 0), e && !1 !== r && this.queue(r || "fx", []), this.each(function() {
                    var e = !0,
                        t = null != r && r + "queueHooks",
                        n = x.timers,
                        i = X.get(this);
                    if (t) i[t] && i[t].stop && s(i[t]);
                    else
                        for (t in i) i[t] && i[t].stop && ht.test(t) && s(i[t]);
                    for (t = n.length; t--;) n[t].elem !== this || null != r && n[t].queue !== r || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                    !e && o || x.dequeue(this, r)
                })
            },
            finish: function(s) {
                return !1 !== s && (s = s || "fx"), this.each(function() {
                    var e, t = X.get(this),
                        n = t[s + "queue"],
                        i = t[s + "queueHooks"],
                        r = x.timers,
                        o = n ? n.length : 0;
                    for (t.finish = !0, x.queue(this, s, []), i && i.stop && i.stop.call(this, !0), e = r.length; e--;) r[e].elem === this && r[e].queue === s && (r[e].anim.stop(!0), r.splice(e, 1));
                    for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete t.finish
                })
            }
        }), x.each(["toggle", "show", "hide"], function(e, i) {
            var r = x.fn[i];
            x.fn[i] = function(e, t, n) {
                return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(gt(i, !0), e, t, n)
            }
        }), x.each({
            slideDown: gt("show"),
            slideUp: gt("hide"),
            slideToggle: gt("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, i) {
            x.fn[e] = function(e, t, n) {
                return this.animate(i, e, t, n)
            }
        }), x.timers = [], x.fx.tick = function() {
            var e, t = 0,
                n = x.timers;
            for (ut = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || x.fx.stop(), ut = void 0
        }, x.fx.timer = function(e) {
            x.timers.push(e), x.fx.start()
        }, x.fx.interval = 13, x.fx.start = function() {
            ct || (ct = !0, dt())
        }, x.fx.stop = function() {
            ct = null
        }, x.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, x.fn.delay = function(i, e) {
            return i = x.fx && x.fx.speeds[i] || i, e = e || "fx", this.queue(e, function(e, t) {
                var n = w.setTimeout(e, i);
                t.stop = function() {
                    w.clearTimeout(n)
                }
            })
        }, t = C.createElement("input"), ee = C.createElement("select").appendChild(C.createElement("option")), t.type = "checkbox", y.checkOn = "" !== t.value, y.optSelected = ee.selected, (t = C.createElement("input")).value = "t", t.type = "radio", y.radioValue = "t" === t.value;
        var yt, _t = x.expr.attrHandle;
        x.fn.extend({
            attr: function(e, t) {
                return B(this, x.attr, e, t, 1 < arguments.length)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    x.removeAttr(this, e)
                })
            }
        }), x.extend({
            attr: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? x.prop(e, t, n) : (1 === o && x.isXMLDoc(e) || (r = x.attrHooks[t.toLowerCase()] || (x.expr.match.bool.test(t) ? yt : void 0)), void 0 !== n ? null === n ? void x.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : !(r && "get" in r && null !== (i = r.get(e, t))) && null == (i = x.find.attr(e, t)) ? void 0 : i)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!y.radioValue && "radio" === t && D(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, i = 0,
                    r = t && t.match(P);
                if (r && 1 === e.nodeType)
                    for (; n = r[i++];) e.removeAttribute(n)
            }
        }), yt = {
            set: function(e, t, n) {
                return !1 === t ? x.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var s = _t[t] || x.find.attr;
            _t[t] = function(e, t, n) {
                var i, r, o = t.toLowerCase();
                return n || (r = _t[o], _t[o] = i, i = null != s(e, t, n) ? o : null, _t[o] = r), i
            }
        });
        var bt = /^(?:input|select|textarea|button)$/i,
            Et = /^(?:a|area)$/i;

        function Tt(e) {
            return (e.match(P) || []).join(" ")
        }

        function wt(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function Ct(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
        }
        x.fn.extend({
            prop: function(e, t) {
                return B(this, x.prop, e, t, 1 < arguments.length)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[x.propFix[e] || e]
                })
            }
        }), x.extend({
            prop: function(e, t, n) {
                var i, r, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && x.isXMLDoc(e) || (t = x.propFix[t] || t, r = x.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = x.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : bt.test(e.nodeName) || Et.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), y.optSelected || (x.propHooks.selected = {
            get: function(e) {
                e = e.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            },
            set: function(e) {
                e = e.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            x.propFix[this.toLowerCase()] = this
        }), x.fn.extend({
            addClass: function(t) {
                var e, n, i, r, o, s, a = 0;
                if (_(t)) return this.each(function(e) {
                    x(this).addClass(t.call(this, e, wt(this)))
                });
                if ((e = Ct(t)).length)
                    for (; n = this[a++];)
                        if (s = wt(n), i = 1 === n.nodeType && " " + Tt(s) + " ") {
                            for (o = 0; r = e[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            s !== (s = Tt(i)) && n.setAttribute("class", s)
                        }
                return this
            },
            removeClass: function(t) {
                var e, n, i, r, o, s, a = 0;
                if (_(t)) return this.each(function(e) {
                    x(this).removeClass(t.call(this, e, wt(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ((e = Ct(t)).length)
                    for (; n = this[a++];)
                        if (s = wt(n), i = 1 === n.nodeType && " " + Tt(s) + " ") {
                            for (o = 0; r = e[o++];)
                                for (; - 1 < i.indexOf(" " + r + " ");) i = i.replace(" " + r + " ", " ");
                            s !== (s = Tt(i)) && n.setAttribute("class", s)
                        }
                return this
            },
            toggleClass: function(r, t) {
                var o = typeof r,
                    s = "string" == o || Array.isArray(r);
                return "boolean" == typeof t && s ? t ? this.addClass(r) : this.removeClass(r) : _(r) ? this.each(function(e) {
                    x(this).toggleClass(r.call(this, e, wt(this), t), t)
                }) : this.each(function() {
                    var e, t, n, i;
                    if (s)
                        for (t = 0, n = x(this), i = Ct(r); e = i[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                    else void 0 !== r && "boolean" != o || ((e = wt(this)) && X.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== r && X.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                for (var t, n = 0, i = " " + e + " "; t = this[n++];)
                    if (1 === t.nodeType && -1 < (" " + Tt(wt(t)) + " ").indexOf(i)) return !0;
                return !1
            }
        });
        var xt = /\r/g;
        x.fn.extend({
            val: function(t) {
                var n, e, i, r = this[0];
                return arguments.length ? (i = _(t), this.each(function(e) {
                    1 === this.nodeType && (null == (e = i ? t.call(this, e, x(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = x.map(e, function(e) {
                        return null == e ? "" : e + ""
                    })), (n = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, e, "value") || (this.value = e))
                })) : r ? (n = x.valHooks[r.type] || x.valHooks[r.nodeName.toLowerCase()]) && "get" in n && void 0 !== (e = n.get(r, "value")) ? e : "string" == typeof(e = r.value) ? e.replace(xt, "") : null == e ? "" : e : void 0
            }
        }), x.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = x.find.attr(e, "value");
                        return null != t ? t : Tt(x.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n = e.options, i = e.selectedIndex, r = "select-one" === e.type, o = r ? null : [], s = r ? i + 1 : n.length, a = i < 0 ? s : r ? i : 0; a < s; a++)
                            if (((t = n[a]).selected || a === i) && !t.disabled && (!t.parentNode.disabled || !D(t.parentNode, "optgroup"))) {
                                if (t = x(t).val(), r) return t;
                                o.push(t)
                            }
                        return o
                    },
                    set: function(e, t) {
                        for (var n, i, r = e.options, o = x.makeArray(t), s = r.length; s--;)((i = r[s]).selected = -1 < x.inArray(x.valHooks.option.get(i), o)) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), x.each(["radio", "checkbox"], function() {
            x.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t)) return e.checked = -1 < x.inArray(x(e).val(), t)
                }
            }, y.checkOn || (x.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), y.focusin = "onfocusin" in w;

        function St(e) {
            e.stopPropagation()
        }
        var Dt = /^(?:focusinfocus|focusoutblur)$/;
        x.extend(x.event, {
            trigger: function(e, t, n, i) {
                var r, o, s, a, l, u, c, f = [n || C],
                    h = v.call(e, "type") ? e.type : e,
                    d = v.call(e, "namespace") ? e.namespace.split(".") : [],
                    p = c = o = n = n || C;
                if (3 !== n.nodeType && 8 !== n.nodeType && !Dt.test(h + x.event.triggered) && (-1 < h.indexOf(".") && (h = (d = h.split(".")).shift(), d.sort()), a = h.indexOf(":") < 0 && "on" + h, (e = e[x.expando] ? e : new x.Event(h, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = d.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : x.makeArray(t, [e]), u = x.event.special[h] || {}, i || !u.trigger || !1 !== u.trigger.apply(n, t))) {
                    if (!i && !u.noBubble && !g(n)) {
                        for (s = u.delegateType || h, Dt.test(s + h) || (p = p.parentNode); p; p = p.parentNode) f.push(p), o = p;
                        o === (n.ownerDocument || C) && f.push(o.defaultView || o.parentWindow || w)
                    }
                    for (r = 0;
                         (p = f[r++]) && !e.isPropagationStopped();) c = p, e.type = 1 < r ? s : u.bindType || h, (l = (X.get(p, "events") || {})[e.type] && X.get(p, "handle")) && l.apply(p, t), (l = a && p[a]) && l.apply && z(p) && (e.result = l.apply(p, t), !1 === e.result && e.preventDefault());
                    return e.type = h, i || e.isDefaultPrevented() || u._default && !1 !== u._default.apply(f.pop(), t) || !z(n) || a && _(n[h]) && !g(n) && ((o = n[a]) && (n[a] = null), x.event.triggered = h, e.isPropagationStopped() && c.addEventListener(h, St), n[h](), e.isPropagationStopped() && c.removeEventListener(h, St), x.event.triggered = void 0, o && (n[a] = o)), e.result
                }
            },
            simulate: function(e, t, n) {
                e = x.extend(new x.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                x.event.trigger(e, null, t)
            }
        }), x.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    x.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return x.event.trigger(e, t, n, !0)
            }
        }), y.focusin || x.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, i) {
            function r(e) {
                x.event.simulate(i, e.target, x.event.fix(e))
            }
            x.event.special[i] = {
                setup: function() {
                    var e = this.ownerDocument || this,
                        t = X.access(e, i);
                    t || e.addEventListener(n, r, !0), X.access(e, i, (t || 0) + 1)
                },
                teardown: function() {
                    var e = this.ownerDocument || this,
                        t = X.access(e, i) - 1;
                    t ? X.access(e, i, t) : (e.removeEventListener(n, r, !0), X.remove(e, i))
                }
            }
        });
        var At = w.location,
            Nt = Date.now(),
            It = /\?/;
        x.parseXML = function(e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
                t = (new w.DOMParser).parseFromString(e, "text/xml")
            } catch (e) {
                t = void 0
            }
            return t && !t.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + e), t
        };
        var kt = /\[\]$/,
            Ot = /\r?\n/g,
            jt = /^(?:submit|button|image|reset|file)$/i,
            Lt = /^(?:input|select|textarea|keygen)/i;
        x.param = function(e, t) {
            function n(e, t) {
                t = _(t) ? t() : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == t ? "" : t)
            }
            var i, r = [];
            if (null == e) return "";
            if (Array.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
                n(this.name, this.value)
            });
            else
                for (i in e) ! function n(i, e, r, o) {
                    if (Array.isArray(e)) x.each(e, function(e, t) {
                        r || kt.test(i) ? o(i, t) : n(i + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, o)
                    });
                    else if (r || "object" !== p(e)) o(i, e);
                    else
                        for (var t in e) n(i + "[" + t + "]", e[t], r, o)
                }(i, e[i], t, n);
            return r.join("&")
        }, x.fn.extend({
            serialize: function() {
                return x.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = x.prop(this, "elements");
                    return e ? x.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !x(this).is(":disabled") && Lt.test(this.nodeName) && !jt.test(e) && (this.checked || !fe.test(e))
                }).map(function(e, t) {
                    var n = x(this).val();
                    return null == n ? null : Array.isArray(n) ? x.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Ot, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Ot, "\r\n")
                    }
                }).get()
            }
        });
        var Pt = /%20/g,
            Ht = /#.*$/,
            qt = /([?&])_=[^&]*/,
            Rt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Mt = /^(?:GET|HEAD)$/,
            Wt = /^\/\//,
            Ft = {},
            Bt = {},
            Ut = "*/".concat("*"),
            Kt = C.createElement("a");

        function $t(o) {
            return function(e, t) {
                "string" != typeof e && (t = e, e = "*");
                var n, i = 0,
                    r = e.toLowerCase().match(P) || [];
                if (_(t))
                    for (; n = r[i++];) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
            }
        }

        function Qt(t, i, r, o) {
            var s = {},
                a = t === Bt;

            function l(e) {
                var n;
                return s[e] = !0, x.each(t[e] || [], function(e, t) {
                    t = t(i, r, o);
                    return "string" != typeof t || a || s[t] ? a ? !(n = t) : void 0 : (i.dataTypes.unshift(t), l(t), !1)
                }), n
            }
            return l(i.dataTypes[0]) || !s["*"] && l("*")
        }

        function zt(e, t) {
            var n, i, r = x.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((r[n] ? e : i = i || {})[n] = t[n]);
            return i && x.extend(!0, e, i), e
        }
        Kt.href = At.href, x.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: At.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(At.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ut,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": x.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? zt(zt(e, x.ajaxSettings), t) : zt(x.ajaxSettings, e)
            },
            ajaxPrefilter: $t(Ft),
            ajaxTransport: $t(Bt),
            ajax: function(e, t) {
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var l, u, c, n, f, i, h, d, r, o, p = x.ajaxSetup({}, t),
                    g = p.context || p,
                    m = p.context && (g.nodeType || g.jquery) ? x(g) : x.event,
                    v = x.Deferred(),
                    y = x.Callbacks("once memory"),
                    _ = p.statusCode || {},
                    s = {},
                    a = {},
                    b = "canceled",
                    E = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (h) {
                                if (!n)
                                    for (n = {}; t = Rt.exec(c);) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = n[e.toLowerCase() + " "]
                            }
                            return null == t ? null : t.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return h ? c : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == h && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e, s[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == h && (p.mimeType = e), this
                        },
                        statusCode: function(e) {
                            if (e)
                                if (h) E.always(e[E.status]);
                                else
                                    for (var t in e) _[t] = [_[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            e = e || b;
                            return l && l.abort(e), T(0, e), this
                        }
                    };
                if (v.promise(E), p.url = ((e || p.url || At.href) + "").replace(Wt, At.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(P) || [""], null == p.crossDomain) {
                    i = C.createElement("a");
                    try {
                        i.href = p.url, i.href = i.href, p.crossDomain = Kt.protocol + "//" + Kt.host != i.protocol + "//" + i.host
                    } catch (e) {
                        p.crossDomain = !0
                    }
                }
                if (p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), Qt(Ft, p, t, E), h) return E;
                for (r in (d = x.event && p.global) && 0 == x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Mt.test(p.type), u = p.url.replace(Ht, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Pt, "+")) : (o = p.url.slice(u.length), p.data && (p.processData || "string" == typeof p.data) && (u += (It.test(u) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (u = u.replace(qt, "$1"), o = (It.test(u) ? "&" : "?") + "_=" + Nt++ + o), p.url = u + o), p.ifModified && (x.lastModified[u] && E.setRequestHeader("If-Modified-Since", x.lastModified[u]), x.etag[u] && E.setRequestHeader("If-None-Match", x.etag[u])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && E.setRequestHeader("Content-Type", p.contentType), E.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Ut + "; q=0.01" : "") : p.accepts["*"]), p.headers) E.setRequestHeader(r, p.headers[r]);
                if (p.beforeSend && (!1 === p.beforeSend.call(g, E, p) || h)) return E.abort();
                if (b = "abort", y.add(p.complete), E.done(p.success), E.fail(p.error), l = Qt(Bt, p, t, E)) {
                    if (E.readyState = 1, d && m.trigger("ajaxSend", [E, p]), h) return E;
                    p.async && 0 < p.timeout && (f = w.setTimeout(function() {
                        E.abort("timeout")
                    }, p.timeout));
                    try {
                        h = !1, l.send(s, T)
                    } catch (e) {
                        if (h) throw e;
                        T(-1, e)
                    }
                } else T(-1, "No Transport");

                function T(e, t, n, i) {
                    var r, o, s, a = t;
                    h || (h = !0, f && w.clearTimeout(f), l = void 0, c = i || "", E.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function(e, t, n) {
                        for (var i, r, o, s, a = e.contents, l = e.dataTypes;
                             "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (i)
                            for (r in a)
                                if (a[r] && a[r].test(i)) {
                                    l.unshift(r);
                                    break
                                }
                        if (l[0] in n) o = l[0];
                        else {
                            for (r in n) {
                                if (!l[0] || e.converters[r + " " + l[0]]) {
                                    o = r;
                                    break
                                }
                                s = s || r
                            }
                            o = o || s
                        }
                        if (o) return o !== l[0] && l.unshift(o), n[o]
                    }(p, E, n)), s = function(e, t, n, i) {
                        var r, o, s, a, l, u = {},
                            c = e.dataTypes.slice();
                        if (c[1])
                            for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
                        for (o = c.shift(); o;)
                            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                                if ("*" === o) o = l;
                                else if ("*" !== l && l !== o) {
                                    if (!(s = u[l + " " + o] || u["* " + o]))
                                        for (r in u)
                                            if ((a = r.split(" "))[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                                                !0 === s ? s = u[r] : !0 !== u[r] && (o = a[0], c.unshift(a[1]));
                                                break
                                            }
                                    if (!0 !== s)
                                        if (s && e.throws) t = s(t);
                                        else try {
                                            t = s(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: s ? e : "No conversion from " + l + " to " + o
                                            }
                                        }
                                }
                        return {
                            state: "success",
                            data: t
                        }
                    }(p, s, E, i), i ? (p.ifModified && ((n = E.getResponseHeader("Last-Modified")) && (x.lastModified[u] = n), (n = E.getResponseHeader("etag")) && (x.etag[u] = n)), 204 === e || "HEAD" === p.type ? a = "nocontent" : 304 === e ? a = "notmodified" : (a = s.state, r = s.data, i = !(o = s.error))) : (o = a, !e && a || (a = "error", e < 0 && (e = 0))), E.status = e, E.statusText = (t || a) + "", i ? v.resolveWith(g, [r, a, E]) : v.rejectWith(g, [E, a, o]), E.statusCode(_), _ = void 0, d && m.trigger(i ? "ajaxSuccess" : "ajaxError", [E, p, i ? r : o]), y.fireWith(g, [E, a]), d && (m.trigger("ajaxComplete", [E, p]), --x.active || x.event.trigger("ajaxStop")))
                }
                return E
            },
            getJSON: function(e, t, n) {
                return x.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return x.get(e, void 0, t, "script")
            }
        }), x.each(["get", "post"], function(e, r) {
            x[r] = function(e, t, n, i) {
                return _(t) && (i = i || n, n = t, t = void 0), x.ajax(x.extend({
                    url: e,
                    type: r,
                    dataType: i,
                    data: t,
                    success: n
                }, x.isPlainObject(e) && e))
            }
        }), x._evalUrl = function(e, t) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(e) {
                    x.globalEval(e, t)
                }
            })
        }, x.fn.extend({
            wrapAll: function(e) {
                return this[0] && (_(e) && (e = e.call(this[0])), e = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            },
            wrapInner: function(n) {
                return _(n) ? this.each(function(e) {
                    x(this).wrapInner(n.call(this, e))
                }) : this.each(function() {
                    var e = x(this),
                        t = e.contents();
                    t.length ? t.wrapAll(n) : e.append(n)
                })
            },
            wrap: function(t) {
                var n = _(t);
                return this.each(function(e) {
                    x(this).wrapAll(n ? t.call(this, e) : t)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    x(this).replaceWith(this.childNodes)
                }), this
            }
        }), x.expr.pseudos.hidden = function(e) {
            return !x.expr.pseudos.visible(e)
        }, x.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, x.ajaxSettings.xhr = function() {
            try {
                return new w.XMLHttpRequest
            } catch (e) {}
        };
        var Vt = {
                0: 200,
                1223: 204
            },
            Xt = x.ajaxSettings.xhr();
        y.cors = !!Xt && "withCredentials" in Xt, y.ajax = Xt = !!Xt, x.ajaxTransport(function(r) {
            var o, s;
            if (y.cors || Xt && !r.crossDomain) return {
                send: function(e, t) {
                    var n, i = r.xhr();
                    if (i.open(r.type, r.url, r.async, r.username, r.password), r.xhrFields)
                        for (n in r.xhrFields) i[n] = r.xhrFields[n];
                    for (n in r.mimeType && i.overrideMimeType && i.overrideMimeType(r.mimeType), r.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) i.setRequestHeader(n, e[n]);
                    o = function(e) {
                        return function() {
                            o && (o = s = i.onload = i.onerror = i.onabort = i.ontimeout = i.onreadystatechange = null, "abort" === e ? i.abort() : "error" === e ? "number" != typeof i.status ? t(0, "error") : t(i.status, i.statusText) : t(Vt[i.status] || i.status, i.statusText, "text" !== (i.responseType || "text") || "string" != typeof i.responseText ? {
                                binary: i.response
                            } : {
                                text: i.responseText
                            }, i.getAllResponseHeaders()))
                        }
                    }, i.onload = o(), s = i.onerror = i.ontimeout = o("error"), void 0 !== i.onabort ? i.onabort = s : i.onreadystatechange = function() {
                        4 === i.readyState && w.setTimeout(function() {
                            o && s()
                        })
                    }, o = o("abort");
                    try {
                        i.send(r.hasContent && r.data || null)
                    } catch (e) {
                        if (o) throw e
                    }
                },
                abort: function() {
                    o && o()
                }
            }
        }), x.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }), x.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return x.globalEval(e), e
                }
            }
        }), x.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), x.ajaxTransport("script", function(n) {
            var i, r;
            if (n.crossDomain || n.scriptAttrs) return {
                send: function(e, t) {
                    i = x("<script>").attr(n.scriptAttrs || {}).prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", r = function(e) {
                        i.remove(), r = null, e && t("error" === e.type ? 404 : 200, e.type)
                    }), C.head.appendChild(i[0])
                },
                abort: function() {
                    r && r()
                }
            }
        });
        var Yt = [],
            Gt = /(=)\?(?=&|$)|\?\?/;
        x.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Yt.pop() || x.expando + "_" + Nt++;
                return this[e] = !0, e
            }
        }), x.ajaxPrefilter("json jsonp", function(e, t, n) {
            var i, r, o, s = !1 !== e.jsonp && (Gt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Gt.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = _(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Gt, "$1" + i) : !1 !== e.jsonp && (e.url += (It.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                return o || x.error(i + " was not called"), o[0]
            }, e.dataTypes[0] = "json", r = w[i], w[i] = function() {
                o = arguments
            }, n.always(function() {
                void 0 === r ? x(w).removeProp(i) : w[i] = r, e[i] && (e.jsonpCallback = t.jsonpCallback, Yt.push(i)), o && _(r) && r(o[0]), o = r = void 0
            }), "script"
        }), y.createHTMLDocument = ((t = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === t.childNodes.length), x.parseHTML = function(e, t, n) {
            return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((i = (t = C.implementation.createHTMLDocument("")).createElement("base")).href = C.location.href, t.head.appendChild(i)) : t = C), i = !n && [], (n = A.exec(e)) ? [t.createElement(n[1])] : (n = ye([e], t, i), i && i.length && x(i).remove(), x.merge([], n.childNodes)));
            var i
        }, x.fn.load = function(e, t, n) {
            var i, r, o, s = this,
                a = e.indexOf(" ");
            return -1 < a && (i = Tt(e.slice(a)), e = e.slice(0, a)), _(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), 0 < s.length && x.ajax({
                url: e,
                type: r || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e)
            }).always(n && function(e, t) {
                s.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            x.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), x.expr.pseudos.animated = function(t) {
            return x.grep(x.timers, function(e) {
                return t === e.elem
            }).length
        }, x.offset = {
            setOffset: function(e, t, n) {
                var i, r, o, s, a = x.css(e, "position"),
                    l = x(e),
                    u = {};
                "static" === a && (e.style.position = "relative"), o = l.offset(), i = x.css(e, "top"), s = x.css(e, "left"), s = ("absolute" === a || "fixed" === a) && -1 < (i + s).indexOf("auto") ? (r = (a = l.position()).top, a.left) : (r = parseFloat(i) || 0, parseFloat(s) || 0), _(t) && (t = t.call(e, n, x.extend({}, o))), null != t.top && (u.top = t.top - o.top + r), null != t.left && (u.left = t.left - o.left + s), "using" in t ? t.using.call(e, u) : l.css(u)
            }
        }, x.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    x.offset.setOffset(this, t, e)
                });
                var e, n = this[0];
                return n ? n.getClientRects().length ? (e = n.getBoundingClientRect(), n = n.ownerDocument.defaultView, {
                    top: e.top + n.pageYOffset,
                    left: e.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n, i = this[0],
                        r = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === x.css(i, "position")) t = i.getBoundingClientRect();
                    else {
                        for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === x.css(e, "position");) e = e.parentNode;
                        e && e !== i && 1 === e.nodeType && ((r = x(e).offset()).top += x.css(e, "borderTopWidth", !0), r.left += x.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - r.top - x.css(i, "marginTop", !0),
                        left: t.left - r.left - x.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === x.css(e, "position");) e = e.offsetParent;
                    return e || ie
                })
            }
        }), x.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, r) {
            var o = "pageYOffset" === r;
            x.fn[t] = function(e) {
                return B(this, function(e, t, n) {
                    var i;
                    return g(e) ? i = e : 9 === e.nodeType && (i = e.defaultView), void 0 === n ? i ? i[r] : e[t] : void(i ? i.scrollTo(o ? i.pageXOffset : n, o ? n : i.pageYOffset) : e[t] = n)
                }, t, e, arguments.length)
            }
        }), x.each(["top", "left"], function(e, n) {
            x.cssHooks[n] = Ve(y.pixelPosition, function(e, t) {
                if (t) return t = ze(e, n), Ke.test(t) ? x(e).position()[n] + "px" : t
            })
        }), x.each({
            Height: "height",
            Width: "width"
        }, function(s, a) {
            x.each({
                padding: "inner" + s,
                content: a,
                "": "outer" + s
            }, function(i, o) {
                x.fn[o] = function(e, t) {
                    var n = arguments.length && (i || "boolean" != typeof e),
                        r = i || (!0 === e || !0 === t ? "margin" : "border");
                    return B(this, function(e, t, n) {
                        var i;
                        return g(e) ? 0 === o.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + s], i["scroll" + s], e.body["offset" + s], i["offset" + s], i["client" + s])) : void 0 === n ? x.css(e, t, r) : x.style(e, t, n, r)
                    }, a, n ? e : void 0, n)
                }
            })
        }), x.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
            x.fn[n] = function(e, t) {
                return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
            }
        }), x.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), x.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), x.proxy = function(e, t) {
            var n, i;
            if ("string" == typeof t && (i = e[t], t = e, e = i), _(e)) return n = a.call(arguments, 2), (i = function() {
                return e.apply(t || this, n.concat(a.call(arguments)))
            }).guid = e.guid = e.guid || x.guid++, i
        }, x.holdReady = function(e) {
            e ? x.readyWait++ : x.ready(!0)
        }, x.isArray = Array.isArray, x.parseJSON = JSON.parse, x.nodeName = D, x.isFunction = _, x.isWindow = g, x.camelCase = Q, x.type = p, x.now = Date.now, x.isNumeric = function(e) {
            var t = x.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }, "function" == typeof define && define.amd && define("jquery", [], function() {
            return x
        });
        var Jt = w.jQuery,
            Zt = w.$;
        return x.noConflict = function(e) {
            return w.$ === x && (w.$ = Zt), e && w.jQuery === x && (w.jQuery = Jt), x
        }, e || (w.jQuery = w.$ = x), x
    });