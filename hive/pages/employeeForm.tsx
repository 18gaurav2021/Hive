//employeeForm.tsx
'use client';
import { ApiService } from '../services/api.service';
import React, { useState, FocusEvent, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Grid } from '@mui/material';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import '../styles/style.css';
import NewTextField from '../../components/NewTextField/NewTextField';
import { useRouter } from 'next/navigation';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import MainHeader from './MainHeader';

const EmployeeFrom = () => {
  const router = useRouter();
  const countries = [
    'India',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    // Add more countries as needed
  ];

  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    // Add more cities as needed
  ];

  const zones = [
    'Zone A',
    'Zone B',
    'Zone C',
    'Zone D',
    'Zone E',
    // Add more zones as needed
  ];
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);

  const [formData, setFormData] = useState({
    // Add the property names and their initial values      // for each field in your form.
    employeeName: '',
    designation: '',
    department: '',
    employeeContactNo: '',
    employeeEmail: '',
    country: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
  });
  interface Country {
    id: string;
    name: string;
  }
  interface State {
    id: string;
    name: string;
  }
  interface Designation {
    id: string;
    name: string;
  }
  interface Department {
    id: string;
    name: string;
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowALert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [country, setCountries] = useState<Country[]>([]);
  const [state, setState] = useState<State[]>([]);
  const [designation, setDesignation] = useState<Designation[]>([]);
  const [department, setDepartment] = useState<Department[]>([]);

  // const [departmentOptions, setDepartmentOptions] = useState<Array<{ label: string; value: string }>>([]);
  const apiservice = new ApiService();

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocusedField(event.target.name);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const isFormValid = () => {
    // Implement your validation logic here
    // Check whether mandatory fields are filled
    if (
      formData.employeeName &&
      formData.designation &&
      formData.department &&
      formData.pincode &&
      formData.state &&
      formData.city &&
      formData.employeeContactNo &&
      formData.employeeEmail &&
      formData.country &&
      formData.address
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const formIsValid = isFormValid();
    setSaveButtonEnabled(formIsValid);
  }, [formData]);

  const handleSave = async () => {
    console.log('Save button clicked');
    console.log(formData, 'formData');
    const data = {
      name: formData.employeeName,
      // lanCode: formData.laneCode,
      // code: 'formData.code',
      email: formData.employeeEmail,
      contactNo: formData.employeeContactNo,

      designation: { id: formData.designation },

      department: { id: formData.department },

      // gpsLink: formData.gpsLink,
      address: {
        // isDeleted: true,
        name: formData.address,
        stateId: formData.state,
        countryId: formData.country,
        city: formData.city,
        pincode: formData.pincode,
      },
    };
    try {
      const response = await apiservice.postData(
        'http://20.219.172.254/hiveconnect/accounts/clientemployee',
        data
      );

      console.log('responseee', response);
      if (response.statusCode === 200) {
        router.push('/employee');
      }
      setShowALert(true);
    } catch (error) {
      console.log('Error while saving data:', error);
      alert(error);
    }
  };

  const handleBack = () => {
    router.push('/employee');
  };
  const getcountryIds = async () => {
    const apiService = new ApiService();
    try {
      console.log('Fetching country data...');
      const response = await apiService.fetchData(
        'http://20.207.68.38/hiveconnect/configuration/Countries'
      );

      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response market data', response);
        // Assuming your response data is an array of market objects
        setCountries(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  useEffect(() => {
    getcountryIds();
    // fetchData();
  }, []);
  const getstateIds = async () => {
    const apiService = new ApiService();
    try {
      console.log('Fetching country data...');
      const response = await apiService.fetchData(
        'http://20.207.68.38/hiveconnect/configuration/States'
      );

      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response market data', response);
        // Assuming your response data is an array of market objects
        setState(response.data); // <-- Should be setStates instead of setCountries
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  useEffect(() => {
    getstateIds();
  }, []);

  const getdesignationIds = async () => {
    const apiService = new ApiService();
    try {
      console.log('Fetching designation data...');
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/Designation/designations'
      );

      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response designation data', response);
        setDesignation(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch designation data');
      }
    } catch (error) {
      console.error('Error fetching designation data:', error);
    }
  };

  useEffect(() => {
    getdesignationIds();
  }, []);

  const getdepartmentIds = async () => {
    const apiService = new ApiService();
    try {
      console.log('Fetching designation data...');
      const apiUrl =
        'http://20.219.172.254/hiveconnect/accounts/accounts/department';
      const response = await apiservice.fetchData(apiUrl);
      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response designation data', response);
        setDepartment(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch designation data');
      }
    } catch (error) {
      console.error('Error fetching designation data:', error);
    }
  };

  useEffect(() => {
    getdepartmentIds();
  }, []);

  return (
    <MainLayout>
      <MainHeader
        pageTitle={'Client Employee'}
        showAlert={showAlert}
        alertMsg={'Your employee has been added to the list.'}
      >
        <Typography
          className="text-dark"
          sx={{ fontSize: '14px', fontWeight: 400 }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Typography component="span" className="beradcrumb-text">
              Home
            </Typography>
            <Link
              href="/employee"
              style={{ marginLeft: '5px', textDecoration: 'none' }}
            >
              / Client Employee{' '}
            </Link>{' '}
            / Add New Employee
          </Link>
        </Typography>
      </MainHeader>
      <Box
        component="form"
        className="input-form outletform-box"
        sx={{ mt: '20px' }}
      >
        <Box component="div" className="form-body">
          <Grid
            container
            rowSpacing={{ xs: 3, sm: 3, md: '20px' }}
            columnSpacing={{ xs: 2, sm: 3, md: '54px' }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Basic Information
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewTextField
                name="employeeName"
                label="Name"
                placeholder="Enter Name"
                value={formData.employeeName}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('employeeName')}
                onBlur={() => setFocusedField(null)}
                error={
                  focusedField === 'employeeName' && !formData.employeeName
                }
                helperText={
                  focusedField === 'employeeName' && !formData.employeeName
                    ? 'Employee name is required'
                    : ''
                }
                // error={!!errors.outletName}
                // helperText={errors.outletName}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewSelectOption
                label={
                  <>
                    Designation
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
                name="designation"
                value={formData.designation}
                onChange={handleFieldChange}
                options={[
                  { label: 'Select a designation', value: '' },
                  ...designation.map((designation) => ({
                    label: designation.name,
                    value: designation.id,
                  })),
                ]}
                style={{ color: 'blue' }}
                className="my-custom-select"
                error={focusedField === 'designation' && !formData.designation}
                helperText={
                  focusedField === 'designation' && !formData.designation
                    ? 'Designation is required'
                    : ''
                }
                onFocus={() => setFocusedField('designation')}
                onBlur={() => setFocusedField(null)}
                sx={{ maxWidth: '100%', background: 'white' }}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewSelectOption
                label={
                  <>
                    Department
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
                name="department"
                value={formData.department}
                onChange={handleFieldChange}
                options={[
                  { label: 'Select a designation', value: '' },
                  ...department.map((department) => ({
                    label: department.name,
                    value: department.id,
                  })),
                ]}
                style={{ color: 'blue' }}
                className="my-custom-select"
                error={focusedField === 'department' && !formData.department}
                helperText={
                  focusedField === 'department' && !formData.department
                    ? 'Departmentn is required'
                    : ''
                }
                onFocus={() => setFocusedField('department')}
                onBlur={() => setFocusedField(null)}
                sx={{ maxWidth: '100%', background: 'white' }}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography
                component="h3"
                variant="h3"
                className="h3"
                sx={{ mt: '25px' }}
              >
                Contact Information
              </Typography>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <NewTextField
                name="employeeContactNo"
                label="Contact Number"
                placeholder="Enter Number"
                value={formData.employeeContactNo}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('employeeContactNo')}
                onBlur={() => setFocusedField(null)}
                error={
                  focusedField === 'employeeContactNo' &&
                  !formData.employeeContactNo
                }
                helperText={
                  focusedField === 'employeeContactNo' &&
                  !formData.employeeContactNo
                    ? 'Employee Contact Number is required'
                    : ''
                }
                // error={!!errors.outletName}
                // helperText={errors.outletName}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <NewTextField
                name="employeeEmail"
                label="Email Address"
                placeholder="Enter Email"
                value={formData.employeeEmail}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('employeeEmail')}
                onBlur={() => setFocusedField(null)}
                error={
                  focusedField === 'employeeEmail' && !formData.employeeEmail
                }
                helperText={
                  focusedField === 'employeeEmail' && !formData.employeeEmail
                    ? 'Employee email address is required'
                    : ''
                }
                // error={!!errors.outletName}
                // helperText={errors.outletName}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
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
                    value={formData.address}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'address' && !formData.address}
                    helperText={
                      focusedField === 'address' && !formData.address
                        ? 'Address is required'
                        : ''
                    }
                    // error={!!errors.outletName}
                    // helperText={errors.outletName}
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
                    value={formData.country}
                    onChange={handleFieldChange}
                    options={[
                      { label: 'Select a country', value: '' },
                      ...country.map((countries) => ({
                        label: countries.name,
                        value: countries.id,
                      })),
                    ]}
                    style={{ color: 'blue' }}
                    className="my-custom-select"
                    error={focusedField === 'name' && !formData.country}
                    helperText={
                      focusedField === 'name' && !formData.country
                        ? 'Country name is required'
                        : ''
                    }
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    sx={{ maxWidth: '100%', background: 'white' }}
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
                    value={formData.state}
                    onChange={handleFieldChange}
                    options={[
                      { label: 'Select a state', value: '' },
                      ...state.map((states) => ({
                        label: states.name,
                        value: states.id,
                      })),
                    ]}
                    className="my-custom-select"
                    error={focusedField === 'name' && !formData.state}
                    helperText={
                      focusedField === 'name' && !formData.state
                        ? 'State name is required'
                        : ''
                    }
                    onFocus={() => setFocusedField('state')}
                    onBlur={() => setFocusedField(null)}
                    sx={{ maxWidth: '100%', background: 'white' }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <NewTextField
                    name="city"
                    label="City"
                    placeholder="Enter City"
                    value={formData.city}
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
                    // error={!!errors.outletName}
                    // helperText={errors.outletName}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <NewTextField
                    name="pincode"
                    label="Pincode"
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('pincode')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'pincode' && !formData.pincode}
                    helperText={
                      focusedField === 'pincode' && !formData.pincode
                        ? 'Pincode is required'
                        : ''
                    }
                    // error={!!errors.outletName}
                    // helperText={errors.outletName}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ textAlign: 'right' }}
            >
              <CustomButton
                className="btn btn-outline"
                variant="outlined"
                sx={{ marginRight: '10px' }}
                onClick={handleBack}
              >
                Back
              </CustomButton>
              <CustomButton
                type="button"
                // onClick={() => setShowALert(true)}
                onClick={handleSave}
                className="saveButton btn btn-black"
                // disabled={!isSaveButtonEnabled}
              >
                Save
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default EmployeeFrom;
