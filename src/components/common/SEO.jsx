import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    keywords,
    image,
    url,
    type = 'website'
}) => {
    const siteTitle = 'Proyecto Final';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    
    return (
        <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#00b8db" />
            {/* Meta tags básicos */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            
            {/* URL canónica */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;