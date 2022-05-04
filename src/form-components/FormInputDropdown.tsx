import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

interface option {
  label: string;
  value: string | number;
}

interface FormInputProps {
  name: string;
  label: string;
  options: option[];
}

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  label,
  options,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl size={"small"} error={errors && !!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            value={value}
            id="site-select"
            // inputProps={{ autoFocus: true }}
          >
            {options?.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
        control={control}
        name={name}
      />
      <FormHelperText>{errors && errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};
