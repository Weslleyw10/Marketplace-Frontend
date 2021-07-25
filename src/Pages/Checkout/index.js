import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import dayjs from 'dayjs'
import _ from 'underscore'

import { setTransaction as setTransactionAction, makePurchase } from '../../store/modules/Shop/actions'

import Header from '../../Components/Header'
import Product from '../../Components/Product/List'
import './style.css'


const Checkout = () => {
    const dispatch = useDispatch()

    const { cart, transactionFee, defaultRecipient } = useSelector(state => state.shop)

    const [transaction, setTransaction] = useState({
        amount: 0,
        card_number: "",
        card_cvv: "",
        card_expiration_date: "",
        card_holder_name: "",
        shipping: {
            name: "Shop LTDA",
            fee: 1000,
            delivery_date: dayjs().add(7, 'days').format('YYYY-MM-DD'),
            expedited: true,
            address: {
                country: "br",
                state: "",
                city: "",
                neighborhood: "",
                street: "",
                street_number: "",
                zipcode: ""
            }
        },
        items: [],
        split_rules: []
    })

    const total = cart.reduce((total, product) => {
        return total + Number(product.preco)
    }, 0)

    const setShippingValue = (key, value) => {
        setTransaction({
            ...transaction,
            shipping: {
                ...transaction.shipping,
                address: {
                    ...transaction.shipping.address,
                    [key]: value
                }
            }
        })
    }

    const splitRulesHandle = () => {
        const productsByShop = _.groupBy(cart, (product) => product.shop_id.recipient_id)

        let result = []

        Object.keys(productsByShop).map(shop => {
            const products = productsByShop[shop]

            let totalValuePerShop = products.reduce((total, product) => {
                return total + Number(product.preco)
            }, 0).toFixed(2)

            const totalFee = (totalValuePerShop * transactionFee).toFixed(2)

            result.push({
                recipient_id: products[0].shop_id.recipient_id,
                percentage: Math.floor(((totalValuePerShop - totalFee) / total) * 100),
                liable: true,
                charge_processing_fee: true
            })

            return result
        })

        const totalShopsPercentage = result.reduce((total, recipient) => {
            return total + parseFloat(recipient.percentage)
        }, 0)

        result.push({
            ...defaultRecipient,
            percentage: 100 - totalShopsPercentage
        })


        return result


    }

    const purchaseHandle = () => {
        console.log('TRANSACTION', transaction)
        dispatch(setTransactionAction(transaction))
        setTimeout(() => {
            dispatch(makePurchase())
        }, 100)
    }

    useEffect(() => {
        setTransaction({
            ...transaction,
            amount: total.toFixed(2).toString().replace('.', ''),
            items: cart.map(product => ({
                id: product._id,
                title: product.nome,
                unit_price: Number(product.preco).toFixed(2).toString().replace('.', ''),
                quantity: 1,
                tangible: true
            })),
            split_rules: splitRulesHandle()
        })

    }, [total, cart, transaction])



    return (
        <div className="h-100">
            <Header />
            <div className="container mt-4 p-5">
                <div className="row">
                    <div className="col-6">
                        <span className="section-title">Dados de Entrega</span>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="CEP"
                                    className="form-control form-control-lg"
                                    name="cep"
                                    onChange={(e) => setShippingValue('zipcode', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-9">
                                <input
                                    type="text"
                                    placeholder="Endereço"
                                    className="form-control form-control-lg"
                                    name="street"
                                    onChange={(e) => setShippingValue('street', e.target.value)}
                                />
                            </div>

                            <div className="col-3 pl-0">
                                <input
                                    type="number"
                                    placeholder="Número"
                                    className="form-control form-control-lg"
                                    name="street_number"
                                    onChange={(e) => setShippingValue('street_number', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Bairro"
                                    className="form-control form-control-lg"
                                    name="neighborhood"
                                    onChange={(e) => setShippingValue('neighborhood', e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">
                            <div className="col-8">
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    className="form-control form-control-lg"
                                    name="city"
                                    onChange={(e) => setShippingValue('city', e.target.value)}
                                />
                            </div>

                            <div className="col-4 pl-0">
                                <input
                                    type="text"
                                    placeholder="UF"
                                    className="form-control form-control-lg"
                                    name="state"
                                    onChange={(e) => setShippingValue('state', e.target.value)}
                                />
                            </div>
                        </div>

                        <span className="section-title">Dados de Pagamento</span>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Nome impresso no cartão"
                                    className="form-control form-control-lg"
                                    name="card_holder_name"
                                    onChange={(e) => setTransaction({ ...transaction, card_holder_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Número do cartão"
                                    className="form-control form-control-lg"
                                    name="card"
                                    onChange={(e) => setTransaction({ ...transaction, card_number: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-9">
                                <input
                                    type="text"
                                    placeholder="Validade"
                                    className="form-control form-control-lg"
                                    name="validate"
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction, card_expiration_date: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="col-3 pl-0">
                                <input
                                    type="number"
                                    placeholder="CVV"
                                    className="form-control form-control-lg"
                                    name="cvv"
                                    onChange={(e) => setTransaction({ ...transaction, card_cvv: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <b>Total</b>
                                <h3>R$ {total.toFixed(2)}</h3>
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-block btn-lg btn-primary"
                                    onClick={() => purchaseHandle()}
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="box-sidebar col mb-4">
                            <h4>Minha sacola ({cart.length})</h4>

                            <div className="row products">
                                {
                                    cart.map(product => (
                                        <Product key={product._id} data={product} />
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default Checkout