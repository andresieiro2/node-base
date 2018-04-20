import KoaRouter from 'koa-router';

const SingletonRouter = (function () {
    let instance;

    function createInstance() {
        return new KoaRouter();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


export default SingletonRouter.getInstance();
