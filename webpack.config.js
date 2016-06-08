var ExtractText = require('extract-text-webpack-plugin');
var webpack = require('webpack');

// tohle je zhruba zakladni nastaveni konfigurace webpacku
module.exports = (function(env) {

  /*
  environment:
    - dev = developement
    - pro = production
  */

  if (!env)
    env = 'dev';

  var environment =  env == 'dev' ? 'developement' : 'production';

  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('----------------------------------------------------------------');
  console.log('--- webpack has started in "' + environment + '" environment ---');
  console.log('----------------------------------------------------------------');

  var basePath = './app/'; // zakladni slozka nasi app

  var config = { // zakladni nastaveni webpacku
    // vice vstupnich souboru:
    /*
    entry: {
      headerCompiled: basePath + 'src/js/header.js',
      footerCompiled: basePath + 'src/js/footer.js'
    },
    output: {
      filename: '[name].js' // v name bude key (headerCompiled a footerCompiled) a webpack nam tedy vytvori dva soubory (headerCompiled.js a footerCompiled.js)
    },
    */
    // jeden svtupni soubor:
    entry: {
      base: basePath + 'src/js/main.js' // vstupni soubor pro webpacku
    },
    output: {
      path: './app/dist', // kam se buodu vysledne soubory ukladat
      filename: 'main.js' // nazev zkompilovaneho souboru
    },
    module: {
      loaders: [ // loadery, ktere se aplikuji dle pravidel v loaders.test (coz je v podstate regularni vyraz)
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.scss$/,
          loader: ExtractText.extract('style', 'css!sass')
        },
        {
          test: /\.jpg$/,
          loader: "url-loader?limit=10000&minetype=image/jpg"
        }
        /*
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test: /\.scss$/, // na vsechny soubory, co konci .scss
          //loaders: ['style-loader', 'css-loader'] // se aplikuji loadery css a style, muzeme take zapsat bez toho -loader: "loader: ['style', 'css']"
          loader: ExtractText.extract('style-loader', 'css-loader', 'sass-loader') // take se aplikuji style a css lodery, ale zavola se take extractPlugin, ktery nam z CSS souboru udela samostatne soubory - jiz styly nebudou v javascriptu
        }
        */
      ]
    },
    plugins: [
      new ExtractText('main.css', { // vygenereuje CSS do samostatneho souboru, vice zde: https://github.com/webpack/extract-text-webpack-plugin, pokud tento plugin pouzijeme, tak nam nebude fungovat HOT REALOAD
        allChunks: true
      }),
      // new webpack.optimize.CommonsChunkPlugin('common')
    ]
  }

  // pokud jsme ve fazi vyvoje, webpack bude delat dalsi kopu veci
  if (env === 'dev') {
    config.devtool = 'source-map' // v podstate stejny prikaz jako "webpack -w --devtool source-map ./app/src/js/global.js dist/bundle.js" - viz. readme
  }

  return config;

})('dev')