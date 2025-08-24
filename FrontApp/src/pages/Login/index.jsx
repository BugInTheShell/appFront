import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              {...register("email", { required: "El correo es obligatorio" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Botones adicionales */}
        <div className="flex justify-between mt-4">
          <button className="text-blue-600 hover:underline">Registrarse</button>
          <button className="text-blue-600 hover:underline">Olvidé contraseña</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
