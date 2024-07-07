import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      // Solo toma el primer archivo
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // No permitir múltiples archivos
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #1976d2',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '10px',
        '&:hover': {
          borderColor: '#1565c0',
        },
        backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 50, color: '#1976d2' }} />
      <Typography variant="h6" color="textSecondary">
        {isDragActive ? 'Suelta el archivo aquí...' : 'Arrastra un archivo aquí o haz clic para seleccionarlo'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '10px' }}
      >
        Seleccionar archivo
      </Button>
    </Box>
  );
};

export default FileUpload;
