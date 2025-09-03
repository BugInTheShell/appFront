import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setRegister ,setForgotPass } from "./LoginSlice";
import { useLoginMutation } from "./LoginApiSlice";
import { useNavigate } from "react-router";
import image from "../../assets/layered-waves-haikei.svg"
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [Login] = useLoginMutation()

  const onSubmit =async (user) => {
    try {
      const { data , error } = await Login(user);

      if(data.status == 200){
        localStorage.setItem("data",data.isLogged)
        navigate("/inicio")
      }

    } catch ( error) {
      console.log("Error al enviar datos ",error)
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen" style={{ backgroundImage: `url("${image}")`, backgroundSize:'cover' }}>

        <div className=" p-8 rounded-2xl w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de correo */}
            <div>
              <label className="block text-sm font-medium text-gray-200">Correo</label>
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
              <label className="block text-sm font-medium text-gray-200">Contraseña</label>
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
          <div className="flex w-full">
            <button className="text-white  mx-auto my-2 hover:underline" onClick={() => dispatch(setRegister())}>Registrarse</button>
            {/* <button className="text-blue-600 hover:underline" onClick={() => dispatch(setForgotPass())}> Olvidé contraseña</button> */}
          </div>
        </div>
    </div>
  );
};

export default Login;
