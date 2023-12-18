// // Import necessary modules and components
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Box, Stack, Alert, Grid } from '@mui/material';

// import MainLayout from './MainLayout';
// import Link from 'next/link';
// import NewTextField from '../../components/NewTextField/NewTextField';
// import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
// import { useRouter } from 'next/navigation';
// import MainHeader from './MainHeader';
// import Address from '../../components/Address/Address';
// // import Code from '../../components/Code/Code';
// import { ApiService } from 'hive/services/api.service';
// import CustomButton from 'components/CustomButton/CustomButton';

// // Define your component
// const WarehouseForm: React.FC = () => {
//   // Define your initial form state
//   const initialFormData = {
//     warehouseName: '',
//     warehouseCode: '',
//     legalName: '',
//     gstNumber: '',
//     contactName: '',
//     contactNo: '',
//     email: '',
//     zone: '',
//     state: '',
//     city: '',
//     country:'',
//     address1: '',
//     address2: '',
//     pincode: '',
//     zipCode: '', // Add this line
//   };
//   interface FormData {
//     Vendor: string;
//     zipCode: string;
//     warehouseName: string;
//     warehouseCode: string;
//     legalName: string;
//     gstNumber: string;
//     contactName: string;
//     contactNo: string;
//     email: string;
//     zone: string;
//     state: string;
//     city: string;
//     country: string;
//     address1: string;
//     address2: string;
//     pincode: string;

//   }

//   interface FormErrors {
//     warehouseName?: string;
//     warehouseCode?: string;
//     legalName?: string;
//     gstNumber?: string;
//     contactName?: string;
//     contactNo?: string;
//     email?: string;
//     zone?: string;
//     state?: string;
//     city?: string;
//     country?:string;
//     address1?: string;
//     address2?: string;
//     pincode?: string;

//   }

//   type CustomChangeEvent =
//     | React.ChangeEvent<HTMLInputElement>
//     | { target: { name: string; value: string } };

//   // Initialize state variables
//   const [formData, setFormData] = useState<FormData>(initialFormData);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [showAlert, setShowAlert] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const router = useRouter();

//   // Define your list of countries, cities, and zones
//   const countries = [
//     'India',
//     'United States',
//     'Canada',
//     'United Kingdom',
//     'Australia',
//     // Add more countries as needed
//   ];

//   const cities = [
//     'New York',
//     'Los Angeles',
//     'Chicago',
//     'Houston',
//     'Phoenix',
//     // Add more cities as needed
//   ];

//   const zones = [
//     'Zone A',
//     'Zone B',
//     'Zone C',
//     'Zone D',
//     'Zone E',
//     // Add more zones as needed
//   ];

//   const vendorOptions = [
//     { label: 'PMI', value: 'PMI' },
//     { label: 'ADM', value: 'ADM' },
//     { label: 'Vendor', value: 'Vendor' },
//     // ... add more vendors as needed
//   ];

//   // Function to handle form field changes
//   // Function to handle form field changes
//   const handleFieldChange = (e: CustomChangeEvent) => {
//     const { name, value } = 'target' in e ? e.target : { name: '', value: '' };
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     // Add validation or other logic here if needed
//   };

//   // Function to validate GST number
//   const validateGSTNumber = (gstNumber: string) => {
//     let errorMessage = '';
//     if (gstNumber.length !== 15) {
//       errorMessage = 'GST number must be exactly 15 digits';
//     }

//     setErrors((prevState) => ({ ...prevState, gstNumber: errorMessage }));
//   };

//   // Function to check if the form is valid
//   const isFormValid = () => {
//     // Check whether mandatory fields are filled
//     const mandatoryFields = [
//       'warehouseName',
//       'warehouseCode',
//       'legalName',
//       'gstNumber',
//       'contactName',
//       'contactNo',
//       'email',

//       'state',
//       'city',
//       'country',

//       'pincode',
//     ] as const;

//     for (const field of mandatoryFields) {
//       if (!formData[field]) {
//         return false;
//       }
//     }

//     // Additional validation logic here (e.g., GST number format, pin code validation)

//     return true;
//   };

//   // Function to handle form submission
//   // const handleSave = () => {
//   //   if (isFormValid()) {
//   //     // Perform form submission logic here
//   //     setShowAlert(true);
//   //     // Reset the form if needed
//   //     setFormData(initialFormData);
//   //   } else {
//   //     // Display an error message for missing fields
//   //     alert('Please fill in all mandatory fields.');
//   //   }
//   // };

