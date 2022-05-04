import React, { useEffect } from "react";
import { Button, Paper, Typography, Container } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInputText } from "./form-components/FormInputText";
import { FormInputMultiCheckbox } from "./form-components/FormInputMultiCheckbox";
import { FormInputDropdown } from "./form-components/FormInputDropdown";
// import { FormInputDate } from "./form-components/FormInputDate";
import { FormInputSlider } from "./form-components/FormInputSlider";
import { FormInputRadio } from "./form-components/FormInputRadio";
import { FormInputCheckbox } from "./form-components/FormInputCheckbox";

interface IFormInput {
  firstName: string;
  gender: string;
  color: string;
  drinks: string[];
  dateValue: Date;
  sliderValue: number;
  acceptTerms: boolean;
}

const defaultValues = {
  firstName: "",
  gender: "",
  color: "",
  drinks: [],
  dateValue: new Date(),
  sliderValue: 0,
  acceptTerms: false,
};

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in first name"),
    color: yup.string().required("Please select color"),
    gender: yup.string().required("Please select gender"),
    drinks: yup.array().min(1).of(yup.string().required("Drink is required")),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Terms and Conditions is required"),
  })
  .required();

const options = [
  {
    label: "White",
    value: "white",
  },
  {
    label: "Red",
    value: "red",
  },
];
const radioOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
const checkboxOptions = [
  {
    label: "Coffee",
    value: "coffee",
  },
  {
    label: "Tea",
    value: "tea",
  },
];

export const FormDemo = () => {
  const methods = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isDirty },
    setValue,
  } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...defaultValues });
    }
  }, [isSubmitSuccessful, reset]);

  console.log("isDirty", isDirty);

  return (
    <Container maxWidth="sm">
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
        }}>
        <Typography variant="h6"> Form Demo</Typography>
        <FormProvider {...methods}>
          <FormInputText name="firstName" label="First Name" />
          <FormInputRadio
            name={"gender"}
            label={"Gender"}
            options={radioOptions}
          />
          <FormInputDropdown
            name="color"
            label="Select color"
            options={options}
          />
          <FormInputMultiCheckbox
            name={"drinks"}
            label={"Your favorite drinks"}
            options={checkboxOptions}
            defaultValues={defaultValues.drinks}
          />
          <FormInputCheckbox
            name="acceptTerms"
            label="Terms and Conditions"
            formLabel="I read and accept."
          />
          {/* <FormInputDate name="dateValue" label="Date Input" /> */}
          <FormInputSlider name={"sliderValue"} label={"Slider Input"} />
        </FormProvider>

        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          {" "}
          Submit{" "}
        </Button>
        <Button
          onClick={() => {
            reset({ ...defaultValues });
          }}
          variant={"outlined"}>
          {" "}
          Reset{" "}
        </Button>
      </Paper>
    </Container>
  );
};
