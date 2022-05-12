import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getAuthData, getTokenData, requestBackEndLogin, saveAuthData } from "../../util/requests";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

const LoginCard = () => {
  const [hasError, setHasError] = useState(false);

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackEndLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        const token = getAuthData().access_token;
        console.log(token);
        setHasError(false);
        setAuthContextData({authenticated: true, tokenData: getTokenData()});
        console.log("SUCESSO", response);
        navigate("/movies", {replace: true});
      })
      .catch((error) => {
        setHasError(true);
        console.log("ERRO", error);
      });
  };

  return (
    <section>
      <div className="login-card-container">
        <h2>LOGIN</h2>
        {hasError && (
          <div className="error-alert">Erro ao tentar efetuar o login</div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form-container"
        >
          <input
            {...register("username", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              } 
            })}
            type="text"
            placeholder="Email"
            name="username"
            className={`${errors.username ? 'error-input-field second-edge' : 'input-field'}`}
          />
          <div className="required-field">{errors.username?.message}</div>
          <input
            {...register("password", {
              required: "Campo obrigatório",
            })}
            type="password"
            placeholder="Senha"
            name="password"
            className={`${errors.password ? 'error-input-field second-edge' : 'input-field'}`}
          />
          <div className="required-field">{errors.password?.message}</div>
          <button type="submit">FAZER LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default LoginCard;
