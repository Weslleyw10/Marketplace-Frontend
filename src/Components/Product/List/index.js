import { useDispatch } from 'react-redux'
import { toggleCartProduct } from '../../../store/modules/Shop/actions'

import './style.css'

const Product = ({ data }) => {
    const dispatch = useDispatch()

    const toggleCartProductHandle = (product) => {
        dispatch(
            toggleCartProduct(product)
        )
    }

    return (
        <div key={data._id} className="product-list col-12">
            <div className="row">
                <div className="col-3">
                    <img src={data.capa} className="img-fluid" alt={data.nome} title={data.nome} />
                </div>
                <div className="col-6">
                    <h6>
                        <label className="badge badge-primary">R$ {data.preco}</label>
                    </h6>

                    <small>
                    {data.nome}
                    </small>
                    
                </div>
                <div className="col-3">
                    <button 
                    className="btn btn-secondary rounded-circle"
                    onClick={() => toggleCartProductHandle(data)}
                    > -
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product