import makeFinalStore from 'alt/utils/makeFinalStore';

export default function (alt, storage, storeName) {
    const finalStore = makeFinalStore(alt);

    try {
        alt.bootstrap(storage.get('debug'));
    }
    catch (e) {
        console.error('Failed to bootstrap data', e);
    }

    finalStore.listen(() => {
        if (!storage.get('debug')) {
            storage.set(storeName, alt.takeSnapshot());
        }
    });
}