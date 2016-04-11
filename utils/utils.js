const   _ = require('underscore');

module.exports = _.extend({}, _, {
    args: function(args, slice, sliceEnd){
        var ret = [];
        var len = args.length;

        if (0 === len) return ret;

        var start = slice < 0 ? Math.max(0, slice + len) : slice || 0;

        if (sliceEnd !== undefined) {
            len = sliceEnd < 0 ? sliceEnd + len : sliceEnd
        }

        while (len-- > start) {
            ret[len - start] = args[len];
        }

        return ret;
    },
    inherits : function(superCtor, struct){
        var ctor = function(){
            this.__constructor && this.__constructor.apply(this, arguments);
        };
        ctor.super_ = ctor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        ctor.prototype = _.extend(ctor.prototype, struct)
        ctor.prototype.__super = function(){
            return superCtor.apply(this, arguments)
        }
        ctor.prototype.__superApply = function(args){
            return superCtor.apply(this, args)
        }
        return ctor;
    },
    symbolMask: function(am, ar, aa, as){
        var ir, ia, is, i, j, k,
            s = /[\+\,\s]/,
            m = 0, r = '',
            l = 1, e = [];
        for(i=0; i<am.length; i++)
            if (s.test(am[i])) {
                (l = am[i] !== '+') && (r = []);
            } else if (l) {
                r = am[i] === 'a' ? ar : r+am[i];
            } else {
                if(as[0]===am[i])
                    e[ar.length] |= 1;
                else {
                    for(j=r.length;j--;){
                        if((ir = ar.indexOf(r[j])) === -1)
                            throw new Error('Incorret Role token [' + r[j] + ']');
                        if((ia = aa.indexOf(am[i])) === -1 && (is = as.indexOf(am[i])) === -1)
                            throw new Error('Incorret Flag token [' + r[j] + ']');
                        if(ia>-1)
                            e[ir] |= 1 << ia;
                        else
                            for(k=r.length;k--;){
                                e[ar.length] |= (is << (ar.indexOf(r[k])));
                            }
                    };
                }
            };
        for(i=ar.length+1;i--;)
            m |= (e[i]||0) << i * aa.length;
        return m;
    },
    bitMask: function(mr, ma, cr, ca){
        var m, i;
        for(i=0;i<cr*ca;i++)
           m|=(1&!!((1 << i%cr)&mr))*(1&!!((1 << i%ca)&ma)) << i;
        return m;
    },
    hex2dec: function(hex){
        return parseInt(hex, 16);
    },
    dec2hex: function(dec){
        return dec.toString(16);
    },
    deepExtend: require('deep-extend'),
    promise: require('q')
});
