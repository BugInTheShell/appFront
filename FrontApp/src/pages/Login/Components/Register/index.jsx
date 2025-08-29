import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../../LoginSlice";
import { usePostCreateUserMutation } from "../../LoginApiSlice";
import Swal from 'sweetalert2';
import { useEffect } from "react";

const Registro = () => {

  const [postCreateUser] = usePostCreateUserMutation();

  useEffect(() => {
    localStorage.clear()
  },[])
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (user) => {

    const { data , error } = await postCreateUser(user);

    if(data.status == 200){
      Swal.fire({
        title: "Usuario registrado correctamente",
        icon: "success",
        draggable: true
      });
      dispatch(setLogin())
      reset()

    }
    console.log("Respuesta crear usuario ",data, error)
  };

  // Observar contraseña para validación de confirmación
  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-200">
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
            <label className="block text-sm font-medium text-gray-200">
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
            <label className="block text-sm font-medium text-gray-200">
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
            <label className="block text-sm font-medium text-gray-200">
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
            <label className="block text-sm font-medium text-gray-200">
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="12345678"
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

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form> 
        <div className="flex w-full">
          <button className="text-blue-600 my-2 mx-auto hover:underline" onClick={() => dispatch(setLogin())}>Inicio de sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
