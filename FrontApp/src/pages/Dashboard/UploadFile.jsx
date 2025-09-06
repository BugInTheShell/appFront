import { useState , useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useGetFilesQuery } from './dashboardApiSlice';

const UploadFile = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [upload, setUpload] = useState(false);

  const { data, error, isLoading, refetch } = useGetFilesQuery();

  useEffect(() => {
    if (!isLoading && data?.archivos) {
      setUpload(data.archivos.length <= 3);
    }
  }, [data, isLoading]);


  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setSelectedFile(null);
     
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = async () => {

    if (!selectedFile) return;  

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Reemplaza 'TU_ENDPOINT_DEL_BACKEND' con la URL de tu API
      const {data , error} = await axios.post(import.meta.env.VITE_API_IMAGES, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'api-key':localStorage.getItem("data")
        },
      });

      if(data.status == 200){
              Swal.fire({
                title: "Archivo creado correctamente",
                icon: "success",
                draggable: true
              });
          refetch()
          setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }              

      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };


  return (
    <div className='flex justify-end p-1 px-4'>
      <input type="file" className="file-input file-input-info mx-2" onChange={handleFileChange} ref={fileInputRef}/>
      <button onClick={handleUpload} className='mx-2 btn' disabled={!upload}>
        Subir Archivo
      </button>
    </div>
  );
};

export default UploadFile;