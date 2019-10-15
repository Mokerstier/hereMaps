mapboxgl.accessToken = 'pk.eyJ1IjoibW9rZXJzdGllciIsImEiOiJjazFxbm5za2sxMWE2M2NwZGNncGFzazZlIn0.0oOI9FSQB1saUbuCqq9nCw';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center:  [4.90, 52.37], // starting position [lng, lat]
zoom: 11 // starting zoom
});

