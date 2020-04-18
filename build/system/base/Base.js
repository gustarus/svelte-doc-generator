"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base extends Object {
    constructor(config) {
        super();
        this.configure(config);
    }
    get defaults() {
        return this._defaults;
    }
    set defaults(config) {
        this._defaults = { ...this._defaults, ...config };
    }
    configure(custom = {}) {
        const config = { ...this.defaults, ...custom };
        for (const name in config) {
            if (typeof config[name] !== 'undefined') {
                this[name] = config[name];
            }
        }
        return this;
    }
}
exports.default = Base;
;
