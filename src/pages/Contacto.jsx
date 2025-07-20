import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import Field from "../components/common/Field";
import Button from '../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';


const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: ""
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
                <div>
                    <p className="mb-4">Completá el formulario y nos contactaremos a la brevedad.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Field
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ingresá tu nombre"
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <Field
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tucorreo@ejemplo"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <Field
                                label="Telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Ingresá tu teléfono"
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <Field
                                as="textarea"
                                label="Mensaje"
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Escribinos un mensaje"
                                rows={6}
                                required
                            />
                        </div>

                        <div>
                            <Button>
                                Enviar
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col space-y-4">
                    <p>
                        <strong>Dirección</strong><br/>

                        <Link
                            to="https://maps.app.goo.gl/6hPmnAosjaAcjQkH8"
                            className="group inline-block leading-6 hover:text-cyan-950"
                        >
                            Blvd. San Martín 2215<br/>
                            Cdad. Jardín Lomas de Palomar (B1684BJN)<br/>
                            Provincia de Buenos Aires <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" className="text-cyan-500 group-hover:text-cyan-950 ms-1" />
                        </Link>
                    </p>

                    <p>
                        <strong>Horarios</strong><br/>
                        Lunes a viernes 9:00 a 20:00<br/>
                        Sábados y domingos 9:00 a 13:00
                    </p>

                    <p>
                        <strong>Email</strong><br/>

                        <Link
                            to="mailto:info@proyectofinal.com.ar"
                            className="group hover:text-cyan-950"
                        >
                            info@proyectofinal.com.ar <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" className="text-cyan-500 group-hover:text-cyan-950 ms-1" />
                        </Link>
                    </p>

                    <p>
                        <strong>WhatsApp</strong><br/>

                        <Link
                            to="https://api.whatsapp.com/send?phone=5491112345678"
                            className="group hover:text-cyan-950"
                        >
                            +54 911 1235 45678 <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" className="text-cyan-500 group-hover:text-cyan-950 ms-1" />
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contacto;