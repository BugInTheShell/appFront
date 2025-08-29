import { useGetFilesQuery } from '../dashboardApiSlice';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const GetFiles = () => {

    const [files, setFiles] = useState([]);

    const view = useSelector((state) => state?.userView?.value);

    const { data, error, isLoading } = useGetFilesQuery(null, {
        skip: view !== "Archivos"
    });
    console.log("Respuesta obtendia ",data,error)
    useEffect(() => {
        if (!isLoading && data) {
            setFiles(data.archivos);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
                <span className="text-xl font-medium">Cargando archivos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 text-red-500 min-h-screen">
                <span className="text-xl font-medium">
                    Error al cargar los archivos: {JSON.stringify(error.message || error)}
                </span>
            </div>
        );
    }
    
    // Si no hay archivos, muestra un mensaje
    if (!files || files.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
                <span className="text-xl font-medium">No se encontraron archivos.</span>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Tus Archivos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {files.map((file, index) => {
                    // La URL base para la descarga del archivo de S3
                    const downloadBaseUrl = "https://almacenamiento-examen.s3.us-east-1.amazonaws.com/";
                    // La propiedad `Key` contiene la ruta completa del archivo
                    const fileName = file.Key;
                    // La propiedad `Size` contiene el tamaño del archivo en bytes
                    const fileSize = file.Size;
                    // La propiedad `LastModified` contiene la fecha de modificación
                    const lastModified = new Date(file.LastModified).toLocaleDateString();

                    // Construye la URL completa
                    const downloadUrl = `${downloadBaseUrl}${fileName}`;

                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center space-y-4"
                        >
                            {/* Icono de archivo en formato SVG */}
                            <svg className="w-16 h-16 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 4h7v5h5v11H6V4z" />
                            </svg>
                            {/* Nombre del archivo */}
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 break-all">{fileName}</h2>
                            
                            {/* Información adicional del archivo */}
                            <div className="text-sm text-gray-600 dark:text-gray-400 w-full text-left mt-2 space-y-1">
                                <p><strong>Tamaño:</strong> {Math.round(fileSize / 1024)} KB</p>
                                <p><strong>Modificado:</strong> {lastModified}</p>
                            </div>
                            
                            {/* Botón de descarga */}
                            <a
                                href={downloadUrl}
                                target="_blank" // Abre el enlace en una nueva pestaña
                                rel="noopener noreferrer" // Medida de seguridad recomendada
                                download // Sugiere que el navegador descargue el archivo
                                className="w-full mt-auto py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg transition-transform duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Descargar
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GetFiles;