import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecuperarDado } from "../../../components/Storage";

async function salvarLocalStorage(img) {
    try {
        await AsyncStorage.setItem('@SOAPP_IMAGENS', JSON.stringify({
            img
        }))
    } catch (e) {
        // saving error
    }
}

function AdicionarFoto() {
    let navigate = useNavigate();

    const handleProximo = async (event) => {
        salvarLocalStorage(img);
        navigate(-1);
    }

    const [img, setImg] = useState([]);
    function handleTakePhoto(dataUri) {
        setImg([...img, dataUri]);
        salvarLocalStorage(img);
    }

    useEffect(()=>{
        async function getDataImagem(){
            const data = await RecuperarDado('@SOAPP_IMAGENS');
            const imagem = await JSON.parse(data);
            setImg(imagem.anexo)
        }
        getDataImagem();
    },[])

    useEffect(() => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            console.log("Let's get this party started")
        }
        navigator.mediaDevices.getUserMedia({ video: true })

        // async function cameras() {
            // const devices = await navigator.mediaDevices.enumerateDevices();
            // const videoDevices = devices.filter(device => device.kind === 'videoinput');
            // console.log(videoDevices)
        // }
        // cameras();

    }, [])
    const handleCameraError = (e) => {
        console.log(e)
    }

    // const [devices, setDevices] = useState([]);
    const [frente, setFrente] = useState(true);

    // const handleDevices = useCallback(
    //     mediaDevices => {
    //         console.log(mediaDevices)
    //         setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"))
    //     },
    //     [setDevices]
    // );

    // useEffect(
    //     () => {
    //         navigator.mediaDevices.enumerateDevices().then(handleDevices);
    //     },
    //     [handleDevices]
    // );
    const handleGirar = () => {
        setFrente(!frente);
    }
    const handleRemoveImg = (imagem) => {
        setImg(img.filter(item => item !== imagem));
        salvarLocalStorage(img);
    }
    return (
        <div>
            <Button className="botao m-1" onClick={handleGirar}>Alterar Camera</Button>
            <Button className="botao" onClick={handleProximo}>Proximo</Button>
            {frente ?
                <Camera
                    idealResolution={{ width: 640, height: 480 }}
                    isMaxResolution={false}
                    idealFacingMode={FACING_MODES.USER}
                    onCameraError={(error) => { handleCameraError(error); }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.92}
                    isImageMirror={false}
                    isDisplayStartCameraError={false}
                    isFullscreen={false}
                    sizeFactor={1}

                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                />
                :
                <Camera
                    idealResolution={{ width: 640, height: 480 }}
                    isMaxResolution={false}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    onCameraError={(error) => { handleCameraError(error); }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.92}
                    isImageMirror={true}
                    isDisplayStartCameraError={false}
                    isFullscreen={false}
                    sizeFactor={1}

                    onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                />
            }
            <div className="d-flex flex-row overflow-auto">
                {img ? img.map((imagem, index) =>
                    <div className="d-flex flex-column m-2 w-25">
                        <img key={index} className="" src={imagem} alt="Imagem miniatura"/>
                        <Button className="w-auto" onClick={() => handleRemoveImg(imagem)} >Remover</Button>
                    </div>
                ) : ""}

            </div>
        </div>
    );
}

export default AdicionarFoto;
