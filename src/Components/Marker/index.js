import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MarkerIcon from '../../Assets/marker.png'
import MarkerIconSelected from '../../Assets/marker-selected.png'

import './style.css'


const Marker = ({ shop }) => {
    const { shopMapSelected } = useSelector(state => state.shop)


    return (
        <div className="marker no-selected">
            <Link to={`shop/${shop._id}`}>
                <img className="" src={shopMapSelected === shop._id ? MarkerIconSelected : MarkerIcon} alt="" title="" />
                <img className="marker-img shop-cover" src={shop.logo} alt={shop.nome} title={shop.nome} />
            </Link>
        </div>
    )
}

export default Marker