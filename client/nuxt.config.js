export default {
	build: {
		extractCSS: {
			ignoreOrder: true
		}
	},
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/svg-sprite',
		'cookie-universal-nuxt',
	],
	buildModules: [
		'@aceforth/nuxt-optimized-images',
	],
	optimizedImages: {
		inlineImageLimit: 1000,
		handleImages: ['jpeg', 'png', 'webp', 'svg'],
		optimizeImages: true,
		optimizeImagesInDev: false,
		defaultImageLoader: 'img-loader',
		mozjpeg: {
			progressive: true,
			quality: 75,
		},
		optipng: {
			optimizationLevel: 4,
		},
		pngquant: {
			quality: [0.50, 0.70],
			speed: 8
		},
		gifsicle: false,
		svgo: false,
		webp: {
			preset: 'default',
			quality: 75,
		},
	},
	plugins: [
		'~/plugins/axios'
	],
	svgSprite: {
		input: '~/static/images/svg/',
		svgoConfig() {
			return {
				plugins: [
					{
						convertPathData: {
							floatPrecision: 2
						}
					},
					{removeXMLNS: true},
					{removeViewBox: false},
					{removeDimensions: true},
					{
						removeAttrs: {
							attrs: '(stroke|fill|fill-rule)'
						}
					}
				]
			}
		}
	}
};