// // In WarehouseForm component

// const handleSave = async () => {
//   const data= {
//     name: formData.warehouseName,
//     code: formData.warehouseCode,
//     contactName: formData.contactName,
//     contactNo: formData.contactNo,
//     emailAddress: formData.email,
//     legalName:formData.legalName,
//     address: {
//       // isDeleted: true,
//       name: formData.contactName,
//       stateId: formData.state,
//       countryId: formData.country,
//       city: formData.city,
//       pincode: formData.pincode,
//     },
//     wareHouseType: {
//       id: 'AB2BE927-B2F8-4A0D-9126-389D00518832',
//       name: 'warehouseType'
//     },
//     status: 2,
//   };
//   console.log("Warehouse Data", data)
//   // eslint-disable-next-line no-constant-condition
//   if (true) {
//     try {
//       // Create an instance of ApiService and call postData
//       const apiService = new ApiService();
//       const responseData = await apiService.postData('hiveconnect/configuration/WareHouse', formData);

//       console.log('Data saved successfully:', responseData);
//       setShowAlert(true);
//       setFormData(initialFormData); // Reset form if needed

//       // Optional: Notify Warehousecom to refresh data
//       // This depends on how you handle state updates across components.
//     } catch (error) {
//       console.error('Error saving data:', error);
//       // Handle error, show user feedback
//     }
//   }
// };

//   const handleBack = () => {
//     router.push('/warehouse');
//   };

//   const buttonStyle = {
//     backgroundColor: 'orange', // Orange background
//     color: 'white', // White text
//     border: 'none', // No border
//     padding: '10px 20px', // Padding for button size
//     margin: '0 10px', // Margin for spacing
//     cursor: 'pointer', // Cursor to indicate it's clickable
//     borderRadius: '5px', // Rounded corners
//   };

//   return (
//     <MainLayout>
//       <>
//         <MainHeader pageTitle={'Warehouse'} showAlert={showAlert}>
//           <p style={{ fontSize: '14px', fontWeight: 400 }}>
//             <Link href="/dashboard" style={{ textDecoration: 'none' }}>
//               <span>Home</span>
//             </Link>
//             <Link
//               href="/warehouse"
//               style={{ marginLeft: '5px', textDecoration: 'none' }}
//             >
//               <span>/ Warehouse Master</span>
//             </Link>
//           </p>
//         </MainHeader>
//         <Grid
//           sx={{
//             backgroundColor: 'white',
//             // padding: '1rem',
//             marginTop: '15px',
//             borderRadius: '5px',
//           }}
//         ></Grid>
//         {/* Your header section here */}
//         <Box
//           sx={{
//             backgroundColor: 'white',
//             padding: '1rem',
//             marginTop: '15px',
//             borderRadius: '5px',
//           }}
//         >
//           <h3>Basic Information</h3>

//           <Stack direction="row" spacing={3} sx={{ marginBottom: '1rem' }}>
//             <Stack sx={{ width: '25%' }} spacing={2} direction="column">
//             <NewTextField
//     name="warehouseCode"
//     label="Code"
//     placeholder=" Code"
//     required={true}
//     value={formData.warehouseCode}
//     onChange={handleFieldChange} // Use handleFieldChange here
//     // error={!!errors.warehouseCode}
//     // helperText={errors.warehouseCode}

//                 onFocus={() => setFocusedField('Code')}
//                 onBlur={() => setFocusedField(null)}
//                 error={
//                   focusedField === 'Code' && !formData.warehouseName
//                 }
//                 helperText={
//                   focusedField === 'Code' && !formData.warehouseName
//                     ? 'Code is required'
//                     : ''
//                 }
//   />

//             </Stack>

//             <Stack sx={{ width: '25%' }} spacing={2} direction="column">
//               <NewTextField
//                 name="warehouseName"
//                 label="Name"
//                 placeholder=" Name"
//                 value={formData.warehouseName}
//                 onChange={handleFieldChange}
//                 required={true}
//                 onFocus={() => setFocusedField('warehouseName')}
//                 onBlur={() => setFocusedField(null)}
//                 error={
//                   focusedField === 'warehouseName' && !formData.warehouseName
//                 }
//                 helperText={
//                   focusedField === 'warehouseName' && !formData.warehouseName
//                     ? 'warehouseName is required'
//                     : ''
//                 }
//               />
//             </Stack>

