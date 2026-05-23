/* Config Sample
*
* For more information on how you can configure this file
* see https://docs.magicmirror.builders/configuration/introduction.html
* and https://docs.magicmirror.builders/modules/configuration.html
*
* You can use environment variables using a `config.js.template` file instead of `config.js`
* which will be converted to `config.js` while starting. For more information
* see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
*/
let config = {
	address: "0.0.0.0",	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "id-ID",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	electronOptions: {
		webPreferences: {
			webviewTag: true
		}
	},

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "Indonesian Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/en.indonesian%23holiday%40group.v.calendar.google.com/public/basic.ics"
					}
				]
			}
		},
		{
			module: 'MMM-SimpleText',
			position: 'lower_third',
			config: {
				   text: {
					 'value': 'Hello World!'
				   },
				   fontURL: {
					 'value': 'Tahoma, Geneva, sans-serif'
				   },
				   fontSize: {
					 'value': 'xxx-large'
				   },
				   fontStyle: {
					 'value': 'normal'
				   },
				   color: {
					value: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'] // merah, hijau, biru, kuning
				   },
			   }
	   },
	   
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",
				lat: -5.1486,
				lon: 119.4319
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Indonesian News",
						url: "https://news.detik.com/berita/rss"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		// {
		// 	module: 'MMM-Remote-Control',
		// 	config: {
		// 		customCommand: {},  // Optional, See "Using Custom Commands" below
		// 		showModuleApiMenu: true, // Optional, Enable the Module Controls menu
		// 		secureEndpoints: true, // Optional, See API/README.md
		// 		// uncomment any of the lines below if you're gonna use it
		// 		// customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
		// 		// apiKey: "", // Optional, See API/README.md for details
		// 		// classes: {} // Optional, See "Custom Classes" below
		// 		symbol: 'remote'
		// 	}
		// },
		// {
		// 	module: 'EXT-Spotify',
		// 	position: 'top_left',
		// 	animateIn: "flipInX",
		// 	animateOut: "flipOutX",
		// 	config: {
		// 		updateInterval: 1000,
		// 		idleInterval: 10000,
		// 		useBottomBar: false,
		// 		CLIENT_ID: "e67ebd73011140a88b0dedc3da300913",
		// 		CLIENT_SECRET: "1ce6be36171447bfa8d796e1fa1b029a",
		// 		mini: true,
		// 		forceSCL: false,
		// 		noCanvas: false
		// 	}
		// },
		{
			module: "MMM-GoogleAssistant",
			configDeepMerge: true,
			position: "top_right",
			config: {
				assistantConfig: {
					projectId: "smart-mirror-436307",
					modelId: "smart-mirror-436307",
					instanceId: "",
					latitude: -5.1486,
					longitude: 119.4319
				},
				recipes: [
					"../../EXT-Spotify/recipe/EXT-Spotify.js",
					"../../EXT-MusicPlayer/recipe/EXT-MusicPlayer.js",
					"../../EXT-YouTube/recipe/EXT-YouTube.js",
					"../../MMM-GoogleAssistant/recipes/resepkhusus.js",
					"../../MMM-GoogleAssistant/recipes/recipe.template.js",
					
				],
				responseConfig: {
					useHTML5: true,
					screenOutput: true,
					screenZoom: 100,
					screenMode: "fullscreen",
					activateDelay: 250,
					useStaticOutput: false,
					useMMP: true,
					verbose: true
				},
				micConfig: { // untuk USB mic, optional
					recorder: "arecord",
					device: "plughw:2,0",
				},
				onCommand: function(command, payload) {
					if (command === "WEB_SEARCH") {
						let url = payload.url;
						console.log("URL yang diterima: ", url); // Tambahkan log untuk memeriksa URL
						if (url) {
							MM.getModules().withClass("EXT-Browser").enumerate(function(mod) {
								mod.show(1000);
								mod.openURL(url); // Buka URL di browser
							});
						} else {
							console.log("URL tidak ditemukan atau tidak valid.");
						}
					}
				}
			}
		},
		{
			module: 'EXT-Alert',
			config: {
				debug: false,
				style: 1,
				ignore: []
			}
		},
		{
			module: "MMM-Bugsounet/EXTs/EXT-Detector",
			position: "top_left",
			config: {
				debug: true,
				useIcon: true,
				porcupineAccessKey: "o8AovnRJoP6kKsWsr8SeL5YrZFs69fOyq2TEVmG8QILrNk9Ym393ZA==",
    			porcupineCustomModel: "Ok_Gura.ppn",
				detectors: [
					{
						detector: "Snowboy",
						Model: "jarvis",
						Sensitivity: 1
					},
					{
						detector: "Snowboy",
						Model: "neoya",
						Sensitivity: 1
					},
					{
						detector: "Snowboy",
						Model: "computer",
						Sensitivity: 1
					},
					{
						detector: "Porcupine",
						Model: "custom",
						Sensitivity: 0.8
					}
				]
			}
		},
		{
			module: "MMM-Hotword",
			position: "bottom_left",
			config: {
				verbose: true,
				hotwords: [
				{
					hotword: 'JARVIS',
					continuousRecording: false,
					onDetect: async ({helper, error}) => {
						if (error) return
						const google = helper.getModule('MMM-GoogleAssistant')
						google.activate()
					}

				},
				{
					hotword: "Ok Gura",
					file: "Ok_Gura.ppn",
					onDetect: async ({helper, error}) => {
						if (error) return
						const google = helper.getModule('MMM-GoogleAssistant')
						google.show()
					}
				},
				]
			},
		},
		{
			module: "EXT-SmartHome",
			config: {
				debug: false,
				username: "admin",
				password: "admin",
				CLIENT_ID: null
			}
		},
		{
			module: "MMM-Bugsounet",
			config: {
				username: "admin",
				password: "admin",
				useLimiter: false
			}
		},
		{
			module: "EXT-Touch",
			position: "top_left"
		},
		{
			module: 'EXT-RemoteControler',
			config: {
				keyFinder: false,
				type: "samsung",
				throttledTimeout: 250
			}
		},
		{
			module: "EXT-Background",
			config: {
				model: "gurapack"
			}
		},
		{
			module: 'EXT-Welcome',
			config: {
				welcome: "SELAMAT DATANG KEMBALI, MASTER",
			}
		},
		{
			module: "EXT-YouTubeCast",
			position: "top_right", // optional (can be deleted if using fullscreen)
			config: {
				debug: false,
				fullscreen: false,
				width: "20vw",
				height: "353eses5ct5cgtvgvh",
				alwaysDisplayed: true,
				castName: "MagicMirror",
				port: 8569
			}
		},
		{
			module: "EXT-Browser",
			config: {
				url: "https://www.wikipedia.org",
				debug: false,
				displayDelay: 20 * 1000,
				scrollActivate: false,
				scrollStep: 25,
				scrollInterval: 1000,
				scrollStart: 5000,
				lockString: "EXT_LOCKED",
			}
		},
		{
			module: "MMM-Rainbow",
			config: {
				fadeTime: 1500,		//	Duration in milliseconds it takes for the color to fade.
				nextColor: 1500,	//	Duration in milliseconds until the next color is set.
				modular: true,		//	Use on selected modules
				random: false,		//	true = random colors, false = user specified colors.
				colors: [
					"#F00",	//	Red
					"#FF0",	//	Yellow
					"#0F0",	//	Green
					"#0FF",	//	Cyan
					"#00F",	//	Blue
					"#F0F"	//	Magenta
				],
				moduleList: [
					"MMM-SimpleText",
				]
			},
		},
		{
		module: 'EXT-MusicPlayer',
		animateIn: "flipInX",
		animateOut: "flipOutX",
		position: 'top_left',
		config: {
			debug: false,
			useUSB: false,
			musicPath: "/home/robotikimt/Downloads/Smurf_mirror/music",
			checkSubDirectory: false,
			random: false,
			autoStart: false,
			minVolume: 30,
			maxVolume: 100,
			loop: false
		}
		},
		{
			module: 'EXT-VLCServer',
			disabled: false,
			config: {
			  debug: true,
			  vlcPath: "/usr/bin"
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
