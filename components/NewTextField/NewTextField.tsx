

import React from 'react';
import {TextField, FormControl, Box} from '@mui/material';

export interface NewTextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  helperText?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  fullWidth?:boolean;
  className?:any;
  sx?:object;
}

const NewTextField: React.FC<NewTextFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  helperText,
  error,
  onFocus,
  onBlur,
  className,
  sx
}) => {
  // Function to create label with red asterisk if required
  const createLabel = () => (
    <>
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </>
  );

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth className='cust-form-control'>
        <TextField
          name={name}
          label={createLabel()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          className={className}
          // required={required}
          helperText={helperText}
          sx={sx}
          // style={{width:'100%'}}
        />
     </FormControl> 
    </Box>
  );
};

export default NewTextField;



