import { useDispatch, useSelector } from 'react-redux'
import { toggleCartProduct } from '../../../store/modules/Shop/actions'

import './style.css'

const ProductCard = ({ data }) => {
    const dispatch = useDispatch()
    
    const { cart } = useSelector(state => state.shop)

    const added = cart.findIndex(product => product._id === data._id) !== -1

    const toggleCartProductHandle = (product) => {
        dispatch(
            toggleCartProduct(product)
        )
    }

    return (
        <div className="product col-3">
            
            <img className="img-fluid align-center" src={data.capa} alt={data.nome} title={data.nome} />

            <h2>{data.nome}</h2>

            <p>R$ {data.preco}</p>

            <button 
            onClick={() => toggleCartProductHandle(data)} 
            className={`btn btn-${added ? 'secondary' : 'primary'} rounded-circle`}
            >
                <span>
                    {added ? '-' : '+'}
                </span>
            </button>

        </div>
    )

}

export default ProductCard