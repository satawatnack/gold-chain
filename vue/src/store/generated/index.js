// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import SatawatnackGoldchainSatawatnackGoldchainGoldchain from './satawatnack/goldchain/satawatnack.goldchain.goldchain';
import SatawatnackGoldchainSatawatnackGoldchainConsuming from './satawatnack/goldchain/satawatnack.goldchain.consuming';
export default {
    SatawatnackGoldchainSatawatnackGoldchainGoldchain: load(SatawatnackGoldchainSatawatnackGoldchainGoldchain, 'satawatnack.goldchain.goldchain'),
    SatawatnackGoldchainSatawatnackGoldchainConsuming: load(SatawatnackGoldchainSatawatnackGoldchainConsuming, 'satawatnack.goldchain.consuming'),
};
function load(mod, fullns) {
    return function init(store) {
        if (store.hasModule([fullns])) {
            throw new Error('Duplicate module name detected: ' + fullns);
        }
        else {
            store.registerModule([fullns], mod);
            store.subscribe((mutation) => {
                if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
                    store.dispatch(fullns + '/init', null, {
                        root: true
                    });
                }
            });
        }
    };
}
