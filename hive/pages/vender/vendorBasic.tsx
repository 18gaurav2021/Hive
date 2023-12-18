'use client';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import NewTextField from '../../../components/NewTextField/NewTextField';
import NewSelectOption from '../../../components/NewSelectbox/NewSelectoption';
import { useRouter } from 'next/navigation';
import { ApiService } from '../../services/api.service';
import { headers } from 'next/dist/client/components/headers';
const apiservice = new ApiService();
interface Country {
  id: string;
  name: string;
}
interface States {
  id: string;
  name: string;
}
interface Activity {
  id: string;
  name: string;
}
// interface VendorBasicProps {
//   setVendor: Dispatch<SetStateAction<boolean>>;
//   updateFormData: (data: object) => void;
// }

export interface VendorBasicProps {
  handleFieldChange?: any;
  formData?: any;
  setFocusedField?: any;
  focusedField?: any;
}

const VendorBasic: React.FC<VendorBasicProps> = ({
  handleFieldChange,
  formData,
  setFocusedField,
  focusedField,
}) => {
  const router = useRouter();
  const [column, setColumn] = useState();
  const [data, setData] = useState<any[]>([]);
  const [state, setStates] = useState<States[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const zones = [
    'City A',
    'City B',
    'City C',
    'City D',
    'City E',
    // Add more zones as needed
  ];

  useEffect(() => {
    getcountryIds();
    getstateIds();
    getactivityIds();
  }, []);

  const handleBack = () => {
    router.push('/outlet');
  };

  const apiService = new ApiService();

  // const handleSave = async () => {
  //   console.log('Save button clicked');
  //   console.log(formData, 'formData');
  //   const data = {
  //     name: formData.name,
  //     // lanCode: formData.laneCode,
  //     code: formData.code,
  //     activityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     legalEntityName: 'string',

  //     //contactName: formData.contactName,
  //     contactNumber: formData.contactNumber,
  //     emailAddress: formData.emailAddress,
  //     pocName: formData.pocName,
  //     //gpsCoordinates: formData.gpsCoordinates,
  //     // gpsLink: formData.gpsLink,
  //     pocContactNumber: formData.pocContactNumber,
  //     billingAddress: {
  //       // isDeleted: true,
  //       // activityId:'3fa85f64-5717-4562-b3fc-2c963f66afa6',

  //       name: formData.name,
  //       stateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //       countryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //       city: formData.city,
  //       pincode: formData.pincode,
  //     },
  //     gstNumber: formData.gstNumber,
  //     panno: formData.panno,
  //     msmeRegNo: '444444444444',
  //     // tseId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     // tmeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     // asmId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     status: 2,
  //   };
  //   try {
  //     const response = await apiService.postData(
  //       ':802/hiveconnect/Accounts/vendor',
  //       data
  //     );

  //     console.log('response post data', response);
  //     // Log the received JSON data
  //     console.log('Received JSON data:', response.data.billingAddress);

  //     // You can also log specific fields if needed
  //     console.log('Name:', response.data.name);
  //     console.log('Contact Number:', response.data.contactNumber);

  //     //setShowALert(true);
  //   } catch (error) {
  //     console.log('Error while saving data:', error);
  //     alert(error);
  //   }
  //   updateFormData(formData);
  // };
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
  const getactivityIds = async () => {
    const apiService = new ApiService();
    try {
      console.log('Fetching country data...');
      const response = await apiService.fetchData(
        'http://20.207.68.38/hiveconnect/configuration/Activity'
      );
      setActivity(response.data);
      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response market data', response);
        // Assuming your response data is an array of market objects

        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  return (
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
          label="Name"
          name="name"
          placeholder="Enter Vendor Name"
          value={formData.name}
          required={true}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'name' && !formData.name}
          helperText={
            focusedField === 'name' && !formData.name ? 'Name is required' : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewSelectOption
          label={
            <>
              Activity
              <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="activityId"
          value={formData.activityId}
          onChange={(e) => handleFieldChange(e)}
          options={activity.map((country) => ({
            label: country.name,
            value: country.id,
          }))}
          style={{ color: 'blue' }}
          className="my-custom-select"
          // error={!!errors.zone}
          // helperText={errors.zone}
          onFocus={() => setFocusedField('activityId')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'activityId' && !formData.activityId}
          helperText={
            focusedField === 'activityId' && !formData.activityId
              ? 'activityId is required'
              : ''
          }
          sx={{ maxWidth: '100%', background: 'white' }}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="Legal Entity Name"
          name="legalentityname"
          placeholder=" Enter Legal Entity Name"
          value={formData.legalentityname}
          required={true}
          onFocus={() => setFocusedField('legalentityname')}
          onBlur={() => setFocusedField(null)}
          error={
            focusedField === 'legalentityname' && !formData.legalentityname
          }
          helperText={
            focusedField === 'legalentityname' && !formData.legalentityname
              ? ' Legal Entity Name is required'
              : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Vendor Billing and Contact Information
        </Typography>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="Contact Number"
          name="contactNumber"
          placeholder="Enter Contact Number"
          value={formData.contactNumber}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('contactNumber')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'contactNumber' && !formData.contactNumber}
          helperText={
            focusedField === 'contactNumber' && !formData.contactNumber
              ? 'Contact Number is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="Email Address"
          name="emailAddress"
          placeholder="Enter Email Address"
          value={formData.emailAddress}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('emailAddress')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'emailAddress' && !formData.emailAddress}
          helperText={
            focusedField === 'emailAddress' && !formData.emailAddress
              ? 'Email is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <NewTextField
          label="Billing Address "
          name="billingaddressline1"
          placeholder="Billing Address"
          value={formData.billingaddressline1}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('billingaddressline1')}
          onBlur={() => setFocusedField(null)}
          error={
            focusedField === 'billingaddressline1' &&
            !formData.billingaddressline1
          }
          helperText={
            focusedField === 'billingaddressline1' &&
            !formData.billingaddressline1
              ? 'Billing Address'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="POC Name"
          name="pocName"
          placeholder="Enter POC Name"
          value={formData.pocName}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('pocName')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'pocName' && !formData.pocName}
          helperText={
            focusedField === 'pocName' && !formData.pocName
              ? 'POC Name is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="POC Contact Number"
          name="pocContactNumber"
          placeholder="POC Contact Number"
          value={formData.pocContactNumber}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('pocContactNumber')}
          onBlur={() => setFocusedField(null)}
          error={
            focusedField === 'pocContactNumber' && !formData.pocContactNumber
          }
          helperText={
            focusedField === 'pocContactNumber' && !formData.pocContactNumber
              ? 'POC Contact Number is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewSelectOption
          label={
            <>
              Country
              <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="countryId"
          value={formData.countryId}
          onChange={(e) => handleFieldChange(e)}
          options={countries.map((country) => ({
            label: country.name,
            value: country.id,
          }))}
          style={{ color: 'blue' }}
          className="my-custom-select"
          // error={!!errors.zone}
          // helperText={errors.zone}
          onFocus={() => setFocusedField('countryId')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'countryId' && !formData.countryId}
          helperText={
            focusedField === 'countryId' && !formData.countryId
              ? 'countryId'
              : ''
          }
          sx={{ maxWidth: '100%', background: 'white' }}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewSelectOption
          label={
            <>
              State/County
              <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="state"
          value={formData.state}
          onChange={(e) => handleFieldChange(e)}
          options={state.map((st) => ({
            label: st.name,
            value: st.id,
          }))}
          style={{ color: 'blue' }}
          className="my-custom-select"
          // error={!!errors.zone}
          // helperText={errors.zone}
          onFocus={() => setFocusedField('state')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'state' && !formData.state}
          helperText={
            focusedField === 'state' && !formData.state
              ? 'state'
              : 'state is required'
          }
          sx={{ maxWidth: '100%', background: 'white' }}
        />
      </Grid>
      <Grid item lg={6} md={4} sm={6} xs={12}></Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="City"
          name="city"
          placeholder=" Enter City"
          value={formData.city}
          required={true}
          onFocus={() => setFocusedField('city')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'city' && !formData.city}
          helperText={
            focusedField === 'city' && !formData.city ? ' City is required' : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="Pincode"
          name="pincode1"
          placeholder=" Enter Pincode"
          value={formData.pincode1}
          required={true}
          onFocus={() => setFocusedField('pincode1')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'pincode1' && !formData.pincode1}
          helperText={
            focusedField === 'pincode1' && !formData.pincode1
              ? ' Pincode is required'
              : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Buisness Information Details
        </Typography>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="GST Number"
          name="gstNumber"
          placeholder="Enter GST Number"
          value={formData.gstNumber}
          required={true}
          onChange={handleFieldChange}
          onFocus={() => setFocusedField('gstNumber')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'gstNumber' && !formData.gstNumber}
          helperText={
            focusedField === 'gstNumber' && !formData.gstNumber
              ? 'GST Number is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="PAN No."
          name="panno"
          placeholder="Enter PAN No."
          value={formData.panno}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('panno')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'panno' && !formData.panno}
          helperText={
            focusedField === 'panno' && !formData.panno
              ? 'PAN No is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <NewTextField
          label="GSTRegisteredAddressLine"
          name="gstregisteredaddressline"
          placeholder="Enter Address Line"
          value={formData.gstregisteredaddressline}
          required={true}
          onChange={handleFieldChange}
          onFocus={() => setFocusedField('gstregisteredaddressline')}
          onBlur={() => setFocusedField(null)}
          error={
            focusedField === 'gstregisteredaddressline' &&
            !formData.gstregisteredaddressline
          }
          helperText={
            focusedField === 'gstregisteredaddressline' &&
            !formData.gstregisteredaddressline
              ? 'GSTRegisteredAddress is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="MSME Reg No."
          name="msmeRegNo"
          placeholder="Enter MSME Reg No."
          value={formData.msmeRegNo}
          onChange={handleFieldChange}
          required={true}
          onFocus={() => setFocusedField('msmeRegNo')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'msmeRegNo' && !formData.msmeRegNo}
          helperText={
            focusedField === 'msmeRegNo' && !formData.msmeRegNo
              ? 'MSME Reg No. is required'
              : ''
          }
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}></Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewSelectOption
          label={
            <>
              Country
              <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="countryId1"
          value={formData.countryId1}
          onChange={(e) => handleFieldChange(e)}
          options={countries.map((country) => ({
            label: country.name,
            value: country.id,
          }))}
          style={{ color: 'blue' }}
          className="my-custom-select"
          // error={!!errors.zone}
          // helperText={errors.zone}
          onFocus={() => setFocusedField('countryId1')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'countryId1' && !formData.countryId1}
          helperText={
            focusedField === 'countryId1' && !formData.countryId
              ? 'countryId1'
              : ''
          }
          sx={{ maxWidth: '100%', background: 'white' }}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewSelectOption
          label={
            <>
              State
              <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="state1"
          value={formData.state1}
          onChange={(e) => handleFieldChange(e)}
          options={state.map((st) => ({
            label: st.name,
            value: st.id,
          }))}
          style={{ color: 'blue' }}
          className="my-custom-select"
          // error={!!errors.zone}
          // helperText={errors.zone}
          onFocus={() => setFocusedField('state1')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'state1' && !formData.state}
          helperText={
            focusedField === 'state1' && !formData.state
              ? 'state'
              : 'state is required'
          }
          sx={{ maxWidth: '100%', background: 'white' }}
        />
      </Grid>
      <Grid item lg={6} md={4} sm={6} xs={12}></Grid>

      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="City"
          name="city1"
          placeholder=" Enter City"
          value={formData.city1}
          required={true}
          onFocus={() => setFocusedField('city')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'city1' && !formData.city1}
          helperText={
            focusedField === 'city1' && !formData.city1
              ? ' City is required'
              : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="Pincode"
          name="pincode"
          placeholder=" Enter Pincode"
          value={formData.pincode}
          required={true}
          onFocus={() => setFocusedField('pincode')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'pincode' && !formData.pincode}
          helperText={
            focusedField === 'pincode' && !formData.pincode
              ? ' Pincode is required'
              : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Payment Terms
        </Typography>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="SFA"
          name="sfa"
          placeholder=" Enter SFA"
          value={formData.sfa}
          required={true}
          onFocus={() => setFocusedField('sfa')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'sfa' && !formData.sfa}
          helperText={
            focusedField === 'sfa' && !formData.sfa ? ' SFA is required' : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <NewTextField
          label="Days"
          name="days"
          placeholder=" Enter Days"
          value={formData.days}
          required={true}
          onFocus={() => setFocusedField('days')}
          onBlur={() => setFocusedField(null)}
          error={focusedField === 'days' && !formData.days}
          helperText={
            focusedField === 'days' && !formData.days ? ' Days is required' : ''
          }
          onChange={handleFieldChange}
        />
      </Grid>
    </Grid>
  );
};

export default VendorBasic;
