(function () {

  var tileUrl = 'http://a.tiles.mapbox.com/v3/mlmorg.gfnol46k/{z}/{x}/{y}.png';
  var iconUrl = 'http://a.tiles.mapbox.com/v3/marker/pin-l-{text}+{color}.png';

  function Riders () {
    this.map = document.getElementById('map');
    this.summary = document.getElementById('summary');
    this.mapScreen = document.getElementById('map-screen');
    this.detailScreen = document.getElementById('detail-screen');

    this.leaflet = L.map(this.map);

    this.summary.addEventListener('click', this.showDetail.bind(this));

    L.tileLayer(tileUrl).addTo(this.leaflet);
    this.leaflet.setView([-29.609988, 28.233608], 8);

    var that = this;
    this.leaflet.on('click', function (e) {
      that.addTown(e.latlng);
    });
  }

  Riders.prototype.addTown = function (latlng) {
    var marker = this.addMarker(latlng);
    marker.on('click', this.showSummary.bind(this));
  };

  Riders.prototype.showSummary = function () {
    if (!this.summary.className.match(/show/)) {
      this.summary.className += ' show';
    }
  };

  Riders.prototype.showDetail = function () {
    this.detailScreen.className = this.detailScreen.className.replace('out-right', '');
    this.mapScreen.className += ' out-left';
  };

  Riders.prototype.addMarker = function (latlng, options) {
    options = options || {};
    options.icon = options.icon || this.createIcon(options);

    var marker = L.marker(latlng, options);

    marker.addTo(this.leaflet);
    return marker;
  };

  Riders.prototype.createIcon = function (options) {
    options = L.Util.extend({
      text: 'village',
      color: '#7ec9b1',
      iconSize: [35, 90],
      iconAnchor: [18, 45]
    });

    options.iconUrl = options.iconUrl || L.Util.template(iconUrl, {
      text: options.text,
      color: options.color.replace('#', '')
    });

    return L.icon(options);
  };

  new Riders();

})();
