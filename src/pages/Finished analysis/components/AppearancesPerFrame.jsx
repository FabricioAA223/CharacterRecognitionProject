import { Box, Typography } from "@mui/material";

export default function AppearancesPerFrame({data}){
    const results = data.results;
    return (
        <Box>
            <Typography mt={'20px'} ml={'20px'}>Apariciones en cada frame:</Typography>
            <Box mb={'20px'} width={'90%'} border={'1px solid black'} bgcolor={'gray'} mx={'auto'} borderRadius={'10px'} minHeight={'100px'}>
            {results?.map(frame => (
                <Box key={frame.timestamp}  borderRadius={'10px'} bgcolor={'white'} border={'1px solid black'} width={'80%'} alignContent={'center'} mx={'auto'} my={'20px'} p={'15px'} justifyContent={'center'} display={'flex'}>
                    <Box textAlign={'center'} justifyContent={'center'} m={'auto'} border={'1px solid black'}>
                        <Typography>{frame.timestamp}</Typography>
                        <Box display={'flex'}>
                            <Box p={'10px'} borderRight={'1px solid black'} borderTop={'1px solid black'}>
                                <Box borderBottom={'1px solid black'} mb={'10px'}>
                                    <Typography><b>Personajes</b></Typography>
                                </Box>
                                {frame.names?.map((character, index) => (
                                    <Typography key={index}>{character}</Typography>
                                ))}
                            </Box>
                            <Box p={'10px'} borderTop={'1px solid black'}> 
                            <Box borderBottom={'1px solid black'} mb={'10px'}>
                                    <Typography><b>Objetos</b></Typography>
                                </Box>
                                {frame.objects?.map((object, index) => (
                                    <Typography key={index}>{object}</Typography>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ))}
            </Box>
        </Box>
    );
}