//             {/* GST Number */}
//             <Stack sx={{ width: '25%' }} spacing={2} direction="column">
//               <NewTextField
//                 name="legalName"
//                 label="Legal Name"
//                 placeholder="Legal Name"
//                 value={formData.legalName}
//                 onFocus={() => setFocusedField('Legal Name')}
//                 onBlur={() => setFocusedField(null)}
//                 onChange={(e) => {
//                   handleFieldChange(e);
//                   validateGSTNumber(e.target.value);
//                 }}
//                 required={true}
//                 error={ focusedField === 'Legal Name' && !formData.legalName}
//                 helperText={
//                   focusedField === 'Legal Name' && !formData.legalName
//                     ? 'Legal Name is required'
//                     : ''
//                 }
//                 // error={!!errors.laneCode}
//                 // helperText={errors.laneCode}
//               />
//             </Stack>
//           </Stack>

//           <h3>Address Information</h3>
//           <Address
//               handleFieldChange={handleFieldChange}
//               formData={formData}
//               setFocusedField={setFocusedField}
//               focusedField={focusedField}

//             />

//           <h3>Contact Information</h3>

//           <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">

//             <Stack sx={{ width: '25%' }} spacing={2} direction="column">
//               {/* Contact Name */}
//               <NewTextField
//                 name="contactName"
//                 label="Contact Name"
//                 placeholder="Contact Name"
//                 value={formData.contactName}
//                 onChange={handleFieldChange}
//                 required={true}
//                 onFocus={() => setFocusedField('contactName')}
//                 onBlur={() => setFocusedField(null)}
//                 error={focusedField === 'contactName' && !formData.contactName}
//                 helperText={
//                   focusedField === 'contactName' && !formData.contactName
//                     ? 'contactName is required'
//                     : ''
//                 }

//                 // error={!!errors.laneCode}
//                 // helperText={errors.laneCode}
//               />

//               {/* Contact Number */}
//             </Stack>

//             <Stack sx={{ width: '25%' }} spacing={2} direction="column">
//               <NewTextField
//                 name="contactNo"
//                 label="Contact No"
//                 placeholder=" Contact No"
//                 value={formData.contactNo}
//                 onChange={handleFieldChange}
//                 required={true}
//                 onFocus={() => setFocusedField('contactNo')}
//                 onBlur={() => setFocusedField(null)}
//                 error={focusedField === 'contactNo' && !formData.contactNo}
//                 helperText={
//                   focusedField === 'contactNo' && !formData.contactNo
//                     ? 'contactNo is required'
//                     : ''
//                 }

//                 // error={!!errors.laneCode}
//                 // helperText={errors.laneCode}
//               />
//               {/* Email */}
//             </Stack>

//             <Stack sx={{ width: '25%' }} spacing={2} direction="column">
//               <NewTextField
//                 name="email"
//                 label="Email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleFieldChange}
//                 required={true}
//                 onFocus={() => setFocusedField('email')}
//                 onBlur={() => setFocusedField(null)}
//                 error={focusedField === 'email' && !formData.email}
//                 helperText={
//                   focusedField === 'email' && !formData.email
//                     ? 'email is required'
//                     : ''
//                 }

//                 // error={!!errors.laneCode}
//                 // helperText={errors.laneCode}
//               />
//               {/* Zone */}
//             </Stack>

//           </Stack>

//           <h3>Allocation Vendor</h3>

//             <Stack direction="column" spacing={3} sx={{ marginBottom: '1rem' }}>
//   <Stack sx={{ width: '0%' }} spacing={2} direction="column">
//     {/* Vendor Dropdown */}
//     <NewSelectOption
//       name="Vendor"
//       label="Vendor"
//       value={formData.Vendor}
//       onChange={handleFieldChange}
//       required={true}
//       options={vendorOptions} // Pass the options to the dropdown
//       onFocus={() => setFocusedField('Vendor')}
//       onBlur={() => setFocusedField(null)}
//       error={focusedField === 'Vendor' && !formData.Vendor}
//       helperText={
//         focusedField === 'Vendor' && !formData.Vendor
//           ? 'Vendor is required'
//           : ''
//       }
//     />
//   </Stack>
// </Stack>

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '1rem' }}>

