import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTruck, faStore } from '@fortawesome/free-solid-svg-icons';

const InfoCards = () => {
    const services = [
      { icon: faCreditCard, title: 'Pago en cuotas', description: 'Hasta 12 cuotas sin interés' },
      { icon: faTruck, title: 'Envío gratis', description: 'En compras mayores a $50.000' },
      { icon: faStore, title: 'Retiro gratis', description: 'En nuestros locales' }
    ];
  
    return (
    <section className="bg-cyan-100 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {services.map((service, index) => (
            <div key={index} className="flex lg:flex-col gap-4 items-center">
                <FontAwesomeIcon
                    icon={service.icon}
                    className="text-cyan-500 text-2xl lg:text-5xl"
                    aria-hidden="true"
                />
                <div className='lg:text-center'>
                    <h3 className="text-xl lg:text-3xl font-bold text-cyan-950 lg:mb-2">{service.title}</h3>
                    <p className="text-xs lg:text-base">{service.description}</p>
                </div>
            </div>
        ))}
        </div>
    </section>
    );
};

export default InfoCards;