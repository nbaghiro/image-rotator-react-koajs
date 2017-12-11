const Koa = require('koa');
//const request = require('koa-request');
const request = require('request-promise')
const app = new Koa();

const weatherApiKey = "950bbdabfe724ec690c201235171112";

app.use(async (ctx, next) => {
    ctx.body = `Hello there, \nWhether estimator running ... (start of 1st middleware)\n\n`;
    await next();
});

app.use(async (ctx, next) => {	
	ctx.body += `Accessing geoLocate API ... (start of 2nd middleware)\n\n`;
	var geoLocateOptions = {
		method: 'GET',
    	uri: 'http://ip-api.com/json',
    	json: true
	};
	var geoLocateResponse = await request(geoLocateOptions); 
	ctx.body += `Location: ${geoLocateResponse.city}, ${geoLocateResponse.country} (lat: ${geoLocateResponse.lat}, lon: ${geoLocateResponse.lon}) \n\n`;

	ctx.body += `Accessing apixu weather API ... \n\n`;
	var weatherApiOptions = {
		method: 'GET',
    	//uri: `http://api.apixu.com/v1?q=${geoLocateResponse.lat},${geoLocateResponse.lon}&key=${weatherApiKey}`,
    	uri: `http://api.apixu.com/v1/current.json?key=${weatherApiKey}&q=${geoLocateResponse.lat},${geoLocateResponse.lon}`,
    	json: true
	};
	//`api.openweathermap.org/data/2.5/weather?lat=${geoLocateResponse.lat}&lon=${geoLocateResponse.lon}&APPID=${weatherApiKey}`
	var weatherApiResponse = await request(weatherApiOptions);
	ctx.body += `Weather type: ${weatherApiResponse.current.condition.text}, temperature: ${weatherApiResponse.current.temp_c}C, weather Code: ${weatherApiResponse.current.condition.code}\n\n`;
	await next();
});

app.use(async (ctx, next) => {
    ctx.body += `Whether estimator done ... (start of 3rd middleware)\n\n`;
});

app.listen(3000);