//             <CustomButton
//               className="saveButton"
//               type="button"
//               // onClick={() => setShowALert(true)}
//               onClick={handleSave}
//               sx={{
//                 border: '0.5px solid black',
//                 padding: '0.5rem 3rem',
//                 backgroundColor: 'gray',
//                 color: 'white',
//                 transition: 'background-color 0.3s', // Add a transition for a smooth background color change
//                 '&:hover': {
//                   backgroundColor: '#ff6b00', // Change this to the desired hover color
//                 },
//               }}
//               // disabled={!isSaveButtonEnabled}
//             >
//               Back
//             </CustomButton>
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <CustomButton
//               className="saveButton"
//               type="button"
//               // onClick={() => setShowALert(true)}
//               onClick={handleSave}
//               sx={{
//                 border: '0.5px solid black',
//                 padding: '0.5rem 3rem',
//                 backgroundColor: 'gray',
//                 color: 'white',
//                 transition: 'background-color 0.3s', // Add a transition for a smooth background color change
//                 '&:hover': {
//                   backgroundColor: '#ff6b00', // Change this to the desired hover color
//                 },
//               }}
//               // disabled={!isSaveButtonEnabled}
//             >
//               Save
//             </CustomButton>
//           </Box>

//           {showAlert && (
//             <Alert severity="success">
//               Your warehouse has been added to the list.
//             </Alert>
//           )}
//         </Box>
//       </>
//     </MainLayout>
//   );
// };

// export default WarehouseForm;

// Import necessary modules and components
'use client';
import React, { useState, useEffect } from 'react';
import { Box, Stack, Alert, Grid, Typography } from '@mui/material';
import MainLayout from './MainLayout';
import Link from 'next/link';
import NewTextField from '../../components/NewTextField/NewTextField';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import { useRouter } from 'next/navigation';
import MainHeader from './MainHeader';
import Address from '../../components/Address/Address';
import { ApiService } from '../services/api.service';
import CustomButton from '../../components/CustomButton/CustomButton';
import '../styles/style.css';

