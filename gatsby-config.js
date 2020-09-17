const siteMetadata = require('./site-metadata.json')
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                functions: {
                    "getPaletteKey($key)": function(sassKey) {
                        function hexToRgb(hex) {
                            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                            let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                                return r + r + g + g + b + b;
                            });

                            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                            return result ? {
                                r: parseInt(result[1], 16),
                                g: parseInt(result[2], 16),
                                b: parseInt(result[3], 16)
                            } : null;
                        }
                        let sassParams = siteMetadata.palettes[siteMetadata.palette].sass;
                        let key = sassKey.getValue();
                        let value = sassParams[key];
                        let colorRegExp = /^#(?:[a-f\d]{3}){1,2}$/i;
                        let result;
                        if (colorRegExp.test(value)) {
                            result = hexToRgb(value);
                            result = new sass.types.Color(result.r, result.g, result.b);
                        } else {
                            result = sassUtils.castToSass(value)
                        }
                        return result;
                    }
                }}
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {}
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'GatsbyJS',
                short_name: 'GatsbyJS',
                start_url: '/',
                background_color: '#f7f0eb',
                theme_color: '#a2466c',
                display: 'standalone',
                icon: 'public/images/favicon.png',
            }
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: "UA-178295922-1",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
                // Avoids sending pageview hits from custom paths
                exclude: [],
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Enables Google Optimize using your container Id
                optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
                // Enables Google Optimize Experiment ID
                experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // Set Variation ID. 0 for original 1,2,3....
                variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                // Defers execution of google analytics script after page load
                defer: false,
                // Any additional optional fields
                sampleRate: 5,
                siteSpeedSampleRate: 10,
            }
        }
    ]
};
