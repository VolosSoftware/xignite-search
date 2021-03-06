(function(e) {
    e.widget("ui.xigniteTypeahead", {
        _create: function() {
            var g = {
                api: "",
                keyParam: "key",
                q: "q"
            };
            e.extend(g, this.options || {});
            if (!String.prototype.trim) String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/gm, "")
            };
            var d = this.element,
                f = d.data("xignite-typeahead-key"),
                m = d.data("xignite-typeahead-invalid-key-text"),
                b = null,
                n = "",
                o = function(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                }, q = function() {
                    d.on("keydown", function(a) {
                        switch (a.which) {
                            case 13:
                                return b.is(":visible") &&
                                    p(b.children(".selected")), !1;
                            case 9:
                            case 27:
                                b.hide();
                                break;
                            case 38:
                                return h(-1), !1;
                            case 40:
                                return h(1), !1
                        }
                        return !0
                    });
                    b.on("keydown", function(a) {
                        switch (a.which) {
                            case 27:
                                return b.hide(), !1;
                            case 38:
                                return h(-1), !1;
                            case 40:
                                return h(1), !1
                        }
                        return !0
                    });
                    b.on("mouseover", function(a) {
                        a = e(a.target);
                        b.children(".xigniteTypeahead-dropdown-item").removeClass("selected");
                        a.hasClass("xigniteTypeahead-dropdown-item") && a.addClass("selected")
                    });
                    b.on("mousedown", function(a) {
                        p(e(a.target))
                    });
                    e("html").click(function() {
                        b.hide()
                    })
                },
                p = function(a) {
                    var c = d.val().split(",");
                    c[c.length - 1] = a.data("xignite-typeahead-value");
                    d.val(c.join());
                    d.trigger("keyup");
                    b.hide()
                }, k = function() {
                    var a = d.val().split(",");
                    return a[a.length - 1].trim()
                }, h = function(a) {
                    if (b)
                        for (var c = b.children(".xigniteTypeahead-dropdown-item"), d = 0; d < c.length; d++) {
                            var i = e(c[d]);
                            if (i.hasClass("selected")) {
                                i.removeClass("selected");
                                e(c[(c.length + d + a) % c.length]).addClass("selected");
                                break
                            }
                        }
                }, l = function(a, c) {
                    var j = "",
                        i = k();
                    if (c && c.length > 0) j = '<li class="xigniteTypeahead-dropdown-text">' +
                        c + "</li>";
                    else if (a && a.Term && a.Term == i) {
                        var f = a.Results,
                            g = RegExp("(^|[^])" + o(i), "gi"),
                            h = RegExp("(^|[ -])" + o(i), "gi");
                        f && e.isArray(f) && e.each(f, function(a, b) {
                            var c = b.Value.replace(g, function(a) {
                                return "<strong>" + a + "</strong>"
                            });
                            b.Tag && b.Tag.length > 0 && (c += '<span class="xigniteTypeahead-dropdown-item-tag">' + b.Tag + "</span>");
                            b.Text && b.Text.length > 0 && (c += "<br/>" + b.Text.replace(h, function(a) {
                                 console.log("text: " + b.Text);
                                return "<strong>" + a + "</strong>"
                            }));
                            j += '<li class="xigniteTypeahead-dropdown-item' + (a == 0 ? " selected " : "") + '" data-xignite-typeahead-value="' +
                                b.Value + '">' + c + "</li>"
                        })
                    }
                    b || (b = e('<ul class="xigniteTypeahead-dropdown"></ul>'), q(), d.after(b));
                    j.length > 0 ? b.html(j).show() : b.html(j).hide()
                }, r = function(a) {
                    var c = d.data("xignite-typeahead-disabled-text");
                    d.data("xignite-typeahead-disabled") ? l(null, c) : f && f.length > 0 ? a && a.length > 0 ? (c = {}, c[g.keyParam] = f, c[g.q] = a, f && f.length > 0 && e.ajax({
                        type: "GET",
                        url: g.api,
                        data: c,
                        dataType: "json",
                        success: function(a) {
                            try {
                                l(a)
                            } catch (b) {}
                        },
                        statusCode: {
                            204: function() {
                                d.data("xignite-typeahead-disabled", "true");
                                d.removeData("xignite-typeahead-disabled-text");
                                l(null, m)
                            }
                        }
                    })) : b && (b.html(""), b.hide()) : l(null, m)
                };
            (function() {
                d.on("keyup", function(a) {
                    if (a.which == 8 || a.which > 47 && a.which < 58 || a.which > 64 && a.which < 91 || a.which > 95 && a.which < 112 || a.which > 185 && a.which < 193 || a.which > 218 && a.which < 223) a = k(), a != n && (r(k()), n = a);
                    k().length == 0 && b && b.hide()
                })
            })()
        },
        destroy: function() {
            e.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);
