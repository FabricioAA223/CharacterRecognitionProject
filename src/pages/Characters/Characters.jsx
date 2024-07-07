import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Characters() {
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [characters, setCharacters] = useState(null);

    useEffect(() => {
        fetch('https://real-mugs-cry.loca.lt/registered_users')
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setCharacters(data.registered_users);
            })
            .catch((error) => {
                console.error('Error:', error);
                setCharacters(null);
            });
    }, []); // Se ejecuta solo una vez al montar el componente

    const handleLink = (event) => {
        setLink(event.target.value);
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleTrainModel = () => {
        // Define the data to be sent in the body of the request
        const data = {
            "image_urls": {
                [name]: [link]
            }
        };

        console.log("Data: ", data)

        // Define the options for the fetch request
        const requestOptions = {
            method: 'POST', // or 'PUT' depending on your API requirements
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // Perform the fetch request
        fetch('https://real-mugs-cry.loca.lt/train', requestOptions)
            .then(response => response.json())
            .then(result => {
                setSuccess(true)
                console.log('Success:', result);
            })
            .catch(error => {
                setError(error.toString())
                console.error('Error:', error);
            });
    }

    return (
        <Box mt={'80px'} mx={'auto'}>
            {/* <Typography variant="h1" fontSize={28} textAlign={'center'}><b>Personajes entrenados en el modelo</b></Typography> */}

            {/* Mapear lo siguiente con todos los personajes */}
            {characters?.map((character, index) => (
                <Box
                    key={index}
                    my={'20px'}
                    border={'1px solid black'}
                    bgcolor={'lightgray'}
                    minHeight={'100px'}
                    borderRadius={'15px'}
                    width={'300px'}
                    mx={'auto'}
                    display={'flex'}
                    justifyContent={'center'}
                    p={'10px'}
                >
                    <Typography textAlign={'center'} m={'auto'}>{character}</Typography>
                </Box>
            ))}

            {/*  */}

            <Box textAlign={'center'} width={'500px'}>
                <Typography variant="h2" fontSize={25} mb={'20px'}>Agregar nuevo personaje</Typography>
                <Typography mb={'20px'}>Para entrenar el modelo con un nuevo personaje, por favor almacene las imagenes en una carpeta de google drive y pegue el link publico de acceso en el siguiente espacio</Typography>
                <TextField onChange={handleName} label='Nombre de la persona' fullWidth required />
                <TextField sx={{ my: '20px' }} onChange={handleLink} label='Link de la carpeta' fullWidth required />
            </Box>
            <Box textAlign={'center'} my={'20px'}>
                <Button variant="contained" onClick={handleTrainModel}>Entrenar modelo</Button>
            </Box>
            {error? (
                <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6" color="error">
                        Error: {error}
                    </Typography>
                </Container>
            ):(
                success &&
                <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6" color="green">
                        El modelo se está entrenando con el personaje suministrado, dentro de un par de minutos estará disponible para su analisis en videos
                    </Typography>
                </Container>
            )}
        </Box>
    );
}