export default abstract class Object {

  public static create(config: { [key: string]: any }): Object {
    throw new ReferenceError('Not implemented yet');
  };
};
