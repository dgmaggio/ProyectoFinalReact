import ButtonLink from '../components/common/ButtonLink';
import InfoCards from '../components/common/InfoCards';
import FeaturedProducts from '../components/common/FeaturedProducts';
import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <>
        <SEO 
            title="Inicio"
            description="Descubrí los mejores productos en nuestra tienda online. Ofertas especiales y envío gratis."
            keywords="tienda online, productos, ofertas, compras, electrodomésticos"
            url="https://react25017-diegomaggio.netlify.app"
        />
        
        <section>
            <div className="text-white h-[calc(100dvh-64px)] lg:h-[calc(100dvh-96px)] w-full flex flex-col md:flex-row">
            
                <div className="relative group px-4 lg:px-8 w-full md:w-1/2 flex items-center h-1/2 md:h-full bg-[url('./assets/images/herobg1.jpg')] bg-cover bg-center">
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/80 group-hover:from-cyan-950/80 transition"></div>

                    <div className="flex flex-col space-y-2 md:space-y-4 z-10 md:items-center md:mx-auto md:text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold">Temporada 2026</h1>
                        
                        <p className="text-lg lg:text-xl pb-2">Conocé lo que se va a usar antes que nadie.</p>
                        
                        <ButtonLink
                            to="/productos"
                            className='w-fit lg:text-xl lg:px-6 lg:py-4 hover:bg-transparent border-1 border-transparent hover:border-white'
                        >
                            ¡Ir ahora!
                        </ButtonLink>
                    </div>
                </div>
                
                
                <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full">
                    
                    <div className="relative group px-4 lg:px-8 h-full h-1/2 bg-green-100 flex items-center bg-[url('./assets/images/herobg2.jpg')] bg-cover bg-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/80 group-hover:from-cyan-950/80 transition"></div>

                            <div className="flex flex-col space-y-2 md:space-y-4 z-10 md:items-center md:mx-auto md:text-center lg:w-1/2">
                                <h2 className="md:text-2xl lg:text-4xl font-semibold pb-2">Los gadgets más modernos y a precios increíbles</h2>
                                
                                <ButtonLink
                                    to="/productos"
                                    className='w-fit lg:text-xl lg:px-6 lg:py-4 hover:bg-transparent border-1 border-transparent hover:border-white'
                                >
                                    Novedades
                                </ButtonLink>
                            </div>
                    </div>
                    
                    
                    <div className="relative group px-4 lg:px-8 h-full h-1/2 bg-green-100 flex items-center bg-[url('./assets/images/herobg3.jpg')] bg-cover bg-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/80 group-hover:from-cyan-950/80 transition"></div>

                            <div className="flex flex-col space-y-2 md:space-y-4 z-10 md:items-center md:mx-auto md:text-center lg:w-1/2">
                                <h2 className="md:text-2xl lg:text-4xl font-semibold pb-2">Liquidamos todas las bicicletas y monopatines</h2>
                                
                                <ButtonLink
                                    to="/productos"
                                    className='w-fit lg:text-xl lg:px-6 lg:py-4 hover:bg-transparent border-1 border-transparent hover:border-white'
                                >
                                    Ofertas
                                </ButtonLink>
                            </div>
                    </div>
                </div>
            </div>

        </section>

        <InfoCards />
        
        <FeaturedProducts />
        
    </>
  );
};

export default Home;