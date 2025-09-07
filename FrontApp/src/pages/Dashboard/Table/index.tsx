//ARCHIVO DE TABLA DE ARCHIVOS CON TS
//MUCHO DE ESTE CODIGO VIENE POR DEFAULT DE LA DOCUMENTACIoN

import {  useMemo, useState, useEffect } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type User, fakeData, usStates } from './makeData.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import {usePostCreateUserLogedMutation} from "../../Dashboard/dashboardApiSlice.js";
import {useGetUsersQuery, useDeleteUserMutation, usePutUserMutation} from "../dashboardApiSlice.js";

import image from "../../../assets/fondo_usuarios.svg";

const Example = () => {
  const [postCreateUserLoged] = usePostCreateUserLogedMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [putUser] = usePutUserMutation();
  const [allUsers , setAllUsers] =useState([])

  const {data : users , error: error_users , isLoading} = useGetUsersQuery();

  useEffect(() => {
    if(!isLoading && users ){
      setAllUsers(users)
    }

  },[users ,isLoading])


    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm();
    const password = watch("password");

  const onSubmit = async (user) => {
    try {
      
      const { data , error } = await postCreateUserLoged(user);
  
      if(data.status == 200){
        Swal.fire({
          title: "Usuario registrado correctamente",
          icon: "success",
          draggable: true
        });
  
        reset()
  
      }

    } catch (error) {

     console.log("Error ",error) 
    } 
  };
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Numero',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Correo',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      }
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =  useUpdateUser();


  //DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<User>) => {
    try {
      Swal.fire({
        title: "¿Deseas eliminar este usuario?",
        showDenyButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const { data , error } = await deleteUser(row.original.id)
          Swal.fire("Usuario eliminado", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Sin cambios", "", "info");
        }
      });

    } catch (error) {
      console.log("Error al eliminar usuario ",error)
    }

  };

  const handleEditUser =async (user) => {
    console.log("Usuaraio obtenido ",user)
    const { data , error } = await putUser(user.id,user);
    console.log("Respuesta actualizar usuario ",data,error)
  }

  const table = useMaterialReactTable({
    columns,
    data: allUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
      muiTableContainerProps: {
    sx: {
      minHeight: '500px',
      maxHeight: '800px',
      backgroundColor: '#CED2F5',
      color: '#5B69EB',
    },
      },
      muiTableHeadCellProps: {
        sx: {
          backgroundColor: '#5B69EB',
          color: 'white',
          fontWeight: 'bold',
        },
      },
      muiTableBodyProps: {
        sx: {
          '& tr:nth-of-type(odd)': {
            backgroundColor: '#5B69EB',
          },
          '& tr:nth-of-type(even)': {
            backgroundColor: '#CED2F5',
          },
        },
      },
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    renderCreateRowDialogContent: ({ table, row }) => (
      <>
        
        <h1>Añadir Usuario</h1>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre.message}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo inválido",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="************"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 12,
                  message: "Debe tener al menos 12 caracteres",
                },
                validate: {
                  hasUpper: (v) =>
                    /[A-Z]/.test(v) || "Debe incluir al menos una mayúscula",
                  hasLower: (v) =>
                    /[a-z]/.test(v) || "Debe incluir al menos una minúscula",
                  hasNumber: (v) =>
                    /\d/.test(v) || "Debe incluir al menos un número",
                  hasSpecial: (v) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                    "Debe incluir un carácter especial",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmación de contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="************"
              {...register("confirmPassword", {
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="5512343454"
              {...register("phoneNumber", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]{8,15}$/,
                  message: "Debe contener solo números (8-15 dígitos)",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm">{errors.telefono.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Crear usuario
          </button>

        </form> 
        </DialogContent>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <h1 className='text-3xl p-2 font-medium text-gray-700/75'>Editar datos de  <strong>{row.original.name}</strong></h1>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
        <form onSubmit={handleSubmit(handleEditUser)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              defaultValue={row.original.name}
              placeholder={row.original.name}
              {...register("name")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre.message}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              placeholder={row.original.email}
              defaultValue={row.original.email}
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo inválido",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              defaultValue={row.original.phoneNumber}
              placeholder={row.original.phoneNumber}
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9]{8,15}$/,
                  message: "Debe contener solo números (8-15 dígitos)",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm">{errors.telefono.message}</p>
            )}
          </div>

          <input className='hidden' { ... register("id") } defaultValue={parseInt(row.original.id)}/>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Modificar datos
          </button>

        </form>         
        
        </DialogContent>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Añadir usuario
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser ,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as User[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.map((prevUser: User) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

export default function TableData() {
  return (
    <div className='min-h-screen align-middle items-center px-10 py-20 overflow-y-hidden' style={{ backgroundImage: `url("${image}")`, backgroundSize:'cover' }}>
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    </div>
  );
}

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user: User) {
  return {
    firstName: !validateRequired(user.firstName)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}
