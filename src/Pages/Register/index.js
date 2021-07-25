import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import utils from '../../utils'

import illustration from '../../Assets/illustration.png'
import './style.css'

import { setCustomer as setCostumerAction } from '../../store/modules/Shop/actions'

import Header from '../../Components/Header'

const Register = () => {
    const dispatch = useDispatch()

    const [customer, setCustomer] = useState({
        external_id: new Date().getTime().toString(),
		name: "",
		type: "individual",
		country: "br",
		email: "",
		documents: [
			{
				type: "cpf",
				number: ""
			}
		],
		phone_numbers: [
			"+55"
		],
		phone_numbers: "1965-01-01"
    })

    const setCustomerHandle = () => {
        dispatch(setCostumerAction(customer))
    }

    return (
        <div className="container-fluid h-100 bg-primary">
            <Header 
            logoType
            hideCart
            />

            <div className="row">
                <div className="col-6 my-auto text-right">
                    <img className="img-fluid" src={illustration} title="" alt="" />
                </div>

                <div className="col-6">
                    <div className="box col-8">
                        <h2>Falta pouco pra fazer o seu pet felix.</h2>

                        <input
                            type="text"
                            name="name"
                            className="form-control form-control-lg mb-3"
                            placeholder="Nome completo"
                            onChange={e => setCustomer({ ...customer, name: e.target.value })}
                        />
                        <input
                            type="phone"
                            name="phone"
                            className="form-control form-control-lg mb-3"
                            placeholder="Telefone"
                            onChange={e => setCustomer({ ...customer, phone_numbers: [e.target.value] })}
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg mb-3"
                            placeholder="Email"
                            onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        />
                        <input
                            type="text"
                            name="cpf"
                            className="form-control form-control-lg mb-3"
                            placeholder="CPF"
                            onChange={e => setCustomer({ 
                                ...customer, 
                                documents: [
                                    { type: 'cpf', number: utils.removeCharacteresCPF(e.target.value) }
                                ]
                            })}
                        />
                        <input
                            type="date"
                            name="birthDate"
                            className="form-control form-control-lg mb-3"
                            placeholder="Data de Nascimento"
                            onChange={e => setCustomer({ ...customer, birthday: e.target.value })}
                        />

                        <Link
                        to="/checkout" 
                        onClick={setCustomerHandle()} 
                        className="btn btn-lg btn-block btn-secondary">
                            Finalizar Pedido
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    )

}

export default Register