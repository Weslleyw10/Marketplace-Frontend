import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { requestShop } from '../../store/modules/Shop/actions'

import { MdStarBorder, MdPayment, MdGpsFixed } from "react-icons/md";

import './style.css'

import Header from '../../Components/Header'
import ProductCard from '../../Components/Product/Card'

const Shop = ({ match }) => {
    const dispatch = useDispatch()
    const { shop } = useSelector(state => state.shop)

    useEffect(() => {
        dispatch(
            requestShop(match.params.id)
        )
    }, []) 


    return (
        <div className="h-100">
            <Header />

            <div className="container shop-container">
                <div className="row">
                    <div className="col-2">
                        <img className="shop-cover img-fluid" src={shop.logo} alt={shop.nome} title={shop.nome} />

                        <h1 className="shop-name">{shop.nome}</h1>

                        <div className="shop-infos">
                            <MdStarBorder className="MdStartBorder" />
                            <span className="">{shop.destaque}</span>

                            <MdPayment />
                            <span className="">{shop.categoria}</span>

                            <MdGpsFixed />
                            <span className="">2,9km</span>

                        </div>
                        
                        <label className="badge badge-primary">Frete Grátis</label>
                    </div>
                    
                    <div className="col-10 product-list">
                        <h3>Produtos</h3>

                        <div className="row">
                            {
                                shop.productsOfShop?.map(product => (
                                    <ProductCard key={product._id} data={product} />
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
    
}

export default Shop