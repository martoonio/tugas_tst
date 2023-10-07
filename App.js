import "./App.css";
import "leaflet/dist/leaflet.css"
import useGeoLocation from "./components/useGeoLocation";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Header from "./components/header";

export default function App() {

  const centerPoint = { lat: -6.928707048696331, lng: 107.76919858588303};
  
  const location = useGeoLocation();

  const markers = [
    {
      geocode : [-6.9336859, 107.7682782],
      popUp : "Shuttle 1"
    }
  ];

  const busIcon = new Icon({
    // iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconUrl: require('./bus-icon-10.png'),
    iconSize: [50, 50]
  });
  const userIcon = new Icon({
    // iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconUrl: require('./userIcon.png'),
    iconSize: [50, 50]
  });

  const interactionOptions = {
    zoomControl: false,
    doubleClickZoom: false,
    // dragging: false,
    zoomSnap: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
  };

  const createCustomClusterIcon = (cluster) => {
    return new DivIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: 'custom-marker-cluster',
      iconSize: new Icon.Size(40, 40)
    })
  };

  

  return (
    <div>
      <MapContainer center={centerPoint} zoom={17} className="static--map" {...interactionOptions}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {location.loaded && !location.error && (
          <Marker key="user-marker" position={[location.coordinates.lat,location.coordinates.lng]} icon={userIcon}>
            <Popup>
              {"You Are Here!"}
            </Popup>
          </Marker>
        )}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={cluster => {createCustomClusterIcon(cluster)}}
        >
          {markers.map((marker, index) => (
            <Marker key={`marker-${index}`} position={marker.geocode} icon={busIcon}>
              <Popup>
                {marker.popUp}
              </Popup>
            </Marker>
          ))}
          <Header/>
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  );
}
