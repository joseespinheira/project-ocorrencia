import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

function AdicionarFoto() {
    let navigate = useNavigate();

    const handleSelecionar = async (event) => {
        navigate(`/home/ocorrencia/addFormulario`);
    }

    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
        console.log(dataUri);
    }

    useEffect(() => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            console.log("Let's get this party started")
        }
        navigator.mediaDevices.getUserMedia({ video: true })

        async function cameras() {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            console.log(videoDevices)
        }
        cameras();

    }, [])
    const handleCameraError = (e) => {
        console.log(e)
    }




    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);

    const handleDevices = useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );
    const handleSelectCan = ()=>{
        
    }
    return (
        <div>Foto
            <Camera
                idealResolution={{ width: 640, height: 480 }}
                isMaxResolution={false}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                onCameraError={(error) => { handleCameraError(error); }}
                imageType={IMAGE_TYPES.JPG}
                imageCompression={0.97}
                isImageMirror={true}
                isDisplayStartCameraError={true}
                isFullscreen={false}
                sizeFactor={1}

                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
            />
            <div class="input-group">
                <select class="custom-select" id="inputGroupSelect04">
                    <option selected>Selecione a camera...</option>
                    {devices.map((device, key) => (
                    <option value={key}>{device.label}</option>
            ))}
                </select>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onClick={handleSelectCan}>Selecionar</button>
                </div>
            </div>
            
            <Button className="botao" onClick={handleSelecionar}>Selecionar</Button>
        </div>
    );
}

export default AdicionarFoto;