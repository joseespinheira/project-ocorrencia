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
import AsyncStorage from "@react-native-async-storage/async-storage";

const MAPBOX_TOKEN = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

const initialViewState = {
    latitude: -12.86,
    longitude: -38.35,
    zoom: 10
};

function Mapa() {
    useEffect(() => {
        async function guardarDadosIniciais() {
            try {
                await AsyncStorage.setItem('@app_ocorrecia_localizacao', JSON.stringify({
                    latitude: initialViewState.latitude,
                    longitude: initialViewState.longitude
                }))
            } catch (e) {
                // saving error
            }
        }
        guardarDadosIniciais()
    }, [])
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
        // if(validaMarcador()){

        // }
        navigate(-1);
    }

    const [lng, setLng] = useState(-8.340951);
    const [lat, setLat] = useState(-2.8756802);

    useEffect(() => {
        if (coords) {
            setLat(coords.latitude)
            setLng(coords.longitude)
        }
    }, [coords]);

    const onClick = async event => {
        try {
            await AsyncStorage.setItem('@app_ocorrecia_localizacao', JSON.stringify({
                latitude: event.lngLat.lat,
                longitude: event.lngLat.lng
            }))
        } catch (e) {
            // saving error
        }
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
        mapRef.current?.flyTo({ center: [lng, lat], duration: 2000 });
    };
    return (
        <div style={{ height: '100%' }}>
            <div className="d-flex justify-content-around align-items-center"><label>Click no mapa para selecionar</label>
                <Button className="botao" onClick={handleSelecionar}>Avançar</Button>
            </div>
            {!isGeolocationAvailable ? (
                <div>Seu dispositivo não tem suporte a Geolocalização</div>
            ) : !isGeolocationEnabled ? (
                <div>Geolocalização não está ativa.</div>
            ) : coords ?
                <div className="relative w-full h-full d-flex justify-content-center">
                    <Map
                        ref={mapRef}
                        initialViewState={initialViewState}
                        style={{ width: size.width - 10, height: size.height - 56 - 38 }}

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
                : <div>Getting the location data&hellip; </div>}
            {!isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : !isGeolocationEnabled ? (
                <div>Geolocation is not enabled</div>
            ) : coords ? (
                <div>
                    <br></br>
                    <br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td>latitude:</td>
                                <td>{coords.latitude}</td>
                            </tr>
                            <tr>
                                <td>longitude:</td>
                                <td>{coords.longitude}</td>
                            </tr>
                            <tr>
                                <td>altitude:</td>
                                <td>{coords.altitude}</td>
                            </tr>
                            <tr>
                                <td>heading:</td>
                                <td>{coords.heading}</td>
                            </tr>
                            <tr>
                                <td>speed:</td>
                                <td>{coords.speed}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Getting the location data&hellip; </div>
            )}
        </div>
    );
}

export default Mapa;
