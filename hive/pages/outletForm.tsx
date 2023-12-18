'use client';
import React, { useState, FocusEvent, useEffect } from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { CustomTextField } from '../../components/TextField/TextField';
import ReusableSelect from '../../components/ReusableSelect/ReusableSelect';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Divider } from '@mui/material';
import { Container, CssBaseline } from '@mui/material';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import '../styles/style.css';
import NewTextField from '../../components/NewTextField/NewTextField';
import NewSelectoption from '../../components/NewSelectbox/NewSelectoption';
import { useRouter } from 'next/navigation';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import Address from '../../components/Address/Address';
// import Code from '../../components/Code/Code';
import { ApiService } from '../services/api.service';

export interface Country {
  id: string;
  name: string;
}

const OutletFrom = () => {
  const router = useRouter();

  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);

  const [formData, setFormData] = useState({
    // Add the property names and their initial values
    outletName: '',
    laneCode: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    zone: '',
    code: '',
    pincode: '',
    contactName: '',
    gpsCoordinates: '',
    gpsLink: '',
    tmeName: '',
    tseName: '',
    asmName: '',
    contactNo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowALert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [tseNames, setTseNames] = useState<Country[]>([]);
  const [tmeNames, setTmeNames] = useState<Country[]>([]);
  const [asmNames, setASMNames] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<Country[]>([]);

  useEffect(() => {
    async function getTMEdesignation() {
      const apiservice = new ApiService();
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/designation/client/TME'
      );
      setTmeNames(response.data);
      console.log('tme names', response.data);
    }
    async function getTSEdesignation() {
      const apiservice = new ApiService();
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/designation/client/TSE'
      );
      setTseNames(response.data);
      console.log('tse name', response.data);
    }
    async function getASMdesignation() {
      const apiservice = new ApiService();
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/designation/client/ASM'
      );
      setASMNames(response.data);
      console.log('asm names', response.data);
    }
    getTMEdesignation();
    getTSEdesignation();
    getASMdesignation();
    getcountryIds();
    getstateIds();
  }, []);

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
        setStates(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

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
    if (
      formData.outletName &&
      formData.laneCode &&
      formData.address1 &&
      formData.zone &&
      formData.state &&
      formData.city &&
      formData.address2
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const formIsValid = isFormValid();
    setSaveButtonEnabled(formIsValid);
  }, [formData]);

  const handleBack = () => {
    router.push('/outlet');
  };
  const apiService = new ApiService();

  const handleSave = async () => {
    console.log('Save button clicked');
    console.log(formData, 'formData');
    const data = {
      name: formData.outletName,
      lanCode: formData.laneCode,
      code: 'code',
      contactName: formData.contactName,
      contactNumber: formData.contactNo,
      emailAddress: formData.email,
      gpsCoordinates: formData.gpsCoordinates,
      gpsLink: formData.gpsLink,
      address: {
        name: formData.contactName,
        stateId: formData.state,
        countryId: formData.country,
        city: formData.city,
        pincode: formData.pincode,
      },
      tseId: formData.tseName,
      tmeId: formData.tmeName,
      asmId: formData.asmName,
      status: 1,
    };
    try {
      const response = await apiService.postData(
        'http://4.224.102.99/hiveconnect/requestmanagement/Outlet/Outlet',
        data
      );

      console.log('responseee', response);

      if (response.statusCode === 200) {
        router.push('/outlet');
      }
      setShowALert(true);
    } catch (error) {
      console.log('Error while saving data:', error);
      alert(error);
    }
  };
  // handleSave();

  // const response=apiService.fetchData('http://20.192.10.19:806/hiveconnect/requestmanagement/Outlet/Outlets')
  // alert(response)
  return (
    <MainLayout>
      <Box className="white-box" sx={{ paddingBottom: '15px !important' }}>
        <Typography className="text-dark" sx={{ fontSize: '14px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Typography component="span">Home </Typography>
          </Link>
          <Link
            href="/outlet"
            style={{ marginLeft: '5px', textDecoration: 'none' }}
          >
            <Typography component="span">/ Outlet Master</Typography>
          </Link>{' '}
          / Add New Outlet
        </Typography>
        <Typography
          component="h3"
          variant="h3"
          sx={{ mt: '10px' }}
          className="page-heading-text h3 text-dark"
        >
          Outlets
        </Typography>
        <Box>
          {showAlert && (
            <Alert severity="success">
              Your outlet has been added to the list.
            </Alert>
          )}
        </Box>
      </Box>

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
                Outlet Information
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid
                container
                rowSpacing={{ xs: 3, sm: 3, md: '20px' }}
                columnSpacing={{ xs: 2, sm: 3, md: '54px' }}
              >
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Grid
                    container
                    rowSpacing={{ xs: 3, sm: 3, md: '20px' }}
                    columnSpacing={{ xs: 2, sm: 3, md: '54px' }}
                  >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <NewTextField
                        name="outletName"
                        label="Name"
                        placeholder="Enter Outlet Name"
                        value={formData.outletName}
                        onChange={handleFieldChange}
                        required={true}
                        onFocus={() => setFocusedField('outletName')}
                        onBlur={() => setFocusedField(null)}
                        error={
                          focusedField === 'outletName' && !formData.outletName
                        }
                        helperText={
                          focusedField === 'outletName' && !formData.outletName
                            ? 'Outlet name is required'
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <NewTextField
                        name="laneCode"
                        label="Lane Code"
                        placeholder="Enter Lane Code"
                        value={formData.laneCode}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('code')}
                        onBlur={() => setFocusedField(null)}
                        // error={focusedField === 'laneCode' && !formData.laneCode}
                        // helperText={
                        //   focusedField === 'laneCode' && !formData.laneCode
                        //     ? 'Lane code is required'
                        //     : ''
                        // }
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <NewTextField
                        name="gpsCoordinates"
                        label="GPS Coordinates"
                        placeholder="Enter GPS Coordinates"
                        value={formData.gpsCoordinates}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <NewTextField
                        name="gpsLink"
                        label="GPS Link"
                        placeholder="Enter GPS Link"
                        value={formData.gpsLink}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Address
                    handleFieldChange={handleFieldChange}
                    formData={formData}
                    setFocusedField={setFocusedField}
                    focusedField={focusedField}
                    countries={countries}
                    states={states}
                  />
                </Grid>
              </Grid>
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
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewTextField
                name="contactName"
                label="Name"
                placeholder="Enter Contact Name"
                value={formData.contactName}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewTextField
                name="contactNo"
                label="Contact No"
                placeholder="Enter Contact No"
                value={formData.contactNo}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewTextField
                name="email"
                label="E-mail Address"
                placeholder="Enter E-mail Address"
                value={formData.email}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography
                component="h3"
                variant="h3"
                className="h3"
                sx={{ mt: '25px' }}
              >
                Client Information
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewSelectOption
                label={
                  <>
                    TSE Name
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
                name="tseName"
                value={formData.tseName}
                onChange={(e) =>
                  handleFieldChange({
                    target: { name: 'tseName', value: e.target.value },
                  })
                }
                options={tseNames.map((tse) => ({
                  label: tse.name,
                  value: tse.id,
                }))}
                style={{ color: 'blue' }}
                className="my-custom-select"
                onFocus={() => setFocusedField('tse')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'tse' && !formData.tseName}
                helperText={
                  focusedField === 'tse' && !formData.tseName
                    ? 'TSE is required'
                    : ''
                }
                sx={{ maxWidth: '100%', background: 'white' }}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewSelectOption
                label={
                  <>
                    TME Name
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
                name="tmeName"
                value={formData.tmeName}
                onChange={(e) =>
                  handleFieldChange({
                    target: { name: 'tmeName', value: e.target.value },
                  })
                }
                options={tmeNames.map((tme) => ({
                  label: tme.name,
                  value: tme.id,
                }))}
                style={{ color: 'blue' }}
                className="my-custom-select"
                onFocus={() => setFocusedField('tme')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'tse' && !formData.tmeName}
                helperText={
                  focusedField === 'tme' && !formData.tmeName
                    ? 'TME is required'
                    : ''
                }
                sx={{ maxWidth: '100%', background: 'white' }}
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewSelectOption
                label={
                  <>
                    ASM Name
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
                name="asmName"
                value={formData.asmName}
                onChange={(e) =>
                  handleFieldChange({
                    target: { name: 'asmName', value: e.target.value },
                  })
                }
                options={asmNames.map((tme) => ({
                  label: tme.name,
                  value: tme.id,
                }))}
                style={{ color: 'blue' }}
                className="my-custom-select"
                onFocus={() => setFocusedField('asm')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'asm' && !formData.asmName}
                helperText={
                  focusedField === 'asm' && !formData.asmName
                    ? 'ASM is required'
                    : ''
                }
                sx={{ maxWidth: '100%', background: 'white' }}
              />
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
                type="button"
                sx={{ mr: '10px' }}
                onClick={handleSave}
                disabled={!isSaveButtonEnabled}
              >
                Back
              </CustomButton>
              <CustomButton
                className="btn btn-black"
                type="button"
                onClick={handleSave}
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

export default OutletFrom;
