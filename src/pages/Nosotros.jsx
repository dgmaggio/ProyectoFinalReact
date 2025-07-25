import PageHeader from '../components/common/PageHeader';
import SEO from '../components/common/SEO';

const Nosotros = () => {
    return (
        <>
            <SEO 
                title="Sobre Nosotros"
                description="Conocé nuestra historia, misión y valores. Somos una tienda online comprometida con la calidad y la satisfacción del cliente desde 2024."
                keywords="sobre nosotros, historia empresa, misión, valores, quienes somos, equipo"
                url="https://react25017-diegomaggio.netlify.app/nosotros"
            />

            <section>
                <PageHeader />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:w-1/2 gap-4 lg:gap-12 mx-auto px-4 lg:px-8 pb-6 lg:pb-12">
                    <div>
                        En <strong>Proyecto Final</strong>, nuestra misión es simplificar y enriquecer tu experiencia de compra. Comprendemos que la vida moderna exige flexibilidad y acceso a una amplia gama de productos, por eso hemos creado un espacio donde la diversidad se encuentra con la conveniencia. Nos esforzamos por ser tu destino único para todo lo que necesitas, desde los artículos esenciales del día a día hasta esas pequeñas indulgencias que hacen la vida más placentera, todo cuidadosamente seleccionado para garantizar calidad y valor.
                    </div>

                    <div>
                        La esencia de nuestra tienda radica en <strong>la variedad y la accesibilidad</strong>. Recorremos incansablemente el mercado para traerte una colección ecléctica de productos que abarca múltiples categorías: hogar, tecnología, moda, bienestar, ocio y mucho más. Cada artículo en nuestras estanterías y en nuestra plataforma ha sido elegido pensando en las necesidades y los deseos de nuestros clientes, asegurando que siempre encuentres opciones que se adapten a tu estilo de vida, preferencias y presupuesto.
                    </div>
                </div>
            </section>
        </>
    );
};

export default Nosotros;