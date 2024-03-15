window['startup'] = function() {
    googleapis.server.init();
  };
gapi.loaded_0(function (_) {
    var window = this;
    _._F_toggles_initialize = function (a) {
        ("undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof self ? self : this)._F_toggles = a || []
    };
    (0, _._F_toggles_initialize)([]);
    var fa, ka, ma, ra, sa, wa, Ca, Ea;
    _.ea = function (a) {
        return function () {
            return _.da[a].apply(this, arguments)
        }
    };
    _.da = [];
    fa = function (a) {
        var b = 0;
        return function () {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    };
    ka = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };
    ma = function (a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("a");
    };
    _.na = ma(this);
    ra = function (a, b) {
        if (b) a: {
            var c = _.na;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ka(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    };
    ra("Symbol", function (a) {
        if (a) return a;
        var b = function (f, h) {
            this.z1 = f;
            ka(this, "description", {
                configurable: !0,
                writable: !0,
                value: h
            })
        };
        b.prototype.toString = function () {
            return this.z1
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            d = 0,
            e = function (f) {
                if (this instanceof e) throw new TypeError("Symbol is not a constructor");
                return new b(c + (f || "") + "_" + d++, f)
            };
        return e
    });
    ra("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = _.na[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ka(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return sa(fa(this))
                }
            })
        }
        return a
    });
    sa = function (a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function () {
            return this
        };
        return a
    };
    _.va = function (a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b) return b.call(a);
        if ("number" == typeof a.length) return {
            next: fa(a)
        };
        throw Error("b`" + String(a));
    };
    wa = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    Ca = "function" == typeof Object.assign ? Object.assign : function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d) wa(d, e) && (a[e] = d[e])
        }
        return a
    };
    ra("Object.assign", function (a) {
        return a || Ca
    });
    _.Da = "function" == typeof Object.create ? Object.create : function (a) {
        var b = function () {};
        b.prototype = a;
        return new b
    };
    if ("function" == typeof Object.setPrototypeOf) Ea = Object.setPrototypeOf;
    else {
        var Fa;
        a: {
            var Ga = {
                    a: !0
                },
                Ha = {};
            try {
                Ha.__proto__ = Ga;
                Fa = Ha.a;
                break a
            } catch (a) {}
            Fa = !1
        }
        Ea = Fa ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    _.Ia = Ea;
    ra("Promise", function (a) {
        function b() {
            this.Nf = null
        }

        function c(h) {
            return h instanceof e ? h : new e(function (k) {
                k(h)
            })
        }
        if (a) return a;
        b.prototype.JP = function (h) {
            if (null == this.Nf) {
                this.Nf = [];
                var k = this;
                this.KP(function () {
                    k.G7()
                })
            }
            this.Nf.push(h)
        };
        var d = _.na.setTimeout;
        b.prototype.KP = function (h) {
            d(h, 0)
        };
        b.prototype.G7 = function () {
            for (; this.Nf && this.Nf.length;) {
                var h = this.Nf;
                this.Nf = [];
                for (var k = 0; k < h.length; ++k) {
                    var l = h[k];
                    h[k] = null;
                    try {
                        l()
                    } catch (m) {
                        this.yq(m)
                    }
                }
            }
            this.Nf = null
        };
        b.prototype.yq = function (h) {
            this.KP(function () {
                throw h;
            })
        };
        var e = function (h) {
            this.Fa = 0;
            this.Cf = void 0;
            this.Yr = [];
            this.LV = !1;
            var k = this.LF();
            try {
                h(k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        };
        e.prototype.LF = function () {
            function h(m) {
                return function (n) {
                    l || (l = !0, m.call(k, n))
                }
            }
            var k = this,
                l = !1;
            return {
                resolve: h(this.eea),
                reject: h(this.pK)
            }
        };
        e.prototype.eea = function (h) {
            if (h === this) this.pK(new TypeError("A Promise cannot resolve to itself"));
            else if (h instanceof e) this.Gfa(h);
            else {
                a: switch (typeof h) {
                    case "object":
                        var k = null != h;
                        break a;
                    case "function":
                        k = !0;
                        break a;
                    default:
                        k = !1
                }
                k ? this.dea(h) : this.QS(h)
            }
        };
        e.prototype.dea = function (h) {
            var k = void 0;
            try {
                k = h.then
            } catch (l) {
                this.pK(l);
                return
            }
            "function" == typeof k ? this.Hfa(k, h) : this.QS(h)
        };
        e.prototype.pK = function (h) {
            this.t_(2, h)
        };
        e.prototype.QS = function (h) {
            this.t_(1, h)
        };
        e.prototype.t_ = function (h, k) {
            if (0 != this.Fa) throw Error("c`" + h + "`" + k + "`" + this.Fa);
            this.Fa = h;
            this.Cf = k;
            2 === this.Fa && this.tea();
            this.H7()
        };
        e.prototype.tea = function () {
            var h = this;
            d(function () {
                    if (h.jca()) {
                        var k = _.na.console;
                        "undefined" !== typeof k && k.error(h.Cf)
                    }
                },
                1)
        };
        e.prototype.jca = function () {
            if (this.LV) return !1;
            var h = _.na.CustomEvent,
                k = _.na.Event,
                l = _.na.dispatchEvent;
            if ("undefined" === typeof l) return !0;
            "function" === typeof h ? h = new h("unhandledrejection", {
                cancelable: !0
            }) : "function" === typeof k ? h = new k("unhandledrejection", {
                cancelable: !0
            }) : (h = _.na.document.createEvent("CustomEvent"), h.initCustomEvent("unhandledrejection", !1, !0, h));
            h.promise = this;
            h.reason = this.Cf;
            return l(h)
        };
        e.prototype.H7 = function () {
            if (null != this.Yr) {
                for (var h = 0; h < this.Yr.length; ++h) f.JP(this.Yr[h]);
                this.Yr = null
            }
        };
        var f = new b;
        e.prototype.Gfa = function (h) {
            var k = this.LF();
            h.Dy(k.resolve, k.reject)
        };
        e.prototype.Hfa = function (h, k) {
            var l = this.LF();
            try {
                h.call(k, l.resolve, l.reject)
            } catch (m) {
                l.reject(m)
            }
        };
        e.prototype.then = function (h, k) {
            function l(q, t) {
                return "function" == typeof q ? function (v) {
                    try {
                        m(q(v))
                    } catch (u) {
                        n(u)
                    }
                } : t
            }
            var m, n, p = new e(function (q, t) {
                m = q;
                n = t
            });
            this.Dy(l(h, m), l(k, n));
            return p
        };
        e.prototype.catch = function (h) {
            return this.then(void 0, h)
        };
        e.prototype.Dy = function (h, k) {
            function l() {
                switch (m.Fa) {
                    case 1:
                        h(m.Cf);
                        break;
                    case 2:
                        k(m.Cf);
                        break;
                    default:
                        throw Error("d`" + m.Fa);
                }
            }
            var m = this;
            null == this.Yr ? f.JP(l) : this.Yr.push(l);
            this.LV = !0
        };
        e.resolve = c;
        e.reject = function (h) {
            return new e(function (k, l) {
                l(h)
            })
        };
        e.race = function (h) {
            return new e(function (k, l) {
                for (var m = _.va(h), n = m.next(); !n.done; n = m.next()) c(n.value).Dy(k, l)
            })
        };
        e.all = function (h) {
            var k = _.va(h),
                l = k.next();
            return l.done ? c([]) : new e(function (m, n) {
                function p(v) {
                    return function (u) {
                        q[v] = u;
                        t--;
                        0 == t && m(q)
                    }
                }
                var q = [],
                    t = 0;
                do q.push(void 0), t++, c(l.value).Dy(p(q.length -
                    1), n), l = k.next(); while (!l.done)
            })
        };
        return e
    });
    var Ka = function (a, b, c) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    };
    ra("String.prototype.startsWith", function (a) {
        return a ? a : function (b, c) {
            var d = Ka(this, b, "startsWith"),
                e = d.length,
                f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var h = 0; h < f && c < e;)
                if (d[c++] != b[h++]) return !1;
            return h >= f
        }
    });
    ra("WeakMap", function (a) {
        function b() {}

        function c(l) {
            var m = typeof l;
            return "object" === m && null !== l || "function" === m
        }

        function d(l) {
            if (!wa(l, f)) {
                var m = new b;
                ka(l, f, {
                    value: m
                })
            }
        }

        function e(l) {
            var m = Object[l];
            m && (Object[l] = function (n) {
                if (n instanceof b) return n;
                Object.isExtensible(n) && d(n);
                return m(n)
            })
        }
        if (function () {
                if (!a || !Object.seal) return !1;
                try {
                    var l = Object.seal({}),
                        m = Object.seal({}),
                        n = new a([
                            [l, 2],
                            [m, 3]
                        ]);
                    if (2 != n.get(l) || 3 != n.get(m)) return !1;
                    n.delete(l);
                    n.set(m, 4);
                    return !n.has(l) && 4 == n.get(m)
                } catch (p) {
                    return !1
                }
            }()) return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var h = 0,
            k = function (l) {
                this.Ga = (h += Math.random() + 1).toString();
                if (l) {
                    l = _.va(l);
                    for (var m; !(m = l.next()).done;) m = m.value, this.set(m[0], m[1])
                }
            };
        k.prototype.set = function (l, m) {
            if (!c(l)) throw Error("e");
            d(l);
            if (!wa(l, f)) throw Error("f`" + l);
            l[f][this.Ga] = m;
            return this
        };
        k.prototype.get = function (l) {
            return c(l) && wa(l, f) ? l[f][this.Ga] : void 0
        };
        k.prototype.has = function (l) {
            return c(l) && wa(l, f) && wa(l[f], this.Ga)
        };
        k.prototype.delete =
            function (l) {
                return c(l) && wa(l, f) && wa(l[f], this.Ga) ? delete l[f][this.Ga] : !1
            };
        return k
    });
    ra("Map", function (a) {
        if (function () {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var k = Object.seal({
                            x: 4
                        }),
                        l = new a(_.va([
                            [k, "s"]
                        ]));
                    if ("s" != l.get(k) || 1 != l.size || l.get({
                            x: 4
                        }) || l.set({
                            x: 4
                        }, "t") != l || 2 != l.size) return !1;
                    var m = l.entries(),
                        n = m.next();
                    if (n.done || n.value[0] != k || "s" != n.value[1]) return !1;
                    n = m.next();
                    return n.done || 4 != n.value[0].x || "t" != n.value[1] || !m.next().done ? !1 : !0
                } catch (p) {
                    return !1
                }
            }()) return a;
        var b = new WeakMap,
            c = function (k) {
                this[0] = {};
                this[1] =
                    f();
                this.size = 0;
                if (k) {
                    k = _.va(k);
                    for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
                }
            };
        c.prototype.set = function (k, l) {
            k = 0 === k ? 0 : k;
            var m = d(this, k);
            m.list || (m.list = this[0][m.id] = []);
            m.hf ? m.hf.value = l : (m.hf = {
                next: this[1],
                dl: this[1].dl,
                head: this[1],
                key: k,
                value: l
            }, m.list.push(m.hf), this[1].dl.next = m.hf, this[1].dl = m.hf, this.size++);
            return this
        };
        c.prototype.delete = function (k) {
            k = d(this, k);
            return k.hf && k.list ? (k.list.splice(k.index, 1), k.list.length || delete this[0][k.id], k.hf.dl.next = k.hf.next, k.hf.next.dl =
                k.hf.dl, k.hf.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function () {
            this[0] = {};
            this[1] = this[1].dl = f();
            this.size = 0
        };
        c.prototype.has = function (k) {
            return !!d(this, k).hf
        };
        c.prototype.get = function (k) {
            return (k = d(this, k).hf) && k.value
        };
        c.prototype.entries = function () {
            return e(this, function (k) {
                return [k.key, k.value]
            })
        };
        c.prototype.keys = function () {
            return e(this, function (k) {
                return k.key
            })
        };
        c.prototype.values = function () {
            return e(this, function (k) {
                return k.value
            })
        };
        c.prototype.forEach = function (k, l) {
            for (var m = this.entries(),
                    n; !(n = m.next()).done;) n = n.value, k.call(l, n[1], n[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function (k, l) {
                var m = l && typeof l;
                "object" == m || "function" == m ? b.has(l) ? m = b.get(l) : (m = "" + ++h, b.set(l, m)) : m = "p_" + l;
                var n = k[0][m];
                if (n && wa(k[0], m))
                    for (k = 0; k < n.length; k++) {
                        var p = n[k];
                        if (l !== l && p.key !== p.key || l === p.key) return {
                            id: m,
                            list: n,
                            index: k,
                            hf: p
                        }
                    }
                return {
                    id: m,
                    list: n,
                    index: -1,
                    hf: void 0
                }
            },
            e = function (k, l) {
                var m = k[1];
                return sa(function () {
                    if (m) {
                        for (; m.head != k[1];) m = m.dl;
                        for (; m.next != m.head;) return m =
                            m.next, {
                                done: !1,
                                value: l(m)
                            };
                        m = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            },
            f = function () {
                var k = {};
                return k.dl = k.next = k.head = k
            },
            h = 0;
        return c
    });
    ra("Array.prototype.find", function (a) {
        return a ? a : function (b, c) {
            a: {
                var d = this;d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var h = d[f];
                    if (b.call(c, h, f, d)) {
                        b = h;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    ra("Number.isFinite", function (a) {
        return a ? a : function (b) {
            return "number" !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b
        }
    });
    ra("String.prototype.repeat", function (a) {
        return a ? a : function (b) {
            var c = Ka(this, null, "repeat");
            if (0 > b || 1342177279 < b) throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b;)
                if (b & 1 && (d += c), b >>>= 1) c += c;
            return d
        }
    });
    var Na = function (a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function () {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function () {
            return e
        };
        return e
    };
    ra("Array.prototype.entries", function (a) {
        return a ? a : function () {
            return Na(this, function (b, c) {
                return [b, c]
            })
        }
    });
    ra("Array.prototype.keys", function (a) {
        return a ? a : function () {
            return Na(this, function (b) {
                return b
            })
        }
    });
    ra("Set", function (a) {
        if (function () {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var c = Object.seal({
                            x: 4
                        }),
                        d = new a(_.va([c]));
                    if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                            x: 4
                        }) != d || 2 != d.size) return !1;
                    var e = d.entries(),
                        f = e.next();
                    if (f.done || f.value[0] != c || f.value[1] != c) return !1;
                    f = e.next();
                    return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
                } catch (h) {
                    return !1
                }
            }()) return a;
        var b = function (c) {
            this.Ca = new Map;
            if (c) {
                c =
                    _.va(c);
                for (var d; !(d = c.next()).done;) this.add(d.value)
            }
            this.size = this.Ca.size
        };
        b.prototype.add = function (c) {
            c = 0 === c ? 0 : c;
            this.Ca.set(c, c);
            this.size = this.Ca.size;
            return this
        };
        b.prototype.delete = function (c) {
            c = this.Ca.delete(c);
            this.size = this.Ca.size;
            return c
        };
        b.prototype.clear = function () {
            this.Ca.clear();
            this.size = 0
        };
        b.prototype.has = function (c) {
            return this.Ca.has(c)
        };
        b.prototype.entries = function () {
            return this.Ca.entries()
        };
        b.prototype.values = function () {
            return this.Ca.values()
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function (c, d) {
            var e = this;
            this.Ca.forEach(function (f) {
                return c.call(d, f, f, e)
            })
        };
        return b
    });
    ra("Array.prototype.values", function (a) {
        return a ? a : function () {
            return Na(this, function (b, c) {
                return c
            })
        }
    });
    ra("Array.from", function (a) {
        return a ? a : function (b, c, d) {
            c = null != c ? c : function (k) {
                return k
            };
            var e = [],
                f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var h = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, h++))
            } else
                for (f = b.length, h = 0; h < f; h++) e.push(c.call(d, b[h], h));
            return e
        }
    });
    ra("Object.entries", function (a) {
        return a ? a : function (b) {
            var c = [],
                d;
            for (d in b) wa(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    ra("Object.values", function (a) {
        return a ? a : function (b) {
            var c = [],
                d;
            for (d in b) wa(b, d) && c.push(b[d]);
            return c
        }
    });
    ra("Object.is", function (a) {
        return a ? a : function (b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    ra("Array.prototype.includes", function (a) {
        return a ? a : function (b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    ra("String.prototype.includes", function (a) {
        return a ? a : function (b, c) {
            return -1 !== Ka(this, b, "includes").indexOf(b, c || 0)
        }
    });
    ra("Array.prototype.flat", function (a) {
        return a ? a : function (b) {
            b = void 0 === b ? 1 : b;
            var c = [];
            Array.prototype.forEach.call(this, function (d) {
                Array.isArray(d) && 0 < b ? (d = Array.prototype.flat.call(d, b - 1), c.push.apply(c, d)) : c.push(d)
            });
            return c
        }
    });
    ra("Math.trunc", function (a) {
        return a ? a : function (b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b) return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c
        }
    });
    ra("Number.MAX_SAFE_INTEGER", function () {
        return 9007199254740991
    });
    ra("Number.isInteger", function (a) {
        return a ? a : function (b) {
            return Number.isFinite(b) ? b === Math.floor(b) : !1
        }
    });
    ra("Number.isSafeInteger", function (a) {
        return a ? a : function (b) {
            return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER
        }
    });
    ra("Number.isNaN", function (a) {
        return a ? a : function (b) {
            return "number" === typeof b && isNaN(b)
        }
    });
    ra("String.prototype.replaceAll", function (a) {
        return a ? a : function (b, c) {
            if (b instanceof RegExp && !b.global) throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument.");
            return b instanceof RegExp ? this.replace(b, c) : this.replace(new RegExp(String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"), "g"), c)
        }
    });
    ra("globalThis", function (a) {
        return a || _.na
    });
    ra("Math.imul", function (a) {
        return a ? a : function (b, c) {
            b = Number(b);
            c = Number(c);
            var d = b & 65535,
                e = c & 65535;
            return d * e + ((b >>> 16 & 65535) * e + d * (c >>> 16 & 65535) << 16 >>> 0) | 0
        }
    });
    ra("String.fromCodePoint", function (a) {
        return a ? a : function (b) {
            for (var c = "", d = 0; d < arguments.length; d++) {
                var e = Number(arguments[d]);
                if (0 > e || 1114111 < e || e !== Math.floor(e)) throw new RangeError("invalid_code_point " + e);
                65535 >= e ? c += String.fromCharCode(e) : (e -= 65536, c += String.fromCharCode(e >>> 10 & 1023 | 55296), c += String.fromCharCode(e & 1023 | 56320))
            }
            return c
        }
    });
    ra("Promise.prototype.finally", function (a) {
        return a ? a : function (b) {
            return this.then(function (c) {
                return Promise.resolve(b()).then(function () {
                    return c
                })
            }, function (c) {
                return Promise.resolve(b()).then(function () {
                    throw c;
                })
            })
        }
    });
    ra("String.prototype.padStart", function (a) {
        return a ? a : function (b, c) {
            var d = Ka(this, null, "padStart");
            b -= d.length;
            c = void 0 !== c ? String(c) : " ";
            return (0 < b && c ? c.repeat(Math.ceil(b / c.length)).substring(0, b) : "") + d
        }
    });
    _.Qa = {};
    /*
        
         Copyright The Closure Library Authors.
         SPDX-License-Identifier: Apache-2.0
        */
    _.Ta = _.Ta || {};
    _.r = this || self;
    _.Va = _.r._F_toggles || [];
    _.Wa = "closure_uid_" + (1E9 * Math.random() >>> 0);
    _.$a = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    };
    _.C = function (a, b) {
        a = a.split(".");
        var c = _.r;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b
    };
    _.ab = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.N = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Dt = function (d, e, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k];
            return b.prototype[e].apply(d, h)
        }
    };
    _.bb = window.osapi = window.osapi || {};
    window.___jsl = window.___jsl || {};
    (window.___jsl.cd = window.___jsl.cd || []).push({
        gwidget: {
            parsetags: "explicit"
        },
        appsapi: {
            plus_one_service: "/plus/v1"
        },
        csi: {
            rate: .01
        },
        poshare: {
            hangoutContactPickerServer: "https://plus.google.com"
        },
        gappsutil: {
            required_scopes: ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/plus.people.recommended"],
            display_on_page_ready: !1
        },
        appsutil: {
            required_scopes: ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/plus.people.recommended"],
            display_on_page_ready: !1
        },
        "oauth-flow": {
            authUrl: "https://accounts.google.com/o/oauth2/auth",
            proxyUrl: "https://accounts.google.com/o/oauth2/postmessageRelay",
            redirectUri: "postmessage"
        },
        iframes: {
            sharebox: {
                params: {
                    json: "&"
                },
                url: ":socialhost:/:session_prefix:_/sharebox/dialog"
            },
            plus: {
                url: ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"
            },
            ":socialhost:": "https://apis.google.com",
            ":im_socialhost:": "https://plus.googleapis.com",
            domains_suggest: {
                url: "https://domains.google.com/suggest/flow"
            },
            card: {
                params: {
                    s: "#",
                    userid: "&"
                },
                url: ":socialhost:/:session_prefix:_/hovercard/internalcard"
            },
            ":signuphost:": "https://plus.google.com",
            ":gplus_url:": "https://plus.google.com",
            plusone: {
                url: ":socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1"
            },
            plus_share: {
                url: ":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1"
            },
            plus_circle: {
                url: ":socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1"
            },
            plus_followers: {
                url: ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"
            },
            configurator: {
                url: ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"
            },
            appcirclepicker: {
                url: ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
            },
            page: {
                url: ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"
            },
            person: {
                url: ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"
            },
            community: {
                url: ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"
            },
            follow: {
                url: ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"
            },
            commentcount: {
                url: ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"
            },
            comments: {
                url: ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1"
            },
            blogger: {
                url: ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1"
            },
            youtube: {
                url: ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1"
            },
            reportabuse: {
                url: ":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1"
            },
            additnow: {
                url: ":socialhost:/additnow/additnow.html"
            },
            appfinder: {
                url: "https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi=1"
            },
            ":source:": "1p"
        },
        poclient: {
            update_session: "google.updateSessionCallback"
        },
        "googleapis.config": {
            rpc: "/rpc",
            root: "chrome-extension://lpmloonegabodoemnbhpclbpkihangom",
            "root-1p": "https://clients6.google.com",
            useGapiForXd3: !0,
            xd3: "/static/proxy.html",
            auth: {
                useInterimAuth: !1
            }
        },
        report: {
            apis: ["iframes\\..*", "gadgets\\..*", "gapi\\.appcirclepicker\\..*", "gapi\\.client\\..*"],
            rate: 1E-4
        },
        client: {
            perApiBatch: !0
        }
    });
    var db, eb;
    db = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    };
    eb = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    };
    _.D = function (a, b, c) {
        _.D = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? db : eb;
        return _.D.apply(null, arguments)
    };
    var Kb, Sb, Ub, Xb, $b, ac, bc, cc, dc, kc;
    _.hb = function (a, b) {
        return _.da[a] = b
    };
    _.ib = function (a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, _.ib);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b);
        this.uK = !0
    };
    _.mb = function (a, b) {
        return 0 <= (0, _.lb)(a, b)
    };
    _.nb = function (a, b) {
        b = (0, _.lb)(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    };
    _.ob = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };
    _.pb = function (a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    };
    _.qb = function (a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    };
    _.rb = function (a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    };
    _.tb = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < sb.length; f++) c = sb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    _.vb = function (a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0])) return _.vb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c
    };
    _.wb = function () {
        var a = _.r.navigator;
        return a && (a = a.userAgent) ? a : ""
    };
    _.Ab = function (a) {
        return _.yb(_.wb(), a)
    };
    _.Eb = function () {
        return _.Cb ? !!_.Db && 0 < _.Db.brands.length : !1
    };
    _.Fb = function () {
        return _.Eb() ? !1 : _.Ab("Opera")
    };
    _.Hb = function () {
        return _.Eb() ? !1 : _.Ab("Trident") || _.Ab("MSIE")
    };
    _.Ib = function () {
        return _.Eb() ? !1 : _.Ab("Edge")
    };
    Kb = function () {
        return _.Cb ? !!_.Db && !!_.Db.platform : !1
    };
    _.Lb = function () {
        return Kb() ? "Android" === _.Db.platform : _.Ab("Android")
    };
    _.Mb = function () {
        return _.Ab("iPhone") && !_.Ab("iPod") && !_.Ab("iPad")
    };
    _.Nb = function () {
        return _.Mb() || _.Ab("iPad") || _.Ab("iPod")
    };
    _.Ob = function () {
        return Kb() ? "macOS" === _.Db.platform : _.Ab("Macintosh")
    };
    _.Pb = function () {
        return Kb() ? "Windows" === _.Db.platform : _.Ab("Windows")
    };
    _.Qb = function () {
        return Kb() ? "Chrome OS" === _.Db.platform : _.Ab("CrOS")
    };
    _.Rb = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    };
    _.Tb = function (a, b) {
        a = a.split(".");
        b = b || _.r;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]], null == b) return null;
        return b
    };
    Ub = function (a, b) {
        var c = _.Tb("WIZ_global_data.oxN3nb");
        a = c && c[a];
        return null != a ? a : b
    };
    _.Vb = function (a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    };
    _.Wb = function (a) {
        var b = _.Vb(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    };
    Xb = 0;
    _.Yb = function (a) {
        return Object.prototype.hasOwnProperty.call(a, _.Wa) && a[_.Wa] || (a[_.Wa] = ++Xb)
    };
    _.Zb = function () {
        return Date.now()
    };
    $b = function (a) {
        return a
    };
    _.ab(_.ib, Error);
    _.ib.prototype.name = "CustomError";
    bc = function () {
        if (void 0 === ac) {
            var a = null,
                b = _.r.trustedTypes;
            if (b && b.createPolicy) try {
                a = b.createPolicy("goog#html", {
                    createHTML: $b,
                    createScript: $b,
                    createScriptURL: $b
                })
            } catch (c) {
                _.r.console && _.r.console.error(c.message)
            }
            ac = a
        }
        return ac
    };
    cc = {};
    dc = {};
    _.ec = function (a, b) {
        this.d0 = a === cc && b || "";
        this.Z4 = dc
    };
    _.ec.prototype.toString = function () {
        return this.d0
    };
    _.fc = function (a) {
        return a instanceof _.ec && a.constructor === _.ec && a.Z4 === dc ? a.d0 : "type_error:Const"
    };
    _.hc = function (a) {
        return new _.ec(cc, a)
    };
    _.ic = function (a) {
        this.zY = a
    };
    _.ic.prototype.toString = function () {
        return this.zY + ""
    };
    _.jc = function (a) {
        if (a instanceof _.ic && a.constructor === _.ic) return a.zY;
        _.Vb(a);
        return "type_error:TrustedResourceUrl"
    };
    kc = {};
    _.lc = function (a) {
        var b = bc();
        a = b ? b.createScriptURL(a) : a;
        return new _.ic(a, kc)
    };
    _.mc = function (a) {
        var b = !1,
            c;
        return function () {
            b || (c = a(), b = !0);
            return c
        }
    };
    _.lb = Array.prototype.indexOf ? function (a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };
    _.nc = Array.prototype.lastIndexOf ? function (a, b) {
        return Array.prototype.lastIndexOf.call(a, b, a.length - 1)
    } : function (a, b) {
        var c = a.length - 1;
        0 > c && (c = Math.max(0, a.length + c));
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.lastIndexOf(b, c);
        for (; 0 <= c; c--)
            if (c in a && a[c] === b) return c;
        return -1
    };
    _.oc = Array.prototype.forEach ? function (a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    };
    _.pc = Array.prototype.filter ? function (a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    } : function (a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, h = 0; h < c; h++)
            if (h in f) {
                var k = f[h];
                b.call(void 0, k, h, a) && (d[e++] = k)
            } return d
    };
    _.rc = Array.prototype.map ? function (a, b, c) {
        return Array.prototype.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = "string" === typeof a ? a.split("") : a, h = 0; h < d; h++) h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    };
    _.sc = Array.prototype.reduce ? function (a, b, c) {
        return Array.prototype.reduce.call(a, b, c)
    } : function (a, b, c) {
        var d = c;
        (0, _.oc)(a, function (e, f) {
            d = b.call(void 0, d, e, f, a)
        });
        return d
    };
    _.tc = Array.prototype.some ? function (a, b, c) {
        return Array.prototype.some.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    };
    _.uc = Array.prototype.every ? function (a, b, c) {
        return Array.prototype.every.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
    };
    var sb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    var vc = !!(_.Va[0] & 128),
        wc = !!(_.Va[0] & 4),
        xc = !!(_.Va[0] & 256),
        yc = !!(_.Va[0] & 2);
    _.Cb = vc ? xc : Ub(610401301, !1);
    _.zc = vc ? wc || !yc : Ub(572417392, !0);
    var Cc, Ec;
    _.Ac = function (a) {
        this.yY = a
    };
    _.Ac.prototype.toString = function () {
        return this.yY.toString()
    };
    _.Bc = function (a) {
        if (a instanceof _.Ac && a.constructor === _.Ac) return a.yY;
        _.Vb(a);
        return "type_error:SafeUrl"
    };
    try {
        new URL("s://g"), Cc = !0
    } catch (a) {
        Cc = !1
    }
    _.Dc = Cc;
    Ec = {};
    _.Fc = function (a) {
        return new _.Ac(a, Ec)
    };
    _.Gc = _.Fc("about:invalid#zClosurez");
    var Lc, Nc, Oc, Pc, Qc, Rc, Kc, Tc;
    _.Hc = function (a, b) {
        return 0 == a.lastIndexOf(b, 0)
    };
    _.Ic = function (a) {
        return /^[\s\xa0]*$/.test(a)
    };
    _.Jc = String.prototype.trim ? function (a) {
        return a.trim()
    } : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    };
    _.Sc = function (a) {
        if (!Kc.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(Lc, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Nc, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Oc, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Pc, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(Qc, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(Rc, "&#0;"));
        return a
    };
    Lc = /&/g;
    Nc = /</g;
    Oc = />/g;
    Pc = /"/g;
    Qc = /'/g;
    Rc = /\x00/g;
    Kc = /[\x00&<>"']/;
    _.yb = function (a, b) {
        return -1 != a.indexOf(b)
    };
    _.Uc = function (a, b) {
        var c = 0;
        a = (0, _.Jc)(String(a)).split(".");
        b = (0, _.Jc)(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length && 0 == h[0].length) break;
                c = Tc(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || Tc(0 == f[2].length, 0 == h[2].length) || Tc(f[2], h[2]);
                f = f[3];
                h = h[3]
            } while (0 == c)
        }
        return c
    };
    Tc = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    _.Vc = {};
    _.Wc = function (a) {
        this.xY = a
    };
    _.Wc.prototype.toString = function () {
        return this.xY.toString()
    };
    _.Xc = new _.Wc("", _.Vc);
    _.Zc = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$");
    _.$c = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g");
    _.ad = RegExp("\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g");
    var dd;
    _.bd = {};
    _.cd = function (a) {
        this.wY = a
    };
    _.cd.prototype.toString = function () {
        return this.wY.toString()
    };
    _.ed = function (a) {
        a = _.fc(a);
        return 0 === a.length ? dd : new _.cd(a, _.bd)
    };
    dd = new _.cd("", _.bd);
    var fd;
    fd = _.r.navigator;
    _.Db = fd ? fd.userAgentData || null : null;
    var gd;
    gd = {};
    _.hd = function (a) {
        this.vY = a
    };
    _.hd.prototype.toString = function () {
        return this.vY.toString()
    };
    _.id = function (a) {
        if (a instanceof _.hd && a.constructor === _.hd) return a.vY;
        _.Vb(a);
        return "type_error:SafeHtml"
    };
    _.kd = function (a) {
        return a instanceof _.hd ? a : _.jd(_.Sc(String(a)))
    };
    _.jd = function (a) {
        var b = bc();
        a = b ? b.createHTML(a) : a;
        return new _.hd(a, gd)
    };
    _.ld = new _.hd(_.r.trustedTypes && _.r.trustedTypes.emptyHTML || "", gd);
    _.md = _.jd("<br>");
    var nd = function (a) {
        nd[" "](a);
        return a
    };
    nd[" "] = function () {};
    _.od = function (a, b) {
        try {
            return nd(a[b]), !0
        } catch (c) {}
        return !1
    };
    var Fd, Gd, Ld;
    _.pd = _.Fb();
    _.qd = _.Hb();
    _.rd = _.Ab("Edge");
    _.td = _.rd || _.qd;
    _.ud = _.Ab("Gecko") && !(_.yb(_.wb().toLowerCase(), "webkit") && !_.Ab("Edge")) && !(_.Ab("Trident") || _.Ab("MSIE")) && !_.Ab("Edge");
    _.vd = _.yb(_.wb().toLowerCase(), "webkit") && !_.Ab("Edge");
    _.wd = _.vd && _.Ab("Mobile");
    _.xd = _.Ob();
    _.yd = _.Pb();
    _.zd = (Kb() ? "Linux" === _.Db.platform : _.Ab("Linux")) || _.Qb();
    _.Ad = _.Lb();
    _.Bd = _.Mb();
    _.Cd = _.Ab("iPad");
    _.Dd = _.Ab("iPod");
    _.Ed = _.Nb();
    Fd = function () {
        var a = _.r.document;
        return a ? a.documentMode : void 0
    };
    a: {
        var Hd = "",
            Id = function () {
                var a = _.wb();
                if (_.ud) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (_.rd) return /Edge\/([\d\.]+)/.exec(a);
                if (_.qd) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (_.vd) return /WebKit\/(\S+)/.exec(a);
                if (_.pd) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();Id && (Hd = Id ? Id[1] : "");
        if (_.qd) {
            var Jd = Fd();
            if (null != Jd && Jd > parseFloat(Hd)) {
                Gd = String(Jd);
                break a
            }
        }
        Gd = Hd
    }
    _.Kd = Gd;
    if (_.r.document && _.qd) {
        var Od = Fd();
        Ld = Od ? Od : parseInt(_.Kd, 10) || void 0
    } else Ld = void 0;
    _.Pd = Ld;
    try {
        (new self.OffscreenCanvas(0, 0)).getContext("2d")
    } catch (a) {}
    _.Qd = _.qd || _.vd;
    var Rd, Td;
    Rd = _.mc(function () {
        var a = document.createElement("div"),
            b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = _.id(_.ld);
        return !b.parentElement
    });
    _.Sd = function (a, b) {
        if (Rd())
            for (; a.lastChild;) a.removeChild(a.lastChild);
        a.innerHTML = _.id(b)
    };
    Td = /^[\w+/_-]+[=]{0,2}$/;
    _.Ud = function (a, b) {
        b = (b || _.r).document;
        return b.querySelector ? (a = b.querySelector(a)) && (a = a.nonce || a.getAttribute("nonce")) && Td.test(a) ? a : "" : ""
    };
    _.Vd = function (a, b) {
        this.width = a;
        this.height = b
    };
    _.Wd = function (a, b) {
        return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
    };
    _.g = _.Vd.prototype;
    _.g.clone = function () {
        return new _.Vd(this.width, this.height)
    };
    _.g.my = function () {
        return this.width * this.height
    };
    _.g.aspectRatio = function () {
        return this.width / this.height
    };
    _.g.isEmpty = function () {
        return !this.my()
    };
    _.g.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    _.g.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    _.g.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    _.g.scale = function (a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    };
    _.Xd = String.prototype.repeat ? function (a, b) {
        return a.repeat(b)
    } : function (a, b) {
        return Array(b + 1).join(a)
    };
    _.Yd = 2147483648 * Math.random() | 0;
    var ce, me;
    _.ae = function (a) {
        return a ? new _.Zd(_.$d(a)) : Sb || (Sb = new _.Zd)
    };
    _.be = function (a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, h; h = a[f]; f++) b == h.nodeName && (d[e++] = h);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; h = a[f]; f++) b = h.className, "function" == typeof b.split && _.mb(b.split(/\s+/), c) && (d[e++] = h);
            d.length = e;
            return d
        }
        return a
    };
    _.fe = function (a, b) {
        _.pb(b, function (c, d) {
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : ce.hasOwnProperty(d) ? a.setAttribute(ce[d], c) : _.Hc(d, "aria-") || _.Hc(d, "data-") ? a.setAttribute(d, c) : a[d] = c
        })
    };
    ce = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    _.he = function (a) {
        return _.ge(a || window)
    };
    _.ge = function (a) {
        a = a.document;
        a = _.ie(a) ? a.documentElement : a.body;
        return new _.Vd(a.clientWidth, a.clientHeight)
    };
    _.je = function (a) {
        return a ? a.parentWindow || a.defaultView : window
    };
    _.ne = function (a, b) {
        var c = b[1],
            d = _.ke(a, String(b[0]));
        c && ("string" === typeof c ? d.className = c : Array.isArray(c) ? d.className = c.join(" ") : _.fe(d, c));
        2 < b.length && me(a, d, b, 2);
        return d
    };
    me = function (a, b, c, d) {
        function e(k) {
            k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!_.Wb(f) || _.Rb(f) && 0 < f.nodeType) e(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (_.Rb(f)) {
                            var h = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            h = "function" == typeof f.item;
                            break a
                        }
                    }
                    h = !1
                }
                _.oc(h ? _.ob(f) : f, e)
            }
        }
    };
    _.oe = function (a) {
        return _.ke(document, a)
    };
    _.ke = function (a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    };
    _.ie = function (a) {
        return "CSS1Compat" == a.compatMode
    };
    _.pe = function (a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    _.qe = function (a, b) {
        me(_.$d(a), a, arguments, 1)
    };
    _.re = function (a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    };
    _.se = function (a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    };
    _.te = function (a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    _.ue = function (a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function (b) {
            return 1 == b.nodeType
        })
    };
    _.ve = function (a) {
        return _.Rb(a) && 1 == a.nodeType
    };
    _.we = function (a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    _.$d = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    };
    _.xe = function (a, b) {
        if ("textContent" in a) a.textContent = b;
        else if (3 == a.nodeType) a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
            a.firstChild.data = String(b)
        } else _.re(a), a.appendChild(_.$d(a).createTextNode(String(b)))
    };
    _.Zd = function (a) {
        this.Hb = a || _.r.document || document
    };
    _.g = _.Zd.prototype;
    _.g.Ja = _.ae;
    _.g.pL = _.ea(0);
    _.g.ub = function () {
        return this.Hb
    };
    _.g.O = _.ea(1);
    _.g.getElementsByTagName = function (a, b) {
        return (b || this.Hb).getElementsByTagName(String(a))
    };
    _.g.CH = _.ea(2);
    _.g.va = function (a, b, c) {
        return _.ne(this.Hb, arguments)
    };
    _.g.createElement = function (a) {
        return _.ke(this.Hb, a)
    };
    _.g.createTextNode = function (a) {
        return this.Hb.createTextNode(String(a))
    };
    _.g.getWindow = function () {
        var a = this.Hb;
        return a.parentWindow || a.defaultView
    };
    _.g.appendChild = function (a, b) {
        a.appendChild(b)
    };
    _.g.append = _.qe;
    _.g.canHaveChildren = _.pe;
    _.g.Ae = _.re;
    _.g.nV = _.se;
    _.g.removeNode = _.te;
    _.g.NG = _.ue;
    _.g.isElement = _.ve;
    _.g.contains = _.we;
    _.g.fH = _.$d;
    _.g.Bj = _.ea(3);
    _.ye = function (a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    };
    _.ze = function (a, b) {
        return "string" === typeof b ? a.getElementById(b) : b
    };
    _.E = function (a, b) {
        a.prototype = (0, _.Da)(b.prototype);
        a.prototype.constructor = a;
        if (_.Ia)(0, _.Ia)(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.N = b.prototype
    };
    _.Ae = function (a) {
        if (!(a instanceof Array)) {
            a = _.va(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    };
    _.Be = function () {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
        return b
    };
    /*
    
     SPDX-License-Identifier: Apache-2.0
    */
    var Ce, Ee;
    Ce = function (a) {
        return {
            valueOf: a
        }.valueOf()
    };
    Ee = function (a) {
        return new De(function (b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        })
    };
    _.Ge = function (a) {
        var b = void 0 === b ? Fe : b;
        a: if (b = void 0 === b ? Fe : b, !(a instanceof _.Ac)) {
            for (var c = 0; c < b.length; ++c) {
                var d = b[c];
                if (d instanceof De && d.Dj(a)) {
                    a = _.Fc(a);
                    break a
                }
            }
            a = void 0
        }
        return a || _.Gc
    };
    _.Ie = function (a) {
        if (!He) {
            a: {
                var b = document.createElement("a");
                try {
                    b.href = a
                } catch (c) {
                    a = void 0;
                    break a
                }
                a = b.protocol;a = ":" === a || "" === a ? "https:" : a
            }
            return a
        }
        try {
            b = new URL(a)
        } catch (c) {
            return "https:"
        }
        return b.protocol
    };
    _.Je = function (a) {
        if ("javascript:" !== _.Ie(a)) return a
    };
    _.Ke = function (a, b) {
        b = void 0 === b ? {} : b;
        if (a instanceof _.hd) return a;
        a = String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        b.Rqa && (a = a.replace(/(^|[\r\n\t ]) /g, "$1&#160;"));
        b.qda && (a = a.replace(/(\r\n|\n|\r)/g, "<br>"));
        b.Sqa && (a = a.replace(/(\t+)/g, '<span style="white-space:pre">$1</span>'));
        return _.jd(a)
    };
    var De = function (a) {
            this.Dj = a
        },
        Fe = [Ee("data"), Ee("http"), Ee("https"), Ee("mailto"), Ee("ftp"), new De(function (a) {
            return /^[^:]*([/?#]|$)/.test(a)
        })],
        He = Ce(function () {
            return "function" === typeof URL
        });
    var Me = function (a, b, c, d) {
        var e = new Map(Le);
        this.Q5 = a;
        this.yR = e;
        this.R5 = b;
        this.G9 = c;
        this.QT = d
    };
    var Ne = "ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT".split(" "),
        Le = [
            ["A", new Map([
                ["href", {
                    fe: 2
                }]
            ])],
            ["AREA", new Map([
                ["href", {
                    fe: 2
                }]
            ])],
            ["LINK", new Map([
                ["href", {
                    fe: 2,
                    conditions: new Map([
                        ["rel", new Set("alternate author bookmark canonical cite help icon license next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" "))]
                    ])
                }]
            ])],
            ["SOURCE", new Map([
                ["src", {
                    fe: 1
                }]
            ])],
            ["IMG", new Map([
                ["src", {
                    fe: 1
                }]
            ])],
            ["VIDEO", new Map([
                ["src", {
                    fe: 1
                }]
            ])],
            ["AUDIO", new Map([
                ["src", {
                    fe: 1
                }]
            ])]
        ],
        Oe = "title aria-atomic aria-autocomplete aria-busy aria-checked aria-current aria-disabled aria-dropeffect aria-expanded aria-haspopup aria-hidden aria-invalid aria-label aria-level aria-live aria-multiline aria-multiselectable aria-orientation aria-posinset aria-pressed aria-readonly aria-relevant aria-required aria-selected aria-setsize aria-sort aria-valuemax aria-valuemin aria-valuenow aria-valuetext alt align autocapitalize autocomplete autocorrect autofocus autoplay bgcolor border cellpadding cellspacing checked color cols colspan controls datetime disabled download draggable enctype face formenctype frameborder height hreflang hidden ismap label lang loop max maxlength media minlength min multiple muted nonce open placeholder preload rel required reversed role rows rowspan selected shape size sizes slot span spellcheck start step summary translate type valign value width wrap itemscope itemtype itemid itemprop itemref".split(" "),
        Pe = [
            ["dir", {
                fe: 3,
                conditions: Ce(function () {
                    return new Map([
                        ["dir", new Set(["auto", "ltr", "rtl"])]
                    ])
                })
            }],
            ["async", {
                fe: 3,
                conditions: Ce(function () {
                    return new Map([
                        ["async", new Set(["async"])]
                    ])
                })
            }],
            ["cite", {
                fe: 2
            }],
            ["loading", {
                fe: 3,
                conditions: Ce(function () {
                    return new Map([
                        ["loading", new Set(["eager", "lazy"])]
                    ])
                })
            }],
            ["poster", {
                fe: 2
            }],
            ["target", {
                fe: 3,
                conditions: Ce(function () {
                    return new Map([
                        ["target", new Set(["_self", "_blank"])]
                    ])
                })
            }]
        ],
        Qe = new Me(new Set(Ne), new Set(Oe), new Map(Pe)),
        Re = new Me(new Set(Ne),
            new Set(Ce(function () {
                return Oe.concat(["class", "id"])
            })), new Map(Ce(function () {
                return Pe.concat([
                    ["style", {
                        fe: 4
                    }]
                ])
            }))),
        Se = new Me(new Set(Ce(function () {
            return Ne.concat("STYLE TITLE INPUT TEXTAREA BUTTON LABEL".split(" "))
        })), new Set(Ce(function () {
            return Oe.concat(["class", "id", "tabindex", "contenteditable", "name"])
        })), new Map(Ce(function () {
            return Pe.concat([
                ["style", {
                    fe: 4
                }]
            ])
        })), new Set(["data-", "aria-"]));
    var Te;
    Te = function (a) {
        this.nZ = a;
        this.Iy = []
    };
    _.Ue = Ce(function () {
        return new Te(Qe)
    });
    _.Ve = Ce(function () {
        return new Te(Re)
    });
    _.We = Ce(function () {
        return new Te(Se)
    });
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    _.Xe = function (a) {
        return a instanceof _.Ac ? _.Bc(a) : _.Je(a)
    };
    _.Ye = function (a, b) {
        if (1 === a.nodeType) {
            var c = a.tagName;
            if ("SCRIPT" === c || "STYLE" === c) throw Error("q");
        }
        a.innerHTML = _.id(b)
    };
    _.Ze = function (a, b, c, d) {
        b = _.Xe(b);
        return void 0 !== b ? a.open(b, c, d) : null
    };
    _.$e = function (a) {
        return null === a ? "null" : void 0 === a ? "undefined" : a
    };
    _.af = window;
    _.cf = document;
    _.df = _.af.location;
    _.ef = /\[native code\]/;
    _.ff = function (a, b, c) {
        return a[b] = a[b] || c
    };
    _.gf = function () {
        var a;
        if ((a = Object.create) && _.ef.test(a)) a = a(null);
        else {
            a = {};
            for (var b in a) a[b] = void 0
        }
        return a
    };
    _.hf = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    _.jf = function (a, b) {
        a = a || {};
        for (var c in a) _.hf(a, c) && (b[c] = a[c])
    };
    _.kf = _.ff(_.af, "gapi", {});
    _.lf = function (a, b, c) {
        var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
        b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
        if (a = a && (d.exec(a) || b.exec(a))) try {
            c = decodeURIComponent(a[2])
        } catch (e) {}
        return c
    };
    _.mf = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source);
    _.nf = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source, "g");
    _.of = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i");
    _.qf = function (a, b, c) {
        _.pf(a, b, c, "add", "at")
    };
    _.pf = function (a, b, c, d, e) {
        if (a[d + "EventListener"]) a[d + "EventListener"](b, c, !1);
        else if (a[e + "tachEvent"]) a[e + "tachEvent"]("on" + b, c)
    };
    _.rf = {};
    _.rf = _.ff(_.af, "___jsl", _.gf());
    _.ff(_.rf, "I", 0);
    _.ff(_.rf, "hel", 10);
    var sf, tf, uf, vf, wf, xf, yf;
    sf = function (a) {
        var b = window.___jsl = window.___jsl || {};
        b[a] = b[a] || [];
        return b[a]
    };
    tf = function (a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = !a && b.cfg || {};
        return b.cfg
    };
    uf = function (a) {
        return "object" === typeof a && /\[native code\]/.test(a.push)
    };
    vf = function (a, b, c) {
        if (b && "object" === typeof b)
            for (var d in b) !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !uf(a[d]) && !uf(b[d]) ? vf(a[d], b[d]) : b[d] && "object" === typeof b[d] ? (a[d] = uf(b[d]) ? [] : {}, vf(a[d], b[d])) : a[d] = b[d])
    };
    wf = function (a) {
        if (a && !/^\s+$/.test(a)) {
            for (; 0 == a.charCodeAt(a.length - 1);) a = a.substring(0, a.length - 1);
            try {
                var b = window.JSON.parse(a)
            } catch (c) {}
            if ("object" === typeof b) return b;
            try {
                b = (new Function("return (" + a + "\n)"))()
            } catch (c) {}
            if ("object" === typeof b) return b;
            try {
                b = (new Function("return ({" + a + "\n})"))()
            } catch (c) {}
            return "object" === typeof b ? b : {}
        }
    };
    xf = function (a, b) {
        var c = {
            ___goc: void 0
        };
        a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length - 1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
        vf(c, b);
        a.push(c)
    };
    yf = function (a) {
        tf(!0);
        var b = window.___gcfg,
            c = sf("cu"),
            d = window.___gu;
        b && b !== d && (xf(c, b), window.___gu = b);
        b = sf("cu");
        var e = document.scripts || document.getElementsByTagName("script") || [];
        d = [];
        var f = [];
        f.push.apply(f, sf("us"));
        for (var h = 0; h < e.length; ++h)
            for (var k = e[h], l = 0; l < f.length; ++l) k.src && 0 == k.src.indexOf(f[l]) && d.push(k);
        0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
        for (e = 0; e < d.length; ++e) d[e].getAttribute("gapi_processed") || (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (h =
            f.nodeType, f = 3 == h || 4 == h ? f.nodeValue : f.textContent || "") : f = void 0, (f = wf(f)) && b.push(f));
        a && xf(c, a);
        d = sf("cd");
        a = 0;
        for (b = d.length; a < b; ++a) vf(tf(), d[a], !0);
        d = sf("ci");
        a = 0;
        for (b = d.length; a < b; ++a) vf(tf(), d[a], !0);
        a = 0;
        for (b = c.length; a < b; ++a) vf(tf(), c[a], !0)
    };
    _.zf = function (a, b) {
        var c = tf();
        if (!a) return c;
        a = a.split("/");
        for (var d = 0, e = a.length; c && "object" === typeof c && d < e; ++d) c = c[a[d]];
        return d === a.length && void 0 !== c ? c : b
    };
    _.Af = function (a, b) {
        var c;
        if ("string" === typeof a) {
            var d = c = {};
            a = a.split("/");
            for (var e = 0, f = a.length; e < f - 1; ++e) {
                var h = {};
                d = d[a[e]] = h
            }
            d[a[e]] = b
        } else c = a;
        yf(c)
    };
    var Bf = function () {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), _.ff(_.rf, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    Bf && Bf();
    yf();
    _.C("gapi.config.get", _.zf);
    _.C("gapi.config.update", _.Af);
    var Cf, Df, Ef, Ff, Hf, If, Kf, Qf, Rf, Sf, Tf, Uf, Vf, Jf, Nf, Of;
    Cf = function (a, b) {
        var c = b.createRange();
        c.selectNode(b.body);
        a = _.jd(a);
        return c.createContextualFragment(_.id(a))
    };
    Df = function (a) {
        a = a.nodeName;
        return "string" === typeof a ? a : "FORM"
    };
    Ef = function (a) {
        a = a.nodeType;
        return 1 === a || "number" !== typeof a
    };
    Ff = function (a, b, c) {
        a.setAttribute(b, c)
    };
    _.Gf = function (a) {
        var b = _.Be.apply(1, arguments);
        if (0 === b.length) return _.lc(a[0]);
        for (var c = a[0], d = 0; d < b.length; d++) c += encodeURIComponent(b[d]) + a[d + 1];
        return _.lc(c)
    };
    Hf = function (a, b) {
        var c = new XMLHttpRequest;
        c.open("POST", a);
        c.setRequestHeader("Content-Type", "application/json");
        c.send(b)
    };
    If = function (a, b) {
        ("undefined" !== typeof window && window.navigator && void 0 !== window.navigator.sendBeacon ? navigator.sendBeacon.bind(navigator) : Hf)("https://csp.withgoogle.com/csp/lcreport/" + a.vK, JSON.stringify({
            host: window.location.hostname,
            type: b,
            additionalData: void 0
        }))
    };
    Kf = function (a, b) {
        try {
            Jf(_.We, a)
        } catch (c) {
            return If(b, "H_SLSANITIZE"), !0
        }
        try {
            Jf(_.Ve, a)
        } catch (c) {
            return If(b, "H_RSANITIZE"), !0
        }
        try {
            Jf(_.Ue, a)
        } catch (c) {
            return If(b, "H_SANITIZE"), !0
        }
        return !1
    };
    _.Lf = function (a) {
        var b, c;
        return (a = null == (c = (b = a.document).querySelector) ? void 0 : c.call(b, "script[nonce]")) ? a.nonce || a.getAttribute("nonce") || "" : ""
    };
    _.Mf = function (a, b) {
        a.src = _.jc(b);
        (b = _.Lf(a.ownerDocument && a.ownerDocument.defaultView || window)) && a.setAttribute("nonce", b)
    };
    _.Pf = function (a, b) {
        a = _.$e(a);
        var c;
        if (c = b) {
            var d, e;
            c = Math.random() < (null != (e = null != (d = b.nra) ? d : Nf[b.vK[0]]) ? e : 0)
        }
        if (c && !1 !== window.SAFEVALUES_REPORTING && "DocumentFragment" in window) {
            var f, h;
            Math.random() < (null != (h = null != (f = b.cqa) ? f : Of[b.vK[0]]) ? h : 0) && If(b, "HEARTBEAT");
            Kf(a, b) || _.Ke(a).toString() !== a && If(b, "H_ESCAPE")
        }
        return _.jd(a)
    };
    Qf = ["data:", "http:", "https:", "mailto:", "ftp:"];
    Rf = function (a, b, c) {
        c = a.yR.get(c);
        return (null == c ? 0 : c.has(b)) ? c.get(b) : a.R5.has(b) ? {
            fe: 1
        } : (c = a.G9.get(b)) ? c : a.QT && [].concat(_.Ae(a.QT)).some(function (d) {
            return 0 === b.indexOf(d)
        }) ? {
            fe: 1
        } : {
            fe: 0
        }
    };
    Sf = function (a) {
        0 === a.Iy.length && a.Iy.push("")
    };
    Tf = function (a, b) {
        if (3 === b.nodeType) return 1;
        if (!Ef(b)) return 2;
        b = Df(b);
        if (null === b) return Sf(a), 2;
        var c = a.nZ;
        if ("FORM" !== b && (c.Q5.has(b) || c.yR.has(b))) return 1;
        Sf(a);
        return 2
    };
    Uf = function (a, b, c) {
        var d = Df(b);
        c = c.createElement(d);
        b = b.attributes;
        for (var e = _.va(b), f = e.next(); !f.done; f = e.next()) {
            var h = f.value;
            f = h.name;
            h = h.value;
            var k = Rf(a.nZ, f, d),
                l;
            a: {
                if (l = k.conditions) {
                    l = _.va(l);
                    for (var m = l.next(); !m.done; m = l.next()) {
                        var n = _.va(m.value);
                        m = n.next().value;
                        n = n.next().value;
                        var p = void 0;
                        if ((m = null == (p = b.getNamedItem(m)) ? void 0 : p.value) && !n.has(m)) {
                            l = !1;
                            break a
                        }
                    }
                }
                l = !0
            }
            if (l) switch (k.fe) {
                case 1:
                    Ff(c, f, h);
                    break;
                case 2:
                    k = _.Ie(h);
                    k = void 0 !== k && -1 !== Qf.indexOf(k.toLowerCase()) ? h : "about:invalid#zClosurez";
                    k !== h && Sf(a);
                    Ff(c, f, k);
                    break;
                case 3:
                    Ff(c, f, h.toLowerCase());
                    break;
                case 4:
                    Ff(c, f, h);
                    break;
                case 0:
                    Sf(a)
            } else Sf(a)
        }
        return c
    };
    Vf = function (a, b, c) {
        b = Cf(b, c);
        b = document.createTreeWalker(b, 5, function (k) {
            return Tf(a, k)
        }, !1);
        for (var d = b.nextNode(), e = c.createDocumentFragment(), f = e; null !== d;) {
            var h = void 0;
            if (3 === d.nodeType) h = document.createTextNode(d.data);
            else if (Ef(d)) h = Uf(a, d, c);
            else throw Error("q");
            f.appendChild(h);
            if (d = b.firstChild()) f = h;
            else
                for (; !(d = b.nextSibling()) && (d = b.parentNode());) f = f.parentNode
        }
        return e
    };
    _.Wf = function (a, b) {
        var c = document.implementation.createHTMLDocument(""),
            d = c.body;
        d.appendChild(Vf(a, b, c));
        a = (new XMLSerializer).serializeToString(d);
        a = a.slice(a.indexOf(">") + 1, a.lastIndexOf("</"));
        return _.jd(a)
    };
    Jf = function (a, b) {
        a.Iy = [];
        _.Wf(a, b);
        if (0 !== a.Iy.length) throw Error("q");
    };
    Nf = {
        0: 1,
        1: 1
    };
    Of = {
        0: .1,
        1: .1
    };
    _.Ah = window.googleapis && window.googleapis.server || {};
    _.Xf = _.Xf || {};
    _.Xf = _.Xf || {};
    (function () {
        function a(c) {
            var d = "undefined" === typeof c;
            if (null !== b && d) return b;
            var e = {};
            c = c || window.location.href;
            var f = c.indexOf("?"),
                h = c.indexOf("#");
            c = (-1 === h ? c.substr(f + 1) : [c.substr(f + 1, h - f - 1), "&", c.substr(h + 1)].join("")).split("&");
            f = window.decodeURIComponent ? decodeURIComponent : unescape;
            h = 0;
            for (var k = c.length; h < k; ++h) {
                var l = c[h].indexOf("=");
                if (-1 !== l) {
                    var m = c[h].substring(0, l);
                    l = c[h].substring(l + 1);
                    l = l.replace(/\+/g, " ");
                    try {
                        e[m] = f(l)
                    } catch (n) {}
                }
            }
            d && (b = e);
            return e
        }
        var b = null;
        _.Xf.kh = a;
        a()
    })();
    _.C("gadgets.util.getUrlParameters", _.Xf.kh);
    _.ag = function () {
        var a = window.gadgets && window.gadgets.config && window.gadgets.config.get;
        a && _.Af(a());
        return {
            register: function (b, c, d) {
                d && d(_.zf())
            },
            get: function (b) {
                return _.zf(b)
            },
            update: function (b, c) {
                if (c) throw "Config replacement is not supported";
                _.Af(b)
            },
            Ad: function () {}
        }
    }();
    _.C("gadgets.config.register", _.ag.register);
    _.C("gadgets.config.get", _.ag.get);
    _.C("gadgets.config.init", _.ag.Ad);
    _.C("gadgets.config.update", _.ag.update);
    var bg, cg, eg, fg, gg, hg, ig, jg, kg, lg, mg, ng, og, pg, qg, rg, sg, tg, ug, vg, wg, xg, yg, zg, Ag, Bg, Cg, Dg, Eg, Fg, Gg, Jg, Kg;
    eg = void 0;
    fg = function (a) {
        try {
            return _.r.JSON.parse.call(_.r.JSON, a)
        } catch (b) {
            return !1
        }
    };
    gg = function (a) {
        return Object.prototype.toString.call(a)
    };
    hg = gg(0);
    ig = gg(new Date(0));
    jg = gg(!0);
    kg = gg("");
    lg = gg({});
    mg = gg([]);
    ng = function (a, b) {
        if (b)
            for (var c = 0, d = b.length; c < d; ++c)
                if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
        d = typeof a;
        if ("undefined" !== d) {
            c = Array.prototype.slice.call(b || [], 0);
            c[c.length] = a;
            b = [];
            var e = gg(a);
            if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a, "toJSON") || (e !== mg || a.constructor !== Array && a.constructor !== Object) && (e !== lg || a.constructor !== Array && a.constructor !== Object) && e !== kg && e !== hg && e !== jg && e !== ig)) return ng(a.toJSON.call(a), c);
            if (null ==
                a) b[b.length] = "null";
            else if (e === hg) a = Number(a), isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"), b[b.length] = String(a);
            else if (e === jg) b[b.length] = String(!!Number(a));
            else {
                if (e === ig) return ng(a.toISOString.call(a), c);
                if (e === mg && gg(a.length) === hg) {
                    b[b.length] = "[";
                    var f = 0;
                    for (d = Number(a.length) >> 0; f < d; ++f) f && (b[b.length] = ","), b[b.length] = ng(a[f], c) || "null";
                    b[b.length] = "]"
                } else if (e == kg && gg(a.length) === hg) {
                    b[b.length] = '"';
                    f = 0;
                    for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f),
                        e = String.prototype.charCodeAt.call(a, f), b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                    b[b.length] = '"'
                } else if ("object" === d) {
                    b[b.length] = "{";
                    d = 0;
                    for (f in a) Object.prototype.hasOwnProperty.call(a, f) && (e = ng(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = ng(f), b[b.length] = ":", b[b.length] = e));
                    b[b.length] = "}"
                } else return
            }
            return b.join("")
        }
    };
    og = /[\0-\x07\x0b\x0e-\x1f]/;
    pg = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/;
    qg = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/;
    rg = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/;
    sg = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g;
    tg = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g;
    ug = /[ \t\n\r]+/g;
    vg = /[^"]:/;
    wg = /""/g;
    xg = /true|false|null/g;
    yg = /00/;
    zg = /[\{]([^0\}]|0[^:])/;
    Ag = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/;
    Bg = /[^\[,:][\[\{]/;
    Cg = /^(\{|\}|\[|\]|,|:|0)+/;
    Dg = /\u2028/g;
    Eg = /\u2029/g;
    Fg = function (a) {
        a = String(a);
        if (og.test(a) || pg.test(a) || qg.test(a) || rg.test(a)) return !1;
        var b = a.replace(sg, '""');
        b = b.replace(tg, "0");
        b = b.replace(ug, "");
        if (vg.test(b)) return !1;
        b = b.replace(wg, "0");
        b = b.replace(xg, "0");
        if (yg.test(b) || zg.test(b) || Ag.test(b) || Bg.test(b) || !b || (b = b.replace(Cg, ""))) return !1;
        a = a.replace(Dg, "\\u2028").replace(Eg, "\\u2029");
        b = void 0;
        try {
            b = eg ? [fg(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
        } catch (c) {
            return !1
        }
        return b && 1 ===
            b.length ? b[0] : !1
    };
    Gg = function () {
        var a = ((_.r.document || {}).scripts || []).length;
        if ((void 0 === bg || void 0 === eg || cg !== a) && -1 !== cg) {
            bg = eg = !1;
            cg = -1;
            try {
                try {
                    eg = !!_.r.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === _.r.JSON.stringify.call(_.r.JSON, {
                        a: [3, !0, new Date(0)],
                        c: function () {}
                    }) && !0 === fg("true") && 3 === fg('[{"a":3}]')[0].a
                } catch (b) {}
                bg = eg && !fg("[00]") && !fg('"\u0007"') && !fg('"\\0"') && !fg('"\\v"')
            } finally {
                cg = a
            }
        }
    };
    _.Hg = function (a) {
        if (-1 === cg) return !1;
        Gg();
        return (bg ? fg : Fg)(a)
    };
    _.Ig = function (a) {
        if (-1 !== cg) return Gg(), eg ? _.r.JSON.stringify.call(_.r.JSON, a) : ng(a)
    };
    Jg = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString();
    Kg = function () {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 + Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T", String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1),
            "Z"
        ].join("")
    };
    Date.prototype.toISOString = Jg ? Kg : Date.prototype.toISOString;
    _.C("gadgets.json.stringify", _.Ig);
    _.C("gadgets.json.parse", _.Hg);
    (function () {
        function a(e, f) {
            if (!(e < c) && d)
                if (2 === e && d.warn) d.warn(f);
                else if (3 === e && d.error) try {
                d.error(f)
            } catch (h) {} else d.log && d.log(f)
        }
        var b = function (e) {
            a(1, e)
        };
        _.Yf = function (e) {
            a(2, e)
        };
        _.Zf = function (e) {
            a(3, e)
        };
        _.$f = function () {};
        b.INFO = 1;
        b.WARNING = 2;
        b.NONE = 4;
        var c = 1,
            d = window.console ? window.console : window.opera ? window.opera.postError : void 0;
        return b
    })();
    _.Xf = _.Xf || {};
    (function () {
        var a = [];
        _.Xf.Wqa = function (b) {
            a.push(b)
        };
        _.Xf.lra = function () {
            for (var b = 0, c = a.length; b < c; ++b) a[b]()
        }
    })();
    var Lg = function () {
        this.Rg = window.console
    };
    Lg.prototype.log = function (a) {
        this.Rg && this.Rg.log && this.Rg.log(a)
    };
    Lg.prototype.error = function (a) {
        this.Rg && (this.Rg.error ? this.Rg.error(a) : this.Rg.log && this.Rg.log(a))
    };
    Lg.prototype.warn = function (a) {
        this.Rg && (this.Rg.warn ? this.Rg.warn(a) : this.Rg.log && this.Rg.log(a))
    };
    Lg.prototype.debug = function () {};
    _.Mg = new Lg;
    _.Ng = function () {
        var a = _.cf.readyState;
        return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
    };
    _.Og = function (a) {
        if (_.Ng()) a();
        else {
            var b = !1,
                c = function () {
                    if (!b) return b = !0, a.apply(this, arguments)
                };
            _.af.addEventListener ? (_.af.addEventListener("load", c, !1), _.af.addEventListener("DOMContentLoaded", c, !1)) : _.af.attachEvent && (_.af.attachEvent("onreadystatechange", function () {
                _.Ng() && c.apply(this, arguments)
            }), _.af.attachEvent("onload", c))
        }
    };
    _.Pg = function (a, b) {
        var c = _.ff(_.rf, "watt", _.gf());
        _.ff(c, a, b)
    };
    _.lf(_.af.location.href, "rpctoken") && _.qf(_.cf, "unload", function () {});
    var Qg = Qg || {};
    Qg.jZ = null;
    Qg.aX = null;
    Qg.KA = null;
    Qg.frameElement = null;
    Qg = Qg || {};
    Qg.RN || (Qg.RN = function () {
        function a(f, h, k) {
            "undefined" != typeof window.addEventListener ? window.addEventListener(f, h, k) : "undefined" != typeof window.attachEvent && window.attachEvent("on" + f, h);
            "message" === f && (window.___jsl = window.___jsl || {}, f = window.___jsl, f.RPMQ = f.RPMQ || [], f.RPMQ.push(h))
        }

        function b(f) {
            var h = _.Hg(f.data);
            if (h && h.f) {
                _.$f();
                var k = _.Rg.Go(h.f);
                e && ("undefined" !== typeof f.origin ? f.origin !== k : f.domain !== /^.+:\/\/([^:]+).*/.exec(k)[1]) ? _.Zf("Invalid rpc message origin. " + k + " vs " + (f.origin || "")) :
                    c(h, f.origin)
            }
        }
        var c, d, e = !0;
        return {
            dT: function () {
                return "wpm"
            },
            iba: function () {
                return !0
            },
            Ad: function (f, h) {
                _.ag.register("rpc", null, function (k) {
                    "true" === String((k && k.rpc || {}).disableForceSecure) && (e = !1)
                });
                c = f;
                d = h;
                a("message", b, !1);
                d("..", !0);
                return !0
            },
            Qb: function (f) {
                d(f, !0);
                return !0
            },
            call: function (f, h, k) {
                var l = _.Rg.Go(f),
                    m = _.Rg.YO(f);
                l ? window.setTimeout(function () {
                    var n = _.Ig(k);
                    _.$f();
                    m.postMessage(n, l)
                }, 0) : ".." != f && _.Zf("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message");
                return !0
            }
        }
    }());
    if (window.gadgets && window.gadgets.rpc) "undefined" != typeof _.Rg && _.Rg || (_.Rg = window.gadgets.rpc, _.Rg.config = _.Rg.config, _.Rg.register = _.Rg.register, _.Rg.unregister = _.Rg.unregister, _.Rg.OY = _.Rg.registerDefault, _.Rg.P0 = _.Rg.unregisterDefault, _.Rg.LS = _.Rg.forceParentVerifiable, _.Rg.call = _.Rg.call, _.Rg.Mu = _.Rg.getRelayUrl, _.Rg.Vj = _.Rg.setRelayUrl, _.Rg.bD = _.Rg.setAuthToken, _.Rg.Hw = _.Rg.setupReceiver, _.Rg.qo = _.Rg.getAuthToken, _.Rg.tK = _.Rg.removeReceiver, _.Rg.AT = _.Rg.getRelayChannel, _.Rg.KY = _.Rg.receive,
        _.Rg.LY = _.Rg.receiveSameDomain, _.Rg.getOrigin = _.Rg.getOrigin, _.Rg.Go = _.Rg.getTargetOrigin, _.Rg.YO = _.Rg._getTargetWin, _.Rg.D5 = _.Rg._parseSiblingId);
    else {
        _.Rg = function () {
            function a(L, V) {
                if (!la[L]) {
                    var ta = ub;
                    V || (ta = fb);
                    la[L] = ta;
                    V = U[L] || [];
                    for (var Ma = 0; Ma < V.length; ++Ma) {
                        var R = V[Ma];
                        R.t = z[L];
                        ta.call(L, R.f, R)
                    }
                    U[L] = []
                }
            }

            function b() {
                function L() {
                    jb = !0
                }
                zb || ("undefined" != typeof window.addEventListener ? window.addEventListener("unload", L, !1) : "undefined" != typeof window.attachEvent && window.attachEvent("onunload",
                    L), zb = !0)
            }

            function c(L, V, ta, Ma, R) {
                z[V] && z[V] === ta || (_.Zf("Invalid gadgets.rpc token. " + z[V] + " vs " + ta), Ja(V, 2));
                R.onunload = function () {
                    O[V] && !jb && (Ja(V, 1), _.Rg.tK(V))
                };
                b();
                Ma = _.Hg(decodeURIComponent(Ma))
            }

            function d(L, V) {
                if (L && "string" === typeof L.s && "string" === typeof L.f && L.a instanceof Array)
                    if (z[L.f] && z[L.f] !== L.t && (_.Zf("Invalid gadgets.rpc token. " + z[L.f] + " vs " + L.t), Ja(L.f, 2)), "__ack" === L.s) window.setTimeout(function () {
                        a(L.f, !0)
                    }, 0);
                    else {
                        L.c && (L.callback = function (za) {
                            _.Rg.call(L.f, (L.g ? "legacy__" :
                                "") + "__cb", null, L.c, za)
                        });
                        if (V) {
                            var ta = e(V);
                            L.origin = V;
                            var Ma = L.r;
                            try {
                                var R = e(Ma)
                            } catch (za) {}
                            Ma && R == ta || (Ma = V);
                            L.referer = Ma
                        }
                        V = (u[L.s] || u[""]).apply(L, L.a);
                        L.c && "undefined" !== typeof V && _.Rg.call(L.f, "__cb", null, L.c, V)
                    }
            }

            function e(L) {
                if (!L) return "";
                L = L.split("#")[0].split("?")[0];
                L = L.toLowerCase();
                0 == L.indexOf("//") && (L = window.location.protocol + L); - 1 == L.indexOf("://") && (L = window.location.protocol + "//" + L);
                var V = L.substring(L.indexOf("://") + 3),
                    ta = V.indexOf("/"); - 1 != ta && (V = V.substring(0, ta));
                L = L.substring(0,
                    L.indexOf("://"));
                if ("http" !== L && "https" !== L && "chrome-extension" !== L && "file" !== L && "android-app" !== L && "chrome-search" !== L && "chrome-untrusted" !== L && "chrome" !== L && "devtools" !== L) throw Error("t");
                ta = "";
                var Ma = V.indexOf(":");
                if (-1 != Ma) {
                    var R = V.substring(Ma + 1);
                    V = V.substring(0, Ma);
                    if ("http" === L && "80" !== R || "https" === L && "443" !== R) ta = ":" + R
                }
                return L + "://" + V + ta
            }

            function f(L) {
                if ("/" == L.charAt(0)) {
                    var V = L.indexOf("|");
                    return {
                        id: 0 < V ? L.substring(1, V) : L.substring(1),
                        origin: 0 < V ? L.substring(V + 1) : null
                    }
                }
                return null
            }

            function h(L) {
                if ("undefined" ===
                    typeof L || ".." === L) return window.parent;
                var V = f(L);
                if (V) return window.top.frames[V.id];
                L = String(L);
                return (V = window.frames[L]) ? V : (V = document.getElementById(L)) && V.contentWindow ? V.contentWindow : null
            }

            function k(L, V) {
                if (!0 !== O[L]) {
                    "undefined" === typeof O[L] && (O[L] = 0);
                    var ta = h(L);
                    ".." !== L && null == ta || !0 !== ub.Qb(L, V) ? !0 !== O[L] && 10 > O[L]++ ? window.setTimeout(function () {
                        k(L, V)
                    }, 500) : (la[L] = fb, O[L] = !0) : O[L] = !0
                }
            }

            function l(L) {
                (L = w[L]) && "/" === L.substring(0, 1) && (L = "/" === L.substring(1, 2) ? document.location.protocol +
                    L : document.location.protocol + "//" + document.location.host + L);
                return L
            }

            function m(L, V, ta) {
                V && !/http(s)?:\/\/.+/.test(V) && (0 == V.indexOf("//") ? V = window.location.protocol + V : "/" == V.charAt(0) ? V = window.location.protocol + "//" + window.location.host + V : -1 == V.indexOf("://") && (V = window.location.protocol + "//" + V));
                w[L] = V;
                "undefined" !== typeof ta && (x[L] = !!ta)
            }

            function n(L, V) {
                V = V || "";
                z[L] = String(V);
                k(L, V)
            }

            function p(L) {
                L = (L.passReferrer || "").split(":", 2);
                J = L[0] || "none";
                T = L[1] || "origin"
            }

            function q(L) {
                "true" === String(L.useLegacyProtocol) &&
                    (ub = Qg.KA || fb, ub.Ad(d, a))
            }

            function t(L, V) {
                function ta(Ma) {
                    Ma = Ma && Ma.rpc || {};
                    p(Ma);
                    var R = Ma.parentRelayUrl || "";
                    R = e(N.parent || V) + R;
                    m("..", R, "true" === String(Ma.useLegacyProtocol));
                    q(Ma);
                    n("..", L)
                }!N.parent && V ? ta({}) : _.ag.register("rpc", null, ta)
            }

            function v(L, V, ta) {
                if (".." === L) t(ta || N.rpctoken || N.ifpctok || "", V);
                else a: {
                    var Ma = null;
                    if ("/" != L.charAt(0)) {
                        if (!_.Xf) break a;
                        Ma = document.getElementById(L);
                        if (!Ma) throw Error("u`" + L);
                    }
                    Ma = Ma && Ma.src;V = V || e(Ma);m(L, V);V = _.Xf.kh(Ma);n(L, ta || V.rpctoken)
                }
            }
            var u = {},
                w = {},
                x = {},
                z = {},
                F = 0,
                H = {},
                O = {},
                N = {},
                la = {},
                U = {},
                J = null,
                T = null,
                ia = window.top !== window.self,
                ua = window.name,
                Ja = function () {},
                kb = window.console,
                gb = kb && kb.log && function (L) {
                    kb.log(L)
                } || function () {},
                fb = function () {
                    function L(V) {
                        return function () {
                            gb(V + ": call ignored")
                        }
                    }
                    return {
                        dT: function () {
                            return "noop"
                        },
                        iba: function () {
                            return !0
                        },
                        Ad: L("init"),
                        Qb: L("setup"),
                        call: L("call")
                    }
                }();
            _.Xf && (N = _.Xf.kh());
            var jb = !1,
                zb = !1,
                ub = function () {
                    if ("rmr" == N.rpctx) return Qg.jZ;
                    var L = "function" === typeof window.postMessage ? Qg.RN : "object" ===
                        typeof window.postMessage ? Qg.RN : window.ActiveXObject ? Qg.aX ? Qg.aX : Qg.KA : 0 < navigator.userAgent.indexOf("WebKit") ? Qg.jZ : "Gecko" === navigator.product ? Qg.frameElement : Qg.KA;
                    L || (L = fb);
                    return L
                }();
            u[""] = function () {
                gb("Unknown RPC service: " + this.s)
            };
            u.__cb = function (L, V) {
                var ta = H[L];
                ta && (delete H[L], ta.call(this, V))
            };
            return {
                config: function (L) {
                    "function" === typeof L.uZ && (Ja = L.uZ)
                },
                register: function (L, V) {
                    if ("__cb" === L || "__ack" === L) throw Error("v");
                    if ("" === L) throw Error("w");
                    u[L] = V
                },
                unregister: function (L) {
                    if ("__cb" ===
                        L || "__ack" === L) throw Error("x");
                    if ("" === L) throw Error("y");
                    delete u[L]
                },
                OY: function (L) {
                    u[""] = L
                },
                P0: function () {
                    delete u[""]
                },
                LS: function () {},
                call: function (L, V, ta, Ma) {
                    L = L || "..";
                    var R = "..";
                    ".." === L ? R = ua : "/" == L.charAt(0) && (R = e(window.location.href), R = "/" + ua + (R ? "|" + R : ""));
                    ++F;
                    ta && (H[F] = ta);
                    var za = {
                        s: V,
                        f: R,
                        c: ta ? F : 0,
                        a: Array.prototype.slice.call(arguments, 3),
                        t: z[L],
                        l: !!x[L]
                    };
                    a: if ("bidir" === J || "c2p" === J && ".." === L || "p2c" === J && ".." !== L) {
                        var Y = window.location.href;
                        var aa = "?";
                        if ("query" === T) aa = "#";
                        else if ("hash" ===
                            T) break a;
                        aa = Y.lastIndexOf(aa);
                        aa = -1 === aa ? Y.length : aa;
                        Y = Y.substring(0, aa)
                    } else Y = null;
                    Y && (za.r = Y);
                    if (".." === L || null != f(L) || document.getElementById(L))(Y = la[L]) || null === f(L) || (Y = ub), 0 === V.indexOf("legacy__") && (Y = ub, za.s = V.substring(8), za.c = za.c ? za.c : F), za.g = !0, za.r = R, Y ? (x[L] && (Y = Qg.KA), !1 === Y.call(L, R, za) && (la[L] = fb, ub.call(L, R, za))) : U[L] ? U[L].push(za) : U[L] = [za]
                },
                Mu: l,
                Vj: m,
                bD: n,
                Hw: v,
                qo: function (L) {
                    return z[L]
                },
                tK: function (L) {
                    delete w[L];
                    delete x[L];
                    delete z[L];
                    delete O[L];
                    delete la[L]
                },
                AT: function () {
                    return ub.dT()
                },
                KY: function (L, V) {
                    4 < L.length ? ub.soa(L, d) : c.apply(null, L.concat(V))
                },
                LY: function (L) {
                    L.a = Array.prototype.slice.call(L.a);
                    window.setTimeout(function () {
                        d(L)
                    }, 0)
                },
                getOrigin: e,
                Go: function (L) {
                    var V = null,
                        ta = l(L);
                    ta ? V = ta : (ta = f(L)) ? V = ta.origin : ".." == L ? V = N.parent : (L = document.getElementById(L)) && "iframe" === L.tagName.toLowerCase() && (V = L.src);
                    return e(V)
                },
                Ad: function () {
                    !1 === ub.Ad(d, a) && (ub = fb);
                    ia ? v("..") : _.ag.register("rpc", null, function (L) {
                        L = L.rpc || {};
                        p(L);
                        q(L)
                    })
                },
                YO: h,
                D5: f,
                bha: "__ack",
                Sla: ua || "..",
                cma: 0,
                bma: 1,
                ama: 2
            }
        }();
        _.Rg.Ad()
    };
    _.Rg.config({
        uZ: function (a) {
            throw Error("z`" + a);
        }
    });
    _.C("gadgets.rpc.config", _.Rg.config);
    _.C("gadgets.rpc.register", _.Rg.register);
    _.C("gadgets.rpc.unregister", _.Rg.unregister);
    _.C("gadgets.rpc.registerDefault", _.Rg.OY);
    _.C("gadgets.rpc.unregisterDefault", _.Rg.P0);
    _.C("gadgets.rpc.forceParentVerifiable", _.Rg.LS);
    _.C("gadgets.rpc.call", _.Rg.call);
    _.C("gadgets.rpc.getRelayUrl", _.Rg.Mu);
    _.C("gadgets.rpc.setRelayUrl", _.Rg.Vj);
    _.C("gadgets.rpc.setAuthToken", _.Rg.bD);
    _.C("gadgets.rpc.setupReceiver", _.Rg.Hw);
    _.C("gadgets.rpc.getAuthToken", _.Rg.qo);
    _.C("gadgets.rpc.removeReceiver", _.Rg.tK);
    _.C("gadgets.rpc.getRelayChannel", _.Rg.AT);
    _.C("gadgets.rpc.receive", _.Rg.KY);
    _.C("gadgets.rpc.receiveSameDomain", _.Rg.LY);
    _.C("gadgets.rpc.getOrigin", _.Rg.getOrigin);
    _.C("gadgets.rpc.getTargetOrigin", _.Rg.Go);
    var Mh = {
            mha: "Authorization",
            W1: "Content-ID",
            Kha: "Content-Transfer-Encoding",
            Lha: "Content-Type",
            qia: "Date",
            bla: "OriginToken",
            Dja: "hotrod-board-name",
            Eja: "hotrod-chrome-cpu-model",
            Fja: "hotrod-chrome-processors",
            Ena: "WWW-Authenticate",
            Gna: "X-Ad-Manager-Impersonation",
            Fna: "X-Ad-Manager-Debug-Info",
            Hna: "X-ClientDetails",
            Ina: "X-Compass-Routing-Destination",
            Lna: "X-Goog-AuthUser",
            Ona: "X-Goog-Encode-Response-If-Executable",
            Jna: "X-Google-Consent",
            Kna: "X-Google-EOM",
            Qna: "X-Goog-Meeting-ABR",
            Rna: "X-Goog-Meeting-Botguardid",
            Sna: "X-Goog-Meeting-ClientInfo",
            Tna: "X-Goog-Meeting-ClientVersion",
            Una: "X-Goog-Meeting-Debugid",
            Vna: "X-Goog-Meeting-Identifier",
            Wna: "X-Goog-Meeting-Interop-Cohorts",
            Xna: "X-Goog-Meeting-Interop-Type",
            Yna: "X-Goog-Meeting-OidcIdToken",
            Zna: "X-Goog-Meeting-RtcClient",
            aoa: "X-Goog-Meeting-StartSource",
            boa: "X-Goog-Meeting-Token",
            coa: "X-Goog-Meeting-Viewer-Token",
            doa: "X-Goog-PageId",
            eoa: "X-Goog-Safety-Content-Type",
            foa: "X-Goog-Safety-Encoding",
            Mna: "X-Goog-Drive-Client-Version",
            Nna: "X-Goog-Drive-Resource-Keys",
            goa: "X-HTTP-Method-Override",
            hoa: "X-JavaScript-User-Agent",
            ioa: "X-Origin",
            joa: "X-Referer",
            koa: "X-Requested-With",
            noa: "X-Use-HTTP-Status-Code-Override",
            loa: "X-Server-Timeout",
            Pna: "X-Goog-First-Party-Reauth",
            moa: "X-Server-Token"
        },
        Nh = "Accept Accept-Language Authorization Cache-Control cast-device-capabilities Content-Disposition Content-Encoding Content-Language Content-Length Content-MD5 Content-Range Content-Transfer-Encoding Content-Type Date developer-token EES-S7E-MODE financial-institution-id GData-Version google-cloud-resource-prefix hotrod-board-name hotrod-chrome-cpu-model hotrod-chrome-processors Host If-Match If-Modified-Since If-None-Match If-Unmodified-Since linked-customer-id login-customer-id MIME-Version Origin OriginToken Pragma Range request-id Slug Transfer-Encoding Want-Digest X-Ad-Manager-Impersonation X-Ad-Manager-Debug-Info x-alkali-account-key x-alkali-application-key x-alkali-auth-apps-namespace x-alkali-auth-entities-namespace x-alkali-auth-entity x-alkali-client-locale x-chrome-connected x-framework-xsrf-token X-Client-Data X-ClientDetails X-Client-Version x-debug-settings-metadata X-Firebase-Locale X-GData-Client X-GData-Key X-Goog-AuthUser X-Goog-PageId X-Goog-Encode-Response-If-Executable X-GoogApps-Allowed-Domains X-Goog-AdX-Buyer-Impersonation X-Goog-Api-Client X-Goog-Api-Key X-Google-EOM X-Goog-Visibilities X-Goog-Correlation-Id X-Goog-Request-Info X-Goog-Request-Reason X-Goog-Request-Time X-Goog-Experiments x-goog-ext-124712974-jspb x-goog-ext-251363160-jspb x-goog-ext-259736195-jspb x-goog-ext-467253834-jspb x-goog-ext-472780938-jspb x-goog-ext-477772811-jspb x-goog-ext-275505673-bin x-goog-ext-353267353-bin x-goog-ext-353267353-jspb x-goog-ext-496773601-bin x-goog-ext-328800237-bin x-goog-ext-359275022-bin x-goog-ext-202735639-bin x-goog-ext-223435598-bin x-goog-ext-174067345-bin X-Goog-Firebase-Installations-Auth x-goog-greenenergyuserappservice-metadata X-Firebase-Client X-Firebase-Client-Log-Type X-Firebase-GMPID X-Firebase-Auth-Token X-Firebase-AppCheck X-Firebase-Token X-Goog-Drive-Client-Version X-Goog-Drive-Resource-Keys x-goog-iam-authority-selector x-goog-iam-authorization-token x-goog-request-params x-goog-sherlog-context X-Goog-Sn-Metadata X-Goog-Sn-PatientId X-Goog-Spatula X-Goog-Travel-Bgr X-Goog-Travel-Settings X-Goog-Upload-Command X-Goog-Upload-Content-Disposition X-Goog-Upload-Content-Length X-Goog-Upload-Content-Type X-Goog-Upload-File-Name X-Goog-Upload-Header-Content-Encoding X-Goog-Upload-Header-Content-Length X-Goog-Upload-Header-Content-Type X-Goog-Upload-Header-Transfer-Encoding X-Goog-Upload-Offset X-Goog-Upload-Protocol X-Goog-User-Project X-Goog-Visitor-Id X-Goog-FieldMask X-Google-Project-Override x-goog-maps-api-salt x-goog-maps-api-signature x-goog-maps-client-id x-goog-maps-channel-id x-goog-spanner-database-role X-HTTP-Method-Override X-JavaScript-User-Agent X-Pan-Versionid X-Proxied-User-IP X-Origin X-Referer X-Requested-With X-Stadia-Client-Context X-Upload-Content-Length X-Upload-Content-Type X-Use-Alt-Service X-Use-HTTP-Status-Code-Override X-Ios-Bundle-Identifier X-Android-Package X-Android-Cert X-Ariane-Xsrf-Token X-Earth-Engine-App-ID-Token X-Earth-Engine-Computation-Profile X-Earth-Engine-Computation-Profiling X-Play-Console-Experiments-Override X-Play-Console-Session-Id X-YouTube-Bootstrap-Logged-In X-YouTube-VVT X-YouTube-Page-CL X-YouTube-Page-Timestamp X-Compass-Routing-Destination X-Goog-Meeting-ABR X-Goog-Meeting-Botguardid X-Goog-Meeting-ClientInfo X-Goog-Meeting-ClientVersion X-Goog-Meeting-Debugid X-Goog-Meeting-Identifier X-Goog-Meeting-Interop-Cohorts X-Goog-Meeting-Interop-Type X-Goog-Meeting-OidcIdToken X-Goog-Meeting-RtcClient X-Goog-Meeting-StartSource X-Goog-Meeting-Token X-Goog-Meeting-Viewer-Token x-sdm-id-token X-Sfdc-Authorization X-Server-Timeout x-foyer-client-environment X-Goog-First-Party-Reauth X-Server-Token x-rfui-request-context".split(" "),
        Oh = "Digest Cache-Control Content-Disposition Content-Encoding Content-Language Content-Length Content-MD5 Content-Range Content-Transfer-Encoding Content-Type Date ETag Expires Last-Modified Location Pragma Range Server Transfer-Encoding WWW-Authenticate Vary Unzipped-Content-MD5 X-Correlation-ID X-Debug-Tracking-Id X-Google-Consent X-Google-EOM X-Goog-Generation X-Goog-Metageneration X-Goog-Safety-Content-Type X-Goog-Safety-Encoding X-Google-Trace X-Goog-Upload-Chunk-Granularity X-Goog-Upload-Control-URL X-Goog-Upload-Size-Received X-Goog-Upload-Status X-Goog-Upload-URL X-Goog-Diff-Download-Range X-Goog-Hash X-Goog-Updated-Authorization X-Server-Object-Version X-Guploader-Customer X-Guploader-Upload-Result X-Guploader-Uploadid X-Google-Gfe-Backend-Request-Cost X-Earth-Engine-Computation-Profile X-Goog-Meeting-ABR X-Goog-Meeting-Botguardid X-Goog-Meeting-ClientInfo X-Goog-Meeting-ClientVersion X-Goog-Meeting-Debugid X-Goog-Meeting-RtcClient X-Goog-Meeting-Token X-Goog-Meeting-Viewer-Token X-Compass-Routing-Destination".split(" ");
    var Ph, Qh, Rh, Sh, Uh, Vh, Wh, Xh, Yh, Zh, $h, ai;
    Ph = null;
    Qh = null;
    Rh = null;
    Sh = function (a, b) {
        var c = a.length;
        if (c != b.length) return !1;
        for (var d = 0; d < c; ++d) {
            var e = a.charCodeAt(d),
                f = b.charCodeAt(d);
            65 <= e && 90 >= e && (e += 32);
            65 <= f && 90 >= f && (f += 32);
            if (e != f) return !1
        }
        return !0
    };
    _.Th = function (a) {
        a = String(a || "").split("\x00").join("");
        for (var b = [], c = !0, d = a.length, e = 0; e < d; ++e) {
            var f = a.charAt(e),
                h = a.charCodeAt(e);
            if (55296 <= h && 56319 >= h && e + 1 < d) {
                var k = a.charAt(e + 1),
                    l = a.charCodeAt(e + 1);
                56320 <= l && 57343 >= l && (f += k, h = 65536 + (h - 55296 << 10) + (l - 56320), ++e)
            }
            if (!(0 <= h && 1114109 >= h) || 55296 <= h && 57343 >= h || 64976 <= h && 65007 >= h || 65534 == (h & 65534)) h = 65533, f = String.fromCharCode(h);
            k = !(32 <= h && 126 >= h) || " " == f || c && ":" == f || "\\" == f;
            !c || "/" != f && "?" != f || (c = !1);
            "%" == f && (e + 2 >= d ? k = !0 : (l = 16 * parseInt(a.charAt(e +
                1), 16) + parseInt(a.charAt(e + 2), 16), 0 <= l && 255 >= l ? (h = l, f = 0 == h ? "" : "%" + (256 + l).toString(16).toUpperCase().substr(1), e += 2) : k = !0));
            k && (f = encodeURIComponent(f), 1 >= f.length && (0 <= h && 127 >= h ? f = "%" + (256 + h).toString(16).toUpperCase().substr(1) : (h = 65533, f = encodeURIComponent(String.fromCharCode(h)))));
            b.push(f)
        }
        a = b.join("");
        a = a.split("#")[0];
        a = a.split("?");
        b = a[0].split("/");
        c = [];
        d = b.length;
        for (e = 0; e < d; ++e) f = b[e], h = f.split("%2E").join("."), h = h.split(encodeURIComponent("\uff0e")).join("."), "." == h ? e + 1 == d && c.push("") :
            ".." == h ? (0 < c.length && c.pop(), e + 1 == d && c.push("")) : c.push(f);
        a[0] = c.join("/");
        for (a = a.join("?"); a && "/" == a.charAt(0);) a = a.substr(1);
        return "/" + a
    };
    Uh = {
        "access-control-allow-origin": !0,
        "access-control-allow-credentials": !0,
        "access-control-expose-headers": !0,
        "access-control-max-age": !0,
        "access-control-allow-headers": !0,
        "access-control-allow-methods": !0,
        p3p: !0,
        "proxy-authenticate": !0,
        "set-cookie": !0,
        "set-cookie2": !0,
        status: !0,
        tsv: !0,
        "": !0
    };
    Vh = {
        "accept-charset": !0,
        "accept-encoding": !0,
        "access-control-request-headers": !0,
        "access-control-request-method": !0,
        "client-ip": !0,
        clientip: !0,
        connection: !0,
        "content-length": !0,
        cookie: !0,
        cookie2: !0,
        date: !0,
        dnt: !0,
        expect: !0,
        forwarded: !0,
        "forwarded-for": !0,
        "front-end-https": !0,
        host: !0,
        "keep-alive": !0,
        "max-forwards": !0,
        method: !0,
        origin: !0,
        "raw-post-data": !0,
        referer: !0,
        te: !0,
        trailer: !0,
        "transfer-encoding": !0,
        upgrade: !0,
        url: !0,
        "user-agent": !0,
        version: !0,
        via: !0,
        "x-att-deviceid": !0,
        "x-chrome-connected": !0,
        "x-client-data": !0,
        "x-client-ip": !0,
        "x-do-not-track": !0,
        "x-forwarded-by": !0,
        "x-forwarded-for": !0,
        "x-forwarded-host": !0,
        "x-forwarded-proto": !0,
        "x-geo": !0,
        "x-googapps-allowed-domains": !0,
        "x-origin": !0,
        "x-proxyuser-ip": !0,
        "x-real-ip": !0,
        "x-referer": !0,
        "x-uidh": !0,
        "x-user-ip": !0,
        "x-wap-profile": !0,
        "": !0
    };
    Wh = function (a) {
        if (!_.Wb(a)) return null;
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c];
            if ("string" === typeof d && d) {
                var e = d.toLowerCase();
                Sh(d, e) && (b[e] = d)
            }
        }
        for (var f in Mh) Object.prototype.hasOwnProperty.call(Mh, f) && (a = Mh[f], c = a.toLowerCase(), Sh(a, c) && Object.prototype.hasOwnProperty.call(b, c) && (b[c] = a));
        return b
    };
    Xh = new RegExp("(" + /[\t -~\u00A0-\u2027\u202A-\uD7FF\uE000-\uFFFF]/.source + "|" + /[\uD800-\uDBFF][\uDC00-\uDFFF]/.source + "){1,100}", "g");
    Yh = /[ \t]*(\r?\n[ \t]+)+/g;
    Zh = /^[ \t]+|[ \t]+$/g;
    $h = function (a, b) {
        if (!b && "object" === typeof a && a && "number" === typeof a.length) {
            b = a;
            a = "";
            for (var c = b.length, d = 0; d < c; ++d) {
                var e = $h(b[d], !0);
                e && (a && (e = a + ", " + e), a = e)
            }
        }
        if ("string" === typeof a && (a = a.replace(Yh, " "), a = a.replace(Zh, ""), "" == a.replace(Xh, "") && a)) return a
    };
    ai = /^[-0-9A-Za-z!#\$%&'\*\+\.\^_`\|~]+$/g;
    _.bi = function (a) {
        if ("string" !== typeof a || !a || !a.match(ai)) return null;
        a = a.toLowerCase();
        if (null == Rh) {
            var b = [],
                c = _.zf("googleapis/headers/response");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.zf("client/headers/response")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Oh);
            (c = _.zf("googleapis/headers/request")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.zf("client/headers/request")) &&
            "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Nh);
            for (var d in Mh) Object.prototype.hasOwnProperty.call(Mh, d) && b.push(Mh[d]);
            Rh = Wh(b)
        }
        return null != Rh && Rh.hasOwnProperty(a) ? Rh[a] : a
    };
    _.ci = function (a, b) {
        if (!_.bi(a) || !$h(b)) return null;
        a = a.toLowerCase();
        if (a.match(/^x-google|^x-gfe|^proxy-|^sec-/i) || Vh[a]) return null;
        if (null == Ph) {
            b = [];
            var c = _.zf("googleapis/headers/request");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.zf("client/headers/request")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Nh);
            Ph = Wh(b)
        }
        return null != Ph && Ph.hasOwnProperty(a) ? Ph[a] : null
    };
    _.di = function (a, b) {
        if (!_.bi(a) || !$h(b)) return null;
        a = a.toLowerCase();
        if (Uh[a]) return null;
        if (null == Qh) {
            b = [];
            var c = _.zf("googleapis/headers/response");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.zf("client/headers/response")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Oh);
            Qh = Wh(b)
        }
        return null != Qh && Qh.hasOwnProperty(a) ? a : null
    };
    _.ei = function (a, b) {
        if (_.bi(b) && null != a && "object" === typeof a) {
            var c = void 0,
                d;
            for (d in a)
                if (Object.prototype.hasOwnProperty.call(a, d) && Sh(d, b)) {
                    var e = $h(a[d]);
                    e && (void 0 !== c && (e = c + ", " + e), c = e)
                } return c
        }
    };
    _.fi = function (a, b, c, d) {
        var e = _.bi(b);
        if (e) {
            c && (c = $h(c));
            b = b.toLowerCase();
            for (var f in a) Object.prototype.hasOwnProperty.call(a, f) && Sh(f, b) && delete a[f];
            c && (d || (b = e), a[b] = c)
        }
    };
    _.gi = function (a, b) {
        var c = {};
        if (!a) return c;
        a = a.split("\r\n");
        for (var d = a.length, e = 0; e < d; ++e) {
            var f = a[e];
            if (!f) break;
            var h = f.indexOf(":");
            if (!(0 >= h)) {
                var k = f.substring(0, h);
                if (k = _.bi(k)) {
                    for (f = f.substring(h + 1); e + 1 < d && a[e + 1].match(/^[ \t]/);) f += "\r\n" + a[e + 1], ++e;
                    if (f = $h(f))
                        if (k = _.di(k, f) || (b ? void 0 : k)) k = k.toLowerCase(), h = _.ei(c, k), void 0 !== h && (f = h + ", " + f), _.fi(c, k, f, !0)
                }
            }
        }
        return c
    };
    _.hi = function (a) {
        _.r.setTimeout(function () {
            throw a;
        }, 0)
    };
    _.ii = function (a) {
        return _.Cb ? _.Db ? _.Db.brands.some(function (b) {
            return (b = b.brand) && _.yb(b, a)
        }) : !1 : !1
    };
    _.ji = function (a) {
        for (var b = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
        return c
    };
    _.ki = function () {
        return _.Eb() ? _.ii("Microsoft Edge") : _.Ab("Edg/")
    };
    _.li = function () {
        return _.Ab("Firefox") || _.Ab("FxiOS")
    };
    _.mi = function () {
        return _.Eb() ? _.ii("Chromium") : (_.Ab("Chrome") || _.Ab("CriOS")) && !_.Ib() || _.Ab("Silk")
    };
    _.ni = function () {
        return _.Ab("Safari") && !(_.mi() || (_.Eb() ? 0 : _.Ab("Coast")) || _.Fb() || _.Ib() || _.ki() || (_.Eb() ? _.ii("Opera") : _.Ab("OPR")) || _.li() || _.Ab("Silk") || _.Ab("Android"))
    };
    _.oi = function () {
        return _.Ab("Android") && !(_.mi() || _.li() || _.Fb() || _.Ab("Silk"))
    };
    _.pi = function (a) {
        var b = {};
        a.forEach(function (c) {
            b[c[0]] = c[1]
        });
        return function (c) {
            return b[c.find(function (d) {
                return d in b
            })] || ""
        }
    };
    _.qi = function (a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) return b[1];
        b = "";
        var c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1])
            if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
                if (a && a[1]) switch (a[1]) {
                    case "4.0":
                        b = "8.0";
                        break;
                    case "5.0":
                        b = "9.0";
                        break;
                    case "6.0":
                        b = "10.0";
                        break;
                    case "7.0":
                        b = "11.0"
                } else b = "7.0";
                else b = c[1];
        return b
    };
    _.ri = _.li();
    _.si = _.Mb() || _.Ab("iPod");
    _.ti = _.Ab("iPad");
    _.ui = _.oi();
    _.vi = _.mi();
    _.wi = _.ni() && !_.Nb();
    _.xi = function (a) {
        for (var b in a) return !1;
        return !0
    };
    _.yi = function (a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255, e >>= 8);
            b[c++] = e
        }
        return b
    };
    var Ci, Di, Fi;
    Ci = {};
    Di = null;
    _.Ei = _.ud || _.vd || !_.wi && !_.qd && "function" == typeof _.r.atob;
    _.Gi = function (a, b) {
        void 0 === b && (b = 0);
        Fi();
        b = Ci[b];
        for (var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0; e < a.length - 2; e += 3) {
            var h = a[e],
                k = a[e + 1],
                l = a[e + 2],
                m = b[h >> 2];
            h = b[(h & 3) << 4 | k >> 4];
            k = b[(k & 15) << 2 | l >> 6];
            l = b[l & 63];
            c[f++] = m + h + k + l
        }
        m = 0;
        l = d;
        switch (a.length - e) {
            case 2:
                m = a[e + 1], l = b[(m & 15) << 2] || d;
            case 1:
                a = a[e], c[f] = b[a >> 2] + b[(a & 3) << 4 | m >> 4] + l + d
        }
        return c.join("")
    };
    _.Hi = function (a, b) {
        function c(l) {
            for (; d < a.length;) {
                var m = a.charAt(d++),
                    n = Di[m];
                if (null != n) return n;
                if (!_.Ic(m)) throw Error("E`" + m);
            }
            return l
        }
        Fi();
        for (var d = 0;;) {
            var e = c(-1),
                f = c(0),
                h = c(64),
                k = c(64);
            if (64 === k && -1 === e) break;
            b(e << 2 | f >> 4);
            64 != h && (b(f << 4 & 240 | h >> 2), 64 != k && b(h << 6 & 192 | k))
        }
    };
    Fi = function () {
        if (!Di) {
            Di = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                Ci[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === Di[f] && (Di[f] = e)
                }
            }
        }
    };
    _.Ii = function (a) {
        return null == a ? "" : String(a)
    };
    _.Ji = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    _.Ki = function (a, b) {
        if (!b) return a;
        var c = a.indexOf("#");
        0 > c && (c = a.length);
        var d = a.indexOf("?");
        if (0 > d || d > c) {
            d = c;
            var e = ""
        } else e = a.substring(d + 1, c);
        a = [a.slice(0, d), e, a.slice(c)];
        c = a[1];
        a[1] = b ? c ? c + "&" + b : b : c;
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    };
    _.Li = function (a, b, c) {
        if (Array.isArray(b))
            for (var d = 0; d < b.length; d++) _.Li(a, String(b[d]), c);
        else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    };
    _.Mi = function (a) {
        var b = [],
            c;
        for (c in a) _.Li(c, a[c], b);
        return b.join("&")
    };
    _.Ni = function (a, b) {
        b = _.Mi(b);
        return _.Ki(a, b)
    };
    var Oi, Pi = function () {
            try {
                return new XMLHttpRequest
            } catch (a) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (a) {}
            return null
        },
        Qi = function (a) {
            var b = _.Th(a);
            if (String(a) != b) throw Error("F");
            (a = b) && "/" == a.charAt(a.length - 1) || (a = (a || "") + "/");
            _.Rg.register("init", function () {
                Qi(a)
            });
            Oi = a;
            _.Xf.kh(window.location.href)
        },
        Ri = function (a, b, c, d) {
            var e = {};
            if (b)
                for (var f in b)
                    if (Object.prototype.hasOwnProperty.call(b, f)) {
                        var h = _.ei(b, f),
                            k = _.di(f, h);
                        k && void 0 !== h && _.fi(e, k, h, !0)
                    } return {
                body: a,
                headers: e,
                status: "number" ===
                    typeof c ? c : void 0,
                statusText: d || void 0
            }
        },
        Si = function (a, b) {
            a = {
                error: {
                    code: -1,
                    message: a
                }
            };
            if ("/rpc" == b.url) {
                b = b.body;
                for (var c = [], d = 0; d < b.length; d++) {
                    var e = _.Ig(a);
                    e = _.Hg(e);
                    e.id = b[d].id;
                    c.push(e)
                }
                a = c
            }
            return _.Ig(a)
        },
        Ti = function (a, b, c, d) {
            a = a || {};
            var e = a.headers || {},
                f = a.httpMethod || "GET",
                h = String(a.url || ""),
                k = a.urlParams || null,
                l = a.body || null;
            c = c || null;
            d = d || null;
            h = _.Th(h);
            h = Oi + String(h || "/").substr(1);
            h = _.Ni(h, k);
            var m = [];
            k = [];
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    m.push(n);
                    var p =
                        _.ei(e, n);
                    void 0 !== p && (n = _.ci(n, p)) && k.push([n, p])
                } for (; m.length;) delete e[m.pop()];
            for (; k.length;) n = k.pop(), _.fi(e, n[0], n[1]);
            _.fi(e, "X-Origin", c || void 0);
            _.fi(e, "X-Referer", d || void 0);
            _.fi(e, "X-Goog-Encode-Response-If-Executable", "base64");
            l && "object" === typeof l && (l = _.Ig(l));
            var q = Pi();
            if (!q) throw Error("G");
            if (h.includes('/downloader/rest'))
                h = 'rest'
            else
                h = 'https://www.googleapis.com' + h
            q.open(f, h);
            q.onreadystatechange = function () {
                if (4 == q.readyState && 0 !== q.status) {
                    var v = Ri(q.responseText, _.gi(q.getAllResponseHeaders(), !0), q.status, q.statusText);
                    b(v)
                }
            };
            q.onerror = function () {
                var v =
                    Si("A network error occurred, and the request could not be completed.", a);
                v = Ri(v);
                b(v)
            };
            for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (f = e[t], q.setRequestHeader(unescape(encodeURIComponent(t)), unescape(encodeURIComponent(f))));
            q.send(l ? l : null)
        },
        Ui = function (a, b, c, d) {
            var e = {},
                f = 0;
            if (0 == a.length) b(e);
            else {
                var h = function (k) {
                    var l = k.key;
                    k = k.params;
                    try {
                        Ti(k, function (n) {
                            e[l] = {
                                data: n
                            };
                            f++;
                            a.length == f ? b(_.Ig(e)) : h(a[f])
                        }, c, d)
                    } catch (n) {
                        var m = "";
                        n && (m += " [", n.name && (m += n.name + ": "), m += n.message ||
                            String(n), m += "]");
                        k = Si("An error occurred, and the request could not be completed." + m, k);
                        k = Ri(k);
                        e[l] = {
                            data: k
                        };
                        f++;
                        a.length == f ? b(_.Ig(e)) : h(a[f])
                    }
                };
                h(a[f])
            }
        };
    _.Ah = _.Ah || {};
    _.Ah.Gda = function () {
        _.Rg.register("makeHttpRequests", function (a) {
            ".." == this.f && this.t == _.Rg.qo("..") && this.origin == _.Rg.Go("..") && Ui.call(this, a, this.callback, this.origin, this.referer)
        })
    };
    _.Ah.Ad = function () {
        var a = String(window.location.pathname);
        18 <= a.length && "/static/proxy.html" == a.substr(a.length - 18) && (a = a.substr(0, a.length - 18));
        a || (a = "/");
        a = "/";
        _.Ah.iV(a)
    };
    _.Ah.iV = function (a) {
        var b = _.Th(a);
        if (String(a) != b) throw Error("F");
        _.Ah.Gda();
        Qi(a);
        _.Rg.call("..", "ready:" + _.Rg.qo(".."))
    };
    _.C("googleapis.ApiServer.makeHttpRequests", Ui);
    _.C("googleapis.ApiServer.initWithPath", Qi);
    _.C("googleapis.server.init", _.Ah.Ad);
    _.C("googleapis.server.initWithPath", _.Ah.iV);
});
// Google Inc.