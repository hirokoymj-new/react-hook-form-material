interface option {
  label: string;
  value: string | number;
}

export interface FormInputProps {
  name: string;
  label: string;
  options?: option[];
  // control?: any;
}
