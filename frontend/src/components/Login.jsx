// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
// import LoginErrorPopUp from "./LoginErrorPopUp";
// import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
// import interceptor from "../hooks/useInstanceWithInterceptor";
import axiosInstance from "../services/axiosInstance";

export default function Login() {
  // const { setIsBackgroundBlurred } = useBlurredBackgroundContext();
  const { setUser } = useCurrentUserContext();
  // const expressAPI = interceptor();
  const navigate = useNavigate();

  // const [loginErrorPopUpOpen, setloginErrorPopUpOpen] = useState(false);

  // const handleLoginError = () => {
  // setloginErrorPopUpOpen(true);
  // setIsBackgroundBlurred(true);
  // };

  // const handleCloseModal = () => {
  // setloginErrorPopUpOpen(false);
  // setIsBackgroundBlurred(false);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    email: {
      required: "An email must be registered.",
      pattern: {
        value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
        message:
          'Registered email has the wrong format. It must resemble "johndoe@example.com."',
      },
    },
    password: {
      required: "A password must be registered",
      minLength: {
        value: 8,
        message: "A valid password must have at least 8 characters",
      },
      maxLength: {
        value: 30,
        message: "A valid password must have less than 30 characters",
      },
    },
  };

  const emailRegister = register("email", registerOptions.email);
  const passwordRegister = register("password", registerOptions.password);

  const handleLoginRegistration = (loginFormData) => {
    axiosInstance
      .post(`/api/auth/login`, loginFormData)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        // handleLoginError();
      });
  };

  return (
    <div className="Login">
      <p>Vous êtes déjà inscrit ? Connectez-vous ici.</p>
      <form onSubmit={handleSubmit(handleLoginRegistration)}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            placeholder="Adresse email..."
            onChange={emailRegister.onChange}
            name={emailRegister.name}
            ref={emailRegister.ref}
            aria-invalid={errors.email ? "true" : "false"}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            placeholder="Mot de passe..."
            onChange={passwordRegister.onChange}
            name={passwordRegister.name}
            ref={passwordRegister.ref}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </div>
        <input type="submit" value="Log In" />
      </form>
      <div role="alert">
        {errors.email && <p> {errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* {loginErrorPopUpOpen ? (
        <LoginErrorPopUp
          isOpen={loginErrorPopUpOpen}
          onClose={handleCloseModal}
        />
      ) : null} */}
    </div>
  );
}
