export default class Base<C> extends Object {

  private _defaults: C;

  public config: C;

  public constructor(config: C) {
    super();
    this.configure(config);
  }

  public get defaults(): C {
    return this._defaults;
  }

  public set defaults(config: C) {
    this._defaults = { ...this._defaults, ...config };
  }

  private configure(custom: { [key: string]: any } = {}): this {
    const config = { ...this.defaults, ...custom };
    for (const name in config) {
      if (typeof config[name] !== 'undefined') {
        (this as any)[name] = config[name];
      }
    }

    return this;
  }
};
