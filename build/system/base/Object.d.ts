export default abstract class Object {
    static create(config: {
        [key: string]: any;
    }): Object;
}
