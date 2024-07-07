import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CharacterResult from './components/CharacterResult';
import ObjectsResult from './components/ObjectsResult';
import AppearancesPerFrame from './components/AppearancesPerFrame';
export default function FinishedAnalysis() {
    const [uid, setUid] = useState('');

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUid = (event) => {
        setUid(event.target.value)
    }

    const handleShowResults = async () => {
        console.log("Id:", uid);
        setLoading(true);  // Iniciar la carga
        setError(null)

        const videoId = "0834fdbf-7209-4a47-90f0-bb3d647bad39"; // reemplaza con tu variable dinámica
        const url = `https://apparently-factual-cicada.ngrok-free.app/results/${videoId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setError(error.toString());
                setLoading(false);
            });
    };

    const changeLoading = () => {
        setLoading(!loading);
        setData({
            "video_id": "id_del_video",
            "results": [
                {
                    "timestamp": "0:00:05",
                    "names": [],
                    "objects": ["Cuchillo"]
                },
                {
                    "timestamp": "0:00:10",
                    "names": ["Will Smith"],
                    "objects": ["Pijama"]
                },
                {
                    "timestamp": "0:00:15",
                    "names": ["Will Smith"],
                    "objects": ["Mesa", "Pijama"]
                },
                {
                    "timestamp": "0:00:20",
                    "names": ["Will Smith"],
                    "objects": []
                },
                {
                    "timestamp": "0:00:25",
                    "names": ["Margot Robbie"],
                    "objects": ["Cuchillo"]
                },
                {
                    "timestamp": "0:00:30",
                    "names": ["Margot Robbie"],
                    "objects": ["Cuchillo"]
                },
            ]
        });
    }

    return (
        <Box mt={'80px'} alignContent={'center'} mx={'auto'}>
            <Typography textAlign={'center'} variant='h1' fontSize={28}><b>Analisis terminado</b></Typography>
            <Box alignContent={'center'} mx={'auto'} width={'400px'} mt={'50px'}>
                <TextField onChange={handleUid} defaultValue={uid} fullWidth label='Ingrese el uid del analisis' required helperText='ID único que recibio por email cuando terminó el analisis' />
            </Box>
            <Box textAlign={'center'} mt={'30px'}>
                <Button variant='outlined' size='large' onClick={handleShowResults}>
                    Mostrar resultados
                </Button>
            </Box>
            {loading ? (
                <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Container>
            ) : (
                data ? (
                    data.detail ? (
                        <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="h6" color="error">
                                Error: {data.detail}
                            </Typography>
                        </Container>
                    ) : (
                        <Box mt={'30px'} border={'1px solid black'} bgcolor={'lightgray'} width={'500px'} mx={'auto'} borderRadius={'10px'}>
                            <Typography textAlign={'center'}>Resultados:</Typography>

                            <CharacterResult data={data} />
                            <ObjectsResult data={data} />
                            <AppearancesPerFrame data={data} />
                        </Box>
                    )

                ) : (
                    error && (
                        <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="h6" color="error">
                                Error: {error}
                            </Typography>
                        </Container>
                    )
                )
            )}
        </Box>
    );
}