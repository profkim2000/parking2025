import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

// geoserver에서 WMS의 타일 방식으로 받아온다.
const wmsLayer = new TileLayer
(
  {
    visible: true,
    source: new TileWMS
    (
      {
        url: 'http://localhost:8080/geoserver/parking/wms',
        params: 
        {
          'FORMAT': 'image/png',
          tiled: true,
          "STYLES": '',
          "LAYERS": 'parking:data', 
          "CQL_FILTER": "300 <= car_count"  // CQL_FILTER를 통해 필터링할 수 있다. 
        }
      }
    )
  }
);

// osm 레이어를 만든다.
const osmLayer = new TileLayer
(
  {
    source: new OSM()
  }
);


// openLayers를 위한 지도를 만든다.
const map = new Map
(
  {
    target: 'map',
    layers: [osmLayer, wmsLayer],
    view: new View
    (
      {
        center: [0, 0],
        zoom: 2
      }
    )
  }
);