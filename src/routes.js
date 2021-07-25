import { BrowserRouter as Router, Route } from 'react-router-dom'

import Register from './Pages/Register'
import Checkout from './Pages/Checkout'
import Shop from './Pages/Shop'
import Landing from './Pages/Landing'
import Sidebar from './Components/Sidebar'


const Routes = () => {
    return (
        <>
        <Router>
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/shop/:id" exact component={Shop} />
            <Sidebar />
        </Router>
        </>
    )
}

export default Routes