import { useForm } from "react-hook-form";
import { useState } from "react";

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [metodo, setMetodo] = useState("email");

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Recuperar contraseña
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Selección de método */}
          <div className="flex justify-around mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="email"
                checked={metodo === "email"}
                onChange={() => setMetodo("email")}
              />
              Correo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="telefono"
                checked={metodo === "telefono"}
                onChange={() => setMetodo("telefono")}
              />
              Teléfono
            </label>
          </div>

          {/* Campo dinámico */}
          {metodo === "email" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                placeholder="12345678"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{8,15}$/,
                    message: "Debe contener solo números (8-15 dígitos)",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm">
                  {errors.telefono.message}
                </p>
              )}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
