import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Field from "../components/common/Field";
import Button from '../components/common/Button';

const Login = () => {
    const [formData, setFormData] = useState({
        usuario: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <section>
            <PageHeader />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:w-1/2 gap-4 lg:gap-12 mx-auto px-4 lg:px-8 pb-6 lg:pb-12">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Field
                            label="Usuario"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            placeholder="Ingresá tu usuario"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <Field
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresá tu contraseña"
                            required
                        />
                    </div>

                    <div>
                        <Button>
                            Ingresar
                        </Button>
                    </div>
                </form>

                <ul className="flex flex-col space-y-1 text-sm">
                    <li>
                        <a
                            href="#"
                            className="alink"
                        >
                            Olvidé mi contraseña

                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="alink"
                        >
                            Quiero registrarme

                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="alink"
                        >
                            Necesito ayuda

                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Login;