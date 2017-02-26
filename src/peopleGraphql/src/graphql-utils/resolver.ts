/**
 * Created by Yochai on 1/24/2017.
 */

class resolver {
    rootResolver: Object;
    constructor() {
        this.rootResolver = {};
    }

    getRootResolver() : Object{
        return this.rootResolver;
    }

    addResolver(resolver: Function): void {
        const funcName = resolver.name;
        if(this.rootResolver[funcName]) {
            console.log('Resolver function all ready exits, name: ' + funcName);
            return;
        }
        this.rootResolver[funcName] = resolver;
    }
}

export const Resolver = new resolver();
