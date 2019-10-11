
console.log("connected");
    
    var platform = new H.service.Platform({
    'apikey': 'pZztGd4sFMZ3vD8szXbb'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 10,
      center: { lng: 52.4, lat: 5.51 }
    });

