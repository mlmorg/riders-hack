(function () {

  var tileUrl = 'http://a.tiles.mapbox.com/v3/mlmorg.gfnol46k/{z}/{x}/{y}.png';
  var iconUrl = 'http://a.tiles.mapbox.com/v3/marker/pin-m-{text}+{color}.png';

  function Map (el, options) {
    this.leaflet = L.map(el);
    L.tileLayer(tileUrl).addTo(this.leaflet);
    this.leaflet.setView([-29.609988, 28.233608], 8);

    var that = this;
    this.leaflet.on('click', function (e) {
      that.addTown(e.latlng);
    });
  }

  Map.prototype.addTown = function (latlng) {
    var marker = this.addMarker(latlng);
  };

  Map.prototype.addMarker = function (latlng, options) {
    options = options || {};
    options.icon = options.icon || this.createIcon(options);

    var marker = L.marker(latlng, options);

    marker.addTo(this.leaflet);
    return marker;
  };

  Map.prototype.createIcon = function (options) {
    options = L.Util.extend({
      text: 'village',
      color: '#7ec9b1',
      iconSize: [30, 70],
      iconAnchor: [15, 35]
    });

    options.iconUrl = options.iconUrl || L.Util.template(iconUrl, {
      text: options.text,
      color: options.color.replace('#', '')
    });

    return L.icon(options);
  };

  var el = document.getElementById('map');
  new Map(el);

})();
