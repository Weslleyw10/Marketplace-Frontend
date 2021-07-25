import { takeLatest, all, call, put, select } from 'redux-saga/effects'
import Swal from 'sweetalert2'

import types from './types'
import rest from '../../../Services/rest'

import { setShops, setShop } from './actions'

export function* allShops() {
    try {
        const { data: res } = yield call(rest.get, '/shops')
        yield put(setShops(res.shops))

    } catch (error) {
        console.log(error.message)
        
    }

}

export function* requestShop(payload) {
    try {
        const { data: res } = yield call(rest.get, `/shops/${payload.id}`)
        yield put(setShop(res.shop))

    } catch (error) {
        console.log(error.message)
    }
}

export function* makePurchase() {
    const { transaction } = yield select(state => state.shop)
    console.log("TRANSACTION", transaction)

    try {
        const { data: res } = yield call(rest.post, `/purchase`, transaction)


        
        if(res.error) {
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                text: res.response.errors[0].message
            })

            return false

        } 

        if(res.data.status !== 'paid') {
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                text: res.response.errors[0].message
            })

            return false
        }

        Swal.fire({
            icon: 'success',
            title: 'Tudo certo!',
            text: 'Sua compra foi aprovada com sucesso'
        })

    } catch (error) {
        console.log(error.message)
    }
}

export default all([
    takeLatest(types.ALL_SHOP, allShops),
    takeLatest(types.REQUEST_SHOP, requestShop),
    takeLatest(types.MAKE_PURCHASE, makePurchase),
])