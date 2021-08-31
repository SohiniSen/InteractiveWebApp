
window.app = {};
var app = window.app;


var currentInteraction = null
var currentButton = null

// Define rotate to north control.



/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.RotateNorthControl = function(opt_options) {

    var options = opt_options || {};

    var button = document.createElement('button');
    //   button.innerHTML = 'D';
    

    var buttonPoly = document.createElement('button');
    buttonPoly.innerHTML = '<i class="fas fa-vector-square"></i>';

    var buttonL = document.createElement('button');
    buttonL.innerHTML = '/';

    var buttonP = document.createElement('button');
    buttonP.innerHTML = '<i class="fas fa-map-marker"></i>';
    

    var this_ = this;
    var handleRotateNorth = function() {
        this_.getMap().getView().setRotation(0);
        
        button.addEventListener('click', stopDraw, false);
        map.addInteraction(draw);
        // map.removeInteraction(draw)
        

    };
    var line = function() {
        this_.getMap().getView().setRotation(0);

        map.removeInteraction(currentInteraction);
        // currentButton?.removeEventListener('click', stopDraw);

        currentInteraction = drawL;
        currentButton = buttonL;
        buttonL.addEventListener('click', stopDraw, false);
        map.addInteraction(drawL);
    };

    var polygon = function() {
        this_.getMap().getView().setRotation(0);
        
        map.removeInteraction(currentInteraction);
        // currentButton?.removeEventListener('click', stopDraw);
        
        currentInteraction = drawPoly;
        currentButton = buttonPoly;
        buttonPoly.addEventListener('click', stopDraw, false);
        map.addInteraction(drawPoly);
        // map.removeInteraction(draw,drawL,drawP)
        

    };
    var point = function() {
        this_.getMap().getView().setRotation(0);
        
        map.removeInteraction(currentInteraction);
        // currentButton?.removeEventListener('click', stopDraw);

        currentInteraction = drawP
        currentButton = buttonP
        buttonP.addEventListener('click', stopDraw, false);
        map.addInteraction(drawP); 
    };

    var stopDraw = function(){
        map.removeInteraction(currentInteraction);

        currentButton.removeEventListener('click', stopDraw)

        if (currentInteraction === drawP)
        currentButton.addEventListener('click', point, false)
    
        if (currentInteraction === drawL)
        currentButton.addEventListener('click', line, false)
        
        if (currentInteraction === drawPoly)
        currentButton.addEventListener('click', polygon, false)
        
        currentInteraction = null
        console.log("Stop Draw");
    }
    
    
    
        button.addEventListener('click', handleRotateNorth, false,);
        buttonPoly.addEventListener('click', polygon, false,);
        buttonL.addEventListener('click', line, false,);
        buttonP.addEventListener('click', point, false,);


    var element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    //   element.appendChild(button);
    element.appendChild(buttonPoly);
    element.appendChild(buttonL);
    element.appendChild(buttonP);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

    };
    ol.inherits(app.RotateNorthControl, ol.control.Control);


    //
    // Create map, giving it a rotate to north control.
    //


    var map = new ol.Map({
    controls: ol.control.defaults({
        attributionOptions: {
        // collapsible: false
        }
    }).extend([
        new app.RotateNorthControl()
    ]),
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM()
        })
    ],
    target: 'map',
    view: new ol.View({
        center: [9063583.436221749, 2467948.0974145196],
        zoom: 3,
        rotation: 1
    })
});

var sourceDraw = new ol.source.Vector()
var layerDraw = new ol.layer.Vector({
    source : sourceDraw
})
map.addLayer(layerDraw)


// line
var sourceDrawL = new ol.source.Vector()
var layerDrawL = new ol.layer.Vector({
    source : sourceDrawL
})
map.addLayer(layerDrawL)
var drawL= new ol.interaction.Draw({
    source : sourceDrawL,
    type : 'LineString',
    
})
// Polygon
var sourceDrawPoly = new ol.source.Vector()
var layerDrawPoly = new ol.layer.Vector({
    source : sourceDrawPoly
})
map.addLayer(layerDrawPoly)
var drawPoly= new ol.interaction.Draw({
    source : sourceDraw,
    type : 'Polygon',
    
})
// Point
var sourceDrawP = new ol.source.Vector()
var layerDrawP = new ol.layer.Vector({
    source : sourceDrawP
})
map.addLayer(layerDrawP)
var drawP= new ol.interaction.Draw({
    source : sourceDrawP,
    type : 'Point',
    
})
