import { useForm } from "react-hook-form";
import './styles.css'

type FormData = {
  email: string;
  password: string;
};

const LoginCard = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <section>
      <div className="login-card-container">
        <h2>LOGIN</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form-container"
        >
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Senha"
            name="password"
          />
          <button type="submit">FAZER LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default LoginCard;
