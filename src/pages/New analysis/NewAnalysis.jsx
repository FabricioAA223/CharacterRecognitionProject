import { Box, Button, Chip, Container, TextField, Typography } from '@mui/material'
import FileUpload from './components/FileUpload';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewAnalysis() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [objects, setObjects] = useState([]);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const handleFileUpload = (file) => {
        setUploadedFile(file);
        // Aquí puedes enviar el archivo a tu API
        console.log('Archivo subido:', file);
    };

    const handleNewAnalysis = () => {
        // Implementa la lógica para enviar el archivo a tu API aquí
        setError(null)
        setData(null)
        const formData = new FormData();
        formData.append('file', uploadedFile);

        fetch('https://thin-rockets-obey.loca.lt/upload-video', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                console.log('Success:', data);
            })
            .catch((error) => {
                setError(error.toString())
                console.error('Error:', error);
            });
    }

    const handleNewObject = (event) => {
        const objectsString = event.target.value
        objectsString ? setObjects(objectsString.split(',')) : setObjects([])
    }

    return (
        <Box mt={'80px'} alignContent={'center'} mx={'auto'}>
            <Typography textAlign={'center'} variant='h1' fontSize={28}><b>Nuevo analisis</b></Typography>
            <Box mt={'30px'} bgcolor={'lightgray'} maxWidth={'400px'} alignContent={'center'} mx={'auto'} p={'10px'} borderRadius={'10px'} border={'1px solid blue'}>

                <Typography variant="h5" align="center" gutterBottom>
                    Por favor, arrastre o seleccione la pelicula o video a analizar
                </Typography>
                <FileUpload onFileUpload={handleFileUpload} />
                {uploadedFile && (
                    <Typography variant="h6" align="center" sx={{ marginTop: '20px' }}>
                        Archivo subido: {uploadedFile.name}
                    </Typography>
                )}
            </Box>

            {/* <Box my={'30px'} mx={'auto'} alignContent={'center'} maxWidth={'500px'}>
                <TextField fullWidth label='Objetos' helperText='Ingrese los objetos que desea buscar en el video, separados por una coma' onChange={handleNewObject} />
                {objects.length > 0 && (
                    objects.map(object => (<Chip key={object} label={object} sx={{ mx: '5px', mt: '10px' }} />))
                )}
            </Box> */}
            <Box textAlign={'center'} mt={'30px'}>
                <Button variant='outlined' size='large' onClick={handleNewAnalysis}>Analizar</Button>
            </Box>
            {error ? (
                <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6" color="red">
                        Error: {error}
                    </Typography>
                </Container>
            ) : (
                data && 
                <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6" >
                        Su solicitud esta siendo procesada, el id de su analisis es: <b><em>{data.video_id}</em></b>
                    </Typography>
                    <Typography variant="h6" >
                        Dentro de 2 minutos aproximadamente podra ir observando los resultados de su analisis en 
                        nuestra seccion "Analisis terminados" e ingresando el id de su analisis respectivo o por medio del siguiente link:
                    </Typography>
                    <Button sx={{my:'20px'}} variant='outlined' onClick={()=>{navigate(`/finished_analysis/${data.video_id}`)}}>Resultados del analisis</Button>
                </Container>
            )}
        </Box>

    );
} 5