import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useWindowSize from '../../../components/use-window-size';

const MAPBOX_TOKEN = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX; // Set your mapbox token here

const initialViewState = {
    // width: '100%',
    //height: '70%',
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 11
};

function AdicionarOcorrencia() {
    // const Map = ReactMapboxGl({
    //     accessToken:
    //         'pk.eyJ1Ijoiam9zZWVzcGluaGVpcmEiLCJhIjoiY2w0ajZiOHc2MHowbDNkcnl5bDB6bHJmZSJ9.xiimwlo9zxUk8gOC8Csf_g'
    // });
    const mapRef = useRef();
    const size = useWindowSize();
        let navigate = useNavigate();
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const handleSelecionar = async (event) => {
        navigate(`/home/ocorrencia/addFoto`);
    }

    const [lng, setLng] = useState(-8.340951);
    const [lat, setLat] = useState(-2.8756802);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (coords) {
            setLat(coords.latitude)
            setLng(coords.longitude)
            setZoom(10)
        }
    }, [coords]);

    const onClick = event => {
        console.log(event.lngLat)
        setMarker({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng
        })
    };
    const [marker, setMarker] = useState({
        latitude: -12.86,
        longitude: -38.35,
        anchor: "center"
    })

    const onMapLoad = () => {
        console.log(mapRef)

        mapRef.current?.flyTo({ center: [lng, lat], duration: 2000 });
        //mapRef.current?.resize();

    };

    return (
        <div style={{ height: '100%' }}>
            <div className="relative w-full h-full">
                <Map
                    ref={mapRef}
                    initialViewState={initialViewState}
                    style={{ width: size.width-10, height: size.height-56-38 }}

                    //onStyleLoad={(map)=>onLoaded(map)}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    onClick={onClick}
                    onLoad={onMapLoad}
                >
                    <GeolocateControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl />

                    <Marker {...marker}

                    />
                </Map>
            </div>
            <div className="d-flex justify-content-around align-items-center"><label>Click no mapa para selecionar</label>
            <Button className="botao" onClick={handleSelecionar}>Proximo -></Button>
            </div>
            {/* {!isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : !isGeolocationEnabled ? (
                <div>Geolocation is not enabled</div>
            ) : coords ? (
                <table>
                    <tbody>
                        <tr>
                            <td>latitude</td>
                            <td>{coords.latitude}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{coords.longitude}</td>
                        </tr>
                        <tr>
                            <td>altitude</td>
                            <td>{coords.altitude}</td>
                        </tr>
                        <tr>
                            <td>heading</td>
                            <td>{coords.heading}</td>
                        </tr>
                        <tr>
                            <td>speed</td>
                            <td>{coords.speed}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>Getting the location data&hellip; </div>
            )} */}
        </div>
    );
}

export default AdicionarOcorrencia;
