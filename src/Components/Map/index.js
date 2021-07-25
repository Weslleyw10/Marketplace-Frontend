import { useSelector } from 'react-redux'

import GoogleMapReact from 'google-map-react'

import './style.css'
import Marker from '../Marker'

const Map = ({ data }) => {
    const API_KEY = 'AIzaSyDu9vbSKgyEYMB-32CNr6uDVz7Vd-lb8No'

    const { mapCenter } = useSelector(state => state.shop)

    return (
        <div className="container-map">
            <GoogleMapReact
                bootstrapURLKeys={{key: API_KEY}}
                center={mapCenter}
                defaultZoom={15}
            >
                { data.map(shop => <Marker key={shop._id} shop={shop} lat={shop.location.lat} lng={shop.location.lng} />) }
                

            </GoogleMapReact>
        </div>

    )
}

export default Map