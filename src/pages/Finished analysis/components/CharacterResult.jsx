import { Box, Typography } from "@mui/material";

export default function CharacterResult({data}){
    const results = data.results;
    const characters = []
    const appears = []

    function getAppearancesPerCharacter(){
        results.map(res =>{
            res.names.map(character => {
                if (!characters.includes(character)) {
                    characters.push(character);
                    appears.push({"name":character, "appers":1});
                }
                else{
                    appears.map(charWithAppers => {
                        if (charWithAppers.name == character){
                            charWithAppers.appers += 1;
                        }
                    })
                }
            })
            
        })
    }

    getAppearancesPerCharacter();
    
    return (
        <Box >
            <Typography mt={'20px'} ml={'20px'}>Personajes encontrados:</Typography>
            <Box width={'90%'} border={'1px solid black'} bgcolor={'gray'} mx={'auto'} borderRadius={'10px'} minHeight={'100px'}>
                    {appears.map(charWithAppers => (
                            <Box key={charWithAppers.name}  borderRadius={'10px'} bgcolor={'white'} border={'1px solid black'} width={'80%'} alignContent={'center'} mx={'auto'} my={'20px'} p={'15px'} justifyContent={'center'} display={'flex'}>
                                {/* <Box width={'30%'} height={'100px'} bgcolor={'red'}>
                                    Image
                                </Box> */}
                                <Box width={'70%'} textAlign={'center'} justifyContent={'center'} m={'auto'}>
                                    <Typography>{charWithAppers.name}</Typography>
                                    <Typography>Aparece en {((charWithAppers.appers/results.length)*100).toFixed(0)}% de los frames</Typography>
                                </Box>
                            </Box>
                    ))}
            </Box>
        </Box>
    );
}