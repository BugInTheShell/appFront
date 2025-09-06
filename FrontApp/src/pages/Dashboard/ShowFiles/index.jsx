import { useGetFilesQuery, useDeleteFileMutation, usePutFileMutation } from '../dashboardApiSlice';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import UploadFile from '../UploadFile';
import { FaDownload } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
const GetFiles = () => {

    const [files, setFiles] = useState([]);

    const [deleteFile] = useDeleteFileMutation()
    const [putFile] = usePutFileMutation()

    const view = useSelector((state) => state?.userView?.value);

    const { data, error, isLoading } = useGetFilesQuery(null, {
        skip: view !== "Archivos"
    });

    const handleDelete =async (key) => {

        const { data ,error} = await deleteFile(key);
    }

const handleEdit = async (key) => {
    Swal.fire({
        title: "¿Deseas renombrar el archivo? " + key.split("/")[1],
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Cambiar nombre",
        showLoaderOnConfirm: true,
        cancelButtonText: "Volver",
        preConfirm: async (newName) => {
            try {
                const folder = key.split("/")[0]; // carpeta original
                const newKey = `${folder}/${newName}`;

                const response = await putFile({
                    oldKey: key,
                    newKey: newKey
                });

                if (response.error) {
                    throw new Error(response.error.message);
                }

                return newKey; // devolvemos el nuevo nombre al then()
            } catch (error) {
                Swal.showValidationMessage(`
                    Request failed: ${error}
                `);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Archivo renombrado",
                text: "El archivo fue renombrado a " + result.value,
                icon: "success"
            });
        }
    });
};

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
            <div className="flex justify-between">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Tus Archivos</h1>
                <UploadFile/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {files.map((file, index) => {

                    // La propiedad `Key` contiene la ruta completa del archivo
                    const fileName = file.Key;

                    // La propiedad `Size` contiene el tamaño del archivo en bytes
                    const fileSize = file.Size;

                    // La propiedad `LastModified` contiene la fecha de modificación
                    const lastModified = new Date(file.LastModified).toLocaleDateString();

                    // Construye la URL completa
                    const downloadUrl = `${import.meta.env.VITE_AWS_URL}${fileName}`;

                    return (
                        <div
                        key={fileName}

                        className={fileName.split("/")[1] ? "bg-gray-900 rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center space-y-4" : "hidden"}
                        >
                        <div className="h-32">
                            {/* Icono de archivo en formato SVG */}
                            <svg
                                className="w-16 h-16 text-blue-500 dark:text-blue-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 4h7v5h5v11H6V4z" />
                            </svg>

                            {/* Nombre del archivo */}
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 break-all">
                                {fileName.split("/")[1]}
                            </h2>
                        </div>

                        {/* Información adicional del archivo */}
                        <div className="text-sm text-gray-600 dark:text-gray-400 w-full text-left mt-2 space-y-1">
                            <p>
                            <strong>Tamaño:</strong> {Math.round(fileSize / 1024)} KB
                            </p>
                            <p>
                            <strong>Modificado:</strong> {lastModified}
                            </p>
                        </div>

                        <div className="flex justify-between space-x-2">
                            {/* Botón de descarga */}
                            <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="w-auto mt-auto py-2 px-6 bg-gradient-to-r from-blue-400 to-blue-800 text-white font-bold rounded-full shadow-lg transition-transform duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaDownload />
                                
                            </a>

                            {/* Botón de eliminar */}
                            <button
                                onClick={() => handleDelete(fileName)}
                                className="w-auto py-2 px-6 bg-gradient-to-r from-red-400 to-red-800 text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <FaTrash />
                        
                            </button>

                            {/* Botón de editar */}
                            <button
                                onClick={() => handleEdit(fileName)}
                                className="w-auto py-2 px-6 bg-gradient-to-r from-green-400 to-green-800 text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <FaEdit  />
                                
                            </button>
                        </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GetFiles;