import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

interface option {
  label: string;
  value: string | number;
}

interface FormInputProps {
  name: string;
  label: string;
  options: option[];
  defaultValues: any[];
}

export const FormInputMultiCheckbox: React.FC<FormInputProps> = ({
  name,
  label,
  options,
  defaultValues,
}) => {
  // const [selectedItems, setSelectedItems] = useState<any>([]);
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
  } = useFormContext();

  // const handleSelect = (value: any) => {
  //   const isPresent = selectedItems.indexOf(value);
  //   if (isPresent !== -1) {
  //     const remaining = selectedItems.filter((item: any) => item !== value);
  //     setSelectedItems(remaining);
  //   } else {
  //     setSelectedItems((prevItems: any) => [...prevItems, value]);
  //   }
  // };

  const handleSelect = (value: any) => {
    const values = getValues();
    const selectedItems = values[name];
    const newItems = selectedItems.includes(value)
      ? selectedItems.filter((item: any) => item !== value)
      : [...selectedItems, value];
    // setSelectedItems(newItems);
    return newItems;
  };

  // useEffect(() => {
  //   setValue(name, selectedItems);
  //   if (isSubmitSuccessful) {
  //     setSelectedItems([]);
  //   }
  // }, [selectedItems, isSubmitSuccessful]);

  // const handleCheck = (value: any) => {
  //   console.log("handleCheck");
  //   const values = getValues();
  //   console.log(values[name]);

  //   const newIds = values[name]?.includes(value)
  //     ? values[name]?.filter((id: string) => id !== value)
  //     : [...values[name], value];
  //   console.log(newIds);
  //   return newIds;
  // };

  return (
    <FormControl
      size={"small"}
      variant={"outlined"}
      error={errors && errors[name]}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({ field: { onChange } }) => {
                    // console.log(getValues());
                    const values = getValues();
                    console.log(values[name]);
                    return (
                      <Checkbox
                        onChange={() => onChange(handleSelect(option.value))}
                        // checked={selectedItems.includes(option.value)}
                        checked={values[name].includes(option.value)}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{errors && errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};
