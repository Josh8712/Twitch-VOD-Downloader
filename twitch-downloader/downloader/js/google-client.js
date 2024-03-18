gapi.loaded_0(function(_) {
    var window = this;
    _._F_toggles_initialize = function(a) {
        ("undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof self ? self : this)._F_toggles = a || []
    }
    ;
    (0,
    _._F_toggles_initialize)([]);
    var fa, ka, ma, ra, sa, wa, Ca, Ea;
    _.ea = function(a) {
        return function() {
            return _.da[a].apply(this, arguments)
        }
    }
    ;
    _.da = [];
    fa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    ;
    ka = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    ma = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("a");
    }
    ;
    _.na = ma(this);
    ra = function(a, b) {
        if (b)
            a: {
                var c = _.na;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ka(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    }
    ;
    ra("Symbol", function(a) {
        if (a)
            return a;
        var b = function(f, h) {
            this.z1 = f;
            ka(this, "description", {
                configurable: !0,
                writable: !0,
                value: h
            })
        };
        b.prototype.toString = function() {
            return this.z1
        }
        ;
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , d = 0
          , e = function(f) {
            if (this instanceof e)
                throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++,f)
        };
        return e
    });
    ra("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = _.na[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ka(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return sa(fa(this))
                }
            })
        }
        return a
    });
    sa = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
    ;
    _.va = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: fa(a)
            };
        throw Error("b`" + String(a));
    }
    ;
    wa = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ;
    Ca = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    wa(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    ra("Object.assign", function(a) {
        return a || Ca
    });
    _.Da = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    }
    ;
    if ("function" == typeof Object.setPrototypeOf)
        Ea = Object.setPrototypeOf;
    else {
        var Fa;
        a: {
            var Ga = {
                a: !0
            }
              , Ha = {};
            try {
                Ha.__proto__ = Ga;
                Fa = Ha.a;
                break a
            } catch (a) {}
            Fa = !1
        }
        Ea = Fa ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    _.Ia = Ea;
    ra("Promise", function(a) {
        function b() {
            this.Nf = null
        }
        function c(h) {
            return h instanceof e ? h : new e(function(k) {
                k(h)
            }
            )
        }
        if (a)
            return a;
        b.prototype.JP = function(h) {
            if (null == this.Nf) {
                this.Nf = [];
                var k = this;
                this.KP(function() {
                    k.G7()
                })
            }
            this.Nf.push(h)
        }
        ;
        var d = _.na.setTimeout;
        b.prototype.KP = function(h) {
            d(h, 0)
        }
        ;
        b.prototype.G7 = function() {
            for (; this.Nf && this.Nf.length; ) {
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
        }
        ;
        b.prototype.yq = function(h) {
            this.KP(function() {
                throw h;
            })
        }
        ;
        var e = function(h) {
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
        e.prototype.LF = function() {
            function h(m) {
                return function(n) {
                    l || (l = !0,
                    m.call(k, n))
                }
            }
            var k = this
              , l = !1;
            return {
                resolve: h(this.eea),
                reject: h(this.pK)
            }
        }
        ;
        e.prototype.eea = function(h) {
            if (h === this)
                this.pK(new TypeError("A Promise cannot resolve to itself"));
            else if (h instanceof e)
                this.Gfa(h);
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
        }
        ;
        e.prototype.dea = function(h) {
            var k = void 0;
            try {
                k = h.then
            } catch (l) {
                this.pK(l);
                return
            }
            "function" == typeof k ? this.Hfa(k, h) : this.QS(h)
        }
        ;
        e.prototype.pK = function(h) {
            this.t_(2, h)
        }
        ;
        e.prototype.QS = function(h) {
            this.t_(1, h)
        }
        ;
        e.prototype.t_ = function(h, k) {
            if (0 != this.Fa)
                throw Error("c`" + h + "`" + k + "`" + this.Fa);
            this.Fa = h;
            this.Cf = k;
            2 === this.Fa && this.tea();
            this.H7()
        }
        ;
        e.prototype.tea = function() {
            var h = this;
            d(function() {
                if (h.jca()) {
                    var k = _.na.console;
                    "undefined" !== typeof k && k.error(h.Cf)
                }
            }, 1)
        }
        ;
        e.prototype.jca = function() {
            if (this.LV)
                return !1;
            var h = _.na.CustomEvent
              , k = _.na.Event
              , l = _.na.dispatchEvent;
            if ("undefined" === typeof l)
                return !0;
            "function" === typeof h ? h = new h("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof k ? h = new k("unhandledrejection",{
                cancelable: !0
            }) : (h = _.na.document.createEvent("CustomEvent"),
            h.initCustomEvent("unhandledrejection", !1, !0, h));
            h.promise = this;
            h.reason = this.Cf;
            return l(h)
        }
        ;
        e.prototype.H7 = function() {
            if (null != this.Yr) {
                for (var h = 0; h < this.Yr.length; ++h)
                    f.JP(this.Yr[h]);
                this.Yr = null
            }
        }
        ;
        var f = new b;
        e.prototype.Gfa = function(h) {
            var k = this.LF();
            h.Dy(k.resolve, k.reject)
        }
        ;
        e.prototype.Hfa = function(h, k) {
            var l = this.LF();
            try {
                h.call(k, l.resolve, l.reject)
            } catch (m) {
                l.reject(m)
            }
        }
        ;
        e.prototype.then = function(h, k) {
            function l(q, t) {
                return "function" == typeof q ? function(v) {
                    try {
                        m(q(v))
                    } catch (u) {
                        n(u)
                    }
                }
                : t
            }
            var m, n, p = new e(function(q, t) {
                m = q;
                n = t
            }
            );
            this.Dy(l(h, m), l(k, n));
            return p
        }
        ;
        e.prototype.catch = function(h) {
            return this.then(void 0, h)
        }
        ;
        e.prototype.Dy = function(h, k) {
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
        }
        ;
        e.resolve = c;
        e.reject = function(h) {
            return new e(function(k, l) {
                l(h)
            }
            )
        }
        ;
        e.race = function(h) {
            return new e(function(k, l) {
                for (var m = _.va(h), n = m.next(); !n.done; n = m.next())
                    c(n.value).Dy(k, l)
            }
            )
        }
        ;
        e.all = function(h) {
            var k = _.va(h)
              , l = k.next();
            return l.done ? c([]) : new e(function(m, n) {
                function p(v) {
                    return function(u) {
                        q[v] = u;
                        t--;
                        0 == t && m(q)
                    }
                }
                var q = []
                  , t = 0;
                do
                    q.push(void 0),
                    t++,
                    c(l.value).Dy(p(q.length - 1), n),
                    l = k.next();
                while (!l.done)
            }
            )
        }
        ;
        return e
    });
    var Ka = function(a, b, c) {
        if (null == a)
            throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp)
            throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    };
    ra("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = Ka(this, b, "startsWith")
              , e = d.length
              , f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var h = 0; h < f && c < e; )
                if (d[c++] != b[h++])
                    return !1;
            return h >= f
        }
    });
    ra("WeakMap", function(a) {
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
            m && (Object[l] = function(n) {
                if (n instanceof b)
                    return n;
                Object.isExtensible(n) && d(n);
                return m(n)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var l = Object.seal({})
                  , m = Object.seal({})
                  , n = new a([[l, 2], [m, 3]]);
                if (2 != n.get(l) || 3 != n.get(m))
                    return !1;
                n.delete(l);
                n.set(m, 4);
                return !n.has(l) && 4 == n.get(m)
            } catch (p) {
                return !1
            }
        }())
            return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var h = 0
          , k = function(l) {
            this.Ga = (h += Math.random() + 1).toString();
            if (l) {
                l = _.va(l);
                for (var m; !(m = l.next()).done; )
                    m = m.value,
                    this.set(m[0], m[1])
            }
        };
        k.prototype.set = function(l, m) {
            if (!c(l))
                throw Error("e");
            d(l);
            if (!wa(l, f))
                throw Error("f`" + l);
            l[f][this.Ga] = m;
            return this
        }
        ;
        k.prototype.get = function(l) {
            return c(l) && wa(l, f) ? l[f][this.Ga] : void 0
        }
        ;
        k.prototype.has = function(l) {
            return c(l) && wa(l, f) && wa(l[f], this.Ga)
        }
        ;
        k.prototype.delete = function(l) {
            return c(l) && wa(l, f) && wa(l[f], this.Ga) ? delete l[f][this.Ga] : !1
        }
        ;
        return k
    });
    ra("Map", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var k = Object.seal({
                    x: 4
                })
                  , l = new a(_.va([[k, "s"]]));
                if ("s" != l.get(k) || 1 != l.size || l.get({
                    x: 4
                }) || l.set({
                    x: 4
                }, "t") != l || 2 != l.size)
                    return !1;
                var m = l.entries()
                  , n = m.next();
                if (n.done || n.value[0] != k || "s" != n.value[1])
                    return !1;
                n = m.next();
                return n.done || 4 != n.value[0].x || "t" != n.value[1] || !m.next().done ? !1 : !0
            } catch (p) {
                return !1
            }
        }())
            return a;
        var b = new WeakMap
          , c = function(k) {
            this[0] = {};
            this[1] = f();
            this.size = 0;
            if (k) {
                k = _.va(k);
                for (var l; !(l = k.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        };
        c.prototype.set = function(k, l) {
            k = 0 === k ? 0 : k;
            var m = d(this, k);
            m.list || (m.list = this[0][m.id] = []);
            m.hf ? m.hf.value = l : (m.hf = {
                next: this[1],
                dl: this[1].dl,
                head: this[1],
                key: k,
                value: l
            },
            m.list.push(m.hf),
            this[1].dl.next = m.hf,
            this[1].dl = m.hf,
            this.size++);
            return this
        }
        ;
        c.prototype.delete = function(k) {
            k = d(this, k);
            return k.hf && k.list ? (k.list.splice(k.index, 1),
            k.list.length || delete this[0][k.id],
            k.hf.dl.next = k.hf.next,
            k.hf.next.dl = k.hf.dl,
            k.hf.head = null,
            this.size--,
            !0) : !1
        }
        ;
        c.prototype.clear = function() {
            this[0] = {};
            this[1] = this[1].dl = f();
            this.size = 0
        }
        ;
        c.prototype.has = function(k) {
            return !!d(this, k).hf
        }
        ;
        c.prototype.get = function(k) {
            return (k = d(this, k).hf) && k.value
        }
        ;
        c.prototype.entries = function() {
            return e(this, function(k) {
                return [k.key, k.value]
            })
        }
        ;
        c.prototype.keys = function() {
            return e(this, function(k) {
                return k.key
            })
        }
        ;
        c.prototype.values = function() {
            return e(this, function(k) {
                return k.value
            })
        }
        ;
        c.prototype.forEach = function(k, l) {
            for (var m = this.entries(), n; !(n = m.next()).done; )
                n = n.value,
                k.call(l, n[1], n[0], this)
        }
        ;
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(k, l) {
            var m = l && typeof l;
            "object" == m || "function" == m ? b.has(l) ? m = b.get(l) : (m = "" + ++h,
            b.set(l, m)) : m = "p_" + l;
            var n = k[0][m];
            if (n && wa(k[0], m))
                for (k = 0; k < n.length; k++) {
                    var p = n[k];
                    if (l !== l && p.key !== p.key || l === p.key)
                        return {
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
        }
          , e = function(k, l) {
            var m = k[1];
            return sa(function() {
                if (m) {
                    for (; m.head != k[1]; )
                        m = m.dl;
                    for (; m.next != m.head; )
                        return m = m.next,
                        {
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
        }
          , f = function() {
            var k = {};
            return k.dl = k.next = k.head = k
        }
          , h = 0;
        return c
    });
    ra("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
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
    ra("Number.isFinite", function(a) {
        return a ? a : function(b) {
            return "number" !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b
        }
    });
    ra("String.prototype.repeat", function(a) {
        return a ? a : function(b) {
            var c = Ka(this, null, "repeat");
            if (0 > b || 1342177279 < b)
                throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b; )
                if (b & 1 && (d += c),
                b >>>= 1)
                    c += c;
            return d
        }
    });
    var Na = function(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
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
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    };
    ra("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return Na(this, function(b, c) {
                return [b, c]
            })
        }
    });
    ra("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return Na(this, function(b) {
                return b
            })
        }
    });
    ra("Set", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var c = Object.seal({
                    x: 4
                })
                  , d = new a(_.va([c]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                    x: 4
                }) != d || 2 != d.size)
                    return !1;
                var e = d.entries()
                  , f = e.next();
                if (f.done || f.value[0] != c || f.value[1] != c)
                    return !1;
                f = e.next();
                return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
            } catch (h) {
                return !1
            }
        }())
            return a;
        var b = function(c) {
            this.Ca = new Map;
            if (c) {
                c = _.va(c);
                for (var d; !(d = c.next()).done; )
                    this.add(d.value)
            }
            this.size = this.Ca.size
        };
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.Ca.set(c, c);
            this.size = this.Ca.size;
            return this
        }
        ;
        b.prototype.delete = function(c) {
            c = this.Ca.delete(c);
            this.size = this.Ca.size;
            return c
        }
        ;
        b.prototype.clear = function() {
            this.Ca.clear();
            this.size = 0
        }
        ;
        b.prototype.has = function(c) {
            return this.Ca.has(c)
        }
        ;
        b.prototype.entries = function() {
            return this.Ca.entries()
        }
        ;
        b.prototype.values = function() {
            return this.Ca.values()
        }
        ;
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.Ca.forEach(function(f) {
                return c.call(d, f, f, e)
            })
        }
        ;
        return b
    });
    ra("Array.prototype.values", function(a) {
        return a ? a : function() {
            return Na(this, function(b, c) {
                return c
            })
        }
    });
    ra("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(k) {
                return k
            }
            ;
            var e = []
              , f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var h = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, h++))
            } else
                for (f = b.length,
                h = 0; h < f; h++)
                    e.push(c.call(d, b[h], h));
            return e
        }
    });
    ra("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                wa(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    ra("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                wa(b, d) && c.push(b[d]);
            return c
        }
    });
    ra("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    ra("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b))
                    return !0
            }
            return !1
        }
    });
    ra("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== Ka(this, b, "includes").indexOf(b, c || 0)
        }
    });
    ra("Array.prototype.flat", function(a) {
        return a ? a : function(b) {
            b = void 0 === b ? 1 : b;
            var c = [];
            Array.prototype.forEach.call(this, function(d) {
                Array.isArray(d) && 0 < b ? (d = Array.prototype.flat.call(d, b - 1),
                c.push.apply(c, d)) : c.push(d)
            });
            return c
        }
    });
    ra("Math.trunc", function(a) {
        return a ? a : function(b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b)
                return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c
        }
    });
    ra("Number.MAX_SAFE_INTEGER", function() {
        return 9007199254740991
    });
    ra("Number.isInteger", function(a) {
        return a ? a : function(b) {
            return Number.isFinite(b) ? b === Math.floor(b) : !1
        }
    });
    ra("Number.isSafeInteger", function(a) {
        return a ? a : function(b) {
            return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER
        }
    });
    ra("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b)
        }
    });
    ra("String.prototype.replaceAll", function(a) {
        return a ? a : function(b, c) {
            if (b instanceof RegExp && !b.global)
                throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument.");
            return b instanceof RegExp ? this.replace(b, c) : this.replace(new RegExp(String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"),"g"), c)
        }
    });
    ra("globalThis", function(a) {
        return a || _.na
    });
    ra("Math.imul", function(a) {
        return a ? a : function(b, c) {
            b = Number(b);
            c = Number(c);
            var d = b & 65535
              , e = c & 65535;
            return d * e + ((b >>> 16 & 65535) * e + d * (c >>> 16 & 65535) << 16 >>> 0) | 0
        }
    });
    ra("String.fromCodePoint", function(a) {
        return a ? a : function(b) {
            for (var c = "", d = 0; d < arguments.length; d++) {
                var e = Number(arguments[d]);
                if (0 > e || 1114111 < e || e !== Math.floor(e))
                    throw new RangeError("invalid_code_point " + e);
                65535 >= e ? c += String.fromCharCode(e) : (e -= 65536,
                c += String.fromCharCode(e >>> 10 & 1023 | 55296),
                c += String.fromCharCode(e & 1023 | 56320))
            }
            return c
        }
    });
    ra("Promise.prototype.finally", function(a) {
        return a ? a : function(b) {
            return this.then(function(c) {
                return Promise.resolve(b()).then(function() {
                    return c
                })
            }, function(c) {
                return Promise.resolve(b()).then(function() {
                    throw c;
                })
            })
        }
    });
    ra("String.prototype.padStart", function(a) {
        return a ? a : function(b, c) {
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
    _.$a = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
    ;
    _.C = function(a, b) {
        a = a.split(".");
        var c = _.r;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b
    }
    ;
    _.ab = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.N = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Dt = function(d, e, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++)
                h[k - 2] = arguments[k];
            return b.prototype[e].apply(d, h)
        }
    }
    ;
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
            ":socialhost:": "chrome-extension://lpmloonegabodoemnbhpclbpkihangom",
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
            root: "https://content.googleapis.com",
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
    db = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    ;
    eb = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    ;
    _.D = function(a, b, c) {
        _.D = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? db : eb;
        return _.D.apply(null, arguments)
    }
    ;
    var Kb, Sb, Ub, Xb, $b, ac, bc, cc, dc, kc;
    _.hb = function(a, b) {
        return _.da[a] = b
    }
    ;
    _.ib = function(a, b) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, _.ib);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b);
        this.uK = !0
    }
    ;
    _.mb = function(a, b) {
        return 0 <= (0,
        _.lb)(a, b)
    }
    ;
    _.nb = function(a, b) {
        b = (0,
        _.lb)(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
    ;
    _.ob = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    ;
    _.pb = function(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
    ;
    _.qb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }
    ;
    _.rb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
    ;
    _.tb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < sb.length; f++)
                c = sb[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;
    _.vb = function(a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0]))
            return _.vb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)
            c[arguments[d]] = !0;
        return c
    }
    ;
    _.wb = function() {
        var a = _.r.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    ;
    _.Ab = function(a) {
        return _.yb(_.wb(), a)
    }
    ;
    _.Eb = function() {
        return _.Cb ? !!_.Db && 0 < _.Db.brands.length : !1
    }
    ;
    _.Fb = function() {
        return _.Eb() ? !1 : _.Ab("Opera")
    }
    ;
    _.Hb = function() {
        return _.Eb() ? !1 : _.Ab("Trident") || _.Ab("MSIE")
    }
    ;
    _.Ib = function() {
        return _.Eb() ? !1 : _.Ab("Edge")
    }
    ;
    Kb = function() {
        return _.Cb ? !!_.Db && !!_.Db.platform : !1
    }
    ;
    _.Lb = function() {
        return Kb() ? "Android" === _.Db.platform : _.Ab("Android")
    }
    ;
    _.Mb = function() {
        return _.Ab("iPhone") && !_.Ab("iPod") && !_.Ab("iPad")
    }
    ;
    _.Nb = function() {
        return _.Mb() || _.Ab("iPad") || _.Ab("iPod")
    }
    ;
    _.Ob = function() {
        return Kb() ? "macOS" === _.Db.platform : _.Ab("Macintosh")
    }
    ;
    _.Pb = function() {
        return Kb() ? "Windows" === _.Db.platform : _.Ab("Windows")
    }
    ;
    _.Qb = function() {
        return Kb() ? "Chrome OS" === _.Db.platform : _.Ab("CrOS")
    }
    ;
    _.Rb = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    ;
    _.Tb = function(a, b) {
        a = a.split(".");
        b = b || _.r;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
    ;
    Ub = function(a, b) {
        var c = _.Tb("WIZ_global_data.oxN3nb");
        a = c && c[a];
        return null != a ? a : b
    }
    ;
    _.Vb = function(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
    ;
    _.Wb = function(a) {
        var b = _.Vb(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    ;
    Xb = 0;
    _.Yb = function(a) {
        return Object.prototype.hasOwnProperty.call(a, _.Wa) && a[_.Wa] || (a[_.Wa] = ++Xb)
    }
    ;
    _.Zb = function() {
        return Date.now()
    }
    ;
    $b = function(a) {
        return a
    }
    ;
    _.ab(_.ib, Error);
    _.ib.prototype.name = "CustomError";
    bc = function() {
        if (void 0 === ac) {
            var a = null
              , b = _.r.trustedTypes;
            if (b && b.createPolicy)
                try {
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
    }
    ;
    cc = {};
    dc = {};
    _.ec = function(a, b) {
        this.d0 = a === cc && b || "";
        this.Z4 = dc
    }
    ;
    _.ec.prototype.toString = function() {
        return this.d0
    }
    ;
    _.fc = function(a) {
        return a instanceof _.ec && a.constructor === _.ec && a.Z4 === dc ? a.d0 : "type_error:Const"
    }
    ;
    _.hc = function(a) {
        return new _.ec(cc,a)
    }
    ;
    _.ic = function(a) {
        this.zY = a
    }
    ;
    _.ic.prototype.toString = function() {
        return this.zY + ""
    }
    ;
    _.jc = function(a) {
        if (a instanceof _.ic && a.constructor === _.ic)
            return a.zY;
        _.Vb(a);
        return "type_error:TrustedResourceUrl"
    }
    ;
    kc = {};
    _.lc = function(a) {
        var b = bc();
        a = b ? b.createScriptURL(a) : a;
        return new _.ic(a,kc)
    }
    ;
    _.mc = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
    ;
    _.lb = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
    ;
    _.nc = Array.prototype.lastIndexOf ? function(a, b) {
        return Array.prototype.lastIndexOf.call(a, b, a.length - 1)
    }
    : function(a, b) {
        var c = a.length - 1;
        0 > c && (c = Math.max(0, a.length + c));
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.lastIndexOf(b, c);
        for (; 0 <= c; c--)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
    ;
    _.oc = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
    ;
    _.pc = Array.prototype.filter ? function(a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, h = 0; h < c; h++)
            if (h in f) {
                var k = f[h];
                b.call(void 0, k, h, a) && (d[e++] = k)
            }
        return d
    }
    ;
    _.rc = Array.prototype.map ? function(a, b, c) {
        return Array.prototype.map.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = "string" === typeof a ? a.split("") : a, h = 0; h < d; h++)
            h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    }
    ;
    _.sc = Array.prototype.reduce ? function(a, b, c) {
        return Array.prototype.reduce.call(a, b, c)
    }
    : function(a, b, c) {
        var d = c;
        (0,
        _.oc)(a, function(e, f) {
            d = b.call(void 0, d, e, f, a)
        });
        return d
    }
    ;
    _.tc = Array.prototype.some ? function(a, b, c) {
        return Array.prototype.some.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return !0;
        return !1
    }
    ;
    _.uc = Array.prototype.every ? function(a, b, c) {
        return Array.prototype.every.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a))
                return !1;
        return !0
    }
    ;
    var sb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    var vc = !!(_.Va[0] & 128)
      , wc = !!(_.Va[0] & 4)
      , xc = !!(_.Va[0] & 256)
      , yc = !!(_.Va[0] & 2);
    _.Cb = vc ? xc : Ub(610401301, !1);
    _.zc = vc ? wc || !yc : Ub(572417392, !0);
    var Cc, Ec;
    _.Ac = function(a) {
        this.yY = a
    }
    ;
    _.Ac.prototype.toString = function() {
        return this.yY.toString()
    }
    ;
    _.Bc = function(a) {
        if (a instanceof _.Ac && a.constructor === _.Ac)
            return a.yY;
        _.Vb(a);
        return "type_error:SafeUrl"
    }
    ;
    try {
        new URL("s://g"),
        Cc = !0
    } catch (a) {
        Cc = !1
    }
    _.Dc = Cc;
    Ec = {};
    _.Fc = function(a) {
        return new _.Ac(a,Ec)
    }
    ;
    _.Gc = _.Fc("about:invalid#zClosurez");
    var Lc, Nc, Oc, Pc, Qc, Rc, Kc, Tc;
    _.Hc = function(a, b) {
        return 0 == a.lastIndexOf(b, 0)
    }
    ;
    _.Ic = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
    ;
    _.Jc = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
    ;
    _.Sc = function(a) {
        if (!Kc.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(Lc, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(Nc, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(Oc, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(Pc, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(Qc, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(Rc, "&#0;"));
        return a
    }
    ;
    Lc = /&/g;
    Nc = /</g;
    Oc = />/g;
    Pc = /"/g;
    Qc = /'/g;
    Rc = /\x00/g;
    Kc = /[\x00&<>"']/;
    _.yb = function(a, b) {
        return -1 != a.indexOf(b)
    }
    ;
    _.Uc = function(a, b) {
        var c = 0;
        a = (0,
        _.Jc)(String(a)).split(".");
        b = (0,
        _.Jc)(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , h = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                if (0 == f[0].length && 0 == h[0].length)
                    break;
                c = Tc(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || Tc(0 == f[2].length, 0 == h[2].length) || Tc(f[2], h[2]);
                f = f[3];
                h = h[3]
            } while (0 == c)
        }
        return c
    }
    ;
    Tc = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    ;
    _.Vc = {};
    _.Wc = function(a) {
        this.xY = a
    }
    ;
    _.Wc.prototype.toString = function() {
        return this.xY.toString()
    }
    ;
    _.Xc = new _.Wc("",_.Vc);
    _.Zc = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$");
    _.$c = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g");
    _.ad = RegExp("\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g");
    var dd;
    _.bd = {};
    _.cd = function(a) {
        this.wY = a
    }
    ;
    _.cd.prototype.toString = function() {
        return this.wY.toString()
    }
    ;
    _.ed = function(a) {
        a = _.fc(a);
        return 0 === a.length ? dd : new _.cd(a,_.bd)
    }
    ;
    dd = new _.cd("",_.bd);
    var fd;
    fd = _.r.navigator;
    _.Db = fd ? fd.userAgentData || null : null;
    var gd;
    gd = {};
    _.hd = function(a) {
        this.vY = a
    }
    ;
    _.hd.prototype.toString = function() {
        return this.vY.toString()
    }
    ;
    _.id = function(a) {
        if (a instanceof _.hd && a.constructor === _.hd)
            return a.vY;
        _.Vb(a);
        return "type_error:SafeHtml"
    }
    ;
    _.kd = function(a) {
        return a instanceof _.hd ? a : _.jd(_.Sc(String(a)))
    }
    ;
    _.jd = function(a) {
        var b = bc();
        a = b ? b.createHTML(a) : a;
        return new _.hd(a,gd)
    }
    ;
    _.ld = new _.hd(_.r.trustedTypes && _.r.trustedTypes.emptyHTML || "",gd);
    _.md = _.jd("<br>");
    var nd = function(a) {
        nd[" "](a);
        return a
    };
    nd[" "] = function() {}
    ;
    _.od = function(a, b) {
        try {
            return nd(a[b]),
            !0
        } catch (c) {}
        return !1
    }
    ;
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
    Fd = function() {
        var a = _.r.document;
        return a ? a.documentMode : void 0
    }
    ;
    a: {
        var Hd = ""
          , Id = function() {
            var a = _.wb();
            if (_.ud)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (_.rd)
                return /Edge\/([\d\.]+)/.exec(a);
            if (_.qd)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (_.vd)
                return /WebKit\/(\S+)/.exec(a);
            if (_.pd)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Id && (Hd = Id ? Id[1] : "");
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
    } else
        Ld = void 0;
    _.Pd = Ld;
    try {
        (new self.OffscreenCanvas(0,0)).getContext("2d")
    } catch (a) {}
    _.Qd = _.qd || _.vd;
    var Rd, Td;
    Rd = _.mc(function() {
        var a = document.createElement("div")
          , b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = _.id(_.ld);
        return !b.parentElement
    });
    _.Sd = function(a, b) {
        if (Rd())
            for (; a.lastChild; )
                a.removeChild(a.lastChild);
        a.innerHTML = _.id(b)
    }
    ;
    Td = /^[\w+/_-]+[=]{0,2}$/;
    _.Ud = function(a, b) {
        b = (b || _.r).document;
        return b.querySelector ? (a = b.querySelector(a)) && (a = a.nonce || a.getAttribute("nonce")) && Td.test(a) ? a : "" : ""
    }
    ;
    _.Vd = function(a, b) {
        this.width = a;
        this.height = b
    }
    ;
    _.Wd = function(a, b) {
        return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
    }
    ;
    _.g = _.Vd.prototype;
    _.g.clone = function() {
        return new _.Vd(this.width,this.height)
    }
    ;
    _.g.my = function() {
        return this.width * this.height
    }
    ;
    _.g.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    _.g.isEmpty = function() {
        return !this.my()
    }
    ;
    _.g.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    _.g.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    _.g.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    _.g.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    }
    ;
    _.Xd = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    }
    : function(a, b) {
        return Array(b + 1).join(a)
    }
    ;
    _.Yd = 2147483648 * Math.random() | 0;
    var ce, me;
    _.ae = function(a) {
        return a ? new _.Zd(_.$d(a)) : Sb || (Sb = new _.Zd)
    }
    ;
    _.be = function(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (b || c))
            return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, h; h = a[f]; f++)
                    b == h.nodeName && (d[e++] = h);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; h = a[f]; f++)
                b = h.className,
                "function" == typeof b.split && _.mb(b.split(/\s+/), c) && (d[e++] = h);
            d.length = e;
            return d
        }
        return a
    }
    ;
    _.fe = function(a, b) {
        _.pb(b, function(c, d) {
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : ce.hasOwnProperty(d) ? a.setAttribute(ce[d], c) : _.Hc(d, "aria-") || _.Hc(d, "data-") ? a.setAttribute(d, c) : a[d] = c
        })
    }
    ;
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
    _.he = function(a) {
        return _.ge(a || window)
    }
    ;
    _.ge = function(a) {
        a = a.document;
        a = _.ie(a) ? a.documentElement : a.body;
        return new _.Vd(a.clientWidth,a.clientHeight)
    }
    ;
    _.je = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    }
    ;
    _.ne = function(a, b) {
        var c = b[1]
          , d = _.ke(a, String(b[0]));
        c && ("string" === typeof c ? d.className = c : Array.isArray(c) ? d.className = c.join(" ") : _.fe(d, c));
        2 < b.length && me(a, d, b, 2);
        return d
    }
    ;
    me = function(a, b, c, d) {
        function e(k) {
            k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!_.Wb(f) || _.Rb(f) && 0 < f.nodeType)
                e(f);
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
    }
    ;
    _.oe = function(a) {
        return _.ke(document, a)
    }
    ;
    _.ke = function(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
    ;
    _.ie = function(a) {
        return "CSS1Compat" == a.compatMode
    }
    ;
    _.pe = function(a) {
        if (1 != a.nodeType)
            return !1;
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
    }
    ;
    _.qe = function(a, b) {
        me(_.$d(a), a, arguments, 1)
    }
    ;
    _.re = function(a) {
        for (var b; b = a.firstChild; )
            a.removeChild(b)
    }
    ;
    _.se = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    }
    ;
    _.te = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }
    ;
    _.ue = function(a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function(b) {
            return 1 == b.nodeType
        })
    }
    ;
    _.ve = function(a) {
        return _.Rb(a) && 1 == a.nodeType
    }
    ;
    _.we = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
    ;
    _.$d = function(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
    ;
    _.xe = function(a, b) {
        if ("textContent"in a)
            a.textContent = b;
        else if (3 == a.nodeType)
            a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; )
                a.removeChild(a.lastChild);
            a.firstChild.data = String(b)
        } else
            _.re(a),
            a.appendChild(_.$d(a).createTextNode(String(b)))
    }
    ;
    _.Zd = function(a) {
        this.Hb = a || _.r.document || document
    }
    ;
    _.g = _.Zd.prototype;
    _.g.Ja = _.ae;
    _.g.pL = _.ea(0);
    _.g.ub = function() {
        return this.Hb
    }
    ;
    _.g.O = _.ea(1);
    _.g.getElementsByTagName = function(a, b) {
        return (b || this.Hb).getElementsByTagName(String(a))
    }
    ;
    _.g.CH = _.ea(2);
    _.g.va = function(a, b, c) {
        return _.ne(this.Hb, arguments)
    }
    ;
    _.g.createElement = function(a) {
        return _.ke(this.Hb, a)
    }
    ;
    _.g.createTextNode = function(a) {
        return this.Hb.createTextNode(String(a))
    }
    ;
    _.g.getWindow = function() {
        var a = this.Hb;
        return a.parentWindow || a.defaultView
    }
    ;
    _.g.appendChild = function(a, b) {
        a.appendChild(b)
    }
    ;
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
    _.ye = function(a, b) {
        for (var c in a)
            if (a[c] == b)
                return !0;
        return !1
    }
    ;
    _.ze = function(a, b) {
        return "string" === typeof b ? a.getElementById(b) : b
    }
    ;
    _.E = function(a, b) {
        a.prototype = (0,
        _.Da)(b.prototype);
        a.prototype.constructor = a;
        if (_.Ia)
            (0,
            _.Ia)(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.N = b.prototype
    }
    ;
    _.Ae = function(a) {
        if (!(a instanceof Array)) {
            a = _.va(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }
    ;
    _.Be = function() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
            b[c - a] = arguments[c];
        return b
    }
    ;
    /*

 SPDX-License-Identifier: Apache-2.0
*/
    var Ce, Ee;
    Ce = function(a) {
        return {
            valueOf: a
        }.valueOf()
    }
    ;
    Ee = function(a) {
        return new De(function(b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        }
        )
    }
    ;
    _.Ge = function(a) {
        var b = void 0 === b ? Fe : b;
        a: if (b = void 0 === b ? Fe : b,
        !(a instanceof _.Ac)) {
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
    }
    ;
    _.Ie = function(a) {
        if (!He) {
            a: {
                var b = document.createElement("a");
                try {
                    b.href = a
                } catch (c) {
                    a = void 0;
                    break a
                }
                a = b.protocol;
                a = ":" === a || "" === a ? "https:" : a
            }
            return a
        }
        try {
            b = new URL(a)
        } catch (c) {
            return "https:"
        }
        return b.protocol
    }
    ;
    _.Je = function(a) {
        if ("javascript:" !== _.Ie(a))
            return a
    }
    ;
    _.Ke = function(a, b) {
        b = void 0 === b ? {} : b;
        if (a instanceof _.hd)
            return a;
        a = String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        b.Rqa && (a = a.replace(/(^|[\r\n\t ]) /g, "$1&#160;"));
        b.qda && (a = a.replace(/(\r\n|\n|\r)/g, "<br>"));
        b.Sqa && (a = a.replace(/(\t+)/g, '<span style="white-space:pre">$1</span>'));
        return _.jd(a)
    }
    ;
    var De = function(a) {
        this.Dj = a
    }
      , Fe = [Ee("data"), Ee("http"), Ee("https"), Ee("mailto"), Ee("ftp"), new De(function(a) {
        return /^[^:]*([/?#]|$)/.test(a)
    }
    )]
      , He = Ce(function() {
        return "function" === typeof URL
    });
    var Me = function(a, b, c, d) {
        var e = new Map(Le);
        this.Q5 = a;
        this.yR = e;
        this.R5 = b;
        this.G9 = c;
        this.QT = d
    };
    var Ne = "ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT".split(" ")
      , Le = [["A", new Map([["href", {
        fe: 2
    }]])], ["AREA", new Map([["href", {
        fe: 2
    }]])], ["LINK", new Map([["href", {
        fe: 2,
        conditions: new Map([["rel", new Set("alternate author bookmark canonical cite help icon license next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" "))]])
    }]])], ["SOURCE", new Map([["src", {
        fe: 1
    }]])], ["IMG", new Map([["src", {
        fe: 1
    }]])], ["VIDEO", new Map([["src", {
        fe: 1
    }]])], ["AUDIO", new Map([["src", {
        fe: 1
    }]])]]
      , Oe = "title aria-atomic aria-autocomplete aria-busy aria-checked aria-current aria-disabled aria-dropeffect aria-expanded aria-haspopup aria-hidden aria-invalid aria-label aria-level aria-live aria-multiline aria-multiselectable aria-orientation aria-posinset aria-pressed aria-readonly aria-relevant aria-required aria-selected aria-setsize aria-sort aria-valuemax aria-valuemin aria-valuenow aria-valuetext alt align autocapitalize autocomplete autocorrect autofocus autoplay bgcolor border cellpadding cellspacing checked color cols colspan controls datetime disabled download draggable enctype face formenctype frameborder height hreflang hidden ismap label lang loop max maxlength media minlength min multiple muted nonce open placeholder preload rel required reversed role rows rowspan selected shape size sizes slot span spellcheck start step summary translate type valign value width wrap itemscope itemtype itemid itemprop itemref".split(" ")
      , Pe = [["dir", {
        fe: 3,
        conditions: Ce(function() {
            return new Map([["dir", new Set(["auto", "ltr", "rtl"])]])
        })
    }], ["async", {
        fe: 3,
        conditions: Ce(function() {
            return new Map([["async", new Set(["async"])]])
        })
    }], ["cite", {
        fe: 2
    }], ["loading", {
        fe: 3,
        conditions: Ce(function() {
            return new Map([["loading", new Set(["eager", "lazy"])]])
        })
    }], ["poster", {
        fe: 2
    }], ["target", {
        fe: 3,
        conditions: Ce(function() {
            return new Map([["target", new Set(["_self", "_blank"])]])
        })
    }]]
      , Qe = new Me(new Set(Ne),new Set(Oe),new Map(Pe))
      , Re = new Me(new Set(Ne),new Set(Ce(function() {
        return Oe.concat(["class", "id"])
    })),new Map(Ce(function() {
        return Pe.concat([["style", {
            fe: 4
        }]])
    })))
      , Se = new Me(new Set(Ce(function() {
        return Ne.concat("STYLE TITLE INPUT TEXTAREA BUTTON LABEL".split(" "))
    })),new Set(Ce(function() {
        return Oe.concat(["class", "id", "tabindex", "contenteditable", "name"])
    })),new Map(Ce(function() {
        return Pe.concat([["style", {
            fe: 4
        }]])
    })),new Set(["data-", "aria-"]));
    var Te;
    Te = function(a) {
        this.nZ = a;
        this.Iy = []
    }
    ;
    _.Ue = Ce(function() {
        return new Te(Qe)
    });
    _.Ve = Ce(function() {
        return new Te(Re)
    });
    _.We = Ce(function() {
        return new Te(Se)
    });
    /*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    _.Xe = function(a) {
        return a instanceof _.Ac ? _.Bc(a) : _.Je(a)
    }
    ;
    _.Ye = function(a, b) {
        if (1 === a.nodeType) {
            var c = a.tagName;
            if ("SCRIPT" === c || "STYLE" === c)
                throw Error("q");
        }
        a.innerHTML = _.id(b)
    }
    ;
    _.Ze = function(a, b, c, d) {
        b = _.Xe(b);
        return void 0 !== b ? a.open(b, c, d) : null
    }
    ;
    _.$e = function(a) {
        return null === a ? "null" : void 0 === a ? "undefined" : a
    }
    ;
    _.af = window;
    _.cf = document;
    _.df = _.af.location;
    _.ef = /\[native code\]/;
    _.ff = function(a, b, c) {
        return a[b] = a[b] || c
    }
    ;
    _.gf = function() {
        var a;
        if ((a = Object.create) && _.ef.test(a))
            a = a(null);
        else {
            a = {};
            for (var b in a)
                a[b] = void 0
        }
        return a
    }
    ;
    _.hf = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ;
    _.jf = function(a, b) {
        a = a || {};
        for (var c in a)
            _.hf(a, c) && (b[c] = a[c])
    }
    ;
    _.kf = _.ff(_.af, "gapi", {});
    _.lf = function(a, b, c) {
        var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)","g");
        b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)","g");
        if (a = a && (d.exec(a) || b.exec(a)))
            try {
                c = decodeURIComponent(a[2])
            } catch (e) {}
        return c
    }
    ;
    _.mf = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source);
    _.nf = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,"g");
    _.of = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$","i");
    _.qf = function(a, b, c) {
        _.pf(a, b, c, "add", "at")
    }
    ;
    _.pf = function(a, b, c, d, e) {
        if (a[d + "EventListener"])
            a[d + "EventListener"](b, c, !1);
        else if (a[e + "tachEvent"])
            a[e + "tachEvent"]("on" + b, c)
    }
    ;
    _.rf = {};
    _.rf = _.ff(_.af, "___jsl", _.gf());
    _.ff(_.rf, "I", 0);
    _.ff(_.rf, "hel", 10);
    var sf, tf, uf, vf, wf, xf, yf;
    sf = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b[a] = b[a] || [];
        return b[a]
    }
    ;
    tf = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = !a && b.cfg || {};
        return b.cfg
    }
    ;
    uf = function(a) {
        return "object" === typeof a && /\[native code\]/.test(a.push)
    }
    ;
    vf = function(a, b, c) {
        if (b && "object" === typeof b)
            for (var d in b)
                !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !uf(a[d]) && !uf(b[d]) ? vf(a[d], b[d]) : b[d] && "object" === typeof b[d] ? (a[d] = uf(b[d]) ? [] : {},
                vf(a[d], b[d])) : a[d] = b[d])
    }
    ;
    wf = function(a) {
        if (a && !/^\s+$/.test(a)) {
            for (; 0 == a.charCodeAt(a.length - 1); )
                a = a.substring(0, a.length - 1);
            try {
                var b = window.JSON.parse(a)
            } catch (c) {}
            if ("object" === typeof b)
                return b;
            try {
                b = (new Function("return (" + a + "\n)"))()
            } catch (c) {}
            if ("object" === typeof b)
                return b;
            try {
                b = (new Function("return ({" + a + "\n})"))()
            } catch (c) {}
            return "object" === typeof b ? b : {}
        }
    }
    ;
    xf = function(a, b) {
        var c = {
            ___goc: void 0
        };
        a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length - 1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
        vf(c, b);
        a.push(c)
    }
    ;
    yf = function(a) {
        tf(!0);
        var b = window.___gcfg
          , c = sf("cu")
          , d = window.___gu;
        b && b !== d && (xf(c, b),
        window.___gu = b);
        b = sf("cu");
        var e = document.scripts || document.getElementsByTagName("script") || [];
        d = [];
        var f = [];
        f.push.apply(f, sf("us"));
        for (var h = 0; h < e.length; ++h)
            for (var k = e[h], l = 0; l < f.length; ++l)
                k.src && 0 == k.src.indexOf(f[l]) && d.push(k);
        0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
        for (e = 0; e < d.length; ++e)
            d[e].getAttribute("gapi_processed") || (d[e].setAttribute("gapi_processed", !0),
            (f = d[e]) ? (h = f.nodeType,
            f = 3 == h || 4 == h ? f.nodeValue : f.textContent || "") : f = void 0,
            (f = wf(f)) && b.push(f));
        a && xf(c, a);
        d = sf("cd");
        a = 0;
        for (b = d.length; a < b; ++a)
            vf(tf(), d[a], !0);
        d = sf("ci");
        a = 0;
        for (b = d.length; a < b; ++a)
            vf(tf(), d[a], !0);
        a = 0;
        for (b = c.length; a < b; ++a)
            vf(tf(), c[a], !0)
    }
    ;
    _.zf = function(a, b) {
        var c = tf();
        if (!a)
            return c;
        a = a.split("/");
        for (var d = 0, e = a.length; c && "object" === typeof c && d < e; ++d)
            c = c[a[d]];
        return d === a.length && void 0 !== c ? c : b
    }
    ;
    _.Af = function(a, b) {
        var c;
        if ("string" === typeof a) {
            var d = c = {};
            a = a.split("/");
            for (var e = 0, f = a.length; e < f - 1; ++e) {
                var h = {};
                d = d[a[e]] = h
            }
            d[a[e]] = b
        } else
            c = a;
        yf(c)
    }
    ;
    var Bf = function() {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis),
        _.ff(_.rf, "ci", []).push(a),
        window.__GOOGLEAPIS = void 0)
    };
    Bf && Bf();
    yf();
    _.C("gapi.config.get", _.zf);
    _.C("gapi.config.update", _.Af);
    var Cf, Df, Ef, Ff, Hf, If, Kf, Qf, Rf, Sf, Tf, Uf, Vf, Jf, Nf, Of;
    Cf = function(a, b) {
        var c = b.createRange();
        c.selectNode(b.body);
        a = _.jd(a);
        return c.createContextualFragment(_.id(a))
    }
    ;
    Df = function(a) {
        a = a.nodeName;
        return "string" === typeof a ? a : "FORM"
    }
    ;
    Ef = function(a) {
        a = a.nodeType;
        return 1 === a || "number" !== typeof a
    }
    ;
    Ff = function(a, b, c) {
        a.setAttribute(b, c)
    }
    ;
    _.Gf = function(a) {
        var b = _.Be.apply(1, arguments);
        if (0 === b.length)
            return _.lc(a[0]);
        for (var c = a[0], d = 0; d < b.length; d++)
            c += encodeURIComponent(b[d]) + a[d + 1];
        return _.lc(c)
    }
    ;
    Hf = function(a, b) {
        var c = new XMLHttpRequest;
        c.open("POST", a);
        c.setRequestHeader("Content-Type", "application/json");
        c.send(b)
    }
    ;
    If = function(a, b) {
        ("undefined" !== typeof window && window.navigator && void 0 !== window.navigator.sendBeacon ? navigator.sendBeacon.bind(navigator) : Hf)("https://csp.withgoogle.com/csp/lcreport/" + a.vK, JSON.stringify({
            host: window.location.hostname,
            type: b,
            additionalData: void 0
        }))
    }
    ;
    Kf = function(a, b) {
        try {
            Jf(_.We, a)
        } catch (c) {
            return If(b, "H_SLSANITIZE"),
            !0
        }
        try {
            Jf(_.Ve, a)
        } catch (c) {
            return If(b, "H_RSANITIZE"),
            !0
        }
        try {
            Jf(_.Ue, a)
        } catch (c) {
            return If(b, "H_SANITIZE"),
            !0
        }
        return !1
    }
    ;
    _.Lf = function(a) {
        var b, c;
        return (a = null == (c = (b = a.document).querySelector) ? void 0 : c.call(b, "script[nonce]")) ? a.nonce || a.getAttribute("nonce") || "" : ""
    }
    ;
    _.Mf = function(a, b) {
        a.src = _.jc(b);
        (b = _.Lf(a.ownerDocument && a.ownerDocument.defaultView || window)) && a.setAttribute("nonce", b)
    }
    ;
    _.Pf = function(a, b) {
        a = _.$e(a);
        var c;
        if (c = b) {
            var d, e;
            c = Math.random() < (null != (e = null != (d = b.nra) ? d : Nf[b.vK[0]]) ? e : 0)
        }
        if (c && !1 !== window.SAFEVALUES_REPORTING && "DocumentFragment"in window) {
            var f, h;
            Math.random() < (null != (h = null != (f = b.cqa) ? f : Of[b.vK[0]]) ? h : 0) && If(b, "HEARTBEAT");
            Kf(a, b) || _.Ke(a).toString() !== a && If(b, "H_ESCAPE")
        }
        return _.jd(a)
    }
    ;
    Qf = ["data:", "http:", "https:", "mailto:", "ftp:"];
    Rf = function(a, b, c) {
        c = a.yR.get(c);
        return (null == c ? 0 : c.has(b)) ? c.get(b) : a.R5.has(b) ? {
            fe: 1
        } : (c = a.G9.get(b)) ? c : a.QT && [].concat(_.Ae(a.QT)).some(function(d) {
            return 0 === b.indexOf(d)
        }) ? {
            fe: 1
        } : {
            fe: 0
        }
    }
    ;
    Sf = function(a) {
        0 === a.Iy.length && a.Iy.push("")
    }
    ;
    Tf = function(a, b) {
        if (3 === b.nodeType)
            return 1;
        if (!Ef(b))
            return 2;
        b = Df(b);
        if (null === b)
            return Sf(a),
            2;
        var c = a.nZ;
        if ("FORM" !== b && (c.Q5.has(b) || c.yR.has(b)))
            return 1;
        Sf(a);
        return 2
    }
    ;
    Uf = function(a, b, c) {
        var d = Df(b);
        c = c.createElement(d);
        b = b.attributes;
        for (var e = _.va(b), f = e.next(); !f.done; f = e.next()) {
            var h = f.value;
            f = h.name;
            h = h.value;
            var k = Rf(a.nZ, f, d), l;
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
            if (l)
                switch (k.fe) {
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
                }
            else
                Sf(a)
        }
        return c
    }
    ;
    Vf = function(a, b, c) {
        b = Cf(b, c);
        b = document.createTreeWalker(b, 5, function(k) {
            return Tf(a, k)
        }, !1);
        for (var d = b.nextNode(), e = c.createDocumentFragment(), f = e; null !== d; ) {
            var h = void 0;
            if (3 === d.nodeType)
                h = document.createTextNode(d.data);
            else if (Ef(d))
                h = Uf(a, d, c);
            else
                throw Error("q");
            f.appendChild(h);
            if (d = b.firstChild())
                f = h;
            else
                for (; !(d = b.nextSibling()) && (d = b.parentNode()); )
                    f = f.parentNode
        }
        return e
    }
    ;
    _.Wf = function(a, b) {
        var c = document.implementation.createHTMLDocument("")
          , d = c.body;
        d.appendChild(Vf(a, b, c));
        a = (new XMLSerializer).serializeToString(d);
        a = a.slice(a.indexOf(">") + 1, a.lastIndexOf("</"));
        return _.jd(a)
    }
    ;
    Jf = function(a, b) {
        a.Iy = [];
        _.Wf(a, b);
        if (0 !== a.Iy.length)
            throw Error("q");
    }
    ;
    Nf = {
        0: 1,
        1: 1
    };
    Of = {
        0: .1,
        1: .1
    };
    _.vh = (window.gapi || {}).load;
    _.Po = _.ff(_.rf, "rw", _.gf());
    var Qo = function(a, b) {
        (a = _.Po[a]) && a.state < b && (a.state = b)
    };
    var Ro = function(a) {
        a = (a = _.Po[a]) ? a.oid : void 0;
        if (a) {
            var b = _.cf.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete _.Po[a];
            Ro(a)
        }
    };
    _.So = function(a) {
        a = a.container;
        "string" === typeof a && (a = document.getElementById(a));
        return a
    }
    ;
    _.To = function(a) {
        var b = a.clientWidth;
        return "position:absolute;top:-10000px;width:" + (b ? b + "px" : a.style.width || "300px") + ";margin:0px;border-style:none;"
    }
    ;
    _.Uo = function(a, b) {
        var c = {}
          , d = a.Ic()
          , e = b && b.width
          , f = b && b.height
          , h = b && b.verticalAlign;
        h && (c.verticalAlign = h);
        e || (e = d.width || a.width);
        f || (f = d.height || a.height);
        d.width = c.width = e;
        d.height = c.height = f;
        d = a.getIframeEl();
        e = a.getId();
        Qo(e, 2);
        a: {
            e = a.getSiteEl();
            c = c || {};
            if (_.rf.oa) {
                var k = d.id;
                if (k) {
                    f = (f = _.Po[k]) ? f.state : void 0;
                    if (1 === f || 4 === f)
                        break a;
                    Ro(k)
                }
            }
            (f = e.nextSibling) && f.dataset && f.dataset.gapistub && (e.parentNode.removeChild(f),
            e.style.cssText = "");
            f = c.width;
            h = c.height;
            var l = e.style;
            l.textIndent = "0";
            l.margin = "0";
            l.padding = "0";
            l.background = "transparent";
            l.borderStyle = "none";
            l.cssFloat = "none";
            l.styleFloat = "none";
            l.lineHeight = "normal";
            l.fontSize = "1px";
            l.verticalAlign = "baseline";
            e = e.style;
            e.display = "inline-block";
            d = d.style;
            d.position = "static";
            d.left = "0";
            d.top = "0";
            d.visibility = "visible";
            f && (e.width = d.width = f + "px");
            h && (e.height = d.height = h + "px");
            c.verticalAlign && (e.verticalAlign = c.verticalAlign);
            k && Qo(k, 3)
        }
        (k = b ? b.title : null) && a.getIframeEl().setAttribute("title", k);
        (b = b ? b.ariaLabel : null) && a.getIframeEl().setAttribute("aria-label", b)
    }
    ;
    _.Vo = function(a) {
        var b = a.getSiteEl();
        b && b.removeChild(a.getIframeEl())
    }
    ;
    _.Wo = function(a) {
        a.where = _.So(a);
        var b = a.messageHandlers = a.messageHandlers || {}
          , c = function(e) {
            _.Uo(this, e)
        };
        b._ready = c;
        b._renderstart = c;
        var d = a.onClose;
        a.onClose = function(e) {
            d && d.call(this, e);
            _.Vo(this)
        }
        ;
        a.onCreate = function(e) {
            e = e.getIframeEl();
            e.style.cssText = _.To(e)
        }
    }
    ;
    _.ag = function() {
        var a = window.gadgets && window.gadgets.config && window.gadgets.config.get;
        a && _.Af(a());
        return {
            register: function(b, c, d) {
                d && d(_.zf())
            },
            get: function(b) {
                return _.zf(b)
            },
            update: function(b, c) {
                if (c)
                    throw "Config replacement is not supported";
                _.Af(b)
            },
            Ad: function() {}
        }
    }();
    _.C("gadgets.config.register", _.ag.register);
    _.C("gadgets.config.get", _.ag.get);
    _.C("gadgets.config.init", _.ag.Ad);
    _.C("gadgets.config.update", _.ag.update);
    var bg, cg, eg, fg, gg, hg, ig, jg, kg, lg, mg, ng, og, pg, qg, rg, sg, tg, ug, vg, wg, xg, yg, zg, Ag, Bg, Cg, Dg, Eg, Fg, Gg, Jg, Kg;
    eg = void 0;
    fg = function(a) {
        try {
            return _.r.JSON.parse.call(_.r.JSON, a)
        } catch (b) {
            return !1
        }
    }
    ;
    gg = function(a) {
        return Object.prototype.toString.call(a)
    }
    ;
    hg = gg(0);
    ig = gg(new Date(0));
    jg = gg(!0);
    kg = gg("");
    lg = gg({});
    mg = gg([]);
    ng = function(a, b) {
        if (b)
            for (var c = 0, d = b.length; c < d; ++c)
                if (a === b[c])
                    throw new TypeError("Converting circular structure to JSON");
        d = typeof a;
        if ("undefined" !== d) {
            c = Array.prototype.slice.call(b || [], 0);
            c[c.length] = a;
            b = [];
            var e = gg(a);
            if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a, "toJSON") || (e !== mg || a.constructor !== Array && a.constructor !== Object) && (e !== lg || a.constructor !== Array && a.constructor !== Object) && e !== kg && e !== hg && e !== jg && e !== ig))
                return ng(a.toJSON.call(a), c);
            if (null == a)
                b[b.length] = "null";
            else if (e === hg)
                a = Number(a),
                isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"),
                b[b.length] = String(a);
            else if (e === jg)
                b[b.length] = String(!!Number(a));
            else {
                if (e === ig)
                    return ng(a.toISOString.call(a), c);
                if (e === mg && gg(a.length) === hg) {
                    b[b.length] = "[";
                    var f = 0;
                    for (d = Number(a.length) >> 0; f < d; ++f)
                        f && (b[b.length] = ","),
                        b[b.length] = ng(a[f], c) || "null";
                    b[b.length] = "]"
                } else if (e == kg && gg(a.length) === hg) {
                    b[b.length] = '"';
                    f = 0;
                    for (c = Number(a.length) >> 0; f < c; ++f)
                        d = String.prototype.charAt.call(a, f),
                        e = String.prototype.charCodeAt.call(a, f),
                        b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                    b[b.length] = '"'
                } else if ("object" === d) {
                    b[b.length] = "{";
                    d = 0;
                    for (f in a)
                        Object.prototype.hasOwnProperty.call(a, f) && (e = ng(a[f], c),
                        void 0 !== e && (d++ && (b[b.length] = ","),
                        b[b.length] = ng(f),
                        b[b.length] = ":",
                        b[b.length] = e));
                    b[b.length] = "}"
                } else
                    return
            }
            return b.join("")
        }
    }
    ;
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
    Fg = function(a) {
        a = String(a);
        if (og.test(a) || pg.test(a) || qg.test(a) || rg.test(a))
            return !1;
        var b = a.replace(sg, '""');
        b = b.replace(tg, "0");
        b = b.replace(ug, "");
        if (vg.test(b))
            return !1;
        b = b.replace(wg, "0");
        b = b.replace(xg, "0");
        if (yg.test(b) || zg.test(b) || Ag.test(b) || Bg.test(b) || !b || (b = b.replace(Cg, "")))
            return !1;
        a = a.replace(Dg, "\\u2028").replace(Eg, "\\u2029");
        b = void 0;
        try {
            b = eg ? [fg(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
        } catch (c) {
            return !1
        }
        return b && 1 === b.length ? b[0] : !1
    }
    ;
    Gg = function() {
        var a = ((_.r.document || {}).scripts || []).length;
        if ((void 0 === bg || void 0 === eg || cg !== a) && -1 !== cg) {
            bg = eg = !1;
            cg = -1;
            try {
                try {
                    eg = !!_.r.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === _.r.JSON.stringify.call(_.r.JSON, {
                        a: [3, !0, new Date(0)],
                        c: function() {}
                    }) && !0 === fg("true") && 3 === fg('[{"a":3}]')[0].a
                } catch (b) {}
                bg = eg && !fg("[00]") && !fg('"\u0007"') && !fg('"\\0"') && !fg('"\\v"')
            } finally {
                cg = a
            }
        }
    }
    ;
    _.Hg = function(a) {
        if (-1 === cg)
            return !1;
        Gg();
        return (bg ? fg : Fg)(a)
    }
    ;
    _.Ig = function(a) {
        if (-1 !== cg)
            return Gg(),
            eg ? _.r.JSON.stringify.call(_.r.JSON, a) : ng(a)
    }
    ;
    Jg = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString();
    Kg = function() {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 + Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T", String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1), "Z"].join("")
    }
    ;
    Date.prototype.toISOString = Jg ? Kg : Date.prototype.toISOString;
    _.C("gadgets.json.stringify", _.Ig);
    _.C("gadgets.json.parse", _.Hg);
    (function() {
        function a(e, f) {
            if (!(e < c) && d)
                if (2 === e && d.warn)
                    d.warn(f);
                else if (3 === e && d.error)
                    try {
                        d.error(f)
                    } catch (h) {}
                else
                    d.log && d.log(f)
        }
        var b = function(e) {
            a(1, e)
        };
        _.Yf = function(e) {
            a(2, e)
        }
        ;
        _.Zf = function(e) {
            a(3, e)
        }
        ;
        _.$f = function() {}
        ;
        b.INFO = 1;
        b.WARNING = 2;
        b.NONE = 4;
        var c = 1
          , d = window.console ? window.console : window.opera ? window.opera.postError : void 0;
        return b
    }
    )();
    _.Xf = _.Xf || {};
    _.Xf = _.Xf || {};
    (function() {
        var a = [];
        _.Xf.Wqa = function(b) {
            a.push(b)
        }
        ;
        _.Xf.lra = function() {
            for (var b = 0, c = a.length; b < c; ++b)
                a[b]()
        }
    }
    )();
    _.Xf = _.Xf || {};
    (function() {
        function a(c) {
            var d = "undefined" === typeof c;
            if (null !== b && d)
                return b;
            var e = {};
            c = c || window.location.href;
            var f = c.indexOf("?")
              , h = c.indexOf("#");
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
    }
    )();
    _.C("gadgets.util.getUrlParameters", _.Xf.kh);
    var Lg = function() {
        this.Rg = window.console
    };
    Lg.prototype.log = function(a) {
        this.Rg && this.Rg.log && this.Rg.log(a)
    }
    ;
    Lg.prototype.error = function(a) {
        this.Rg && (this.Rg.error ? this.Rg.error(a) : this.Rg.log && this.Rg.log(a))
    }
    ;
    Lg.prototype.warn = function(a) {
        this.Rg && (this.Rg.warn ? this.Rg.warn(a) : this.Rg.log && this.Rg.log(a))
    }
    ;
    Lg.prototype.debug = function() {}
    ;
    _.Mg = new Lg;
    _.Ng = function() {
        var a = _.cf.readyState;
        return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
    }
    ;
    _.Og = function(a) {
        if (_.Ng())
            a();
        else {
            var b = !1
              , c = function() {
                if (!b)
                    return b = !0,
                    a.apply(this, arguments)
            };
            _.af.addEventListener ? (_.af.addEventListener("load", c, !1),
            _.af.addEventListener("DOMContentLoaded", c, !1)) : _.af.attachEvent && (_.af.attachEvent("onreadystatechange", function() {
                _.Ng() && c.apply(this, arguments)
            }),
            _.af.attachEvent("onload", c))
        }
    }
    ;
    _.Pg = function(a, b) {
        var c = _.ff(_.rf, "watt", _.gf());
        _.ff(c, a, b)
    }
    ;
    _.lf(_.af.location.href, "rpctoken") && _.qf(_.cf, "unload", function() {});
    var Qg = Qg || {};
    Qg.jZ = null;
    Qg.aX = null;
    Qg.KA = null;
    Qg.frameElement = null;
    Qg = Qg || {};
    Qg.RN || (Qg.RN = function() {
        function a(f, h, k) {
            "undefined" != typeof window.addEventListener ? window.addEventListener(f, h, k) : "undefined" != typeof window.attachEvent && window.attachEvent("on" + f, h);
            "message" === f && (window.___jsl = window.___jsl || {},
            f = window.___jsl,
            f.RPMQ = f.RPMQ || [],
            f.RPMQ.push(h))
        }
        function b(f) {
            var h = _.Hg(f.data);
            if (h && h.f) {
                _.$f();
                var k = _.Rg.Go(h.f);
                e && ("undefined" !== typeof f.origin ? f.origin !== k : f.domain !== /^.+:\/\/([^:]+).*/.exec(k)[1]) ? _.Zf("Invalid rpc message origin. " + k + " vs " + (f.origin || "")) : c(h, f.origin)
            }
        }
        var c, d, e = !0;
        return {
            dT: function() {
                return "wpm"
            },
            iba: function() {
                return !0
            },
            Ad: function(f, h) {
                _.ag.register("rpc", null, function(k) {
                    "true" === String((k && k.rpc || {}).disableForceSecure) && (e = !1)
                });
                c = f;
                d = h;
                a("message", b, !1);
                d("..", !0);
                return !0
            },
            Qb: function(f) {
                d(f, !0);
                return !0
            },
            call: function(f, h, k) {
                var l = _.Rg.Go(f)
                  , m = _.Rg.YO(f);
                l ? window.setTimeout(function() {
                    var n = _.Ig(k);
                    _.$f();
                    m.postMessage(n, l)
                }, 0) : ".." != f && _.Zf("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message");
                return !0
            }
        }
    }());
    if (window.gadgets && window.gadgets.rpc)
        "undefined" != typeof _.Rg && _.Rg || (_.Rg = window.gadgets.rpc,
        _.Rg.config = _.Rg.config,
        _.Rg.register = _.Rg.register,
        _.Rg.unregister = _.Rg.unregister,
        _.Rg.OY = _.Rg.registerDefault,
        _.Rg.P0 = _.Rg.unregisterDefault,
        _.Rg.LS = _.Rg.forceParentVerifiable,
        _.Rg.call = _.Rg.call,
        _.Rg.Mu = _.Rg.getRelayUrl,
        _.Rg.Vj = _.Rg.setRelayUrl,
        _.Rg.bD = _.Rg.setAuthToken,
        _.Rg.Hw = _.Rg.setupReceiver,
        _.Rg.qo = _.Rg.getAuthToken,
        _.Rg.tK = _.Rg.removeReceiver,
        _.Rg.AT = _.Rg.getRelayChannel,
        _.Rg.KY = _.Rg.receive,
        _.Rg.LY = _.Rg.receiveSameDomain,
        _.Rg.getOrigin = _.Rg.getOrigin,
        _.Rg.Go = _.Rg.getTargetOrigin,
        _.Rg.YO = _.Rg._getTargetWin,
        _.Rg.D5 = _.Rg._parseSiblingId);
    else {
        _.Rg = function() {
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
                zb || ("undefined" != typeof window.addEventListener ? window.addEventListener("unload", L, !1) : "undefined" != typeof window.attachEvent && window.attachEvent("onunload", L),
                zb = !0)
            }
            function c(L, V, ta, Ma, R) {
                z[V] && z[V] === ta || (_.Zf("Invalid gadgets.rpc token. " + z[V] + " vs " + ta),
                Ja(V, 2));
                R.onunload = function() {
                    O[V] && !jb && (Ja(V, 1),
                    _.Rg.tK(V))
                }
                ;
                b();
                Ma = _.Hg(decodeURIComponent(Ma))
            }
            function d(L, V) {
                if (L && "string" === typeof L.s && "string" === typeof L.f && L.a instanceof Array)
                    if (z[L.f] && z[L.f] !== L.t && (_.Zf("Invalid gadgets.rpc token. " + z[L.f] + " vs " + L.t),
                    Ja(L.f, 2)),
                    "__ack" === L.s)
                        window.setTimeout(function() {
                            a(L.f, !0)
                        }, 0);
                    else {
                        L.c && (L.callback = function(za) {
                            _.Rg.call(L.f, (L.g ? "legacy__" : "") + "__cb", null, L.c, za)
                        }
                        );
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
                if (!L)
                    return "";
                L = L.split("#")[0].split("?")[0];
                L = L.toLowerCase();
                0 == L.indexOf("//") && (L = window.location.protocol + L);
                -1 == L.indexOf("://") && (L = window.location.protocol + "//" + L);
                var V = L.substring(L.indexOf("://") + 3)
                  , ta = V.indexOf("/");
                -1 != ta && (V = V.substring(0, ta));
                L = L.substring(0, L.indexOf("://"));
                if ("http" !== L && "https" !== L && "chrome-extension" !== L && "file" !== L && "android-app" !== L && "chrome-search" !== L && "chrome-untrusted" !== L && "chrome" !== L && "devtools" !== L)
                    throw Error("t");
                ta = "";
                var Ma = V.indexOf(":");
                if (-1 != Ma) {
                    var R = V.substring(Ma + 1);
                    V = V.substring(0, Ma);
                    if ("http" === L && "80" !== R || "https" === L && "443" !== R)
                        ta = ":" + R
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
                if ("undefined" === typeof L || ".." === L)
                    return window.parent;
                var V = f(L);
                if (V)
                    return window.top.frames[V.id];
                L = String(L);
                return (V = window.frames[L]) ? V : (V = document.getElementById(L)) && V.contentWindow ? V.contentWindow : null
            }
            function k(L, V) {
                if (!0 !== O[L]) {
                    "undefined" === typeof O[L] && (O[L] = 0);
                    var ta = h(L);
                    ".." !== L && null == ta || !0 !== ub.Qb(L, V) ? !0 !== O[L] && 10 > O[L]++ ? window.setTimeout(function() {
                        k(L, V)
                    }, 500) : (la[L] = fb,
                    O[L] = !0) : O[L] = !0
                }
            }
            function l(L) {
                (L = w[L]) && "/" === L.substring(0, 1) && (L = "/" === L.substring(1, 2) ? document.location.protocol + L : document.location.protocol + "//" + document.location.host + L);
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
                "true" === String(L.useLegacyProtocol) && (ub = Qg.KA || fb,
                ub.Ad(d, a))
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
                }
                !N.parent && V ? ta({}) : _.ag.register("rpc", null, ta)
            }
            function v(L, V, ta) {
                if (".." === L)
                    t(ta || N.rpctoken || N.ifpctok || "", V);
                else
                    a: {
                        var Ma = null;
                        if ("/" != L.charAt(0)) {
                            if (!_.Xf)
                                break a;
                            Ma = document.getElementById(L);
                            if (!Ma)
                                throw Error("u`" + L);
                        }
                        Ma = Ma && Ma.src;
                        V = V || e(Ma);
                        m(L, V);
                        V = _.Xf.kh(Ma);
                        n(L, ta || V.rpctoken)
                    }
            }
            var u = {}
              , w = {}
              , x = {}
              , z = {}
              , F = 0
              , H = {}
              , O = {}
              , N = {}
              , la = {}
              , U = {}
              , J = null
              , T = null
              , ia = window.top !== window.self
              , ua = window.name
              , Ja = function() {}
              , kb = window.console
              , gb = kb && kb.log && function(L) {
                kb.log(L)
            }
            || function() {}
              , fb = function() {
                function L(V) {
                    return function() {
                        gb(V + ": call ignored")
                    }
                }
                return {
                    dT: function() {
                        return "noop"
                    },
                    iba: function() {
                        return !0
                    },
                    Ad: L("init"),
                    Qb: L("setup"),
                    call: L("call")
                }
            }();
            _.Xf && (N = _.Xf.kh());
            var jb = !1
              , zb = !1
              , ub = function() {
                if ("rmr" == N.rpctx)
                    return Qg.jZ;
                var L = "function" === typeof window.postMessage ? Qg.RN : "object" === typeof window.postMessage ? Qg.RN : window.ActiveXObject ? Qg.aX ? Qg.aX : Qg.KA : 0 < navigator.userAgent.indexOf("WebKit") ? Qg.jZ : "Gecko" === navigator.product ? Qg.frameElement : Qg.KA;
                L || (L = fb);
                return L
            }();
            u[""] = function() {
                gb("Unknown RPC service: " + this.s)
            }
            ;
            u.__cb = function(L, V) {
                var ta = H[L];
                ta && (delete H[L],
                ta.call(this, V))
            }
            ;
            return {
                config: function(L) {
                    "function" === typeof L.uZ && (Ja = L.uZ)
                },
                register: function(L, V) {
                    if ("__cb" === L || "__ack" === L)
                        throw Error("v");
                    if ("" === L)
                        throw Error("w");
                    u[L] = V
                },
                unregister: function(L) {
                    if ("__cb" === L || "__ack" === L)
                        throw Error("x");
                    if ("" === L)
                        throw Error("y");
                    delete u[L]
                },
                OY: function(L) {
                    u[""] = L
                },
                P0: function() {
                    delete u[""]
                },
                LS: function() {},
                call: function(L, V, ta, Ma) {
                    L = L || "..";
                    var R = "..";
                    ".." === L ? R = ua : "/" == L.charAt(0) && (R = e(window.location.href),
                    R = "/" + ua + (R ? "|" + R : ""));
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
                        if ("query" === T)
                            aa = "#";
                        else if ("hash" === T)
                            break a;
                        aa = Y.lastIndexOf(aa);
                        aa = -1 === aa ? Y.length : aa;
                        Y = Y.substring(0, aa)
                    } else
                        Y = null;
                    Y && (za.r = Y);
                    if (".." === L || null != f(L) || document.getElementById(L))
                        (Y = la[L]) || null === f(L) || (Y = ub),
                        0 === V.indexOf("legacy__") && (Y = ub,
                        za.s = V.substring(8),
                        za.c = za.c ? za.c : F),
                        za.g = !0,
                        za.r = R,
                        Y ? (x[L] && (Y = Qg.KA),
                        !1 === Y.call(L, R, za) && (la[L] = fb,
                        ub.call(L, R, za))) : U[L] ? U[L].push(za) : U[L] = [za]
                },
                Mu: l,
                Vj: m,
                bD: n,
                Hw: v,
                qo: function(L) {
                    return z[L]
                },
                tK: function(L) {
                    delete w[L];
                    delete x[L];
                    delete z[L];
                    delete O[L];
                    delete la[L]
                },
                AT: function() {
                    return ub.dT()
                },
                KY: function(L, V) {
                    4 < L.length ? ub.soa(L, d) : c.apply(null, L.concat(V))
                },
                LY: function(L) {
                    L.a = Array.prototype.slice.call(L.a);
                    window.setTimeout(function() {
                        d(L)
                    }, 0)
                },
                getOrigin: e,
                Go: function(L) {
                    var V = null
                      , ta = l(L);
                    ta ? V = ta : (ta = f(L)) ? V = ta.origin : ".." == L ? V = N.parent : (L = document.getElementById(L)) && "iframe" === L.tagName.toLowerCase() && (V = L.src);
                    return e(V)
                },
                Ad: function() {
                    !1 === ub.Ad(d, a) && (ub = fb);
                    ia ? v("..") : _.ag.register("rpc", null, function(L) {
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
    }
    ;_.Rg.config({
        uZ: function(a) {
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
    _.yh = function(a) {
        if (!a)
            return "";
        if (/^about:(?:blank|srcdoc)$/.test(a))
            return window.origin || "";
        a.startsWith("blob:") && (a = a.substring(5));
        a = a.split("#")[0].split("?")[0];
        a = a.toLowerCase();
        0 == a.indexOf("//") && (a = window.location.protocol + a);
        /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
        var b = a.substring(a.indexOf("://") + 3)
          , c = b.indexOf("/");
        -1 != c && (b = b.substring(0, c));
        c = a.substring(0, a.indexOf("://"));
        if (!c)
            throw Error("A`" + a);
        if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !== c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c)
            throw Error("B`" + c);
        a = "";
        var d = b.indexOf(":");
        if (-1 != d) {
            var e = b.substring(d + 1);
            b = b.substring(0, d);
            if ("http" === c && "80" !== e || "https" === c && "443" !== e)
                a = ":" + e
        }
        return c + "://" + b + a
    }
    ;
    var Bh = function() {
        this.blockSize = -1
    };
    var Ch = function() {
        this.blockSize = -1;
        this.blockSize = 64;
        this.Zc = [];
        this.lF = [];
        this.q5 = [];
        this.eC = [];
        this.eC[0] = 128;
        for (var a = 1; a < this.blockSize; ++a)
            this.eC[a] = 0;
        this.OD = this.zr = 0;
        this.reset()
    };
    _.ab(Ch, Bh);
    Ch.prototype.reset = function() {
        this.Zc[0] = 1732584193;
        this.Zc[1] = 4023233417;
        this.Zc[2] = 2562383102;
        this.Zc[3] = 271733878;
        this.Zc[4] = 3285377520;
        this.OD = this.zr = 0
    }
    ;
    var Dh = function(a, b, c) {
        c || (c = 0);
        var d = a.q5;
        if ("string" === typeof b)
            for (var e = 0; 16 > e; e++)
                d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3),
                c += 4;
        else
            for (e = 0; 16 > e; e++)
                d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3],
                c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.Zc[0];
        c = a.Zc[1];
        var h = a.Zc[2]
          , k = a.Zc[3]
          , l = a.Zc[4];
        for (e = 0; 80 > e; e++) {
            if (40 > e)
                if (20 > e) {
                    f = k ^ c & (h ^ k);
                    var m = 1518500249
                } else
                    f = c ^ h ^ k,
                    m = 1859775393;
            else
                60 > e ? (f = c & h | k & (c | h),
                m = 2400959708) : (f = c ^ h ^ k,
                m = 3395469782);
            f = (b << 5 | b >>> 27) + f + l + m + d[e] & 4294967295;
            l = k;
            k = h;
            h = (c << 30 | c >>> 2) & 4294967295;
            c = b;
            b = f
        }
        a.Zc[0] = a.Zc[0] + b & 4294967295;
        a.Zc[1] = a.Zc[1] + c & 4294967295;
        a.Zc[2] = a.Zc[2] + h & 4294967295;
        a.Zc[3] = a.Zc[3] + k & 4294967295;
        a.Zc[4] = a.Zc[4] + l & 4294967295
    };
    Ch.prototype.update = function(a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.blockSize, d = 0, e = this.lF, f = this.zr; d < b; ) {
                if (0 == f)
                    for (; d <= c; )
                        Dh(this, a, d),
                        d += this.blockSize;
                if ("string" === typeof a)
                    for (; d < b; ) {
                        if (e[f] = a.charCodeAt(d),
                        ++f,
                        ++d,
                        f == this.blockSize) {
                            Dh(this, e);
                            f = 0;
                            break
                        }
                    }
                else
                    for (; d < b; )
                        if (e[f] = a[d],
                        ++f,
                        ++d,
                        f == this.blockSize) {
                            Dh(this, e);
                            f = 0;
                            break
                        }
            }
            this.zr = f;
            this.OD += b
        }
    }
    ;
    Ch.prototype.digest = function() {
        var a = []
          , b = 8 * this.OD;
        56 > this.zr ? this.update(this.eC, 56 - this.zr) : this.update(this.eC, this.blockSize - (this.zr - 56));
        for (var c = this.blockSize - 1; 56 <= c; c--)
            this.lF[c] = b & 255,
            b /= 256;
        Dh(this, this.lF);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8)
                a[b] = this.Zc[c] >> d & 255,
                ++b;
        return a
    }
    ;
    _.Eh = function() {
        this.VM = new Ch
    }
    ;
    _.g = _.Eh.prototype;
    _.g.reset = function() {
        this.VM.reset()
    }
    ;
    _.g.R0 = function(a) {
        this.VM.update(a)
    }
    ;
    _.g.dR = function() {
        return this.VM.digest()
    }
    ;
    _.g.xx = function(a) {
        a = unescape(encodeURIComponent(a));
        for (var b = [], c = 0, d = a.length; c < d; ++c)
            b.push(a.charCodeAt(c));
        this.R0(b)
    }
    ;
    _.g.cj = function() {
        for (var a = this.dR(), b = "", c = 0; c < a.length; c++)
            b += "0123456789ABCDEF".charAt(Math.floor(a[c] / 16)) + "0123456789ABCDEF".charAt(a[c] % 16);
        return b
    }
    ;
    _.hi = function(a) {
        _.r.setTimeout(function() {
            throw a;
        }, 0)
    }
    ;
    _.ii = function(a) {
        return _.Cb ? _.Db ? _.Db.brands.some(function(b) {
            return (b = b.brand) && _.yb(b, a)
        }) : !1 : !1
    }
    ;
    _.ji = function(a) {
        for (var b = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a); )
            c.push([d[1], d[2], d[3] || void 0]);
        return c
    }
    ;
    _.ki = function() {
        return _.Eb() ? _.ii("Microsoft Edge") : _.Ab("Edg/")
    }
    ;
    _.li = function() {
        return _.Ab("Firefox") || _.Ab("FxiOS")
    }
    ;
    _.mi = function() {
        return _.Eb() ? _.ii("Chromium") : (_.Ab("Chrome") || _.Ab("CriOS")) && !_.Ib() || _.Ab("Silk")
    }
    ;
    _.ni = function() {
        return _.Ab("Safari") && !(_.mi() || (_.Eb() ? 0 : _.Ab("Coast")) || _.Fb() || _.Ib() || _.ki() || (_.Eb() ? _.ii("Opera") : _.Ab("OPR")) || _.li() || _.Ab("Silk") || _.Ab("Android"))
    }
    ;
    _.oi = function() {
        return _.Ab("Android") && !(_.mi() || _.li() || _.Fb() || _.Ab("Silk"))
    }
    ;
    _.pi = function(a) {
        var b = {};
        a.forEach(function(c) {
            b[c[0]] = c[1]
        });
        return function(c) {
            return b[c.find(function(d) {
                return d in b
            })] || ""
        }
    }
    ;
    _.qi = function(a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1])
            return b[1];
        b = "";
        var c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1])
            if (a = /Trident\/(\d.\d)/.exec(a),
            "7.0" == c[1])
                if (a && a[1])
                    switch (a[1]) {
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
                    }
                else
                    b = "7.0";
            else
                b = c[1];
        return b
    }
    ;
    _.ri = _.li();
    _.si = _.Mb() || _.Ab("iPod");
    _.ti = _.Ab("iPad");
    _.ui = _.oi();
    _.vi = _.mi();
    _.wi = _.ni() && !_.Nb();
    _.Vi = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = !a && b.cfg || {};
        return b.cfg
    }
    ;
    _.Wi = function(a) {
        var b = _.Vi();
        if (!a)
            return b;
        a = a.split("/");
        for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c)
            b = b[a[c]];
        return c === a.length && void 0 !== b ? b : void 0
    }
    ;
    _.Xi = function(a, b) {
        b = _.Xe(b);
        void 0 !== b && (a.href = b)
    }
    ;
    _.Yi = function(a, b) {
        a.src = _.jc(b).toString()
    }
    ;
    var Zi;
    Zi = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//;
    _.$i = function(a) {
        var b = _.Wi("googleapis.config/sessionIndex");
        "string" === typeof b && 254 < b.length && (b = null);
        null == b && (b = window.__X_GOOG_AUTHUSER);
        "string" === typeof b && 254 < b.length && (b = null);
        if (null == b) {
            var c = window.google;
            c && (b = c.authuser)
        }
        "string" === typeof b && 254 < b.length && (b = null);
        null == b && (a = a || window.location.href,
        b = _.lf(a, "authuser") || null,
        null == b && (b = (b = a.match(Zi)) ? b[1] : null));
        if (null == b)
            return null;
        b = String(b);
        254 < b.length && (b = null);
        return b
    }
    ;
    var rj, qj, xj, yj, sj, vj, tj, zj, uj;
    _.wj = function() {
        if (qj) {
            var a = new _.af.Uint32Array(1);
            rj.getRandomValues(a);
            a = Number("0." + a[0])
        } else
            a = sj,
            a += parseInt(tj.substr(0, 20), 16),
            tj = uj(tj),
            a /= vj + Math.pow(16, 20);
        return a
    }
    ;
    rj = _.af.crypto;
    qj = !1;
    xj = 0;
    yj = 0;
    sj = 1;
    vj = 0;
    tj = "";
    zj = function(a) {
        a = a || _.af.event;
        var b = a.screenX + a.clientX << 16;
        b += a.screenY + a.clientY;
        b *= (new Date).getTime() % 1E6;
        sj = sj * b % vj;
        0 < xj && ++yj == xj && _.pf(_.af, "mousemove", zj, "remove", "de")
    }
    ;
    uj = function(a) {
        var b = new _.Eh;
        b.xx(a);
        return b.cj()
    }
    ;
    qj = !!rj && "function" == typeof rj.getRandomValues;
    qj || (vj = 1E6 * (screen.width * screen.width + screen.height),
    tj = uj(_.cf.cookie + "|" + _.cf.location + "|" + (new Date).getTime() + "|" + Math.random()),
    xj = _.Wi("random/maxObserveMousemove") || 0,
    0 != xj && _.qf(_.af, "mousemove", zj));
    _.Hj = function(a) {
        var b = window;
        a = (a || b.location.href).match(RegExp(".*(\\?|#|&)usegapi=([^&#]+)")) || [];
        return "1" === decodeURIComponent(a[a.length - 1] || "")
    }
    ;
    _.Mj = [];
    _.Nj = [];
    _.Oj = !1;
    _.Pj = function(a) {
        _.Mj[_.Mj.length] = a;
        if (_.Oj)
            for (var b = 0; b < _.Nj.length; b++)
                a((0,
                _.D)(_.Nj[b].wrap, _.Nj[b]))
    }
    ;
    _.zk = function(a, b, c, d) {
        for (var e = 0, f = a.length, h; e < f; ) {
            var k = e + (f - e >>> 1);
            var l = c ? b.call(void 0, a[k], k, a) : b(d, a[k]);
            0 < l ? e = k + 1 : (f = k,
            h = !l)
        }
        return h ? e : -e - 1
    }
    ;
    _.Ak = function(a, b) {
        var c = {}, d;
        for (d in a)
            b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }
    ;
    _.Bk = function(a) {
        return a.raw = a
    }
    ;
    var Ck = function(a) {
        this.T = a
    };
    _.g = Ck.prototype;
    _.g.value = function() {
        return this.T
    }
    ;
    _.g.Te = function(a) {
        this.T.width = a;
        return this
    }
    ;
    _.g.Xb = function() {
        return this.T.width
    }
    ;
    _.g.ie = function(a) {
        this.T.height = a;
        return this
    }
    ;
    _.g.Vc = function() {
        return this.T.height
    }
    ;
    _.g.Ah = function(a) {
        this.T.style = a;
        return this
    }
    ;
    _.g.getStyle = function() {
        return this.T.style
    }
    ;
    _.Dk = function(a) {
        this.T = a || {}
    }
    ;
    _.g = _.Dk.prototype;
    _.g.value = function() {
        return this.T
    }
    ;
    _.g.setUrl = function(a) {
        this.T.url = a;
        return this
    }
    ;
    _.g.getUrl = function() {
        return this.T.url
    }
    ;
    _.g.Ah = function(a) {
        this.T.style = a;
        return this
    }
    ;
    _.g.getStyle = function() {
        return this.T.style
    }
    ;
    _.g.Se = function(a) {
        this.T.id = a;
        return this
    }
    ;
    _.g.getId = function() {
        return this.T.id
    }
    ;
    _.g.Bn = function(a) {
        this.T.rpctoken = a;
        return this
    }
    ;
    _.Ek = function(a, b) {
        a.T.messageHandlers = b;
        return a
    }
    ;
    _.Fk = function(a, b) {
        a.T.messageHandlersFilter = b;
        return a
    }
    ;
    _.g = _.Dk.prototype;
    _.g.Cs = _.ea(4);
    _.g.getContext = function() {
        return this.T.context
    }
    ;
    _.g.yd = function() {
        return this.T.openerIframe
    }
    ;
    _.g.zo = function() {
        this.T.attributes = this.T.attributes || {};
        return new Ck(this.T.attributes)
    }
    ;
    _.g.Fk = function() {
        return this.T.controller
    }
    ;
    var Ok;
    _.Gk = function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (_.Wb(d)) {
                var e = a.length || 0
                  , f = d.length || 0;
                a.length = e + f;
                for (var h = 0; h < f; h++)
                    a[e + h] = d[h]
            } else
                a.push(d)
        }
    }
    ;
    _.Hk = function(a, b) {
        b = b || a;
        for (var c = 0, d = 0, e = {}; d < a.length; ) {
            var f = a[d++]
              , h = _.Rb(f) ? "o" + _.Yb(f) : (typeof f).charAt(0) + f;
            Object.prototype.hasOwnProperty.call(e, h) || (e[h] = !0,
            b[c++] = f)
        }
        b.length = c
    }
    ;
    _.Ik = function(a, b) {
        for (var c in a)
            if (!(c in b) || a[c] !== b[c])
                return !1;
        for (var d in b)
            if (!(d in a))
                return !1;
        return !0
    }
    ;
    _.Jk = function(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    ;
    _.Kk = function() {}
    ;
    _.Lk = function(a) {
        return a
    }
    ;
    _.Mk = function(a) {
        a.prototype.$goog_Thenable = !0
    }
    ;
    _.Nk = function(a) {
        if (!a)
            return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    }
    ;
    Ok = function(a, b) {
        this.a7 = a;
        this.bea = b;
        this.QB = 0;
        this.GA = null
    }
    ;
    Ok.prototype.get = function() {
        if (0 < this.QB) {
            this.QB--;
            var a = this.GA;
            this.GA = a.next;
            a.next = null
        } else
            a = this.a7();
        return a
    }
    ;
    Ok.prototype.put = function(a) {
        this.bea(a);
        100 > this.QB && (this.QB++,
        a.next = this.GA,
        this.GA = a)
    }
    ;
    var Qk, Rk, Pk;
    _.Sk = function(a) {
        a = Pk(a);
        "function" !== typeof _.r.setImmediate || _.r.Window && _.r.Window.prototype && !_.Ib() && _.r.Window.prototype.setImmediate == _.r.setImmediate ? (Qk || (Qk = Rk()),
        Qk(a)) : _.r.setImmediate(a)
    }
    ;
    Rk = function() {
        var a = _.r.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !_.Ab("Presto") && (a = function() {
            var e = _.oe("IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var h = "callImmediate" + Math.random()
              , k = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = (0,
            _.D)(function(l) {
                if (("*" == k || l.origin == k) && l.data == h)
                    this.port1.onmessage()
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(h, k)
                }
            }
        }
        );
        if ("undefined" !== typeof a && !_.Hb()) {
            var b = new a
              , c = {}
              , d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.cb;
                    c.cb = null;
                    e()
                }
            }
            ;
            return function(e) {
                d.next = {
                    cb: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            _.r.setTimeout(e, 0)
        }
    }
    ;
    Pk = _.Lk;
    _.Pj(function(a) {
        Pk = a
    });
    var Tk = function() {
        this.dE = this.et = null
    };
    Tk.prototype.add = function(a, b) {
        var c = Uk.get();
        c.set(a, b);
        this.dE ? this.dE.next = c : this.et = c;
        this.dE = c
    }
    ;
    Tk.prototype.remove = function() {
        var a = null;
        this.et && (a = this.et,
        this.et = this.et.next,
        this.et || (this.dE = null),
        a.next = null);
        return a
    }
    ;
    var Uk = new Ok(function() {
        return new Vk
    }
    ,function(a) {
        return a.reset()
    }
    )
      , Vk = function() {
        this.next = this.scope = this.ei = null
    };
    Vk.prototype.set = function(a, b) {
        this.ei = a;
        this.scope = b;
        this.next = null
    }
    ;
    Vk.prototype.reset = function() {
        this.next = this.scope = this.ei = null
    }
    ;
    var Wk, Xk, Yk, Zk, al;
    Xk = !1;
    Yk = new Tk;
    _.$k = function(a, b) {
        Wk || Zk();
        Xk || (Wk(),
        Xk = !0);
        Yk.add(a, b)
    }
    ;
    Zk = function() {
        if (_.r.Promise && _.r.Promise.resolve) {
            var a = _.r.Promise.resolve(void 0);
            Wk = function() {
                a.then(al)
            }
        } else
            Wk = function() {
                _.Sk(al)
            }
    }
    ;
    al = function() {
        for (var a; a = Yk.remove(); ) {
            try {
                a.ei.call(a.scope)
            } catch (b) {
                _.hi(b)
            }
            Uk.put(a)
        }
        Xk = !1
    }
    ;
    var dl, el, fl, tl, xl, vl, yl;
    _.cl = function(a, b) {
        this.Fa = 0;
        this.Cf = void 0;
        this.Bq = this.Tl = this.yb = null;
        this.vA = this.oG = !1;
        if (a != _.Kk)
            try {
                var c = this;
                a.call(b, function(d) {
                    bl(c, 2, d)
                }, function(d) {
                    bl(c, 3, d)
                })
            } catch (d) {
                bl(this, 3, d)
            }
    }
    ;
    dl = function() {
        this.next = this.context = this.Xr = this.Nv = this.On = null;
        this.zt = !1
    }
    ;
    dl.prototype.reset = function() {
        this.context = this.Xr = this.Nv = this.On = null;
        this.zt = !1
    }
    ;
    el = new Ok(function() {
        return new dl
    }
    ,function(a) {
        a.reset()
    }
    );
    fl = function(a, b, c) {
        var d = el.get();
        d.Nv = a;
        d.Xr = b;
        d.context = c;
        return d
    }
    ;
    _.gl = function(a) {
        if (a instanceof _.cl)
            return a;
        var b = new _.cl(_.Kk);
        bl(b, 2, a);
        return b
    }
    ;
    _.hl = function(a) {
        return new _.cl(function(b, c) {
            c(a)
        }
        )
    }
    ;
    _.jl = function(a, b, c) {
        il(a, b, c, null) || _.$k(_.$a(b, a))
    }
    ;
    _.kl = function(a) {
        return new _.cl(function(b, c) {
            var d = a.length
              , e = [];
            if (d)
                for (var f = function(m, n) {
                    d--;
                    e[m] = n;
                    0 == d && b(e)
                }, h = function(m) {
                    c(m)
                }, k = 0, l; k < a.length; k++)
                    l = a[k],
                    _.jl(l, _.$a(f, k), h);
            else
                b(e)
        }
        )
    }
    ;
    _.ml = function() {
        var a, b, c = new _.cl(function(d, e) {
            a = d;
            b = e
        }
        );
        return new ll(c,a,b)
    }
    ;
    _.cl.prototype.then = function(a, b, c) {
        return nl(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    }
    ;
    _.Mk(_.cl);
    _.pl = function(a, b) {
        b = fl(b, b);
        b.zt = !0;
        ol(a, b);
        return a
    }
    ;
    _.cl.prototype.ex = function(a, b) {
        return nl(this, null, a, b)
    }
    ;
    _.cl.prototype.catch = _.cl.prototype.ex;
    _.cl.prototype.cancel = function(a) {
        if (0 == this.Fa) {
            var b = new _.ql(a);
            _.$k(function() {
                rl(this, b)
            }, this)
        }
    }
    ;
    var rl = function(a, b) {
        if (0 == a.Fa)
            if (a.yb) {
                var c = a.yb;
                if (c.Tl) {
                    for (var d = 0, e = null, f = null, h = c.Tl; h && (h.zt || (d++,
                    h.On == a && (e = h),
                    !(e && 1 < d))); h = h.next)
                        e || (f = h);
                    e && (0 == c.Fa && 1 == d ? rl(c, b) : (f ? (d = f,
                    d.next == c.Bq && (c.Bq = d),
                    d.next = d.next.next) : sl(c),
                    tl(c, e, 3, b)))
                }
                a.yb = null
            } else
                bl(a, 3, b)
    }
      , ol = function(a, b) {
        a.Tl || 2 != a.Fa && 3 != a.Fa || ul(a);
        a.Bq ? a.Bq.next = b : a.Tl = b;
        a.Bq = b
    }
      , nl = function(a, b, c, d) {
        var e = fl(null, null, null);
        e.On = new _.cl(function(f, h) {
            e.Nv = b ? function(k) {
                try {
                    var l = b.call(d, k);
                    f(l)
                } catch (m) {
                    h(m)
                }
            }
            : f;
            e.Xr = c ? function(k) {
                try {
                    var l = c.call(d, k);
                    void 0 === l && k instanceof _.ql ? h(k) : f(l)
                } catch (m) {
                    h(m)
                }
            }
            : h
        }
        );
        e.On.yb = a;
        ol(a, e);
        return e.On
    };
    _.cl.prototype.vga = function(a) {
        this.Fa = 0;
        bl(this, 2, a)
    }
    ;
    _.cl.prototype.wga = function(a) {
        this.Fa = 0;
        bl(this, 3, a)
    }
    ;
    var bl = function(a, b, c) {
        0 == a.Fa && (a === c && (b = 3,
        c = new TypeError("Promise cannot resolve to itself")),
        a.Fa = 1,
        il(c, a.vga, a.wga, a) || (a.Cf = c,
        a.Fa = b,
        a.yb = null,
        ul(a),
        3 != b || c instanceof _.ql || vl(a, c)))
    }
      , il = function(a, b, c, d) {
        if (a instanceof _.cl)
            return ol(a, fl(b || _.Kk, c || null, d)),
            !0;
        if (_.Nk(a))
            return a.then(b, c, d),
            !0;
        if (_.Rb(a))
            try {
                var e = a.then;
                if ("function" === typeof e)
                    return wl(a, e, b, c, d),
                    !0
            } catch (f) {
                return c.call(d, f),
                !0
            }
        return !1
    }
      , wl = function(a, b, c, d, e) {
        var f = !1
          , h = function(l) {
            f || (f = !0,
            c.call(e, l))
        }
          , k = function(l) {
            f || (f = !0,
            d.call(e, l))
        };
        try {
            b.call(a, h, k)
        } catch (l) {
            k(l)
        }
    }
      , ul = function(a) {
        a.oG || (a.oG = !0,
        _.$k(a.sz, a))
    }
      , sl = function(a) {
        var b = null;
        a.Tl && (b = a.Tl,
        a.Tl = b.next,
        b.next = null);
        a.Tl || (a.Bq = null);
        return b
    };
    _.cl.prototype.sz = function() {
        for (var a; a = sl(this); )
            tl(this, a, this.Fa, this.Cf);
        this.oG = !1
    }
    ;
    tl = function(a, b, c, d) {
        if (3 == c && b.Xr && !b.zt)
            for (; a && a.vA; a = a.yb)
                a.vA = !1;
        if (b.On)
            b.On.yb = null,
            xl(b, c, d);
        else
            try {
                b.zt ? b.Nv.call(b.context) : xl(b, c, d)
            } catch (e) {
                yl.call(null, e)
            }
        el.put(b)
    }
    ;
    xl = function(a, b, c) {
        2 == b ? a.Nv.call(a.context, c) : a.Xr && a.Xr.call(a.context, c)
    }
    ;
    vl = function(a, b) {
        a.vA = !0;
        _.$k(function() {
            a.vA && yl.call(null, b)
        })
    }
    ;
    yl = _.hi;
    _.ql = function(a) {
        _.ib.call(this, a);
        this.uK = !1
    }
    ;
    _.ab(_.ql, _.ib);
    _.ql.prototype.name = "cancel";
    var ll = function(a, b, c) {
        this.promise = a;
        this.resolve = b;
        this.reject = c
    };
    _.zl = function(a) {
        return new _.cl(a)
    }
    ;
    var Il = function() {
        this.qx = {
            QY: Al ? "../" + Al : null,
            fz: Bl,
            PT: Cl,
            Cqa: Dl,
            Ho: Fl,
            yra: Gl
        };
        this.og = _.af;
        this.kY = this.f7;
        this.W7 = /MSIE\s*[0-8](\D|$)/.test(window.navigator.userAgent);
        if (this.qx.QY) {
            this.og = this.qx.PT(this.og, this.qx.QY);
            var a = this.og.document
              , b = a.createElement("script");
            b.setAttribute("type", "text/javascript");
            b.text = "window.doPostMsg=function(w,s,o) {window.setTimeout(function(){w.postMessage(s,o);},0);};";
            a.body.appendChild(b);
            this.kY = this.og.doPostMsg
        }
        this.WM = {};
        this.zN = {};
        a = (0,
        _.D)(this.KH, this);
        _.qf(this.og, "message", a);
        _.ff(_.rf, "RPMQ", []).push(a);
        this.og != this.og.parent && Hl(this, this.og.parent, this.YI(this.og.name), "*")
    };
    Il.prototype.YI = function(a) {
        return '{"h":"' + escape(a) + '"}'
    }
    ;
    var Nl = function(a) {
        var b = null;
        0 === a.indexOf('{"h":"') && a.indexOf('"}') === a.length - 2 && (b = unescape(a.substring(6, a.length - 2)));
        return b
    }
      , Ol = function(a) {
        if (!/^\s*{/.test(a))
            return !1;
        a = _.Hg(a);
        return null !== a && "object" === typeof a && !!a.g
    };
    Il.prototype.KH = function(a) {
        var b = String(a.data);
        _.Mg.debug("gapix.rpc.receive(" + Dl + "): " + (!b || 512 >= b.length ? b : b.substr(0, 512) + "... (" + b.length + " bytes)"));
        var c = 0 !== b.indexOf("!_");
        c || (b = b.substring(2));
        var d = Ol(b);
        if (!c && !d) {
            if (!d && (c = Nl(b))) {
                if (this.WM[c])
                    this.WM[c]();
                else
                    this.zN[c] = 1;
                return
            }
            var e = a.origin
              , f = this.qx.fz;
            this.W7 ? _.af.setTimeout(function() {
                f(b, e)
            }, 0) : f(b, e)
        }
    }
    ;
    Il.prototype.Qb = function(a, b) {
        ".." === a || this.zN[a] ? (b(),
        delete this.zN[a]) : this.WM[a] = b
    }
    ;
    var Hl = function(a, b, c, d) {
        var e = Ol(c) ? "" : "!_";
        _.Mg.debug("gapix.rpc.send(" + Dl + "): " + (!c || 512 >= c.length ? c : c.substr(0, 512) + "... (" + c.length + " bytes)"));
        a.kY(b, e + c, d)
    };
    Il.prototype.f7 = function(a, b, c) {
        a.postMessage(b, c)
    }
    ;
    Il.prototype.send = function(a, b, c) {
        (a = this.qx.PT(this.og, a)) && !a.closed && Hl(this, a, b, c)
    }
    ;
    var Pl, Ql, Rl, Sl, Tl, Ul, Vl, Al, Dl, Wl, Xl, Yl, Cl, Fl, $l, am, fm, gm, im, Gl, km, jm, bm, cm, lm, Bl, mm, nm;
    Pl = 0;
    Ql = [];
    Rl = {};
    Sl = {};
    Tl = _.af.location.href;
    Ul = _.lf(Tl, "rpctoken");
    Vl = _.lf(Tl, "parent") || _.cf.referrer;
    Al = _.lf(Tl, "rly");
    Dl = Al || (_.af !== _.af.top || _.af.opener) && _.af.name || "..";
    Wl = null;
    Xl = {};
    Yl = function() {}
    ;
    _.Zl = {
        send: Yl,
        Qb: Yl,
        YI: Yl
    };
    Cl = function(a, b) {
        "/" == b.charAt(0) && (b = b.substring(1),
        a = _.af.top);
        if (0 === b.length)
            return a;
        for (b = b.split("/"); b.length; ) {
            var c = b.shift();
            "{" == c.charAt(0) && "}" == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1));
            if (".." === c)
                a = a == a.parent ? a.opener : a.parent;
            else if (".." !== c && a.frames[c]) {
                if (a = a.frames[c],
                !("postMessage"in a))
                    throw Error("N");
            } else
                return null
        }
        return a
    }
    ;
    Fl = function(a) {
        return (a = Rl[a]) && a.token
    }
    ;
    $l = function(a) {
        if (a.f in {})
            return !1;
        var b = a.t
          , c = Rl[a.r];
        a = a.origin;
        return c && (c.token === b || !c.token && !b) && (a === c.origin || "*" === c.origin)
    }
    ;
    am = function(a) {
        var b = a.id.split("/")
          , c = b[b.length - 1]
          , d = a.origin;
        return function(e) {
            var f = e.origin;
            return e.f == c && (d == f || "*" == d)
        }
    }
    ;
    _.dm = function(a, b, c) {
        a = bm(a);
        Sl[a.name] = {
            ei: b,
            Bv: a.Bv,
            ct: c || $l
        };
        cm()
    }
    ;
    _.em = function(a) {
        delete Sl[bm(a).name]
    }
    ;
    fm = {};
    gm = function(a, b) {
        (a = fm["_" + a]) && a[1](this) && a[0].call(this, b)
    }
    ;
    im = function(a) {
        var b = a.c;
        if (!b)
            return Yl;
        var c = a.r
          , d = a.g ? "legacy__" : "";
        return function() {
            var e = [].slice.call(arguments, 0);
            e.unshift(c, d + "__cb", null, b);
            _.hm.apply(null, e)
        }
    }
    ;
    Gl = function(a) {
        Wl = a
    }
    ;
    km = function(a) {
        Xl[a] || (Xl[a] = _.af.setTimeout(function() {
            Xl[a] = !1;
            jm(a)
        }, 0))
    }
    ;
    jm = function(a) {
        var b = Rl[a];
        if (b && b.ready) {
            var c = b.lK;
            for (b.lK = []; c.length; )
                _.Zl.send(a, _.Ig(c.shift()), b.origin)
        }
    }
    ;
    bm = function(a) {
        return 0 === a.indexOf("legacy__") ? {
            name: a.substring(8),
            Bv: !0
        } : {
            name: a,
            Bv: !1
        }
    }
    ;
    cm = function() {
        for (var a = _.Wi("rpc/residenceSec") || 60, b = (new Date).getTime() / 1E3, c, d = 0; c = Ql[d]; ++d) {
            var e = c.Ip;
            if (!e || 0 < a && b - c.timestamp > a)
                Ql.splice(d, 1),
                --d;
            else {
                var f = e.s
                  , h = Sl[f] || Sl["*"];
                if (h)
                    if (Ql.splice(d, 1),
                    --d,
                    e.origin = c.origin,
                    c = im(e),
                    e.callback = c,
                    h.ct(e)) {
                        if ("__cb" !== f && !!h.Bv != !!e.g)
                            break;
                        e = h.ei.apply(e, e.a);
                        void 0 !== e && c(e)
                    } else
                        _.Mg.debug("gapix.rpc.rejected(" + Dl + "): " + f)
            }
        }
    }
    ;
    lm = function(a, b, c) {
        Ql.push({
            Ip: a,
            origin: b,
            timestamp: (new Date).getTime() / 1E3
        });
        c || cm()
    }
    ;
    Bl = function(a, b) {
        a = _.Hg(a);
        lm(a, b, !1)
    }
    ;
    mm = function(a) {
        for (; a.length; )
            lm(a.shift(), this.origin, !0);
        cm()
    }
    ;
    nm = function(a) {
        var b = !1;
        a = a.split("|");
        var c = a[0];
        0 <= c.indexOf("/") && (b = !0);
        return {
            id: c,
            origin: a[1] || "*",
            wI: b
        }
    }
    ;
    _.om = function(a, b, c, d) {
        var e = nm(a);
        d && (_.af.frames[e.id] = _.af.frames[e.id] || d);
        a = e.id;
        if (!Rl.hasOwnProperty(a)) {
            c = c || null;
            d = e.origin;
            if (".." === a)
                d = _.yh(Vl),
                c = c || Ul;
            else if (!e.wI) {
                var f = _.cf.getElementById(a);
                f && (f = f.src,
                d = _.yh(f),
                c = c || _.lf(f, "rpctoken"))
            }
            "*" === e.origin && d || (d = e.origin);
            Rl[a] = {
                token: c,
                lK: [],
                origin: d,
                nea: b,
                JY: function() {
                    var h = a;
                    Rl[h].ready = 1;
                    jm(h)
                }
            };
            _.Zl.Qb(a, Rl[a].JY)
        }
        return Rl[a].JY
    }
    ;
    _.hm = function(a, b, c, d) {
        a = a || "..";
        _.om(a);
        a = a.split("|", 1)[0];
        var e = b
          , f = a
          , h = [].slice.call(arguments, 3)
          , k = c
          , l = Dl
          , m = Ul
          , n = Rl[f]
          , p = l
          , q = nm(f);
        if (n && ".." !== f) {
            if (q.wI) {
                if (!(m = Rl[f].nea)) {
                    m = Wl ? Wl.substring(1).split("/") : [Dl];
                    p = m.length - 1;
                    for (f = _.af.parent; f !== _.af.top; ) {
                        var t = f.parent;
                        if (!p--) {
                            for (var v = null, u = t.frames.length, w = 0; w < u; ++w)
                                t.frames[w] == f && (v = w);
                            m.unshift("{" + v + "}")
                        }
                        f = t
                    }
                    m = "/" + m.join("/")
                }
                p = m
            } else
                p = l = "..";
            m = n.token
        }
        k && q ? (n = $l,
        q.wI && (n = am(q)),
        fm["_" + ++Pl] = [k, n],
        k = Pl) : k = null;
        h = {
            s: e,
            f: l,
            r: p,
            t: m,
            c: k,
            a: h
        };
        e = bm(e);
        h.s = e.name;
        h.g = e.Bv;
        Rl[a].lK.push(h);
        km(a)
    }
    ;
    if ("function" === typeof _.af.postMessage || "object" === typeof _.af.postMessage)
        _.Zl = new Il,
        _.dm("__cb", gm, function() {
            return !0
        }),
        _.dm("_processBatch", mm, function() {
            return !0
        }),
        _.om("..");
    var qm, rm, sm, tm, um, vm, wm, xm, ym, zm, Am, Bm, Fm, Gm, Hm, Im, Jm, Km, Lm, Mm;
    _.pm = function(a, b) {
        if (!a)
            throw Error(b || "");
    }
    ;
    qm = /&/g;
    rm = /</g;
    sm = />/g;
    tm = /"/g;
    um = /'/g;
    vm = function(a) {
        return String(a).replace(qm, "&amp;").replace(rm, "&lt;").replace(sm, "&gt;").replace(tm, "&quot;").replace(um, "&#39;")
    }
    ;
    wm = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g;
    xm = /%([a-f]|[0-9a-fA-F][a-f])/g;
    ym = /^(https?|ftp|file|chrome-extension):$/i;
    zm = function(a) {
        a = String(a);
        a = a.replace(wm, function(e) {
            try {
                return encodeURIComponent(e)
            } catch (f) {
                return encodeURIComponent(e.replace(/^[^%]+$/g, "\ufffd"))
            }
        }).replace(_.nf, function(e) {
            return e.replace(/%/g, "%25")
        }).replace(xm, function(e) {
            return e.toUpperCase()
        });
        a = a.match(_.mf) || [];
        var b = _.gf()
          , c = function(e) {
            return e.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g, "%7D")
        }
          , d = !!(a[1] || "").match(ym);
        b.Dt = c((a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : "")));
        d = function(e) {
            return c(e.replace(/\?/g, "%3F").replace(/#/g, "%23"))
        }
        ;
        b.query = a[5] ? [d(a[5])] : [];
        b.ij = a[7] ? [d(a[7])] : [];
        return b
    }
    ;
    Am = function(a) {
        return a.Dt + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.ij.length ? "#" + a.ij.join("&") : "")
    }
    ;
    Bm = function(a, b) {
        var c = [];
        if (a)
            for (var d in a)
                if (_.hf(a, d) && null != a[d]) {
                    var e = b ? b(a[d]) : a[d];
                    c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
                }
        return c
    }
    ;
    _.Cm = function(a, b, c, d) {
        a = zm(a);
        a.query.push.apply(a.query, Bm(b, d));
        a.ij.push.apply(a.ij, Bm(c, d));
        return Am(a)
    }
    ;
    _.Dm = function(a, b) {
        var c = zm(b);
        b = c.Dt;
        c.query.length && (b += "?" + c.query.join(""));
        c.ij.length && (b += "#" + c.ij.join(""));
        var d = "";
        2E3 < b.length && (c = b,
        b = b.substr(0, 2E3),
        b = b.replace(_.of, ""),
        d = c.substr(b.length));
        var e = a.createElement("div");
        a = a.createElement("a");
        c = zm(b);
        b = c.Dt;
        c.query.length && (b += "?" + c.query.join(""));
        c.ij.length && (b += "#" + c.ij.join(""));
        _.Xi(a, _.Fc(_.$e(b)));
        e.appendChild(a);
        _.Ye(e, _.jd(e.innerHTML));
        b = String(e.firstChild.href);
        e.parentNode && e.parentNode.removeChild(e);
        c = zm(b + d);
        b = c.Dt;
        c.query.length && (b += "?" + c.query.join(""));
        c.ij.length && (b += "#" + c.ij.join(""));
        return b
    }
    ;
    _.Em = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    Gm = function(a) {
        for (; a.firstChild; )
            a.removeChild(a.firstChild)
    }
    ;
    Hm = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//;
    Im = function() {
        var a = _.Wi("googleapis.config/sessionDelegate");
        "string" === typeof a && 21 < a.length && (a = null);
        null == a && (a = (a = window.location.href.match(Hm)) ? a[1] : null);
        if (null == a)
            return null;
        a = String(a);
        21 < a.length && (a = null);
        return a
    }
    ;
    Jm = function() {
        var a = _.rf.onl;
        if (!a) {
            a = _.gf();
            _.rf.onl = a;
            var b = _.gf();
            a.e = function(c) {
                var d = b[c];
                d && (delete b[c],
                d())
            }
            ;
            a.a = function(c, d) {
                b[c] = d
            }
            ;
            a.r = function(c) {
                delete b[c]
            }
        }
        return a
    }
    ;
    Km = function(a, b) {
        b = b.onload;
        return "function" === typeof b ? (Jm().a(a, b),
        b) : null
    }
    ;
    Lm = function(a) {
        _.pm(/^\w+$/.test(a), "Unsupported id - " + a);
        return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
    }
    ;
    Mm = function(a) {
        Jm().r(a)
    }
    ;
    var Om, Pm, Tm;
    _.Nm = {
        allowtransparency: "true",
        frameborder: "0",
        hspace: "0",
        marginheight: "0",
        marginwidth: "0",
        scrolling: "no",
        style: "",
        tabindex: "0",
        vspace: "0",
        width: "100%"
    };
    Om = {
        allowtransparency: !0,
        onload: !0
    };
    Pm = 0;
    _.Qm = function(a, b) {
        var c = 0;
        do
            var d = b.id || ["I", Pm++, "_", (new Date).getTime()].join("");
        while (a.getElementById(d) && 5 > ++c);
        _.pm(5 > c, "Error creating iframe id");
        return d
    }
    ;
    _.Rm = function(a, b) {
        return a ? b + "/" + a : ""
    }
    ;
    _.Sm = function(a, b, c, d) {
        var e = {}
          , f = {};
        a.documentMode && 9 > a.documentMode && (e.hostiemode = a.documentMode);
        _.jf(d.queryParams || {}, e);
        _.jf(d.fragmentParams || {}, f);
        var h = d.pfname;
        var k = _.gf();
        _.Wi("iframes/dropLegacyIdParam") || (k.id = c);
        k._gfid = c;
        k.parent = a.location.protocol + "//" + a.location.host;
        c = _.lf(a.location.href, "parent");
        h = h || "";
        !h && c && (h = _.lf(a.location.href, "_gfid", "") || _.lf(a.location.href, "id", ""),
        h = _.Rm(h, _.lf(a.location.href, "pfname", "")));
        h || (c = _.Hg(_.lf(a.location.href, "jcp", ""))) && "object" == typeof c && (h = _.Rm(c.id, c.pfname));
        k.pfname = h;
        d.connectWithJsonParam && (h = {},
        h.jcp = _.Ig(k),
        k = h);
        h = _.lf(b, "rpctoken") || e.rpctoken || f.rpctoken;
        h || (h = d.rpctoken || String(Math.round(1E8 * _.wj())),
        k.rpctoken = h);
        d.rpctoken = h;
        _.jf(k, d.connectWithQueryParams ? e : f);
        k = a.location.href;
        a = _.gf();
        (h = _.lf(k, "_bsh", _.rf.bsh)) && (a._bsh = h);
        (k = _.rf.dpo ? _.rf.h : _.lf(k, "jsh", _.rf.h)) && (a.jsh = k);
        d.hintInFragment ? _.jf(a, f) : _.jf(a, e);
        return _.Cm(b, e, f, d.paramsSerializer)
    }
    ;
    Tm = function(a) {
        _.pm(!a || _.Em.test(a), "Illegal url for new iframe - " + a)
    }
    ;
    _.Um = function(a, b, c, d, e) {
        Tm(c.src);
        var f, h = Km(d, c), k = h ? Lm(d) : "";
        try {
            document.all && (f = a.createElement('<iframe frameborder="' + vm(String(c.frameborder)) + '" scrolling="' + vm(String(c.scrolling)) + '" ' + k + ' name="' + vm(String(c.name)) + '"/>'))
        } catch (m) {} finally {
            f || (f = _.ae(a).va("IFRAME"),
            h && (f.onload = function() {
                f.onload = null;
                h.call(this)
            }
            ,
            Mm(d)))
        }
        f.setAttribute("ng-non-bindable", "");
        for (var l in c)
            a = c[l],
            "style" === l && "object" === typeof a ? _.jf(a, f.style) : Om[l] || f.setAttribute(l, String(a));
        (l = e && e.beforeNode || null) || e && e.dontclear || Gm(b);
        b.insertBefore(f, l);
        f = l ? l.previousSibling : b.lastChild;
        c.allowtransparency && (f.allowTransparency = !0);
        return f
    }
    ;
    var Vm, Ym;
    Vm = /^:[\w]+$/;
    _.Wm = /:([a-zA-Z_]+):/g;
    _.Xm = function() {
        var a = _.$i() || "0"
          , b = Im();
        var c = _.$i() || a;
        var d = Im()
          , e = "";
        c && (e += "u/" + encodeURIComponent(String(c)) + "/");
        d && (e += "b/" + encodeURIComponent(String(d)) + "/");
        c = e || null;
        (e = (d = !1 === _.Wi("isLoggedIn")) ? "_/im/" : "") && (c = "");
        var f = _.Wi("iframes/:socialhost:")
          , h = _.Wi("iframes/:im_socialhost:");
        return Fm = {
            socialhost: f,
            ctx_socialhost: d ? h : f,
            session_index: a,
            session_delegate: b,
            session_prefix: c,
            im_prefix: e
        }
    }
    ;
    Ym = function(a, b) {
        return _.Xm()[b] || ""
    }
    ;
    _.Zm = function(a) {
        return _.Dm(_.cf, a.replace(_.Wm, Ym))
    }
    ;
    _.$m = function(a) {
        var b = a;
        Vm.test(a) && (b = _.Wi("iframes/" + b.substring(1) + "/url"),
        _.pm(!!b, "Unknown iframe url config for - " + a));
        return _.Zm(b)
    }
    ;
    _.an = function(a, b, c) {
        c = c || {};
        var d = c.attributes || {};
        _.pm(!(c.allowPost || c.forcePost) || !d.onload, "onload is not supported by post iframe (allowPost or forcePost)");
        a = _.$m(a);
        d = b.ownerDocument || _.cf;
        var e = _.Qm(d, c);
        a = _.Sm(d, a, e, c);
        var f = c
          , h = _.gf();
        _.jf(_.Nm, h);
        _.jf(f.attributes, h);
        h.name = h.id = e;
        h.src = a;
        c.eurl = a;
        c = (f = c) || {};
        var k = !!c.allowPost;
        if (c.forcePost || k && 2E3 < a.length) {
            c = zm(a);
            h.src = "";
            f.dropDataPostorigin || (h["data-postorigin"] = a);
            a = _.Um(d, b, h, e);
            if (-1 != navigator.userAgent.indexOf("WebKit")) {
                var l = a.contentWindow.document;
                l.open();
                h = l.createElement("div");
                k = {};
                var m = e + "_inner";
                k.name = m;
                k.src = "";
                k.style = "display:none";
                _.Um(d, h, k, m, f)
            }
            h = (f = c.query[0]) ? f.split("&") : [];
            f = [];
            for (k = 0; k < h.length; k++)
                m = h[k].split("=", 2),
                f.push([decodeURIComponent(m[0]), decodeURIComponent(m[1])]);
            c.query = [];
            h = Am(c);
            _.pm(_.Em.test(h), "Invalid URL: " + h);
            c = d.createElement("form");
            c.method = "POST";
            c.target = e;
            c.style.display = "none";
            e = _.Xe(h);
            void 0 !== e && (c.action = e);
            for (e = 0; e < f.length; e++)
                h = d.createElement("input"),
                h.type = "hidden",
                h.name = f[e][0],
                h.value = f[e][1],
                c.appendChild(h);
            b.appendChild(c);
            c.submit();
            c.parentNode.removeChild(c);
            l && l.close();
            b = a
        } else
            b = _.Um(d, b, h, e, f);
        return b
    }
    ;
    var bn;
    bn = function() {
        function a(k, l) {
            k = window.getComputedStyle(k, "").getPropertyValue(l).match(/^([0-9]+)/);
            return parseInt(k[0], 10)
        }
        for (var b = 0, c = [document.body]; 0 < c.length; ) {
            var d = c.shift()
              , e = d.childNodes;
            if ("undefined" !== typeof d.style) {
                var f = d.style.overflowY;
                f || (f = (f = document.defaultView.getComputedStyle(d, null)) ? f.overflowY : null);
                if ("visible" != f && "inherit" != f && (f = d.style.height,
                f || (f = (f = document.defaultView.getComputedStyle(d, null)) ? f.height : ""),
                0 < f.length && "auto" != f))
                    continue
            }
            for (d = 0; d < e.length; d++) {
                f = e[d];
                if ("undefined" !== typeof f.offsetTop && "undefined" !== typeof f.offsetHeight) {
                    var h = f.offsetTop + f.offsetHeight + a(f, "margin-bottom");
                    b = Math.max(b, h)
                }
                c.push(f)
            }
        }
        return b + a(document.body, "border-bottom") + a(document.body, "margin-bottom") + a(document.body, "padding-bottom")
    }
    ;
    _.cn = function() {
        var a = 0;
        self.innerHeight ? a = self.innerHeight : document.documentElement && document.documentElement.clientHeight ? a = document.documentElement.clientHeight : document.body && (a = document.body.clientHeight);
        var b = document.body
          , c = document.documentElement;
        if ("CSS1Compat" === document.compatMode && c.scrollHeight)
            return c.scrollHeight !== a ? c.scrollHeight : c.offsetHeight;
        if (0 <= navigator.userAgent.indexOf("AppleWebKit"))
            return bn();
        if (b && c) {
            var d = c.scrollHeight
              , e = c.offsetHeight;
            c.clientHeight !== e && (d = b.scrollHeight,
            e = b.offsetHeight);
            return d > a ? d > e ? d : e : d < e ? d : e
        }
    }
    ;
    var dn = function(a, b) {
        return _.zk(a, b, !0)
    }, en = function(a) {
        var b = function(c) {
            return new (a().Context)(c)
        };
        b.prototype.addOnConnectHandler = function(c, d, e, f) {
            return a().Context.prototype.addOnConnectHandler.apply(this, [c, d, e, f])
        }
        ;
        b.prototype.addOnOpenerHandler = function(c, d, e) {
            return a().Context.prototype.addOnOpenerHandler.apply(this, [c, d, e])
        }
        ;
        b.prototype.closeSelf = function(c, d, e) {
            return a().Context.prototype.closeSelf.apply(this, [c, d, e])
        }
        ;
        b.prototype.connectIframes = function(c, d) {
            a().Context.prototype.connectIframes.apply(this, [c, d])
        }
        ;
        b.prototype.getFrameName = function() {
            return a().Context.prototype.getFrameName.apply(this)
        }
        ;
        b.prototype.getGlobalParam = function(c) {
            a().Context.prototype.getGlobalParam.apply(this, [c])
        }
        ;
        b.prototype.getParentIframe = function() {
            return a().Context.prototype.getParentIframe.apply(this)
        }
        ;
        b.prototype.getWindow = function() {
            return a().Context.prototype.getWindow.apply(this)
        }
        ;
        b.prototype.isDisposed = function() {
            return a().Context.prototype.isDisposed.apply(this)
        }
        ;
        b.prototype.open = function(c, d) {
            return a().Context.prototype.open.apply(this, [c, d])
        }
        ;
        b.prototype.openChild = function(c) {
            return a().Context.prototype.openChild.apply(this, [c])
        }
        ;
        b.prototype.ready = function(c, d, e, f) {
            a().Context.prototype.ready.apply(this, [c, d, e, f])
        }
        ;
        b.prototype.removeOnConnectHandler = function(c) {
            a().Context.prototype.removeOnConnectHandler.apply(this, [c])
        }
        ;
        b.prototype.restyleSelf = function(c, d, e) {
            return a().Context.prototype.restyleSelf.apply(this, [c, d, e])
        }
        ;
        b.prototype.setCloseSelfFilter = function(c) {
            a().Context.prototype.setCloseSelfFilter.apply(this, [c])
        }
        ;
        b.prototype.setGlobalParam = function(c, d) {
            a().Context.prototype.setGlobalParam.apply(this, [c, d])
        }
        ;
        b.prototype.setRestyleSelfFilter = function(c) {
            a().Context.prototype.setRestyleSelfFilter.apply(this, [c])
        }
        ;
        return b
    }, fn = function(a) {
        var b = function(c, d, e, f) {
            return new (a().Iframe)(c,d,e,f)
        };
        b.prototype.applyIframesApi = function(c) {
            a().Iframe.prototype.applyIframesApi(c)
        }
        ;
        b.prototype.close = function(c, d) {
            return a().Iframe.prototype.close.apply(this, [c, d])
        }
        ;
        b.prototype.getContext = function() {
            return a().Iframe.prototype.getContext.apply(this, [])
        }
        ;
        b.prototype.getFrameName = function() {
            return a().Iframe.prototype.getFrameName.apply(this, [])
        }
        ;
        b.prototype.getId = function() {
            return a().Iframe.prototype.getId.apply(this, [])
        }
        ;
        b.prototype.getIframeEl = function() {
            return a().Iframe.prototype.getIframeEl.apply(this, [])
        }
        ;
        b.prototype.getOrigin = function() {
            return a().Iframe.prototype.getOrigin.apply(this, [])
        }
        ;
        b.prototype.getParam = function(c) {
            a().Iframe.prototype.getParam.apply(this, [c])
        }
        ;
        b.prototype.getSiteEl = function() {
            return a().Iframe.prototype.getSiteEl.apply(this, [])
        }
        ;
        b.prototype.getWindow = function() {
            return a().Iframe.prototype.getWindow.apply(this, [])
        }
        ;
        b.prototype.isDisposed = function() {
            return a().Iframe.prototype.isDisposed.apply(this, [])
        }
        ;
        b.prototype.ping = function(c, d) {
            return a().Iframe.prototype.ping.apply(this, [c, d])
        }
        ;
        b.prototype.register = function(c, d, e) {
            a().Iframe.prototype.register.apply(this, [c, d, e])
        }
        ;
        b.prototype.registerWasClosed = function(c, d) {
            a().Iframe.prototype.registerWasClosed.apply(this, [c, d])
        }
        ;
        b.prototype.registerWasRestyled = function(c, d) {
            a().Iframe.prototype.registerWasRestyled.apply(this, [c, d])
        }
        ;
        b.prototype.restyle = function(c, d) {
            return a().Iframe.prototype.restyle.apply(this, [c, d])
        }
        ;
        b.prototype.send = function(c, d, e, f) {
            return a().Iframe.prototype.send.apply(this, [c, d, e, f])
        }
        ;
        b.prototype.setParam = function(c, d) {
            a().Iframe.prototype.setParam.apply(this, [c, d])
        }
        ;
        b.prototype.setSiteEl = function(c) {
            a().Iframe.prototype.setSiteEl.apply(this, [c])
        }
        ;
        b.prototype.unregister = function(c, d) {
            a().Iframe.prototype.unregister.apply(this, [c, d])
        }
        ;
        return b
    }, gn, hn, mn, on, tn, Cn, Dn, Fn, Jn, Kn, Nn, Pn, Qn, Sn, Rn, Tn;
    _.Dk.prototype.Cs = _.hb(4, function(a) {
        this.T.apis = a;
        return this
    });
    gn = function(a, b) {
        a.T.onload = b
    }
    ;
    hn = function(a) {
        return a.T.rpctoken
    }
    ;
    _.jn = function(a, b) {
        a.T.queryParams = b;
        return a
    }
    ;
    _.kn = function(a, b) {
        a.T.relayOpen = b;
        return a
    }
    ;
    _.ln = function(a, b) {
        a.T.onClose = b;
        return a
    }
    ;
    mn = function(a, b) {
        a.T.controllerData = b
    }
    ;
    _.nn = function(a) {
        a.T.waitForOnload = !0;
        return a
    }
    ;
    on = function(a) {
        return (a = a.T.timeout) ? a : null
    }
    ;
    _.pn = function(a) {
        return !!a && "object" === typeof a && _.ef.test(a.push)
    }
    ;
    _.qn = function(a) {
        for (var b = 0; b < this.length; b++)
            if (this[b] === a)
                return b;
        return -1
    }
    ;
    _.rn = function(a, b, c) {
        if (a) {
            _.pm(_.pn(a), "arrayForEach was called with a non array value");
            for (var d = 0; d < a.length; d++)
                b.call(c, a[d], d)
        }
    }
    ;
    _.sn = function(a, b, c) {
        if (a)
            if (_.pn(a))
                _.rn(a, b, c);
            else {
                _.pm("object" === typeof a, "objectForEach was called with a non object value");
                c = c || a;
                for (var d in a)
                    _.hf(a, d) && void 0 !== a[d] && b.call(c, a[d], d)
            }
    }
    ;
    tn = function(a) {
        this.T = a || {}
    }
    ;
    tn.prototype.value = function() {
        return this.T
    }
    ;
    tn.prototype.getIframe = function() {
        return this.T.iframe
    }
    ;
    var un = function(a, b) {
        a.T.role = b;
        return a
    }
      , vn = function(a, b) {
        a.T.data = b;
        return a
    };
    tn.prototype.wl = function(a) {
        this.T.setRpcReady = a;
        return this
    }
    ;
    var wn = function(a) {
        return a.T.setRpcReady
    };
    tn.prototype.Bn = function(a) {
        this.T.rpctoken = a;
        return this
    }
    ;
    var xn = function(a) {
        a.T.selfConnect = !0;
        return a
    }
      , yn = function(a) {
        this.T = a || {}
    };
    yn.prototype.value = function() {
        return this.T
    }
    ;
    var An = function(a) {
        var b = new zn;
        b.T.role = a;
        return b
    };
    yn.prototype.DT = function() {
        return this.T.role
    }
    ;
    yn.prototype.Qc = function(a) {
        this.T.handler = a;
        return this
    }
    ;
    yn.prototype.Cb = function() {
        return this.T.handler
    }
    ;
    var Bn = function(a, b) {
        a.T.filter = b;
        return a
    };
    yn.prototype.Cs = function(a) {
        this.T.apis = a;
        return this
    }
    ;
    Fn = /^[\w\.\-]*$/;
    _.Gn = function(a) {
        return a.getOrigin() === a.getContext().getOrigin()
    }
    ;
    _.Hn = function() {
        return !0
    }
    ;
    _.In = function(a) {
        for (var b = _.gf(), c = 0; c < a.length; c++)
            b[a[c]] = !0;
        return function(d) {
            return !!b[d.Ld]
        }
    }
    ;
    Jn = function(a, b, c) {
        a = Cn[a];
        if (!a)
            return [];
        for (var d = [], e = 0; e < a.length; e++)
            d.push(_.gl(a[e].call(c, b, c)));
        return d
    }
    ;
    Kn = function(a, b, c) {
        return function(d) {
            if (!b.isDisposed()) {
                var e = this.origin
                  , f = b.getOrigin();
                _.pm(e === f, "Wrong origin " + e + " != " + f);
                e = this.callback;
                d = Jn(a, d, b);
                !c && 0 < d.length && _.kl(d).then(e)
            }
        }
    }
    ;
    _.Ln = function(a, b, c) {
        _.pm("_default" != a, "Cannot update default api");
        Dn[a] = {
            map: b,
            filter: c
        }
    }
    ;
    _.Mn = function(a, b, c) {
        _.pm("_default" != a, "Cannot update default api");
        _.ff(Dn, a, {
            map: {},
            filter: _.Gn
        }).map[b] = c
    }
    ;
    Nn = function(a, b) {
        _.ff(Dn, "_default", {
            map: {},
            filter: _.Hn
        }).map[a] = b;
        _.sn(_.En.Ag, function(c) {
            c.register(a, b, _.Hn)
        })
    }
    ;
    _.On = function() {
        return _.En
    }
    ;
    Pn = /^https?:\/\/[^\/%\\?#\s]+$/i;
    Qn = {
        longdesc: !0,
        name: !0,
        src: !0,
        frameborder: !0,
        marginwidth: !0,
        marginheight: !0,
        scrolling: !0,
        align: !0,
        height: !0,
        width: !0,
        id: !0,
        "class": !0,
        title: !0,
        tabindex: !0,
        hspace: !0,
        vspace: !0,
        allowtransparency: !0
    };
    Sn = function(a) {
        this.resolve = this.reject = null;
        this.promise = _.zl((0,
        _.D)(function(b, c) {
            this.resolve = b;
            this.reject = c
        }, this));
        a && (this.promise = Rn(this.promise, a))
    }
    ;
    Rn = function(a, b) {
        return a.then(function(c) {
            try {
                b(c)
            } catch (d) {}
            return c
        })
    }
    ;
    Tn = function(a) {
        this.Cg = a;
        this.Context = en(a);
        this.Iframe = fn(a)
    }
    ;
    _.g = Tn.prototype;
    _.g.CROSS_ORIGIN_IFRAMES_FILTER = function(a) {
        return this.Cg().CROSS_ORIGIN_IFRAMES_FILTER(a)
    }
    ;
    _.g.SAME_ORIGIN_IFRAMES_FILTER = function(a) {
        return this.Cg().SAME_ORIGIN_IFRAMES_FILTER(a)
    }
    ;
    _.g.create = function(a, b, c) {
        return this.Cg().create(a, b, c)
    }
    ;
    _.g.getBeforeOpenStyle = function(a) {
        return this.Cg().getBeforeOpenStyle(a)
    }
    ;
    _.g.getContext = function() {
        return this.Cg().getContext()
    }
    ;
    _.g.getStyle = function(a) {
        return this.Cg().getStyle(a)
    }
    ;
    _.g.makeWhiteListIframesFilter = function(a) {
        return this.Cg().makeWhiteListIframesFilter(a)
    }
    ;
    _.g.registerBeforeOpenStyle = function(a, b) {
        return this.Cg().registerBeforeOpenStyle(a, b)
    }
    ;
    _.g.registerIframesApi = function(a, b, c) {
        return this.Cg().registerIframesApi(a, b, c)
    }
    ;
    _.g.registerIframesApiHandler = function(a, b, c) {
        return this.Cg().registerIframesApiHandler(a, b, c)
    }
    ;
    _.g.registerStyle = function(a, b) {
        return this.Cg().registerStyle(a, b)
    }
    ;
    var Un = function() {
        this.Ji = []
    };
    Un.prototype.Cg = function(a) {
        return this.Ji.length ? Vn(this.Ji[0], a) : void 0
    }
    ;
    var Vn = function(a, b) {
        b = void 0 === b ? function(c) {
            return new c
        }
        : b;
        return a.ef ? b(a.ef) : a.instance
    }
      , Wn = function() {
        Un.apply(this, arguments)
    };
    _.E(Wn, Un);
    var Yn = function(a) {
        var b = Xn.XQ
          , c = a.priority
          , d = ~dn(b.Ji, function(e) {
            return e.priority < c ? -1 : 1
        });
        b.Ji.splice(d, 0, a)
    };
    var Xn = new function() {
        var a = this;
        this.XQ = new Wn;
        this.instance = new Tn(function() {
            return a.XQ.Cg()()
        }
        )
    }
    ;
    Yn({
        instance: function() {
            return window.gapi.iframes
        },
        priority: 1
    });
    _.Zn = Xn.instance;
    var $n, ao;
    $n = {
        height: !0,
        width: !0
    };
    ao = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
    _.bo = function(a) {
        "number" === typeof a && (a = String(a) + "px");
        return a
    }
    ;
    var co = function() {
        tn.apply(this, arguments)
    };
    _.E(co, tn);
    var zn = function() {
        yn.apply(this, arguments)
    };
    _.E(zn, yn);
    var eo = function() {
        _.Dk.apply(this, arguments)
    };
    _.E(eo, _.Dk);
    var fo = function(a) {
        eo.call(this, a)
    };
    _.E(fo, eo);
    var go = function(a, b) {
        a.T.frameName = b;
        return a
    };
    fo.prototype.getFrameName = function() {
        return this.T.frameName
    }
    ;
    var ho = function(a, b) {
        a.T.rpcAddr = b;
        return a
    };
    fo.prototype.Hg = function() {
        return this.T.rpcAddr
    }
    ;
    var io = function(a, b) {
        a.T.retAddr = b;
        return a
    };
    _.g = fo.prototype;
    _.g.ni = function() {
        return this.T.retAddr
    }
    ;
    _.g.Tj = function(a) {
        this.T.origin = a;
        return this
    }
    ;
    _.g.getOrigin = function() {
        return this.T.origin
    }
    ;
    _.g.wl = function(a) {
        this.T.setRpcReady = a;
        return this
    }
    ;
    _.g.Mp = function(a) {
        this.T.context = a
    }
    ;
    var jo = function(a, b) {
        a.T._rpcReadyFn = b
    };
    fo.prototype.getIframeEl = function() {
        return this.T.iframeEl
    }
    ;
    var ko = function(a, b, c) {
        var d = a.Hg()
          , e = b.ni();
        io(ho(c, a.ni() + "/" + b.Hg()), e + "/" + d);
        go(c, b.getFrameName()).Tj(b.getOrigin())
    };
    var mo = function(a, b, c) {
        a.setTimeout(function() {
            b.closed || 5 == c ? lo(b) : (b.close(),
            c++,
            mo(a, b, c))
        }, 1E3)
    }
      , lo = function(a) {
        a.closed || a.document && a.document.body && _.xe(a.document.body, "Please close this window.")
    };
    _.no = function(a, b, c, d) {
        this.Zg = !1;
        this.tb = a;
        this.EK = b;
        this.Mq = c;
        this.Oa = d;
        this.gZ = this.Oa.ni();
        this.Ld = this.Oa.getOrigin();
        this.vaa = this.Oa.getIframeEl();
        this.P_ = this.Oa.T.where;
        this.Ji = [];
        this.applyIframesApi("_default");
        a = this.Oa.T.apis || [];
        for (b = 0; b < a.length; b++)
            this.applyIframesApi(a[b]);
        this.tb.Ag[c] = this
    }
    ;
    _.g = _.no.prototype;
    _.g.isDisposed = function() {
        return this.Zg
    }
    ;
    _.g.Ia = function() {
        if (!this.isDisposed()) {
            for (var a = 0; a < this.Ji.length; a++)
                this.unregister(this.Ji[a]);
            delete _.En.Ag[this.getFrameName()];
            this.Zg = !0
        }
    }
    ;
    _.g.getContext = function() {
        return this.tb
    }
    ;
    _.g.getOptions = function() {
        return this.Oa
    }
    ;
    _.g.Hg = function() {
        return this.EK
    }
    ;
    _.g.ni = function() {
        return this.gZ
    }
    ;
    _.g.getFrameName = function() {
        return this.Mq
    }
    ;
    _.g.getIframeEl = function() {
        return this.vaa
    }
    ;
    _.g.getSiteEl = function() {
        return this.P_
    }
    ;
    _.g.setSiteEl = function(a) {
        this.P_ = a
    }
    ;
    _.g.wl = function() {
        (0,
        this.Oa.T._rpcReadyFn)()
    }
    ;
    _.g.setParam = function(a, b) {
        this.Oa.value()[a] = b
    }
    ;
    _.g.getParam = function(a) {
        return this.Oa.value()[a]
    }
    ;
    _.g.Ic = function() {
        return this.Oa.value()
    }
    ;
    _.g.getId = function() {
        return this.Oa.getId()
    }
    ;
    _.g.getOrigin = function() {
        return this.Ld
    }
    ;
    var oo = function(a, b) {
        var c = a.Mq;
        a = a.tb.getFrameName();
        return c + ":" + a + ":" + b
    };
    _.g = _.no.prototype;
    _.g.register = function(a, b, c) {
        _.pm(!this.isDisposed(), "Cannot register handler on disposed iframe " + a);
        _.pm((c || _.Gn)(this), "Rejecting untrusted message " + a);
        c = oo(this, a);
        1 == _.ff(Cn, c, []).push(b) && (this.Ji.push(a),
        _.dm(c, Kn(c, this, "_g_wasClosed" === a)))
    }
    ;
    _.g.unregister = function(a, b) {
        var c = oo(this, a)
          , d = Cn[c];
        d && (b ? (b = _.qn.call(d, b),
        0 <= b && d.splice(b, 1)) : d.splice(0, d.length),
        0 == d.length && (b = _.qn.call(this.Ji, a),
        0 <= b && this.Ji.splice(b, 1),
        _.em(c)))
    }
    ;
    _.g.p9 = function() {
        return this.Ji
    }
    ;
    _.g.applyIframesApi = function(a) {
        this.SE = this.SE || [];
        if (!(0 <= _.qn.call(this.SE, a))) {
            this.SE.push(a);
            a = Dn[a] || {
                map: {}
            };
            for (var b in a.map)
                _.hf(a.map, b) && this.register(b, a.map[b], a.filter)
        }
    }
    ;
    _.g.getWindow = function() {
        if (!_.Gn(this))
            return null;
        var a = this.Oa.T._popupWindow;
        if (a)
            return a;
        var b = this.EK.split("/");
        a = this.getContext().getWindow();
        for (var c = 0; c < b.length && a; c++) {
            var d = b[c];
            a = ".." === d ? a == a.parent ? a.opener : a.parent : a.frames[d]
        }
        return a
    }
    ;
    var qo = function(a) {
        var b = {};
        if (a)
            for (var c in a)
                _.hf(a, c) && _.hf($n, c) && ao.test(a[c]) && (b[c] = a[c]);
        return b
    };
    _.g = _.no.prototype;
    _.g.close = function(a, b) {
        return ro(this, "_g_close", a, b)
    }
    ;
    _.g.restyle = function(a, b) {
        return ro(this, "_g_restyle", a, b)
    }
    ;
    _.g.vs = function(a, b) {
        return ro(this, "_g_restyleDone", a, b)
    }
    ;
    _.g.O6 = function(a) {
        return this.getContext().closeSelf(a, void 0, this)
    }
    ;
    _.g.jea = function(a) {
        if (a && "object" === typeof a)
            return this.getContext().restyleSelf(a, void 0, this)
    }
    ;
    _.g.kea = function(a) {
        var b = this.Oa.T.onRestyle;
        b && b.call(this, a, this);
        a = a && "object" === typeof a ? qo(a) : {};
        (b = this.getIframeEl()) && a && "object" === typeof a && (_.hf(a, "height") && (a.height = _.bo(a.height)),
        _.hf(a, "width") && (a.width = _.bo(a.width)),
        _.jf(a, b.style))
    }
    ;
    _.g.P6 = function(a) {
        var b = this.Oa.T.onClose;
        b && b.call(this, a, this);
        if (b = this.getOptions().T._popupWindow) {
            var c = this.getContext().getWindow().document.getElementById(this.getId());
            c && c.parentNode && c.parentNode.removeChild(c);
            c = this.getContext().getWindow();
            _.wd && _.wi && c ? (c.focus(),
            mo(c, b, 0)) : (b.close(),
            lo(b))
        }
        b || (b = this.getIframeEl()) && b.parentNode && b.parentNode.removeChild(b);
        if (b = this.Oa.Fk())
            c = {},
            c.frameName = this.getFrameName(),
            ro(b, "_g_disposeControl", c);
        b = oo(this, "_g_wasClosed");
        Jn(b, a, this)
    }
    ;
    _.g.registerWasRestyled = function(a, b) {
        this.register("_g_wasRestyled", a, b)
    }
    ;
    _.g.registerWasClosed = function(a, b) {
        this.register("_g_wasClosed", a, b)
    }
    ;
    _.g.Rga = function() {
        delete this.getContext().Ag[this.getFrameName()];
        this.getContext().getWindow().setTimeout((0,
        _.D)(function() {
            this.Ia()
        }, this), 0)
    }
    ;
    _.g.send = function(a, b, c, d) {
        _.pm(!this.isDisposed(), "Cannot send message to disposed iframe - " + a);
        _.pm((d || _.Gn)(this), "Wrong target for message " + a);
        c = new Sn(c);
        a = this.tb.getFrameName() + ":" + this.Mq + ":" + a;
        _.hm(this.EK, a, c.resolve, b);
        return c.promise
    }
    ;
    var ro = function(a, b, c, d) {
        return a.send(b, c, d, _.Hn)
    };
    _.g = _.no.prototype;
    _.g.hda = function(a) {
        return a
    }
    ;
    _.g.ping = function(a, b) {
        return ro(this, "_g_ping", b, a)
    }
    ;
    _.g.V6 = function(a) {
        a = a && "object" === typeof a ? a : {};
        for (var b = a.rpcAddr, c = (this.Hg() + "/" + b).split("/"), d = this.getContext().getWindow(), e; (e = c.shift()) && d; )
            d = ".." == e ? d.parent : d.frames[e];
        _.pm(!!d, "Bad rpc address " + b);
        a._window = d;
        a._parentRpcAddr = this.Hg();
        a._parentRetAddr = this.ni();
        this.getContext();
        b = new _.so(a);
        this.rca && this.rca(b, a.controllerData);
        this.FF = this.FF || [];
        this.FF.push(b, a.controllerData)
    }
    ;
    _.g.k7 = function(a) {
        a = (a || {}).frameName;
        for (var b = this.FF || [], c = 0; c < b.length; c++)
            if (b[c].getFrameName() === a) {
                a = b.splice(c, 1)[0];
                a.Ia();
                this.vca && this.vca(a);
                return
            }
        _.pm(!1, "Unknown contolled iframe to dispose - " + a)
    }
    ;
    _.g.S6 = function(a) {
        var b = new fo(a);
        a = new co(b.value());
        if (a.T.selfConnect)
            var c = this;
        else
            (_.pm(Pn.test(b.getOrigin()), "Illegal origin for connected iframe - " + b.getOrigin()),
            c = this.getContext().Ag[b.getFrameName()],
            c) ? wn(b) && (c.wl(),
            ro(c, "_g_rpcReady")) : (b = go(io(ho(new fo, b.Hg()), b.ni()).Tj(b.getOrigin()), b.getFrameName()).wl(wn(b)).Bn(hn(b)),
            c = this.getContext().attach(b.value()));
        b = this.getContext();
        var d = a.T.role;
        a = a.T.data;
        to(b);
        d = d || "";
        _.ff(b.DF, d, []).push({
            Wf: c,
            data: a
        });
        uo(c, a, b.zJ[d])
    }
    ;
    _.g.cM = function(a, b) {
        (new fo(b)).T._relayedDepth || (b = {},
        xn(un(new co(b), "_opener")),
        ro(a, "_g_connect", b))
    }
    ;
    _.g.EX = function(a) {
        var b = this
          , c = a.T.messageHandlers
          , d = a.T.messageHandlersFilter
          , e = a.T.onClose;
        _.ln(_.Fk(_.Ek(a, null), null), null);
        return ro(this, "_g_open", a.value()).then(function(f) {
            var h = new fo(f[0])
              , k = h.getFrameName();
            f = new fo;
            var l = b.ni()
              , m = h.ni();
            io(ho(f, b.Hg() + "/" + h.Hg()), m + "/" + l);
            go(f, k);
            f.Tj(h.getOrigin());
            f.Cs(h.T.apis);
            f.Bn(hn(a));
            _.Ek(f, c);
            _.Fk(f, d);
            _.ln(f, e);
            (h = b.getContext().Ag[k]) || (h = b.getContext().attach(f.value()));
            return h
        })
    }
    ;
    _.g.FK = function(a) {
        var b = a.getUrl();
        _.pm(!b || _.Em.test(b), "Illegal url for new iframe - " + b);
        var c = a.zo().value();
        b = {};
        for (var d in c)
            _.hf(c, d) && _.hf(Qn, d) && (b[d] = c[d]);
        _.hf(c, "style") && (d = c.style,
        "object" === typeof d && (b.style = qo(d)));
        a.value().attributes = b
    }
    ;
    _.g.Qca = function(a) {
        a = new fo(a);
        this.FK(a);
        var b = a.T._relayedDepth || 0;
        a.T._relayedDepth = b + 1;
        a.T.openerIframe = this;
        var c = hn(a);
        a.Bn(null);
        var d = this;
        return this.getContext().open(a.value()).then(function(e) {
            var f = (new fo(e.Ic())).T.apis
              , h = new fo;
            ko(e, d, h);
            0 == b && un(new co(h.value()), "_opener");
            h.wl(!0);
            h.Bn(c);
            ro(e, "_g_connect", h.value());
            h = new fo;
            go(io(ho(h, e.Hg()), e.gZ), e.getFrameName()).Tj(e.getOrigin()).Cs(f);
            return h.value()
        })
    }
    ;
    _.g.iea = function(a) {
        this.getContext().addOnOpenerHandler(function(b) {
            b.send("_g_wasRestyled", a, void 0, _.Hn)
        }, null, _.Hn)
    }
    ;
    var zo;
    _.vo = _.gf();
    _.wo = _.gf();
    _.xo = function(a, b) {
        _.vo[a] = b
    }
    ;
    _.yo = function(a) {
        return _.vo[a]
    }
    ;
    zo = function(a, b) {
        _.kf.load("gapi.iframes.style." + a, b)
    }
    ;
    _.Do = function(a, b) {
        _.wo[a] = b
    }
    ;
    _.Eo = function(a) {
        return _.wo[a]
    }
    ;
    _.so = function(a) {
        a = a || {};
        this.Zg = !1;
        this.Jj = _.gf();
        this.Ag = _.gf();
        this.og = a._window || _.af;
        this.Qd = this.og.location.href;
        this.VX = (this.TJ = Fo(this.Qd, "parent")) ? Fo(this.Qd, "pfname") : "";
        this.Ga = this.TJ ? Fo(this.Qd, "_gfid") || Fo(this.Qd, "id") : "";
        this.Mq = _.Rm(this.Ga, this.VX);
        this.Ld = _.yh(this.Qd);
        if (this.Ga) {
            var b = new fo;
            ho(b, a._parentRpcAddr || "..");
            io(b, a._parentRetAddr || this.Ga);
            b.Tj(_.yh(this.TJ || this.Qd));
            go(b, this.VX);
            this.yb = this.attach(b.value())
        } else
            this.yb = null
    }
    ;
    _.g = _.so.prototype;
    _.g.isDisposed = function() {
        return this.Zg
    }
    ;
    _.g.Ia = function() {
        if (!this.isDisposed()) {
            for (var a = _.va(Object.values(this.Ag)), b = a.next(); !b.done; b = a.next())
                b.value.Ia();
            this.Zg = !0
        }
    }
    ;
    _.g.getFrameName = function() {
        return this.Mq
    }
    ;
    _.g.getOrigin = function() {
        return this.Ld
    }
    ;
    _.g.getWindow = function() {
        return this.og
    }
    ;
    _.g.ub = function() {
        return this.og.document
    }
    ;
    _.g.setGlobalParam = function(a, b) {
        this.Jj[a] = b
    }
    ;
    _.g.getGlobalParam = function(a) {
        return this.Jj[a]
    }
    ;
    _.g.attach = function(a) {
        _.pm(!this.isDisposed(), "Cannot attach iframe in disposed context");
        a = new fo(a);
        a.Hg() || ho(a, a.getId());
        a.ni() || io(a, "..");
        a.getOrigin() || a.Tj(_.yh(a.getUrl()));
        a.getFrameName() || go(a, _.Rm(a.getId(), this.Mq));
        var b = a.getFrameName();
        if (this.Ag[b])
            return this.Ag[b];
        var c = a.Hg()
          , d = c;
        a.getOrigin() && (d = c + "|" + a.getOrigin());
        var e = a.ni()
          , f = hn(a);
        f || (f = (f = a.getIframeEl()) && (f.getAttribute("data-postorigin") || f.src) || a.getUrl(),
        f = _.lf(f, "rpctoken"));
        jo(a, _.om(d, e, f, a.T._popupWindow));
        d = ((window.gadgets || {}).rpc || {}).setAuthToken;
        f && d && d(c, f);
        var h = new _.no(this,c,b,a)
          , k = a.T.messageHandlersFilter;
        _.sn(a.T.messageHandlers, function(l, m) {
            h.register(m, l, k)
        });
        wn(a) && h.wl();
        ro(h, "_g_rpcReady");
        return h
    }
    ;
    _.g.FK = function(a) {
        go(a, null);
        var b = a.getId();
        !b || Fn.test(b) && !this.getWindow().document.getElementById(b) || (_.Mg.log("Ignoring requested iframe ID - " + b),
        a.Se(null))
    }
    ;
    var Fo = function(a, b) {
        var c = _.lf(a, b);
        c || (c = _.Hg(_.lf(a, "jcp", ""))[b]);
        return c || ""
    };
    _.so.prototype.openChild = function(a) {
        _.pm(!this.isDisposed(), "Cannot open iframe in disposed context");
        var b = new fo(a);
        Go(this, b);
        var c = b.getFrameName();
        if (c && this.Ag[c])
            return this.Ag[c];
        this.FK(b);
        c = b.getUrl();
        _.pm(c, "No url for new iframe");
        var d = b.T.queryParams || {};
        d.usegapi = "1";
        _.jn(b, d);
        d = this.uU && this.uU(c, b);
        d || (d = b.T.where,
        _.pm(!!d, "No location for new iframe"),
        c = _.an(c, d, a),
        b.T.iframeEl = c,
        d = c.getAttribute("id"));
        ho(b, d).Se(d);
        b.Tj(_.yh(b.T.eurl || ""));
        this.AW && this.AW(b, b.getIframeEl());
        c = this.attach(a);
        c.cM && c.cM(c, a);
        (a = b.T.onCreate) && a(c);
        b.T.disableRelayOpen || c.applyIframesApi("_open");
        return c
    }
    ;
    var Ho = function(a, b, c) {
        var d = b.T.canvasUrl;
        if (!d)
            return c;
        _.pm(!b.T.allowPost && !b.T.forcePost, "Post is not supported when using canvas url");
        var e = b.getUrl();
        _.pm(e && _.yh(e) === a.Ld && _.yh(d) === a.Ld, "Wrong origin for canvas or hidden url " + d);
        b.setUrl(d);
        _.nn(b);
        b.T.canvasUrl = null;
        return function(f) {
            var h = f.getWindow()
              , k = h.location.hash;
            k = _.$m(e) + (/#/.test(e) ? k.replace(/^#/, "&") : k);
            h.location.replace(k);
            c && c(f)
        }
    }
      , Io = function(a, b, c) {
        var d = b.T.relayOpen;
        if (d) {
            var e = a.getParentIframe();
            d instanceof _.no ? (e = d,
            _.kn(b, 0)) : 0 < Number(d) && _.kn(b, Number(d) - 1);
            if (e) {
                _.pm(!!e.EX, "Relaying iframe open is disabled");
                if (d = b.getStyle())
                    if (d = _.wo[d])
                        b.Mp(a),
                        d(b.value()),
                        b.Mp(null);
                b.T.openerIframe = null;
                c.resolve(e.EX(b));
                return !0
            }
        }
        return !1
    }
      , Jo = function(a, b, c) {
        var d = b.getStyle();
        if (d)
            if (_.pm(!!_.yo, "Defer style is disabled, when requesting style " + d),
            _.vo[d])
                Go(a, b);
            else
                return zo(d, function() {
                    _.pm(!!_.vo[d], "Fail to load style - " + d);
                    c.resolve(a.open(b.value()))
                }),
                !0;
        return !1
    };
    _.so.prototype.open = function(a, b) {
        _.pm(!this.isDisposed(), "Cannot open iframe in disposed context");
        var c = new fo(a);
        b = Ho(this, c, b);
        var d = new Sn(b);
        (b = c.getUrl()) && c.setUrl(_.$m(b));
        if (Io(this, c, d) || Jo(this, c, d) || Io(this, c, d))
            return d.promise;
        if (null != on(c)) {
            var e = setTimeout(function() {
                h.getIframeEl().src = "about:blank";
                d.reject({
                    timeout: "Exceeded time limit of :" + on(c) + "milliseconds"
                })
            }, on(c))
              , f = d.resolve;
            d.resolve = function(k) {
                clearTimeout(e);
                f(k)
            }
        }
        c.T.waitForOnload && gn(c.zo(), function() {
            d.resolve(h)
        });
        var h = this.openChild(a);
        c.T.waitForOnload || d.resolve(h);
        return d.promise
    }
    ;
    _.so.prototype.getParentIframe = function() {
        return this.yb
    }
    ;
    var Ko = function(a, b) {
        var c = a.getParentIframe()
          , d = !0;
        b.filter && (d = b.filter.call(b.Wf, b.params));
        return _.gl(d).then(function(e) {
            return e && c ? (b.TX && b.TX.call(a, b.params),
            e = b.sender ? b.sender(b.params) : ro(c, b.message, b.params),
            b.Pga ? e.then(function() {
                return !0
            }) : !0) : !1
        })
    };
    _.g = _.so.prototype;
    _.g.closeSelf = function(a, b, c) {
        a = Ko(this, {
            sender: function(d) {
                var e = _.En.getParentIframe();
                _.sn(_.En.Ag, function(f) {
                    f !== e && ro(f, "_g_wasClosed", d)
                });
                return ro(e, "_g_closeMe", d)
            },
            message: "_g_closeMe",
            params: a,
            Wf: c,
            filter: this.getGlobalParam("onCloseSelfFilter")
        });
        b = new Sn(b);
        b.resolve(a);
        return b.promise
    }
    ;
    _.g.restyleSelf = function(a, b, c) {
        a = a || {};
        b = new Sn(b);
        b.resolve(Ko(this, {
            message: "_g_restyleMe",
            params: a,
            Wf: c,
            filter: this.getGlobalParam("onRestyleSelfFilter"),
            Pga: !0,
            TX: this.Q0
        }));
        return b.promise
    }
    ;
    _.g.Q0 = function(a) {
        "auto" === a.height && (a.height = _.cn())
    }
    ;
    _.g.setCloseSelfFilter = function(a) {
        this.setGlobalParam("onCloseSelfFilter", a)
    }
    ;
    _.g.setRestyleSelfFilter = function(a) {
        this.setGlobalParam("onRestyleSelfFilter", a)
    }
    ;
    var Go = function(a, b) {
        var c = b.getStyle();
        if (c) {
            b.Ah(null);
            var d = _.vo[c];
            _.pm(d, "No such style: " + c);
            b.Mp(a);
            d(b.value());
            b.Mp(null)
        }
    };
    _.so.prototype.ready = function(a, b, c, d) {
        var e = b || {}
          , f = this.getParentIframe();
        this.addOnOpenerHandler(function(k) {
            _.sn(e, function(l, m) {
                k.register(m, l, d)
            }, this);
            k !== f && k.send("_ready", h, void 0, d)
        }, void 0, d);
        var h = a || {};
        h.height = h.height || "auto";
        this.Q0(h);
        f && f.send("_ready", h, c, _.Hn)
    }
    ;
    _.so.prototype.connectIframes = function(a, b) {
        a = new co(a);
        var c = new co(b)
          , d = wn(a);
        b = a.getIframe();
        var e = c.getIframe();
        if (e) {
            var f = hn(a)
              , h = new fo;
            ko(b, e, h);
            vn(un((new co(h.value())).Bn(f), a.T.role), a.T.data).wl(d);
            var k = new fo;
            ko(e, b, k);
            vn(un((new co(k.value())).Bn(f), c.T.role), c.T.data).wl(!0);
            ro(b, "_g_connect", h.value(), function() {
                d || ro(e, "_g_connect", k.value())
            });
            d && ro(e, "_g_connect", k.value())
        } else
            c = {},
            vn(un(xn(new co(c)), a.T.role), a.T.data),
            ro(b, "_g_connect", c)
    }
    ;
    var to = function(a) {
        a.DF || (a.DF = _.gf(),
        a.zJ = _.gf())
    };
    _.so.prototype.addOnConnectHandler = function(a, b, c, d) {
        to(this);
        "object" === typeof a ? (b = new zn(a),
        c = b.DT() || "") : (b = Bn(An(a).Qc(b).Cs(c), d),
        c = a);
        d = this.DF[c] || [];
        a = !1;
        for (var e = 0; e < d.length && !a; e++)
            uo(this.Ag[d[e].Wf.getFrameName()], d[e].data, [b]),
            a = b.T.runOnce;
        c = _.ff(this.zJ, c, []);
        a || b.T.dontWait || c.push(b)
    }
    ;
    _.so.prototype.removeOnConnectHandler = function(a, b) {
        a = _.ff(this.zJ, a, []);
        if (b)
            for (var c = !1, d = 0; !c && d < a.length; d++)
                a[d].Cb() === b && (c = !0,
                a.splice(d, 1));
        else
            a.splice(0, a.length)
    }
    ;
    var uo = function(a, b, c) {
        c = c || [];
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            if (e && a) {
                var f = e.T.filter || _.Gn;
                if (a && f(a)) {
                    f = e.T.apis || [];
                    for (var h = 0; h < f.length; h++)
                        a.applyIframesApi(f[h]);
                    e.Cb() && e.Cb()(a, b);
                    e.T.runOnce && (c.splice(d, 1),
                    --d)
                }
            }
        }
    };
    _.so.prototype.addOnOpenerHandler = function(a, b, c) {
        var d = this.addOnConnectHandler;
        a = Bn(An("_opener").Qc(a).Cs(b), c);
        a.T.runOnce = !0;
        d.call(this, a.value())
    }
    ;
    _.so.prototype.AW = function(a, b) {
        var c = a.Fk();
        if (c) {
            _.pm(c.Ld === a.getOrigin(), "Wrong controller origin " + this.Ld + " !== " + a.getOrigin());
            var d = a.Hg();
            ho(a, c.Hg());
            io(a, c.ni());
            var e = new fo;
            mn(ho(e, d), a.T.controllerData);
            _.qf(b, "load", function() {
                c.send("_g_control", e.value())
            })
        }
    }
    ;
    var Lo = function(a, b, c) {
        a = a.getWindow();
        var d = a.document
          , e = c.T.reuseWindow;
        if (e) {
            var f = c.getId();
            if (!f)
                throw Error("O");
        } else
            f = _.Qm(d, c);
        var h = f
          , k = c.T.rpcRelayUrl;
        if (k) {
            k = _.Zm(k);
            h = c.T.fragmentParams || {};
            h.rly = f;
            c.T.fragmentParams = h;
            h = c.T.where || d.body;
            _.pm(!!h, "Cannot open window in a page with no body");
            var l = {};
            l.src = k;
            l.style = "display:none;";
            l.id = f;
            l.name = f;
            _.Um(d, h, l, f);
            h = f + "_relay"
        }
        b = _.$m(b);
        var m = _.Sm(d, b, f, c.value());
        c.T.eurl = m;
        b = c.T.openAsWindow;
        "string" !== typeof b && (b = void 0);
        c = window.navigator.userAgent || "";
        /Trident|MSIE/i.test(c) && /#/.test(c) && (m = "javascript:window.location.replace(" + _.af.JSON.stringify(m).replace(/#/g, "\\x23") + ")");
        if (e) {
            var n = e;
            setTimeout(function() {
                n.location.replace(m)
            })
        } else
            n = _.Ze(a, m, h, b);
        return {
            id: f,
            p1: n
        }
    };
    _.so.prototype.uU = function(a, b) {
        if (b.T.openAsWindow) {
            a = Lo(this, a, b);
            var c = a.id;
            _.pm(!!a.p1, "Open popup window failed");
            b.T._popupWindow = a.p1
        }
        return c
    }
    ;
    Cn = _.gf();
    Dn = _.gf();
    _.En = new _.so;
    Nn("_g_rpcReady", _.no.prototype.wl);
    Nn("_g_discover", _.no.prototype.p9);
    Nn("_g_ping", _.no.prototype.hda);
    Nn("_g_close", _.no.prototype.O6);
    Nn("_g_closeMe", _.no.prototype.P6);
    Nn("_g_restyle", _.no.prototype.jea);
    Nn("_g_restyleMe", _.no.prototype.kea);
    Nn("_g_wasClosed", _.no.prototype.Rga);
    _.Mn("control", "_g_control", _.no.prototype.V6);
    _.Mn("control", "_g_disposeControl", _.no.prototype.k7);
    var Mo = _.En.getParentIframe();
    Mo && Mo.register("_g_restyleDone", _.no.prototype.iea, _.Hn);
    Nn("_g_connect", _.no.prototype.S6);
    var No = {};
    No._g_open = _.no.prototype.Qca;
    _.Ln("_open", No, _.Hn);
    var Oo = {
        Context: _.so,
        Iframe: _.no,
        SAME_ORIGIN_IFRAMES_FILTER: _.Gn,
        CROSS_ORIGIN_IFRAMES_FILTER: _.Hn,
        makeWhiteListIframesFilter: _.In,
        getContext: _.On,
        registerIframesApi: _.Ln,
        registerIframesApiHandler: _.Mn,
        registerStyle: _.xo,
        registerBeforeOpenStyle: _.Do,
        getStyle: _.yo,
        getBeforeOpenStyle: _.Eo,
        create: _.an
    };
    Yn({
        instance: function() {
            return Oo
        },
        priority: 2
    });
    _.Mn("gapi.load", "_g_gapi.load", function(a) {
        return new _.cl(function(b) {
            _.kf.load(a && "object" === typeof a && a.features || "", b)
        }
        )
    });
    _.Xo = _.gf();
    _.Yo = {};
    window.iframer = _.Yo;
    var bp = function(a) {
        var b = [new Zo($o[0].toLowerCase(),ap)];
        if (0 === b.length)
            throw Error("q");
        if (b.map(function(c) {
            if (c instanceof Zo)
                c = c.AY;
            else
                throw Error("q");
            return c
        }).every(function(c) {
            return 0 !== "data-gapiscan".indexOf(c)
        }))
            throw Error("r`data-gapiscan");
        a.setAttribute("data-gapiscan", "true")
    }, ap = {}, cp = function() {}, Zo = function(a) {
        this.AY = a
    }, dp, ep, fp, gp, hp, lp, mp;
    _.E(Zo, cp);
    Zo.prototype.toString = function() {
        return this.AY
    }
    ;
    dp = function(a) {
        if (_.ef.test(Object.keys))
            return Object.keys(a);
        var b = [], c;
        for (c in a)
            _.hf(a, c) && b.push(c);
        return b
    }
    ;
    ep = {
        button: !0,
        div: !0,
        span: !0
    };
    fp = function(a) {
        var b = _.ff(_.rf, "sws", []);
        return 0 <= _.qn.call(b, a)
    }
    ;
    gp = function(a) {
        return _.ff(_.rf, "watt", _.gf())[a]
    }
    ;
    hp = function(a) {
        return function(b, c) {
            return a ? _.Xm()[c] || a[c] || "" : _.Xm()[c] || ""
        }
    }
    ;
    _.ip = {
        callback: 1,
        clientid: 1,
        cookiepolicy: 1,
        openidrealm: -1,
        includegrantedscopes: -1,
        requestvisibleactions: 1,
        scope: 1
    };
    _.jp = !1;
    _.kp = function() {
        if (!_.jp) {
            for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                var c = a[b].name.toLowerCase();
                if (_.Hc(c, "google-signin-")) {
                    c = c.substring(14);
                    var d = a[b].content;
                    _.ip[c] && d && (_.Xo[c] = d)
                }
            }
            if (window.self !== window.top) {
                a = document.location.toString();
                for (var e in _.ip)
                    0 < _.ip[e] && (b = _.lf(a, e, "")) && (_.Xo[e] = b)
            }
            _.jp = !0
        }
        e = _.gf();
        _.jf(_.Xo, e);
        return e
    }
    ;
    lp = function(a) {
        var b;
        a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
        a = b ? b : a;
        return _.Dm(document, a)
    }
    ;
    mp = function(a) {
        a = a || "canonical";
        for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
            var e = b[c]
              , f = e.getAttribute("rel");
            if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = lp(e)) && null != e.match(/^https?:\/\/[\w\-_\.]+/i))
                return e
        }
        return window.location.href
    }
    ;
    _.np = function() {
        return window.location.origin || window.location.protocol + "//" + window.location.host
    }
    ;
    _.op = function(a, b, c, d) {
        return (a = "string" == typeof a ? a : void 0) ? lp(a) : mp(d)
    }
    ;
    _.pp = function(a, b, c) {
        null == a && c && (a = c.db,
        null == a && (a = c.gwidget && c.gwidget.db));
        return a || void 0
    }
    ;
    _.qp = function(a, b, c) {
        null == a && c && (a = c.ecp,
        null == a && (a = c.gwidget && c.gwidget.ecp));
        return a || void 0
    }
    ;
    _.rp = function(a, b, c) {
        return _.op(a, b, c, b.action ? void 0 : "publisher")
    }
    ;
    var sp, tp, up, vp, wp, xp, zp, yp;
    sp = {
        se: "0"
    };
    tp = {
        post: !0
    };
    up = {
        style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"
    };
    vp = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" ");
    wp = _.ff(_.rf, "WI", _.gf());
    xp = ["style", "data-gapiscan"];
    zp = function(a) {
        for (var b = _.gf(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = a.attributes.length, e = 0; e < d; e++) {
            var f = a.attributes[e]
              , h = f.name
              , k = f.value;
            0 <= _.qn.call(xp, h) || c && 0 != h.indexOf("data-") || "null" === k || "specified"in f && !f.specified || (c && (h = h.substr(5)),
            b[h.toLowerCase()] = k)
        }
        a = a.style;
        (c = yp(a && a.height)) && (b.height = String(c));
        (a = yp(a && a.width)) && (b.width = String(a));
        return b
    }
    ;
    _.Bp = function(a, b, c, d, e, f) {
        if (c.rd)
            var h = b;
        else
            h = document.createElement("div"),
            b.dataset.gapistub = !0,
            h.style.cssText = "position:absolute;width:450px;left:-10000px;",
            b.parentNode.insertBefore(h, b);
        f.siteElement = h;
        h.id || (h.id = _.Ap(a));
        b = _.gf();
        b[">type"] = a;
        _.jf(c, b);
        a = _.an(d, h, e);
        f.iframeNode = a;
        f.id = a.getAttribute("id")
    }
    ;
    _.Ap = function(a) {
        _.ff(wp, a, 0);
        return "___" + a + "_" + wp[a]++
    }
    ;
    yp = function(a) {
        var b = void 0;
        "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
        return b
    }
    ;
    var $o = _.Bk(["data-"]), Cp, Dp, Ep, Fp, Gp = /(?:^|\s)g-((\S)*)(?:$|\s)/, Hp = {
        plusone: !0,
        autocomplete: !0,
        profile: !0,
        signin: !0,
        signin2: !0
    };
    Cp = _.ff(_.rf, "SW", _.gf());
    Dp = _.ff(_.rf, "SA", _.gf());
    Ep = _.ff(_.rf, "SM", _.gf());
    Fp = _.ff(_.rf, "FW", []);
    var Ip = function(a, b) {
        return ("string" === typeof a ? document.getElementById(a) : a) || b
    }
      , Mp = function(a, b) {
        var c;
        Jp.ps0 = (new Date).getTime();
        Kp("ps0");
        a = Ip(a, _.cf);
        var d = _.cf.documentMode;
        if (a.querySelectorAll && (!d || 8 < d)) {
            d = b ? [b] : dp(Cp).concat(dp(Dp)).concat(dp(Ep));
            for (var e = [], f = 0; f < d.length; f++) {
                var h = d[f];
                e.push(".g-" + h, "g\\:" + h)
            }
            d = a.querySelectorAll(e.join(","))
        } else
            d = a.getElementsByTagName("*");
        a = _.gf();
        for (e = 0; e < d.length; e++) {
            f = d[e];
            var k = f;
            h = b;
            var l = k.nodeName.toLowerCase()
              , m = void 0;
            if (k.hasAttribute("data-gapiscan"))
                h = null;
            else {
                var n = l.indexOf("g:");
                0 == n ? m = l.substr(2) : (n = (n = String(k.className || k.getAttribute("class"))) && Gp.exec(n)) && (m = n[1]);
                h = !m || !(Cp[m] || Dp[m] || Ep[m]) || h && m !== h ? null : m
            }
            h && (Hp[h] || 0 == f.nodeName.toLowerCase().indexOf("g:") || 0 != dp(zp(f)).length) && (bp(f),
            _.ff(a, h, []).push(f))
        }
        for (p in a)
            Fp.push(p);
        Jp.ps1 = (new Date).getTime();
        Kp("ps1");
        if (b = Fp.join(":"))
            try {
                _.kf.load(b, void 0)
            } catch (q) {
                _.Mg.log(q);
                return
            }
        e = [];
        for (c in a) {
            d = a[c];
            var p = 0;
            for (b = d.length; p < b; p++)
                f = d[p],
                Lp(c, f, zp(f), e, b)
        }
    };
    var Np = function(a, b) {
        var c = gp(a);
        b && c ? (c(b),
        (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : _.kf.load(a, function() {
            var d = gp(a)
              , e = b && b.iframeNode
              , f = b && b.userParams;
            e && d ? (d(b),
            e.setAttribute("data-gapiattached", !0)) : (d = _.kf[a].go,
            "signin2" == a ? d(e, f) : d(e && e.parentNode, f))
        })
    }
      , Lp = function(a, b, c, d, e, f, h) {
        switch (Op(b, a, f)) {
        case 0:
            a = Ep[a] ? a + "_annotation" : a;
            d = {};
            d.iframeNode = b;
            d.userParams = c;
            Np(a, d);
            break;
        case 1:
            if (b.parentNode) {
                for (var k in c) {
                    if (f = _.hf(c, k))
                        f = c[k],
                        f = !!f && "object" === typeof f && (!f.toString || f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                    if (f)
                        try {
                            c[k] = _.Ig(c[k])
                        } catch (w) {
                            delete c[k]
                        }
                }
                k = !0;
                c.dontclear && (k = !1);
                delete c.dontclear;
                var l;
                f = {};
                var m = l = a;
                "plus" == a && c.action && (l = a + "_" + c.action,
                m = a + "/" + c.action);
                (l = _.zf("iframes/" + l + "/url")) || (l = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + m + "?usegapi=1");
                for (n in sp)
                    f[n] = n + "/" + (c[n] || sp[n]) + "/";
                var n = _.Dm(_.cf, l.replace(_.Wm, hp(f)));
                m = "iframes/" + a + "/params/";
                f = {};
                _.jf(c, f);
                (l = _.zf("lang") || _.zf("gwidget/lang")) && (f.hl = l);
                tp[a] || (f.origin = _.np());
                f.exp = _.zf(m + "exp");
                if (m = _.zf(m + "location"))
                    for (l = 0; l < m.length; l++) {
                        var p = m[l];
                        f[p] = _.af.location[p]
                    }
                switch (a) {
                case "plus":
                case "follow":
                    f.url = _.rp(f.href, c, null);
                    delete f.href;
                    break;
                case "plusone":
                    m = (m = c.href) ? lp(m) : mp();
                    f.url = m;
                    f.db = _.pp(c.db, void 0, _.zf());
                    f.ecp = _.qp(c.ecp, void 0, _.zf());
                    delete f.href;
                    break;
                case "signin":
                    f.url = mp()
                }
                _.rf.ILI && (f.iloader = "1");
                delete f["data-onload"];
                delete f.rd;
                for (var q in sp)
                    f[q] && delete f[q];
                f.gsrc = _.zf("iframes/:source:");
                q = _.zf("inline/css");
                "undefined" !== typeof q && 0 < e && q >= e && (f.ic = "1");
                q = /^#|^fr-/;
                e = {};
                for (var t in f)
                    _.hf(f, t) && q.test(t) && (e[t.replace(q, "")] = f[t],
                    delete f[t]);
                t = "q" == _.zf("iframes/" + a + "/params/si") ? f : e;
                q = _.kp();
                for (var v in q)
                    !_.hf(q, v) || _.hf(f, v) || _.hf(e, v) || (t[v] = q[v]);
                v = [].concat(vp);
                t = _.zf("iframes/" + a + "/methods");
                _.pn(t) && (v = v.concat(t));
                for (u in c)
                    _.hf(c, u) && /^on/.test(u) && ("plus" != a || "onconnect" != u) && (v.push(u),
                    delete f[u]);
                delete f.callback;
                e._methods = v.join(",");
                var u = _.Cm(n, f, e);
                v = h || {};
                v.allowPost = 1;
                v.attributes = up;
                v.dontclear = !k;
                h = {};
                h.userParams = c;
                h.url = u;
                h.type = a;
                _.Bp(a, b, c, u, v, h);
                b = h.id;
                c = _.gf();
                c.id = b;
                c.userParams = h.userParams;
                c.url = h.url;
                c.type = h.type;
                c.state = 1;
                _.Po[b] = c;
                b = h
            } else
                b = null;
            b && ((c = b.id) && d.push(c),
            Np(a, b))
        }
    }
      , Op = function(a, b, c) {
        if (a && 1 === a.nodeType && b) {
            if (c)
                return 1;
            if (Ep[b]) {
                if (ep[a.nodeName.toLowerCase()])
                    return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
            } else {
                if (Dp[b])
                    return 0;
                if (Cp[b])
                    return 1
            }
        }
        return null
    };
    _.ff(_.kf, "platform", {}).go = function(a, b) {
        Mp(a, b)
    }
    ;
    var Pp = _.ff(_.rf, "perf", _.gf()), Jp = _.ff(Pp, "g", _.gf()), Qp = _.ff(Pp, "i", _.gf()), Rp, Sp, Tp, Kp, Vp, Wp, Xp;
    _.ff(Pp, "r", []);
    Rp = _.gf();
    Sp = _.gf();
    Tp = function(a, b, c, d) {
        Rp[c] = Rp[c] || !!d;
        _.ff(Sp, c, []);
        Sp[c].push([a, b])
    }
    ;
    Kp = function(a, b, c) {
        var d = Pp.r;
        "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
    }
    ;
    Vp = function(a, b, c, d) {
        if ("_p" == b)
            throw Error("P");
        _.Up(a, b, c, d)
    }
    ;
    _.Up = function(a, b, c, d) {
        Wp(b, c)[a] = d || (new Date).getTime();
        Kp(a, b, c)
    }
    ;
    Wp = function(a, b) {
        a = _.ff(Qp, a, _.gf());
        return _.ff(a, b, _.gf())
    }
    ;
    Xp = function(a, b, c) {
        var d = null;
        b && c && (d = Wp(b, c)[a]);
        return d || Jp[a]
    }
    ;
    (function() {
        function a(h) {
            this.t = {};
            this.tick = function(k, l, m) {
                this.t[k] = [void 0 != m ? m : (new Date).getTime(), l];
                if (void 0 == m)
                    try {
                        window.console.timeStamp("CSI/" + k)
                    } catch (n) {}
            }
            ;
            this.getStartTickTime = function() {
                return this.t.start[0]
            }
            ;
            this.tick("start", null, h)
        }
        var b;
        if (window.performance)
            var c = (b = window.performance.timing) && b.responseStart;
        var d = 0 < c ? new a(c) : new a;
        window.__gapi_jstiming__ = {
            Timer: a,
            load: d
        };
        if (b) {
            var e = b.navigationStart;
            0 < e && c >= e && (window.__gapi_jstiming__.srt = c - e)
        }
        if (b) {
            var f = window.__gapi_jstiming__.load;
            0 < e && c >= e && (f.tick("_wtsrt", void 0, e),
            f.tick("wtsrt_", "_wtsrt", c),
            f.tick("tbsd_", "wtsrt_"))
        }
        try {
            b = null,
            window.chrome && window.chrome.csi && (b = Math.floor(window.chrome.csi().pageT),
            f && 0 < e && (f.tick("_tbnd", void 0, window.chrome.csi().startE),
            f.tick("tbnd_", "_tbnd", e))),
            null == b && window.gtbExternal && (b = window.gtbExternal.pageT()),
            null == b && window.external && (b = window.external.pageT,
            f && 0 < e && (f.tick("_tbnd", void 0, window.external.startE),
            f.tick("tbnd_", "_tbnd", e))),
            b && (window.__gapi_jstiming__.pt = b)
        } catch (h) {}
    }
    )();
    if (window.__gapi_jstiming__) {
        window.__gapi_jstiming__.PP = {};
        window.__gapi_jstiming__.Rda = 1;
        var Yp = function(a, b, c) {
            var d = a.t[b]
              , e = a.t.start;
            if (d && (e || c))
                return d = a.t[b][0],
                e = void 0 != c ? c : e[0],
                Math.round(d - e)
        }
          , Zp = function(a, b, c) {
            var d = "";
            window.__gapi_jstiming__.srt && (d += "&srt=" + window.__gapi_jstiming__.srt,
            delete window.__gapi_jstiming__.srt);
            window.__gapi_jstiming__.pt && (d += "&tbsrt=" + window.__gapi_jstiming__.pt,
            delete window.__gapi_jstiming__.pt);
            try {
                window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
            } catch (p) {}
            var e = window.chrome;
            if (e && (e = e.loadTimes) && "function" === typeof e && (e = e())) {
                e.wasFetchedViaSpdy && (d += "&p=s");
                if (e.wasNpnNegotiated) {
                    d += "&npn=1";
                    var f = e.npnNegotiatedProtocol;
                    f && (d += "&npnv=" + (encodeURIComponent || escape)(f))
                }
                e.wasAlternateProtocolAvailable && (d += "&apa=1")
            }
            var h = a.t
              , k = h.start;
            e = [];
            f = [];
            for (var l in h)
                if ("start" != l && 0 != l.indexOf("_")) {
                    var m = h[l][1];
                    m ? h[m] && f.push(l + "." + Yp(a, l, h[m][0])) : k && e.push(l + "." + Yp(a, l))
                }
            delete h.start;
            if (b)
                for (var n in b)
                    d += "&" + n + "=" + b[n];
            (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
            return [b, "?v=3", "&s=" + (window.__gapi_jstiming__.sn || "gwidget") + "&action=", a.name, f.length ? "&it=" + f.join(",") : "", d, "&rt=", e.join(",")].join("")
        }
          , $p = function(a, b, c) {
            a = Zp(a, b, c);
            if (!a)
                return "";
            b = new Image;
            var d = window.__gapi_jstiming__.Rda++;
            window.__gapi_jstiming__.PP[d] = b;
            b.onload = b.onerror = function() {
                window.__gapi_jstiming__ && delete window.__gapi_jstiming__.PP[d]
            }
            ;
            b.src = a;
            b = null;
            return a
        };
        window.__gapi_jstiming__.report = function(a, b, c) {
            var d = document.visibilityState
              , e = "visibilitychange";
            d || (d = document.webkitVisibilityState,
            e = "webkitvisibilitychange");
            if ("prerender" == d) {
                var f = !1
                  , h = function() {
                    if (!f) {
                        b ? b.prerender = "1" : b = {
                            prerender: "1"
                        };
                        if ("prerender" == (document.visibilityState || document.webkitVisibilityState))
                            var k = !1;
                        else
                            $p(a, b, c),
                            k = !0;
                        k && (f = !0,
                        document.removeEventListener(e, h, !1))
                    }
                };
                document.addEventListener(e, h, !1);
                return ""
            }
            return $p(a, b, c)
        }
    }
    ;var aq = {
        g: "gapi_global",
        m: "gapi_module",
        w: "gwidget"
    }
      , bq = function(a, b) {
        this.type = a ? "_p" == a ? "m" : "w" : "g";
        this.name = a;
        this.Ts = b
    };
    bq.prototype.key = function() {
        switch (this.type) {
        case "g":
            return this.type;
        case "m":
            return this.type + "." + this.Ts;
        case "w":
            return this.type + "." + this.name + this.Ts
        }
    }
    ;
    var cq = new bq
      , dq = navigator.userAgent.match(/iPhone|iPad|Android|PalmWebOS|Maemo|Bada/)
      , eq = _.ff(Pp, "_c", _.gf())
      , fq = Math.random() < (_.zf("csi/rate") || 0)
      , hq = function(a, b, c) {
        for (var d = new bq(b,c), e = _.ff(eq, d.key(), _.gf()), f = Sp[a] || [], h = 0; h < f.length; ++h) {
            var k = f[h]
              , l = k[0]
              , m = a
              , n = b
              , p = c;
            k = Xp(k[1], n, p);
            m = Xp(m, n, p);
            e[l] = k && m ? m - k : null
        }
        Rp[a] && fq && (gq(cq),
        gq(d))
    }
      , iq = function(a, b) {
        b = b || [];
        for (var c = [], d = 0; d < b.length; d++)
            c.push(a + b[d]);
        return c
    }
      , gq = function(a) {
        var b = _.af.__gapi_jstiming__;
        b.sn = aq[a.type];
        var c = new b.Timer(0);
        a: {
            switch (a.type) {
            case "g":
                var d = "global";
                break a;
            case "m":
                d = a.Ts;
                break a;
            case "w":
                d = a.name;
                break a
            }
            d = void 0
        }
        c.name = d;
        d = !1;
        var e = a.key()
          , f = eq[e];
        c.tick("_start", null, 0);
        for (var h in f)
            c.tick(h, "_start", f[h]),
            d = !0;
        eq[e] = _.gf();
        d && (h = [],
        h.push("l" + (_.zf("isPlusUser") ? "1" : "0")),
        d = "m" + (dq ? "1" : "0"),
        h.push(d),
        "m" == a.type ? h.push("p" + a.Ts) : "w" == a.type && (e = "n" + a.Ts,
        h.push(e),
        "0" == a.Ts && h.push(d + e)),
        h.push("u" + (_.zf("isLoggedIn") ? "1" : "0")),
        a = iq("", h),
        a = iq("abc_", a).join(","),
        b.report(c, {
            e: a
        }))
    };
    Tp("blt", "bs0", "bs1");
    Tp("psi", "ps0", "ps1");
    Tp("rpcqi", "rqe", "rqd");
    Tp("bsprt", "bsrt0", "bsrt1");
    Tp("bsrqt", "bsrt1", "bsrt2");
    Tp("bsrst", "bsrt2", "bsrt3");
    Tp("mli", "ml0", "ml1");
    Tp("mei", "me0", "me1", !0);
    Tp("wcdi", "wrs", "wcdi");
    Tp("wci", "wrs", "wdc");
    Tp("wdi", "wrs", "wrdi");
    Tp("wdt", "bs0", "wrdt");
    Tp("wri", "wrs", "wrri", !0);
    Tp("wrt", "bs0", "wrrt");
    Tp("wji", "wje0", "wje1", !0);
    Tp("wjli", "wjl0", "wjl1");
    Tp("whi", "wh0", "wh1", !0);
    Tp("wai", "waaf0", "waaf1", !0);
    Tp("wadi", "wrs", "waaf1", !0);
    Tp("wadt", "bs0", "waaf1", !0);
    Tp("wprt", "wrt0", "wrt1");
    Tp("wrqt", "wrt1", "wrt2");
    Tp("wrst", "wrt2", "wrt3", !0);
    Tp("fbprt", "fsrt0", "fsrt1");
    Tp("fbrqt", "fsrt1", "fsrt2");
    Tp("fbrst", "fsrt2", "fsrt3", !0);
    Tp("fdns", "fdns0", "fdns1");
    Tp("fcon", "fcon0", "fcon1");
    Tp("freq", "freq0", "freq1");
    Tp("frsp", "frsp0", "frsp1");
    Tp("fttfb", "fttfb0", "fttfb1");
    Tp("ftot", "ftot0", "ftot1", !0);
    var jq = Pp.r;
    if ("function" !== typeof jq) {
        for (var kq; kq = jq.shift(); )
            hq.apply(null, kq);
        Pp.r = hq
    }
    ;var lq = ["div"], mq = "onload", nq = !0, oq = !0, pq = function(a) {
        return a
    }, qq = null, rq = function(a) {
        var b = _.zf(a);
        return "undefined" !== typeof b ? b : _.zf("gwidget/" + a)
    }, vq, wq, xq, yq, zq, Aq, Bq, Hq, Cq, Iq, Jq, Kq, Lq, Mq, Dq, Fq, Nq, Eq, Oq, Pq, Qq, Rq, Sq, Tq;
    qq = _.zf();
    _.zf("gwidget");
    var sq = rq("parsetags");
    mq = "explicit" === sq || "onload" === sq ? sq : mq;
    var tq = rq("google_analytics");
    "undefined" !== typeof tq && (nq = !!tq);
    var uq = rq("data_layer");
    "undefined" !== typeof uq && (oq = !!uq);
    vq = function() {
        var a = this && this.getId();
        a && (_.rf.drw = a)
    }
    ;
    wq = function() {
        _.rf.drw = null
    }
    ;
    xq = function(a) {
        return function(b) {
            var c = a;
            "number" === typeof b ? c = b : "string" === typeof b && (c = b.indexOf("px"),
            -1 != c && (b = b.substring(0, c)),
            c = parseInt(b, 10));
            return c
        }
    }
    ;
    yq = function(a) {
        "string" === typeof a && (a = window[a]);
        return "function" === typeof a ? a : null
    }
    ;
    zq = function() {
        return rq("lang") || "en-US"
    }
    ;
    Aq = function(a) {
        if (!_.Qa.Cb("attach")) {
            var b = {}, c = _.Qa.Cb("inline"), d;
            for (d in c)
                c.hasOwnProperty(d) && (b[d] = c[d]);
            b.open = function(e) {
                var f = e.Ic().renderData.id;
                f = document.getElementById(f);
                if (!f)
                    throw Error("Q");
                return c.attach(e, f)
            }
            ;
            _.Qa.Qc("attach", b)
        }
        a.style = "attach"
    }
    ;
    Bq = function() {
        var a = {};
        a.width = [xq(450)];
        a.height = [xq(24)];
        a.onready = [yq];
        a.lang = [zq, "hl"];
        a.iloader = [function() {
            return _.rf.ILI
        }
        , "iloader"];
        return a
    }();
    Hq = function(a) {
        var b = {};
        b.We = a[0];
        b.mq = -1;
        b.hsa = "___" + b.We + "_";
        b.Sga = "g:" + b.We;
        b.hqa = "g-" + b.We;
        b.UY = [];
        b.config = {};
        b.Ey = [];
        b.a1 = {};
        b.PD = {};
        var c = function(e) {
            for (var f in e)
                if (_.hf(e, f)) {
                    b.config[f] = [yq];
                    b.Ey.push(f);
                    var h = e[f]
                      , k = null
                      , l = null
                      , m = null;
                    "function" === typeof h ? k = h : h && "object" === typeof h && (k = h.Vpa,
                    l = h.QD,
                    m = h.KN);
                    m && (b.Ey.push(m),
                    b.config[m] = [yq],
                    b.a1[f] = m);
                    k && (b.config[f] = [k]);
                    l && (b.PD[f] = l)
                }
        }
          , d = function(e) {
            for (var f = {}, h = 0; h < e.length; ++h)
                f[e[h].toLowerCase()] = 1;
            f[b.Sga] = 1;
            b.Nba = f
        };
        a[1] && (b.parameters = a[1]);
        (function(e) {
            b.config = e;
            for (var f in Bq)
                Bq.hasOwnProperty(f) && !b.config.hasOwnProperty(f) && (b.config[f] = Bq[f])
        }
        )(a[2] || {});
        a[3] && c(a[3]);
        a[4] && d(a[4]);
        a[5] && (b.mn = a[5]);
        b.Zra = !0 === a[6];
        b.pda = a[7];
        b.Fga = a[8];
        b.Nba || d(lq);
        b.HJ = function(e) {
            b.mq++;
            Vp("wrs", b.We, String(b.mq));
            var f = []
              , h = e.element
              , k = e.config
              , l = ":" + b.We;
            ":plus" == l && e.Nd && e.Nd.action && (l += "_" + e.Nd.action);
            var m = Cq(b, k)
              , n = {};
            _.jf(_.kp(), n);
            for (var p in e.Nd)
                null != e.Nd[p] && (n[p] = e.Nd[p]);
            p = {
                container: h.id,
                renderData: e.Lda,
                style: "inline",
                height: k.height,
                width: k.width
            };
            Aq(p);
            b.mn && (f[2] = p,
            f[3] = n,
            f[4] = m,
            b.mn("i", f));
            l = _.Qa.open(l, p, n, m);
            e = e.b7;
            Dq(l, k);
            Eq(l, h);
            Fq(b, l, e);
            Gq(b.We, b.mq.toString(), l);
            f[5] = l;
            b.mn && b.mn("e", f)
        }
        ;
        return b
    }
    ;
    Cq = function(a, b) {
        for (var c = {}, d = a.Ey.length - 1; 0 <= d; --d) {
            var e = a.Ey[d]
              , f = b[a.a1[e] || e] || b[e]
              , h = b[e];
            h && f !== h && (f = function(l, m) {
                return function(n) {
                    m.apply(this, arguments);
                    l.apply(this, arguments)
                }
            }(f, h));
            f && (c[e] = f)
        }
        for (var k in a.PD)
            a.PD.hasOwnProperty(k) && (c[k] = Iq(c[k] || function() {}
            , a.PD[k]));
        c.drefresh = vq;
        c.erefresh = wq;
        return c
    }
    ;
    Iq = function(a, b) {
        return function(c) {
            var d = b(c);
            if (d) {
                var e = c.href || null;
                if (nq) {
                    if (window._gat)
                        try {
                            var f = window._gat._getTrackerByName("~0");
                            f && "UA-XXXXX-X" != f._getAccount() ? f._trackSocial("Google", d, e) : window._gaq && window._gaq.push(["_trackSocial", "Google", d, e])
                        } catch (k) {}
                    if (window.ga && window.ga.getAll)
                        try {
                            var h = window.ga.getAll();
                            for (f = 0; f < h.length; f++)
                                h[f].send("social", "Google", d, e)
                        } catch (k) {}
                }
                if (oq && window.dataLayer)
                    try {
                        window.dataLayer.push({
                            event: "social",
                            socialNetwork: "Google",
                            socialAction: d,
                            socialTarget: e
                        })
                    } catch (k) {}
            }
            a.call(this, c)
        }
    }
    ;
    Jq = function(a) {
        return _.no && a instanceof _.no
    }
    ;
    Kq = function(a) {
        return Jq(a) ? "_renderstart" : "renderstart"
    }
    ;
    Lq = function(a) {
        return Jq(a) ? "_ready" : "ready"
    }
    ;
    Mq = function() {
        return !0
    }
    ;
    Dq = function(a, b) {
        if (b.onready) {
            var c = !1
              , d = function() {
                c || (c = !0,
                b.onready.call(null))
            };
            a.register(Lq(a), d, Mq);
            a.register(Kq(a), d, Mq)
        }
    }
    ;
    Fq = function(a, b, c) {
        var d = a.We
          , e = String(a.mq)
          , f = !1
          , h = function() {
            f || (f = !0,
            b.getIframeEl(),
            c && Vp("wrdt", d, e),
            Vp("wrdi", d, e))
        };
        b.register(Kq(b), h, Mq);
        var k = !1;
        a = function() {
            k || (k = !0,
            h(),
            c && Vp("wrrt", d, e),
            Vp("wrri", d, e))
        }
        ;
        b.register(Lq(b), a, Mq);
        Jq(b) ? b.register("widget-interactive-" + b.id, a, Mq) : _.Rg.register("widget-interactive-" + b.id, a);
        _.Rg.register("widget-csi-tick-" + b.id, function(l, m, n) {
            "wdc" === l ? Vp("wdc", d, e, n) : "wje0" === l ? Vp("wje0", d, e, n) : "wje1" === l ? Vp("wje1", d, e, n) : "wh0" == l ? _.Up("wh0", d, e, n) : "wh1" == l ? _.Up("wh1", d, e, n) : "wcdi" == l && _.Up("wcdi", d, e, n)
        })
    }
    ;
    Nq = function(a) {
        return "number" == typeof a ? a + "px" : "100%" == a ? a : null
    }
    ;
    Eq = function(a, b) {
        var c = function(d) {
            d = d || a;
            var e = Nq(d.width);
            e && b.style.width != e && (b.style.width = e);
            (d = Nq(d.height)) && b.style.height != d && (b.style.height = d)
        };
        Jq(a) ? a.setParam("onRestyle", c) : (a.register("ready", c, Mq),
        a.register("renderstart", c, Mq),
        a.register("resize", c, Mq))
    }
    ;
    Oq = function(a, b) {
        for (var c in Bq)
            if (Bq.hasOwnProperty(c)) {
                var d = Bq[c][1];
                d && !b.hasOwnProperty(d) && (b[d] = a[d])
            }
        return b
    }
    ;
    Pq = function(a, b) {
        var c = {}, d;
        for (d in a)
            a.hasOwnProperty(d) && (c[a[d][1] || d] = (a[d] && a[d][0] || pq)(b[d.toLowerCase()], b, qq));
        return c
    }
    ;
    Qq = function(a) {
        if (a = a.pda)
            for (var b = 0; b < a.length; b++)
                (new Image).src = a[b]
    }
    ;
    Rq = function(a, b) {
        var c = b.userParams
          , d = b.siteElement;
        d || (d = (d = b.iframeNode) && d.parentNode);
        if (d && 1 === d.nodeType) {
            var e = Pq(a.config, c);
            a.UY.push({
                element: d,
                config: e,
                Nd: Oq(e, Pq(a.parameters, c)),
                cra: 3,
                b7: !!c["data-onload"],
                Lda: b
            })
        }
        b = a.UY;
        for (a = a.HJ; 0 < b.length; )
            a(b.shift())
    }
    ;
    Sq = function(a, b) {
        a.mq++;
        Vp("wrs", a.We, String(a.mq));
        var c = b.userParams
          , d = Pq(a.config, c)
          , e = []
          , f = b.iframeNode
          , h = b.siteElement
          , k = Cq(a, d)
          , l = Pq(a.parameters, c);
        _.jf(_.kp(), l);
        l = Oq(d, l);
        c = !!c["data-onload"];
        var m = _.En
          , n = _.gf();
        n.renderData = b;
        n.height = d.height;
        n.width = d.width;
        n.id = b.id;
        n.url = b.url;
        n.iframeEl = f;
        n.where = n.container = h;
        n.apis = ["_open"];
        n.messageHandlers = k;
        n.messageHandlersFilter = _.Hn;
        _.Wo(n);
        f = l;
        a.mn && (e[2] = n,
        e[3] = f,
        e[4] = k,
        a.mn("i", e));
        k = m.attach(n);
        k.id = b.id;
        k.cM(k, n);
        Dq(k, d);
        Eq(k, h);
        Fq(a, k, c);
        Gq(a.We, a.mq.toString(), k);
        e[5] = k;
        a.mn && a.mn("e", e)
    }
    ;
    Tq = function(a, b) {
        var c = b.url;
        a.Fga || _.Hj(c) ? Sq(a, b) : _.Qa.open ? Rq(a, b) : (0,
        _.vh)("iframes", function() {
            Rq(a, b)
        })
    }
    ;
    _.Uq = function(a) {
        var b = Hq(a);
        Qq(b);
        _.Pg(b.We, function(d) {
            Tq(b, d)
        });
        Cp[b.We] = !0;
        var c = {
            Aa: function(d, e, f) {
                var h = e || {};
                h.type = b.We;
                e = h.type;
                delete h.type;
                var k = Ip(d);
                if (k) {
                    d = {};
                    for (var l in h)
                        _.hf(h, l) && (d[l.toLowerCase()] = h[l]);
                    d.rd = 1;
                    (l = !!d.ri) && delete d.ri;
                    Lp(e, k, d, [], 0, l, f)
                } else
                    _.Mg.log("string" === "gapi." + e + ".render: missing element " + typeof d ? d : "")
            },
            go: function(d) {
                Mp(d, b.We)
            },
            gra: function() {
                var d = _.ff(_.rf, "WI", _.gf()), e;
                for (e in d)
                    delete d[e]
            }
        };
        a = function() {
            "onload" === mq && c.go()
        }
        ;
        if (!fp(b.We)) {
            if (!_.Ng())
                try {
                    a()
                } catch (d) {}
            _.Og(a)
        }
        _.C("gapi." + b.We + ".go", c.go);
        _.C("gapi." + b.We + ".render", c.Aa);
        return c
    }
    ;
    var Vq = function() {
        var a = window;
        return !!a.performance && !!a.performance.getEntries
    }
      , Gq = function(a, b, c) {
        if (Vq()) {
            var d = function() {
                var f = !1;
                return function() {
                    if (f)
                        return !0;
                    f = !0;
                    return !1
                }
            }()
              , e = function() {
                d() || window.setTimeout(function() {
                    var f = c.getIframeEl().src;
                    var h = f.indexOf("#");
                    -1 != h && (f = f.substring(0, h));
                    f = window.performance.getEntriesByName(f);
                    1 > f.length ? f = null : (f = f[0],
                    f = 0 == f.responseStart ? null : f);
                    if (f) {
                        h = Math.round(f.requestStart);
                        var k = Math.round(f.responseStart)
                          , l = Math.round(f.responseEnd);
                        Vp("wrt0", a, b, Math.round(f.startTime));
                        Vp("wrt1", a, b, h);
                        Vp("wrt2", a, b, k);
                        Vp("wrt3", a, b, l)
                    }
                }, 1E3)
            };
            c.register(Kq(c), e, Mq);
            c.register(Lq(c), e, Mq)
        }
    };
    _.C("gapi.widget.make", _.Uq);
    _.Xf = _.Xf || {};
    _.Xf.Gv = function(a, b, c) {
        for (var d = [], e = 2, f = arguments.length; e < f; ++e)
            d.push(arguments[e]);
        return function() {
            for (var h = d.slice(), k = 0, l = arguments.length; k < l; ++k)
                h.push(arguments[k]);
            return b.apply(a, h)
        }
    }
    ;
    _.Xf.AB = function(a) {
        var b, c, d = {};
        for (b = 0; c = a[b]; ++b)
            d[c] = c;
        return d
    }
    ;
    _.Xf = _.Xf || {};
    _.Xf.Z5 = function(a) {
        var b = window;
        "undefined" != typeof b.addEventListener ? b.addEventListener("mousemove", a, !1) : "undefined" != typeof b.attachEvent ? b.attachEvent("onmousemove", a) : _.Yf("cannot attachBrowserEvent: mousemove")
    }
    ;
    _.Xf.Ida = function(a) {
        var b = window;
        b.removeEventListener ? b.removeEventListener("mousemove", a, !1) : b.detachEvent ? b.detachEvent("onmousemove", a) : _.Yf("cannot removeBrowserEvent: mousemove")
    }
    ;
    _.Xf = _.Xf || {};
    (function() {
        function a(c, d) {
            return String.fromCharCode(d)
        }
        var b = {
            0: !1,
            10: !0,
            13: !0,
            34: !0,
            39: !0,
            60: !0,
            62: !0,
            92: !0,
            8232: !0,
            8233: !0,
            65282: !0,
            65287: !0,
            65308: !0,
            65310: !0,
            65340: !0
        };
        _.Xf.escape = function(c, d) {
            if (c) {
                if ("string" === typeof c)
                    return _.Xf.jG(c);
                if ("Array" === typeof c) {
                    var e = 0;
                    for (d = c.length; e < d; ++e)
                        c[e] = _.Xf.escape(c[e])
                } else if ("object" === typeof c && d) {
                    d = {};
                    for (e in c)
                        c.hasOwnProperty(e) && (d[_.Xf.jG(e)] = _.Xf.escape(c[e], !0));
                    return d
                }
            }
            return c
        }
        ;
        _.Xf.jG = function(c) {
            if (!c)
                return c;
            for (var d = [], e, f, h = 0, k = c.length; h < k; ++h)
                e = c.charCodeAt(h),
                f = b[e],
                !0 === f ? d.push("&#", e, ";") : !1 !== f && d.push(c.charAt(h));
            return d.join("")
        }
        ;
        _.Xf.asa = function(c) {
            return c ? c.replace(/&#([0-9]+);/g, a) : c
        }
    }
    )();
    _.Fh = function() {
        function a(m) {
            var n = new _.Eh;
            n.xx(m);
            return n.cj()
        }
        var b = window.crypto;
        if (b && "function" == typeof b.getRandomValues)
            return function() {
                var m = new window.Uint32Array(1);
                b.getRandomValues(m);
                return Number("0." + m[0])
            }
            ;
        var c = _.zf("random/maxObserveMousemove");
        null == c && (c = -1);
        var d = 0
          , e = Math.random()
          , f = 1
          , h = 1E6 * (screen.width * screen.width + screen.height)
          , k = function(m) {
            m = m || window.event;
            var n = m.screenX + m.clientX << 16;
            n += m.screenY + m.clientY;
            n *= (new Date).getTime() % 1E6;
            f = f * n % h;
            0 < c && ++d == c && _.Xf.Ida(k)
        };
        0 != c && _.Xf.Z5(k);
        var l = a(document.cookie + "|" + document.location + "|" + (new Date).getTime() + "|" + e);
        return function() {
            var m = f;
            m += parseInt(l.substr(0, 20), 16);
            l = a(l);
            return m / (h + Math.pow(16, 20))
        }
    }();
    _.C("shindig.random", _.Fh);
    _.Qa.Pa = {};
    _.Qa.Pa.Vi = {};
    _.Qa.Pa.Vi.q6 = function(a) {
        try {
            return !!a.document
        } catch (b) {}
        return !1
    }
    ;
    _.Qa.Pa.Vi.MT = function(a) {
        var b = a.parent;
        return a != b && _.Qa.Pa.Vi.q6(b) ? _.Qa.Pa.Vi.MT(b) : a
    }
    ;
    _.Qa.Pa.Vi.Wpa = function(a) {
        var b = a.userAgent || "";
        a = a.product || "";
        return 0 != b.indexOf("Opera") && -1 == b.indexOf("WebKit") && "Gecko" == a && 0 < b.indexOf("rv:1.")
    }
    ;
    _.Qa.Pa.Vi.Gv = function(a, b, c) {
        for (var d = [], e = 2, f = arguments.length; e < f; ++e)
            d.push(arguments[e]);
        return function() {
            for (var h = d.slice(), k = 0, l = arguments.length; k < l; ++k)
                h.push(arguments[k]);
            return b.apply(a, h)
        }
    }
    ;
    var br, cr, dr, er, hr, ir, jr, kr, lr, mr, nr;
    br = function() {
        _.Rg.register("_noop_echo", function() {
            this.callback(_.Qa.k9(_.Qa.Km[this.f]))
        })
    }
    ;
    cr = function() {
        window.setTimeout(function() {
            _.Rg.call("..", "_noop_echo", _.Qa.Zca)
        }, 0)
    }
    ;
    dr = function(a, b, c) {
        var d = function(e) {
            var f = Array.prototype.slice.call(arguments, 0)
              , h = f[f.length - 1];
            if ("function" === typeof h) {
                var k = h;
                f.pop()
            }
            f.unshift(b, a, k, c);
            _.Rg.call.apply(_.Rg, f)
        };
        d._iframe_wrapped_rpc_ = !0;
        return d
    }
    ;
    er = function(a) {
        _.Qa.Lj[a] || (_.Qa.Lj[a] = {},
        _.Rg.register(a, function(b, c) {
            var d = this.f;
            if (!("string" != typeof b || b in {} || d in {})) {
                var e = this.callback, f = _.Qa.Lj[a][d], h;
                f && Object.hasOwnProperty.call(f, b) ? h = f[b] : Object.hasOwnProperty.call(_.Qa.mr, a) && (h = _.Qa.mr[a]);
                if (h)
                    return d = Array.prototype.slice.call(arguments, 1),
                    h._iframe_wrapped_rpc_ && e && d.push(e),
                    h.apply({}, d)
            }
            _.Mg.error(['Unregistered call in window "', window.name, '" for method "', a, '", via proxyId "', b, '" from frame "', d, '".'].join(""));
            return null
        }));
        return _.Qa.Lj[a]
    }
    ;
    _.fr = function() {
        var a = {};
        var b = window.location.href;
        var c = b.indexOf("?")
          , d = b.indexOf("#");
        b = (-1 === d ? b.substr(c + 1) : [b.substr(c + 1, d - c - 1), "&", b.substr(d + 1)].join("")).split("&");
        c = window.decodeURIComponent ? decodeURIComponent : unescape;
        d = 0;
        for (var e = b.length; d < e; ++d) {
            var f = b[d].indexOf("=");
            if (-1 !== f) {
                var h = b[d].substring(0, f);
                f = b[d].substring(f + 1);
                f = f.replace(/\+/g, " ");
                try {
                    a[h] = c(f)
                } catch (k) {}
            }
        }
        return a
    }
    ;
    _.gr = function() {
        return _.af.location.origin || _.af.location.protocol + "//" + _.af.location.host
    }
    ;
    hr = function(a) {
        _.rf.h = a
    }
    ;
    ir = function(a) {
        _.rf.bsh = a
    }
    ;
    jr = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b[a] = b[a] || [];
        return b[a]
    }
    ;
    kr = function(a) {
        return "object" === typeof a && /\[native code\]/.test(a.push)
    }
    ;
    lr = function(a, b, c) {
        if (b && "object" === typeof b)
            for (var d in b)
                !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !kr(a[d]) && !kr(b[d]) ? lr(a[d], b[d]) : b[d] && "object" === typeof b[d] ? (a[d] = kr(b[d]) ? [] : {},
                lr(a[d], b[d])) : a[d] = b[d])
    }
    ;
    mr = function(a) {
        if (a && !/^\s+$/.test(a)) {
            for (; 0 == a.charCodeAt(a.length - 1); )
                a = a.substring(0, a.length - 1);
            try {
                var b = window.JSON.parse(a)
            } catch (c) {}
            if ("object" === typeof b)
                return b;
            try {
                b = (new Function("return (" + a + "\n)"))()
            } catch (c) {}
            if ("object" === typeof b)
                return b;
            try {
                b = (new Function("return ({" + a + "\n})"))()
            } catch (c) {}
            return "object" === typeof b ? b : {}
        }
    }
    ;
    nr = function(a, b) {
        var c = {
            ___goc: void 0
        };
        a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length - 1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
        lr(c, b);
        a.push(c)
    }
    ;
    _.or = function(a, b) {
        var c;
        if ("string" === typeof a) {
            var d = c = {};
            a = a.split("/");
            for (var e = 0, f = a.length; e < f - 1; ++e) {
                var h = {};
                d = d[a[e]] = h
            }
            d[a[e]] = b
        } else
            c = a;
        _.Vi(!0);
        d = window.___gcfg;
        b = jr("cu");
        a = window.___gu;
        d && d !== a && (nr(b, d),
        window.___gu = d);
        d = jr("cu");
        e = document.scripts || document.getElementsByTagName("script") || [];
        a = [];
        f = [];
        f.push.apply(f, jr("us"));
        for (h = 0; h < e.length; ++h)
            for (var k = e[h], l = 0; l < f.length; ++l)
                k.src && 0 == k.src.indexOf(f[l]) && a.push(k);
        0 == a.length && 0 < e.length && e[e.length - 1].src && a.push(e[e.length - 1]);
        for (e = 0; e < a.length; ++e)
            a[e].getAttribute("gapi_processed") || (a[e].setAttribute("gapi_processed", !0),
            (f = a[e]) ? (h = f.nodeType,
            f = 3 == h || 4 == h ? f.nodeValue : f.textContent || "") : f = void 0,
            (f = mr(f)) && d.push(f));
        c && nr(b, c);
        a = jr("cd");
        c = 0;
        for (d = a.length; c < d; ++c)
            lr(_.Vi(), a[c], !0);
        a = jr("ci");
        c = 0;
        for (d = a.length; c < d; ++c)
            lr(_.Vi(), a[c], !0);
        c = 0;
        for (d = b.length; c < d; ++c)
            lr(_.Vi(), b[c], !0)
    }
    ;
    var pr, qr = window.location.href, rr = qr.indexOf("?"), sr = qr.indexOf("#");
    pr = (-1 === sr ? qr.substr(rr + 1) : [qr.substr(rr + 1, sr - rr - 1), "&", qr.substr(sr + 1)].join("")).split("&");
    for (var tr = window.decodeURIComponent ? decodeURIComponent : unescape, ur = 0, vr = pr.length; ur < vr; ++ur) {
        var wr = pr[ur].indexOf("=");
        if (-1 !== wr) {
            var xr = pr[ur].substring(wr + 1);
            xr = xr.replace(/\+/g, " ");
            try {
                tr(xr)
            } catch (a) {}
        }
    }
    ;if (window.ToolbarApi)
        yr = window.ToolbarApi,
        yr.La = window.ToolbarApi.getInstance,
        yr.prototype = window.ToolbarApi.prototype,
        _.g = yr.prototype,
        _.g.openWindow = yr.prototype.openWindow,
        _.g.uQ = yr.prototype.closeWindow,
        _.g.b_ = yr.prototype.setOnCloseHandler,
        _.g.fQ = yr.prototype.canClosePopup,
        _.g.bZ = yr.prototype.resizeWindow;
    else {
        var yr = function() {};
        yr.La = function() {
            !zr && window.external && window.external.GTB_IsToolbar && (zr = new yr);
            return zr
        }
        ;
        _.g = yr.prototype;
        _.g.openWindow = function(a) {
            return window.external.GTB_OpenPopup && window.external.GTB_OpenPopup(a)
        }
        ;
        _.g.uQ = function(a) {
            window.external.GTB_ClosePopupWindow && window.external.GTB_ClosePopupWindow(a)
        }
        ;
        _.g.b_ = function(a, b) {
            window.external.GTB_SetOnCloseHandler && window.external.GTB_SetOnCloseHandler(a, b)
        }
        ;
        _.g.fQ = function(a) {
            return window.external.GTB_CanClosePopup && window.external.GTB_CanClosePopup(a)
        }
        ;
        _.g.bZ = function(a, b) {
            return window.external.GTB_ResizeWindow && window.external.GTB_ResizeWindow(a, b)
        }
        ;
        var zr = null;
        window.ToolbarApi = yr;
        window.ToolbarApi.getInstance = yr.La
    }
    ;var Ar = /^[-_.0-9A-Za-z]+$/, Br = {
        open: "open",
        onready: "ready",
        close: "close",
        onresize: "resize",
        onOpen: "open",
        onReady: "ready",
        onClose: "close",
        onResize: "resize",
        onRenderStart: "renderstart"
    }, Cr = {
        onBeforeParentOpen: "beforeparentopen"
    }, Dr = {
        onOpen: function(a) {
            var b = a.Ic();
            a.wh(b.container || b.element);
            return a
        },
        onClose: function(a) {
            a.remove()
        }
    }, Er = function() {
        _.Qa.XU++;
        return ["I", _.Qa.XU, "_", (new Date).getTime()].join("")
    }, Fr, Gr, Hr, Kr, Lr, Mr, Nr, Pr, Or;
    _.Qa.zo = function(a) {
        var b = _.gf();
        _.jf(_.Nm, b);
        _.jf(a, b);
        return b
    }
    ;
    Fr = function(a) {
        return a instanceof Array ? a.join(",") : a instanceof Object ? _.Ig(a) : a
    }
    ;
    Gr = function(a) {
        var b = _.Wi("googleapis.config/elog");
        if (b)
            try {
                b(a)
            } catch (c) {}
    }
    ;
    Hr = function(a) {
        a && a.match(Ar) && _.or("googleapis.config/gcv", a)
    }
    ;
    _.Ir = function(a, b) {
        b = b || {};
        for (var c in a)
            a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }
    ;
    _.Jr = function(a, b, c, d, e) {
        var f = [], h;
        for (h in a)
            if (a.hasOwnProperty(h)) {
                var k = b
                  , l = c
                  , m = a[h]
                  , n = d
                  , p = er(h);
                p[k] = p[k] || {};
                n = _.Qa.Pa.Vi.Gv(n, m);
                m._iframe_wrapped_rpc_ && (n._iframe_wrapped_rpc_ = !0);
                p[k][l] = n;
                f.push(h)
            }
        if (e)
            for (var q in _.Qa.mr)
                _.Qa.mr.hasOwnProperty(q) && f.push(q);
        return f.join(",")
    }
    ;
    Kr = function(a, b, c) {
        var d = {};
        if (a && a._methods) {
            a = a._methods.split(",");
            for (var e = 0; e < a.length; e++) {
                var f = a[e];
                d[f] = dr(f, b, c)
            }
        }
        return d
    }
    ;
    Lr = function(a) {
        if (a && a.disableMultiLevelParentRelay)
            a = !1;
        else {
            var b;
            if (b = _.Yo && _.Yo._open && "inline" != a.style && !0 !== a.inline)
                a = a.container,
                b = !(a && ("string" == typeof a && document.getElementById(a) || document == (a.ownerDocument || a.document)));
            a = b
        }
        return a
    }
    ;
    Mr = function(a, b) {
        var c = {};
        b = b.params || {};
        for (var d in a)
            "#" == d.charAt(0) && (c[d.substring(1)] = a[d]),
            0 == d.indexOf("fr-") && (c[d.substring(3)] = a[d]),
            "#" == b[d] && (c[d] = a[d]);
        for (var e in c)
            delete a["fr-" + e],
            delete a["#" + e],
            delete a[e];
        return c
    }
    ;
    Nr = function(a) {
        if (":" == a.charAt(0)) {
            var b = _.Wi("iframes/" + a.substring(1));
            a = {};
            _.jf(b, a);
            (b = a.url) && (a.url = _.Zm(b));
            a.params || (a.params = {});
            return a
        }
        return {
            url: _.Zm(a)
        }
    }
    ;
    Pr = function(a) {
        function b() {}
        b.prototype = Or.prototype;
        a.prototype = new b
    }
    ;
    Or = function(a, b, c, d, e, f, h, k) {
        this.config = Nr(a);
        this.openParams = this.WB = b || {};
        this.params = c || {};
        this.methods = d;
        this.HD = !1;
        Qr(this, b.style);
        this.callbacks = {};
        Rr(this, function() {
            var l;
            (l = this.WB.style) && _.Qa.Sw[l] ? l = _.Qa.Sw[l] : l ? (_.Mg.warn(['Missing handler for style "', l, '". Continuing with default handler.'].join("")),
            l = null) : l = Dr;
            if (l) {
                if ("function" === typeof l)
                    var m = l(this);
                else {
                    var n = {};
                    for (m in l) {
                        var p = l[m];
                        n[m] = "function" === typeof p ? _.Qa.Pa.Vi.Gv(l, p, this) : p
                    }
                    m = n
                }
                for (var q in e)
                    l = m[q],
                    "function" === typeof l && Sr(this, e[q], _.Qa.Pa.Vi.Gv(m, l))
            }
            f && Sr(this, "close", f)
        });
        this.Xk = this.ac = h;
        this.NJ = (k || []).slice();
        h && this.NJ.unshift(h.getId())
    }
    ;
    Or.prototype.Ic = function() {
        return this.WB
    }
    ;
    Or.prototype.gH = function() {
        return this.params
    }
    ;
    Or.prototype.aA = function() {
        return this.methods
    }
    ;
    Or.prototype.yd = function() {
        return this.Xk
    }
    ;
    var Qr = function(a, b) {
        a.HD || ((b = b && !_.Qa.Sw[b] && _.Qa.TF[b]) ? (a.SF = [],
        b(function() {
            a.HD = !0;
            for (var c = a.SF.length, d = 0; d < c; ++d)
                a.SF[d].call(a)
        })) : a.HD = !0)
    }
      , Rr = function(a, b) {
        a.HD ? b.call(a) : a.SF.push(b)
    };
    Or.prototype.lb = function(a, b) {
        Rr(this, function() {
            Sr(this, a, b)
        })
    }
    ;
    var Sr = function(a, b, c) {
        a.callbacks[b] = a.callbacks[b] || [];
        a.callbacks[b].push(c)
    };
    Or.prototype.Ep = function(a, b) {
        Rr(this, function() {
            var c = this.callbacks[a];
            if (c)
                for (var d = c.length, e = 0; e < d; ++e)
                    if (c[e] === b) {
                        c.splice(e, 1);
                        break
                    }
        })
    }
    ;
    Or.prototype.wi = function(a, b) {
        var c = this.callbacks[a];
        if (c)
            for (var d = Array.prototype.slice.call(arguments, 1), e = c.length, f = 0; f < e; ++f)
                try {
                    var h = c[f].apply({}, d)
                } catch (k) {
                    _.Mg.error(['Exception when calling callback "', a, '" with exception "', k.name, ": ", k.message, '".'].join("")),
                    Gr(k)
                }
        return h
    }
    ;
    var Tr = function(a) {
        return "number" == typeof a ? {
            value: a,
            CG: a + "px"
        } : "100%" == a ? {
            value: 100,
            CG: "100%",
            JV: !0
        } : null
    };
    Or.prototype.send = function(a, b, c) {
        _.Qa.wZ(this, a, b, c)
    }
    ;
    Or.prototype.register = function(a, b) {
        var c = this;
        c.lb(a, function(d) {
            b.call(c, d)
        })
    }
    ;
    var Ur = function(a, b, c, d, e, f, h) {
        var k = this;
        Or.call(this, a, b, c, d, Br, e, f, h);
        this.id = b.id || Er();
        this.lw = b.rpctoken && String(b.rpctoken) || Math.round(1E9 * _.wj());
        this.gaa = Mr(this.params, this.config);
        this.qG = {};
        Rr(this, function() {
            k.wi("open");
            _.Ir(k.qG, k)
        })
    };
    Pr(Ur);
    _.g = Ur.prototype;
    _.g.wh = function(a, b) {
        if (!this.config.url)
            return _.Mg.error("Cannot open iframe, empty URL."),
            this;
        var c = this.id;
        _.Qa.Km[c] = this;
        var d = _.Ir(this.methods);
        d._ready = this.VB;
        d._close = this.close;
        d._open = this.FX;
        d._resizeMe = this.cZ;
        d._renderstart = this.xX;
        var e = this.gaa;
        this.lw && (e.rpctoken = this.lw);
        e._methods = _.Jr(d, c, "", this, !0);
        this.el = a = "string" === typeof a ? document.getElementById(a) : a;
        d = {
            id: c
        };
        if (b) {
            d.attributes = b;
            var f = b.style;
            if ("string" === typeof f) {
                if (f) {
                    var h = [];
                    f = f.split(";");
                    for (var k = f.length, l = 0; l < k; ++l) {
                        var m = f[l];
                        if (0 != m.length || l + 1 != k)
                            m = m.split(":"),
                            2 == m.length && m[0].match(/^[ a-zA-Z_-]+$/) && m[1].match(/^[ +.%0-9a-zA-Z_-]+$/) ? h.push(m.join(":")) : _.Mg.error(['Iframe style "', f[l], '" not allowed.'].join(""))
                    }
                    h = h.join(";")
                } else
                    h = "";
                b.style = h
            }
        }
        this.Ic().allowPost && (d.allowPost = !0);
        this.Ic().forcePost && (d.forcePost = !0);
        d.queryParams = this.params;
        d.fragmentParams = e;
        d.paramsSerializer = Fr;
        this.yi = _.an(this.config.url, a, d);
        a = this.yi.getAttribute("data-postorigin") || this.yi.src;
        _.Qa.Km[c] = this;
        _.Rg.bD(this.id, this.lw);
        _.Rg.Vj(this.id, a);
        return this
    }
    ;
    _.g.bi = function(a, b) {
        this.qG[a] = b
    }
    ;
    _.g.getId = function() {
        return this.id
    }
    ;
    _.g.getIframeEl = function() {
        return this.yi
    }
    ;
    _.g.getSiteEl = function() {
        return this.el
    }
    ;
    _.g.setSiteEl = function(a) {
        this.el = a
    }
    ;
    _.g.VB = function(a) {
        var b = Kr(a, this.id, "");
        this.Xk && "function" == typeof this.methods._ready && (a._methods = _.Jr(b, this.Xk.getId(), this.id, this, !1),
        this.methods._ready(a));
        _.Ir(a, this);
        _.Ir(b, this);
        this.wi("ready", a)
    }
    ;
    _.g.xX = function(a) {
        this.wi("renderstart", a)
    }
    ;
    _.g.close = function(a) {
        a = this.wi("close", a);
        delete _.Qa.Km[this.id];
        return a
    }
    ;
    _.g.remove = function() {
        var a = document.getElementById(this.id);
        a && a.parentNode && a.parentNode.removeChild(a)
    }
    ;
    _.g.FX = function(a) {
        var b = Kr(a.params, this.id, a.proxyId);
        delete a.params._methods;
        "_parent" == a.openParams.anchor && (a.openParams.anchor = this.el);
        if (Lr(a.openParams))
            new Vr(a.url,a.openParams,a.params,b,b._onclose,this,a.openedByProxyChain);
        else {
            var c = new Ur(a.url,a.openParams,a.params,b,b._onclose,this,a.openedByProxyChain)
              , d = this;
            Rr(c, function() {
                var e = {
                    childId: c.getId()
                }
                  , f = c.qG;
                f._toclose = c.close;
                e._methods = _.Jr(f, d.id, c.id, c, !1);
                b._onopen(e)
            })
        }
    }
    ;
    _.g.cZ = function(a) {
        if (void 0 === this.wi("resize", a) && this.yi) {
            var b = Tr(a.width);
            null != b && (this.yi.style.width = b.CG);
            a = Tr(a.height);
            null != a && (this.yi.style.height = a.CG);
            this.yi.parentElement && (null != b && b.JV || null != a && a.JV) && (this.yi.parentElement.style.display = "block")
        }
    }
    ;
    var Vr = function(a, b, c, d, e, f, h) {
        var k = this;
        Or.call(this, a, b, c, d, Cr, e, f, h);
        this.url = a;
        this.fq = null;
        this.hK = Er();
        Rr(this, function() {
            k.wi("beforeparentopen");
            var l = _.Ir(k.methods);
            l._onopen = k.Pca;
            l._ready = k.VB;
            l._onclose = k.Nca;
            k.params._methods = _.Jr(l, "..", k.hK, k, !0);
            l = {};
            for (var m in k.params)
                l[m] = Fr(k.params[m]);
            _.Yo._open({
                url: k.config.url,
                openParams: k.WB,
                params: l,
                proxyId: k.hK,
                openedByProxyChain: k.NJ
            })
        })
    };
    Pr(Vr);
    Vr.prototype.x9 = function() {
        return this.fq
    }
    ;
    Vr.prototype.Pca = function(a) {
        this.fq = a.childId;
        var b = Kr(a, "..", this.fq);
        _.Ir(b, this);
        this.close = b._toclose;
        _.Qa.Km[this.fq] = this;
        this.Xk && this.methods._onopen && (a._methods = _.Jr(b, this.Xk.getId(), this.fq, this, !1),
        this.methods._onopen(a))
    }
    ;
    Vr.prototype.VB = function(a) {
        var b = String(this.fq)
          , c = Kr(a, "..", b);
        _.Ir(a, this);
        _.Ir(c, this);
        this.wi("ready", a);
        this.Xk && this.methods._ready && (a._methods = _.Jr(c, this.Xk.getId(), b, this, !1),
        this.methods._ready(a))
    }
    ;
    Vr.prototype.Nca = function(a) {
        if (this.Xk && this.methods._onclose)
            this.methods._onclose(a);
        else
            return a = this.wi("close", a),
            delete _.Qa.Km[this.fq],
            a
    }
    ;
    var Wr = function(a, b, c, d, e, f, h) {
        Or.call(this, a, b, c, d, Cr, f, h);
        this.id = b.id || Er();
        this.pga = e;
        d._close = this.close;
        this.onClosed = this.qX;
        this.q1 = 0;
        Rr(this, function() {
            this.wi("beforeparentopen");
            var k = _.Ir(this.methods);
            this.params._methods = _.Jr(k, "..", this.hK, this, !0);
            k = {};
            k.queryParams = this.params;
            a = _.Sm(_.cf, this.config.url, this.id, k);
            var l = e.openWindow(a);
            this.canAutoClose = function(m) {
                m(e.fQ(l))
            }
            ;
            e.b_(l, this);
            this.q1 = l
        })
    };
    Pr(Wr);
    Wr.prototype.close = function(a) {
        a = this.wi("close", a);
        this.pga.uQ(this.q1);
        return a
    }
    ;
    Wr.prototype.qX = function() {
        this.wi("close")
    }
    ;
    _.Yo.send = function(a, b, c) {
        _.Qa.wZ(_.Yo, a, b, c)
    }
    ;
    (function() {
        function a(h) {
            return _.Qa.Sw[h]
        }
        function b(h, k) {
            _.Qa.Sw[h] = k
        }
        function c(h) {
            h = h || {};
            "auto" === h.height && (h.height = _.cn());
            var k = window && yr && yr.La();
            k ? k.bZ(h.width || 0, h.height || 0) : _.Yo && _.Yo._resizeMe && _.Yo._resizeMe(h)
        }
        function d(h) {
            Hr(h)
        }
        _.Qa.Km = {};
        _.Qa.Sw = {};
        _.Qa.TF = {};
        _.Qa.XU = 0;
        _.Qa.Lj = {};
        _.Qa.mr = {};
        _.Qa.gC = null;
        _.Qa.fC = [];
        _.Qa.Zca = function(h) {
            var k = !1;
            try {
                if (null != h) {
                    var l = window.parent.frames[h.id];
                    k = l.iframer.id == h.id && l.iframes.openedId_(_.Yo.id)
                }
            } catch (m) {}
            try {
                _.Qa.gC = {
                    origin: this.origin,
                    referer: this.referer,
                    claimedOpenerId: h && h.id,
                    claimedOpenerProxyChain: h && h.proxyChain || [],
                    sameOrigin: k
                };
                for (h = 0; h < _.Qa.fC.length; ++h)
                    _.Qa.fC[h](_.Qa.gC);
                _.Qa.fC = []
            } catch (m) {
                Gr(m)
            }
        }
        ;
        _.Qa.k9 = function(h) {
            var k = h && h.Xk
              , l = null;
            k && (l = {},
            l.id = k.getId(),
            l.proxyChain = h.NJ);
            return l
        }
        ;
        br();
        if (window.parent != window) {
            var e = _.fr();
            e.gcv && Hr(e.gcv);
            var f = e.jsh;
            f && hr(f);
            _.Ir(Kr(e, "..", ""), _.Yo);
            _.Ir(e, _.Yo);
            cr()
        }
        _.Qa.Cb = a;
        _.Qa.Qc = b;
        _.Qa.ifa = d;
        _.Qa.resize = c;
        _.Qa.B8 = function(h) {
            return _.Qa.TF[h]
        }
        ;
        _.Qa.kL = function(h, k) {
            _.Qa.TF[h] = k
        }
        ;
        _.Qa.aZ = c;
        _.Qa.Efa = d;
        _.Qa.AA = {};
        _.Qa.AA.get = a;
        _.Qa.AA.set = b;
        _.Qa.allow = function(h, k) {
            er(h);
            _.Qa.mr[h] = k || window[h]
        }
        ;
        _.Qa.Yoa = function(h) {
            delete _.Qa.mr[h]
        }
        ;
        _.Qa.open = function(h, k, l, m, n, p) {
            3 == arguments.length ? m = {} : 4 == arguments.length && "function" === typeof m && (n = m,
            m = {});
            var q = "bubble" === k.style && yr ? yr.La() : null;
            return q ? new Wr(h,k,l,m,q,n,p) : Lr(k) ? new Vr(h,k,l,m,n,p) : new Ur(h,k,l,m,n,p)
        }
        ;
        _.Qa.close = function(h, k) {
            _.Yo && _.Yo._close && _.Yo._close(h, k)
        }
        ;
        _.Qa.ready = function(h, k, l) {
            2 == arguments.length && "function" === typeof k && (l = k,
            k = {});
            var m = h || {};
            "height"in m || (m.height = _.cn());
            m._methods = _.Jr(k || {}, "..", "", _.Yo, !0);
            _.Yo && _.Yo._ready && _.Yo._ready(m, l)
        }
        ;
        _.Qa.xT = function(h) {
            _.Qa.gC ? h(_.Qa.gC) : _.Qa.fC.push(h)
        }
        ;
        _.Qa.Rca = function(h) {
            return !!_.Qa.Km[h]
        }
        ;
        _.Qa.M8 = function() {
            return ["https://ssl.gstatic.com/gb/js/", _.Wi("googleapis.config/gcv")].join("")
        }
        ;
        _.Qa.BY = function(h) {
            var k = {
                mouseover: 1,
                mouseout: 1
            };
            if (_.Yo._event)
                for (var l = 0; l < h.length; l++) {
                    var m = h[l];
                    m in k && document.addEventListener(m, function(n) {
                        _.Yo._event({
                            event: n.type,
                            timestamp: (new Date).getTime()
                        })
                    }, !0)
                }
        }
        ;
        _.Qa.wZ = function(h, k, l, m) {
            var n = this
              , p = [];
            void 0 !== l && p.push(l);
            m && p.push(function(q) {
                m.call(n, [q])
            });
            h[k] && h[k].apply(h, p)
        }
        ;
        _.Qa.CROSS_ORIGIN_IFRAMES_FILTER = function() {
            return !0
        }
        ;
        _.Qa.p6 = function(h, k, l) {
            var m = Array.prototype.slice.call(arguments);
            _.Qa.xT(function(n) {
                n.sameOrigin && (m.unshift("/" + n.claimedOpenerId + "|" + window.location.protocol + "//" + window.location.host),
                _.Rg.call.apply(_.Rg, m))
            })
        }
        ;
        _.Qa.Eda = function(h, k) {
            _.Rg.register(h, k)
        }
        ;
        _.Qa.ofa = hr;
        _.Qa.DZ = ir;
        _.Qa.vW = Gr;
        _.Qa.YU = _.Yo
    }
    )();
    _.C("iframes.allow", _.Qa.allow);
    _.C("iframes.callSiblingOpener", _.Qa.p6);
    _.C("iframes.registerForOpenedSibling", _.Qa.Eda);
    _.C("iframes.close", _.Qa.close);
    _.C("iframes.getGoogleConnectJsUri", _.Qa.M8);
    _.C("iframes.getHandler", _.Qa.Cb);
    _.C("iframes.getDeferredHandler", _.Qa.B8);
    _.C("iframes.getParentInfo", _.Qa.xT);
    _.C("iframes.iframer", _.Qa.YU);
    _.C("iframes.open", _.Qa.open);
    _.C("iframes.openedId_", _.Qa.Rca);
    _.C("iframes.propagate", _.Qa.BY);
    _.C("iframes.ready", _.Qa.ready);
    _.C("iframes.resize", _.Qa.resize);
    _.C("iframes.setGoogleConnectJsVersion", _.Qa.ifa);
    _.C("iframes.setBootstrapHint", _.Qa.DZ);
    _.C("iframes.setJsHint", _.Qa.ofa);
    _.C("iframes.setHandler", _.Qa.Qc);
    _.C("iframes.setDeferredHandler", _.Qa.kL);
    _.C("IframeBase", Or);
    _.C("IframeBase.prototype.addCallback", Or.prototype.lb);
    _.C("IframeBase.prototype.getMethods", Or.prototype.aA);
    _.C("IframeBase.prototype.getOpenerIframe", Or.prototype.yd);
    _.C("IframeBase.prototype.getOpenParams", Or.prototype.Ic);
    _.C("IframeBase.prototype.getParams", Or.prototype.gH);
    _.C("IframeBase.prototype.removeCallback", Or.prototype.Ep);
    _.C("Iframe", Ur);
    _.C("Iframe.prototype.close", Ur.prototype.close);
    _.C("Iframe.prototype.exposeMethod", Ur.prototype.bi);
    _.C("Iframe.prototype.getId", Ur.prototype.getId);
    _.C("Iframe.prototype.getIframeEl", Ur.prototype.getIframeEl);
    _.C("Iframe.prototype.getSiteEl", Ur.prototype.getSiteEl);
    _.C("Iframe.prototype.openInto", Ur.prototype.wh);
    _.C("Iframe.prototype.remove", Ur.prototype.remove);
    _.C("Iframe.prototype.setSiteEl", Ur.prototype.setSiteEl);
    _.C("Iframe.prototype.addCallback", Ur.prototype.lb);
    _.C("Iframe.prototype.getMethods", Ur.prototype.aA);
    _.C("Iframe.prototype.getOpenerIframe", Ur.prototype.yd);
    _.C("Iframe.prototype.getOpenParams", Ur.prototype.Ic);
    _.C("Iframe.prototype.getParams", Ur.prototype.gH);
    _.C("Iframe.prototype.removeCallback", Ur.prototype.Ep);
    _.C("IframeProxy", Vr);
    _.C("IframeProxy.prototype.getTargetIframeId", Vr.prototype.x9);
    _.C("IframeProxy.prototype.addCallback", Vr.prototype.lb);
    _.C("IframeProxy.prototype.getMethods", Vr.prototype.aA);
    _.C("IframeProxy.prototype.getOpenerIframe", Vr.prototype.yd);
    _.C("IframeProxy.prototype.getOpenParams", Vr.prototype.Ic);
    _.C("IframeProxy.prototype.getParams", Vr.prototype.gH);
    _.C("IframeProxy.prototype.removeCallback", Vr.prototype.Ep);
    _.C("IframeWindow", Wr);
    _.C("IframeWindow.prototype.close", Wr.prototype.close);
    _.C("IframeWindow.prototype.onClosed", Wr.prototype.qX);
    _.C("iframes.util.getTopMostAccessibleWindow", _.Qa.Pa.Vi.MT);
    _.C("iframes.handlers.get", _.Qa.AA.get);
    _.C("iframes.handlers.set", _.Qa.AA.set);
    _.C("iframes.resizeMe", _.Qa.aZ);
    _.C("iframes.setVersionOverride", _.Qa.Efa);
    _.C("iframes.CROSS_ORIGIN_IFRAMES_FILTER", _.Qa.CROSS_ORIGIN_IFRAMES_FILTER);
    _.C("IframeBase.prototype.send", Or.prototype.send);
    _.C("IframeBase.prototype.register", Or.prototype.register);
    _.C("Iframe.prototype.send", Ur.prototype.send);
    _.C("Iframe.prototype.register", Ur.prototype.register);
    _.C("IframeProxy.prototype.send", Vr.prototype.send);
    _.C("IframeProxy.prototype.register", Vr.prototype.register);
    _.C("IframeWindow.prototype.send", Wr.prototype.send);
    _.C("IframeWindow.prototype.register", Wr.prototype.register);
    _.C("iframes.iframer.send", _.Qa.YU.send);
    var eu = _.Qa.Qc
      , fu = {
        open: function(a) {
            var b = _.So(a.Ic());
            return a.wh(b, {
                style: _.To(b)
            })
        },
        attach: function(a, b) {
            var c = _.So(a.Ic())
              , d = b.id
              , e = b.getAttribute("data-postorigin") || b.src
              , f = /#(?:.*&)?rpctoken=(\d+)/.exec(e);
            f = f && f[1];
            a.id = d;
            a.lw = f;
            a.el = c;
            a.yi = b;
            _.Qa.Km[d] = a;
            b = _.Ir(a.methods);
            b._ready = a.VB;
            b._close = a.close;
            b._open = a.FX;
            b._resizeMe = a.cZ;
            b._renderstart = a.xX;
            _.Jr(b, d, "", a, !0);
            _.Rg.bD(a.id, a.lw);
            _.Rg.Vj(a.id, e);
            c = _.Qa.zo({
                style: _.To(c)
            });
            for (var h in c)
                Object.prototype.hasOwnProperty.call(c, h) && ("style" == h ? a.yi.style.cssText = c[h] : a.yi.setAttribute(h, c[h]))
        }
    };
    fu.onready = _.Uo;
    fu.onRenderStart = _.Uo;
    fu.close = _.Vo;
    eu("inline", fu);
    _.xi = function(a) {
        for (var b in a)
            return !1;
        return !0
    }
    ;
    _.yi = function(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255,
            e >>= 8);
            b[c++] = e
        }
        return b
    }
    ;
    var Ci, Di, Fi;
    Ci = {};
    Di = null;
    _.Ei = _.ud || _.vd || !_.wi && !_.qd && "function" == typeof _.r.atob;
    _.Gi = function(a, b) {
        void 0 === b && (b = 0);
        Fi();
        b = Ci[b];
        for (var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0; e < a.length - 2; e += 3) {
            var h = a[e]
              , k = a[e + 1]
              , l = a[e + 2]
              , m = b[h >> 2];
            h = b[(h & 3) << 4 | k >> 4];
            k = b[(k & 15) << 2 | l >> 6];
            l = b[l & 63];
            c[f++] = m + h + k + l
        }
        m = 0;
        l = d;
        switch (a.length - e) {
        case 2:
            m = a[e + 1],
            l = b[(m & 15) << 2] || d;
        case 1:
            a = a[e],
            c[f] = b[a >> 2] + b[(a & 3) << 4 | m >> 4] + l + d
        }
        return c.join("")
    }
    ;
    _.Hi = function(a, b) {
        function c(l) {
            for (; d < a.length; ) {
                var m = a.charAt(d++)
                  , n = Di[m];
                if (null != n)
                    return n;
                if (!_.Ic(m))
                    throw Error("E`" + m);
            }
            return l
        }
        Fi();
        for (var d = 0; ; ) {
            var e = c(-1)
              , f = c(0)
              , h = c(64)
              , k = c(64);
            if (64 === k && -1 === e)
                break;
            b(e << 2 | f >> 4);
            64 != h && (b(f << 4 & 240 | h >> 2),
            64 != k && b(h << 6 & 192 | k))
        }
    }
    ;
    Fi = function() {
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
    }
    ;
    _.aj = {};
    var cj;
    _.bj = function(a) {
        this.Hb = a || {
            cookie: ""
        }
    }
    ;
    _.g = _.bj.prototype;
    _.g.isEnabled = function() {
        if (!_.r.navigator.cookieEnabled)
            return !1;
        if (!this.isEmpty())
            return !0;
        this.set("TESTCOOKIESENABLED", "1", {
            bJ: 60
        });
        if ("1" !== this.get("TESTCOOKIESENABLED"))
            return !1;
        this.remove("TESTCOOKIESENABLED");
        return !0
    }
    ;
    _.g.set = function(a, b, c) {
        var d = !1;
        if ("object" === typeof c) {
            var e = c.mra;
            d = c.secure || !1;
            var f = c.domain || void 0;
            var h = c.path || void 0;
            var k = c.bJ
        }
        if (/[;=\s]/.test(a))
            throw Error("H`" + a);
        if (/[;\r\n]/.test(b))
            throw Error("I`" + b);
        void 0 === k && (k = -1);
        this.Hb.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (h ? ";path=" + h : "") + (0 > k ? "" : 0 == k ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * k)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
    }
    ;
    _.g.get = function(a, b) {
        for (var c = a + "=", d = (this.Hb.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = (0,
            _.Jc)(d[e]);
            if (0 == f.lastIndexOf(c, 0))
                return f.slice(c.length);
            if (f == a)
                return ""
        }
        return b
    }
    ;
    _.g.remove = function(a, b, c) {
        var d = this.aj(a);
        this.set(a, "", {
            bJ: 0,
            path: b,
            domain: c
        });
        return d
    }
    ;
    _.g.Fg = function() {
        return cj(this).keys
    }
    ;
    _.g.Jd = function() {
        return cj(this).values
    }
    ;
    _.g.isEmpty = function() {
        return !this.Hb.cookie
    }
    ;
    _.g.Tb = function() {
        return this.Hb.cookie ? (this.Hb.cookie || "").split(";").length : 0
    }
    ;
    _.g.aj = function(a) {
        return void 0 !== this.get(a)
    }
    ;
    _.g.rk = function(a) {
        for (var b = cj(this).values, c = 0; c < b.length; c++)
            if (b[c] == a)
                return !0;
        return !1
    }
    ;
    _.g.clear = function() {
        for (var a = cj(this).keys, b = a.length - 1; 0 <= b; b--)
            this.remove(a[b])
    }
    ;
    cj = function(a) {
        a = (a.Hb.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
            e = (0,
            _.Jc)(a[f]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    }
    ;
    _.dj = new _.bj("undefined" == typeof document ? null : document);
    _.oj = {};
    _.pj = function(a) {
        return _.oj[a || "token"] || null
    }
    ;
    _.Ij = function(a) {
        a && "function" == typeof a.Ia && a.Ia()
    }
    ;
    _.Jj = function() {
        this.Zg = this.Zg;
        this.lp = this.lp
    }
    ;
    _.Jj.prototype.Zg = !1;
    _.Jj.prototype.isDisposed = function() {
        return this.Zg
    }
    ;
    _.Jj.prototype.Ia = function() {
        this.Zg || (this.Zg = !0,
        this.ua())
    }
    ;
    _.Lj = function(a, b) {
        _.Kj(a, _.$a(_.Ij, b))
    }
    ;
    _.Kj = function(a, b) {
        a.Zg ? b() : (a.lp || (a.lp = []),
        a.lp.push(b))
    }
    ;
    _.Jj.prototype.ua = function() {
        if (this.lp)
            for (; this.lp.length; )
                this.lp.shift()()
    }
    ;
    var Qj = function(a, b) {
        for (var c in a)
            if (b.call(void 0, a[c], c, a))
                return !0;
        return !1
    };
    _.Zd.prototype.O = _.hb(1, function(a) {
        return _.ze(this.Hb, a)
    });
    _.Rj = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    }
    ;
    _.Sj = function(a, b, c) {
        return Object.prototype.hasOwnProperty.call(a, b) ? a[b] : a[b] = c(b)
    }
    ;
    _.Uj = function(a, b) {
        this.type = "function" == typeof _.Tj && a instanceof _.Tj ? String(a) : a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.cw = !1
    }
    ;
    _.Uj.prototype.stopPropagation = function() {
        this.cw = !0
    }
    ;
    _.Uj.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    var Vj = function() {
        if (!_.r.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            var c = function() {};
            _.r.addEventListener("test", c, b);
            _.r.removeEventListener("test", c, b)
        } catch (d) {}
        return a
    }();
    _.Wj = function(a, b) {
        _.Uj.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.aK = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.timeStamp = 0;
        this.mf = null;
        a && this.Ad(a, b)
    }
    ;
    _.ab(_.Wj, _.Uj);
    var Yj = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    _.Wj.prototype.Ad = function(a, b) {
        var c = this.type = a.type
          , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        (b = a.relatedTarget) ? _.ud && (_.od(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
        this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
        this.screenX = d.screenX || 0,
        this.screenY = d.screenY || 0) : (this.offsetX = _.vd || void 0 !== a.offsetX ? a.offsetX : a.layerX,
        this.offsetY = _.vd || void 0 !== a.offsetY ? a.offsetY : a.layerY,
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
        this.screenX = a.screenX || 0,
        this.screenY = a.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.aK = _.xd ? a.metaKey : a.ctrlKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Yj[a.pointerType] || "";
        this.state = a.state;
        this.timeStamp = a.timeStamp;
        this.mf = a;
        a.defaultPrevented && _.Wj.N.preventDefault.call(this)
    }
    ;
    _.Wj.prototype.stopPropagation = function() {
        _.Wj.N.stopPropagation.call(this);
        this.mf.stopPropagation ? this.mf.stopPropagation() : this.mf.cancelBubble = !0
    }
    ;
    _.Wj.prototype.preventDefault = function() {
        _.Wj.N.preventDefault.call(this);
        var a = this.mf;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    ;
    _.Zj = "closure_listenable_" + (1E6 * Math.random() | 0);
    _.ak = function(a) {
        return !(!a || !a[_.Zj])
    }
    ;
    var bk = 0;
    var ck = function(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Uf = e;
        this.key = ++bk;
        this.hw = this.Cy = !1
    }
      , dk = function(a) {
        a.hw = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Uf = null
    };
    var ek = function(a) {
        this.src = a;
        this.ye = {};
        this.sx = 0
    };
    ek.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.ye[f];
        a || (a = this.ye[f] = [],
        this.sx++);
        var h = fk(a, b, d, e);
        -1 < h ? (b = a[h],
        c || (b.Cy = !1)) : (b = new ck(b,this.src,f,!!d,e),
        b.Cy = c,
        a.push(b));
        return b
    }
    ;
    ek.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.ye))
            return !1;
        var e = this.ye[a];
        b = fk(e, b, c, d);
        return -1 < b ? (dk(e[b]),
        Array.prototype.splice.call(e, b, 1),
        0 == e.length && (delete this.ye[a],
        this.sx--),
        !0) : !1
    }
    ;
    var gk = function(a, b) {
        var c = b.type;
        if (!(c in a.ye))
            return !1;
        var d = _.nb(a.ye[c], b);
        d && (dk(b),
        0 == a.ye[c].length && (delete a.ye[c],
        a.sx--));
        return d
    };
    ek.prototype.removeAll = function(a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.ye)
            if (!a || c == a) {
                for (var d = this.ye[c], e = 0; e < d.length; e++)
                    ++b,
                    dk(d[e]);
                delete this.ye[c];
                this.sx--
            }
        return b
    }
    ;
    ek.prototype.Zq = function(a, b, c, d) {
        a = this.ye[a.toString()];
        var e = -1;
        a && (e = fk(a, b, c, d));
        return -1 < e ? a[e] : null
    }
    ;
    ek.prototype.hasListener = function(a, b) {
        var c = void 0 !== a
          , d = c ? a.toString() : ""
          , e = void 0 !== b;
        return Qj(this.ye, function(f) {
            for (var h = 0; h < f.length; ++h)
                if (!(c && f[h].type != d || e && f[h].capture != b))
                    return !0;
            return !1
        })
    }
    ;
    var fk = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.hw && f.listener == b && f.capture == !!c && f.Uf == d)
                return e
        }
        return -1
    };
    var hk, ik, jk, nk, pk, qk, rk, uk;
    hk = "closure_lm_" + (1E6 * Math.random() | 0);
    ik = {};
    jk = 0;
    _.lk = function(a, b, c, d, e) {
        if (d && d.once)
            return _.kk(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                _.lk(a, b[f], c, d, e);
            return null
        }
        c = _.mk(c);
        return _.ak(a) ? a.ma(b, c, _.Rb(d) ? !!d.capture : !!d, e) : nk(a, b, c, !1, d, e)
    }
    ;
    nk = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("J");
        var h = _.Rb(e) ? !!e.capture : !!e
          , k = _.ok(a);
        k || (a[hk] = k = new ek(a));
        c = k.add(b, c, d, h, f);
        if (c.proxy)
            return c;
        d = pk();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Vj || (e = h),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(qk(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("K");
        jk++;
        return c
    }
    ;
    pk = function() {
        var a = rk
          , b = function(c) {
            return a.call(b.src, b.listener, c)
        };
        return b
    }
    ;
    _.kk = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                _.kk(a, b[f], c, d, e);
            return null
        }
        c = _.mk(c);
        return _.ak(a) ? a.Lr(b, c, _.Rb(d) ? !!d.capture : !!d, e) : nk(a, b, c, !0, d, e)
    }
    ;
    _.sk = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                _.sk(a, b[f], c, d, e);
        else
            d = _.Rb(d) ? !!d.capture : !!d,
            c = _.mk(c),
            _.ak(a) ? a.Kc(b, c, d, e) : a && (a = _.ok(a)) && (b = a.Zq(b, c, d, e)) && _.tk(b)
    }
    ;
    _.tk = function(a) {
        if ("number" === typeof a || !a || a.hw)
            return !1;
        var b = a.src;
        if (_.ak(b))
            return b.xN(a);
        var c = a.type
          , d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(qk(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        jk--;
        (c = _.ok(b)) ? (gk(c, a),
        0 == c.sx && (c.src = null,
        b[hk] = null)) : dk(a);
        return !0
    }
    ;
    qk = function(a) {
        return a in ik ? ik[a] : ik[a] = "on" + a
    }
    ;
    rk = function(a, b) {
        if (a.hw)
            a = !0;
        else {
            b = new _.Wj(b,this);
            var c = a.listener
              , d = a.Uf || a.src;
            a.Cy && _.tk(a);
            a = c.call(d, b)
        }
        return a
    }
    ;
    _.ok = function(a) {
        a = a[hk];
        return a instanceof ek ? a : null
    }
    ;
    uk = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    _.mk = function(a) {
        if ("function" === typeof a)
            return a;
        a[uk] || (a[uk] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[uk]
    }
    ;
    _.Pj(function(a) {
        rk = a(rk)
    });
    _.vk = function() {
        _.Jj.call(this);
        this.Ck = new ek(this);
        this.J5 = this;
        this.SJ = null
    }
    ;
    _.ab(_.vk, _.Jj);
    _.vk.prototype[_.Zj] = !0;
    _.g = _.vk.prototype;
    _.g.Co = function() {
        return this.SJ
    }
    ;
    _.g.nD = function(a) {
        this.SJ = a
    }
    ;
    _.g.addEventListener = function(a, b, c, d) {
        _.lk(this, a, b, c, d)
    }
    ;
    _.g.removeEventListener = function(a, b, c, d) {
        _.sk(this, a, b, c, d)
    }
    ;
    _.g.dispatchEvent = function(a) {
        var b, c = this.Co();
        if (c)
            for (b = []; c; c = c.Co())
                b.push(c);
        c = this.J5;
        var d = a.type || a;
        if ("string" === typeof a)
            a = new _.Uj(a,c);
        else if (a instanceof _.Uj)
            a.target = a.target || c;
        else {
            var e = a;
            a = new _.Uj(d,c);
            _.tb(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; !a.cw && 0 <= f; f--) {
                var h = a.currentTarget = b[f];
                e = h.ru(d, !0, a) && e
            }
        a.cw || (h = a.currentTarget = c,
        e = h.ru(d, !0, a) && e,
        a.cw || (e = h.ru(d, !1, a) && e));
        if (b)
            for (f = 0; !a.cw && f < b.length; f++)
                h = a.currentTarget = b[f],
                e = h.ru(d, !1, a) && e;
        return e
    }
    ;
    _.g.ua = function() {
        _.vk.N.ua.call(this);
        this.sK();
        this.SJ = null
    }
    ;
    _.g.ma = function(a, b, c, d) {
        return this.Ck.add(String(a), b, !1, c, d)
    }
    ;
    _.g.Lr = function(a, b, c, d) {
        return this.Ck.add(String(a), b, !0, c, d)
    }
    ;
    _.g.Kc = function(a, b, c, d) {
        return this.Ck.remove(String(a), b, c, d)
    }
    ;
    _.g.xN = function(a) {
        return gk(this.Ck, a)
    }
    ;
    _.g.sK = function() {
        this.Ck && this.Ck.removeAll(void 0)
    }
    ;
    _.g.ru = function(a, b, c) {
        a = this.Ck.ye[String(a)];
        if (!a)
            return !0;
        a = a.concat();
        for (var d = !0, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f && !f.hw && f.capture == b) {
                var h = f.listener
                  , k = f.Uf || f.src;
                f.Cy && this.xN(f);
                d = !1 !== h.call(k, c) && d
            }
        }
        return d && !c.defaultPrevented
    }
    ;
    _.g.Zq = function(a, b, c, d) {
        return this.Ck.Zq(String(a), b, c, d)
    }
    ;
    _.g.hasListener = function(a, b) {
        return this.Ck.hasListener(void 0 !== a ? String(a) : void 0, b)
    }
    ;
    var st;
    st = function(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    }
    ;
    _.tt = function(a, b, c, d) {
        return Array.prototype.splice.apply(a, st(arguments, 1))
    }
    ;
    _.ut = function(a, b, c) {
        if (null !== a && b in a)
            throw Error("k`" + b);
        a[b] = c
    }
    ;
    _.vt = function(a, b) {
        var c = b || document;
        if (c.getElementsByClassName)
            a = c.getElementsByClassName(a)[0];
        else {
            c = document;
            var d = b || c;
            a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : _.be(c, "*", a, b)[0] || null
        }
        return a || null
    }
    ;
    _.wt = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    }
    ;
    _.xt = function(a) {
        var b;
        if (_.Qd && (b = a.parentElement))
            return b;
        b = a.parentNode;
        return _.ve(b) ? b : null
    }
    ;
    _.zt = function(a, b, c) {
        a && !c && (a = a.parentNode);
        for (c = 0; a; ) {
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
    ;
    _.At = function(a) {
        _.Jj.call(this);
        this.Ke = a;
        this.lc = {}
    }
    ;
    _.ab(_.At, _.Jj);
    var Bt = [];
    _.At.prototype.ma = function(a, b, c, d) {
        return this.Cv(a, b, c, d)
    }
    ;
    _.At.prototype.Cv = function(a, b, c, d, e) {
        Array.isArray(b) || (b && (Bt[0] = b.toString()),
        b = Bt);
        for (var f = 0; f < b.length; f++) {
            var h = _.lk(a, b[f], c || this.handleEvent, d || !1, e || this.Ke || this);
            if (!h)
                break;
            this.lc[h.key] = h
        }
        return this
    }
    ;
    _.At.prototype.Lr = function(a, b, c, d) {
        return Ct(this, a, b, c, d)
    }
    ;
    var Ct = function(a, b, c, d, e, f) {
        if (Array.isArray(c))
            for (var h = 0; h < c.length; h++)
                Ct(a, b, c[h], d, e, f);
        else {
            b = _.kk(b, c, d || a.handleEvent, e, f || a.Ke || a);
            if (!b)
                return a;
            a.lc[b.key] = b
        }
        return a
    };
    _.At.prototype.Kc = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                this.Kc(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            d = _.Rb(d) ? !!d.capture : !!d,
            e = e || this.Ke || this,
            c = _.mk(c),
            d = !!d,
            b = _.ak(a) ? a.Zq(b, c, d, e) : a ? (a = _.ok(a)) ? a.Zq(b, c, d, e) : null : null,
            b && (_.tk(b),
            delete this.lc[b.key]);
        return this
    }
    ;
    _.At.prototype.removeAll = function() {
        _.pb(this.lc, function(a, b) {
            this.lc.hasOwnProperty(b) && _.tk(a)
        }, this);
        this.lc = {}
    }
    ;
    _.At.prototype.ua = function() {
        _.At.N.ua.call(this);
        this.removeAll()
    }
    ;
    _.At.prototype.handleEvent = function() {
        throw Error("S");
    }
    ;
    var cv, dv, ev, fv, gv, iv, jv, kv, lv, nv;
    _.bv = !1;
    cv = function(a) {
        try {
            _.bv && window.console && window.console.log && window.console.log(a)
        } catch (b) {}
    }
    ;
    dv = function(a) {
        try {
            window.console && window.console.warn && window.console.warn(a)
        } catch (b) {}
    }
    ;
    ev = function(a, b) {
        if (!a)
            return -1;
        if (a.indexOf)
            return a.indexOf(b, void 0);
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] === b)
                return c;
        return -1
    }
    ;
    fv = function(a, b) {
        function c() {}
        if (!a)
            throw Error("V");
        if (!b)
            throw Error("W");
        c.prototype = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    }
    ;
    gv = function(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }
    ;
    _.hv = function(a) {
        var b = {};
        if (a)
            for (var c in a)
                a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }
    ;
    iv = function(a) {
        var b = location.hash;
        a = new RegExp("[&#]" + a + "=([^&]*)");
        b = decodeURIComponent(b);
        b = a.exec(b);
        return null == b ? "" : b[1].replace(/\+/g, " ")
    }
    ;
    jv = function(a, b, c) {
        if (a.addEventListener)
            a.addEventListener(b, c, !1);
        else if (a.attachEvent)
            a.attachEvent("on" + b, c);
        else
            throw Error("X`" + b);
    }
    ;
    kv = {
        token: 1,
        id_token: 1
    };
    lv = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 != a.indexOf("msie") && 8 == parseInt(a.split("msie")[1], 10)
    }
    ;
    _.mv = window.JSON;
    nv = function(a) {
        this.MN = a || [];
        this.zc = {}
    }
    ;
    nv.prototype.addEventListener = function(a, b) {
        if (!(0 <= ev(this.MN, a)))
            throw Error("Z`" + a);
        if (!gv(b))
            throw Error("$`" + a);
        this.zc[a] || (this.zc[a] = []);
        0 > ev(this.zc[a], b) && this.zc[a].push(b)
    }
    ;
    nv.prototype.removeEventListener = function(a, b) {
        if (!(0 <= ev(this.MN, a)))
            throw Error("Z`" + a);
        gv(b) && this.zc[a] && this.zc[a].length && (b = ev(this.zc[a], b),
        0 <= b && this.zc[a].splice(b, 1))
    }
    ;
    nv.prototype.dispatchEvent = function(a) {
        var b = a.type;
        if (!(b && 0 <= ev(this.MN, b)))
            throw Error("aa`" + b);
        if (this.zc[b] && this.zc[b].length)
            for (var c = this.zc[b].length, d = 0; d < c; d++)
                this.zc[b][d](a)
    }
    ;
    var ov, pv, qv, uv, vv, Mv, Nv, Pv, Qv, Sv, bw;
    ov = {};
    pv = {};
    qv = {
        google: {
            authServerUrl: "https://accounts.google.com/o/oauth2/auth",
            idpIFrameUrl: "https://accounts.google.com/o/oauth2/iframe"
        }
    };
    _.rv = function(a, b) {
        if (a = qv[a])
            return a[b]
    }
    ;
    _.sv = function(a, b) {
        if (!a)
            throw Error("ba");
        if (!b.authServerUrl)
            throw Error("ca");
        if (!b.idpIFrameUrl)
            throw Error("da");
        qv[a] = {
            authServerUrl: b.authServerUrl,
            idpIFrameUrl: b.idpIFrameUrl
        }
    }
    ;
    _.tv = void 0;
    uv = function(a) {
        a.style.position = "absolute";
        a.style.width = "1px";
        a.style.height = "1px";
        a.style.left = "-9999px";
        a.style.top = "-9999px";
        a.style.right = "-9999px";
        a.style.bottom = "-9999px";
        a.style.display = "none";
        a.setAttribute("aria-hidden", "true")
    }
    ;
    vv = function() {
        this.Ti = window;
        this.Xy = this.Sn = this.Yv = this.Ii = null
    }
    ;
    vv.prototype.open = function(a, b, c, d) {
        wv(this);
        this.Yv ? (this.Sn && (this.Sn(),
        this.Sn = null),
        xv(this)) : this.Yv = "authPopup" + Math.floor(1E6 * Math.random() + 1);
        a: {
            this.Ii = this.Ti.open(a, this.Yv, b);
            try {
                this.Ii.focus();
                if (this.Ii.closed || "undefined" == typeof this.Ii.closed)
                    throw Error("fa");
                _.tv = this.Ii
            } catch (e) {
                d && setTimeout(d, 0);
                this.Ii = null;
                break a
            }
            c && (this.Sn = c,
            yv(this))
        }
    }
    ;
    var wv = function(a) {
        try {
            if (null == a.Ii || a.Ii.closed)
                a.Ii = null,
                a.Yv = null,
                xv(a),
                a.Sn && (a.Sn(),
                a.Sn = null)
        } catch (b) {
            a.Ii = null,
            a.Yv = null,
            xv(a)
        }
    }
      , yv = function(a) {
        a.Xy = window.setInterval(function() {
            wv(a)
        }, 300)
    }
      , xv = function(a) {
        a.Xy && (window.clearInterval(a.Xy),
        a.Xy = null)
    };
    pv = pv || {};
    var zv = function(a, b) {
        this.mc = a;
        this.pI = b;
        this.Pd = null;
        this.Lo = !1
    };
    zv.prototype.start = function() {
        if (!this.Lo && !this.Pd) {
            var a = this;
            this.Pd = window.setTimeout(function() {
                a.clear();
                a.Lo || (a.mc(),
                a.Lo = !0)
            }, pv.KT(this.pI))
        }
    }
    ;
    zv.prototype.clear = function() {
        this.Pd && (window.clearTimeout(this.Pd),
        this.Pd = null)
    }
    ;
    var Av = function(a, b) {
        var c = pv.vt;
        this.haa = pv.lt;
        this.i1 = c;
        this.mc = a;
        this.pI = b;
        this.Pd = null;
        this.Lo = !1;
        var d = this;
        this.j1 = function() {
            document[d.haa] || (d.clear(),
            d.start())
        }
    };
    Av.prototype.start = function() {
        if (!this.Lo && !this.Pd) {
            jv(document, this.i1, this.j1);
            var a = this;
            this.Pd = window.setTimeout(function() {
                a.clear();
                a.Lo || (a.mc(),
                a.Lo = !0)
            }, pv.KT(this.pI))
        }
    }
    ;
    Av.prototype.clear = function() {
        var a = this.i1
          , b = this.j1
          , c = document;
        if (c.removeEventListener)
            c.removeEventListener(a, b, !1);
        else if (c.detachEvent)
            c.detachEvent("on" + a, b);
        else
            throw Error("Y`" + a);
        this.Pd && (window.clearTimeout(this.Pd),
        this.Pd = null)
    }
    ;
    pv.lt = null;
    pv.vt = null;
    pv.Laa = function() {
        var a = document;
        "undefined" !== typeof a.hidden ? (pv.lt = "hidden",
        pv.vt = "visibilitychange") : "undefined" !== typeof a.msHidden ? (pv.lt = "msHidden",
        pv.vt = "msvisibilitychange") : "undefined" !== typeof a.webkitHidden && (pv.lt = "webkitHidden",
        pv.vt = "webkitvisibilitychange")
    }
    ;
    pv.Laa();
    pv.Z6 = function(a, b) {
        return pv.lt && pv.vt ? new Av(a,b) : new zv(a,b)
    }
    ;
    pv.KT = function(a) {
        return Math.max(1, a - (new Date).getTime())
    }
    ;
    var Bv = function(a, b) {
        document.cookie = "G_ENABLED_IDPS=" + a + ";domain=." + b + ";expires=Fri, 31 Dec 9999 12:00:00 GMT;path=/"
    }
      , Cv = function() {
        function a() {
            e[0] = 1732584193;
            e[1] = 4023233417;
            e[2] = 2562383102;
            e[3] = 271733878;
            e[4] = 3285377520;
            n = m = 0
        }
        function b(p) {
            for (var q = h, t = 0; 64 > t; t += 4)
                q[t / 4] = p[t] << 24 | p[t + 1] << 16 | p[t + 2] << 8 | p[t + 3];
            for (t = 16; 80 > t; t++)
                p = q[t - 3] ^ q[t - 8] ^ q[t - 14] ^ q[t - 16],
                q[t] = (p << 1 | p >>> 31) & 4294967295;
            p = e[0];
            var v = e[1]
              , u = e[2]
              , w = e[3]
              , x = e[4];
            for (t = 0; 80 > t; t++) {
                if (40 > t)
                    if (20 > t) {
                        var z = w ^ v & (u ^ w);
                        var F = 1518500249
                    } else
                        z = v ^ u ^ w,
                        F = 1859775393;
                else
                    60 > t ? (z = v & u | w & (v | u),
                    F = 2400959708) : (z = v ^ u ^ w,
                    F = 3395469782);
                z = ((p << 5 | p >>> 27) & 4294967295) + z + x + F + q[t] & 4294967295;
                x = w;
                w = u;
                u = (v << 30 | v >>> 2) & 4294967295;
                v = p;
                p = z
            }
            e[0] = e[0] + p & 4294967295;
            e[1] = e[1] + v & 4294967295;
            e[2] = e[2] + u & 4294967295;
            e[3] = e[3] + w & 4294967295;
            e[4] = e[4] + x & 4294967295
        }
        function c(p, q) {
            if ("string" === typeof p) {
                p = unescape(encodeURIComponent(p));
                for (var t = [], v = 0, u = p.length; v < u; ++v)
                    t.push(p.charCodeAt(v));
                p = t
            }
            q || (q = p.length);
            t = 0;
            if (0 == m)
                for (; t + 64 < q; )
                    b(p.slice(t, t + 64)),
                    t += 64,
                    n += 64;
            for (; t < q; )
                if (f[m++] = p[t++],
                n++,
                64 == m)
                    for (m = 0,
                    b(f); t + 64 < q; )
                        b(p.slice(t, t + 64)),
                        t += 64,
                        n += 64
        }
        function d() {
            var p = []
              , q = 8 * n;
            56 > m ? c(k, 56 - m) : c(k, 64 - (m - 56));
            for (var t = 63; 56 <= t; t--)
                f[t] = q & 255,
                q >>>= 8;
            b(f);
            for (t = q = 0; 5 > t; t++)
                for (var v = 24; 0 <= v; v -= 8)
                    p[q++] = e[t] >> v & 255;
            return p
        }
        for (var e = [], f = [], h = [], k = [128], l = 1; 64 > l; ++l)
            k[l] = 0;
        var m, n;
        a();
        return {
            reset: a,
            update: c,
            digest: d,
            cj: function() {
                for (var p = d(), q = "", t = 0; t < p.length; t++)
                    q += "0123456789ABCDEF".charAt(Math.floor(p[t] / 16)) + "0123456789ABCDEF".charAt(p[t] % 16);
                return q
            }
        }
    }
      , Dv = window.crypto
      , Ev = !1
      , Fv = 0
      , Gv = 1
      , Hv = 0
      , Iv = ""
      , Jv = function(a) {
        a = a || window.event;
        var b = a.screenX + a.clientX << 16;
        b += a.screenY + a.clientY;
        b *= (new Date).getTime() % 1E6;
        Gv = Gv * b % Hv;
        if (3 == ++Fv)
            if (a = window,
            b = Jv,
            a.removeEventListener)
                a.removeEventListener("mousemove", b, !1);
            else if (a.detachEvent)
                a.detachEvent("onmousemove", b);
            else
                throw Error("Y`mousemove");
    }
      , Kv = function(a) {
        var b = Cv();
        b.update(a);
        return b.cj()
    };
    Ev = !!Dv && "function" == typeof Dv.getRandomValues;
    Ev || (Hv = 1E6 * (screen.width * screen.width + screen.height),
    Iv = Kv(document.cookie + "|" + document.location + "|" + (new Date).getTime() + "|" + Math.random()),
    jv(window, "mousemove", Jv));
    ov = ov || {};
    ov.f3 = "ssIFrame_";
    _.Lv = function(a, b, c) {
        c = void 0 === c ? !1 : c;
        this.Kb = a;
        if (!this.Kb)
            throw Error("ga");
        a = _.rv(a, "idpIFrameUrl");
        if (!a)
            throw Error("ha");
        this.UU = a;
        if (!b)
            throw Error("ia");
        this.vn = b;
        a = this.UU;
        b = document.createElement("a");
        b.setAttribute("href", a);
        a = [b.protocol, "//", b.hostname];
        "http:" == b.protocol && "" != b.port && "0" != b.port && "80" != b.port ? (a.push(":"),
        a.push(b.port)) : "https:" == b.protocol && "" != b.port && "0" != b.port && "443" != b.port && (a.push(":"),
        a.push(b.port));
        this.ZH = a.join("");
        this.rea = [location.protocol, "//", location.host].join("");
        this.gx = this.YH = this.Po = !1;
        this.QU = null;
        this.UB = [];
        this.ms = [];
        this.kk = {};
        this.Qo = void 0;
        this.Zw = c
    }
    ;
    _.g = _.Lv.prototype;
    _.g.show = function() {
        var a = this.Qo;
        a.style.position = "fixed";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.left = "0px";
        a.style.top = "0px";
        a.style.right = "0px";
        a.style.bottom = "0px";
        a.style.display = "block";
        a.style.zIndex = "9999999";
        a.style.overflow = "hidden";
        a.setAttribute("aria-hidden", "false")
    }
    ;
    _.g.kc = function() {
        uv(this.Qo)
    }
    ;
    _.g.wB = function(a) {
        if (this.Po)
            a && a(this);
        else {
            if (!this.Qo) {
                var b = ov.f3 + this.Kb;
                var c = this.Kb;
                var d = location.hostname;
                var e, f = document.cookie.match("(^|;) ?G_ENABLED_IDPS=([^;]*)(;|$)");
                f && 2 < f.length && (e = f[2]);
                (f = e && 0 <= ev(e.split("|"), c)) ? Bv(e, d) : Bv(e ? e + "|" + c : c, d);
                c = !f;
                var h = this.UU
                  , k = this.rea;
                d = this.vn;
                e = this.Zw;
                e = void 0 === e ? !1 : e;
                f = document.createElement("iframe");
                f.setAttribute("id", b);
                b = f.setAttribute;
                var l = "allow-scripts allow-same-origin";
                document.requestStorageAccess && gv(document.requestStorageAccess) && (l += " allow-storage-access-by-user-activation");
                b.call(f, "sandbox", l);
                uv(f);
                f.setAttribute("frame-border", "0");
                b = [h, "#origin=", encodeURIComponent(k)];
                b.push("&rpcToken=");
                b.push(encodeURIComponent(d));
                c && b.push("&clearCache=1");
                _.bv && b.push("&debug=1");
                e && b.push("&supportBlocked3PCookies=1");
                document.body.appendChild(f);
                f.setAttribute("src", b.join(""));
                this.Qo = f
            }
            a && this.UB.push(a)
        }
    }
    ;
    _.g.hB = function() {
        return this.Po && this.gx
    }
    ;
    _.g.Ao = function() {
        return this.QU
    }
    ;
    Mv = function(a) {
        for (var b = 0; b < a.UB.length; b++)
            a.UB[b](a);
        a.UB = []
    }
    ;
    _.Ov = function(a, b, c, d) {
        if (a.Po) {
            if (a.Po && a.YH)
                throw a = "Failed to communicate with IDP IFrame due to unitialization error: " + a.Ao(),
                cv(a),
                Error(a);
            Nv(a, {
                method: b,
                params: c
            }, d)
        } else
            a.ms.push({
                Ip: {
                    method: b,
                    params: c
                },
                callback: d
            }),
            a.wB()
    }
    ;
    Nv = function(a, b, c) {
        if (c) {
            for (var d = b.id; !d || a.kk[d]; )
                d = (new Date).getMilliseconds() + "-" + (1E6 * Math.random() + 1);
            b.id = d;
            a.kk[d] = c
        }
        b.rpcToken = a.vn;
        a.Qo.contentWindow.postMessage(_.mv.stringify(b), a.ZH)
    }
    ;
    Pv = function(a) {
        if (a && 0 <= a.indexOf("::"))
            throw Error("ja");
    }
    ;
    _.Lv.prototype.Fj = function(a, b, c, d, e, f, h, k, l) {
        l = void 0 === l ? !1 : l;
        Pv(f);
        b = _.hv(b);
        _.Ov(this, "getTokenResponse", {
            clientId: a,
            loginHint: c,
            request: b,
            sessionSelector: d,
            forceRefresh: h,
            skipCache: k,
            id: f,
            userInteracted: l
        }, e)
    }
    ;
    _.Lv.prototype.uB = function(a, b, c, d, e) {
        b = _.hv(b);
        _.Ov(this, "listIdpSessions", {
            clientId: a,
            request: b,
            sessionSelector: c,
            forceRefresh: e
        }, d)
    }
    ;
    Qv = function(a, b, c) {
        Pv(b.identifier);
        _.Ov(a, "getSessionSelector", b, c)
    }
    ;
    _.Rv = function(a, b, c, d, e) {
        Pv(b.identifier);
        _.Ov(a, "setSessionSelector", {
            domain: b.domain,
            crossSubDomains: b.crossSubDomains,
            policy: b.policy,
            id: b.id,
            hint: d,
            disabled: !!c
        }, e)
    }
    ;
    Sv = function(a, b, c, d, e) {
        b = {
            clientId: b
        };
        c && (b.pluginName = c);
        d && (b.ackExtensionDate = d);
        _.Ov(a, "monitorClient", b, e)
    }
    ;
    _.Lv.prototype.revoke = _.ea(9);
    _.Lv.prototype.Lt = _.ea(11);
    ov.JA = {};
    ov.ZG = function(a) {
        return ov.JA[a]
    }
    ;
    ov.wB = function(a, b, c) {
        c = void 0 === c ? !1 : c;
        var d = ov.ZG(a);
        if (!d) {
            d = String;
            if (Ev) {
                var e = new window.Uint32Array(1);
                Dv.getRandomValues(e);
                e = Number("0." + e[0])
            } else
                e = Gv,
                e += parseInt(Iv.substr(0, 20), 16),
                Iv = Kv(Iv),
                e /= Hv + Math.pow(16, 20);
            d = new _.Lv(a,d(2147483647 * e),c);
            ov.JA[a] = d
        }
        d.wB(b)
    }
    ;
    ov.D8 = function(a) {
        for (var b in ov.JA) {
            var c = ov.ZG(b);
            if (c && c.Qo && c.Qo.contentWindow == a.source && c.ZH == a.origin)
                return c
        }
    }
    ;
    ov.m9 = function(a) {
        for (var b in ov.JA) {
            var c = ov.ZG(b);
            if (c && c.ZH == a)
                return c
        }
    }
    ;
    ov = ov || {};
    var Uv = function() {
        var a = [], b;
        for (b in Tv)
            a.push(Tv[b]);
        nv.call(this, a);
        this.Lm = {};
        cv("EventBus is ready.")
    };
    fv(Uv, nv);
    var Tv = {
        O4: "sessionSelectorChanged",
        HE: "sessionStateChanged",
        iE: "authResult",
        f2: "displayIFrame"
    }
      , Wv = function(a, b) {
        var c = Vv;
        a && b && (c.Lm[a] || (c.Lm[a] = []),
        0 > ev(c.Lm[a], b) && c.Lm[a].push(b))
    }
      , Xv = function(a) {
        var b = Vv;
        a && (b.Lm[a] || (b.Lm[a] = []))
    }
      , Yv = function(a, b, c) {
        return b && a.Lm[b] && 0 <= ev(a.Lm[b], c)
    };
    _.g = Uv.prototype;
    _.g.uda = function(a) {
        var b, c = !!a.source && (a.source === _.tv || a.source.opener === window);
        if (b = c ? ov.m9(a.origin) : ov.D8(a)) {
            try {
                var d = _.mv.parse(a.data)
            } catch (e) {
                cv("Bad event, an error happened when parsing data.");
                return
            }
            if (!c) {
                if (!d || !d.rpcToken || d.rpcToken != b.vn) {
                    cv("Bad event, no RPC token.");
                    return
                }
                if (d.id && !d.method) {
                    c = d;
                    if (a = b.kk[c.id])
                        delete b.kk[c.id],
                        a(c.result, c.error);
                    return
                }
            }
            "fireIdpEvent" != d.method ? cv("Bad IDP event, method unknown.") : (a = d.params) && a.type && this.TU[a.type] ? (d = this.TU[a.type],
            c && !d.O5 ? cv("Bad IDP event. Source window cannot be a popup.") : d.ct && !d.ct.call(this, b, a) ? cv("Bad IDP event.") : d.Uf.call(this, b, a)) : cv("Bad IDP event.")
        } else
            cv("Bad event, no corresponding Idp Stub.")
    }
    ;
    _.g.Rea = function(a, b) {
        return Yv(this, a.Kb, b.clientId)
    }
    ;
    _.g.Qea = function(a, b) {
        a = a.Kb;
        b = b.clientId;
        return !b || Yv(this, a, b)
    }
    ;
    _.g.c6 = function(a, b) {
        return Yv(this, a.Kb, b.clientId)
    }
    ;
    _.g.zca = function(a, b) {
        a.Po = !0;
        a.gx = !!b.cookieDisabled;
        Mv(a);
        for (b = 0; b < a.ms.length; b++)
            Nv(a, a.ms[b].Ip, a.ms[b].callback);
        a.ms = []
    }
    ;
    _.g.yca = function(a, b) {
        b = {
            error: b.error
        };
        a.Po = !0;
        a.YH = !0;
        a.QU = b;
        a.ms = [];
        Mv(a)
    }
    ;
    _.g.uC = function(a, b) {
        b.originIdp = a.Kb;
        this.dispatchEvent(b)
    }
    ;
    var Vv = new Uv
      , Zv = Vv
      , $v = {};
    $v.idpReady = {
        Uf: Zv.zca
    };
    $v.idpError = {
        Uf: Zv.yca
    };
    $v.sessionStateChanged = {
        Uf: Zv.uC,
        ct: Zv.Rea
    };
    $v.sessionSelectorChanged = {
        Uf: Zv.uC,
        ct: Zv.Qea
    };
    $v.authResult = {
        Uf: Zv.uC,
        ct: Zv.c6,
        O5: !0
    };
    $v.displayIFrame = {
        Uf: Zv.uC
    };
    Vv.TU = $v || {};
    jv(window, "message", function(a) {
        Vv.uda.call(Vv, a)
    });
    _.aw = function(a, b) {
        this.Ue = !1;
        if (!a)
            throw Error("ka");
        var c = [], d;
        for (d in a)
            c.push(a[d]);
        nv.call(this, c);
        this.Ld = [location.protocol, "//", location.host].join("");
        this.He = b.crossSubDomains ? b.domain || this.Ld : this.Ld;
        if (!b)
            throw Error("la");
        if (!b.idpId)
            throw Error("ma");
        if (!_.rv(b.idpId, "authServerUrl") || !_.rv(b.idpId, "idpIFrameUrl"))
            throw Error("na`" + b.idpId);
        this.Kb = b.idpId;
        this.qc = void 0;
        this.h7 = !!b.disableTokenRefresh;
        this.b8 = !!b.forceTokenRefresh;
        this.Qfa = !!b.skipTokenCache;
        this.Zw = !!b.supportBlocked3PCookies;
        b.pluginName && (this.jda = b.pluginName);
        b.ackExtensionDate && (this.E5 = b.ackExtensionDate);
        this.setOptions(b);
        this.Wt = [];
        this.gx = this.Qk = this.EV = !1;
        this.yj = void 0;
        this.PY();
        this.Zd = void 0;
        var e = this
          , f = function() {
            cv("Token Manager is ready.");
            if (e.Wt.length)
                for (var h = 0; h < e.Wt.length; h++)
                    e.Wt[h].call(e);
            e.EV = !0;
            e.Wt = []
        };
        ov.wB(this.Kb, function(h) {
            e.Zd = h;
            h.Po && h.YH ? (e.Qk = !0,
            e.yj = h.Ao(),
            e.Wr(e.yj)) : (e.gx = h.hB(),
            e.qc ? Sv(e.Zd, e.qc, e.jda, e.E5, function(k) {
                var l = !!k.validOrigin
                  , m = !!k.blocked
                  , n = !!k.suppressed;
                k.invalidExtension ? (e.yj = {
                    error: "Invalid value for ack_extension_date. Please refer to [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
                },
                e.Qk = !0,
                e.Wr(e.yj)) : l ? m ? n ? (dv("You have created a new client application that uses libraries for user authentication or authorization that are deprecated. New clients must use the new libraries instead. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."),
                Wv(e.Kb, e.qc),
                f()) : (e.yj = {
                    error: "You have created a new client application that uses libraries for user authentication or authorization that are deprecated. New clients must use the new libraries instead. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
                },
                e.Qk = !0,
                e.Wr(e.yj)) : (dv("Your client application uses libraries for user authentication or authorization that are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."),
                Wv(e.Kb, e.qc),
                f()) : (e.yj = {
                    error: "Not a valid origin for the client: " + e.Ld + " has not been registered for client ID " + e.qc + ". Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
                },
                e.Qk = !0,
                e.Wr(e.yj))
            }) : (Xv(e.Kb),
            f()))
        }, this.Zw)
    }
    ;
    fv(_.aw, nv);
    _.g = _.aw.prototype;
    _.g.setOptions = function() {}
    ;
    _.g.PY = function() {}
    ;
    _.g.Wr = function() {}
    ;
    _.g.hB = function() {
        return this.gx
    }
    ;
    _.g.Ao = function() {
        return this.yj
    }
    ;
    bw = function(a, b, c) {
        return function() {
            b.apply(a, c)
        }
    }
    ;
    _.cw = function(a, b, c) {
        if (a.EV)
            b.apply(a, c);
        else {
            if (a.Qk)
                throw a.yj;
            a.Wt.push(bw(a, b, c))
        }
    }
    ;
    _.aw.prototype.lQ = _.ea(12);
    _.aw.prototype.Lt = _.ea(10);
    _.ew = function(a, b) {
        _.aw.call(this, a, b);
        this.jY = new vv;
        this.fl = this.vp = null;
        dw(this)
    }
    ;
    fv(_.ew, _.aw);
    _.ew.prototype.setOptions = function() {}
    ;
    var fw = function(a, b) {
        a.Re = {
            crossSubDomains: !!b.crossSubDomains,
            id: b.sessionSelectorId,
            domain: a.He
        };
        b.crossSubDomains && (a.Re.policy = b.policy)
    }
      , gw = function(a, b) {
        if (!b.authParameters)
            throw Error("oa");
        if (!b.authParameters.scope)
            throw Error("pa");
        if (!b.authParameters.response_type)
            throw Error("qa");
        a.Ct = b.authParameters;
        a.Ct.redirect_uri || (a.Ct.redirect_uri = [location.protocol, "//", location.host, location.pathname].join(""));
        a.Pj = _.hv(b.rpcAuthParameters || a.Ct);
        if (!a.Pj.scope)
            throw Error("ra");
        if (!a.Pj.response_type)
            throw Error("sa");
        a: {
            var c = a.Pj.response_type.split(" ");
            for (var d = 0, e = c.length; d < e; d++)
                if (c[d] && !kv[c[d]]) {
                    c = !0;
                    break a
                }
            c = !1
        }
        if (c)
            throw Error("ta");
        b.enableSerialConsent && (a.Pj.enable_serial_consent = !0);
        b.authResultIdentifier && (a.d6 = b.authResultIdentifier);
        b.spec_compliant && (a.Pj.spec_compliant = b.spec_compliant)
    };
    _.ew.prototype.PY = function() {
        var a = this;
        Vv.addEventListener(Tv.O4, function(b) {
            a.Ue && a.Re && b.originIdp == a.Kb && !b.crossSubDomains == !a.Re.crossSubDomains && b.domain == a.Re.domain && b.id == a.Re.id && a.zX(b)
        });
        Vv.addEventListener(Tv.HE, function(b) {
            a.Ue && b.originIdp == a.Kb && b.clientId == a.qc && a.AX(b)
        });
        Vv.addEventListener(Tv.iE, function(b) {
            _.tv = void 0;
            a.Ue && b.originIdp == a.Kb && b.clientId == a.qc && b.id == a.Yk && (a.vp && (window.clearTimeout(a.vp),
            a.vp = null),
            a.Yk = void 0,
            a.Lv(b))
        });
        Vv.addEventListener(Tv.f2, function(b) {
            a.Ue && b.originIdp == a.Kb && (b.kc ? a.Zd.kc() : a.Zd.show())
        })
    }
    ;
    _.ew.prototype.zX = function() {}
    ;
    _.ew.prototype.AX = function() {}
    ;
    _.ew.prototype.Lv = function() {}
    ;
    var iw = function(a, b) {
        hw(a);
        a.h7 || (a.fl = pv.Z6(function() {
            a.Fj(!0)
        }, b - 3E5),
        navigator.onLine && a.fl.start())
    }
      , hw = function(a) {
        a.fl && (a.fl.clear(),
        a.fl = null)
    }
      , dw = function(a) {
        var b = window;
        lv() && (b = document.body);
        jv(b, "online", function() {
            a.fl && a.fl.start()
        });
        jv(b, "offline", function() {
            a.fl && a.fl.clear()
        })
    };
    _.ew.prototype.Fj = function() {}
    ;
    _.ew.prototype.cX = _.ea(13);
    _.ew.prototype.tba = function(a, b) {
        if (!this.qc)
            throw Error("xa");
        this.Zd.uB(this.qc, this.Pj, this.Re, a, b)
    }
    ;
    _.ew.prototype.uB = function(a, b) {
        _.cw(this, this.tba, [a, b])
    }
    ;
    _.kw = function(a) {
        this.Me = void 0;
        this.Wh = !1;
        this.As = void 0;
        _.ew.call(this, _.jw, a)
    }
    ;
    fv(_.kw, _.ew);
    _.jw = {
        uO: "noSessionBound",
        tt: "userLoggedOut",
        A1: "activeSessionChanged",
        HE: "sessionStateChanged",
        UO: "tokenReady",
        e5: "tokenFailed",
        iE: "authResult",
        ERROR: "error"
    };
    _.kw.prototype.setOptions = function(a) {
        if (!a.clientId)
            throw Error("ya");
        this.qc = a.clientId;
        this.Ga = a.id;
        fw(this, a);
        gw(this, a)
    }
    ;
    _.kw.prototype.Wr = function(a) {
        this.dispatchEvent({
            type: _.jw.ERROR,
            error: "idpiframe_initialization_failed",
            details: a.error,
            idpId: this.Kb
        })
    }
    ;
    var lw = function(a) {
        hw(a);
        a.As = void 0;
        a.qB = void 0
    };
    _.g = _.kw.prototype;
    _.g.zX = function(a) {
        var b = a.newValue || {};
        if (this.Me != b.hint || this.Wh != !!b.disabled) {
            a = this.Me;
            var c = !this.Me || this.Wh;
            lw(this);
            this.Me = b.hint;
            this.Wh = !!b.disabled;
            (b = !this.Me || this.Wh) && !c ? this.dispatchEvent({
                type: _.jw.tt,
                idpId: this.Kb
            }) : b || (a != this.Me && this.dispatchEvent({
                type: _.jw.A1,
                idpId: this.Kb
            }),
            this.Me && this.Fj())
        }
    }
    ;
    _.g.AX = function(a) {
        this.Wh || (this.Me ? a.user || this.As ? a.user == this.Me && (this.As ? a.sessionState ? this.As = a.sessionState : (lw(this),
        this.dispatchEvent({
            type: _.jw.tt,
            idpId: this.Kb
        })) : a.sessionState && (this.As = a.sessionState,
        this.Fj())) : this.Fj() : this.dispatchEvent({
            type: _.jw.HE,
            idpId: this.Kb
        }))
    }
    ;
    _.g.Lv = function(a) {
        this.dispatchEvent({
            type: _.jw.iE,
            authResult: a.authResult
        })
    }
    ;
    _.g.Eu = _.ea(15);
    _.g.yu = function(a) {
        _.cw(this, this.MG, [a])
    }
    ;
    _.g.MG = function(a) {
        Qv(this.Zd, this.Re, a)
    }
    ;
    _.g.GD = function(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        if (!a)
            throw Error("za");
        lw(this);
        this.Me = a;
        this.Wh = !1;
        b && _.Rv(this.Zd, this.Re, !1, this.Me);
        this.Ue = !0;
        this.Fj(c, !0, d)
    }
    ;
    _.g.start = function() {
        _.cw(this, this.Qw, [])
    }
    ;
    _.g.Qw = function() {
        var a = this.qc == iv("client_id") ? iv("login_hint") : void 0;
        var b = this.qc == iv("client_id") ? iv("state") : void 0;
        this.vJ = b;
        if (a)
            window.history.replaceState ? window.history.replaceState(null, document.title, window.location.href.split("#")[0]) : window.location.href.hash = "",
            this.GD(a, !0, !0, !0);
        else {
            var c = this;
            this.yu(function(d) {
                c.Ue = !0;
                d && d.hint ? (lw(c),
                c.Me = d.hint,
                c.Wh = !!d.disabled,
                c.Wh ? c.dispatchEvent({
                    type: _.jw.tt,
                    idpId: c.Kb
                }) : c.GD(d.hint)) : (lw(c),
                c.Me = void 0,
                c.Wh = !(!d || !d.disabled),
                c.dispatchEvent({
                    type: _.jw.uO,
                    autoOpenAuthUrl: !c.Wh,
                    idpId: c.Kb
                }))
            })
        }
    }
    ;
    _.g.Y7 = function() {
        var a = this;
        this.yu(function(b) {
            b && b.hint ? b.disabled ? a.dispatchEvent({
                type: _.jw.tt,
                idpId: a.Kb
            }) : a.Fj(!0) : a.dispatchEvent({
                type: _.jw.uO,
                idpId: a.Kb
            })
        })
    }
    ;
    _.g.MS = function() {
        _.cw(this, this.Y7, [])
    }
    ;
    _.g.Fj = function(a, b, c) {
        var d = this;
        this.Zd.Fj(this.qc, this.Pj, this.Me, this.Re, function(e, f) {
            (f = f || e.error) ? "user_logged_out" == f ? (lw(d),
            d.dispatchEvent({
                type: _.jw.tt,
                idpId: d.Kb
            })) : (d.qB = null,
            d.dispatchEvent({
                type: _.jw.e5,
                idpId: d.Kb,
                error: f
            })) : (d.qB = e,
            d.As = e.session_state,
            iw(d, e.expires_at),
            e.idpId = d.Kb,
            b && d.vJ && (e.state = d.vJ,
            d.vJ = void 0),
            d.dispatchEvent({
                type: _.jw.UO,
                idpId: d.Kb,
                response: e
            }))
        }, this.Ga, a, !1, void 0 === c ? !1 : c)
    }
    ;
    _.g.revoke = _.ea(8);
    _.g.iZ = _.ea(16);
    _.mw = function(a) {
        this.Ln = null;
        _.ew.call(this, {}, a);
        this.Ue = !0
    }
    ;
    fv(_.mw, _.ew);
    _.g = _.mw.prototype;
    _.g.setOptions = function(a) {
        if (!a.clientId)
            throw Error("ya");
        this.qc = a.clientId;
        this.Ga = a.id;
        fw(this, a);
        gw(this, a)
    }
    ;
    _.g.Wr = function(a) {
        this.Ln && (this.Ln({
            authResult: {
                error: "idpiframe_initialization_failed",
                details: a.error
            }
        }),
        this.Ln = null)
    }
    ;
    _.g.Lv = function(a) {
        if (this.Ln) {
            var b = this.Ln;
            this.Ln = null;
            b(a)
        }
    }
    ;
    _.g.Eu = _.ea(14);
    _.g.yu = function(a) {
        this.Qk ? a(this.Ao()) : _.cw(this, this.MG, [a])
    }
    ;
    _.g.MG = function(a) {
        Qv(this.Zd, this.Re, a)
    }
    ;
    _.nw = function(a, b, c) {
        a.Qk ? c(a.Ao()) : _.cw(a, a.Oca, [b, c])
    }
    ;
    _.mw.prototype.Oca = function(a, b) {
        this.Zd.Fj(this.qc, this.Pj, a, this.Re, function(c, d) {
            d ? b({
                error: d
            }) : b(c)
        }, this.Ga, this.b8, this.Qfa)
    }
    ;
    _.mw.prototype.pW = _.ea(17);
    var ow = function(a) {
        return Array.prototype.concat.apply([], arguments)
    }, pw = function() {
        try {
            var a = Array.from((window.crypto || window.msCrypto).getRandomValues(new Uint8Array(64)))
        } catch (c) {
            a = [];
            for (var b = 0; 64 > b; b++)
                a[b] = Math.floor(256 * Math.random())
        }
        return _.Gi(a, 3).substring(0, 64)
    }, qw = function() {
        var a = navigator.userAgent.toLowerCase();
        return 0 > a.indexOf("edge/") && (-1 < a.indexOf("chrome/") || -1 < a.indexOf("crios/"))
    }, rw = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 < a.indexOf("firefox/") && 0 > a.indexOf("chrome/") && 0 > a.indexOf("crios/") && 0 > a.indexOf("safari/")
    }, sw = function(a, b, c) {
        if (!a.Ue)
            throw Error("ua");
        b ? _.Rv(a.Zd, a.Re, !0, void 0, c) : _.Rv(a.Zd, a.Re, !0, a.Me, c)
    }, tw = function(a) {
        if (!a.Ue)
            throw Error("ua");
        return a.qB
    }, uw, vw, ww, xw, yw, zw, Aw, Bw, Cw, Ew;
    _.mw.prototype.pW = _.hb(17, function(a, b) {
        var c = this.Zd
          , d = this.qc
          , e = this.Re
          , f = _.hv(this.Pj);
        delete f.response_type;
        _.Ov(c, "getOnlineCode", {
            clientId: d,
            loginHint: a,
            request: f,
            sessionSelector: e
        }, b)
    });
    _.kw.prototype.iZ = _.hb(16, function(a) {
        tw(this) && tw(this).access_token && (this.Zd.revoke(this.qc, tw(this).access_token, a),
        sw(this, !0))
    });
    _.kw.prototype.Eu = _.hb(15, function() {
        var a = this;
        return function(b) {
            if (b && b.authResult && b.authResult.login_hint)
                if (a.hB() && a.Zw && (qw() || rw())) {
                    b = b.authResult;
                    var c = Date.now()
                      , d = b.expires_in;
                    b = {
                        access_token: b.access_token,
                        token_type: b.token_type,
                        login_hint: b.login_hint,
                        expires_in: d,
                        id_token: b.id_token,
                        scope: b.scope,
                        first_issued_at: c,
                        expires_at: c + 1E3 * d,
                        idpId: a.Kb
                    };
                    a.qB = b;
                    a.dispatchEvent({
                        type: _.jw.UO,
                        idpId: a.Kb,
                        response: b
                    })
                } else
                    a.GD(b.authResult.login_hint, a.Wh || b.authResult.login_hint != a.Me, !0, !0)
        }
    });
    _.mw.prototype.Eu = _.hb(14, function(a) {
        var b = this;
        return function(c) {
            c && c.authResult && c.authResult.login_hint ? b.yu(function(d) {
                _.Rv(b.Zd, b.Re, d && d.disabled, c.authResult.login_hint, function() {
                    _.nw(b, c.authResult.login_hint, a)
                })
            }) : a(c && c.authResult && c.authResult.error ? c.authResult : c && c.authResult && !c.authResult.login_hint ? {
                error: "wrong_response_type"
            } : {
                error: "unknown_error"
            })
        }
    });
    _.ew.prototype.cX = _.hb(13, function() {
        this.qc && _.Ov(this.Zd, "startPolling", {
            clientId: this.qc,
            origin: this.Ld,
            id: this.Yk
        })
    });
    _.Lv.prototype.revoke = _.hb(9, function(a, b, c) {
        _.Ov(this, "revoke", {
            clientId: a,
            token: b
        }, c)
    });
    _.kw.prototype.revoke = _.hb(8, function(a) {
        _.cw(this, this.iZ, [a])
    });
    uw = function() {
        var a = navigator.userAgent, b;
        if (b = !!a && -1 != a.indexOf("CriOS"))
            b = -1,
            (a = a.match(/CriOS\/(\d+)/)) && a[1] && (b = parseInt(a[1], 10) || -1),
            b = 48 > b;
        return b
    }
    ;
    vw = function() {
        var a = navigator.userAgent.toLowerCase();
        if (!(-1 < a.indexOf("safari/") && 0 > a.indexOf("chrome/") && 0 > a.indexOf("crios/") && 0 > a.indexOf("android")))
            return !1;
        var b = RegExp("version/(\\d+)\\.(\\d+)[\\.0-9]*").exec(navigator.userAgent.toLowerCase());
        if (!b || 3 > b.length)
            return !1;
        a = parseInt(b[1], 10);
        b = parseInt(b[2], 10);
        return 12 < a || 12 == a && 1 <= b
    }
    ;
    ww = function(a, b, c, d, e, f, h) {
        var k = _.rv(a, "authServerUrl");
        if (!k)
            throw Error("ea`" + a);
        a = _.hv(d);
        a.response_type = h || "permission";
        a.client_id = c;
        a.ss_domain = b;
        if (f && f.extraQueryParams)
            for (var l in f.extraQueryParams)
                a[l] = f.extraQueryParams[l];
        (b = e) && !(b = vw()) && (b = navigator.userAgent.toLowerCase(),
        -1 < b.indexOf("ipad;") || -1 < b.indexOf("iphone;") ? (b = RegExp("os (\\d+)_\\d+(_\\d+)? like mac os x").exec(navigator.userAgent.toLowerCase()),
        b = !b || 2 > b.length ? !1 : 14 <= parseInt(b[1], 10)) : b = !1);
        b && !a.prompt && (a.prompt = "select_account");
        k += 0 > k.indexOf("?") ? "?" : "&";
        b = [];
        for (var m in a)
            if (a.hasOwnProperty(m)) {
                c = a[m];
                if (null === c || void 0 === c)
                    c = "";
                b.push(encodeURIComponent(m) + "=" + encodeURIComponent(c))
            }
        return k + b.join("&")
    }
    ;
    xw = function(a, b, c, d) {
        if (!a.qc)
            throw Error("va");
        a.Yk = c || a.d6 || "auth" + Math.floor(1E6 * Math.random() + 1);
        b = b || {};
        b.extraQueryParams = b.extraQueryParams || {};
        if (!b.extraQueryParams.redirect_uri) {
            var e = a.Ld.split("//");
            c = b.extraQueryParams;
            var f = e[0]
              , h = f.indexOf(":");
            0 < h && (f = f.substring(0, h));
            e = ["storagerelay://", f, "/", e[1], "?"];
            e.push("id=" + a.Yk);
            c.redirect_uri = e.join("")
        }
        return ww(a.Kb, a.He, a.qc, a.Ct, !0, b, d)
    }
    ;
    yw = function(a, b, c) {
        if (!a.qc)
            throw Error("va");
        return ww(a.Kb, a.He, a.qc, a.Ct, !1, b, c)
    }
    ;
    zw = function(a) {
        if (!a)
            return "permission token";
        var b = a.split(" ");
        if (-1 < b.indexOf("token") || -1 < b.indexOf("code") || -1 < b.indexOf("gsession"))
            return a;
        b.push("token");
        return b.join(" ")
    }
    ;
    Aw = function(a, b) {
        a.vp && window.clearTimeout(a.vp);
        a.vp = window.setTimeout(function() {
            a.Yk == b && (_.tv = void 0,
            a.vp = null,
            a.Yk = void 0,
            a.Lv({
                authResult: {
                    error: "popup_closed_by_user"
                }
            }))
        }, 1E3)
    }
    ;
    Bw = function(a, b, c) {
        if (!a.qc)
            throw Error("wa");
        c = c || {};
        a.hB() && a.Zw && (qw() || rw()) && (c.responseType = zw(c.responseType));
        c = xw(a, c.sessionMeta, c.oneTimeId, c.responseType);
        (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject || uw()) && _.cw(a, a.cX, []);
        var d = a.Yk;
        a.jY.open(c, b, function() {
            a.Yk == d && Aw(a, d)
        }, function() {
            a.Yk = void 0;
            a.Lv({
                authResult: {
                    error: "popup_blocked_by_browser"
                }
            })
        })
    }
    ;
    Cw = function(a, b, c) {
        a.Qk ? c(a.Ao()) : _.cw(a, a.pW, [b, c])
    }
    ;
    _.Dw = function(a) {
        for (var b = [], c = 0, d = 0; c < a.length; ) {
            var e = a[c++];
            if (128 > e)
                b[d++] = String.fromCharCode(e);
            else if (191 < e && 224 > e) {
                var f = a[c++];
                b[d++] = String.fromCharCode((e & 31) << 6 | f & 63)
            } else if (239 < e && 365 > e) {
                f = a[c++];
                var h = a[c++]
                  , k = a[c++];
                e = ((e & 7) << 18 | (f & 63) << 12 | (h & 63) << 6 | k & 63) - 65536;
                b[d++] = String.fromCharCode(55296 + (e >> 10));
                b[d++] = String.fromCharCode(56320 + (e & 1023))
            } else
                f = a[c++],
                h = a[c++],
                b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | h & 63)
        }
        return b.join("")
    }
    ;
    Ew = function(a) {
        var b = [];
        _.Hi(a, function(c) {
            b.push(c)
        });
        return b
    }
    ;
    _.Fw = function(a, b) {
        _.oj[b || "token"] = a
    }
    ;
    _.Gw = function(a) {
        delete _.oj[a || "token"]
    }
    ;
    _.mv = {
        parse: function(a) {
            a = _.Hg("[" + String(a) + "]");
            if (!1 === a || 1 !== a.length)
                throw new SyntaxError("JSON parsing failed.");
            return a[0]
        },
        stringify: function(a) {
            return _.Ig(a)
        }
    };
    _.mw.prototype.yG = function(a, b) {
        _.cw(this, this.O7, [a, b])
    }
    ;
    _.mw.prototype.O7 = function(a, b) {
        this.Zd.yG(this.qc, a, this.Pj, this.Re, b)
    }
    ;
    _.Lv.prototype.yG = function(a, b, c, d, e) {
        c = _.hv(c);
        _.Ov(this, "gsi:fetchLoginHint", {
            clientId: a,
            loginHint: b,
            request: c,
            sessionSelector: d
        }, e)
    }
    ;
    var Hw, Iw = ["client_id", "cookie_policy", "scope"], Jw = "client_id cookie_policy fetch_basic_profile hosted_domain scope openid_realm disable_token_refresh login_hint ux_mode redirect_uri state prompt oidc_spec_compliant nonce enable_serial_consent include_granted_scopes response_type session_selection plugin_name ack_extension_date gsiwebsdk".split(" "), Kw = ["authuser", "after_redirect", "access_type", "hl"], Lw = ["login_hint", "prompt"], Mw = {
        clientid: "client_id",
        cookiepolicy: "cookie_policy"
    }, Nw = ["approval_prompt", "authuser", "login_hint", "prompt", "hd"], Ow = ["login_hint", "g-oauth-window", "status"], Pw = Math.min(_.zf("oauth-flow/authWindowWidth", 599), screen.width - 20), Qw = Math.min(_.zf("oauth-flow/authWindowHeight", 600), screen.height - 30);
    var Rw = function(a) {
        _.ib.call(this, a)
    };
    _.E(Rw, _.ib);
    Rw.prototype.name = "gapi.auth2.ExternallyVisibleError";
    var Sw = function() {};
    Sw.prototype.select = function(a, b) {
        if (a.sessions && 1 == a.sessions.length && (a = a.sessions[0],
        a.login_hint)) {
            b(a);
            return
        }
        b()
    }
    ;
    var Tw = function() {};
    Tw.prototype.select = function(a, b) {
        if (a.sessions && a.sessions.length)
            for (var c = 0; c < a.sessions.length; c++) {
                var d = a.sessions[c];
                if (d.login_hint) {
                    b(d);
                    return
                }
            }
        b()
    }
    ;
    var Uw = function(a) {
        this.e6 = a
    };
    Uw.prototype.select = function(a, b) {
        if (a.sessions)
            for (var c = 0; c < a.sessions.length; c++) {
                var d = a.sessions[c];
                if (d.session_state && d.session_state.extraQueryParams && d.session_state.extraQueryParams.authuser == this.e6) {
                    d.login_hint ? b(d) : b();
                    return
                }
            }
        b()
    }
    ;
    var Vw = function(a) {
        this.Ce = a;
        this.YC = []
    };
    Vw.prototype.select = function(a) {
        var b = 0
          , c = this
          , d = function(e) {
            if (e)
                a(e);
            else {
                var f = c.YC[b];
                f ? (b++,
                c.Ce.uB(function(h) {
                    h ? f.select(h, d) : d()
                })) : a()
            }
        };
        d()
    }
    ;
    var Ww = function(a) {
        a = new Vw(a);
        a.YC.push(new Sw);
        return a
    }
      , Xw = function(a) {
        a = new Vw(a);
        a.YC.push(new Tw);
        return a
    }
      , Yw = function(a, b) {
        void 0 === b || null === b ? b = Ww(a) : (a = new Vw(a),
        a.YC.push(new Uw(b)),
        b = a);
        return b
    };
    var Zw = function(a) {
        this.Uf = a;
        this.isActive = !0
    };
    Zw.prototype.remove = function() {
        this.isActive = !1
    }
    ;
    Zw.prototype.trigger = function() {}
    ;
    var $w = function(a) {
        this.remove = function() {
            a.remove()
        }
        ;
        this.trigger = function() {
            a.trigger()
        }
    }
      , ax = function() {
        this.zc = []
    };
    ax.prototype.add = function(a) {
        this.zc.push(a)
    }
    ;
    ax.prototype.notify = function(a) {
        for (var b = this.zc, c = [], d = 0; d < b.length; d++) {
            var e = b[d];
            e.isActive && (c.push(e),
            _.Sk(bx(e.Uf, a)))
        }
        this.zc = c
    }
    ;
    var bx = function(a, b) {
        return function() {
            a(b)
        }
    };
    var dx = function(a) {
        this.Ba = null;
        this.Oga = new cx(this);
        this.zc = new ax;
        void 0 != a && this.set(a)
    };
    dx.prototype.set = function(a) {
        a != this.Ba && (this.Ba = a,
        this.Oga.value = a,
        this.zc.notify(this.Ba))
    }
    ;
    dx.prototype.get = function() {
        return this.Ba
    }
    ;
    dx.prototype.ma = function(a) {
        a = new ex(this,a);
        this.zc.add(a);
        return a
    }
    ;
    dx.prototype.get = dx.prototype.get;
    var ex = function(a, b) {
        Zw.call(this, b);
        this.xba = a
    };
    _.E(ex, Zw);
    ex.prototype.trigger = function() {
        var a = this.Uf;
        a(this.xba.get())
    }
    ;
    var cx = function(a) {
        this.value = null;
        this.ma = function(b) {
            return new $w(a.ma(b))
        }
    };
    var fx = {
        eja: "fetch_basic_profile",
        fka: "login_hint",
        yla: "prompt",
        Ela: "redirect_uri",
        Wla: "scope",
        nna: "ux_mode",
        Gma: "state"
    }
      , gx = function(a) {
        this.Oa = {};
        if (a && !_.xi(a))
            if ("function" == typeof a.get)
                this.Oa = a.get();
            else
                for (var b in fx) {
                    var c = fx[b];
                    c in a && (this.Oa[c] = a[c])
                }
    };
    gx.prototype.get = function() {
        return this.Oa
    }
    ;
    gx.prototype.h_ = function(a) {
        this.Oa.scope = a;
        return this
    }
    ;
    gx.prototype.Nu = function() {
        return this.Oa.scope
    }
    ;
    var hx = function(a, b) {
        var c = a.Oa.scope;
        b = ow(b.split(" "), c ? c.split(" ") : []);
        _.Hk(b);
        a.Oa.scope = b.join(" ")
    };
    _.g = gx.prototype;
    _.g.sfa = function(a) {
        this.Oa.prompt = a;
        return this
    }
    ;
    _.g.o9 = function() {
        return this.Oa.prompt
    }
    ;
    _.g.Uea = function() {
        _.Mg.warn("Property app_package_name no longer supported and was not set");
        return this
    }
    ;
    _.g.l8 = function() {
        _.Mg.warn("Property app_package_name no longer supported")
    }
    ;
    _.g.Hf = function(a) {
        this.Oa.state = a
    }
    ;
    _.g.getState = function() {
        return this.Oa.state
    }
    ;
    var ix = function() {
        return ["toolbar=no", "location=" + (window.opera ? "no" : "yes"), "directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no", "width=" + Pw, "height=" + Qw, "top=" + (screen.height - Qw) / 2, "left=" + (screen.width - Pw) / 2].join()
    }
      , jx = function(a) {
        a = a && a.id_token;
        if (!a || !a.split(".")[1])
            return null;
        a = (a.split(".")[1] + "...").replace(/^((....)+).?.?.?$/, "$1");
        return JSON.parse(_.Dw(Ew(a)))
    }
      , kx = function() {
        Hw = _.zf("auth2/idpValue", "google");
        var a = _.zf("oauth-flow/authUrl", "https://accounts.google.com/o/oauth2/auth")
          , b = _.zf("oauth-flow/idpIframeUrl", "https://accounts.google.com/o/oauth2/iframe");
        _.sv(Hw, {
            authServerUrl: a,
            idpIFrameUrl: b
        })
    }
      , lx = function(a, b, c) {
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (d === b.length - 1) {
                a[e] = c;
                break
            }
            _.Rb(a[e]) || (a[e] = {});
            a = a[e]
        }
    }
      , mx = function() {
        var a = window.location.origin;
        a || (a = window.location.protocol + "//" + window.location.host);
        return a
    }
      , ox = function() {
        var a = nx();
        a.storage_path && window.sessionStorage.setItem(a.storage_path, mx() + window.location.pathname);
        if ("enforced" == a.status.toLowerCase())
            throw new Rw("gapi.auth2 is disabled on this website, but it is still used on page " + window.location.href);
        "informational" == a.status.toLowerCase() && _.Mg.warn("gapi.auth2 is disabled on this website, but it is still used on page " + window.location.href)
    };
    var px = function(a) {
        var b = a ? (b = jx(a)) ? b.sub : null : null;
        this.Ga = b;
        this.Tc = a ? _.Jk(a) : null
    };
    _.g = px.prototype;
    _.g.getId = function() {
        return this.Ga
    }
    ;
    _.g.WG = function() {
        var a = jx(this.Tc);
        return a ? a.hd : null
    }
    ;
    _.g.Kg = function() {
        return !!this.Tc
    }
    ;
    _.g.rm = function(a) {
        if (a)
            return this.Tc;
        a = qx;
        var b = _.Jk(this.Tc);
        !a.WA || a.TH || a.W$ || (delete b.access_token,
        delete b.scope);
        return b
    }
    ;
    _.g.qK = function() {
        return qx.qK()
    }
    ;
    _.g.Al = function() {
        this.Tc = null
    }
    ;
    _.g.N8 = function() {
        return this.Tc ? this.Tc.scope : null
    }
    ;
    _.g.update = function(a) {
        this.Ga = a.Ga;
        this.Tc = a.Tc;
        this.Tc.id_token ? this.uy = new rx(this.Tc) : this.uy && (this.uy = null)
    }
    ;
    var sx = function(a) {
        return a.Tc && "object" == typeof a.Tc.session_state ? _.Jk(a.Tc.session_state.extraQueryParams || {}) : {}
    };
    _.g = px.prototype;
    _.g.KG = function() {
        var a = sx(this);
        return a && void 0 !== a.authuser && null !== a.authuser ? a.authuser : null
    }
    ;
    _.g.zl = function(a) {
        var b = qx
          , c = new gx(a);
        b.TH = c.Nu() ? !0 : !1;
        qx.WA && hx(c, "openid profile email");
        return new _.cl(function(d, e) {
            var f = sx(this);
            f.login_hint = this.getId();
            f.scope = c.Nu();
            tx(b, d, e, f)
        }
        ,this)
    }
    ;
    _.g.Qu = function(a) {
        return new _.cl(function(b, c) {
            var d = a || {}
              , e = qx;
            d.login_hint = this.getId();
            e.Qu(d).then(b, c)
        }
        ,this)
    }
    ;
    _.g.J9 = function(a) {
        return this.zl(a)
    }
    ;
    _.g.disconnect = function() {
        return qx.disconnect()
    }
    ;
    _.g.n8 = function() {
        return this.uy
    }
    ;
    _.g.DA = function(a) {
        if (!this.Kg())
            return !1;
        var b = this.Tc && this.Tc.scope ? this.Tc.scope.split(" ") : "";
        return _.uc(a ? a.split(" ") : [], function(c) {
            return _.mb(b, c)
        })
    }
    ;
    var rx = function(a) {
        a = jx(a);
        this.g8 = a.sub;
        this.eg = a.name;
        this.E9 = a.given_name;
        this.M7 = a.family_name;
        this.ZU = a.picture;
        this.lz = a.email
    };
    _.g = rx.prototype;
    _.g.getId = function() {
        return this.g8
    }
    ;
    _.g.Gg = function() {
        return this.eg
    }
    ;
    _.g.L8 = function() {
        return this.E9
    }
    ;
    _.g.G8 = function() {
        return this.M7
    }
    ;
    _.g.U8 = function() {
        return this.ZU
    }
    ;
    _.g.uo = function() {
        return this.lz
    }
    ;
    var nx, ux;
    nx = function() {
        var a = _.dj.get("G_AUTH2_MIGRATION");
        if (!a)
            return {
                status: "none"
            };
        a = /(enforced|informational)(?::(.*))?/i.exec(a);
        return a ? {
            status: a[1].toLowerCase(),
            storage_path: a[2]
        } : (_.Mg.warn("The G_AUTH2_MIGRATION cookie value is not valid."),
        {
            status: "none"
        })
    }
    ;
    ux = function(a) {
        var b = location;
        if (a && "none" != a)
            return "single_host_origin" == a ? b.protocol + "//" + b.host : a
    }
    ;
    _.vx = function(a) {
        if (!a)
            throw new Rw("No cookiePolicy");
        var b = window.location.hostname;
        "single_host_origin" == a && (a = window.location.protocol + "//" + b);
        if ("none" == a)
            return null;
        var c = /^(https?:\/\/)([0-9.\-_A-Za-z]+)(?::(\d+))?$/.exec(a);
        if (!c)
            throw new Rw("Invalid cookiePolicy");
        a = c[2];
        c = c[1];
        var d = {};
        d.dotValue = a.split(".").length;
        d.isSecure = -1 != c.indexOf("https");
        d.domain = a;
        if (!_.Rj(b, "." + a) && !_.Rj(b, a))
            throw new Rw("Invalid cookiePolicy domain");
        return d
    }
    ;
    var xx = function(a) {
        var b = a || {}
          , c = wx();
        _.oc(Jw, function(d) {
            "undefined" === typeof b[d] && "undefined" !== typeof c[d] && (b[d] = c[d])
        });
        return b
    }
      , wx = function() {
        for (var a = {}, b = document.getElementsByTagName("meta"), c = 0; c < b.length; ++c)
            if (b[c].name) {
                var d = b[c].name;
                if (0 == d.indexOf("google-signin-")) {
                    d = d.substring(14);
                    var e = b[c].content;
                    Mw[d] && (d = Mw[d]);
                    _.mb(Jw, d) && e && (a[d] = "true" == e ? !0 : "false" == e ? !1 : e)
                }
            }
        return a
    }
      , yx = function(a) {
        return String(a).replace(/_([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
      , zx = function(a) {
        _.oc(Jw, function(b) {
            var c = yx(b);
            "undefined" !== typeof a[c] && "undefined" === typeof a[b] && (a[b] = a[c],
            delete a[c])
        })
    }
      , Ax = function(a) {
        a = xx(a);
        zx(a);
        a.cookie_policy || (a.cookie_policy = "single_host_origin");
        var b = Jw + Kw, c;
        for (c in a)
            0 > b.indexOf(c) && delete a[c];
        return a
    }
      , Bx = function(a, b) {
        if (!a)
            throw new Rw("Empty initial options.");
        for (var c = 0; c < Iw.length; ++c)
            if (!(b && "scope" == Iw[c] || a[Iw[c]]))
                throw new Rw("Missing required parameter '" + Iw[c] + "'");
        _.vx(a.cookie_policy)
    }
      , Dx = function(a) {
        var b = {
            authParameters: {
                redirect_uri: void 0,
                response_type: "token id_token",
                scope: a.scope,
                "openid.realm": a.openid_realm,
                include_granted_scopes: !0
            },
            clientId: a.client_id,
            crossSubDomains: !0,
            domain: ux(a.cookie_policy),
            disableTokenRefresh: !!a.disable_token_refresh,
            idpId: Hw
        };
        Cx(b, a);
        _.oc(Lw, function(d) {
            a[d] && (b.authParameters[d] = a[d])
        });
        "boolean" == typeof a.enable_serial_consent && (b.enableSerialConsent = a.enable_serial_consent);
        if (a.plugin_name)
            b.pluginName = a.plugin_name;
        else {
            var c = _.zf("auth2/pluginName");
            c && (b.pluginName = c)
        }
        a.ack_extension_date && (b.authParameters.ack_extension_date = a.ack_extension_date,
        b.ackExtensionDate = a.ack_extension_date);
        return b
    }
      , Cx = function(a, b) {
        var c = b.oidc_spec_compliant;
        b = b.nonce;
        c && (a.spec_compliant = c,
        b = b || pw());
        b && (a.authParameters.nonce = b,
        a.forceTokenRefresh = !0,
        a.skipTokenCache = !0)
    }
      , Ix = function(a) {
        var b = a.client_id
          , c = a.cookie_policy
          , d = a.scope
          , e = a.openid_realm
          , f = a.hosted_domain
          , h = a.oidc_spec_compliant
          , k = a.nonce
          , l = Ex(a)
          , m = {
            authParameters: {
                response_type: l,
                scope: d,
                "openid.realm": e
            },
            rpcAuthParameters: {
                response_type: l,
                scope: d,
                "openid.realm": e
            },
            clientId: b,
            crossSubDomains: !0,
            domain: ux(c),
            idpId: Hw
        };
        f && (m.authParameters.hd = f,
        m.rpcAuthParameters.hd = f);
        h && (m.rpcAuthParameters.spec_compliant = h,
        k = k || pw());
        k && (m.authParameters.nonce = k,
        m.rpcAuthParameters.nonce = k,
        m.forceTokenRefresh = !0,
        m.skipTokenCache = !0);
        _.oc(Lw.concat(Kw), function(n) {
            a[n] && (m.authParameters[n] = a[n])
        });
        void 0 !== a.authuser && null !== a.authuser && (m.authParameters.authuser = a.authuser);
        "boolean" == typeof a.include_granted_scopes && (b = new Fx(a.response_type || "token"),
        Gx(b) && (m.authParameters.include_granted_scopes = a.include_granted_scopes),
        Hx(b) && (m.rpcAuthParameters.include_granted_scopes = a.include_granted_scopes,
        !1 === a.include_granted_scopes && (m.forceTokenRefresh = !0,
        m.skipTokenCache = !0)));
        "boolean" == typeof a.enable_serial_consent && (m.enableSerialConsent = a.enable_serial_consent);
        a.plugin_name ? m.pluginName = a.plugin_name : (b = _.zf("auth2/pluginName")) && (m.pluginName = b);
        a.ack_extension_date && (m.authParameters.ack_extension_date = a.ack_extension_date,
        m.rpcAuthParameters.ack_extension_date = a.ack_extension_date,
        m.ackExtensionDate = a.ack_extension_date);
        return m
    }
      , Ex = function(a) {
        a = new Fx(a.response_type || "token");
        var b = [];
        Hx(a) && b.push("token");
        Jx(a, "id_token") && b.push("id_token");
        0 == b.length && (b = ["token", "id_token"]);
        return b.join(" ")
    }
      , Kx = ["permission", "id_token"]
      , Lx = /(^|[^_])token/
      , Fx = function(a) {
        this.us = [];
        this.lI(a)
    };
    Fx.prototype.lI = function(a) {
        a ? ((0 <= a.indexOf("permission") || a.match(Lx)) && this.us.push("permission"),
        0 <= a.indexOf("id_token") && this.us.push("id_token"),
        0 <= a.indexOf("code") && this.us.push("code")) : this.us = Kx
    }
    ;
    var Gx = function(a) {
        return Jx(a, "code")
    }
      , Hx = function(a) {
        return Jx(a, "permission")
    };
    Fx.prototype.toString = function() {
        return this.us.join(" ")
    }
    ;
    var Jx = function(a, b) {
        var c = !1;
        _.oc(a.us, function(d) {
            d == b && (c = !0)
        });
        return c
    };
    var Nx = function(a, b, c) {
        this.kp = b;
        this.mca = a;
        for (var d in a)
            a.hasOwnProperty(d) && Mx(this, d);
        if (c && c.length)
            for (a = 0; a < c.length; a++)
                this[c[a]] = this.kp[c[a]]
    }
      , Mx = function(a, b) {
        a[b] = function() {
            return a.mca[b].apply(a.kp, arguments)
        }
    };
    Nx.prototype.then = function(a, b, c) {
        var d = this;
        return _.gl().then(function() {
            return Ox(d.kp, a, b, c)
        })
    }
    ;
    _.Mk(Nx);
    var qx, Px, Rx;
    qx = null;
    _.Qx = function() {
        return qx ? Px() : null
    }
    ;
    Px = function() {
        return new Nx(Rx.prototype,qx,["currentUser", "isSignedIn"])
    }
    ;
    Rx = function(a) {
        delete a.include_granted_scopes;
        this.Oa = Dx(a);
        this.W6 = a.cookie_policy;
        this.W$ = !!a.scope;
        (this.WA = !1 !== a.fetch_basic_profile) && (this.Oa.authParameters.scope = Sx(this, "openid profile email"));
        if (_.aj.GSI_SUPPORT_BLOCKED_3P_COOKIES || "1" === _.dj.get("GSI_ALLOW_3PCD"))
            this.Oa.supportBlocked3PCookies = !0;
        this.hv = a.hosted_domain;
        this.Lga = a.ux_mode || "popup";
        this.Bda = a.redirect_uri || null;
        this.To()
    }
    ;
    Rx.prototype.To = function() {
        this.currentUser = new dx(new px(null));
        this.isSignedIn = new dx(!1);
        this.Ce = new _.kw(this.Oa);
        this.cB = this.Er = null;
        this.jba = new _.cl(function(a, b) {
            this.Er = a;
            this.cB = b
        }
        ,this);
        this.TB = {};
        this.tv = !0;
        Tx(this);
        this.Ce.start()
    }
    ;
    var Tx = function(a) {
        a.Ce.addEventListener("error", function(b) {
            a.tv && a.Er && (a.tv = !1,
            a.cB({
                error: b.error,
                details: b.details
            }),
            a.Er = null,
            a.cB = null)
        });
        a.Ce.addEventListener("authResult", function(b) {
            b && b.authResult && a.Of(b);
            a.Ce.Eu()(b)
        });
        a.Ce.addEventListener("tokenReady", function(b) {
            var c = new px(b.response);
            if (a.hv && a.hv != c.WG())
                a.Of({
                    type: "tokenFailed",
                    reason: "Account domain does not match hosted_domain specified by gapi.auth2.init.",
                    accountDomain: c.WG(),
                    expectedDomain: a.hv
                });
            else {
                a.currentUser.get().update(c);
                var d = a.currentUser;
                d.zc.notify(d.Ba);
                a.isSignedIn.set(!0);
                c = c.KG();
                (d = _.vx(a.W6)) && c && _.dj.set(["G_AUTHUSER_", "https:" === window.location.protocol && d.uf ? "S" : "H", d.ej].join(""), c, {
                    domain: d.domain,
                    secure: d.isSecure
                });
                _.Fw(b.response);
                a.Of(b)
            }
        });
        a.Ce.addEventListener("noSessionBound", function(b) {
            a.tv && b.autoOpenAuthUrl ? (a.tv = !1,
            Ww(a.Ce).select(function(c) {
                if (c && c.login_hint) {
                    var d = a.Ce;
                    _.cw(d, d.GD, [c.login_hint, !0])
                } else
                    a.currentUser.set(new px(null)),
                    a.isSignedIn.set(!1),
                    _.Gw(),
                    a.Of(b)
            })) : (a.currentUser.set(new px(null)),
            a.isSignedIn.set(!1),
            _.Gw(),
            a.Of(b))
        });
        a.Ce.addEventListener("tokenFailed", function(b) {
            a.Of(b)
        });
        a.Ce.addEventListener("userLoggedOut", function(b) {
            a.currentUser.get().Al();
            var c = a.currentUser;
            c.zc.notify(c.Ba);
            a.isSignedIn.set(!1);
            _.Gw();
            a.Of(b)
        })
    }
      , Ox = function(a, b, c, d) {
        return a.jba.then(function(e) {
            if (b)
                return b(e.H9)
        }, c, d)
    };
    Rx.prototype.Of = function(a) {
        if (a) {
            this.tv = !1;
            var b = a.type || "";
            if (this.TB[b])
                this.TB[b](a);
            this.Er && (this.Er({
                H9: this
            }),
            this.cB = this.Er = null)
        }
    }
    ;
    var Ux = function(a, b) {
        _.pb(b, function(c, d) {
            a.TB[d] = function(e) {
                a.TB = {};
                c(e)
            }
        })
    }
      , tx = function(a, b, c, d) {
        d = _.Jk(d);
        a.hv && (d.hd = a.hv);
        var e = d.ux_mode || a.Lga;
        delete d.ux_mode;
        delete d.app_package_name;
        var f = {
            sessionMeta: {
                extraQueryParams: d
            },
            responseType: "permission id_token"
        };
        "redirect" == e ? (d.redirect_uri || (d.redirect_uri = a.Bda || mx() + window.location.pathname),
        Vx(a, f)) : (delete d.redirect_uri,
        Wx(a, f),
        Ux(a, {
            authResult: function(h) {
                h.authResult && h.authResult.error ? c(h.authResult) : Ux(a, {
                    tokenReady: function() {
                        b(a.currentUser.get())
                    },
                    tokenFailed: c
                })
            }
        }))
    };
    Rx.prototype.zl = function(a) {
        return new _.cl(function(b, c) {
            var d = new gx(a);
            this.TH = d.Nu() ? !0 : !1;
            this.WA ? (d.Oa.fetch_basic_profile = !0,
            hx(d, "email profile openid")) : d.Oa.fetch_basic_profile = !1;
            var e = Sx(this, d.Nu());
            d.h_(e);
            tx(this, b, c, d.get())
        }
        ,this)
    }
    ;
    Rx.prototype.Qu = function(a) {
        var b = a || {};
        this.TH = !!b.scope;
        a = Sx(this, b.scope);
        if ("" == a)
            return _.hl({
                error: "Missing required parameter: scope"
            });
        var c = {
            scope: a,
            access_type: "offline",
            include_granted_scopes: !0
        };
        _.oc(Nw, function(d) {
            null != b[d] && (c[d] = b[d])
        });
        c.hasOwnProperty("prompt") || c.hasOwnProperty("approval_prompt") || (c.prompt = "consent");
        "postmessage" == b.redirect_uri || void 0 == b.redirect_uri ? a = Xx(this, c) : (c.redirect_uri = b.redirect_uri,
        Vx(this, {
            sessionMeta: {
                extraQueryParams: c
            },
            responseType: "code id_token"
        }),
        a = _.gl({
            message: "Redirecting to IDP."
        }));
        return a
    }
    ;
    var Xx = function(a, b) {
        b.origin = mx();
        delete b.redirect_uri;
        Wx(a, {
            sessionMeta: {
                extraQueryParams: b
            },
            responseType: "code permission id_token"
        });
        return new _.cl(function(c, d) {
            Ux(this, {
                authResult: function(e) {
                    (e = e && e.authResult) && e.code ? c({
                        code: e.code
                    }) : d(e && e.error ? e : {
                        error: "unknown_error"
                    })
                }
            })
        }
        ,a)
    }
      , Wx = function(a, b) {
        lx(b, ["sessionMeta", "extraQueryParams", "gsiwebsdk"], "2");
        Bw(a.Ce, ix(), b)
    }
      , Vx = function(a, b) {
        lx(b, ["sessionMeta", "extraQueryParams", "gsiwebsdk"], "2");
        b = b || {};
        window.location.assign(yw(a.Ce, b.sessionMeta, b.responseType))
    };
    Rx.prototype.Al = function(a) {
        var b = a || !1;
        return new _.cl(function(c) {
            sw(this.Ce, b, function() {
                c()
            })
        }
        ,this)
    }
    ;
    Rx.prototype.rT = function() {
        return this.Oa.authParameters.scope
    }
    ;
    var Sx = function(a, b) {
        a = a.rT();
        b = ow(b ? b.split(" ") : [], a ? a.split(" ") : []);
        _.Hk(b);
        return b.join(" ")
    };
    Rx.prototype.qK = function() {
        var a = this;
        return new _.cl(function(b, c) {
            Ux(a, {
                noSessionBound: c,
                tokenFailed: c,
                userLoggedOut: c,
                tokenReady: function(d) {
                    b(d.response)
                }
            });
            a.Ce.MS()
        }
        )
    }
    ;
    Rx.prototype.LP = function(a, b, c, d) {
        if (a = "string" === typeof a ? document.getElementById(a) : a) {
            var e = this;
            _.lk(a, "click", function() {
                var f = b;
                "function" == typeof b && (f = b());
                e.zl(f).then(function(h) {
                    c && c(h)
                }, function(h) {
                    d && d(h)
                })
            })
        } else
            d && d({
                error: "Could not attach click handler to the element. Reason: element not found."
            })
    }
    ;
    Rx.prototype.disconnect = function() {
        return new _.cl(function(a) {
            this.Ce.revoke(function() {
                a()
            })
        }
        ,this)
    }
    ;
    Rx.prototype.attachClickHandler = Rx.prototype.LP;
    var Yx;
    _.cl.prototype["catch"] = _.cl.prototype.ex;
    Yx = null;
    _.Zx = function(a) {
        ox();
        a = Ax(a);
        if (qx) {
            if (_.Ik(a, Yx || {}))
                return Px();
            throw new Rw("gapi.auth2 has been initialized with different options. Consider calling gapi.auth2.getAuthInstance() instead of gapi.auth2.init().");
        }
        Bx(a, !1 !== a.fetch_basic_profile);
        kx();
        Yx = a;
        qx = new Rx(a);
        _.rf.ga = 1;
        return Px()
    }
    ;
    var ay, cy, $x, ey, dy, fy;
    _.by = function(a, b) {
        ox();
        kx();
        a = Ax(a);
        Bx(a);
        var c = Ix(a)
          , d = new _.mw(c);
        "none" == a.prompt ? $x(d, a, function(e) {
            e.status = e.error ? {
                signed_in: !1,
                method: null,
                google_logged_in: !1
            } : {
                signed_in: !0,
                method: "AUTO",
                google_logged_in: !0
            };
            b(e)
        }) : ay(d, a, function(e) {
            if (e.error)
                e.status = {
                    signed_in: !1,
                    method: null,
                    google_logged_in: !1
                };
            else {
                var f = e.access_token || e.id_token;
                e.status = {
                    signed_in: !!f,
                    method: "PROMPT",
                    google_logged_in: !!f
                }
            }
            e["g-oauth-window"] = d.jY.Ii;
            b(e)
        })
    }
    ;
    ay = function(a, b, c) {
        var d = new Fx(b.response_type);
        c = cy(a, d, c);
        var e = {
            responseType: d.toString()
        };
        lx(e, ["sessionMeta", "extraQueryParams", "gsiwebsdk"], b.gsiwebsdk || "2");
        Gx(d) && lx(e, ["sessionMeta", "extraQueryParams", "access_type"], b.access_type || "offline");
        b.redirect_uri && lx(e, ["sessionMeta", "extraQueryParams", "redirect_uri"], b.redirect_uri);
        b.state && lx(e, ["sessionMeta", "extraQueryParams", "state"], b.state);
        b = ix();
        a.Qk ? c({
            authResult: {
                error: "idpiframe_initialization_failed",
                details: a.Ao().error
            }
        }) : (a.Ln = c,
        Bw(a, b, e))
    }
    ;
    cy = function(a, b, c) {
        if (Hx(b)) {
            var d = dy(c);
            return function(e) {
                e && e.authResult && !e.authResult.error ? a.Eu(function(f) {
                    f && !f.error ? (f = _.Jk(f),
                    Gx(b) && (f.code = e.authResult.code),
                    d(f)) : d(f ? f : {
                        error: "unknown_error"
                    })
                })(e) : d(e && e.authResult ? e.authResult : {
                    error: "unknown_error"
                })
            }
        }
        return function(e) {
            e && e.authResult && !e.authResult.error ? c(_.Jk(e.authResult)) : c(e && e.authResult ? e.authResult : {
                error: "unknown_error"
            })
        }
    }
    ;
    $x = function(a, b, c) {
        if (Gx(new Fx(b.response_type)) && "offline" == b.access_type)
            c({
                error: "immediate_failed",
                error_subtype: "access_denied"
            });
        else {
            var d = dy(c);
            b.login_hint ? a.yG(b.login_hint, function(e) {
                e ? ey(a, b, e, d) : c({
                    error: "immediate_failed",
                    error_subtype: "access_denied"
                })
            }) : void 0 !== b.authuser && null !== b.authuser ? Yw(a, b.authuser).select(function(e) {
                e && e.login_hint ? ey(a, b, e.login_hint, d) : d({
                    error: "immediate_failed",
                    error_subtype: "access_denied"
                })
            }) : a.yu(function(e) {
                e && e.hint ? ey(a, b, e.hint, d) : e && e.disabled ? d({
                    error: "immediate_failed",
                    error_subtype: "no_user_bound"
                }) : ("first_valid" == b.session_selection ? Xw(a) : Ww(a)).select(function(f) {
                    f && f.login_hint ? ey(a, b, f.login_hint, d) : d({
                        error: "immediate_failed",
                        error_subtype: "no_user_bound"
                    })
                })
            })
        }
    }
    ;
    ey = function(a, b, c, d) {
        b = new Fx(b.response_type);
        var e = 0
          , f = {}
          , h = function(k) {
            !k || k.error ? d(k) : (e--,
            _.tb(f, k),
            0 == e && d(f))
        };
        (Hx(b) || Jx(b, "id_token")) && e++;
        Gx(b) && e++;
        (Hx(b) || Jx(b, "id_token")) && _.nw(a, c, h);
        Gx(b) && Cw(a, c, h)
    }
    ;
    dy = function(a) {
        return function(b) {
            if (!b || b.error)
                _.Gw(),
                b ? a(b) : a({
                    error: "unknown_error"
                });
            else {
                if (b.access_token) {
                    var c = _.Jk(b);
                    fy(c);
                    delete c.id_token;
                    delete c.code;
                    _.Fw(c)
                }
                a(b)
            }
        }
    }
    ;
    fy = function(a) {
        _.oc(Ow, function(b) {
            delete a[b]
        })
    }
    ;
    _.C("gapi.auth2.init", _.Zx);
    _.C("gapi.auth2.authorize", function(a, b) {
        if (null != qx)
            throw new Rw("gapi.auth2.authorize cannot be called after GoogleAuth has been initialized (i.e. with a call to gapi.auth2.init, or gapi.client.init when given a 'clientId' and a 'scope' parameters).");
        _.by(a, function(c) {
            fy(c);
            b(c)
        })
    });
    _.C("gapi.auth2._gt", function() {
        return _.pj()
    });
    _.C("gapi.auth2.enableDebugLogs", function(a) {
        a = !1 !== a;
        _.bv = "0" != a && !!a
    });
    _.C("gapi.auth2.getAuthInstance", _.Qx);
    _.C("gapi.auth2.BasicProfile", rx);
    _.C("gapi.auth2.BasicProfile.prototype.getId", rx.prototype.getId);
    _.C("gapi.auth2.BasicProfile.prototype.getName", rx.prototype.Gg);
    _.C("gapi.auth2.BasicProfile.prototype.getGivenName", rx.prototype.L8);
    _.C("gapi.auth2.BasicProfile.prototype.getFamilyName", rx.prototype.G8);
    _.C("gapi.auth2.BasicProfile.prototype.getImageUrl", rx.prototype.U8);
    _.C("gapi.auth2.BasicProfile.prototype.getEmail", rx.prototype.uo);
    _.C("gapi.auth2.GoogleAuth", Rx);
    _.C("gapi.auth2.GoogleAuth.prototype.attachClickHandler", Rx.prototype.LP);
    _.C("gapi.auth2.GoogleAuth.prototype.disconnect", Rx.prototype.disconnect);
    _.C("gapi.auth2.GoogleAuth.prototype.grantOfflineAccess", Rx.prototype.Qu);
    _.C("gapi.auth2.GoogleAuth.prototype.signIn", Rx.prototype.zl);
    _.C("gapi.auth2.GoogleAuth.prototype.signOut", Rx.prototype.Al);
    _.C("gapi.auth2.GoogleAuth.prototype.getInitialScopes", Rx.prototype.rT);
    _.C("gapi.auth2.GoogleUser", px);
    _.C("gapi.auth2.GoogleUser.prototype.grant", px.prototype.J9);
    _.C("gapi.auth2.GoogleUser.prototype.getId", px.prototype.getId);
    _.C("gapi.auth2.GoogleUser.prototype.isSignedIn", px.prototype.Kg);
    _.C("gapi.auth2.GoogleUser.prototype.getAuthResponse", px.prototype.rm);
    _.C("gapi.auth2.GoogleUser.prototype.getBasicProfile", px.prototype.n8);
    _.C("gapi.auth2.GoogleUser.prototype.getGrantedScopes", px.prototype.N8);
    _.C("gapi.auth2.GoogleUser.prototype.getHostedDomain", px.prototype.WG);
    _.C("gapi.auth2.GoogleUser.prototype.grantOfflineAccess", px.prototype.Qu);
    _.C("gapi.auth2.GoogleUser.prototype.hasGrantedScopes", px.prototype.DA);
    _.C("gapi.auth2.GoogleUser.prototype.reloadAuthResponse", px.prototype.qK);
    _.C("gapi.auth2.LiveValue", dx);
    _.C("gapi.auth2.LiveValue.prototype.listen", dx.prototype.ma);
    _.C("gapi.auth2.LiveValue.prototype.get", dx.prototype.get);
    _.C("gapi.auth2.SigninOptionsBuilder", gx);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.getAppPackageName", gx.prototype.l8);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.setAppPackageName", gx.prototype.Uea);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.getScope", gx.prototype.Nu);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.setScope", gx.prototype.h_);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.getPrompt", gx.prototype.o9);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.setPrompt", gx.prototype.sfa);
    _.C("gapi.auth2.SigninOptionsBuilder.prototype.get", gx.prototype.get);
    _.Xf = _.Xf || {};
    (function() {
        function a(b) {
            var c = "";
            if (3 == b.nodeType || 4 == b.nodeType)
                c = b.nodeValue;
            else if (b.innerText)
                c = b.innerText;
            else if (b.innerHTML)
                c = b.innerHTML;
            else if (b.firstChild) {
                c = [];
                for (b = b.firstChild; b; b = b.nextSibling)
                    c.push(a(b));
                c = c.join("")
            }
            return c
        }
        _.Xf.createElement = function(b) {
            if (!document.body || document.body.namespaceURI)
                try {
                    var c = document.createElementNS("http://www.w3.org/1999/xhtml", b)
                } catch (d) {}
            return c || document.createElement(b)
        }
        ;
        _.Xf.IQ = function(b) {
            var c = _.Xf.createElement("iframe");
            try {
                var d = ["<", "iframe"], e = b || {}, f;
                for (f in e)
                    e.hasOwnProperty(f) && (d.push(" "),
                    d.push(f),
                    d.push('="'),
                    d.push(_.Xf.jG(e[f])),
                    d.push('"'));
                d.push("></");
                d.push("iframe");
                d.push(">");
                var h = _.Xf.createElement(d.join(""));
                h && (!c || h.tagName == c.tagName && h.namespaceURI == c.namespaceURI) && (c = h)
            } catch (l) {}
            d = c;
            b = b || {};
            for (var k in b)
                b.hasOwnProperty(k) && (d[k] = b[k]);
            return c
        }
        ;
        _.Xf.YS = function() {
            if (document.body)
                return document.body;
            try {
                var b = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "body");
                if (b && 1 == b.length)
                    return b[0]
            } catch (c) {}
            return document.documentElement || document
        }
        ;
        _.Xf.zpa = function(b) {
            return a(b)
        }
    }
    )();
    _.wh = window.gapi && window.gapi.util || {};
    _.wh = _.wh = {};
    _.wh.getOrigin = function(a) {
        return _.yh(a)
    }
    ;
    _.Wy = function(a) {
        if (0 !== a.indexOf("GCSC"))
            return null;
        var b = {
            Dj: !1
        };
        a = a.substr(4);
        if (!a)
            return b;
        var c = a.charAt(0);
        a = a.substr(1);
        var d = a.lastIndexOf("_");
        if (-1 == d)
            return b;
        var e = _.Uy(a.substr(d + 1));
        if (null == e)
            return b;
        a = a.substring(0, d);
        if ("_" !== a.charAt(0))
            return b;
        d = "E" === c && e.uf;
        return !d && ("U" !== c || e.uf) || d && !_.Vy ? b : {
            Dj: !0,
            uf: d,
            K6: a.substr(1),
            domain: e.domain,
            ej: e.ej
        }
    }
    ;
    _.Xy = function(a, b) {
        this.eg = a;
        a = b || {};
        this.Pba = Number(a.maxAge) || 0;
        this.He = a.domain;
        this.jn = a.path;
        this.Fea = !!a.secure
    }
    ;
    _.Xy.prototype.read = function() {
        for (var a = this.eg + "=", b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c];
            if (0 == d.indexOf(a))
                return d.substr(a.length)
        }
    }
    ;
    _.Xy.prototype.write = function(a, b) {
        if (!Yy.test(this.eg))
            throw "Invalid cookie name";
        if (!Zy.test(a))
            throw "Invalid cookie value";
        a = this.eg + "=" + a;
        this.He && (a += ";domain=" + this.He);
        this.jn && (a += ";path=" + this.jn);
        b = "number" === typeof b ? b : this.Pba;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.Fea && (a += ";secure");
        document.cookie = a;
        return !0
    }
    ;
    _.Xy.prototype.clear = function() {
        this.write("", 0)
    }
    ;
    var Zy = /^[-+/_=.:|%&a-zA-Z0-9@]*$/
      , Yy = /^[A-Z_][A-Z0-9_]{0,63}$/;
    _.Xy.iterate = function(a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("=")
              , e = d.shift();
            a(e, d.join("="))
        }
    }
    ;
    _.$y = function(a) {
        this.de = a
    }
    ;
    _.$y.prototype.read = function() {
        if (az.hasOwnProperty(this.de))
            return az[this.de]
    }
    ;
    _.$y.prototype.write = function(a) {
        az[this.de] = a;
        return !0
    }
    ;
    _.$y.prototype.clear = function() {
        delete az[this.de]
    }
    ;
    var az = {};
    _.$y.iterate = function(a) {
        for (var b in az)
            az.hasOwnProperty(b) && a(b, az[b])
    }
    ;
    var bz = function() {
        this.Ba = null;
        this.key = function() {
            return null
        }
        ;
        this.getItem = function() {
            return this.Ba
        }
        ;
        this.setItem = function(a, b) {
            this.Ba = b;
            this.length = 1
        }
        ;
        this.removeItem = function() {
            this.clear()
        }
        ;
        this.clear = function() {
            this.Ba = null;
            this.length = 0
        }
        ;
        this.length = 0
    }
      , cz = function(a) {
        try {
            var b = a || window.sessionStorage;
            if (!b)
                return !1;
            b.setItem("gapi.sessionStorageTest", "gapi.sessionStorageTest" + b.length);
            b.removeItem("gapi.sessionStorageTest");
            return !0
        } catch (c) {
            return !1
        }
    }
      , dz = function(a, b) {
        this.eg = a;
        this.jN = cz(b) ? b || window.sessionStorage : new bz
    };
    dz.prototype.read = function() {
        return this.jN.getItem(this.eg)
    }
    ;
    dz.prototype.write = function(a) {
        try {
            this.jN.setItem(this.eg, a)
        } catch (b) {
            return !1
        }
        return !0
    }
    ;
    dz.prototype.clear = function() {
        this.jN.removeItem(this.eg)
    }
    ;
    dz.iterate = function(a) {
        if (cz())
            for (var b = 0, c = window.sessionStorage.length; b < c; ++b) {
                var d = window.sessionStorage.key(b);
                a(d, window.sessionStorage[d])
            }
    }
    ;
    _.Vy = "https:" === window.location.protocol;
    _.ez = _.Vy || "http:" === window.location.protocol ? _.Xy : _.$y;
    _.Uy = function(a) {
        var b = a.substr(1)
          , c = ""
          , d = window.location.hostname;
        if ("" !== b) {
            c = parseInt(b, 10);
            if (isNaN(c))
                return null;
            b = d.split(".");
            if (b.length < c - 1)
                return null;
            b.length == c - 1 && (d = "." + d)
        } else
            d = "";
        return {
            uf: "S" == a.charAt(0),
            domain: d,
            ej: c
        }
    }
    ;
    var fz, gz, jz, kz;
    fz = _.gf();
    gz = _.gf();
    _.hz = _.gf();
    _.iz = _.gf();
    jz = "state code cookie_policy g_user_cookie_policy authuser prompt g-oauth-window status".split(" ");
    kz = function(a) {
        this.dY = a;
        this.dJ = null
    }
    ;
    kz.prototype.write = function(a) {
        var b = _.gf(), c = _.gf(), d = window.decodeURIComponent ? decodeURIComponent : unescape, e;
        for (e in a)
            if (_.hf(a, e)) {
                var f = a[e];
                f = f.replace(/\+/g, " ");
                c[e] = d(f);
                b[e] = a[e]
            }
        d = jz.length;
        for (e = 0; e < d; ++e)
            delete c[jz[e]];
        a = String(a.authuser || 0);
        d = _.gf();
        d[a] = c;
        c = _.Ig(d);
        this.dY.write(c);
        this.dJ = b
    }
    ;
    kz.prototype.read = function() {
        return this.dJ
    }
    ;
    kz.prototype.clear = function() {
        this.dY.clear();
        this.dJ = _.gf()
    }
    ;
    _.lz = function(a) {
        return a ? {
            domain: a.domain,
            path: "/",
            secure: a.uf
        } : null
    }
    ;
    dz.iterate(function(a) {
        var b = _.Wy(a);
        b && b.Dj && (fz[a] = new kz(new dz(a)))
    });
    _.ez.iterate(function(a) {
        fz[a] && (gz[a] = new _.ez(a,_.lz(_.Wy(a))))
    });
    _.ej = function() {
        function a() {
            e[0] = 1732584193;
            e[1] = 4023233417;
            e[2] = 2562383102;
            e[3] = 271733878;
            e[4] = 3285377520;
            n = m = 0
        }
        function b(p) {
            for (var q = h, t = 0; 64 > t; t += 4)
                q[t / 4] = p[t] << 24 | p[t + 1] << 16 | p[t + 2] << 8 | p[t + 3];
            for (t = 16; 80 > t; t++)
                p = q[t - 3] ^ q[t - 8] ^ q[t - 14] ^ q[t - 16],
                q[t] = (p << 1 | p >>> 31) & 4294967295;
            p = e[0];
            var v = e[1]
              , u = e[2]
              , w = e[3]
              , x = e[4];
            for (t = 0; 80 > t; t++) {
                if (40 > t)
                    if (20 > t) {
                        var z = w ^ v & (u ^ w);
                        var F = 1518500249
                    } else
                        z = v ^ u ^ w,
                        F = 1859775393;
                else
                    60 > t ? (z = v & u | w & (v | u),
                    F = 2400959708) : (z = v ^ u ^ w,
                    F = 3395469782);
                z = ((p << 5 | p >>> 27) & 4294967295) + z + x + F + q[t] & 4294967295;
                x = w;
                w = u;
                u = (v << 30 | v >>> 2) & 4294967295;
                v = p;
                p = z
            }
            e[0] = e[0] + p & 4294967295;
            e[1] = e[1] + v & 4294967295;
            e[2] = e[2] + u & 4294967295;
            e[3] = e[3] + w & 4294967295;
            e[4] = e[4] + x & 4294967295
        }
        function c(p, q) {
            if ("string" === typeof p) {
                p = unescape(encodeURIComponent(p));
                for (var t = [], v = 0, u = p.length; v < u; ++v)
                    t.push(p.charCodeAt(v));
                p = t
            }
            q || (q = p.length);
            t = 0;
            if (0 == m)
                for (; t + 64 < q; )
                    b(p.slice(t, t + 64)),
                    t += 64,
                    n += 64;
            for (; t < q; )
                if (f[m++] = p[t++],
                n++,
                64 == m)
                    for (m = 0,
                    b(f); t + 64 < q; )
                        b(p.slice(t, t + 64)),
                        t += 64,
                        n += 64
        }
        function d() {
            var p = []
              , q = 8 * n;
            56 > m ? c(k, 56 - m) : c(k, 64 - (m - 56));
            for (var t = 63; 56 <= t; t--)
                f[t] = q & 255,
                q >>>= 8;
            b(f);
            for (t = q = 0; 5 > t; t++)
                for (var v = 24; 0 <= v; v -= 8)
                    p[q++] = e[t] >> v & 255;
            return p
        }
        for (var e = [], f = [], h = [], k = [128], l = 1; 64 > l; ++l)
            k[l] = 0;
        var m, n;
        a();
        return {
            reset: a,
            update: c,
            digest: d,
            cj: function() {
                for (var p = d(), q = "", t = 0; t < p.length; t++)
                    q += "0123456789ABCDEF".charAt(Math.floor(p[t] / 16)) + "0123456789ABCDEF".charAt(p[t] % 16);
                return q
            }
        }
    }
    ;
    var gj = function(a, b, c) {
        var d = String(_.r.location.href);
        return d && a && b ? [b, fj(_.yh(d), a, c || null)].join(" ") : null
    }
      , fj = function(a, b, c) {
        var d = []
          , e = [];
        if (1 == (Array.isArray(c) ? 2 : 1))
            return e = [b, a],
            _.oc(d, function(k) {
                e.push(k)
            }),
            hj(e.join(" "));
        var f = []
          , h = [];
        _.oc(c, function(k) {
            h.push(k.key);
            f.push(k.value)
        });
        c = Math.floor((new Date).getTime() / 1E3);
        e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
        _.oc(d, function(k) {
            e.push(k)
        });
        a = hj(e.join(" "));
        a = [c, a];
        0 == h.length || a.push(h.join(""));
        return a.join("_")
    }
      , hj = function(a) {
        var b = _.ej();
        b.update(a);
        return b.cj().toLowerCase()
    };
    var kj;
    _.ij = function(a) {
        return !!_.aj.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a)
    }
    ;
    _.jj = function(a) {
        a = void 0 === a ? !1 : a;
        var b = _.r.__SAPISID || _.r.__APISID || _.r.__3PSAPISID || _.r.__OVERRIDE_SID;
        _.ij(a) && (b = b || _.r.__1PSAPISID);
        if (b)
            return !0;
        if ("undefined" !== typeof document) {
            var c = new _.bj(document);
            b = c.get("SAPISID") || c.get("APISID") || c.get("__Secure-3PAPISID") || c.get("SID") || c.get("OSID");
            _.ij(a) && (b = b || c.get("__Secure-1PAPISID"))
        }
        return !!b
    }
    ;
    kj = function(a, b, c, d) {
        (a = _.r[a]) || "undefined" === typeof document || (a = (new _.bj(document)).get(b));
        return a ? gj(a, c, d) : null
    }
    ;
    _.lj = function(a, b) {
        b = void 0 === b ? !1 : b;
        var c = _.yh(String(_.r.location.href))
          , d = [];
        if (_.jj(b)) {
            c = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:") || 0 == c.indexOf("moz-extension:");
            var e = c ? _.r.__SAPISID : _.r.__APISID;
            e || "undefined" === typeof document || (e = new _.bj(document),
            e = e.get(c ? "SAPISID" : "APISID") || e.get("__Secure-3PAPISID"));
            (e = e ? gj(e, c ? "SAPISIDHASH" : "APISIDHASH", a) : null) && d.push(e);
            c && _.ij(b) && ((b = kj("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && d.push(b),
            (a = kj("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && d.push(a))
        }
        return 0 == d.length ? null : d.join(" ")
    }
    ;
    _.mj = function(a, b) {
        var c = {
            SAPISIDHASH: !0,
            SAPISID3PHASH: !0,
            APISIDHASH: !0
        };
        _.ij(void 0 === b ? !1 : b) && (c.SAPISID1PHASH = !0);
        return a && (a.OriginToken || a.Authorization && c[String(a.Authorization).split(" ")[0]]) ? !0 : !1
    }
    ;
    _.nj = {
        wU: _.mj,
        gba: _.jj,
        uT: function() {
            var a = null;
            _.jj() && (a = window.__PVT,
            null == a && (a = (new _.bj(document)).get("BEAT")));
            return a
        },
        WS: _.lj
    };
    _.Yr = function() {
        return _.Cb && _.Db ? _.Db.mobile : !_.Xr() && (_.Ab("iPod") || _.Ab("iPhone") || _.Ab("Android") || _.Ab("IEMobile"))
    }
    ;
    _.Xr = function() {
        return _.Cb && _.Db ? !_.Db.mobile && (_.Ab("iPad") || _.Ab("Android") || _.Ab("Silk")) : _.Ab("iPad") || _.Ab("Android") && !_.Ab("Mobile") || _.Ab("Silk")
    }
    ;
    var Es, Fs;
    _.ws = function(a, b) {
        return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
    }
    ;
    _.xs = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
    ;
    _.g = _.xs.prototype;
    _.g.clone = function() {
        return new _.xs(this.x,this.y)
    }
    ;
    _.g.equals = function(a) {
        return a instanceof _.xs && _.ws(this, a)
    }
    ;
    _.g.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    _.g.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    _.g.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    _.g.translate = function(a, b) {
        a instanceof _.xs ? (this.x += a.x,
        this.y += a.y) : (this.x += Number(a),
        "number" === typeof b && (this.y += b));
        return this
    }
    ;
    _.g.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    }
    ;
    _.ys = function(a) {
        return a.scrollingElement ? a.scrollingElement : !_.vd && _.ie(a) ? a.documentElement : a.body || a.documentElement
    }
    ;
    _.zs = function(a) {
        var b = _.ys(a);
        a = a.parentWindow || a.defaultView;
        return _.qd && a.pageYOffset != b.scrollTop ? new _.xs(b.scrollLeft,b.scrollTop) : new _.xs(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
    ;
    _.As = function(a, b, c, d) {
        return _.be(a.Hb, b, c, d)
    }
    ;
    _.Bs = function(a) {
        if (a instanceof _.Wc && a.constructor === _.Wc)
            return a.xY;
        _.Vb(a);
        return "type_error:SafeStyle"
    }
    ;
    _.Cs = function(a) {
        if (a instanceof _.cd && a.constructor === _.cd)
            return a.wY;
        _.Vb(a);
        return "type_error:SafeStyleSheet"
    }
    ;
    _.Ds = function(a) {
        return Number(_.Pd) >= a
    }
    ;
    Es = function(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
    ;
    Fs = function(a) {
        return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function(b, c, d) {
            return c + d.toUpperCase()
        })
    }
    ;
    _.Gs = function(a, b, c) {
        return _.ne(document, arguments)
    }
    ;
    _.Hs = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    }
    ;
    _.g = _.Hs.prototype;
    _.g.Xb = function() {
        return this.right - this.left
    }
    ;
    _.g.Vc = function() {
        return this.bottom - this.top
    }
    ;
    _.g.clone = function() {
        return new _.Hs(this.top,this.right,this.bottom,this.left)
    }
    ;
    _.g.contains = function(a) {
        return this && a ? a instanceof _.Hs ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    _.g.expand = function(a, b, c, d) {
        _.Rb(a) ? (this.top -= a.top,
        this.right += a.right,
        this.bottom += a.bottom,
        this.left -= a.left) : (this.top -= a,
        this.right += Number(b),
        this.bottom += Number(c),
        this.left -= Number(d));
        return this
    }
    ;
    _.g.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    }
    ;
    _.g.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    _.g.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    _.g.translate = function(a, b) {
        a instanceof _.xs ? (this.left += a.x,
        this.right += a.x,
        this.top += a.y,
        this.bottom += a.y) : (this.left += a,
        this.right += a,
        "number" === typeof b && (this.top += b,
        this.bottom += b));
        return this
    }
    ;
    _.g.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    }
    ;
    var Ks, Is, Ps, Ss, dt, Rs;
    _.Js = function(a, b, c) {
        if ("string" === typeof b)
            (b = Is(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d]
                  , f = Is(c, d);
                f && (c.style[f] = e)
            }
    }
    ;
    Ks = {};
    Is = function(a, b) {
        var c = Ks[b];
        if (!c) {
            var d = Es(b);
            c = d;
            void 0 === a.style[d] && (d = (_.vd ? "Webkit" : _.ud ? "Moz" : _.qd ? "ms" : null) + Fs(d),
            void 0 !== a.style[d] && (c = d));
            Ks[b] = c
        }
        return c
    }
    ;
    _.Ls = function(a, b) {
        var c = a.style[Es(b)];
        return "undefined" !== typeof c ? c : a.style[Is(a, b)] || ""
    }
    ;
    _.Ms = function(a, b) {
        var c = _.$d(a);
        return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
    }
    ;
    _.Ns = function(a, b) {
        return a.currentStyle ? a.currentStyle[b] : null
    }
    ;
    _.Os = function(a, b) {
        return _.Ms(a, b) || _.Ns(a, b) || a.style && a.style[b]
    }
    ;
    Ps = function(a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
    }
    ;
    _.Ts = function(a, b) {
        b = b || _.ys(document);
        var c = b || _.ys(document);
        var d = _.Qs(a)
          , e = _.Qs(c);
        if (_.qd && !_.Ds(9)) {
            var f = Rs(c, "borderLeft");
            var h = Rs(c, "borderRight");
            var k = Rs(c, "borderTop")
              , l = Rs(c, "borderBottom");
            h = new _.Hs(k,h,l,f)
        } else
            f = _.Ms(c, "borderLeftWidth"),
            h = _.Ms(c, "borderRightWidth"),
            k = _.Ms(c, "borderTopWidth"),
            l = _.Ms(c, "borderBottomWidth"),
            h = new _.Hs(parseFloat(k),parseFloat(h),parseFloat(l),parseFloat(f));
        c == _.ys(document) ? (f = d.x - c.scrollLeft,
        d = d.y - c.scrollTop,
        _.qd && !_.Ds(10) && (f += h.left,
        d += h.top)) : (f = d.x - e.x - h.left,
        d = d.y - e.y - h.top);
        a = Ss(a);
        e = c.clientHeight - a.height;
        h = c.scrollLeft;
        k = c.scrollTop;
        h += Math.min(f, Math.max(f - (c.clientWidth - a.width), 0));
        k += Math.min(d, Math.max(d - e, 0));
        c = new _.xs(h,k);
        b.scrollLeft = c.x;
        b.scrollTop = c.y
    }
    ;
    _.Qs = function(a) {
        var b = _.$d(a)
          , c = new _.xs(0,0);
        var d = b ? _.$d(b) : document;
        d = !_.qd || _.Ds(9) || _.ie(_.ae(d).Hb) ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = Ps(a);
        b = _.zs(_.ae(b).Hb);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
    ;
    _.Vs = function(a, b) {
        var c = new _.xs(0,0)
          , d = _.je(_.$d(a));
        if (!_.od(d, "parent"))
            return c;
        do {
            var e = d == b ? _.Qs(a) : _.Us(a);
            c.x += e.x;
            c.y += e.y
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
        return c
    }
    ;
    _.Us = function(a) {
        a = Ps(a);
        return new _.xs(a.left,a.top)
    }
    ;
    _.Xs = function(a, b, c) {
        if (b instanceof _.Vd)
            c = b.height,
            b = b.width;
        else if (void 0 == c)
            throw Error("R");
        a.style.width = _.Ws(b, !0);
        a.style.height = _.Ws(c, !0)
    }
    ;
    _.Ws = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    }
    ;
    _.Ys = function(a) {
        var b = Ss;
        if ("none" != _.Os(a, "display"))
            return b(a);
        var c = a.style
          , d = c.display
          , e = c.visibility
          , f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }
    ;
    Ss = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = _.vd && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Ps(a),
        new _.Vd(a.right - a.left,a.bottom - a.top)) : new _.Vd(b,c)
    }
    ;
    _.Zs = function(a, b) {
        a.style.display = b ? "" : "none"
    }
    ;
    _.at = function(a) {
        var b = _.ae(void 0)
          , c = b.ub();
        if (_.qd && c.createStyleSheet)
            b = c.createStyleSheet(),
            _.$s(b, a);
        else {
            c = _.As(b, "HEAD")[0];
            if (!c) {
                var d = _.As(b, "BODY")[0];
                c = b.va("HEAD");
                d.parentNode.insertBefore(c, d)
            }
            d = b.va("STYLE");
            var e;
            (e = _.Ud('style[nonce],link[rel="stylesheet"][nonce]')) && d.setAttribute("nonce", e);
            _.$s(d, a);
            b.appendChild(c, d)
        }
    }
    ;
    _.$s = function(a, b) {
        b = _.Cs(b);
        _.qd && void 0 !== a.cssText ? a.cssText = b : _.r.trustedTypes ? _.xe(a, b) : a.innerHTML = b
    }
    ;
    _.bt = _.ud ? "MozUserSelect" : _.vd || _.rd ? "WebkitUserSelect" : null;
    _.ct = function(a, b) {
        if (/^\d+px?$/.test(b))
            return parseInt(b, 10);
        var c = a.style.left
          , d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        b = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return +b
    }
    ;
    dt = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    Rs = function(a, b) {
        if ("none" == _.Ns(a, b + "Style"))
            return 0;
        b = _.Ns(a, b + "Width");
        return b in dt ? dt[b] : _.ct(a, b)
    }
    ;
    _.ty = function(a, b) {
        _.vk.call(this);
        this.Rm = a || 1;
        this.jx = b || _.r;
        this.VP = (0,
        _.D)(this.nga, this);
        this.gW = _.Zb()
    }
    ;
    _.ab(_.ty, _.vk);
    _.g = _.ty.prototype;
    _.g.enabled = !1;
    _.g.Sc = null;
    _.g.setInterval = function(a) {
        this.Rm = a;
        this.Sc && this.enabled ? (this.stop(),
        this.start()) : this.Sc && this.stop()
    }
    ;
    _.g.nga = function() {
        if (this.enabled) {
            var a = _.Zb() - this.gW;
            0 < a && a < .8 * this.Rm ? this.Sc = this.jx.setTimeout(this.VP, this.Rm - a) : (this.Sc && (this.jx.clearTimeout(this.Sc),
            this.Sc = null),
            this.dispatchEvent("tick"),
            this.enabled && (this.stop(),
            this.start()))
        }
    }
    ;
    _.g.start = function() {
        this.enabled = !0;
        this.Sc || (this.Sc = this.jx.setTimeout(this.VP, this.Rm),
        this.gW = _.Zb())
    }
    ;
    _.g.stop = function() {
        this.enabled = !1;
        this.Sc && (this.jx.clearTimeout(this.Sc),
        this.Sc = null)
    }
    ;
    _.g.ua = function() {
        _.ty.N.ua.call(this);
        this.stop();
        delete this.jx
    }
    ;
    _.uy = function(a, b, c) {
        if ("function" === typeof a)
            c && (a = (0,
            _.D)(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = (0,
            _.D)(a.handleEvent, a);
        else
            throw Error("Ca");
        return 2147483647 < Number(b) ? -1 : _.r.setTimeout(a, b || 0)
    }
    ;
    _.vy = function(a) {
        _.r.clearTimeout(a)
    }
    ;
    _.mz = function(a) {
        _.Jj.call(this);
        this.de = 1;
        this.lC = [];
        this.qC = 0;
        this.lg = [];
        this.Yj = {};
        this.Y5 = !!a
    }
    ;
    _.ab(_.mz, _.Jj);
    _.g = _.mz.prototype;
    _.g.subscribe = function(a, b, c) {
        var d = this.Yj[a];
        d || (d = this.Yj[a] = []);
        var e = this.de;
        this.lg[e] = a;
        this.lg[e + 1] = b;
        this.lg[e + 2] = c;
        this.de = e + 3;
        d.push(e);
        return e
    }
    ;
    _.g.Tw = _.ea(19);
    _.g.unsubscribe = function(a, b, c) {
        if (a = this.Yj[a]) {
            var d = this.lg;
            if (a = a.find(function(e) {
                return d[e + 1] == b && d[e + 2] == c
            }))
                return this.Hl(a)
        }
        return !1
    }
    ;
    _.g.Hl = function(a) {
        var b = this.lg[a];
        if (b) {
            var c = this.Yj[b];
            0 != this.qC ? (this.lC.push(a),
            this.lg[a + 1] = function() {}
            ) : (c && _.nb(c, a),
            delete this.lg[a],
            delete this.lg[a + 1],
            delete this.lg[a + 2])
        }
        return !!b
    }
    ;
    _.g.Cp = function(a, b) {
        var c = this.Yj[a];
        if (c) {
            for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++)
                d[e - 1] = arguments[e];
            if (this.Y5)
                for (e = 0; e < c.length; e++) {
                    var h = c[e];
                    nz(this.lg[h + 1], this.lg[h + 2], d)
                }
            else {
                this.qC++;
                try {
                    for (e = 0,
                    f = c.length; e < f && !this.isDisposed(); e++)
                        h = c[e],
                        this.lg[h + 1].apply(this.lg[h + 2], d)
                } finally {
                    if (this.qC--,
                    0 < this.lC.length && 0 == this.qC)
                        for (; c = this.lC.pop(); )
                            this.Hl(c)
                }
            }
            return 0 != e
        }
        return !1
    }
    ;
    var nz = function(a, b, c) {
        _.$k(function() {
            a.apply(b, c)
        })
    };
    _.mz.prototype.clear = function(a) {
        if (a) {
            var b = this.Yj[a];
            b && (b.forEach(this.Hl, this),
            delete this.Yj[a])
        } else
            this.lg.length = 0,
            this.Yj = {}
    }
    ;
    _.mz.prototype.Tb = function(a) {
        if (a) {
            var b = this.Yj[a];
            return b ? b.length : 0
        }
        a = 0;
        for (b in this.Yj)
            a += this.Tb(b);
        return a
    }
    ;
    _.mz.prototype.ua = function() {
        _.mz.N.ua.call(this);
        this.clear();
        this.lC.length = 0
    }
    ;
    _.oz = function(a) {
        this.qga = a
    }
    ;
    _.oz.prototype.toString = function() {
        return this.qga
    }
    ;
    _.pz = function(a) {
        _.Jj.call(this);
        this.ze = new _.mz(a);
        _.Lj(this, this.ze)
    }
    ;
    _.ab(_.pz, _.Jj);
    _.g = _.pz.prototype;
    _.g.subscribe = function(a, b, c) {
        return this.ze.subscribe(a.toString(), b, c)
    }
    ;
    _.g.Tw = _.ea(18);
    _.g.unsubscribe = function(a, b, c) {
        return this.ze.unsubscribe(a.toString(), b, c)
    }
    ;
    _.g.Hl = function(a) {
        return this.ze.Hl(a)
    }
    ;
    _.g.Cp = function(a, b) {
        return this.ze.Cp(a.toString(), b)
    }
    ;
    _.g.clear = function(a) {
        this.ze.clear(void 0 !== a ? a.toString() : void 0)
    }
    ;
    _.g.Tb = function(a) {
        return this.ze.Tb(void 0 !== a ? a.toString() : void 0)
    }
    ;
    var qz = function(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++)
            c += a[e] + (e < b.length ? b[e] : "%s");
        _.ib.call(this, c + a[d])
    }, rz = function(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b)
                    return !1;
                b = !0
            } else if ("[" == e) {
                if (!b)
                    return !1;
                b = !1
            } else if (!b && !c.test(e))
                return !1
        }
        return b
    }, tz = function(a) {
        return a.replace(_.$c, function(b, c, d, e) {
            var f = "";
            d = d.replace(/^(['"])(.*)\1$/, function(h, k, l) {
                f = k;
                return l
            });
            b = (sz(d) || _.Gc).toString();
            return c + f + b + f + e
        })
    }, vz = function(a) {
        if (a instanceof _.Ac)
            return 'url("' + _.Bc(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        if (a instanceof _.ec)
            a = _.fc(a);
        else {
            a = String(a);
            var b = a.replace(_.ad, "$1").replace(_.ad, "$1").replace(_.$c, "url");
            if (_.Zc.test(b)) {
                if (b = !uz.test(a)) {
                    for (var c = b = !0, d = 0; d < a.length; d++) {
                        var e = a.charAt(d);
                        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
                    }
                    b = b && c && rz(a)
                }
                a = b ? tz(a) : "zClosurez"
            } else
                a = "zClosurez"
        }
        if (/[{;}]/.test(a))
            throw new qz("Value does not allow [{;}], got: %s.",[a]);
        return a
    }, wz, xz, yz, sz, uz, Az, Bz, Cz, Ez;
    _.ab(qz, _.ib);
    qz.prototype.name = "AssertionError";
    wz = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    xz = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;
    yz = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    sz = function(a) {
        if (a instanceof _.Ac)
            return a;
        a = String(a);
        yz.test(a) ? a = _.Fc(a) : (a = String(a).replace(/(%0A|%0D)/g, ""),
        a = a.match(xz) ? _.Fc(a) : null);
        return a
    }
    ;
    uz = /\/\*/;
    _.zz = function(a) {
        var b = "", c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                if (!/^[-_a-zA-Z0-9]+$/.test(c))
                    throw Error("m`" + c);
                var d = a[c];
                null != d && (d = Array.isArray(d) ? d.map(vz).join(" ") : vz(d),
                b += c + ":" + d + ";")
            }
        return b ? new _.Wc(b,_.Vc) : _.Xc
    }
    ;
    Az = /^[a-zA-Z0-9-]+$/;
    Bz = {
        APPLET: !0,
        BASE: !0,
        EMBED: !0,
        IFRAME: !0,
        LINK: !0,
        MATH: !0,
        META: !0,
        OBJECT: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    };
    Cz = function(a) {
        var b = _.kd(_.ld)
          , c = []
          , d = function(e) {
            Array.isArray(e) ? e.forEach(d) : (e = _.kd(e),
            c.push(_.id(e).toString()))
        };
        a.forEach(d);
        return _.jd(c.join(_.id(b).toString()))
    }
    ;
    _.Dz = function(a) {
        return Cz(Array.prototype.slice.call(arguments))
    }
    ;
    Ez = {
        action: !0,
        cite: !0,
        data: !0,
        formaction: !0,
        href: !0,
        manifest: !0,
        poster: !0,
        src: !0
    };
    _.Fz = function(a, b) {
        Array.isArray(b) || (b = [b]);
        b = b.map(function(c) {
            return "string" === typeof c ? c : c.Bp + " " + c.duration + "s " + c.timing + " " + c.delay + "s"
        });
        _.Js(a, "transition", b.join(","))
    }
    ;
    _.Gz = _.mc(function() {
        if (_.qd)
            return !0;
        var a = _.oe("DIV")
          , b = _.vd ? "-webkit" : _.ud ? "-moz" : _.qd ? "-ms" : null
          , c = {
            transition: "opacity 1s linear"
        };
        b && (c[b + "-transition"] = "opacity 1s linear");
        c = {
            style: c
        };
        if (!Az.test("div"))
            throw Error("q");
        if ("DIV"in Bz)
            throw Error("q");
        b = void 0;
        var d = "";
        if (c)
            for (h in c)
                if (Object.prototype.hasOwnProperty.call(c, h)) {
                    if (!Az.test(h))
                        throw Error("q");
                    var e = c[h];
                    if (null != e) {
                        var f = h;
                        if (e instanceof _.ec)
                            e = _.fc(e);
                        else if ("style" == f.toLowerCase()) {
                            if (!_.Rb(e))
                                throw Error("q");
                            e instanceof _.Wc || (e = _.zz(e));
                            e = _.Bs(e)
                        } else {
                            if (/^on/i.test(f))
                                throw Error("q");
                            if (f.toLowerCase()in Ez)
                                if (e instanceof _.ic)
                                    e = _.jc(e).toString();
                                else if (e instanceof _.Ac)
                                    e = _.Bc(e);
                                else if ("string" === typeof e)
                                    e = (sz(e) || _.Gc).toString();
                                else
                                    throw Error("q");
                        }
                        f = f + '="' + _.Sc(String(e)) + '"';
                        d += " " + f
                    }
                }
        var h = "<div" + d;
        null == b ? b = [] : Array.isArray(b) || (b = [b]);
        !0 === wz.div ? h += ">" : (b = _.Dz(b),
        h += ">" + _.id(b).toString() + "</div>");
        h = _.jd(h);
        _.Sd(a, h);
        return "" != _.Ls(a.firstChild, "transition")
    });
    _.Iz = function() {
        _.Hz = "oauth2relay" + String(2147483647 * (0,
        _.Fh)() | 0)
    }
    ;
    _.Jz = new _.pz;
    _.Kz = new _.oz("oauth");
    _.Iz();
    _.zf("oauth-flow/client_id");
    var Lz = String(_.zf("oauth-flow/redirectUri"));
    if (Lz)
        Lz.replace(/[#][\s\S]*/, "");
    else {
        var Mz = _.wh.getOrigin(window.location.href);
        _.zf("oauth-flow/callbackUrl");
        encodeURIComponent(Mz)
    }
    _.wh.getOrigin(window.location.href);
    var Oz, Pz, Qz, Rz, Sz, Tz, Uz, Vz, Wz, Xz, Yz, $z, aA, bA, cA, dA, eA, fA, gA, hA, iA, jA, kA, lA, mA, nA, oA, pA, qA, rA, sA, tA, uA, vA, wA, xA, yA, zA, AA, BA, EA, DA, FA, GA, HA, IA, JA, KA, LA, MA, NA, PA;
    _.Nz = function(a, b) {
        if (_.Ei && !b)
            return _.r.atob(a);
        var c = "";
        _.Hi(a, function(d) {
            c += String.fromCharCode(d)
        });
        return c
    }
    ;
    Oz = function(a) {
        var b = String(a("immediate") || "");
        a = String(a("prompt") || "");
        return "true" === b || "none" === a
    }
    ;
    Pz = function(a) {
        return _.Wi("enableMultilogin") && a("cookie_policy") && !Oz(a) ? !0 : !1
    }
    ;
    Sz = function() {
        var a, b = null;
        _.ez.iterate(function(c, d) {
            0 === c.indexOf("G_AUTHUSER_") && (c = _.Uy(c.substring(11)),
            !a || c.uf && !a.uf || c.uf == a.uf && c.ej > a.ej) && (a = c,
            b = d)
        });
        return {
            k6: a,
            authuser: b
        }
    }
    ;
    Tz = [".APPS.GOOGLEUSERCONTENT.COM", "@DEVELOPER.GSERVICEACCOUNT.COM"];
    Uz = function(a) {
        a = a.toUpperCase();
        for (var b = 0, c = Tz.length; b < c; ++b) {
            var d = a.split(Tz[b]);
            2 == d.length && "" === d[1] && (a = d[0])
        }
        a = a.replace(/-/g, "_").toUpperCase();
        40 < a.length && (b = new _.Eh,
        b.xx(a),
        a = b.cj().toUpperCase());
        return a
    }
    ;
    Vz = function(a) {
        if (!a)
            return [];
        a = a.split("=");
        return a[1] ? a[1].split("|") : []
    }
    ;
    Wz = function(a) {
        a = a.split(":");
        return {
            clientId: a[0].split("=")[1],
            Sea: Vz(a[1]),
            oqa: Vz(a[2]),
            ipa: Vz(a[3])
        }
    }
    ;
    Xz = function(a) {
        var b = Sz()
          , c = b.k6;
        b = b.authuser;
        var d = a && Uz(a);
        if (null !== b) {
            var e;
            _.ez.iterate(function(h, k) {
                (h = _.Wy(h)) && h.Dj && (d && h.K6 != d || h.uf == c.uf && h.ej == c.ej && (e = k))
            });
            if (e) {
                var f = Wz(e);
                a = f && f.Sea[Number(b)];
                f = f && f.clientId;
                if (a)
                    return {
                        authuser: b,
                        rra: a,
                        clientId: f
                    }
            }
        }
        return null
    }
    ;
    Yz = function(a, b) {
        a = _.pj(a);
        if (!a || !b && a.error)
            return null;
        b = Math.floor((new Date).getTime() / 1E3);
        return a.expires_at && b > a.expires_at ? null : a
    }
    ;
    _.Zz = function(a, b) {
        if (b) {
            var c = b;
            var d = a
        } else
            "string" === typeof a ? d = a : c = a;
        c ? _.Fw(c, d) : _.Gw(d)
    }
    ;
    $z = function(a) {
        if (!a)
            return null;
        "single_host_origin" !== a && (a = _.yh(a));
        var b = window.location.hostname
          , c = b
          , d = _.Vy;
        if ("single_host_origin" !== a) {
            c = a.split("://");
            if (2 == c.length)
                d = "https" === c.shift();
            else
                return _.Mg.log("WARNING invalid cookie_policy: " + a),
                null;
            c = c[0]
        }
        if (-1 !== c.indexOf(":"))
            c = b = "";
        else {
            a = "." + c;
            if (b.lastIndexOf(a) !== b.length - a.length)
                return _.Mg.log("Invalid cookie_policy domain: " + c),
                null;
            c = a;
            b = c.split(".").length - 1
        }
        return {
            domain: c,
            uf: d,
            ej: b
        }
    }
    ;
    aA = function(a) {
        var b = $z(a);
        if (!b)
            return new _.$y("G_USERSTATE_");
        a = ["G_USERSTATE_", _.Vy && b.uf ? "S" : "H", b.ej].join("");
        var c = _.iz[a];
        c || (c = {
            bJ: 63072E3
        },
        _.jf(_.lz(b), c),
        c = new _.Xy(a,c),
        _.iz[a] = c,
        b = c.read(),
        "undefined" !== typeof b && null !== b && (document.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/",
        c.write(b)));
        return c
    }
    ;
    bA = function(a) {
        var b = aA(a).read();
        a = _.gf();
        if (b) {
            b = b.split(":");
            for (var c; c = b.shift(); )
                c = c.split("="),
                a[c[0]] = c[1]
        }
        return a
    }
    ;
    cA = function(a, b, c) {
        var d = bA(b)
          , e = d[a];
        d[a] = "0";
        var f = [];
        _.sn(d, function(k, l) {
            f.push(l + "=" + k)
        });
        var h = f.join(":");
        b = aA(b);
        h ? b.write(h) : b.clear();
        d[a] !== e && c && c()
    }
    ;
    dA = function(a) {
        a = $z(a.g_user_cookie_policy);
        if (!a || a.uf && !_.Vy)
            a = null;
        else {
            var b = ["G_AUTHUSER_", _.Vy && a.uf ? "S" : "H", a.ej].join("")
              , c = _.hz[b];
            c || (c = new _.ez(b,_.lz(a)),
            _.hz[b] = c);
            a = c
        }
        _.Af("googleapis.config/sessionIndex", null);
        a.clear()
    }
    ;
    eA = function(a) {
        return Oz(function(b) {
            return a[b]
        })
    }
    ;
    fA = 0;
    gA = !1;
    hA = [];
    iA = {};
    jA = {};
    kA = null;
    lA = function(a) {
        var b = _.Hz;
        return function(c) {
            if (this.f == b && this.t == _.Rg.qo(this.f) && this.origin == _.Rg.Go(this.f))
                return a.apply(this, arguments)
        }
    }
    ;
    mA = function(a) {
        if (a && !decodeURIComponent(a).startsWith("m;/_/scs/"))
            throw Error("Ha");
    }
    ;
    nA = function(a) {
        var b = _.Xf.kh
          , c = b(a).jsh;
        if (null != c)
            return mA(c),
            a;
        if (b = String(b().jsh || _.rf.h || ""))
            mA(b),
            c = (a + "#").indexOf("#"),
            a = a.substr(0, c) + (-1 !== a.substr(0, c).indexOf("?") ? "&" : "?") + "jsh=" + encodeURIComponent(b) + a.substr(c);
        return a
    }
    ;
    oA = function() {
        return !!_.zf("oauth-flow/usegapi")
    }
    ;
    pA = function(a, b) {
        oA() ? kA.unregister(a) : _.Rg.unregister(a + ":" + b)
    }
    ;
    qA = function(a, b, c) {
        oA() ? kA.register(a, c, _.Hn) : _.Rg.register(a + ":" + b, lA(c))
    }
    ;
    rA = function() {
        Qz.parentNode.removeChild(Qz)
    }
    ;
    sA = function(a) {
        var b = Qz;
        _.Fz(b, [{
            Bp: "-webkit-transform",
            duration: 1,
            timing: "ease",
            delay: 0
        }]);
        _.Fz(b, [{
            Bp: "transform",
            duration: 1,
            timing: "ease",
            delay: 0
        }]);
        _.uy(function() {
            b.style.webkitTransform = "translate3d(0px," + a + "px,0px)";
            b.style.transform = "translate3d(0px," + a + "px,0px)"
        }, 0)
    }
    ;
    tA = function() {
        var a = Rz + 88;
        sA(a);
        Rz = a
    }
    ;
    uA = function() {
        var a = Rz - 88;
        sA(a);
        Rz = a
    }
    ;
    vA = function(a) {
        var b = a ? tA : uA
          , c = a ? uA : tA;
        a = a ? "-" : "";
        Rz = parseInt(a + 88, 10);
        Qz.style.webkitTransform = "translate3d(0px," + a + 88 + "px,0px)";
        Qz.style.transform = "translate3d(0px," + a + 88 + "px,0px)";
        Qz.style.display = "";
        Qz.style.visibility = "visible";
        b();
        _.uy(c, 4E3);
        _.uy(rA, 5E3)
    }
    ;
    wA = function(a) {
        var b = _.zf("oauth-flow/toast/position");
        "top" !== b && (b = "bottom");
        var c = document.createElement("div");
        Qz = c;
        c.style.cssText = "position:fixed;left:0px;z-index:1000;width:100%;";
        _.Js(c, "visibility", "hidden");
        _.Js(c, b, "-40px");
        _.Js(c, "height", "128px");
        var d = c;
        if (!_.Yr() && !_.Xr()) {
            d = document.createElement("div");
            d.style.cssText = "float:left;position:relative;left:50%;";
            c.appendChild(d);
            var e = document.createElement("div");
            e.style.cssText = "float:left;position:relative;left:-50%";
            d.appendChild(e);
            d = e
        }
        e = "top" == b ? "-" : "";
        Rz = parseInt(e + 88, 10);
        Qz.style.webkitTransform = "translate3d(0px," + e + 88 + "px,0px)";
        Qz.style.transform = "translate3d(0px," + e + 88 + "px,0px)";
        e = window;
        try {
            for (; e.parent != e && e.parent.document; )
                e = e.parent
        } catch (f) {}
        e = e.document.body;
        try {
            e.insertBefore(c, e.firstChild)
        } catch (f) {}
        _.En.openChild({
            url: ":socialhost:/:session_prefix:_/widget/oauthflow/toast",
            queryParams: {
                clientId: a.client_id,
                idToken: a.id_token
            },
            where: d,
            onRestyle: function() {
                "top" === b ? vA(!0) : vA(!1)
            }
        })
    }
    ;
    xA = function(a) {
        var b = _.kp()
          , c = b && b.scope;
        b = a && a.scope;
        b = "string" === typeof b ? b.split(" ") : b || [];
        if (c) {
            c = c.split(" ");
            for (var d = 0; d < c.length; ++d) {
                var e = c[d];
                -1 == _.qn.call(b, e) && b.push(e)
            }
            0 < b.length && (a.scope = b.join(" "))
        }
        return a
    }
    ;
    yA = function(a, b) {
        var c = null;
        a && b && (c = b.client_id = b.client_id || a.client_id,
        b.scope = b.scope || a.scope,
        b.g_user_cookie_policy = a.cookie_policy,
        b.cookie_policy = b.cookie_policy || a.cookie_policy,
        b.response_type = b.response_type || a.response_type);
        if (b) {
            b.issued_at || (b.issued_at = String(Math.floor((new Date).getTime() / 1E3)));
            var d = parseInt(b.expires_in, 10) || 86400;
            b.error && (d = _.zf("oauth-flow/errorMaxAge") || 86400);
            b.expires_in = String(d);
            b.expires_at || (b.expires_at = String(Math.floor((new Date).getTime() / 1E3) + d));
            b._aa || b.error || null != Xz(c) || !eA(a) || (b._aa = "1");
            a = b.status = {};
            a.google_logged_in = !!b.session_state;
            c = a.signed_in = !!b.access_token;
            a.method = c ? b["g-oauth-window"] ? "PROMPT" : "AUTO" : null
        }
        return b
    }
    ;
    zA = function(a) {
        a = a && a.id_token;
        if (!a || !a.split(".")[1])
            return null;
        a = (a.split(".")[1] + "...").replace(/^((....)+)\.?\.?\.?$/, "$1");
        a = _.Hg(_.Nz(a, !0));
        if (!1 === a)
            throw Error("Ia");
        return a
    }
    ;
    AA = function(a) {
        return (a = zA(a)) ? a.sub : null
    }
    ;
    BA = function(a) {
        a && hA.push(a);
        a = _.Hz;
        var b = document.getElementById(a)
          , c = (new Date).getTime();
        if (b) {
            if (fA && 6E4 > c - fA)
                return;
            var d = _.Rg.qo(a);
            d && (pA("oauth2relayReady", d),
            pA("oauth2callback", d));
            b.parentNode.removeChild(b);
            if (/Firefox/.test(navigator.userAgent))
                try {
                    window.frames[a] = void 0
                } catch (f) {}
            _.Iz();
            a = _.Hz
        }
        fA = c;
        var e = String(2147483647 * (0,
        _.Fh)() | 0);
        b = _.zf("oauth-flow/proxyUrl") || _.zf("oauth-flow/relayUrl");
        oA() ? kA = _.En.openChild({
            where: _.Xf.YS(),
            url: b,
            id: a,
            attributes: {
                style: {
                    width: "1px",
                    height: "1px",
                    position: "absolute",
                    top: "-100px",
                    display: "none"
                },
                "aria-hidden": "true"
            },
            dontclear: !0
        }) : (b = [b, "?parent=", encodeURIComponent(_.wh.getOrigin(window.location.href)), "#rpctoken=", e, "&forcesecure=1"].join(""),
        c = _.Xf.YS(),
        d = _.Xf.IQ({
            name: a,
            id: a
        }),
        d.src = nA(b),
        d.style.width = "1px",
        d.style.height = "1px",
        d.style.position = "absolute",
        d.style.top = "-100px",
        d.tabIndex = -1,
        d.setAttribute("aria-hidden", "true"),
        c.appendChild(d),
        _.Rg.Hw(a));
        qA("oauth2relayReady", e, function() {
            pA("oauth2relayReady", e);
            var f = hA;
            if (null !== f) {
                hA = null;
                for (var h = f.length, k = 0; k < h; ++k)
                    f[k]()
            }
        });
        qA("oauth2callback", e, function(f) {
            var h = _.Xf.kh;
            h = h(f);
            var k = h.state;
            f = k.replace(/\|.*$/, "");
            f = {}.hasOwnProperty.call(jA, f) ? jA[f] : null;
            h.state = f;
            if (null != h.state) {
                f = iA[k];
                delete iA[k];
                k = f && f.key || "token";
                var l = h = yA(f && f.params, h)
                  , m = AA(l);
                if (m) {
                    var n = bA(l.cookie_policy);
                    m = "0" == n[m] || "X" == n[m]
                } else
                    m = !1;
                !m && l && 0 <= (" " + (l.scope || "") + " ").indexOf(" https://www.googleapis.com/auth/plus.login ") && _.zf("isLoggedIn") && "1" === (l && l._aa) && (l._aa = "0",
                gA || (gA = !0,
                wA(l)));
                _.Zz(k, h);
                h = Yz(k);
                if (f) {
                    k = f.popup;
                    l = f.after_redirect;
                    if (k && "keep_open" != l)
                        try {
                            k.close()
                        } catch (p) {}
                    f.callback && (f.callback(h),
                    f.callback = null)
                }
            }
        })
    }
    ;
    _.CA = function(a) {
        null !== hA ? BA(a) : a && a()
    }
    ;
    EA = function(a, b) {
        var c = DA
          , d = AA(a);
        d && (dA(a),
        cA(d, b, function() {
            if (c) {
                var e = {
                    error: "user_signed_out"
                };
                e.client_id = a.client_id;
                e.g_user_cookie_policy = a.g_user_cookie_policy;
                e.scope = a.scope;
                e.response_type = a.response_type;
                e.session_state = a.session_state;
                e = yA(null, e);
                c(e)
            }
        }))
    }
    ;
    DA = function(a) {
        a || (a = Yz(void 0, !0));
        a && "object" === typeof a || (a = {
            error: "invalid_request",
            error_description: "no callback data"
        });
        var b = a.error_description;
        b && window.console && (window.console.error(a.error),
        window.console.error(b));
        a.error || (_.rf.drw = null);
        _.Zz(a);
        if (b = a.authuser)
            _.zf("googleapis.config/sessionIndex"),
            _.Af("googleapis.config/sessionIndex", b);
        _.Jz.Cp(_.Kz, a);
        return a
    }
    ;
    FA = ["client_id", "cookie_policy", "response_type"];
    GA = "client_id response_type login_hint authuser prompt include_granted_scopes after_redirect access_type hl state".split(" ");
    HA = function(a) {
        var b = _.Jk(a);
        b.session_state && b.session_state.extraQueryParams && (b.authuser = b.session_state.extraQueryParams.authuser);
        b.session_state = null;
        a.expires_at && (b.expires_at = parseInt(a.expires_at / 1E3).toString());
        a.expires_in && (b.expires_in = a.expires_in.toString());
        a.first_issued_at && (b.issued_at = parseInt(a.first_issued_at / 1E3).toString(),
        delete b.first_issued_at);
        _.Fw(b);
        return b
    }
    ;
    IA = function(a) {
        if (void 0 === a.include_granted_scopes) {
            var b = _.zf("include_granted_scopes");
            a.include_granted_scopes = !!b
        }
    }
    ;
    JA = function(a) {
        window.console && ("function" === typeof window.console.warn ? window.console.warn(a) : "function" === typeof window.console.log && window.console.log(a))
    }
    ;
    KA = function(a) {
        var b = a || {}
          , c = {};
        _.oc(GA, function(d) {
            null != b[d] && (c[d] = b[d])
        });
        a = _.zf("googleapis/overrideClientId");
        null != a && (c.client_id = a);
        IA(c);
        "string" === typeof b.scope ? c.scope = b.scope : Array.isArray(b.scope) && (c.scope = b.scope.join(" "));
        null != b["openid.realm"] && (c.openid_realm = b["openid.realm"]);
        null != b.cookie_policy ? c.cookie_policy = b.cookie_policy : null != b.cookiepolicy && (c.cookie_policy = b.cookiepolicy);
        null == c.login_hint && null != b.user_id && (c.login_hint = b.user_id);
        try {
            _.vx(c.cookie_policy)
        } catch (d) {
            c.cookie_policy && JA("The cookie_policy configuration: '" + c.cookie_policy + "' is illegal, and thus ignored."),
            delete c.cookie_policy
        }
        null != b.hd && (c.hosted_domain = b.hd);
        null == c.prompt && (1 == b.immediate || "true" == b.immediate ? c.prompt = "none" : "force" == b.approval_prompt && (c.prompt = "consent"));
        "none" == c.prompt && (c.session_selection = "first_valid");
        "none" == c.prompt && "offline" == c.access_type && delete c.access_type;
        "undefined" === typeof c.authuser && (a = _.$i(),
        null != a && (c.authuser = a));
        a = b.redirect_uri || _.zf("oauth-flow/redirectUri");
        null != a && "postmessage" != a && (c.redirect_uri = a);
        c.gsiwebsdk = "shim";
        return c
    }
    ;
    LA = function(a, b) {
        var c = KA(a)
          , d = new _.cl(function(e, f) {
            _.by(c, function(h) {
                var k = h || {};
                _.oc(FA, function(l) {
                    null == k[l] && (k[l] = c[l])
                });
                !c.include_granted_scopes && a && a.scope && (k.scope = a.scope);
                a && null != a.state && (k.state = a.state);
                k.error ? ("none" == c.prompt && "user_logged_out" == k.error && (k.error = "immediate_failed_user_logged_out"),
                f(k)) : (h = HA(k),
                null != h.authuser && _.Af("googleapis.config/sessionIndex", h.authuser),
                e(h))
            })
        }
        );
        b && d.then(b, b);
        return d
    }
    ;
    MA = _.nj.WS;
    NA = null;
    _.QA = function(a, b) {
        if ("force" !== a.approvalprompt) {
            a = _.OA(a);
            a.prompt = "none";
            delete a.redirect_uri;
            delete a.approval_prompt;
            delete a.immediate;
            if (b = !b)
                NA ? (a.client_id !== NA.client_id && window.console && window.console.log && window.console.log("Ignoring mismatched page-level auth param client_id=" + a.client_id),
                b = !0) : (NA = a,
                b = !1);
            b || PA(a)
        }
    }
    ;
    _.OA = function(a) {
        var b = a.redirecturi || "postmessage"
          , c = (0,
        _.Jc)((a.scope || "").replace(/[\s\xa0]+/g, " "));
        b = {
            client_id: a.clientid,
            redirect_uri: b,
            response_type: "code token id_token gsession",
            scope: c
        };
        a.approvalprompt && (b.approval_prompt = a.approvalprompt);
        a.state && (b.state = a.state);
        a.openidrealm && (b["openid.realm"] = a.openidrealm);
        c = "offline" == a.accesstype ? !0 : (c = a.redirecturi) && "postmessage" != c;
        c && (b.access_type = "offline");
        a.requestvisibleactions && (b.request_visible_actions = (0,
        _.Jc)(a.requestvisibleactions.replace(/[\s\xa0]+/g, " ")));
        a.after_redirect && (b.after_redirect = a.after_redirect);
        a.cookiepolicy && "none" !== a.cookiepolicy && (b.cookie_policy = a.cookiepolicy);
        "undefined" != typeof a.includegrantedscopes && (b.include_granted_scopes = a.includegrantedscopes);
        a.e && (b.e = a.e);
        (a = a.authuser || _.zf("googleapis.config/sessionIndex")) && (b.authuser = a);
        (a = _.zf("useoriginassocialhost")) && (b.use_origin_as_socialhost = a);
        return b
    }
    ;
    PA = function(a) {
        _.Up("waaf0", "signin", "0");
        LA(a, function(b) {
            _.Up("waaf1", "signin", "0");
            DA(b)
        })
    }
    ;
    _.RA = function(a) {
        a = _.OA(a);
        _.Af("oauth-flow/authWindowWidth", 445);
        _.Af("oauth-flow/authWindowHeight", 615);
        PA(a)
    }
    ;
    _.SA = function(a) {
        _.Jz.unsubscribe(_.Kz, a);
        _.Jz.subscribe(_.Kz, a)
    }
    ;
    var ZA, bB;
    _.UA = function(a) {
        return a.cookiepolicy ? !0 : (_.TA("cookiepolicy is a required field.  See https://developers.google.com/+/web/signin/#button_attr_cookiepolicy for more information."),
        !1)
    }
    ;
    _.TA = function(a) {
        window.console && (window.console.error ? window.console.error(a) : window.console.log && window.console.log(a))
    }
    ;
    _.YA = function(a, b) {
        var c = _.kp();
        _.jf(a, c);
        c = xA(c);
        if (_.UA(c)) {
            var d = _.VA();
            _.WA(c);
            b ? _.qf(b, "click", function() {
                _.XA(c, d)
            }) : _.XA(c, d)
        }
    }
    ;
    _.VA = function() {
        var a = new ZA;
        _.SA(function(b) {
            a.cJ && b && (b.access_token && _.Af("isPlusUser", !0),
            b["g-oauth-window"] && (a.cJ = !1,
            _.Mg.warn("OTA app install is no longer supported.")))
        });
        return a
    }
    ;
    ZA = function() {
        this.cJ = !1
    }
    ;
    _.WA = function(a) {
        a = _.$A(a);
        _.aB(a.callback);
        _.CA(function() {
            _.QA(a)
        })
    }
    ;
    _.$A = function(a) {
        bB(a);
        a.redirecturi && delete a.redirecturi;
        Pz(function(b) {
            return a[b]
        }) || (a.authuser = 0);
        return a
    }
    ;
    bB = function(a) {
        /^\s*$/.test(a.scope || "") && (a.scope = "https://www.googleapis.com/auth/plus.login")
    }
    ;
    _.aB = function(a) {
        if ("string" === typeof a)
            if (window[a])
                a = window[a];
            else {
                _.TA('Callback function named "' + a + '" not found');
                return
            }
        a && _.SA(a)
    }
    ;
    _.XA = function(a, b) {
        b.cJ = !0;
        a = _.$A(a);
        _.RA(a)
    }
    ;
    _.C("gapi.auth.authorize", LA);
    _.C("gapi.auth.checkSessionState", function(a, b) {
        var c = _.gf();
        c.client_id = a.client_id;
        c.session_state = a.session_state;
        _.CA(function() {
            oA() ? kA.send("check_session_state", c, function(d) {
                b.call(null, d[0])
            }, _.Hn) : _.Rg.call(_.Hz, "check_session_state", lA(function(d) {
                b.call(null, d)
            }), c.session_state, c.client_id)
        })
    });
    _.C("gapi.auth.getAuthHeaderValueForFirstParty", MA);
    _.C("gapi.auth.getToken", Yz);
    _.C("gapi.auth.getVersionInfo", function(a, b) {
        _.CA(function() {
            var c = _.lj() || ""
              , d = null
              , e = null;
            c && (e = c.split(" "),
            2 == e.length && (d = e[1]));
            d ? oA() ? kA.send("get_versioninfo", {
                xapisidHash: d,
                sessionIndex: b
            }, function(f) {
                a(f[0])
            }, _.Hn) : _.Rg.call(_.Hz, "get_versioninfo", lA(function(f) {
                a(f)
            }), d, b) : a()
        })
    });
    _.C("gapi.auth.init", _.CA);
    _.C("gapi.auth.setToken", _.Zz);
    _.C("gapi.auth.signIn", function(a) {
        _.YA(a)
    });
    _.C("gapi.auth.signOut", function() {
        var a = Yz();
        a && EA(a, a.cookie_policy)
    });
    _.C("gapi.auth.unsafeUnpackIdToken", zA);
    _.C("gapi.auth._pimf", _.QA);
    _.C("gapi.auth._oart", wA);
    _.C("gapi.auth._guss", function(a) {
        return aA(a).read()
    });
    var cB = _.kp();
    cB.clientid && cB.scope && cB.callback && !_.zf("disableRealtimeCallback") && _.WA(cB);
    var gy = function() {};
    gy.prototype.bQ = null;
    gy.prototype.getOptions = function() {
        var a;
        (a = this.bQ) || (a = {},
        _.hy(this) && (a[0] = !0,
        a[1] = !0),
        a = this.bQ = a);
        return a
    }
    ;
    var sy;
    sy = function() {}
    ;
    _.ab(sy, gy);
    _.hy = function(a) {
        if (!a.VU && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.VU = d
                } catch (e) {}
            }
            throw Error("Aa");
        }
        return a.VU
    }
    ;
    _.ry = new sy;
    _.Ah = window.googleapis && window.googleapis.server || {};
    var Gh = function(a) {
        return {
            execute: function(b) {
                var c = {
                    method: a.httpMethod || "GET",
                    root: a.root,
                    path: a.url,
                    params: a.urlParams,
                    headers: a.headers,
                    body: a.body
                }
                  , d = window.gapi
                  , e = function() {
                    var f = d.config.get("client/apiKey")
                      , h = d.config.get("client/version");
                    try {
                        var k = d.config.get("googleapis.config/developerKey")
                          , l = d.config.get("client/apiKey", k);
                        d.config.update("client/apiKey", l);
                        d.config.update("client/version", "1.0.0-alpha");
                        var m = d.client;
                        m.request.call(m, c).then(b, b)
                    } finally {
                        d.config.update("client/apiKey", f),
                        d.config.update("client/version", h)
                    }
                };
                d.client ? e() : d.load.call(d, "client", e)
            }
        }
    }, Hh = function(a, b) {
        return function(c) {
            var d = {};
            c = c.body;
            var e = _.Hg(c)
              , f = {};
            if (e && e.length)
                for (var h = e.length, k = 0; k < h; ++k) {
                    var l = e[k];
                    f[l.id] = l
                }
            h = b.length;
            for (k = 0; k < h; ++k)
                l = b[k].id,
                d[l] = e && e.length ? f[l] : e;
            a(d, c)
        }
    }, Ih = function(a) {
        a.transport = {
            name: "googleapis",
            execute: function(b, c) {
                for (var d = [], e = b.length, f = 0; f < e; ++f) {
                    var h = b[f]
                      , k = h.method
                      , l = String(k).split(".")[0];
                    l = _.zf("googleapis.config/versions/" + k) || _.zf("googleapis.config/versions/" + l) || "v1";
                    d.push({
                        jsonrpc: "2.0",
                        id: h.id,
                        method: k,
                        apiVersion: String(l),
                        params: h.params
                    })
                }
                b = Gh({
                    httpMethod: "POST",
                    root: a.transport.root,
                    url: "/rpc?pp=0",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: d
                });
                b.execute.call(b, Hh(c, d))
            },
            root: void 0
        }
    }, Jh = function(a) {
        var b = this.method
          , c = this.transport;
        c.execute.call(c, [{
            method: b,
            id: b,
            params: this.rpc
        }], function(d) {
            d = d[b];
            d.error || (d = d.data || d.result);
            a(d)
        })
    }, Lh = function() {
        for (var a = Kh, b = a.split("."), c = function(k) {
            k = k || {};
            k.groupId = k.groupId || "@self";
            k.userId = k.userId || "@viewer";
            k = {
                method: a,
                rpc: k || {}
            };
            Ih(k);
            k.execute = Jh;
            return k
        }, d = _.r, e = b.length, f = 0; f < e; ++f) {
            var h = d[b[f]] || {};
            f + 1 == e && (h = c);
            d = d[b[f]] = h
        }
        if (1 < b.length && "googleapis" != b[0])
            for (b[0] = "googleapis",
            "delete" == b[b.length - 1] && (b[b.length - 1] = "remove"),
            d = _.r,
            e = b.length,
            f = 0; f < e; ++f)
                h = d[b[f]] || {},
                f + 1 == e && (h = c),
                d = d[b[f]] = h
    }, Kh;
    for (Kh in _.zf("googleapis.config/methods"))
        Lh();
    _.C("googleapis.newHttpRequest", function(a) {
        return Gh(a)
    });
    _.C("googleapis.setUrlParameter", function(a, b) {
        if ("trace" !== a)
            throw Error("C");
        _.Af("client/trace", b)
    });
    _.Ii = function(a) {
        return null == a ? "" : String(a)
    }
    ;
    _.Ji = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    _.Ki = function(a, b) {
        if (!b)
            return a;
        var c = a.indexOf("#");
        0 > c && (c = a.length);
        var d = a.indexOf("?");
        if (0 > d || d > c) {
            d = c;
            var e = ""
        } else
            e = a.substring(d + 1, c);
        a = [a.slice(0, d), e, a.slice(c)];
        c = a[1];
        a[1] = b ? c ? c + "&" + b : b : c;
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    }
    ;
    _.Li = function(a, b, c) {
        if (Array.isArray(b))
            for (var d = 0; d < b.length; d++)
                _.Li(a, String(b[d]), c);
        else
            null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    }
    ;
    _.Mi = function(a) {
        var b = [], c;
        for (c in a)
            _.Li(c, a[c], b);
        return b.join("&")
    }
    ;
    _.Ni = function(a, b) {
        b = _.Mi(b);
        return _.Ki(a, b)
    }
    ;
    var Aj = function(a, b) {
        a = _.Xf.IQ({
            id: a,
            name: a
        });
        a.style.width = "1px";
        a.style.height = "1px";
        a.style.position = "absolute";
        a.style.top = "-100px";
        a.style.display = "none";
        if (window.navigator) {
            var c = window.navigator.userAgent || "";
            var d = window.navigator.product || "";
            c = 0 != c.indexOf("Opera") && -1 == c.indexOf("WebKit") && "Gecko" == d && 0 < c.indexOf("rv:1.")
        } else
            c = !1;
        a.src = c ? "about:blank" : b;
        a.tabIndex = -1;
        "function" === typeof a.setAttribute ? a.setAttribute("aria-hidden", "true") : a["aria-hidden"] = "true";
        document.body.appendChild(a);
        c && (a.src = b);
        return a
    };
    _.nj = {
        wU: _.mj,
        gba: _.jj,
        uT: function() {
            var a = null;
            _.jj() && (a = window.__PVT,
            null == a && (a = (new _.bj(document)).get("BEAT")));
            return a
        },
        WS: _.lj
    };
    var Cj, Bj;
    Cj = function() {
        return !!Bj("auth/useFirstPartyAuthV2")
    }
    ;
    Bj = function(a) {
        return _.zf("googleapis.config/" + a)
    }
    ;
    _.Dj = function(a, b, c) {
        a = void 0 === a ? {} : a;
        b = void 0 === b ? window.location.href : b;
        c = void 0 === c ? "auto" : c;
        if ("none" == c)
            return a;
        var d = a.Authorization
          , e = a.OriginToken;
        if (!d && !e) {
            (e = _.pj()) && e.access_token && ("oauth2" == c || "auto" == c) && (d = String(e.token_type || "Bearer") + " " + e.access_token);
            if (e = !d)
                e = (!!Bj("auth/useFirstPartyAuth") || "1p" == c) && "oauth2" != c;
            if (e && _.jj()) {
                if (Cj()) {
                    d = Bj("primaryEmail");
                    c = Bj("appDomain");
                    e = Bj("fogId");
                    var f = [];
                    d && f.push({
                        key: "e",
                        value: d
                    });
                    c && f.push({
                        key: "a",
                        value: c
                    });
                    e && f.push({
                        key: "u",
                        value: e
                    });
                    d = _.lj(f)
                } else
                    d = _.lj();
                d && (c = a["X-Goog-AuthUser"],
                b = _.$i(b),
                b = c || b,
                _.Ic(_.Ii(b)) && (!Cj() || Cj() && _.Ic(_.Ii(Bj("primaryEmail"))) && _.Ic(_.Ii(Bj("appDomain"))) && _.Ic(_.Ii(Bj("fogId")))) && (b = "0"),
                _.Ic(_.Ii(b)) || (a["X-Goog-AuthUser"] = b))
            }
            d ? a.Authorization = d : !1 !== Bj("auth/useOriginToken") && (e = _.nj.uT()) && (a.OriginToken = e)
        }
        return a
    }
    ;
    _.Ej = function() {
        function a(n, p, q, t, v) {
            var u = f("proxy");
            if (t || !u) {
                u = f("root");
                var w = f("root-1p") || u;
                u = u || "https://content.googleapis.com";
                w = w || "https://clients6.google.com";
                var x = f("xd3") || "/static/proxy.html";
                u = (t || String(p ? w : u)) + x
            }
            u = String(u);
            q && (u += (0 <= u.indexOf("?") ? "&" : "?") + "usegapi=1");
            (p = _.Xf.kh().jsh || _.rf.h) && (u += (0 <= u.indexOf("?") ? "&" : "?") + "jsh=" + encodeURIComponent(p));
            u += "#parent=" + encodeURIComponent(null != v ? String(v) : _.wh.getOrigin(document.location.href));
            return u + ("&rpctoken=" + n)
        }
        function b(n, p, q, t, v) {
            var u = d(q, t, v);
            k[u] || (q = Aj(u, p),
            _.Rg.register("ready:" + n, function() {
                _.Rg.unregister("ready:" + n);
                if (!l[u]) {
                    l[u] = !0;
                    var w = m[u];
                    m[u] = [];
                    for (var x = 0, z = w.length; x < z; ++x) {
                        var F = w[x];
                        e(F.Ip, F.Wda, F.callback)
                    }
                }
            }),
            _.Rg.Hw(u, p),
            k[u] = q)
        }
        function c(n, p, q) {
            var t = String(2147483647 * _.wj() | 0)
              , v = a(t, n, p, q);
              _.Og(function() {
                b(t, v, n, p, q)
            })
        }
        function d(n, p, q) {
            n = a("", n, p, q, "");
            q = h[n + p];
            if (!q) {
                q = new _.Eh;
                q.xx(n);
                q = q.cj().toLowerCase();
                var t = _.wj();
                q += t;
                h[n + p] = q
            }
            return "apiproxy" + q
        }
        function e(n, p, q) {
            var t = void 0
              , v = !1;
            if ("makeHttpRequests" !== n)
                throw 'only "makeHttpRequests" RPCs are implemented';
            var u = function(H) {
                if (H) {
                    if ("undefined" != typeof t && "undefined" != typeof H.root && t != H.root)
                        throw "all requests in a batch must have the same root URL";
                    t = H.root || t;
                    v = _.nj.wU(H.headers)
                }
            };
            if (p)
                for (var w = 0, x = p.length; w < x; ++w) {
                    var z = p[w];
                    z && u(z.params)
                }
            u = !!f("useGapiForXd3");
            var F = d(v, u, t);
            k[F] || c(v, u, t);
            l[F] ? _.Rg.call(F, n, function(H) {
                if (this.f == F && this.t == _.Rg.qo(this.f) && this.origin == _.Rg.Go(this.f)) {
                    var O = _.Hg(H);
                    q(O, H)
                }
            }, p) : (m[F] || (m[F] = []),
            m[F].push({
                Ip: n,
                Wda: p,
                callback: q
            }))
        }
        function f(n) {
            return _.zf("googleapis.config/" + n)
        }
        var h = {}
          , k = {}
          , l = {}
          , m = {};
        return {
            voa: function(n, p, q) {
                return _.Dj(n, p, q)
            },
            yn: e
        }
    }();
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
    }
      , Nh = "Accept Accept-Language Authorization Cache-Control cast-device-capabilities Content-Disposition Content-Encoding Content-Language Content-Length Content-MD5 Content-Range Content-Transfer-Encoding Content-Type Date developer-token EES-S7E-MODE financial-institution-id GData-Version google-cloud-resource-prefix hotrod-board-name hotrod-chrome-cpu-model hotrod-chrome-processors Host If-Match If-Modified-Since If-None-Match If-Unmodified-Since linked-customer-id login-customer-id MIME-Version Origin OriginToken Pragma Range request-id Slug Transfer-Encoding Want-Digest X-Ad-Manager-Impersonation X-Ad-Manager-Debug-Info x-alkali-account-key x-alkali-application-key x-alkali-auth-apps-namespace x-alkali-auth-entities-namespace x-alkali-auth-entity x-alkali-client-locale x-chrome-connected x-framework-xsrf-token X-Client-Data X-ClientDetails X-Client-Version x-debug-settings-metadata X-Firebase-Locale X-GData-Client X-GData-Key X-Goog-AuthUser X-Goog-PageId X-Goog-Encode-Response-If-Executable X-GoogApps-Allowed-Domains X-Goog-AdX-Buyer-Impersonation X-Goog-Api-Client X-Goog-Api-Key X-Google-EOM X-Goog-Visibilities X-Goog-Correlation-Id X-Goog-Request-Info X-Goog-Request-Reason X-Goog-Request-Time X-Goog-Experiments x-goog-ext-124712974-jspb x-goog-ext-251363160-jspb x-goog-ext-259736195-jspb x-goog-ext-467253834-jspb x-goog-ext-472780938-jspb x-goog-ext-477772811-jspb x-goog-ext-275505673-bin x-goog-ext-353267353-bin x-goog-ext-353267353-jspb x-goog-ext-496773601-bin x-goog-ext-328800237-bin x-goog-ext-359275022-bin x-goog-ext-202735639-bin x-goog-ext-223435598-bin x-goog-ext-174067345-bin X-Goog-Firebase-Installations-Auth x-goog-greenenergyuserappservice-metadata X-Firebase-Client X-Firebase-Client-Log-Type X-Firebase-GMPID X-Firebase-Auth-Token X-Firebase-AppCheck X-Firebase-Token X-Goog-Drive-Client-Version X-Goog-Drive-Resource-Keys x-goog-iam-authority-selector x-goog-iam-authorization-token x-goog-request-params x-goog-sherlog-context X-Goog-Sn-Metadata X-Goog-Sn-PatientId X-Goog-Spatula X-Goog-Travel-Bgr X-Goog-Travel-Settings X-Goog-Upload-Command X-Goog-Upload-Content-Disposition X-Goog-Upload-Content-Length X-Goog-Upload-Content-Type X-Goog-Upload-File-Name X-Goog-Upload-Header-Content-Encoding X-Goog-Upload-Header-Content-Length X-Goog-Upload-Header-Content-Type X-Goog-Upload-Header-Transfer-Encoding X-Goog-Upload-Offset X-Goog-Upload-Protocol X-Goog-User-Project X-Goog-Visitor-Id X-Goog-FieldMask X-Google-Project-Override x-goog-maps-api-salt x-goog-maps-api-signature x-goog-maps-client-id x-goog-maps-channel-id x-goog-spanner-database-role X-HTTP-Method-Override X-JavaScript-User-Agent X-Pan-Versionid X-Proxied-User-IP X-Origin X-Referer X-Requested-With X-Stadia-Client-Context X-Upload-Content-Length X-Upload-Content-Type X-Use-Alt-Service X-Use-HTTP-Status-Code-Override X-Ios-Bundle-Identifier X-Android-Package X-Android-Cert X-Ariane-Xsrf-Token X-Earth-Engine-App-ID-Token X-Earth-Engine-Computation-Profile X-Earth-Engine-Computation-Profiling X-Play-Console-Experiments-Override X-Play-Console-Session-Id X-YouTube-Bootstrap-Logged-In X-YouTube-VVT X-YouTube-Page-CL X-YouTube-Page-Timestamp X-Compass-Routing-Destination X-Goog-Meeting-ABR X-Goog-Meeting-Botguardid X-Goog-Meeting-ClientInfo X-Goog-Meeting-ClientVersion X-Goog-Meeting-Debugid X-Goog-Meeting-Identifier X-Goog-Meeting-Interop-Cohorts X-Goog-Meeting-Interop-Type X-Goog-Meeting-OidcIdToken X-Goog-Meeting-RtcClient X-Goog-Meeting-StartSource X-Goog-Meeting-Token X-Goog-Meeting-Viewer-Token x-sdm-id-token X-Sfdc-Authorization X-Server-Timeout x-foyer-client-environment X-Goog-First-Party-Reauth X-Server-Token x-rfui-request-context".split(" ")
      , Oh = "Digest Cache-Control Content-Disposition Content-Encoding Content-Language Content-Length Content-MD5 Content-Range Content-Transfer-Encoding Content-Type Date ETag Expires Last-Modified Location Pragma Range Server Transfer-Encoding WWW-Authenticate Vary Unzipped-Content-MD5 X-Correlation-ID X-Debug-Tracking-Id X-Google-Consent X-Google-EOM X-Goog-Generation X-Goog-Metageneration X-Goog-Safety-Content-Type X-Goog-Safety-Encoding X-Google-Trace X-Goog-Upload-Chunk-Granularity X-Goog-Upload-Control-URL X-Goog-Upload-Size-Received X-Goog-Upload-Status X-Goog-Upload-URL X-Goog-Diff-Download-Range X-Goog-Hash X-Goog-Updated-Authorization X-Server-Object-Version X-Guploader-Customer X-Guploader-Upload-Result X-Guploader-Uploadid X-Google-Gfe-Backend-Request-Cost X-Earth-Engine-Computation-Profile X-Goog-Meeting-ABR X-Goog-Meeting-Botguardid X-Goog-Meeting-ClientInfo X-Goog-Meeting-ClientVersion X-Goog-Meeting-Debugid X-Goog-Meeting-RtcClient X-Goog-Meeting-Token X-Goog-Meeting-Viewer-Token X-Compass-Routing-Destination".split(" ");
    var Ph, Qh, Rh, Sh, Uh, Vh, Wh, Xh, Yh, Zh, $h, ai;
    Ph = null;
    Qh = null;
    Rh = null;
    Sh = function(a, b) {
        var c = a.length;
        if (c != b.length)
            return !1;
        for (var d = 0; d < c; ++d) {
            var e = a.charCodeAt(d)
              , f = b.charCodeAt(d);
            65 <= e && 90 >= e && (e += 32);
            65 <= f && 90 >= f && (f += 32);
            if (e != f)
                return !1
        }
        return !0
    }
    ;
    _.Th = function(a) {
        a = String(a || "").split("\x00").join("");
        for (var b = [], c = !0, d = a.length, e = 0; e < d; ++e) {
            var f = a.charAt(e)
              , h = a.charCodeAt(e);
            if (55296 <= h && 56319 >= h && e + 1 < d) {
                var k = a.charAt(e + 1)
                  , l = a.charCodeAt(e + 1);
                56320 <= l && 57343 >= l && (f += k,
                h = 65536 + (h - 55296 << 10) + (l - 56320),
                ++e)
            }
            if (!(0 <= h && 1114109 >= h) || 55296 <= h && 57343 >= h || 64976 <= h && 65007 >= h || 65534 == (h & 65534))
                h = 65533,
                f = String.fromCharCode(h);
            k = !(32 <= h && 126 >= h) || " " == f || c && ":" == f || "\\" == f;
            !c || "/" != f && "?" != f || (c = !1);
            "%" == f && (e + 2 >= d ? k = !0 : (l = 16 * parseInt(a.charAt(e + 1), 16) + parseInt(a.charAt(e + 2), 16),
            0 <= l && 255 >= l ? (h = l,
            f = 0 == h ? "" : "%" + (256 + l).toString(16).toUpperCase().substr(1),
            e += 2) : k = !0));
            k && (f = encodeURIComponent(f),
            1 >= f.length && (0 <= h && 127 >= h ? f = "%" + (256 + h).toString(16).toUpperCase().substr(1) : (h = 65533,
            f = encodeURIComponent(String.fromCharCode(h)))));
            b.push(f)
        }
        a = b.join("");
        a = a.split("#")[0];
        a = a.split("?");
        b = a[0].split("/");
        c = [];
        d = b.length;
        for (e = 0; e < d; ++e)
            f = b[e],
            h = f.split("%2E").join("."),
            h = h.split(encodeURIComponent("\uff0e")).join("."),
            "." == h ? e + 1 == d && c.push("") : ".." == h ? (0 < c.length && c.pop(),
            e + 1 == d && c.push("")) : c.push(f);
        a[0] = c.join("/");
        for (a = a.join("?"); a && "/" == a.charAt(0); )
            a = a.substr(1);
        return "/" + a
    }
    ;
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
    Wh = function(a) {
        if (!_.Wb(a))
            return null;
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c];
            if ("string" === typeof d && d) {
                var e = d.toLowerCase();
                Sh(d, e) && (b[e] = d)
            }
        }
        for (var f in Mh)
            Object.prototype.hasOwnProperty.call(Mh, f) && (a = Mh[f],
            c = a.toLowerCase(),
            Sh(a, c) && Object.prototype.hasOwnProperty.call(b, c) && (b[c] = a));
        return b
    }
    ;
    Xh = new RegExp("(" + /[\t -~\u00A0-\u2027\u202A-\uD7FF\uE000-\uFFFF]/.source + "|" + /[\uD800-\uDBFF][\uDC00-\uDFFF]/.source + "){1,100}","g");
    Yh = /[ \t]*(\r?\n[ \t]+)+/g;
    Zh = /^[ \t]+|[ \t]+$/g;
    $h = function(a, b) {
        if (!b && "object" === typeof a && a && "number" === typeof a.length) {
            b = a;
            a = "";
            for (var c = b.length, d = 0; d < c; ++d) {
                var e = $h(b[d], !0);
                e && (a && (e = a + ", " + e),
                a = e)
            }
        }
        if ("string" === typeof a && (a = a.replace(Yh, " "),
        a = a.replace(Zh, ""),
        "" == a.replace(Xh, "") && a))
            return a
    }
    ;
    ai = /^[-0-9A-Za-z!#\$%&'\*\+\.\^_`\|~]+$/g;
    _.bi = function(a) {
        if ("string" !== typeof a || !a || !a.match(ai))
            return null;
        a = a.toLowerCase();
        if (null == Rh) {
            var b = []
              , c = _.zf("googleapis/headers/response");
            c && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.zf("client/headers/response")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Oh);
            (c = _.zf("googleapis/headers/request")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            (c = _.zf("client/headers/request")) && "object" === typeof c && "number" === typeof c.length || (c = null);
            null != c && (b = b.concat(c));
            b = b.concat(Nh);
            for (var d in Mh)
                Object.prototype.hasOwnProperty.call(Mh, d) && b.push(Mh[d]);
            Rh = Wh(b)
        }
        return null != Rh && Rh.hasOwnProperty(a) ? Rh[a] : a
    }
    ;
    _.ci = function(a, b) {
        if (!_.bi(a) || !$h(b))
            return null;
        a = a.toLowerCase();
        if (a.match(/^x-google|^x-gfe|^proxy-|^sec-/i) || Vh[a])
            return null;
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
    }
    ;
    _.di = function(a, b) {
        if (!_.bi(a) || !$h(b))
            return null;
        a = a.toLowerCase();
        if (Uh[a])
            return null;
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
    }
    ;
    _.ei = function(a, b) {
        if (_.bi(b) && null != a && "object" === typeof a) {
            var c = void 0, d;
            for (d in a)
                if (Object.prototype.hasOwnProperty.call(a, d) && Sh(d, b)) {
                    var e = $h(a[d]);
                    e && (void 0 !== c && (e = c + ", " + e),
                    c = e)
                }
            return c
        }
    }
    ;
    _.fi = function(a, b, c, d) {
        var e = _.bi(b);
        if (e) {
            c && (c = $h(c));
            b = b.toLowerCase();
            for (var f in a)
                Object.prototype.hasOwnProperty.call(a, f) && Sh(f, b) && delete a[f];
            c && (d || (b = e),
            a[b] = c)
        }
    }
    ;
    _.gi = function(a, b) {
        var c = {};
        if (!a)
            return c;
        a = a.split("\r\n");
        for (var d = a.length, e = 0; e < d; ++e) {
            var f = a[e];
            if (!f)
                break;
            var h = f.indexOf(":");
            if (!(0 >= h)) {
                var k = f.substring(0, h);
                if (k = _.bi(k)) {
                    for (f = f.substring(h + 1); e + 1 < d && a[e + 1].match(/^[ \t]/); )
                        f += "\r\n" + a[e + 1],
                        ++e;
                    if (f = $h(f))
                        if (k = _.di(k, f) || (b ? void 0 : k))
                            k = k.toLowerCase(),
                            h = _.ei(c, k),
                            void 0 !== h && (f = h + ", " + f),
                            _.fi(c, k, f, !0)
                }
            }
        }
        return c
    }
    ;
    /\uffff/.test("\uffff");
    var zy, By, Dy;
    _.wy = function(a, b) {
        var c = _.Wb(b)
          , d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a)
                return;
            a = a[d[c]]
        }
        return a
    }
    ;
    _.xy = function(a) {
        if (!a || "object" !== typeof a)
            return a;
        if ("function" === typeof a.clone)
            return a.clone();
        if ("undefined" !== typeof Map && a instanceof Map)
            return new Map(a);
        if ("undefined" !== typeof Set && a instanceof Set)
            return new Set(a);
        if (a instanceof Date)
            return new Date(a.getTime());
        var b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length), c;
        for (c in a)
            b[c] = _.xy(a[c]);
        return b
    }
    ;
    _.yy = function(a) {
        return (a = _.hy(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
    ;
    zy = {};
    _.Ay = function(a) {
        if (zy[a])
            return zy[a];
        a = String(a);
        if (!zy[a]) {
            var b = /function\s+([^\(]+)/m.exec(a);
            zy[a] = b ? b[1] : "[Anonymous]"
        }
        return zy[a]
    }
    ;
    By = function(a, b) {
        var c = [];
        if (_.mb(b, a))
            c.push("[...circular reference...]");
        else if (a && 50 > b.length) {
            c.push(_.Ay(a) + "(");
            for (var d = a.arguments, e = 0; d && e < d.length; e++) {
                0 < e && c.push(", ");
                var f = d[e];
                switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = _.Ay(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
                }
                40 < f.length && (f = f.slice(0, 40) + "...");
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(By(a.caller, b))
            } catch (h) {
                c.push("[exception trying to get caller]\n")
            }
        } else
            a ? c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    }
    ;
    _.Cy = function(a) {
        var b = Error();
        if (Error.captureStackTrace)
            Error.captureStackTrace(b, a || _.Cy),
            b = String(b.stack);
        else {
            try {
                throw b;
            } catch (c) {
                b = c
            }
            b = (b = b.stack) ? String(b) : null
        }
        b || (b = By(a || arguments.callee.caller, []));
        return b
    }
    ;
    Dy = function(a, b) {
        var c = [];
        for (b = b || 0; b < a.length; b += 2)
            _.Li(a[b], a[b + 1], c);
        return c.join("&")
    }
    ;
    _.Ey = function(a, b) {
        var c = 2 == arguments.length ? Dy(arguments[1], 0) : Dy(arguments, 1);
        return _.Ki(a, c)
    }
    ;
    _.Fy = function(a, b) {
        _.Rj(a, "/") && (a = a.slice(0, -1));
        _.Hc(b, "/") && (b = b.slice(1));
        return a + "/" + b
    }
    ;
    _.Gy = function(a) {
        switch (a) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            return !0;
        default:
            return !1
        }
    }
    ;
    var Iy, Jy, Ky;
    _.Hy = function(a) {
        _.vk.call(this);
        this.headers = new Map;
        this.fE = a || null;
        this.ug = !1;
        this.eE = this.Ra = null;
        this.rB = "";
        this.Gr = 0;
        this.So = this.hI = this.MA = this.iG = !1;
        this.gq = 0;
        this.Pd = null;
        this.tn = "";
        this.HN = this.Hh = !1;
        this.WE = this.wN = null
    }
    ;
    _.ab(_.Hy, _.vk);
    _.Hy.prototype.Db = null;
    Iy = /^https?$/i;
    Jy = ["POST", "PUT"];
    Ky = [];
    _.Ly = function(a, b, c, d, e, f, h) {
        var k = new _.Hy;
        Ky.push(k);
        b && k.ma("complete", b);
        k.Lr("ready", k.D6);
        f && k.zD(f);
        h && (k.Hh = h);
        k.send(a, c, d, e)
    }
    ;
    _.g = _.Hy.prototype;
    _.g.D6 = function() {
        this.Ia();
        _.nb(Ky, this)
    }
    ;
    _.g.zD = function(a) {
        this.gq = Math.max(0, a)
    }
    ;
    _.g.setTrustToken = function(a) {
        this.wN = a
    }
    ;
    _.g.setAttributionReporting = function(a) {
        this.WE = a
    }
    ;
    _.g.send = function(a, b, c, d) {
        if (this.Ra)
            throw Error("Ea`" + this.rB + "`" + a);
        b = b ? b.toUpperCase() : "GET";
        this.rB = a;
        this.Gr = 0;
        this.iG = !1;
        this.ug = !0;
        this.Ra = this.fE ? _.yy(this.fE) : _.yy(_.ry);
        this.eE = this.fE ? this.fE.getOptions() : _.ry.getOptions();
        this.Ra.onreadystatechange = (0,
        _.D)(this.vX, this);
        try {
            this.hI = !0,
            this.Ra.open(b, String(a), !0),
            this.hI = !1
        } catch (h) {
            this.rz(5, h);
            return
        }
        a = c || "";
        c = new Map(this.headers);
        if (d)
            if (Object.getPrototypeOf(d) === Object.prototype)
                for (var e in d)
                    c.set(e, d[e]);
            else if ("function" === typeof d.keys && "function" === typeof d.get) {
                e = _.va(d.keys());
                for (var f = e.next(); !f.done; f = e.next())
                    f = f.value,
                    c.set(f, d.get(f))
            } else
                throw Error("Fa`" + String(d));
        d = Array.from(c.keys()).find(function(h) {
            return "content-type" == h.toLowerCase()
        });
        e = _.r.FormData && a instanceof _.r.FormData;
        !_.mb(Jy, b) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        b = _.va(c);
        for (d = b.next(); !d.done; d = b.next())
            c = _.va(d.value),
            d = c.next().value,
            c = c.next().value,
            this.Ra.setRequestHeader(d, c);
        this.tn && (this.Ra.responseType = this.tn);
        "withCredentials"in this.Ra && this.Ra.withCredentials !== this.Hh && (this.Ra.withCredentials = this.Hh);
        if ("setTrustToken"in this.Ra && this.wN)
            try {
                this.Ra.setTrustToken(this.wN)
            } catch (h) {}
        if ("setAttributionReporting"in this.Ra && this.WE)
            try {
                this.Ra.setAttributionReporting(this.WE)
            } catch (h) {}
        try {
            My(this),
            0 < this.gq && ((this.HN = Ny(this.Ra)) ? (this.Ra.timeout = this.gq,
            this.Ra.ontimeout = (0,
            _.D)(this.Eh, this)) : this.Pd = _.uy(this.Eh, this.gq, this)),
            this.MA = !0,
            this.Ra.send(a),
            this.MA = !1
        } catch (h) {
            this.rz(5, h)
        }
    }
    ;
    var Ny = function(a) {
        return _.qd && "number" === typeof a.timeout && void 0 !== a.ontimeout
    };
    _.Hy.prototype.Eh = function() {
        "undefined" != typeof _.Ta && this.Ra && (this.Gr = 8,
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    _.Hy.prototype.rz = function(a) {
        this.ug = !1;
        this.Ra && (this.So = !0,
        this.Ra.abort(),
        this.So = !1);
        this.Gr = a;
        Oy(this);
        Py(this)
    }
    ;
    var Oy = function(a) {
        a.iG || (a.iG = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    };
    _.Hy.prototype.abort = function(a) {
        this.Ra && this.ug && (this.ug = !1,
        this.So = !0,
        this.Ra.abort(),
        this.So = !1,
        this.Gr = a || 7,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        Py(this))
    }
    ;
    _.Hy.prototype.ua = function() {
        this.Ra && (this.ug && (this.ug = !1,
        this.So = !0,
        this.Ra.abort(),
        this.So = !1),
        Py(this, !0));
        _.Hy.N.ua.call(this)
    }
    ;
    _.Hy.prototype.vX = function() {
        this.isDisposed() || (this.hI || this.MA || this.So ? Qy(this) : this.GJ())
    }
    ;
    _.Hy.prototype.GJ = function() {
        Qy(this)
    }
    ;
    var Qy = function(a) {
        if (a.ug && "undefined" != typeof _.Ta && (!a.eE[1] || 4 != _.Ry(a) || 2 != a.getStatus()))
            if (a.MA && 4 == _.Ry(a))
                _.uy(a.vX, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == _.Ry(a)) {
                a.ug = !1;
                try {
                    a.Yo() ? (a.dispatchEvent("complete"),
                    a.dispatchEvent("success")) : (a.Gr = 6,
                    a.getStatus(),
                    Oy(a))
                } finally {
                    Py(a)
                }
            }
    }
      , Py = function(a, b) {
        if (a.Ra) {
            My(a);
            var c = a.Ra
              , d = a.eE[0] ? function() {}
            : null;
            a.Ra = null;
            a.eE = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
      , My = function(a) {
        a.Ra && a.HN && (a.Ra.ontimeout = null);
        a.Pd && (_.vy(a.Pd),
        a.Pd = null)
    };
    _.Hy.prototype.isActive = function() {
        return !!this.Ra
    }
    ;
    _.Hy.prototype.Yo = function() {
        var a = this.getStatus(), b;
        if (!(b = _.Gy(a))) {
            if (a = 0 === a)
                a = String(this.rB).match(_.Ji)[1] || null,
                !a && _.r.self && _.r.self.location && (a = _.r.self.location.protocol.slice(0, -1)),
                a = !Iy.test(a ? a.toLowerCase() : "");
            b = a
        }
        return b
    }
    ;
    _.Ry = function(a) {
        return a.Ra ? a.Ra.readyState : 0
    }
    ;
    _.Hy.prototype.getStatus = function() {
        try {
            return 2 < _.Ry(this) ? this.Ra.status : -1
        } catch (a) {
            return -1
        }
    }
    ;
    _.Sy = function(a) {
        try {
            return a.Ra ? a.Ra.responseText : ""
        } catch (b) {
            return ""
        }
    }
    ;
    _.Ty = function(a) {
        try {
            if (!a.Ra)
                return null;
            if ("response"in a.Ra)
                return a.Ra.response;
            switch (a.tn) {
            case "":
            case "text":
                return a.Ra.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer"in a.Ra)
                    return a.Ra.mozResponseArrayBuffer
            }
            return null
        } catch (b) {
            return null
        }
    }
    ;
    _.Hy.prototype.getResponseHeader = function(a) {
        if (this.Ra && 4 == _.Ry(this))
            return a = this.Ra.getResponseHeader(a),
            null === a ? void 0 : a
    }
    ;
    _.Hy.prototype.getAllResponseHeaders = function() {
        return this.Ra && 2 <= _.Ry(this) ? this.Ra.getAllResponseHeaders() || "" : ""
    }
    ;
    _.Pj(function(a) {
        _.Hy.prototype.GJ = a(_.Hy.prototype.GJ)
    });
    _.Au = function(a) {
        var b = 0, c;
        for (c in a)
            b++;
        return b
    }
    ;
    _.Bu = function(a) {
        if (a.Jd && "function" == typeof a.Jd)
            return a.Jd();
        if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set)
            return Array.from(a.values());
        if ("string" === typeof a)
            return a.split("");
        if (_.Wb(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        return _.qb(a)
    }
    ;
    _.Cu = function(a) {
        if (a.Fg && "function" == typeof a.Fg)
            return a.Fg();
        if (!a.Jd || "function" != typeof a.Jd) {
            if ("undefined" !== typeof Map && a instanceof Map)
                return Array.from(a.keys());
            if (!("undefined" !== typeof Set && a instanceof Set)) {
                if (_.Wb(a) || "string" === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++)
                        b.push(c);
                    return b
                }
                return _.rb(a)
            }
        }
    }
    ;
    var Eu, Iu, Vu, Qu, Zu, Ru, Tu, Su, Wu, Uu, $u;
    _.Du = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ _.Zb()).toString(36)
    }
    ;
    Eu = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
    ;
    _.Fu = function(a, b, c) {
        for (var d = 0, e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
            var f = a.charCodeAt(d - 1);
            if (38 == f || 63 == f)
                if (f = a.charCodeAt(d + e),
                !f || 61 == f || 38 == f || 35 == f)
                    return d;
            d += e + 1
        }
        return -1
    }
    ;
    _.Gu = /#|$/;
    _.Hu = function(a, b) {
        var c = a.search(_.Gu)
          , d = _.Fu(a, b, c);
        if (0 > d)
            return null;
        var e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return decodeURIComponent(a.slice(d, -1 !== e ? e : 0).replace(/\+/g, " "))
    }
    ;
    Iu = function(a, b, c) {
        if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, c);
        else if (_.Wb(a) || "string" === typeof a)
            Array.prototype.forEach.call(a, b, c);
        else
            for (var d = _.Cu(a), e = _.Bu(a), f = e.length, h = 0; h < f; h++)
                b.call(c, e[h], d && d[h], a)
    }
    ;
    _.Ju = function(a, b) {
        this.He = this.Gh = this.Mi = "";
        this.Pg = null;
        this.DG = this.jn = "";
        this.lh = !1;
        var c;
        a instanceof _.Ju ? (this.lh = void 0 !== b ? b : a.lh,
        _.Ku(this, a.Mi),
        _.Lu(this, a.Gh),
        _.Mu(this, a.dh()),
        _.Nu(this, a.Pg),
        this.setPath(a.getPath()),
        _.Ou(this, a.he.clone()),
        this.ul(a.Rz())) : a && (c = String(a).match(_.Ji)) ? (this.lh = !!b,
        _.Ku(this, c[1] || "", !0),
        _.Lu(this, c[2] || "", !0),
        _.Mu(this, c[3] || "", !0),
        _.Nu(this, c[4]),
        this.setPath(c[5] || "", !0),
        _.Ou(this, c[6] || "", !0),
        this.ul(c[7] || "", !0)) : (this.lh = !!b,
        this.he = new _.Pu(null,this.lh))
    }
    ;
    _.Ju.prototype.toString = function() {
        var a = []
          , b = this.Mi;
        b && a.push(Qu(b, Ru, !0), ":");
        var c = this.dh();
        if (c || "file" == b)
            a.push("//"),
            (b = this.Gh) && a.push(Qu(b, Ru, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.Pg,
            null != c && a.push(":", String(c));
        if (c = this.getPath())
            this.He && "/" != c.charAt(0) && a.push("/"),
            a.push(Qu(c, "/" == c.charAt(0) ? Su : Tu, !0));
        (c = this.he.toString()) && a.push("?", c);
        (c = this.Rz()) && a.push("#", Qu(c, Uu));
        return a.join("")
    }
    ;
    _.Ju.prototype.resolve = function(a) {
        var b = this.clone()
          , c = !!a.Mi;
        c ? _.Ku(b, a.Mi) : c = !!a.Gh;
        c ? _.Lu(b, a.Gh) : c = !!a.He;
        c ? _.Mu(b, a.dh()) : c = null != a.Pg;
        var d = a.getPath();
        if (c)
            _.Nu(b, a.Pg);
        else if (c = !!a.jn) {
            if ("/" != d.charAt(0))
                if (this.He && !this.jn)
                    d = "/" + d;
                else {
                    var e = b.getPath().lastIndexOf("/");
                    -1 != e && (d = b.getPath().slice(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (_.yb(e, "./") || _.yb(e, "/.")) {
                d = _.Hc(e, "/");
                e = e.split("/");
                for (var f = [], h = 0; h < e.length; ) {
                    var k = e[h++];
                    "." == k ? d && h == e.length && f.push("") : ".." == k ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                    d && h == e.length && f.push("")) : (f.push(k),
                    d = !0)
                }
                d = f.join("/")
            } else
                d = e
        }
        c ? b.setPath(d) : c = a.rr();
        c ? _.Ou(b, a.he.clone()) : c = !!a.DG;
        c && b.ul(a.Rz());
        return b
    }
    ;
    _.Ju.prototype.clone = function() {
        return new _.Ju(this)
    }
    ;
    _.Ku = function(a, b, c) {
        a.Mi = c ? Vu(b, !0) : b;
        a.Mi && (a.Mi = a.Mi.replace(/:$/, ""));
        return a
    }
    ;
    _.Lu = function(a, b, c) {
        a.Gh = c ? Vu(b) : b;
        return a
    }
    ;
    _.Ju.prototype.dh = function() {
        return this.He
    }
    ;
    _.Mu = function(a, b, c) {
        a.He = c ? Vu(b, !0) : b;
        return a
    }
    ;
    _.Nu = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("T`" + b);
            a.Pg = b
        } else
            a.Pg = null;
        return a
    }
    ;
    _.Ju.prototype.getPath = function() {
        return this.jn
    }
    ;
    _.Ju.prototype.setPath = function(a, b) {
        this.jn = b ? Vu(a, !0) : a;
        return this
    }
    ;
    _.Ju.prototype.rr = function() {
        return "" !== this.he.toString()
    }
    ;
    _.Ou = function(a, b, c) {
        b instanceof _.Pu ? (a.he = b,
        a.he.GL(a.lh)) : (c || (b = Qu(b, Wu)),
        a.he = new _.Pu(b,a.lh));
        return a
    }
    ;
    _.Ju.prototype.ob = function(a, b) {
        return _.Ou(this, a, b)
    }
    ;
    _.Ju.prototype.getQuery = function() {
        return this.he.toString()
    }
    ;
    _.Xu = function(a, b, c) {
        a.he.set(b, c);
        return a
    }
    ;
    _.g = _.Ju.prototype;
    _.g.mi = function(a) {
        return this.he.get(a)
    }
    ;
    _.g.Rz = function() {
        return this.DG
    }
    ;
    _.g.ul = function(a, b) {
        this.DG = b ? Vu(a) : a;
        return this
    }
    ;
    _.g.removeParameter = function(a) {
        this.he.remove(a);
        return this
    }
    ;
    _.g.GL = function(a) {
        this.lh = a;
        this.he && this.he.GL(a)
    }
    ;
    _.Yu = function(a, b) {
        return a instanceof _.Ju ? a.clone() : new _.Ju(a,b)
    }
    ;
    Vu = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
    ;
    Qu = function(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Zu),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
    ;
    Zu = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    ;
    Ru = /[#\/\?@]/g;
    Tu = /[#\?:]/g;
    Su = /[#\?]/g;
    Wu = /[#\?@]/g;
    Uu = /#/g;
    _.Pu = function(a, b) {
        this.Ge = this.Wc = null;
        this.Eg = a || null;
        this.lh = !!b
    }
    ;
    $u = function(a) {
        a.Wc || (a.Wc = new Map,
        a.Ge = 0,
        a.Eg && Eu(a.Eg, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    ;
    _.g = _.Pu.prototype;
    _.g.Tb = function() {
        $u(this);
        return this.Ge
    }
    ;
    _.g.add = function(a, b) {
        $u(this);
        this.Eg = null;
        a = av(this, a);
        var c = this.Wc.get(a);
        c || this.Wc.set(a, c = []);
        c.push(b);
        this.Ge += 1;
        return this
    }
    ;
    _.g.remove = function(a) {
        $u(this);
        a = av(this, a);
        return this.Wc.has(a) ? (this.Eg = null,
        this.Ge -= this.Wc.get(a).length,
        this.Wc.delete(a)) : !1
    }
    ;
    _.g.clear = function() {
        this.Wc = this.Eg = null;
        this.Ge = 0
    }
    ;
    _.g.isEmpty = function() {
        $u(this);
        return 0 == this.Ge
    }
    ;
    _.g.aj = function(a) {
        $u(this);
        a = av(this, a);
        return this.Wc.has(a)
    }
    ;
    _.g.rk = function(a) {
        var b = this.Jd();
        return _.mb(b, a)
    }
    ;
    _.g.forEach = function(a, b) {
        $u(this);
        this.Wc.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    _.g.Fg = function() {
        $u(this);
        for (var a = Array.from(this.Wc.values()), b = Array.from(this.Wc.keys()), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    _.g.Jd = function(a) {
        $u(this);
        var b = [];
        if ("string" === typeof a)
            this.aj(a) && (b = b.concat(this.Wc.get(av(this, a))));
        else {
            a = Array.from(this.Wc.values());
            for (var c = 0; c < a.length; c++)
                b = b.concat(a[c])
        }
        return b
    }
    ;
    _.g.set = function(a, b) {
        $u(this);
        this.Eg = null;
        a = av(this, a);
        this.aj(a) && (this.Ge -= this.Wc.get(a).length);
        this.Wc.set(a, [b]);
        this.Ge += 1;
        return this
    }
    ;
    _.g.get = function(a, b) {
        if (!a)
            return b;
        a = this.Jd(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    _.g.setValues = function(a, b) {
        this.remove(a);
        0 < b.length && (this.Eg = null,
        this.Wc.set(av(this, a), _.ob(b)),
        this.Ge += b.length)
    }
    ;
    _.g.toString = function() {
        if (this.Eg)
            return this.Eg;
        if (!this.Wc)
            return "";
        for (var a = [], b = Array.from(this.Wc.keys()), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.Jd(d);
            for (var f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        }
        return this.Eg = a.join("&")
    }
    ;
    _.g.clone = function() {
        var a = new _.Pu;
        a.Eg = this.Eg;
        this.Wc && (a.Wc = new Map(this.Wc),
        a.Ge = this.Ge);
        return a
    }
    ;
    var av = function(a, b) {
        b = String(b);
        a.lh && (b = b.toLowerCase());
        return b
    };
    _.Pu.prototype.GL = function(a) {
        a && !this.lh && ($u(this),
        this.Eg = null,
        this.Wc.forEach(function(b, c) {
            var d = c.toLowerCase();
            c != d && (this.remove(c),
            this.setValues(d, b))
        }, this));
        this.lh = a
    }
    ;
    _.Pu.prototype.extend = function(a) {
        for (var b = 0; b < arguments.length; b++)
            Iu(arguments[b], function(c, d) {
                this.add(d, c)
            }, this)
    }
    ;
    var eB = function(a) {
        if (!a || "function" !== typeof a)
            throw new dB("Must provide a function.");
        this.Qg = null;
        this.I7 = a
    }
      , fB = !1;
    fB = !1;
    var gB = function(a) {
        return new _.cl(function(b) {
            var c = a.length
              , d = [];
            if (c)
                for (var e = function(k, l, m) {
                    c--;
                    d[k] = l ? {
                        Ez: !0,
                        value: m
                    } : {
                        Ez: !1,
                        reason: m
                    };
                    0 == c && b(d)
                }, f = 0, h; f < a.length; f++)
                    h = a[f],
                    _.jl(h, _.$a(e, f, !0), _.$a(e, f, !1));
            else
                b(d)
        }
        )
    }, hB, iB, jB, kB = {
        RP: function(a) {
            hB = a;
            try {
                delete kB.RP
            } catch (b) {}
        },
        SP: function(a) {
            iB = a;
            try {
                delete kB.SP
            } catch (b) {}
        },
        TP: function(a) {
            jB = a;
            try {
                delete kB.TP
            } catch (b) {}
        }
    }, lB = function(a) {
        return _.Gy(a.status)
    }, mB = function() {
        var a = !0
          , b = _.yy(_.ry);
        b && void 0 !== b.withCredentials || (a = !1);
        return a
    }, nB = function(a, b) {
        if (null == b)
            return b;
        b = String(b);
        b.match(/^\/\/.*/) && (b = ("http:" == window.location.protocol ? "http:" : "https:") + b);
        b.match(/^\/([^\/].*)?$/) && window.location.host && String(window.location.protocol).match(/^https?:$/) && (b = window.location.protocol + "//" + window.location.host + b);
        var c = b.match(/^(https?:)(\/\/)?(\/([^\/].*)?)?$/i);
        c && window.location.host && String(window.location.protocol).match(/^https?:$/) && (b = c[1] + "//" + window.location.host + (c[3] || ""));
        b = b.replace(/^(https?:\/\/[^\/?#@]*)\/$/i, "$1");
        b = b.replace(/^(http:\/\/[-_a-z0-9.]+):0*80([\/?#].*)?$/i, "$1$2");
        b = b.replace(/^(https:\/\/[-_a-z0-9.]+):0*443([\/?#].*)?$/i, "$1$2");
        b.match(/^https?:\/\/[-_a-z0-9.]*[-_a-z][-_a-z0-9.]*$/i) && (b = b.toLowerCase());
        c = _.zf("client/rewrite");
        _.Rb(c) && Object.prototype.hasOwnProperty.call(c, b) ? b = String(c[b] || b) : (b = b.replace(/^(https?):\/\/www\.googleapis\.com$/, "$1://content.googleapis.com"),
        b = b.replace(/^(https?):\/\/www-(googleapis-[-_a-z0-9]+\.[-_a-z0-9]+\.google\.com)$/, "$1://content-$2"),
        b.match(/^https?:\/\/content(-[-_a-z0-9.]+)?\.googleapis\.com$/) || (b = b.replace(/^(https?):\/\/([-_a-z0-9]+(\.[-_a-z0-9]+)?\.googleapis\.com)$/, "$1://content-$2")));
        a && (a = _.zf("client/firstPartyRewrite"),
        _.Rb(a) && Object.prototype.hasOwnProperty.call(a, b) ? b = String(a[b] || b) : (b = b.replace(/^(https?):\/\/content\.googleapis\.com$/, "$1://clients6.google.com"),
        b = b.replace(/^(https?):\/\/content-([-a-z0-9]+)\.([-a-z0-9]+)\.googleapis\.com$/, "$1://$2-googleapis.$3.google.com"),
        b = b.replace(/^(https?):\/\/content-([-a-z0-9]+)\.googleapis\.com$/, "$1://$2.clients6.google.com"),
        b = b.replace(/^(https?):\/\/([-a-z0-9]+)-www-googleapis\.([-a-z0-9]+).google.com$/, "$1://content-googleapis-$2.$3.google.com")));
        return b
    }, dB = function(a) {
        _.ib.call(this, a)
    };
    _.E(dB, _.ib);
    dB.prototype.name = "gapix.client.GapiClientError";
    eB.prototype.then = function(a, b, c) {
        this.Qg || (this.Qg = this.I7());
        return this.Qg.then(a, b, c)
    }
    ;
    eB.prototype.pD = function(a) {
        this.Qg || (this.Qg = a)
    }
    ;
    var oB = function(a) {
        var b = {}, c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = _.ei(a, c);
                d && (c = _.di(c, d)) && _.fi(b, c, d, !0)
            }
        return b
    }
      , pB = {
        error: {
            code: -1,
            message: "A network error occurred and the request could not be completed."
        }
    }
      , qB = function(a, b, c, d) {
        _.Hy.call(this);
        this.Qd = a;
        this.gJ = b;
        this.Td = c;
        a = {};
        if (d)
            for (var e in d)
                Object.prototype.hasOwnProperty.call(d, e) && (b = _.ei(d, e),
                void 0 !== b && (e = _.ci(e, b)) && _.fi(a, e, b));
        d = {};
        for (e in a)
            Object.prototype.hasOwnProperty.call(a, e) && (d[unescape(encodeURIComponent(e))] = unescape(encodeURIComponent(a[e])));
        this.Yu = d;
        this.Qg = null
    };
    _.E(qB, _.Hy);
    qB.prototype.then = function(a) {
        this.Qg || (this.Qg = (new _.cl(function(b, c) {
            this.ma("error", (0,
            _.D)(function() {
                c(rB(this))
            }, this));
            this.ma("success", (0,
            _.D)(function() {
                b(rB(this))
            }, this));
            this.send(this.Qd, this.gJ, this.Td, this.Yu)
        }
        ,this)).then(function(b) {
            b.headers = oB(b.headers);
            return b
        }, function(b) {
            return b.status ? (b.headers = oB(b.headers),
            _.hl(b)) : _.hl({
                result: pB,
                body: '{"error":{"code":-1,"message":"A network error occurred and the request could not be completed."}}',
                headers: null,
                status: null,
                statusText: null
            })
        }));
        return this.Qg.then.apply(this.Qg, arguments)
    }
    ;
    var rB = function(a) {
        var b = a.getStatus()
          , c = _.Sy(a);
        var d = 204 == b ? !1 : "" == a.tn ? _.Hg(c) : _.Ty(a);
        var e = a.getAllResponseHeaders();
        e = _.gi(e, !1);
        try {
            var f = 2 < _.Ry(a) ? a.Ra.statusText : ""
        } catch (h) {
            f = ""
        }
        return {
            result: d,
            body: c,
            headers: e,
            status: b,
            statusText: f
        }
    }
      , sB = /;\s*charset\s*=\s*("utf-?8"|utf-?8)\s*(;|$)/i
      , tB = /^(text\/[^\s;\/""]+|application\/(json(\+[^\s;\/""]*)?|([^\s;\/""]*\+)?xml))\s*(;|$)/i
      , uB = /;\s*charset\s*=/i
      , vB = /(([\r\n]{0,2}[A-Za-z0-9+\/]){4,4}){0,1024}([\r\n]{0,2}[A-Za-z0-9+\/][\r\n]{0,2}[AQgw]([\r\n]{0,2}=){2,2}|([\r\n]{0,2}[A-Za-z0-9+\/]){2,2}[\r\n]{0,2}[AEIMQUYcgkosw048][\r\n]{0,2}=|([\r\n]{0,2}[A-Za-z0-9+\/]){4,4})[\r\n]{0,2}/g
      , wB = function(a) {
        var b = [];
        a = a.replace(vB, function(c) {
            b.push(_.Nz(c));
            return ""
        });
        if (a.length)
            throw Error("Ga");
        return b.join("")
    }
      , xB = function(a) {
        var b = a.headers;
        if (b && "base64" === _.ei(b, "X-Goog-Safety-Encoding")) {
            var c = wB(a.body)
              , d = _.ei(b, "X-Goog-Safety-Content-Type");
            b["Content-Type"] = d;
            if (d.match(sB) || d.match(tB) && !d.match(uB))
                c = _.Dw(_.yi(c));
            _.fi(b, "X-Goog-Safety-Encoding");
            _.fi(b, "X-Goog-Safety-Content-Type");
            a.body = c
        }
    }
      , yB = function(a, b, c) {
        c || ((c = _.zf("googleapis.config/proxy")) && (c = String(c).replace(/\/static\/proxy\.html$/, "") || "/"),
        c = String(c || ""));
        c || (c = _.zf("googleapis.config/root"),
        b && (c = _.zf("googleapis.config/root-1p") || c),
        c = String(c || ""));
        c = String(nB(b, c) || c);
        return a = _.Fy(c, a)
    }
      , zB = function(a, b) {
        var c = a.params || _.gf();
        c.url = c.path;
        var d = c.root;
        d = yB("/", _.mj(c.headers), d);
        d.match(/^(.*[^\/])?\/$/) && (d = d.substr(0, d.length - 1));
        c.root = d;
        a.params = c;
        _.Ej.yn("makeHttpRequests", [a], function(e, f) {
            e && e.gapiRequest ? (e.gapiRequest.data ? xB(e.gapiRequest.data) : xB(e),
            b(e, _.Ig(e))) : b(e, f)
        })
    }
      , AB = function(a) {
        var b = _.wy(a, "params", "headers");
        b && "object" === typeof b || (b = {});
        a = {};
        for (var c in b)
            if (Object.prototype.hasOwnProperty.call(b, c)) {
                var d = _.ei(b, c);
                d && (_.ci(c, d),
                _.fi(a, c, d))
            }
        c = "chrome-extension" == (window.location.href.match(_.Ji)[1] || null);
        a = _.mj(a);
        return !(c && a) && mB()
    }
      , BB = function(a) {
        return new _.cl(function(b, c) {
            var d = function(e) {
                e && e.gapiRequest ? e = e.gapiRequest.data || e : c(e);
                e = {
                    result: 204 != e.status && _.Hg(e.body),
                    body: e.body,
                    headers: e.headers || null,
                    status: e.status || null,
                    statusText: e.statusText || null
                };
                lB(e) ? b(e) : c(e)
            };
            try {
                zB(a, d)
            } catch (e) {
                c(e)
            }
        }
        )
    }
      , CB = function(a) {
        var b = !_.zf("client/cors") || !!_.zf("client/xd4")
          , c = {};
        _.sn(a, function(d, e) {
            (d = _.ci(e, d)) || b || (d = _.bi(e));
            d && (e = _.ei(a, d)) && _.fi(c, d, e)
        });
        return c
    }
      , DB = function(a) {
        var b = a.params || _.gf();
        a = _.Jk(b.headers || {});
        var c = b.httpMethod || "GET"
          , d = String(b.url || "")
          , e = encodeURIComponent("$unique");
        if (!("POST" === c || 0 <= _.Fu(d, "$unique", d.search(_.Gu)) || 0 <= _.Fu(d, e, d.search(_.Gu)))) {
            var f = [];
            for (h in a)
                Object.prototype.hasOwnProperty.call(a, h) && f.push(h.toLowerCase());
            f.sort();
            f.push(_.yh(location.href));
            var h = f.join(":");
            f = _.ej();
            f.update(h);
            h = f.cj().toLowerCase().substr(0, 7);
            h = String(parseInt(h, 16) % 1E3 + 1E3).substr(1);
            d = _.Ey(d, e, "gc" + h)
        }
        e = b.body || null;
        h = b.responseType || null;
        b = _.mj(a) || "1p" == b.authType;
        f = !!_.zf("googleapis.config/auth/useUberProxyAuth") || !!_.zf("client/withCredentials");
        _.fi(a, "X-Referer");
        a = CB(a);
        var k = new qB(d,c,e,a);
        k.Hh = b || f;
        h && (k.tn = h);
        return new _.cl(function(l, m) {
            k.then(function(n) {
                xB(n);
                l(n)
            }, function(n) {
                m(n)
            })
        }
        )
    }
      , EB = function(a, b) {
        var c = function(d) {
            d = _.Jk(d);
            delete d.result;
            d = {
                gapiRequest: {
                    data: d
                }
            };
            b && b(d, _.Ig(d))
        };
        DB(a).then(c, c)
    }
      , FB = function(a, b) {
        (_.zf("client/cors") || _.zf("client/xd4")) && AB(a) ? EB(a, b) : zB(a, b)
    }
      , GB = function(a) {
        this.rn = a;
        this.ug = !1;
        this.promise = {
            then: (0,
            _.D)(function(b, c, d) {
                this.ug || (this.ug = !0);
                this.iw && !this.gw ? this.rn.resolve(this.iw) : this.gw && !this.iw && this.rn.reject(this.gw);
                return this.rn.promise.then(b, c, d)
            }, this)
        }
    };
    GB.prototype.resolve = function(a) {
        this.ug ? this.rn.resolve(a) : this.iw || this.gw || (this.iw = a)
    }
    ;
    GB.prototype.reject = function(a) {
        this.ug ? this.rn.reject(a) : this.iw || this.gw || (this.gw = a)
    }
    ;
    var HB = function(a) {
        a = _.xy(a.error);
        return {
            code: a.code,
            data: a.errors,
            message: a.message
        }
    }
      , IB = function(a) {
        throw Error("Ja`" + a);
    };
    var JB = function(a) {
        eB.call(this, JB.prototype.Ap);
        if (!a || "object" != typeof a && "string" != typeof a)
            throw new dB("Missing required parameters");
        if ("string" === typeof a) {
            var b = {};
            b.path = a
        } else
            b = a;
        if (!b.path)
            throw new dB('Missing required parameter: "path"');
        this.Li = {};
        this.Li.path = b.path;
        this.Li.method = b.method || "GET";
        this.Li.params = b.params || {};
        this.Li.headers = b.headers || {};
        this.Li.body = b.body;
        this.Li.root = b.root;
        this.Li.responseType = b.responseType;
        this.Li.apiId = b.apiId;
        this.Mn = b.authType || "auto";
        this.oba = !!b.isXd4;
        this.BV = !1;
        this.Rj(this.Mn);
        this.XY = !1
    };
    _.E(JB, eB);
    JB.prototype.nf = function() {
        return this.Li
    }
    ;
    JB.prototype.Rj = function(a) {
        this.Mn = a;
        this.BV = "1p" === this.Mn
    }
    ;
    JB.prototype.Ku = function() {
        return this.BV
    }
    ;
    JB.prototype.bl = function() {
        if (!this.XY) {
            this.XY = !0;
            var a = this.Li
              , b = a.headers = a.headers || {}
              , c = []
              , d = [];
            for (h in b)
                if (Object.prototype.hasOwnProperty.call(b, h)) {
                    c.push(h);
                    var e = h
                      , f = _.ei(b, e);
                    f && (e = _.ci(e, f) || _.bi(e)) && d.push([e, f])
                }
            var h = 0;
            for (e = c.length; h < e; ++h)
                delete b[c[h]];
            c = 0;
            for (h = d.length; c < h; ++c)
                _.fi(b, d[c][0], d[c][1]);
            if (this.oba)
                d = "1p" == this.Mn;
            else {
                d = b;
                c = String(_.zf("client/version", "1.1.0"));
                h = String(_.zf("client/name", "google-api-javascript-client"));
                h = !0 === KB[h] ? h : "google-api-javascript-client";
                e = String(_.zf("client/appName", ""));
                f = [];
                e && (f.push(e),
                f.push(" "));
                f.push(h);
                c && (f.push("/"),
                f.push(c));
                _.fi(d, "X-JavaScript-User-Agent", f.join(""));
                _.fi(b, "X-Requested-With", "XMLHttpRequest");
                d = _.ei(b, "Content-Type");
                a.body && !d && _.fi(b, "Content-Type", "application/json");
                _.zf("client/allowExecutableResponse") || _.fi(b, "X-Goog-Encode-Response-If-Executable", "base64");
                (d = _.ei(b, "Content-Type")) && "application/json" == d.toLowerCase() && !a.params.alt && (a.params.alt = "json");
                (d = a.body || null) && _.Rb(d) && (a.body = _.Ig(d));
                a.key = a.id;
                b = _.Dj(b, void 0, this.Mn);
                d = _.mj(b);
                if ((c = b) && window.navigator) {
                    h = [];
                    for (e = 0; e < LB.length; e++)
                        (f = window.navigator[LB[e]]) && h.push(encodeURIComponent(LB[e]) + "=" + encodeURIComponent(f));
                    _.fi(c, "X-ClientDetails", h.join("&"))
                }
                (c = _.zf("client/apiKey")) && void 0 === a.params.key && (a.params.key = c);
                (c = _.zf("client/trace")) && !a.params.trace && (a.params.trace = c)
            }
            "auto" == this.Mn && (d ? this.Rj("1p") : (b = _.ei(b, "Authorization")) && String(b).match(/^(Bearer|MAC)[ \t]/i) ? this.Rj("oauth2") : this.Rj("none"));
            if ((b = String(a.path || "").match(/^(https?:\/\/[^\/?#]+)([\/?#].*)?$/i)) && !a.root)
                if (a.root = String(b[1]),
                a.path = String(b[2] || "/"),
                a.path.match(/^\/_ah\/api(\/.*)?$/))
                    a.root += "/_ah/api",
                    a.path = a.path.substr(8);
                else {
                    b = _.zf("googleapis.config/root");
                    d && (b = _.zf("googleapis.config/root-1p") || b);
                    b = String(b || "");
                    c = a.root + a.path;
                    if (h = b && c.substr(0, b.length) === b)
                        h = _.Yu(b),
                        e = _.Yu(c),
                        h = (!h.He && !e.He || h.dh() == e.dh()) && (null == h.Pg && null == e.Pg || h.Pg == e.Pg);
                    h && (a.path = c.substr(b.length),
                    a.root = b)
                }
            b = a.params;
            c = _.Th(a.path);
            h = String(_.zf("googleapis.config/xd3") || "");
            18 <= h.length && "/static/proxy.html" == h.substring(h.length - 18) && (h = h.substring(0, h.length - 18));
            h || (h = "/");
            e = _.Th(h);
            if (h != e)
                throw Error("F");
            "/" != h.charAt(h.length - 1) && (h += "/");
            c = _.Fy(h, c);
            _.Rj(c, "/") && (c = c.substring(0, c.length - 1));
            h = _.gf();
            for (var k in b)
                Object.prototype.hasOwnProperty.call(b, k) && (e = encodeURIComponent(k),
                h[e] = b[k]);
            c = _.Ni(c, h);
            a.path = c;
            a.root = nB(!!d, a.root);
            a.url = yB(a.path, !!d, a.root)
        }
    }
    ;
    var MB = function(a) {
        a.bl();
        var b = a.Li;
        return {
            key: "gapiRequest",
            params: {
                id: b.id,
                key: b.key,
                url: b.url,
                path: b.path,
                httpMethod: b.method,
                body: b.body || "",
                headers: b.headers || {},
                urlParams: {},
                root: b.root,
                authType: a.Mn
            }
        }
    };
    JB.prototype.execute = function(a) {
        var b = MB(this);
        FB(b, function(c, d) {
            var e = c;
            c.gapiRequest && (e = c.gapiRequest);
            e && e.data && (e = e.data);
            c = e;
            c = c instanceof Array ? c[0] : c;
            if (204 != c.status && c.body)
                try {
                    var f = _.Hg(c.body)
                } catch (h) {}
            a && a(f, d)
        })
    }
    ;
    JB.prototype.Ap = function() {
        var a = MB(this);
        return (_.zf("client/cors") || _.zf("client/xd4")) && AB(a) ? DB(a) : BB(a)
    }
    ;
    JB.prototype.tj = function() {
        return this.Ap()
    }
    ;
    var LB = ["appVersion", "platform", "userAgent"]
      , KB = {
        "google-api-gwt-client": !0,
        "google-api-javascript-client": !0
    };
    JB.prototype.execute = JB.prototype.execute;
    JB.prototype.then = JB.prototype.then;
    JB.prototype.getPromise = JB.prototype.tj;
    var NB = function(a) {
        if (!a || "object" != typeof a)
            throw new dB("Missing rpc parameters");
        if (!a.method)
            throw new dB("Missing rpc method");
        this.GC = a
    };
    NB.prototype.Xd = function() {
        var a = this.GC.transport;
        return a ? a.root || null : null
    }
    ;
    NB.prototype.execute = function(a) {
        var b = iB();
        b.add(this, {
            id: "gapiRpc",
            callback: this.Fv(a)
        });
        b.execute()
    }
    ;
    NB.prototype.BB = function(a) {
        var b = this.GC.method, c = String, d;
        (d = this.GC.apiVersion) || (d = String(b).split(".")[0],
        d = _.zf("googleapis.config/versions/" + b) || _.zf("googleapis.config/versions/" + d) || "v1",
        d = String(d));
        a = {
            jsonrpc: "2.0",
            id: a,
            method: b,
            apiVersion: c(d)
        };
        (b = this.GC.rpcParams) && (a.params = b);
        return a
    }
    ;
    NB.prototype.Fv = function(a) {
        return function(b, c) {
            if (b)
                if (b.error) {
                    var d = b.error;
                    null == d.error && (d.error = _.Jk(b.error))
                } else
                    d = b.result || b.data,
                    _.Rb(d) && null == d.result && (d.result = _.Jk(b.result || b.data));
            else
                d = !1;
            a(d, c)
        }
    }
    ;
    NB.prototype.execute = NB.prototype.execute;
    var PB = function(a, b) {
        this.Ie = b || 0;
        2 == this.Ie ? (b = null,
        null != a && _.Rb(a) && (b = {},
        b.method = a.method,
        b.rpcParams = a.rpcParams,
        b.transport = a.transport,
        b.root = a.root,
        b.apiVersion = a.apiVersion,
        b.authType = a.authType),
        this.Eb = new NB(b)) : (0 == this.Ie && (b = a && a.callback) && (a.callback = OB(b)),
        b = null,
        null != a && (_.Rb(a) ? (b = {},
        b.path = a.path,
        b.method = a.method,
        b.params = a.params,
        b.headers = a.headers,
        b.body = a.body,
        b.root = a.root,
        b.responseType = a.responseType,
        b.authType = a.authType,
        b.apiId = a.apiId) : "string" === typeof a && (b = a)),
        this.Eb = new JB(b))
    }
      , OB = function(a) {
        return function(b) {
            if (null != b && _.Rb(b) && b.error) {
                var c = HB(b);
                b = _.Ig([{
                    id: "gapiRpc",
                    error: c
                }]);
                c.error = _.xy(c)
            } else
                null == b && (b = {}),
                c = _.xy(b),
                c.result = _.xy(b),
                b = _.Ig([{
                    id: "gapiRpc",
                    result: b
                }]);
            a(c, b)
        }
    };
    _.g = PB.prototype;
    _.g.getFormat = function() {
        return this.Ie
    }
    ;
    _.g.execute = function(a) {
        this.Eb.execute(a && 1 == this.Ie ? OB(a) : a)
    }
    ;
    _.g.then = function(a, b, c) {
        2 == this.Ie && IB('The "then" method is not available on this object.');
        return this.Eb.then(a, b, c)
    }
    ;
    _.g.pD = function(a) {
        this.Eb.pD && this.Eb.pD(a)
    }
    ;
    _.g.nf = function() {
        if (this.Eb.nf)
            return this.Eb.nf()
    }
    ;
    _.g.bl = function() {
        this.Eb.nf && this.Eb.bl()
    }
    ;
    _.g.Xd = function() {
        if (this.Eb.Xd)
            return this.Eb.Xd()
    }
    ;
    _.g.BB = function(a) {
        if (this.Eb.BB)
            return this.Eb.BB(a)
    }
    ;
    _.g.Rj = function(a) {
        this.Eb.Rj && this.Eb.Rj(a)
    }
    ;
    _.g.Ku = function() {
        return this.Eb.Ku()
    }
    ;
    _.g.tj = function() {
        if (this.Eb.tj)
            return this.Eb.tj()
    }
    ;
    PB.prototype.execute = PB.prototype.execute;
    PB.prototype.then = PB.prototype.then;
    PB.prototype.getPromise = PB.prototype.tj;
    var QB = /<response-(.*)>/
      , RB = /^application\/http(;.+$|$)/
      , SB = ["clients6.google.com", "content.googleapis.com", "www.googleapis.com"]
      , TB = function(a, b) {
        a = _.ei(a, b);
        if (!a)
            throw new dB("Unable to retrieve header.");
        return a
    }
      , UB = function(a) {
        var b = void 0;
        a = _.va(a);
        for (var c = a.next(); !c.done; c = a.next()) {
            c = c.value.nf().apiId;
            if ("string" !== typeof c)
                return "batch";
            if (void 0 === b)
                b = c;
            else if (b != c)
                return "batch"
        }
        b = _.zf("client/batchPath/" + b) || "batch/" + b.split(":").join("/");
        return String(b)
    }
      , VB = function(a) {
        a = a.map(function(b) {
            return b.request
        });
        return UB(a)
    }
      , WB = function(a, b) {
        var c = [];
        a = a.nf();
        var d = function(f, h) {
            _.sn(f, function(k, l) {
                h.push(l + ": " + k)
            })
        }
          , e = {
            "Content-Type": "application/http",
            "Content-Transfer-Encoding": "binary"
        };
        e["Content-ID"] = "<" + b + ">";
        d(e, c);
        c.push("");
        c.push(a.method + " " + a.path);
        d(a.headers, c);
        c.push("");
        a.body && c.push(a.body);
        return c.join("\r\n")
    }
      , ZB = function(a, b) {
        a = XB(a, b);
        var c = {};
        _.pb(a, function(d, e) {
            c[e] = YB(d, e)
        });
        return c
    }
      , YB = function(a, b) {
        return {
            result: a.result || a.body,
            rawResult: _.Ig({
                id: b,
                result: a.result || a.body
            }),
            id: b
        }
    }
      , XB = function(a, b) {
        a = (0,
        _.Jc)(a);
        _.Rj(a, "--") && (a = a.substring(0, a.length - 2));
        a = a.split(b);
        b = _.gf();
        for (var c = 0; c < a.length; c++)
            if (a[c]) {
                var d;
                if (d = a[c]) {
                    _.Rj(d, "\r\n") && (d = d.substring(0, d.length - 2));
                    if (d) {
                        d = d.split("\r\n");
                        for (var e = 0, f = {
                            headers: {},
                            body: ""
                        }; e < d.length && "" == d[e]; )
                            e++;
                        for (f.outerHeaders = $B(d, e); e < d.length && "" != d[e]; )
                            e++;
                        e++;
                        var h = d[e++].split(" ");
                        f.status = Number(h[1]);
                        f.statusText = h.slice(2).join(" ");
                        for (f.headers = $B(d, e); e < d.length && "" != d[e]; )
                            e++;
                        e++;
                        f.body = d.slice(e).join("\r\n");
                        xB(f);
                        d = f
                    } else
                        d = null;
                    e = _.gf();
                    f = TB(d.outerHeaders, "Content-Type");
                    if (null == RB.exec(f))
                        throw new dB("Unexpected Content-Type <" + f + ">");
                    f = TB(d.outerHeaders, "Content-ID");
                    f = QB.exec(f);
                    if (!f)
                        throw new dB("Unable to recognize Content-Id.");
                    e.id = decodeURIComponent(f[1].split("@")[0].replace(/^.*[+]/, ""));
                    e.response = {
                        status: d.status,
                        statusText: d.statusText,
                        headers: d.headers
                    };
                    204 != d.status && (e.response.body = d.body,
                    e.response.result = _.Hg(d.body));
                    d = e
                } else
                    d = null;
                d && d.id && (b[d.id] = d.response)
            }
        return b
    }
      , $B = function(a, b) {
        for (var c = []; b < a.length && a[b]; b++)
            c.push(a[b]);
        return _.gi(c.join("\r\n"), !1)
    }
      , aC = function(a, b, c) {
        a = a || b;
        if (!a || "https" !== _.Yu(a).Mi)
            if (a = c ? _.zf("googleapis.config/root-1p") : _.zf("googleapis.config/root"),
            !a)
                return !1;
        a = nB(c, String(a)) || a;
        return SB.includes(_.Yu(a).dh())
    };
    var bC = function(a) {
        eB.call(this, bC.prototype.Ap);
        this.Bk = {};
        this.vy = {};
        this.nn = [];
        this.Ef = a;
        this.Oba = !!a;
        this.yU = this.CA = !1
    };
    _.E(bC, eB);
    var cC = function(a, b) {
        a = _.va(Object.values(a.Bk));
        for (var c = a.next(); !c.done; c = a.next())
            if (c.value.map(function(d) {
                return d.id
            }).includes(b))
                return !0;
        return !1
    };
    bC.prototype.yq = function(a) {
        (function(b) {
            setTimeout(function() {
                throw b;
            })
        }
        )(a)
    }
    ;
    bC.prototype.add = function(a, b) {
        var c = b || _.gf();
        b = _.gf();
        if (!a)
            throw new dB("Batch entry " + (_.hf(c, "id") ? '"' + c.id + '" ' : "") + "is missing a request method");
        a.bl();
        b.request = a;
        var d = _.ml();
        d = new GB(d);
        b.BC = d;
        a.pD(b.BC.promise);
        d = a.nf().headers;
        _.mj(d) && (this.CA = !0);
        (d = String((d || {}).Authorization || "") || null) && d.match(/^Bearer|MAC[ \t]/i) && (this.yU = !0);
        d = a.nf().root;
        if (!this.Oba) {
            if (d && this.Ef && d != this.Ef)
                throw new dB('The "root" provided in this request is not consistent with that of existing requests in the batch.');
            this.Ef = d || this.Ef
        }
        if (_.hf(c, "id")) {
            d = c.id;
            if (cC(this, d))
                throw new dB('Batch ID "' + d + '" already in use, please use another.');
            b.id = d
        } else {
            do
                b.id = String(Math.round(2147483647 * _.wj()));
            while (cC(this, b.id))
        }
        b.callback = c.callback;
        c = "batch";
        aC(this.Ef, a.nf().path, this.CA) && (c = VB([b]));
        this.Bk[c] = this.Bk[c] || [];
        this.Bk[c].push(b);
        this.vy[b.id] = b;
        return b.id
    }
    ;
    var dC = function(a) {
        var b = []
          , c = aC(a.Ef, void 0, a.CA);
        1 < Object.entries(a.Bk).length && _.Mg.warn("Heterogeneous batch requests are deprecated. See https://developers.googleblog.com/2018/03/discontinuing-support-for-json-rpc-and.html");
        for (var d = _.va(Object.entries(a.Bk)), e = d.next(); !e.done; e = d.next()) {
            e = _.va(e.value);
            var f = e.next().value;
            e = e.next().value;
            for (var h = !0, k = _.va(e), l = k.next(); !l.done; l = k.next())
                l = l.value,
                l.request.bl(),
                "batch" === f && c && (h = !1,
                l.hba = !0,
                l.request.nf.root = a.Ef,
                b.push(l.request),
                a.nn.push([l]));
            if (h) {
                var m = e;
                f = a.Ef;
                h = a.CA;
                k = a.yU;
                l = "batch" + String(Math.round(2147483647 * _.wj())) + String(Math.round(2147483647 * _.wj()));
                var n = "--" + l;
                l = "multipart/mixed; boundary=" + l;
                for (var p = {
                    path: VB(m),
                    method: "POST"
                }, q = [], t = 0; t < m.length; t++)
                    q.push(WB(m[t].request, [n.substr(n.indexOf("--") + 2), "+", encodeURIComponent(m[t].id).split("(").join("%28").split(")").join("%29").split(".").join("%2E"), "@googleapis.com"].join("")));
                p.body = [n, q.join("\r\n" + n + "\r\n"), n + "--"].join("\r\n") + "\r\n";
                p.root = f || null;
                _.zf("client/xd4") && mB() ? (p.isXd4 = !0,
                p.params = {
                    $ct: l
                },
                p.headers = {},
                _.fi(p.headers, "Content-Type", "text/plain; charset=UTF-8"),
                h ? p.authType = "1p" : k && (p.authType = "oauth2"),
                f = new JB(p)) : (p.headers = {},
                _.fi(p.headers, "Content-Type", l),
                f = jB(p));
                b.push(f);
                a.nn.push(e)
            }
        }
        return b
    };
    bC.prototype.execute = function(a) {
        if (!(1 > Object.keys(this.Bk).length)) {
            var b = this.Fv(a);
            a = dC(this);
            var c = []
              , d = a.map(function(e) {
                return new _.cl(function(f) {
                    try {
                        e.execute(function(h, k) {
                            return f({
                                OP: h,
                                zda: k
                            })
                        })
                    } catch (h) {
                        c.push(h),
                        f({
                            OP: {
                                Ez: !1,
                                reason: h
                            }
                        })
                    }
                }
                )
            });
            if (0 < c.length && c.length === a.length)
                throw c[0];
            _.kl(d).then(function(e) {
                var f = e.map(function(h) {
                    return h.zda
                });
                e = e.map(function(h) {
                    return h.OP
                });
                b(e, f)
            })
        }
    }
    ;
    bC.prototype.Ap = function() {
        var a = this;
        if (1 > Object.keys(this.Bk).length)
            return _.gl({});
        var b = dC(this).map(function(c) {
            return new _.cl(function(d, e) {
                return c.tj().then(d, e)
            }
            )
        });
        return gB(b).then(function(c) {
            c = c.map(function(d) {
                return d.Ez ? d.value : d
            });
            return eC(a, c, !0)
        })
    }
    ;
    bC.prototype.WX = function(a, b, c, d) {
        var e = {};
        if (c) {
            e = b ? XB : ZB;
            b = TB(a.headers, "Content-Type").split("boundary=")[1];
            if (!b)
                throw new dB("Boundary not indicated in response.");
            e = e(a.body, "--" + b)
        } else
            b ? (a.result = _.Hg(a.body),
            e[d] = a) : e[d] = YB(a, d);
        a = {};
        e = _.va(Object.entries(e));
        for (b = e.next(); !b.done; b = e.next())
            if (c = _.va(b.value),
            b = c.next().value,
            c = c.next().value,
            a[b] = c,
            !this.vy[b])
                throw new dB("Could not find batch entry for id " + b + ".");
        return a
    }
    ;
    var eC = function(a, b, c, d, e) {
        for (var f = !1, h = {}, k, l = 0, m = 0; m < b.length; m++) {
            var n = b[m];
            if (!1 === n.Ez) {
                l++;
                b[m] = n.reason;
                n = fC([b[m]]);
                for (var p = _.va(a.nn[m]), q = p.next(); !q.done; q = p.next())
                    h[q.value.id] = n
            } else {
                if (1 > a.nn[m].length)
                    throw new dB("Error processing batch responses.");
                try {
                    var t = !(1 === a.nn[m].length && a.nn[m][0].hba)
                      , v = a.nn[m][0].id;
                    if (!c) {
                        p = n;
                        q = t;
                        var u = d[m]
                          , w = p;
                        if (u && (!w || !q)) {
                            var x = _.Hg(u);
                            x && (w = x.gapiRequest ? x.gapiRequest.data : x,
                            !q && p && (w.body = p))
                        }
                        if (!w)
                            throw new dB("The batch response is missing.");
                        n = w
                    }
                    p = void 0;
                    if (q = n) {
                        var z = q.headers;
                        if (z) {
                            var F = _.gf();
                            for (p in z)
                                if (Object.prototype.hasOwnProperty.call(z, p)) {
                                    var H = _.ei(z, p);
                                    _.fi(F, p, H, !0)
                                }
                            q.headers = F
                        }
                    }
                    if (t && 0 != TB(n.headers, "Content-Type").indexOf("multipart/mixed"))
                        throw new dB("The response's Content-Type is not multipart/mixed.");
                    k = k || _.xy(n);
                    var O = lB(n);
                    O && !lB(k) && (k.status = n.status,
                    k.statusText = n.statusText);
                    if (O || c || !t)
                        f = !0,
                        h = Object.assign(h, a.WX(n, c, t, v))
                } catch (N) {
                    for (l++,
                    b[m] = N,
                    n = fC([N]),
                    p = _.va(a.nn[m]),
                    q = p.next(); !q.done; q = p.next())
                        h[q.value.id] = n
                }
            }
        }
        if (l === b.length) {
            d = fC(b);
            h = _.Ig(d);
            k = 0;
            a = Array.from(Object.values(a.Bk)).flat();
            f = _.va(a);
            for (l = f.next(); !l.done; l = f.next())
                if (l = l.value,
                c)
                    l.BC.reject(d);
                else if (l.callback)
                    try {
                        k++,
                        l.callback(d, h)
                    } catch (N) {
                        bC.prototype.yq(N)
                    }
            if (e)
                try {
                    e(d, h)
                } catch (N) {
                    bC.prototype.yq(N)
                }
            else if (k !== a.length)
                throw 1 === b.length ? b[0] : d;
        } else {
            if (f)
                for (f = _.va(Object.entries(h)),
                l = f.next(); !l.done; l = f.next())
                    if (l = _.va(l.value),
                    m = l.next().value,
                    l = l.next().value,
                    c)
                        m = a.vy[m],
                        l && lB(l) ? m.BC.resolve(l) : m.BC.reject(l);
                    else if (m = a.vy[m],
                    m.callback) {
                        if (l && l.rawResult)
                            try {
                                delete l.rawResult
                            } catch (N) {}
                        try {
                            m.callback(l || !1, _.Ig(l))
                        } catch (N) {
                            bC.prototype.yq(N)
                        }
                    }
            k.result = h || {};
            k.body = 1 === b.length ? k.body : "";
            if (e)
                try {
                    e(h || null, 1 === d.length ? d[0] : null)
                } catch (N) {
                    bC.prototype.yq(N)
                }
            return k
        }
    }
      , fC = function(a) {
        var b = {
            error: {
                code: 0,
                message: "The batch request could not be fulfilled.  "
            }
        };
        a = _.va(a);
        for (var c = a.next(); !c.done; c = a.next())
            (c = c.value) && c.message || c instanceof Error && c.message ? b.error.message += (c.message || c instanceof Error && c.message) + "  " : c && c.error && c.error.message && (b.error.message += c.error.message + "  ",
            b.error.code = c.error.code || b.error.code || 0);
        b.error.message = b.error.message.trim();
        return {
            result: b,
            body: _.Ig(b),
            headers: null,
            status: null,
            statusText: null
        }
    };
    bC.prototype.Fv = function(a) {
        var b = this;
        return function(c, d) {
            b.cF(c, d, a)
        }
    }
    ;
    bC.prototype.cF = function(a, b, c) {
        eC(this, a, !1, b, c)
    }
    ;
    bC.prototype.add = bC.prototype.add;
    bC.prototype.execute = bC.prototype.execute;
    bC.prototype.then = bC.prototype.then;
    var gC = function() {
        this.im = [];
        this.Ef = this.Bf = null
    };
    gC.prototype.add = function(a, b) {
        b = b || {};
        var c = {}
          , d = Object.prototype.hasOwnProperty;
        if (a)
            c.Ip = a;
        else
            throw new dB("Batch entry " + (d.call(b, "id") ? '"' + b.id + '" ' : "") + "is missing a request method");
        if (d.call(b, "id")) {
            a = b.id;
            for (d = 0; d < this.im.length; d++)
                if (this.im[d].id == a)
                    throw new dB('Batch ID "' + a + '" already in use, please use another.');
            c.id = a
        } else {
            do
                c.id = String(2147483647 * _.wj() | 0);
            while (d.call(this.im, c.id))
        }
        c.callback = b.callback;
        this.im.push(c);
        return c.id
    }
    ;
    var hC = function(a) {
        return function(b) {
            var c = b.body;
            if (b = b.result) {
                for (var d = {}, e = 0, f = b.length; e < f; ++e)
                    d[b[e].id] = b[e];
                a(d, c)
            } else
                a(b, c)
        }
    };
    gC.prototype.execute = function(a) {
        this.Bf = [];
        for (var b, c, d = 0; d < this.im.length; d++)
            b = this.im[d],
            c = b.Ip,
            this.Bf.push(c.BB(b.id)),
            this.Ef = c.Xd() || this.Ef;
        c = this.Fv(a);
        a = {
            requests: this.Bf,
            root: this.Ef
        };
        b = {};
        d = a.headers || {};
        for (var e in d) {
            var f = e;
            if (Object.prototype.hasOwnProperty.call(d, f)) {
                var h = _.ei(d, f);
                h && (f = _.ci(f, h) || _.bi(f)) && _.fi(b, f, h)
            }
        }
        _.fi(b, "Content-Type", "application/json");
        e = hC(c);
        jB({
            method: "POST",
            root: a.root || void 0,
            path: "/rpc",
            params: a.urlParams,
            headers: b,
            body: a.requests || []
        }).then(e, e)
    }
    ;
    gC.prototype.Fv = function(a) {
        var b = this;
        return function(c, d) {
            b.cF(c, d, a)
        }
    }
    ;
    gC.prototype.cF = function(a, b, c) {
        a || (a = {});
        for (var d = 0; d < this.im.length; d++) {
            var e = this.im[d];
            e.callback && e.callback(a[e.id] || !1, b)
        }
        c && c(a, b)
    }
    ;
    kB.SP(function() {
        return new gC
    });
    gC.prototype.add = gC.prototype.add;
    gC.prototype.execute = gC.prototype.execute;
    var iC = function(a, b) {
        this.Uca = a;
        this.Ie = b || null;
        this.Nf = null
    };
    iC.prototype.lI = function(a) {
        this.Ie = a;
        this.Nf = 2 == this.Ie ? new gC : new bC(this.Uca)
    }
    ;
    iC.prototype.add = function(a, b) {
        if (!a)
            throw a = b || _.gf(),
            new dB("Batch entry " + (_.hf(a, "id") ? '"' + a.id + '" ' : "") + "is missing a request method");
        null === this.Ie && this.lI(a.getFormat());
        this.Ie !== a.getFormat() && IB("Unable to add item to batch.");
        var c = b && b.callback;
        1 == this.Ie && c && (b.callback = function(d) {
            d = jC(d);
            var e = _.Ig([d]);
            c(d, e)
        }
        );
        return this.Nf.add(a, b)
    }
    ;
    iC.prototype.execute = function(a) {
        var b = a && 1 == this.Ie ? function(c) {
            var d = [];
            _.sn(c, function(f, h) {
                f = jC(f);
                c[h] = f;
                d.push(f)
            });
            var e = _.Ig(d);
            a(c, e)
        }
        : a;
        this.Nf && this.Nf.execute(b)
    }
    ;
    var jC = function(a) {
        var b = a ? _.wy(a, "result") : null;
        _.Rb(b) && null != b.error && (b = HB(b),
        a = {
            id: a.id,
            error: b
        });
        return a
    };
    iC.prototype.then = function(a, b, c) {
        2 == this.Ie && IB('The "then" method is not available on this object.');
        return this.Nf.then(a, b, c)
    }
    ;
    iC.prototype.add = iC.prototype.add;
    iC.prototype.execute = iC.prototype.execute;
    iC.prototype.then = iC.prototype.then;
    var kC = function(a) {
        eB.call(this, kC.prototype.Ap);
        this.Eb = a
    };
    _.E(kC, eB);
    var lC = function(a) {
        a.Eb.bl();
        var b = a.Eb
          , c = b.nf();
        return !(aC(c.root, c.path, a.Eb.Ku()) ? "batch" !== UB([b]) : 1)
    };
    _.g = kC.prototype;
    _.g.execute = function(a) {
        var b = this;
        if (lC(this))
            this.Eb.execute(a);
        else {
            var c = function(d) {
                if ("function" === typeof a) {
                    var e = {
                        gapiRequest: {
                            data: {
                                status: d && d.status,
                                statusText: d && d.statusText,
                                headers: d && d.headers,
                                body: d && d.body
                            }
                        }
                    };
                    if (1 === b.getFormat()) {
                        a = OB(a);
                        var f = {}
                    }
                    var h = d ? d.result : !1;
                    d && 204 == d.status && (h = f,
                    delete e.gapiRequest.data.body);
                    a(h, _.Ig(e))
                }
            };
            this.tj().then(c, c)
        }
    }
    ;
    _.g.Ap = function() {
        return lC(this) ? this.Eb.tj() : new _.cl(function(a, b) {
            var c = hB()
              , d = c.add(this.Eb, {
                id: "gapiRequest"
            });
            c.then(function(e) {
                var f = e.result;
                if (f && (f = f[d])) {
                    Object.prototype.hasOwnProperty.call(f, "result") || (f.result = !1);
                    Object.prototype.hasOwnProperty.call(f, "body") || (f.body = "");
                    lB(f) ? a(f) : b(f);
                    return
                }
                b(e)
            }, b)
        }
        ,this)
    }
    ;
    _.g.nf = function() {
        if (this.Eb.nf)
            return this.Eb.nf()
    }
    ;
    _.g.bl = function() {
        this.Eb.bl && this.Eb.bl()
    }
    ;
    _.g.Xd = function() {
        if (this.Eb.Xd)
            return this.Eb.Xd()
    }
    ;
    _.g.Rj = function(a) {
        this.Eb.Rj && this.Eb.Rj(a)
    }
    ;
    _.g.Ku = function() {
        return this.Eb.Ku()
    }
    ;
    _.g.getFormat = function() {
        return this.Eb.getFormat ? this.Eb.getFormat() : 0
    }
    ;
    _.g.tj = function() {
        return this.Ap()
    }
    ;
    kC.prototype.execute = kC.prototype.execute;
    kC.prototype.then = kC.prototype.then;
    kC.prototype.getPromise = kC.prototype.tj;
    var mC = "/rest?fields=" + encodeURIComponent("kind,name,version,rootUrl,servicePath,resources,parameters,methods,batchPath,id") + "&pp=0"
      , nC = function(a, b) {
        return "/downloader" + (mC)
    }
      , pC = function(a, b, c, d) {
        if (_.Rb(a)) {
            var e = a;
            var f = a.name;
            a = a.version || "v1"
        } else
            f = a,
            a = b;
        if (!f || !a)
            throw new dB("Missing required parameters.");
        var h = c || function() {}
          , k = _.Rb(d) ? d : {};
        c = function(l) {
            var m = l && l.result;
            if (!m || m.error || !m.name || !l || l.error || l.message || l.message)
                h(m && m.error ? m : l && (l.error || l.message || l.message) ? l : new dB("API discovery response missing required fields."));
            else {
                l = k.root;
                l = null != m.rootUrl ? String(m.rootUrl) : l;
                l = "string" === typeof l ? l.replace(/([^\/])\/$/, "$1") : void 0;
                k.root = l;
                m.name && m.version && !m.id && (m.id = [m.name, m.version].join(":"));
                m.id && (k.apiId = m.id,
                l = "client/batchPath/" + m.id,
                m.batchPath && !_.zf(l) && _.Af(l, m.batchPath));
                var n = m.servicePath
                  , p = m.parameters
                  , q = function(v) {
                    _.sn(v, function(u) {
                        if (!(u && u.id && u.path && u.httpMethod))
                            throw new dB("Missing required parameters");
                        var w = u.id.split("."), x = window.gapi.client, z;
                        for (z = 0; z < w.length - 1; z++) {
                            var F = w[z];
                            x[F] = x[F] || {};
                            x = x[F]
                        }
                        var H, O;
                        k && (k.hasOwnProperty("root") && (H = k.root),
                        k.hasOwnProperty("apiId") && (O = k.apiId));
                        F = window.gapi.client[w[0]];
                        F.XN || (F.XN = {
                            servicePath: n || "",
                            parameters: p,
                            apiId: O
                        });
                        w = w[z];
                        x[w] || (x[w] = _.$a(oC, {
                            path: "string" === typeof u.path ? u.path : null,
                            httpMethod: "string" === typeof u.httpMethod ? u.httpMethod : null,
                            parameters: u.parameters,
                            parameterName: (u.request || {}).parameterName || "",
                            request: u.request,
                            root: H
                        }, F.XN))
                    })
                }
                  , t = function(v) {
                    _.sn(v, function(u) {
                        q(u.methods);
                        t(u.resources)
                    })
                };
                t(m.resources);
                q(m.methods);
                h.call()
            }
        }
        ;
        e ? c({
            result: e
        }) : 0 < f.indexOf("://") ? jB({
            path: f,
            params: {
                pp: 0,
                fields: 0 <= ("/" + f).indexOf("/discovery/v1/apis/") ? "kind,name,version,rootUrl,servicePath,resources,parameters,methods,batchPath,id" : 'fields["kind"],fields["name"],fields["version"],fields["rootUrl"],fields["servicePath"],fields["resources"],fields["parameters"],fields["methods"],fields["batchPath"],fields["id"]'
            }
        }).then(c, c) : jB({
            path: nC(f, a),
            root: d && d.root
        }).then(c, c)
    }
      , oC = function(a, b, c, d, e) {
        e = void 0 === e ? {} : e;
        var f = b.servicePath || "";
        _.Hc(f, "/") || (f = "/" + f);
        var h = qC(a.path, [a.parameters, b.parameters], c || {});
        c = h.Nd;
        var k = h.Bga;
        f = _.Fy(f, h.path);
        h = k.root;
        delete k.root;
        var l = a.parameterName;
        !l && 1 == _.Au(k) && k.hasOwnProperty("resource") && (l = "resource");
        if (l) {
            var m = k[l];
            delete k[l]
        }
        null == m && (m = d);
        null == m && a.request && (_.xi(k) && (k = void 0),
        m = k);
        e = e || {};
        l = a.httpMethod;
        "GET" == l && void 0 !== m && "" != String(m) && (_.fi(e, "X-HTTP-Method-Override", l),
        l = "POST");
        if ((null == m || null != d) && k)
            for (var n in k)
                "string" === typeof k[n] && (c[n] = k[n]);
        return jB({
            path: f,
            method: l,
            params: c,
            headers: e,
            body: m,
            root: h || a.root,
            apiId: b.apiId
        }, 1)
    }
      , qC = function(a, b, c) {
        c = _.Jk(c);
        var d = {};
        _.rn(b, function(e) {
            _.sn(e, function(f, h) {
                var k = f.required;
                if ("path" == f.location)
                    if (Object.prototype.hasOwnProperty.call(c, h))
                        _.yb(a, "{" + h + "}") ? (f = encodeURIComponent(String(c[h])),
                        a = a.replace("{" + h + "}", f)) : _.yb(a, "{+" + h + "}") && (f = encodeURI(String(c[h])),
                        a = a.replace("{+" + h + "}", f)),
                        delete c[h];
                    else {
                        if (k)
                            throw new dB("Required path parameter " + h + " is missing.");
                    }
                else
                    "query" == f.location && Object.prototype.hasOwnProperty.call(c, h) && (d[h] = c[h],
                    delete c[h])
            })
        });
        if (b = c.trace)
            d.trace = b,
            delete c.trace;
        return {
            path: a,
            Nd: d,
            Bga: c
        }
    };
    var rC = function(a, b, c, d) {
        var e = b || "v1"
          , f = _.Rb(d) ? d : {
            root: d
        };
        if (c)
            pC(a, e, function(h) {
                if (h)
                    if (h.error)
                        c(h);
                    else {
                        var k = "API discovery was unsuccessful.";
                        if (h.message || h.message)
                            k = h.message || h.message;
                        c({
                            error: k,
                            code: 0
                        })
                    }
                else
                    c()
            }, f);
        else
            return new _.cl(function(h, k) {
                var l = function(m) {
                    m ? k(m) : h()
                };
                try {
                    pC(a, e, l, f)
                } catch (m) {
                    k(m)
                }
            }
            )
    }
      , sC = new RegExp(/^((([Hh][Tt][Tt][Pp][Ss]?:)?\/\/[^\/?#]*)?\/)?/.source + /(_ah\/api\/)?(batch|rpc)(\/|\?|#|$)/.source)
      , tC = function(a, b) {
        if (!a)
            throw new dB("Missing required parameters");
        var c = "object" === typeof a ? a : {
            path: a
        };
        a = c.callback;
        delete c.callback;
        b = new PB(c,b);
        if (c = !!_.zf("client/xd4") && mB()) {
            var d = b.nf();
            c = d.path;
            (d = d.root) && "/" !== d.charAt(d.length - 1) && (d += "/");
            d && c && c.substr(0, d.length) === d && (c = c.substr(d.length));
            c = !c.match(sC)
        }
        c && (b = new kC(b));
        return a ? (b.execute(a),
        null) : b
    };
    kB.TP(function(a) {
        return tC.apply(null, arguments)
    });
    var uC = function(a, b) {
        if (!a)
            throw new dB("Missing required parameters");
        for (var c = a.split("."), d = window.gapi.client, e = 0; e < c.length - 1; e++) {
            var f = c[e];
            d[f] = d[f] || {};
            d = d[f]
        }
        c = c[c.length - 1];
        if (!d[c]) {
            var h = b || {};
            d[c] = function(k) {
                var l = "string" == typeof h ? h : h.root;
                k && k.root && (l = k.root);
                return new PB({
                    method: a,
                    apiVersion: h.apiVersion,
                    rpcParams: k,
                    transport: {
                        name: "googleapis",
                        root: l
                    }
                },2)
            }
        }
    }
      , vC = function(a) {
        return new iC(a)
    };
    kB.RP(function(a) {
        return vC.apply(null, arguments)
    });
    var wC = function(a) {
        if (_.aj.JSONRPC_ERROR_MOD)
            throw new dB(a + " is discontinued. See https://developers.googleblog.com/2018/03/discontinuing-support-for-json-rpc-and.html");
        _.Mg.log(a + " is deprecated. See https://developers.google.com/api-client-library/javascript/reference/referencedocs")
    };
    _.C("gapi.client.init", function(a) {
        a.apiKey && _.Af("client/apiKey", a.apiKey);
        var b = _.rc(a.discoveryDocs || [], function(d) {
            return rC(d)
        });
        if ((a.clientId || a.client_id) && a.scope) {
            var c = new _.cl(function(d, e) {
                var f = function() {
                    _.r.gapi.auth2.init.call(_.r.gapi.auth2, a).then(function() {
                        d()
                    }, e)
                };
                fB ? f() : _.r.gapi.load("auth2", {
                    callback: function() {
                        f()
                    },
                    onerror: function(h) {
                        e(h || Error("Ka"))
                    }
                })
            }
            );
            b.push(c)
        } else
            (a.clientId || a.client_id || a.scope) && _.Mg.log("client_id and scope must both be provided to initialize OAuth.");
        return _.kl(b).then(function() {})
    });
    _.C("gapi.client.load", rC);
    _.C("gapi.client.newBatch", vC);
    _.C("gapi.client.newRpcBatch", function() {
        wC("gapi.client.newRpcBatch");
        return vC()
    });
    _.C("gapi.client.newHttpBatch", function(a) {
        wC("gapi.client.newHttpBatch");
        return new iC(a,0)
    });
    _.C("gapi.client.register", function(a, b) {
        wC("gapi.client.register");
        var c;
        b && (c = {
            apiVersion: b.apiVersion,
            root: b.root
        });
        uC(a, c)
    });
    _.C("gapi.client.request", tC);
    _.C("gapi.client.rpcRequest", function(a, b, c) {
        wC("gapi.client.rpcRequest");
        if (!a)
            throw new dB('Missing required parameter "method".');
        return new PB({
            method: a,
            apiVersion: b,
            rpcParams: c,
            transport: {
                name: "googleapis",
                root: c && c.root || ""
            }
        },2)
    });
    _.C("gapi.client.setApiKey", function(a) {
        _.Af("client/apiKey", a);
        _.Af("googleapis.config/developerKey", a)
    });
    _.C("gapi.client.setApiVersions", function(a) {
        wC("gapi.client.setApiVersions");
        _.Af("googleapis.config/versions", a)
    });
    _.C("gapi.client.getToken", function(a) {
        return _.pj(a)
    });
    _.C("gapi.client.setToken", function(a, b) {
        a ? _.Fw(a, b) : _.Gw(b)
    });
    _.C("gapi.client.AuthType", {
        nha: "auto",
        NONE: "none",
        Uka: "oauth2",
        hja: "1p"
    });
    _.C("gapi.client.AuthType.AUTO", "auto");
    _.C("gapi.client.AuthType.NONE", "none");
    _.C("gapi.client.AuthType.OAUTH2", "oauth2");
    _.C("gapi.client.AuthType.FIRST_PARTY", "1p");
});
// Google Inc.
