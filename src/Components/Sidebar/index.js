import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


import './style.css'
import Dock from 'react-dock'

import Product from '../../Components/Product/List'

const Sidebar = () => {
    const { cart } = useSelector(state => state.shop)
    const history = useHistory()
    
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        window.addEventListener('openCart', () => {
            setOpened(true)
        })
    },[])

    const total = cart.reduce((total, product) => {
        return total + Number(product.preco)
    },0)



    return (
        <Dock
            position="right"
            isVisible={opened}
            onVisibleChange={(visible) => {setOpened(visible)}}
        >

            <div className="container-fluid h-100 pt-4 sidebar">
                <h4>Minha Sacola ({cart.length})</h4>

                <div className="row products">
                    {
                        cart?.map(product => (
                            <Product key={product._id} data={product} />
                        ))
                    }
                </div>
                
                <div className="row footer">
                    <div className="col-12 d-flex justify-content-between aling-items-center">
                        <span className="inline-block">Total</span>
                        <p className="inline-block">R$ {total}</p>
                    </div>
                    
                    <button
                    className="btn btn-block btn-lg btn-primary rounded-0 h-50 align-items-center"
                    onClick={() => history.push('/register')}
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </Dock>
    )
}

export default Sidebar