// Define your component
const WarehouseForm: React.FC = () => {
  // Define your initial form state
  const initialFormData = {
    warehouseName: '',
    // warehouseCode: '',
    legalName: '',
    contactName: '',
    contactNo: '',
    email: '',

    state: '',
    city: '',
    country: '',
    pincode: '',
    // Add this line
    address: '', // Add this line
    Vendor: '',
    warehouseType: '',
    // This will be used for vendor selection
  };
  interface FormData {
    warehouseName: string;
    legalName: string;
    contactName: string;
    contactNo: string;
    email: string;
    state: string;
    city: string;
    country: string;
    address: string;
    pincode: string;
    warehouseType: string; // Add this line for warehouse type
    Vendor: string;
  }

  interface FormErrors {
    warehouseName?: string;
    legalName?: string;
    contactName?: string;
    contactNo?: string;
    email?: string;
    state?: string;
    city?: string;
    country?: string;

    pincode?: string;
  }

  type CustomChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | { target: { name: string; value: string } };

  // Initialize state variables
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAlert, setShowAlert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [isVendorAllocationVisible, setIsVendorAllocationVisible] =
    useState(false);

  const handleVendorChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const newValue = e.target.value as string; // Cast value to string
    const name = e.target.name as keyof FormData; // Ensure name is a key of FormData

    setSelectedVendor(newValue); // Update selectedVendor state

    // Update formData state with the selected vendor
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue, // Ensure this matches the formData structure
    }));
  };

  const vendorOptions = [
    { label: 'PMI', value: 'PMI' },
    { label: 'ADM', value: 'ADM' },
    { label: 'Vendor', value: 'Vendor' },
    // ... add more vendors as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('function called');
        const apiservice = new ApiService();
        const response = await apiservice.fetchCountry(
          '/hiveconnect/configuration/LookUp/country'
        );
        console.log('response lookup', response.data);

        // Assuming response.data is an array of countries
        const formattedCountries = response.data.map(
          (country: { name: any; id: any }) => ({
            label: country.name, // replace 'name' with the actual property name in your data
            value: country.id, // replace 'id' with the actual property ID in your data
          })
        );
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('function called');
        const apiservice = new ApiService();
        const response = await apiservice.fetchstate(
          '/hiveconnect/configuration/LookUp/state'
        );
        console.log('response lookup', response.data);

        // Format state data for dropdown
        const formattedStates = response.data.map(
          (state: { name: any; id: any }) => ({
            label: state.name, // Adjust the property names according to your API response
            value: state.id,
          })
        );
        setStates(formattedStates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiservice = new ApiService();
        const response = await apiservice.fetchvendorlist(
          '/hiveconnect/accounts/accounts/vendor'
        );
        console.log('response lookup', response.data);

        // Assuming response.data is an array of vendors
        const formattedVendors = response.data.map(
          (vendor: { name: any; id: any }) => ({
            label: vendor.name, // Adjust the property names according to your API response
            value: vendor.id,
          })
        );
        setVendorList(formattedVendors); // Update the vendor list state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleFieldChange = (e: CustomChangeEvent) => {
    const { name, value } = 'target' in e ? e.target : { name: '', value: '' };
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Add validation or other logic here if needed
  };

  // Function to validate GST number
  const validateGSTNumber = (gstNumber: string) => {
    let errorMessage = '';
    if (gstNumber.length !== 15) {
      errorMessage = 'GST number must be exactly 15 digits';
    }

    setErrors((prevState) => ({ ...prevState, gstNumber: errorMessage }));
  };
  // Function to check if the form is valid
  const isFormValid = () => {
    // Check whether mandatory fields are filled
    const mandatoryFields = [
      'warehouseName',
      'legalName',
      'contactName',
      'contactNo',
      'email',
      'state',
      'city',
      'country',
      'pincode',
    ] as const;

    for (const field of mandatoryFields) {
      if (!formData[field]) {
        return false;
      }
    } // Additional validation logic here (e.g., GST number format, pin code validation)

    return true;
  };

  // In WarehouseForm component
  const apiService = new ApiService();

  const handleSave = async () => {
    const data = {
      // id: "0c0e0cd9-9c6a-40c7-b05c-9856b39c101c",
      name: formData.warehouseName,
      contactName: formData.contactName,
      contactNo: formData.contactNo,
      emailAddress: formData.email,
      legalName: formData.legalName,
      code: 'code',
      status: 1,
      address: {
        // isDeleted: true,
        name: formData.address,
        stateId: formData.state,
        countryId: formData.country,
        city: formData.city,
        pincode: formData.pincode,
        // status:0,

        // Vendor: formData.Vendor,
      },
      wareHouseType: {
        id: '020a7332-c28a-41f7-89a4-a680166c3fa6',
        name: 'string',
        status: 0,
      },
    };
    console.log('Warehouse Data', data);
    // eslint-disable-next-line no-constant-condition
    if (true) {
      try {
        // Create an instance of ApiService and call postData

        const responseData = await apiService.postDatawareHouse(
          '/hiveconnect/configuration/WareHouse',
          data
        );

        console.log('Data saved successfully:', responseData);
        if (responseData.statusCode === 200) {
          router.push('/warehouse');
        }
        setShowAlert(true);
        setFormData(initialFormData); // Reset form if needed
      } catch (error) {
        console.error('Error saving data:', error);
        // Handle error, show user feedback
      }
    }
  };
  const handleBack = () => {
    router.push('/warehouse');
  };

  const buttonStyle = {
    backgroundColor: 'orange', // Orange background
    color: 'white', // White text
    border: 'none', // No border
    padding: '10px 20px', // Padding for button size
    margin: '0 10px', // Margin for spacing
    cursor: 'pointer', // Cursor to indicate it's clickable
    borderRadius: '5px', // Rounded corners
  };

  return (
    <MainLayout>
      <MainHeader pageTitle={'Warehouse'} showAlert={showAlert}>
        <Typography
          className="text-dark"
          sx={{ fontSize: '14px', fontWeight: 400 }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Typography component="span" className="beradcrumb-text">
              Home
            </Typography>
          </Link>
          <Link
            href="/warehouse"
            style={{ marginLeft: '5px', textDecoration: 'none' }}
          >
            <Typography component="span" className="beradcrumb-text">
              / Warehouse Master
            </Typography>
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
                Warehouse Information
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewSelectOption
                name="warehouseType" // Change this to warehouseType
                label="Warehouse Type"
                value={formData.warehouseType}
                onChange={handleFieldChange}
                required={true}
                options={vendorOptions} // You need to define this list
                sx={{ width: '100%' }}
                onFocus={() => setFocusedField('warehouseType')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'Vendor' && !formData.Vendor}
                helperText={
                  focusedField === 'Vendor' && !formData.Vendor
                    ? 'Type is required'
                    : ''
                }
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewTextField
                name="warehouseName"
                label="Name"
                placeholder=" Name"
                value={formData.warehouseName}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('warehouseName')}
                onBlur={() => setFocusedField(null)}
                error={
                  focusedField === 'warehouseName' && !formData.warehouseName
                }
                helperText={
                  focusedField === 'warehouseName' && !formData.warehouseName
                    ? 'warehouseName is required'
                    : ''
                }
              />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <NewTextField
                name="legalName"
                label="Legal Name"
                placeholder="Legal Name"
                value={formData.legalName}
                onFocus={() => setFocusedField('Legal Name')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => {
                  handleFieldChange(e);
                  validateGSTNumber(e.target.value);
                }}
                required={true}
                error={focusedField === 'Legal Name' && !formData.legalName}
                helperText={
                  focusedField === 'Legal Name' && !formData.legalName
                    ? 'Legal Name is required'
                    : ''
                }
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography
                component="h3"
                variant="h3"
                className="h3"
                sx={{ mt: '25px' }}
              >
                Warehouse Contact Information
              </Typography>
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <NewTextField
                name="contactName"
                label="Contact Name"
                placeholder="Contact Name"
                value={formData.contactName}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('contactName')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'contactName' && !formData.contactName}
                helperText={
                  focusedField === 'contactName' && !formData.contactName
                    ? 'contactName is required'
                    : ''
                }
              />
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <NewTextField
                name="contactNo"
                label="Contact No"
                placeholder=" Contact No"
                value={formData.contactNo}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('contactNo')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'contactNo' && !formData.contactNo}
                helperText={
                  focusedField === 'contactNo' && !formData.contactNo
                    ? 'contactNo is required'
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                sx={{
                  // padding: '20px',
                  //border: `1px solid ${validationStatus.additionalField ? 'gray' : 'red'}`,
                  borderRadius: '5px',
                  marginBottom: '8px',
                }}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <NewTextField
                name="email"
                label="Email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFieldChange}
                required={true}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'email' && !formData.email}
                helperText={
                  focusedField === 'email' && !formData.email
                    ? 'email is required'
                    : ''
                }
              />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}></Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <NewSelectOption
                label={
                  <>
                    Country
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
                name="country"
                value={formData?.country}
                onChange={(e) =>
                  handleFieldChange({
                    target: { name: 'country', value: e.target.value },
                  })
                }
                options={countries} // Use the state variable here
                className="my-custom-select"
                onFocus={() => setFocusedField('country')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'country' && !formData.country}
                helperText={
                  focusedField === 'country' && !formData.country
                    ? 'Country is required'
                    : ''
                }
                style={{
                  borderRadius: '5px',
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
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
                options={states} // Use the state variable here
                className="my-custom-select"
                onFocus={() => setFocusedField('state')}
                onBlur={() => setFocusedField(null)}
                error={focusedField === 'state' && !formData.state}
                helperText={
                  focusedField === 'state' && !formData.state
                    ? 'State is required'
                    : ''
                }
                style={{ borderRadius: '5px', width: '100%' }}
              />
            </Grid>
            <Grid lg={6} md={6} sm={12} xs={12}></Grid>
            <Grid item lg={3} md={6} sm={12} xs={12}>
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
            <Grid item lg={3} md={6} sm={12} xs={12}>
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
                  // padding: '25px',
                  //border: `1px solid ${validationStatus.pincode ? 'gray' : 'red'}`,
                  borderRadius: '5px',
                }}
              />
            </Grid>
            {formData.warehouseType === 'Vendor' && (
              <>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography
                    component="h3"
                    variant="h3"
                    className="h3"
                    sx={{ mt: '25px' }}
                  >
                    Allocation Vendor
                  </Typography>
                </Grid>
                <Grid item lg={3} md={6} sm={12} xs={12}>
                  <NewSelectOption
                    name="Vendor" // This should match the key in your formData state
                    label="Vendor"
                    value={formData.Vendor}
                    onChange={handleVendorChange}
                    required={true}
                    options={vendorList}
                    sx={{ width: '41%' }}
                    onFocus={() => setFocusedField('Vendor')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'Vendor' && !formData.Vendor}
                    helperText={
                      focusedField === 'Vendor' && !formData.Vendor
                        ? 'Vendor is required'
                        : ''
                    }
                  />
                </Grid>
              </>
            )}
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ textAlign: 'right' }}
            >
              <CustomButton
                type="button"
                // onClick={() => setShowALert(true)}
                onClick={handleSave}
                className="saveButton btn btn-black"
                // disabled={!isSaveButtonEnabled}
              >
                Save
              </CustomButton>
              <CustomButton
                className="btn btn-outline"
                variant="outlined"
                sx={{ marginLeft: '10px' }}
                onClick={handleSave}
              >
                Back{' '}
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {showAlert && (
        <Alert severity="success">
          Your warehouse has been added to the list.
        </Alert>
      )}
    </MainLayout>
  );
};

export default WarehouseForm;
