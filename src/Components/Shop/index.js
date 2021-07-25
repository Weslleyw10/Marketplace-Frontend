import { useDispatch, useSelector } from 'react-redux'
import { setMapCenter, setShopMapSelected } from '../../store/modules/Shop/actions'

import { MdStarBorder, MdPayment, MdGpsFixed } from "react-icons/md";

import './style.css'


const Shop = ({ data }) => {
    const dispatch = useDispatch()
    const { shopMapSelected } = useSelector(state => state.shop)

    const setSelectedShopHandle = () => {
        dispatch(setShopMapSelected(data._id))
        dispatch(setMapCenter(data.location))
    }

    return (
        <li 
        key={data._id}
        className={`shop d-inline-block ${shopMapSelected === data._id ? 'active' : ''}`}
        onClick={() => setSelectedShopHandle()}
        >
            <div className="d-inline-block pl-3 align-bottom">
                <img className="shop-cover img-fluid" src={data.logo} alt={data.nome} title={data.nome} />
            </div>

            <div className="d-inline-block pl-3 align-bottom">

                <h1 className="shop-name">{data.nome}</h1>

                <div className="shop-infos">
                    <MdStarBorder className="MdStartBorder" />
                    <span className="">{data.destaque}</span>

                    <MdPayment />
                    <span className="">{data.categoria}</span>

                    <MdGpsFixed />
                    <span className="">2,9km</span>

                </div>

                <label className="badge badge-primary">Frete Grátis</label>
            </div>
        </li>

    )
}

export default Shop