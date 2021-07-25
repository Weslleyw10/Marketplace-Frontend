import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { allShop } from '../../store/modules/Shop/actions'

import './style.css'

import Header from '../../Components/Header'
import Shop from '../../Components/Shop'
import Map from '../../Components/Map'


const Landing = () => {
    const dispatch = useDispatch()
    const { shops } = useSelector(state => state.shop)

    useEffect(() => {
        dispatch(allShop())
    }, [])

    return (
        <div className="h-100">
            <Header />
            <div className="container-fluid shop-list-container">
                <div className="col-12 px-4 text-center">
                    <h5>Mais próximos de você (5)</h5>
                </div>

                <ul className="col-12 shop-list">
                    {
                        shops.map(shop => (
                            <Shop key={shop._id} data={shop} />
                        ))
                    }

                </ul>
            </div>

            <Map data={shops} />
        </div>

    )

}

export default Landing