import { Box, Typography } from "@mui/material";

export default function ObjectsResult({data}){
    const results = data.results;
    const objects = []
    const appears = []

    function getAppearancesPerObjects(){
        results.map(res =>{
            res.objects.map(object => {
                if (!objects.includes(object)) {
                    objects.push(object);
                    appears.push({"name":object, "appers":1});
                }
                else{
                    appears.map(objWithAppers => {
                        if (objWithAppers.name == object){
                            objWithAppers.appers += 1;
                        }
                    })
                }
            })
            
        })
    }

    getAppearancesPerObjects();

    return (
        <Box>
            <Typography mt={'20px'} ml={'20px'}>Objetos encontrados:</Typography>
            <Box width={'90%'} border={'1px solid black'} bgcolor={'gray'} mx={'auto'} borderRadius={'10px'} minHeight={'100px'}>
                {appears.map(objWithAppers => (
                    <Box key={objWithAppers.name}  borderRadius={'10px'} bgcolor={'white'} border={'1px solid black'} width={'80%'} alignContent={'center'} mx={'auto'} my={'20px'} p={'15px'} justifyContent={'center'} display={'flex'}>
                        <Box textAlign={'center'} justifyContent={'center'} m={'auto'}>
                            <Typography>{objWithAppers.name}</Typography>
                            <Typography>Aparece en {((objWithAppers.appers/results.length)*100).toFixed(0)}% de los frames</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}