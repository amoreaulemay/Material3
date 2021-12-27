/**
 * Utility function to check if an object matches an interface's definition.
 * 
 * @param object any object.
 * @param discriminator a field in the interface to compare against.
 * @returns boolean, if whether or not the object is an instance of an interface.
 */
export function instanceOf<T>(object: any, discriminator: string): object is T {
    return discriminator in object;
}