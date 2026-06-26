var capacitorAppTrackingTransparency = (function (exports, core) {
    'use strict';

    const AppTrackingTransparency = core.registerPlugin('AppTrackingTransparency', {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.AppTrackingTransparencyWeb()),
    });

    class AppTrackingTransparencyWeb extends core.WebPlugin {
        async getStatus() {
            // Web platform doesn't have tracking transparency
            // Return 'authorized' as web doesn't require this permission
            return { status: 'authorized' };
        }
        async requestPermission() {
            // Web platform doesn't have tracking transparency
            // Return 'authorized' as web doesn't require this permission
            return { status: 'authorized' };
        }
        async getPluginVersion() {
            return { version: 'web' };
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AppTrackingTransparencyWeb: AppTrackingTransparencyWeb
    });

    exports.AppTrackingTransparency = AppTrackingTransparency;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
