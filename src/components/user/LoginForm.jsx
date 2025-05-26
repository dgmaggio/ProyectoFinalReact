import { useState } from "react";
import { Link } from 'react-router-dom';
import Field from "../common/Field";
import Button from "../common/Button";

const LoginForm = ({ onLogin }) => {
	const [formData, setFormData] = useState({
		usuario: "",
		password: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin(formData); // Lógica en Login.jsx
	};

    return (
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
						autoComplete="username"
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
						autoComplete="current-password"
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
					<Link
						to="#"
						className="alink"
					>
						Olvidé mi contraseña

					</Link>
				</li>
				<li>
					<Link
						to="#"
						className="alink"
					>
						Quiero registrarme

					</Link>
				</li>
				<li>
					<Link
						to="#"
						className="alink"
					>
						Necesito ayuda

					</Link>
				</li>
			</ul>
		</div>
    );
};

export default LoginForm;