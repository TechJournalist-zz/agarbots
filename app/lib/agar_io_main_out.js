/**
 * Modified agar.io main_out.js
 * Version 536
 * Modifications:
 *   - Does not allow input from client
 *   - Game gets initalized with server to connect to
 */

var QUAD = require('./quadtree')

/**
 * start
 *
 * @param {Window} f
 * @param {jQuery} h
 * @return {undefined}
 */
module.exports = function start(f, h, address, canvas) {
    //Ha('ws://' + address);
    Ha(address);

    function Sa() {
        la = !0;
        za();
        setInterval(za, 18E4);
        //B = ma = document.getElementById("canvas");
        B = ma = canvas;
        e = B.getContext("2d");
        B.onmousedown = function (a) {
            if (Aa) {
                var b = a.clientX - (5 + k / 5 / 2),
                    c = a.clientY - (5 + k / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= k / 5 / 2) {
                    K();
                    C(17);
                    return
                }
            }
            T = a.clientX;
            U = a.clientY;
            na();
            K()
        };
        B.onmousemove = function (a) {
            T = a.clientX;
            U = a.clientY;
            na()
        };
        B.onmouseup = function (a) {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", Ba, !1) : document.body.onmousewheel = Ba;
        var a = !1,
            b = !1,
            c = !1;
        f.onkeydown = function (d) {
            32 != d.keyCode || a || (K(), C(17), a = !0);
            81 != d.keyCode || b || (C(18), b = !0);
            87 != d.keyCode || c || (K(), C(21), c = !0);
            27 == d.keyCode && Ca(!0)
        };
        f.onkeyup = function (d) {
            32 == d.keyCode && (a = !1);
            87 == d.keyCode && (c = !1);
            81 == d.keyCode && b && (C(19), b = !1)
        };
        f.onblur = function () {
            C(19);
            c = b = a = !1
        };
        f.onresize = Da;
        Da();
        f.requestAnimationFrame ? f.requestAnimationFrame(Ea) : setInterval(oa, 1E3 / 60);
        setInterval(K, 40);
        v && h("#region")
            .val(v);
        Fa();
        V(h("#region")
            .val());
        null == q && v && W();
        h("#overlays")
            .show()
    }

    function Ba(a) {
        D *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
        1 > D && (D = 1);
        D > 4 / g && (D = 4 / g)
    }

    function Ta() {
        if (.4 > g) L = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, d = Number.NEGATIVE_INFINITY, e = 0, s = 0; s < u.length; s++) {
                var l = u[s];
                !l.shouldRender() || l.wasSimpleDrawing || 20 >= l.size * g || (e = Math.max(l.size, e), a = Math.min(l.x, a), b = Math.min(l.y, b), c = Math.max(l.x, c), d = Math.max(l.y, d))
            }
            L = QUAD.init({
                minX: a - (e + 100),
                minY: b - (e + 100),
                maxX: c + (e + 100),
                maxY: d + (e + 100)
            });
            for (s = 0; s < u.length; s++)
                if (l = u[s], l.shouldRender() && !(20 >= l.size * g))
                    for (a = 0; a < l.points.length; ++a) b = l.points[a].x, c = l.points[a].y, b < r - k / 2 / g || c < t - p / 2 / g || b > r + k / 2 / g || c > t + p / 2 / g || L.insert(l.points[a])
        }
    }

    function na() {
        X = (T - k / 2) / g + r;
        Y = (U - p / 2) / g + t
    }

    function za() {
        null == Z && (Z = {}, h("#region")
            .children()
            .each(function () {
                var a = h(this),
                    b = a.val();
                b && (Z[b] = a.text())
            }));
            /*
        h.get($ + "//m.agar.io/info", function (a) {
            var b = {},
                c;
            for (c in a.regions) {
                var d = c.split(":")[0];
                b[d] = b[d] || 0;
                b[d] += a.regions[c].numPlayers
            }
            for (c in b) h('#region option[value="' + c + '"]')
                .text(Z[c] + " (" + b[c] +
                    " players)")
        }, "json")
       */
    }

    function Ga() {
        h("#adsBottom")
            .hide();
        h("#overlays")
            .hide();
        Fa()
    }

    function V(a) {
        a && a != v && (h("#region")
            .val() != a && h("#region")
            .val(a), v = f.localStorage.location = a, h(".region-message")
            .hide(), h(".region-message." + a)
            .show(), h(".btn-needs-server")
            .prop("disabled", !1), la && W())
    }

    function Ca(a) {
        E = null;
        h("#overlays")
            .fadeIn(a ? 200 : 3E3);
        a || h("#adsBottom")
            .fadeIn(3E3)
    }

    function Fa() {
        h("#region")
            .val() ? f.localStorage.location = h("#region")
            .val() : f.localStorage.location && h("#region")
            .val(f.localStorage.location);
        h("#region")
            .val() ? h("#locationKnown")
            .append(h("#region")) : h("#locationUnknown")
            .append(h("#region"))
    }

    function pa() {
      /*
        console.log("Find " + v + M);
        h.ajax($ + "//m.agar.io/", {
            error: function () {
                setTimeout(pa, 1E3)
            },
            success: function (a) {
                a = a.split("\n");
                "45.79.222.79:443" == a[0] ? pa() : Ha("ws://" + a[0])
            },
            dataType: "text",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: v + M || "?"
        })
       */
    }

    function W() {
        la && v && (h("#connecting")
            .show(), pa())
    }

    function Ha(a) {
        if (q) {
            q.onopen = null;
            q.onmessage = null;
            q.onclose = null;
            try {
                q.close()
            } catch (b) {}
            q = null
        }
        var c = f.location.search.slice(1);
        /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+$/.test(c) && (a = "ws://" + c);
        Ua && (a = a.split(":"), a = a[0] + "s://ip-" + a[1].replace(/\./g, "-")
            .replace(/\//g, "") + ".tech.agar.io:" + (+a[2] + 2E3));
        F = [];
        m = [];
        z = {};
        u = [];
        H = [];
        A = [];
        w = x = null;
        I = 0;
        console.log("Connecting to " + a);
        q = new WebSocket(a);
        q.binaryType = "arraybuffer";
        q.onopen = Va;
        q.onmessage = Wa;
        q.onclose = Xa;
        q.onerror = function () {
            console.log("socket error")
        }
    }

    function N(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function O(a) {
        //q.send(a.buffer)
    }

    function Va(a) {
        aa = 500;
        h("#connecting")
            .hide();
        console.log("socket open");
        a = N(5);
        a.setUint8(0, 254);
        a.setUint32(1, 4, !0);
        O(a);
        a = N(5);
        a.setUint8(0, 255);
        a.setUint32(1, 673720360, !0);
        O(a);
        Ia()
    }

    function Xa(a) {
        console.log("socket close");
        setTimeout(W, aa);
        aa *= 1.5
    }

    function Wa(a) {
        Ya(new DataView(a.data))
    }

    function Ya(a) {
        function b() {
            for (var b = "";;) {
                var d = a.getUint16(c, !0);
                c += 2;
                if (0 == d) break;
                b += String.fromCharCode(d)
            }
            return b
        }
        var c = 0;
        240 == a.getUint8(c) && (c += 5);
        switch (a.getUint8(c++)) {
        case 16:
            Za(a, c);
            break;
        case 17:
            P = a.getFloat32(c, !0);
            c += 4;
            Q = a.getFloat32(c, !0);
            c += 4;
            R = a.getFloat32(c, !0);
            c += 4;
            break;
        case 20:
            m = [];
            F = [];
            break;
        case 21:
            qa = a.getInt16(c, !0);
            c += 2;
            ra = a.getInt16(c, !0);
            c += 2;
            sa || (sa = !0, ba = qa, ca = ra);
            break;
        case 32:
            F.push(a.getUint32(c, !0));
            c += 4;
            break;
        case 49:
            if (null != x) break;
            var d = a.getUint32(c, !0),
                c = c + 4;
            A = [];
            for (var e = 0; e < d; ++e) {
                var s = a.getUint32(c, !0),
                    c = c + 4;
                A.push({
                    id: s,
                    name: b()
                })
            }
            Ja();
            break;
        case 50:
            x = [];
            d = a.getUint32(c, !0);
            c += 4;
            for (e = 0; e < d; ++e) x.push(a.getFloat32(c, !0)), c += 4;
            Ja();
            break;
        case 64:
            da = a.getFloat64(c, !0), c += 8, ea = a.getFloat64(c, !0), c += 8, fa = a.getFloat64(c, !0), c += 8, ga = a.getFloat64(c, !0), c += 8, P = (fa + da) / 2, Q = (ga + ea) / 2, R = 1, 0 == m.length && (r = P, t = Q, g = R)
        }
    }

    function Za(a, b) {
        G = +new Date;
        var c = Math.random();
        ta = !1;
        var d = a.getUint16(b, !0);
        b += 2;
        for (var e = 0; e < d; ++e) {
            var s = z[a.getUint32(b, !0)],
                l = z[a.getUint32(b + 4, !0)];
            b += 8;
            s && l && (l.destroy(), l.ox = l.x, l.oy = l.y, l.oSize = l.size, l.nx = s.x, l.ny = s.y, l.nSize = l.size, l.updateTime = G)
        }
        for (e = 0;;) {
            d = a.getUint32(b, !0);
            b += 4;
            if (0 == d) break;
            ++e;
            var f, s = a.getInt16(b, !0);
            b += 2;
            l = a.getInt16(b, !0);
            b += 2;
            f = a.getInt16(b, !0);
            b += 2;
            for (var g = a.getUint8(b++), h = a.getUint8(b++), k = a.getUint8(b++), g = (g << 16 | h << 8 | k)
                    .toString(16); 6 > g.length;) g = "0" + g;
            var g = "#" + g,
                h = a.getUint8(b++),
                k = !!(h & 1),
                q = !!(h & 16);
            h & 2 && (b += 4);
            h & 4 && (b += 8);
            h & 8 && (b += 16);
            for (var p, n = "";;) {
                p = a.getUint16(b, !0);
                b += 2;
                if (0 == p) break;
                n += String.fromCharCode(p)
            }
            p = n;
            n = null;
            z.hasOwnProperty(d) ? (n = z[d], n.updatePos(), n.ox = n.x, n.oy = n.y, n.oSize = n.size, n.color = g) : (n = new Ka(d, s, l, f, g, p), n.pX = s, n.pY = l);
            n.isVirus = k;
            n.isAgitated = q;
            n.nx = s;
            n.ny = l;
            n.nSize = f;
            n.updateCode = c;
            n.updateTime = G;
            n.flags = h;
            p && n.setName(p); - 1 != F.indexOf(d) && -1 == m.indexOf(n) && (/*document.getElementById("overlays")
                .style.display = "none",*/ m.push(n), 1 == m.length && (r = n.x, t = n.y))
        }
        c = a.getUint32(b, !0);
        b += 4;
        for (e = 0; e < c; e++) d = a.getUint32(b, !0), b += 4, n = z[d], null != n && n.destroy();
        ta && 0 == m.length && Ca(!1)
    }

    function K() {
        var a;
        if (ua()) {
            a = T - k / 2;
            var b = U - p / 2;
            64 > a * a + b * b || .01 > Math.abs(La - X) && .01 > Math.abs(Ma - Y) || (La = X, Ma = Y, a = N(21), a.setUint8(0, 16), a.setFloat64(1, X, !0), a.setFloat64(9, Y, !0), a.setUint32(17, 0, !0), O(a))
        }
    }

    function Ia() {
        if (ua() && null != E) {
            var a = N(1 + 2 * E.length);
            a.setUint8(0, 0);
            for (var b = 0; b < E.length; ++b) a.setUint16(1 + 2 * b, E.charCodeAt(b), !0);
            O(a)
        }
    }

    function ua() {
        return null != q && q.readyState == q.OPEN
    }

    function C(a) {
        if (ua()) {
            var b = N(1);
            b.setUint8(0, a);
            O(b)
        }
    }

    function Ea() {
        oa();
        f.requestAnimationFrame(Ea)
    }

    function Da() {
        k = f.innerWidth;
        p = f.innerHeight;
        ma.width = B.width = k;
        ma.height = B.height = p;
        oa()
    }

    function Na() {
        var a;
        a = 1 * Math.max(p / 1080, k / 1920);
        return a *= D
    }

    function $a() {
        if (0 != m.length) {
            for (var a = 0, b = 0; b < m.length; b++) a += m[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * Na();
            g = (9 * g + a) / 10
        }
    }

    function oa() {
        var a, b = Date.now();
        ++ab;
        G = b;
        if (0 < m.length) {
            $a();
            for (var c = a = 0, d = 0; d < m.length; d++) m[d].updatePos(), a += m[d].x / m.length, c += m[d].y / m.length;
            P = a;
            Q = c;
            R = g;
            r = (r + a) / 2;
            t = (t + c) / 2
        } else r = (29 * r + P) / 30, t = (29 * t + Q) / 30, g = (9 * g + R * Na()) / 10;
        Ta();
        na();
        va || e.clearRect(0, 0, k, p);
        va ? (e.fillStyle = ha ? "#111111" : "#F2FBFF", e.globalAlpha = .05, e.fillRect(0, 0, k, p), e.globalAlpha = 1) : bb();
        u.sort(function (a, b) {
            return a.size == b.size ? a.id - b.id : a.size -
                b.size
        });
        e.save();
        e.translate(k / 2, p / 2);
        e.scale(g, g);
        e.translate(-r, -t);
        for (d = 0; d < H.length; d++) H[d].draw();
        for (d = 0; d < u.length; d++) u[d].draw();
        if (sa) {
            ba = (3 * ba + qa) / 4;
            ca = (3 * ca + ra) / 4;
            e.save();
            e.strokeStyle = "#FFAAAA";
            e.lineWidth = 10;
            e.lineCap = "round";
            e.lineJoin = "round";
            e.globalAlpha = .5;
            e.beginPath();
            for (d = 0; d < m.length; d++) e.moveTo(m[d].x, m[d].y), e.lineTo(ba, ca);
            e.stroke();
            e.restore()
        }
        e.restore();
        w && w.width && e.drawImage(w, k - w.width - 10, 10);
        I = Math.max(I, cb());
        0 != I && (null == ia && (ia = new ja(24, "#FFFFFF")), ia.setValue("Score: " +
            ~~(I / 100)), c = ia.render(), a = c.width, e.globalAlpha = .2, e.fillStyle = "#000000", e.fillRect(10, p - 10 - 24 - 10, a + 10, 34), e.globalAlpha = 1, e.drawImage(c, 15, p - 10 - 24 - 5));
        db();
        b = Date.now() - b;
        b > 1E3 / 60 ? y -= .01 : b < 1E3 / 65 && (y += .01);.4 > y && (y = .4);
        1 < y && (y = 1)
    }

    function bb() {
        e.fillStyle = ha ? "#111111" : "#F2FBFF";
        e.fillRect(0, 0, k, p);
        e.save();
        e.strokeStyle = ha ? "#AAAAAA" : "#000000";
        e.globalAlpha = .2;
        e.scale(g, g);
        for (var a = k / g, b = p / g, c = -.5 + (-r + a / 2) % 50; c < a; c += 50) e.beginPath(), e.moveTo(c, 0), e.lineTo(c, b), e.stroke();
        for (c = -.5 + (-t + b / 2) % 50; c < b; c += 50) e.beginPath(), e.moveTo(0, c), e.lineTo(a, c), e.stroke();
        e.restore()
    }

    function db() {
        if (Aa && wa.width) {
            var a = k / 5;
            e.drawImage(wa, 5, 5, a, a)
        }
    }

    function cb() {
        for (var a = 0, b = 0; b < m.length; b++) a += m[b].nSize * m[b].nSize;
        return a
    }

    function Ja() {
        w = null;
        if (null != x || 0 != A.length)
            if (null != x || ka) {
                w = document.createElement("canvas");
                var a = w.getContext("2d"),
                    b = 60,
                    b = null == x ? b + 24 * A.length : b + 180,
                    c = Math.min(200, .3 * k) / 200;
                w.width = 200 * c;
                w.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha =
                    1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = "Leaderboard";
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c)
                    .width / 2, 40);
                if (null == x)
                    for (a.font = "20px Ubuntu", b = 0; b < A.length; ++b) c = A[b].name || "An unnamed cell", ka || (c = "An unnamed cell"), -1 != F.indexOf(A[b].id) ? (m[0].name && (c = m[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c)
                        .width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < x.length; ++b) angEnd = c + x[b] * Math.PI * 2, a.fillStyle = eb[b + 1], a.beginPath(), a.moveTo(100, 140), a.arc(100, 140, 80, c, angEnd, !1), a.fill(), c = angEnd
            }
    }

    function Ka(a, b, c, d, e, g) {
        u.push(this);
        z[a] = this;
        this.id = a;
        this.ox = this.x = b;
        this.oy = this.y = c;
        this.oSize = this.size = d;
        this.color = e;
        this.points = [];
        this.pointsAcc = [];
        this.createPoints();
        this.setName(g)
    }

    function ja(a, b, c, d) {
        a && (this._size = a);
        b && (this._color = b);
        this._stroke = !!c;
        d && (this._strokeColor = d)
    }
    var $ = f.location.protocol,
        Ua = "https:" == $,
        ma, e, B, k, p, L = null,
        q = null,
        r = 0,
        t = 0,
        F = [],
        m = [],
        z = {},
        u = [],
        H = [],
        A = [],
        T = 0,
        U = 0,
        X = -1,
        Y = -1,
        ab = 0,
        G = 0,
        E = null,
        da = 0,
        ea = 0,
        fa = 1E4,
        ga = 1E4,
        g = 1,
        v = null,
        Oa = !0,
        ka = !0,
        xa = !1,
        ta = !1,
        I = 0,
        ha = !1,
        Pa = !1,
        P = r = ~~((da + fa) / 2),
        Q = t = ~~((ea + ga) / 2),
        R = 1,
        M = "",
        x = null,
        la = !1,
        sa = !1,
        qa = 0,
        ra = 0,
        ba = 0,
        ca = 0,
        Qa = 0,
        eb = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
        va = !1,
        D = 1,
        Aa = "ontouchstart" in f && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        wa = new Image;
    wa.src = "img/split.png";
    var Ra = document.createElement("canvas");
    if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Ra || null == Ra.getContext || null ==
        f.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
    else {
        var Z = null;
        f.setNick = function (a) {
            Ga();
            E = a;
            Ia();
            I = 0
        };
        f.setRegion = V;
        f.setSkins = function (a) {
            Oa = a
        };
        f.setNames = function (a) {
            ka = a
        };
        f.setDarkTheme = function (a) {
            ha = a
        };
        f.setColors = function (a) {
            xa = a
        };
        f.setShowMass = function (a) {
            Pa = a
        };
        f.spectate = function () {
            E = null;
            C(1);
            Ga()
        };
        f.setGameMode = function (a) {
            a != M && (M = a, W())
        };
        f.setAcid = function (a) {
            va = a
        };
        null != f.localStorage && (null == f.localStorage.AB8 && (f.localStorage.AB8 = 0 + ~~(100 * Math.random())), Qa = +f.localStorage.AB8, f.ABGroup = Qa);
        h.get($ + "//gc.agar.io", function (a) {
            var b = a.split(" ");
            a = b[0];
            b = b[1] || ""; - 1 == "DE IL PL HU BR AT UA".split(" ")
                .indexOf(a) && ya.push("nazi"); - 1 == ["UA"].indexOf(a) && ya.push("ussr");
            S.hasOwnProperty(a) && ("string" == typeof S[a] ? v || V(S[a]) : S[a].hasOwnProperty(b) && (v || V(S[a][b])))
        }, "text");
        setTimeout(function () {}, 3E5);
        var S = {
            AF: "JP-Tokyo",
            AX: "EU-London",
            AL: "EU-London",
            DZ: "EU-London",
            AS: "SG-Singapore",
            AD: "EU-London",
            AO: "EU-London",
            AI: "US-Atlanta",
            AG: "US-Atlanta",
            AR: "BR-Brazil",
            AM: "JP-Tokyo",
            AW: "US-Atlanta",
            AU: "SG-Singapore",
            AT: "EU-London",
            AZ: "JP-Tokyo",
            BS: "US-Atlanta",
            BH: "JP-Tokyo",
            BD: "JP-Tokyo",
            BB: "US-Atlanta",
            BY: "EU-London",
            BE: "EU-London",
            BZ: "US-Atlanta",
            BJ: "EU-London",
            BM: "US-Atlanta",
            BT: "JP-Tokyo",
            BO: "BR-Brazil",
            BQ: "US-Atlanta",
            BA: "EU-London",
            BW: "EU-London",
            BR: "BR-Brazil",
            IO: "JP-Tokyo",
            VG: "US-Atlanta",
            BN: "JP-Tokyo",
            BG: "EU-London",
            BF: "EU-London",
            BI: "EU-London",
            KH: "JP-Tokyo",
            CM: "EU-London",
            CA: "US-Atlanta",
            CV: "EU-London",
            KY: "US-Atlanta",
            CF: "EU-London",
            TD: "EU-London",
            CL: "BR-Brazil",
            CN: "CN-China",
            CX: "JP-Tokyo",
            CC: "JP-Tokyo",
            CO: "BR-Brazil",
            KM: "EU-London",
            CD: "EU-London",
            CG: "EU-London",
            CK: "SG-Singapore",
            CR: "US-Atlanta",
            CI: "EU-London",
            HR: "EU-London",
            CU: "US-Atlanta",
            CW: "US-Atlanta",
            CY: "JP-Tokyo",
            CZ: "EU-London",
            DK: "EU-London",
            DJ: "EU-London",
            DM: "US-Atlanta",
            DO: "US-Atlanta",
            EC: "BR-Brazil",
            EG: "EU-London",
            SV: "US-Atlanta",
            GQ: "EU-London",
            ER: "EU-London",
            EE: "EU-London",
            ET: "EU-London",
            FO: "EU-London",
            FK: "BR-Brazil",
            FJ: "SG-Singapore",
            FI: "EU-London",
            FR: "EU-London",
            GF: "BR-Brazil",
            PF: "SG-Singapore",
            GA: "EU-London",
            GM: "EU-London",
            GE: "JP-Tokyo",
            DE: "EU-London",
            GH: "EU-London",
            GI: "EU-London",
            GR: "EU-London",
            GL: "US-Atlanta",
            GD: "US-Atlanta",
            GP: "US-Atlanta",
            GU: "SG-Singapore",
            GT: "US-Atlanta",
            GG: "EU-London",
            GN: "EU-London",
            GW: "EU-London",
            GY: "BR-Brazil",
            HT: "US-Atlanta",
            VA: "EU-London",
            HN: "US-Atlanta",
            HK: "JP-Tokyo",
            HU: "EU-London",
            IS: "EU-London",
            IN: "JP-Tokyo",
            ID: "JP-Tokyo",
            IR: "JP-Tokyo",
            IQ: "JP-Tokyo",
            IE: "EU-London",
            IM: "EU-London",
            IL: "JP-Tokyo",
            IT: "EU-London",
            JM: "US-Atlanta",
            JP: "JP-Tokyo",
            JE: "EU-London",
            JO: "JP-Tokyo",
            KZ: "JP-Tokyo",
            KE: "EU-London",
            KI: "SG-Singapore",
            KP: "JP-Tokyo",
            KR: "JP-Tokyo",
            KW: "JP-Tokyo",
            KG: "JP-Tokyo",
            LA: "JP-Tokyo",
            LV: "EU-London",
            LB: "JP-Tokyo",
            LS: "EU-London",
            LR: "EU-London",
            LY: "EU-London",
            LI: "EU-London",
            LT: "EU-London",
            LU: "EU-London",
            MO: "JP-Tokyo",
            MK: "EU-London",
            MG: "EU-London",
            MW: "EU-London",
            MY: "JP-Tokyo",
            MV: "JP-Tokyo",
            ML: "EU-London",
            MT: "EU-London",
            MH: "SG-Singapore",
            MQ: "US-Atlanta",
            MR: "EU-London",
            MU: "EU-London",
            YT: "EU-London",
            MX: "US-Atlanta",
            FM: "SG-Singapore",
            MD: "EU-London",
            MC: "EU-London",
            MN: "JP-Tokyo",
            ME: "EU-London",
            MS: "US-Atlanta",
            MA: "EU-London",
            MZ: "EU-London",
            MM: "JP-Tokyo",
            NA: "EU-London",
            NR: "SG-Singapore",
            NP: "JP-Tokyo",
            NL: "EU-London",
            NC: "SG-Singapore",
            NZ: "SG-Singapore",
            NI: "US-Atlanta",
            NE: "EU-London",
            NG: "EU-London",
            NU: "SG-Singapore",
            NF: "SG-Singapore",
            MP: "SG-Singapore",
            NO: "EU-London",
            OM: "JP-Tokyo",
            PK: "JP-Tokyo",
            PW: "SG-Singapore",
            PS: "JP-Tokyo",
            PA: "US-Atlanta",
            PG: "SG-Singapore",
            PY: "BR-Brazil",
            PE: "BR-Brazil",
            PH: "JP-Tokyo",
            PN: "SG-Singapore",
            PL: "EU-London",
            PT: "EU-London",
            PR: "US-Atlanta",
            QA: "JP-Tokyo",
            RE: "EU-London",
            RO: "EU-London",
            RU: "RU-Russia",
            RW: "EU-London",
            BL: "US-Atlanta",
            SH: "EU-London",
            KN: "US-Atlanta",
            LC: "US-Atlanta",
            MF: "US-Atlanta",
            PM: "US-Atlanta",
            VC: "US-Atlanta",
            WS: "SG-Singapore",
            SM: "EU-London",
            ST: "EU-London",
            SA: "EU-London",
            SN: "EU-London",
            RS: "EU-London",
            SC: "EU-London",
            SL: "EU-London",
            SG: "JP-Tokyo",
            SX: "US-Atlanta",
            SK: "EU-London",
            SI: "EU-London",
            SB: "SG-Singapore",
            SO: "EU-London",
            ZA: "EU-London",
            SS: "EU-London",
            ES: "EU-London",
            LK: "JP-Tokyo",
            SD: "EU-London",
            SR: "BR-Brazil",
            SJ: "EU-London",
            SZ: "EU-London",
            SE: "EU-London",
            CH: "EU-London",
            SY: "EU-London",
            TW: "JP-Tokyo",
            TJ: "JP-Tokyo",
            TZ: "EU-London",
            TH: "JP-Tokyo",
            TL: "JP-Tokyo",
            TG: "EU-London",
            TK: "SG-Singapore",
            TO: "SG-Singapore",
            TT: "US-Atlanta",
            TN: "EU-London",
            TR: "TK-Turkey",
            TM: "JP-Tokyo",
            TC: "US-Atlanta",
            TV: "SG-Singapore",
            UG: "EU-London",
            UA: "EU-London",
            AE: "EU-London",
            GB: "EU-London",
            US: {
                AL: "US-Atlanta",
                AK: "US-Fremont",
                AZ: "US-Fremont",
                AR: "US-Atlanta",
                CA: "US-Fremont",
                CO: "US-Fremont",
                CT: "US-Atlanta",
                DE: "US-Atlanta",
                FL: "US-Atlanta",
                GA: "US-Atlanta",
                HI: "US-Fremont",
                ID: "US-Fremont",
                IL: "US-Atlanta",
                IN: "US-Atlanta",
                IA: "US-Atlanta",
                KS: "US-Atlanta",
                KY: "US-Atlanta",
                LA: "US-Atlanta",
                ME: "US-Atlanta",
                MD: "US-Atlanta",
                MA: "US-Atlanta",
                MI: "US-Atlanta",
                MN: "US-Fremont",
                MS: "US-Atlanta",
                MO: "US-Atlanta",
                MT: "US-Fremont",
                NE: "US-Fremont",
                NV: "US-Fremont",
                NH: "US-Atlanta",
                NJ: "US-Atlanta",
                NM: "US-Fremont",
                NY: "US-Atlanta",
                NC: "US-Atlanta",
                ND: "US-Fremont",
                OH: "US-Atlanta",
                OK: "US-Atlanta",
                OR: "US-Fremont",
                PA: "US-Atlanta",
                RI: "US-Atlanta",
                SC: "US-Atlanta",
                SD: "US-Fremont",
                TN: "US-Atlanta",
                TX: "US-Atlanta",
                UT: "US-Fremont",
                VT: "US-Atlanta",
                VA: "US-Atlanta",
                WA: "US-Fremont",
                WV: "US-Atlanta",
                WI: "US-Atlanta",
                WY: "US-Fremont",
                DC: "US-Atlanta",
                AS: "US-Atlanta",
                GU: "US-Atlanta",
                MP: "US-Atlanta",
                PR: "US-Atlanta",
                UM: "US-Atlanta",
                VI: "US-Atlanta"
            },
            UM: "SG-Singapore",
            VI: "US-Atlanta",
            UY: "BR-Brazil",
            UZ: "JP-Tokyo",
            VU: "SG-Singapore",
            VE: "BR-Brazil",
            VN: "JP-Tokyo",
            WF: "SG-Singapore",
            EH: "EU-London",
            YE: "JP-Tokyo",
            ZM: "EU-London",
            ZW: "EU-London"
        };
        f.connect = Ha;
        var aa = 500,
            La = -1,
            Ma = -1,
            w = null,
            y = 1,
            ia = null,
            J = {},
            ya = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal".split(";"),
            fb = ["8", "nasa"],
            gb = ["m'blob"];
        Ka.prototype = {
            id: 0,
            points: null,
            pointsAcc: null,
            name: null,
            nameCache: null,
            sizeCache: null,
            x: 0,
            y: 0,
            size: 0,
            ox: 0,
            oy: 0,
            oSize: 0,
            nx: 0,
            ny: 0,
            nSize: 0,
            flags: 0,
            updateTime: 0,
            updateCode: 0,
            drawTime: 0,
            destroyed: !1,
            isVirus: !1,
            isAgitated: !1,
            wasSimpleDrawing: !0,
            destroy: function () {
                var a;
                for (a = 0; a < u.length; a++)
                    if (u[a] == this) {
                        u.splice(a, 1);
                        break
                    }
                delete z[this.id];
                a = m.indexOf(this); - 1 != a && (ta = !0, m.splice(a, 1));
                a = F.indexOf(this.id); - 1 != a && F.splice(a, 1);
                this.destroyed = !0;
                H.push(this)
            },
            getNameSize: function () {
                return Math.max(~~(.3 * this.size), 24)
            },
            setName: function (a) {
                if (this.name = a) null == this.nameCache ? this.nameCache = new ja(this.getNameSize(), "#FFFFFF", !0, "#000000") : this.nameCache.setSize(this.getNameSize()), this.nameCache.setValue(this.name)
            },
            createPoints: function () {
                for (var a = this.getNumPoints(); this.points.length > a;) {
                    var b = ~~(Math.random() * this.points.length);
                    this.points.splice(b, 1);
                    this.pointsAcc.splice(b, 1)
                }
                0 == this.points.length && 0 < a && (this.points.push({
                    c: this,
                    v: this.size,
                    x: this.x,
                    y: this.y
                }), this.pointsAcc.push(Math.random() - .5));
                for (; this.points.length < a;) {
                    var b = ~~(Math.random() * this.points.length),
                        c = this.points[b];
                    this.points.splice(b, 0, {
                        c: this,
                        v: c.v,
                        x: c.x,
                        y: c.y
                    });
                    this.pointsAcc.splice(b, 0, this.pointsAcc[b])
                }
            },
            getNumPoints: function () {
                var a = 10;
                20 > this.size && (a = 0);
                this.isVirus && (a = 30);
                var b = this.size;
                this.isVirus || (b *= g);
                b *= y;
                this.flags & 32 && (b *= .25);
                return ~~Math.max(b, a)
            },
            movePoints: function () {
                this.createPoints();
                for (var a = this.points, b = this.pointsAcc, c = a.length, d = 0; d < c; ++d) {
                    var e = b[(d - 1 + c) % c],
                        f = b[(d + 1) % c];
                    b[d] += (Math.random() - .5) * (this.isAgitated ? 3 : 1);
                    b[d] *= .7;
                    10 < b[d] && (b[d] = 10); - 10 > b[d] && (b[d] = -10);
                    b[d] = (e + f + 8 * b[d]) / 10
                }
                for (var h = this, m = this.isVirus ? 0 : (this.id / 1E3 + G / 1E4) % (2 * Math.PI), d = 0; d < c; ++d) {
                    var k = a[d].v,
                        e = a[(d - 1 + c) % c].v,
                        f = a[(d + 1) % c].v;
                    if (15 < this.size && null != L && 20 < this.size * g) {
                        var p = !1,
                            q = a[d].x,
                            r = a[d].y;
                        L.retrieve2(q - 5, r - 5, 10, 10, function (a) {
                            a.c != h && 25 > (q - a.x) * (q - a.x) + (r - a.y) * (r - a.y) && (p = !0)
                        });
                        !p && (a[d].x < da || a[d].y < ea || a[d].x > fa || a[d].y > ga) && (p = !0);
                        p && (0 < b[d] && (b[d] = 0), b[d] -= 1)
                    }
                    k += b[d];
                    0 > k && (k = 0);
                    k = this.isAgitated ?
                        (19 * k + this.size) / 20 : (12 * k + this.size) / 13;
                    a[d].v = (e + f + 8 * k) / 10;
                    e = 2 * Math.PI / c;
                    f = this.points[d].v;
                    this.isVirus && 0 == d % 2 && (f += 5);
                    a[d].x = this.x + Math.cos(e * d + m) * f;
                    a[d].y = this.y + Math.sin(e * d + m) * f
                }
            },
            updatePos: function () {
                var a;
                a = (G - this.updateTime) / 120;
                a = 0 > a ? 0 : 1 < a ? 1 : a;
                var b = 0 > a ? 0 : 1 < a ? 1 : a;
                this.getNameSize();
                if (this.destroyed && 1 <= b) {
                    var c = H.indexOf(this); - 1 != c && H.splice(c, 1)
                }
                this.x = a * (this.nx - this.ox) + this.ox;
                this.y = a * (this.ny - this.oy) + this.oy;
                this.size = b * (this.nSize - this.oSize) + this.oSize;
                return b
            },
            shouldRender: function () {
                return this.x +
                    this.size + 40 < r - k / 2 / g || this.y + this.size + 40 < t - p / 2 / g || this.x - this.size - 40 > r + k / 2 / g || this.y - this.size - 40 > t + p / 2 / g ? !1 : !0
            },
            draw: function () {
                if (this.shouldRender()) {
                    var a = !this.isVirus && !this.isAgitated && .4 > g;
                    5 > this.getNumPoints() && (a = !0);
                    if (this.wasSimpleDrawing && !a)
                        for (var b = 0; b < this.points.length; b++) this.points[b].v = this.size;
                    this.wasSimpleDrawing = a;
                    e.save();
                    this.drawTime = G;
                    b = this.updatePos();
                    this.destroyed && (e.globalAlpha *= 1 - b);
                    e.lineWidth = 10;
                    e.lineCap = "round";
                    e.lineJoin = this.isVirus ? "miter" : "round";
                    xa ? (e.fillStyle = "#FFFFFF", e.strokeStyle = "#AAAAAA") : (e.fillStyle = this.color, e.strokeStyle = this.color);
                    if (a) e.beginPath(), e.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1);
                    else {
                        this.movePoints();
                        e.beginPath();
                        var c = this.getNumPoints();
                        e.moveTo(this.points[0].x, this.points[0].y);
                        for (b = 1; b <= c; ++b) {
                            var d = b % c;
                            e.lineTo(this.points[d].x, this.points[d].y)
                        }
                    }
                    e.closePath();
                    c = this.name.toLowerCase();
                    !this.isAgitated && Oa && ":teams" != M ? -1 != ya.indexOf(c) ? (J.hasOwnProperty(c) || (J[c] = new Image, J[c].src = "skins/" + c + ".png"), b = 0 != J[c].width && J[c].complete ? J[c] : null) : b = null : b = null;
                    b = (d = b) ? -1 != gb.indexOf(c) : !1;
                    a || e.stroke();
                    e.fill();
                    null == d || b || (e.save(), e.clip(), e.drawImage(d, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), e.restore());
                    (xa || 15 < this.size) && !a && (e.strokeStyle = "#000000", e.globalAlpha *= .1, e.stroke());
                    e.globalAlpha = 1;
                    null != d && b && e.drawImage(d, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                    b = -1 != m.indexOf(this);
                    a = ~~this.y;
                    if ((ka || b) && this.name && this.nameCache && (null == d || -1 == fb.indexOf(c))) {
                        d = this.nameCache;
                        d.setValue(this.name);
                        d.setSize(this.getNameSize());
                        c = Math.ceil(10 * g) / 10;
                        d.setScale(c);
                        var d = d.render(),
                            f = ~~(d.width / c),
                            h = ~~(d.height / c);
                        e.drawImage(d, ~~this.x - ~~(f / 2), a - ~~(h / 2), f, h);
                        a += d.height / 2 / c + 4
                    }
                    Pa && (b || 0 == m.length && (!this.isVirus || this.isAgitated) && 20 < this.size) && (null == this.sizeCache && (this.sizeCache = new ja(this.getNameSize() / 2, "#FFFFFF", !0, "#000000")), b = this.sizeCache, b.setSize(this.getNameSize() / 2), b.setValue(~~(this.size * this.size / 100)), c = Math.ceil(10 * g) / 10, b.setScale(c),
                        d = b.render(), f = ~~(d.width / c), h = ~~(d.height / c), e.drawImage(d, ~~this.x - ~~(f / 2), a - ~~(h / 2), f, h));
                    e.restore()
                }
            }
        };
        ja.prototype = {
            _value: "",
            _color: "#000000",
            _stroke: !1,
            _strokeColor: "#000000",
            _size: 16,
            _canvas: null,
            _ctx: null,
            _dirty: !1,
            _scale: 1,
            setSize: function (a) {
                this._size != a && (this._size = a, this._dirty = !0)
            },
            setScale: function (a) {
                this._scale != a && (this._scale = a, this._dirty = !0)
            },
            setColor: function (a) {
                this._color != a && (this._color = a, this._dirty = !0)
            },
            setStroke: function (a) {
                this._stroke != a && (this._stroke = a, this._dirty = !0)
            },
            setStrokeColor: function (a) {
                this._strokeColor != a && (this._strokeColor = a, this._dirty = !0)
            },
            setValue: function (a) {
                a != this._value && (this._value = a, this._dirty = !0)
            },
            render: function () {
                null == this._canvas && (this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d"));
                if (this._dirty) {
                    this._dirty = !1;
                    var a = this._canvas,
                        b = this._ctx,
                        c = this._value,
                        d = this._scale,
                        e = this._size,
                        f = e + "px Ubuntu";
                    b.font = f;
                    var h = b.measureText(c)
                        .width,
                        g = ~~(.2 * e);
                    a.width = (h + 6) * d;
                    a.height = (e + g) * d;
                    b.font = f;
                    b.scale(d, d);
                    b.globalAlpha = 1;
                    b.lineWidth = 3;
                    b.strokeStyle = this._strokeColor;
                    b.fillStyle = this._color;
                    this._stroke && b.strokeText(c, 3, e - g / 2);
                    b.fillText(c, 3, e - g / 2)
                }
                return this._canvas
            }
        };
        Date.now || (Date.now = function () {
            return (new Date)
                .getTime()
        });
        // Use jquery ready instead of window.onload
        //f.onload = Sa
        h(Sa)
    }
}
