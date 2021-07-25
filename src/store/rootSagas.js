import { all } from 'redux-saga/effects'

import shop from './modules/Shop/sagas'

export default function* rootSagas() {
    return yield all([
        shop
    ]);
}