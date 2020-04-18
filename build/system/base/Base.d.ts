export default class Base<C> extends Object {
    private _defaults;
    config: C;
    constructor(config: C);
    get defaults(): C;
    set defaults(config: C);
    private configure;
}
