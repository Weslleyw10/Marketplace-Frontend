import { useSelector } from 'react-redux'

import logoWhite from '../../Assets/logo-white.png'
import logoGreen from '../../Assets/logo.png'

import { MdShoppingBasket } from 'react-icons/md'

import './style.css'

import { Link } from 'react-router-dom'


const Header = ({logoType, hideCart}) => {
    const logo = logoType ? logoWhite : logoGreen

    const { cart } = useSelector(state => state.shop)
    


    const openDrawer = () => {
        const event = new CustomEvent('openCart')
        window.dispatchEvent(event)
    }

    return (
        <div className="col-12">
            <header className="py-4 px-4 text-center">
                <Link to="/">
                <img className="img-fluid header-logo" src={logo} title="" alt="" /> 
                </Link>
                
                {
                    !hideCart && (
                        <button 
                        onClick={() => openDrawer()}
                        className="btn btn-secondary cart-button">
                            <MdShoppingBasket/> {cart.length} itens
                        </button>
                    )
                }

            </header>

        </div>
    )
}

export default Header