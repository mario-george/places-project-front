"use client";
import { FormEvent, useState } from "react";
import useHttp from "./useHttp";

interface Errors {
  title?: string;
  address?: string;
  location?: string;
  description?: string;
}

export default function useAddPlaceHook({ userID }:{userID:string}) {
  const { isLoading, error, sendRequestFormData } = useHttp();

  const [formState, setFormState] = useState({
    title: "",
    address: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const validateForm = () => {
    let errors: Errors = {};
    if (!formState.title) {
      errors.title = "Title is required.";
    }
    if (!formState.address) {
      errors.title = "address is required.";
    }
    if (!formState.location) {
      errors.title = "location is required.";
    }
    if (!formState.description) {
      errors.title = "description is required.";
    }
    setErrors(errors);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form validation is successful!");

      // Create a new FormData object
      const formData = new FormData();

      // Append the file to the FormData object
      const fileInput = document.getElementById(
        "place-image"
      ) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }

      // Append the form state to the FormData object

    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return { formState, errors, handleChange, handleSubmit, isLoading };
}
