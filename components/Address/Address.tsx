import React, { ChangeEvent, useState } from 'react';
import NewTextField from '../../components/NewTextField/NewTextField';
import NewSelectOption, {
  NewSelectOptionProps,
} from '../../components/NewSelectbox/NewSelectoption';
import { Grid, Typography } from '@mui/material';

export interface AddressProps {
  handleFieldChange?: any;
  formData?: any;
  setFocusedField?: any;
  focusedField?: any;
  countries?: any;
  states?: any;
}

const Address: React.FC<AddressProps> = ({
  handleFieldChange,
  formData,
  setFocusedField,
  focusedField,
}) => {
  const countries: NewSelectOptionProps['options'] = [
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'UK' },
    { value: 'Australia', label: 'Australia' },
  ];

  const states: NewSelectOptionProps['options'] = [
    { value: 'state1', label: 'State 1' },
    { value: 'state2', label: 'State 2' },
  ];

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 3, sm: 3, md: '20px' }}
        columnSpacing={{ xs: 2, sm: 3, md: '54px' }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <NewTextField
            name="address"
            label="Address"
            placeholder="Enter Address"
            value={formData?.address}
            onChange={handleFieldChange}
            required={true}
            onFocus={() => setFocusedField('address')}
            onBlur={() => setFocusedField(null)}
            error={focusedField === 'address' && !formData.address}
            helperText={
              focusedField === 'address' && !formData.address
                ? 'address is required'
                : ''
            }
            fullWidth
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <NewSelectOption
            label={
              <>
                Country
                <span style={{ color: 'red' }}>*</span>
              </>
            }
            name="country"
            value={formData?.country}
            placeholder="Enter Country"
            onChange={(e) =>
              handleFieldChange({
                target: { name: 'country', value: e.target.value },
              })
            }
            options={countries}
            className="my-custom-select"
            onFocus={() => setFocusedField('country')}
            onBlur={() => setFocusedField(null)}
            error={focusedField === 'country' && !formData.country}
            helperText={
              focusedField === 'country' && !formData.country
                ? 'country is required'
                : ''
            }
            style={{
              borderRadius: '5px',
              width: '100%',
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <NewSelectOption
            label={
              <>
                State/County
                <span style={{ color: 'red' }}>*</span>
              </>
            }
            name="state"
            value={formData?.state}
            onChange={(e) =>
              handleFieldChange({
                target: { name: 'state', value: e.target.value },
              })
            }
            options={states}
            className="my-custom-select"
            onFocus={() => setFocusedField('state')}
            onBlur={() => setFocusedField(null)}
            error={focusedField === 'state' && !formData.state}
            helperText={
              focusedField === 'state' && !formData.state
                ? 'State is required'
                : ''
            }
            style={{
              borderRadius: '5px',
              width: '100%',
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <NewTextField
            name="city"
            label="City"
            placeholder="Enter City"
            value={formData?.city}
            onChange={handleFieldChange}
            required={true}
            onFocus={() => setFocusedField('city')}
            onBlur={() => setFocusedField(null)}
            error={focusedField === 'city' && !formData.city}
            helperText={
              focusedField === 'city' && !formData.city
                ? 'City is required'
                : ''
            }
            fullWidth
            sx={{
              borderRadius: '5px',
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <NewTextField
            name="pincode"
            label="Pincode"
            placeholder="Enter Pincode"
            value={formData?.pincode}
            onChange={handleFieldChange}
            required={false}
            onFocus={() => setFocusedField('pincode')}
            onBlur={() => setFocusedField(null)}
            error={focusedField === 'pincode' && !formData.pincode}
            helperText={
              focusedField === 'pincode' && !formData.pincode
                ? 'Pincode is required'
                : ''
            }
            fullWidth
            sx={{
              borderRadius: '5px',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Address;
