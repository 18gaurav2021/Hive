'use client';
import { Button, Grid, Box, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import MainLayout from '../MainLayout';
import VendorBasic from './vendorBasic';
import VendorDocs from './vendorDocs';
import { ApiService } from '../../services/api.service';
import { useRouter } from 'next/navigation';

const Addvendor = () => {
  const router = useRouter();

  const [showVendor, setVendor] = useState(false);
  // const [formData, setFormData] = useState({}); // Add a state to store overall form data
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    emailAddress: '',
    pocName: '',
    pocContactNumber: '',
    countryId: '',
    countryId1: '',
    stateId: '',
    city: '',
    city1: '',
    state: '',
    state1: '',
    pincode: '',
    pincode1: '',
    gstNumber: '',
    gstregisteredaddressline: '',
    panno: '',
    msmeRegNo: '',
    activityId: '',
    address: '',
    code: '',
    zone: '',
    billingaddressline1: '',
    billingaddressline2: '',
    legalentityname: '',
    // sfa: '',
    // days: ''
  });
  const apiService = new ApiService();
  // Function to handle save button click
  const handleSave = async () => {
    console.log('Overall Form Data:', formData);
    const data = {
      name: formData.name,
      code: 'code',
      activityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      legalEntityName: formData.legalentityname,
      contactNumber: formData.contactNumber,
      emailAddress: formData.emailAddress,
      pocName: formData.pocName,
      pocContactNumber: formData.pocContactNumber,
      billingAddress: {
        name: 'data',
        stateId: formData.state1,
        countryId: formData.countryId1,
        city: formData.city1,
        pincode: formData.pincode,
      },
      gstRegisteredAddress: {
        name: 'data',
        stateId: formData.state,
        countryId: formData.countryId,
        city: formData.city,
        pincode: formData.pincode1,
      },
      gstNumber: formData.gstNumber,
      panno: formData.panno,
      msmeRegNo: formData.msmeRegNo,
      // sfa:formData.sfa,
      // days:formData.days,
      status: 2,
    };

    console.log('Overall Form Data>>>>>:', data);

    try {
      const response = await apiService.postData(
        'http://20.219.172.254/hiveconnect/accounts/vendor',
        data
      );

      console.log('response post data', response);

      if (response.statusCode === 200) {
        router.push('/vendor');
      }
      // Log the received JSON data
      console.log('Received JSON data:', response.data.billingAddress);

      // You can also log specific fields if needed
      console.log('Name:', response.data.name);
      console.log('Contact Number:', response.data.contactNumber);

      //setShowALert(true);
    } catch (error) {
      console.log('Error while saving data:', error);
      alert(error);
    }
    updateFormData(formData);
  };

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const formIsValid = isFormValid();
    setSaveButtonEnabled(formIsValid);
  }, [formData]);

  const isFormValid = () => {
    // Implement your validation logic here
    // Check whether mandatory fields are filled
    if (
      formData.name &&
      formData.activityId &&
      formData.contactNumber &&
      formData.emailAddress &&
      formData.pocName &&
      formData.pocContactNumber &&
      formData.countryId &&
      formData.countryId1 &&
      formData.stateId &&
      formData.city &&
      formData.city1 &&
      formData.pincode &&
      formData.gstNumber &&
      formData.panno &&
      formData.msmeRegNo &&
      formData.billingaddressline1 &&
      formData.billingaddressline2 &&
      formData.state &&
      formData.state1 &&
      formData.address &&
      formData.zone &&
      formData.legalentityname &&
      formData.gstregisteredaddressline
      // formData.sfa &&
      // formData.days
    ) {
      return true;
    }
    return false;
  };

  // Function to update overall form data
  const updateFormData = (data: {}) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <MainLayout>
      <Box className="white-box">
        <Typography
          component="p"
          className="m-0 text-dark"
          sx={{ fontSize: '14px' }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            {' '}
            Home{' '}
          </Link>
          <Link href="/vendor" style={{ textDecoration: 'none' }}>
            {' '}
            / Vendor Master{' '}
          </Link>{' '}
          / Add Vendor Master
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: '10px',
          }}
        >
          <Typography
            component="h3"
            variant="h3"
            className="h3 page-heading-text"
            sx={{ mt: '15px' }}
          >
            Vendor
          </Typography>
        </Box>
      </Box>

      <Box
        component="form"
        className="input-form outletform-box"
        sx={{ mt: '20px' }}
      >
        <Box component="div" className="form-body">
          <VendorBasic
            handleFieldChange={handleFieldChange}
            formData={formData}
            setFocusedField={setFocusedField}
            focusedField={focusedField}
          />
          <VendorDocs
            handleFieldChange={handleFieldChange}
            formData={formData}
            setFocusedField={setFocusedField}
            focusedField={focusedField}
          />
          <Box className="justifyend" sx={{ gap: '15px' }}>
            <Button className="btn btn-outline" variant="outlined">
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              className="btn btn-black"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Addvendor;
