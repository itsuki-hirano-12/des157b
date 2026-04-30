(function(){
    'use strict';

    // add your script here

    // granim
    

    // leaflet
    const map = L.map('map').setView([37.698551, -122.073959], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([37.705917, -122.084377]).addTo(map);

    const polygon =  L.polygon([
        [37.706769, -122.077705],
        [37.706667, -122.074575],
        [37.703238, -122.074489],
        [37.703272, -122.078263]
    ]).addTo(map);

    const circle = L.circle([37.695584, -122.074103], {
        color: 'green',
        fillColor: 'lightgreen',
        fillOpacity: '0.3',
        radius: 450
    }).addTo(map);

    marker.bindPopup('This is my home');
    polygon.bindPopup('This is my high school');
    circle.bindPopup('This is the downtown area');

    // var marker = L.marker([51.5, -0.09]).addTo(map);

    // var circle = L.circle([51.508, -0.11], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(map);

    // var polygon = L.polygon([
    //     [51.509, -0.08],
    //     [51.503, -0.06],
    //     [51.51, -0.047]
    // ]).addTo(map);

    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    // circle.bindPopup("I am a circle.");
    // polygon.bindPopup("I am a polygon.");

    // var popup = L.popup()
    // .setLatLng([51.513, -0.09])
    // .setContent("I am a standalone popup.")
    // .openOn(map);

    // function onMapClick(e) {
    //     alert("You clicked the map at " + e.latlng);
    // }

    // map.on('click', onMapClick);

    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    // map.on('click', onMapClick);

    const granimInstance = new Granim({
        element: '#gradient',
        direction: 'left-right',
        isPausedWhenNotInView: true,
        
        states : {
            "default-state": {
                gradients: [
                    [
                        { color: '#9473c2', pos: 0 },
                        { color: '#d371e7', pos: .6 },
                        { color: '#ed92a3', pos: .9 }
                    ], [
                        { color: '#71e5da', pos: .3 },
                        { color: '#b4e386', pos: .5 },
                        { color: '#d2f18f', pos: .8 }
                    ],
                ],
                transitionSpeed: 7000,
            }
        }
        
    });

    
}());