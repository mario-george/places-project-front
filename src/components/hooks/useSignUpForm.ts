"use client";
import { FormEvent, useState } from "react";
import useHttp from "./useHttp";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/components/GlobalRedux/userSlice";
import useToastHandler from "./useToastHandler";
interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function useSignUpForm() {
  const { isLoading, error, sendRequestFormData } = useHttp();
  const {toastCallBack} =useToastHandler()
  const dispatch = useDispatch();
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const validateForm = () => {
    let errors: Errors = {};
    if (!formState.name) {
      errors.name = "Name is required.";
    }
    if (!formState.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formState.password) {
      errors.password = "Password is required.";
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setErrors(errors);
  };

  // if you used event.target.name it is treated as a string “event.target.name”, not the value it holds (like ‘name’, ‘email’, or ‘password’). So, instead of updating the corresponding field in the formState, it would attempt to update a field literally named “event.target.name”, which is not what you want.
  // The square brackets [event.target.name] tell JavaScript to interpret the expression inside as a variable, allowing you to use dynamic keys in your object.

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(errors);
    console.log(formState);
    validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form validation is successful!");

      // Create a new FormData object
      const formData = new FormData();

      // Append the file to the FormData object
      const fileInput = document.getElementById(
        "image-upload"
      ) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }

      // Append the form state to the FormData object
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("password", formState.password);

      // Send the FormData object in the body of the signup request
      try {
        const data = await sendRequestFormData(
          "users/signup",
          "POST",
          formData,toastCallBack
        );
        const { token, userId } = data;

        console.log("signup data", data);
        dispatch(login({ token, userID: userId }));
        router.push("/");
      } catch (err: any) {
        console.log("error happened in SIGNUP FORM: ", err);
      } finally {
        setErrors({});
      }

      /* 
      
      localStorage.setItem("token", data.token);
      set in localStorage or setting it as a cookie and it will be automatically sent to each HTTP request to the server

       */
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return { formState, errors, handleChange, handleSubmit, isLoading };
}
