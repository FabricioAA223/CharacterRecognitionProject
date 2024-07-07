import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CharacterResult from './components/CharacterResult';
import ObjectsResult from './components/ObjectsResult';
import AppearancesPerFrame from './components/AppearancesPerFrame';
export default function FinishedAnalysis() {
    

    const { id } = useParams();
    const [uid, setUid] = useState(id);
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
        fetch(`https://thin-rockets-obey.loca.lt/results/${uid}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.toString());
                setLoading(false);
            });
    };


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