'use client';
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/fonts.css';

import TableComp from './TableComp';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import { isTemplateExpression } from 'typescript';
import { ApiService } from '../services/api.service';

export interface ListProps {
  id?: string;
  name?: string;
  isSort?: boolean;
  isFilter?: boolean;
  isFrozen?: boolean;
  isPinned?: boolean;
  isVisible?: boolean;
}

const Outlet = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiservice = new ApiService();

  console.log('demo>??>', filters, searchInput);

  // const getData = async () => {
  //   const headers = { tenant: "HC_1" };
  //   try {
  //     const response = await axios.get('http://20.192.10.19:806/hiveconnect/requestmanagement/outlet/outlets', { headers });
  //     console.log( 'datatatat',response.data.data)

  //     console.log("data response", newData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchData = async () => {
    try {
      console.log('function called');
      const response = await apiservice.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/Outlet/Outlets'
      );

      const newData = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.emailAddress,
        contactNumber: item.contactNumber,
        phone: item.contactNumber,
        gpsCoordinates: item.gpsCoordinates,
        gpsLink: item.gpsLink,
        tseId: item.tseId,
        tmeId: item.tmeId,
        asmId: item.asmId,
        address: item.address ? item.address.countryId : '', // Update this line based on your new structure
        designation: item.designation, // Update this line based on your new structure
        pincode: item.address ? item.address.pincode : '', // Update this line based on your new structure
        // Add other fields based on your new structure
      }));

      if (newData) {
        setData(newData);
        // alert(JSON.stringify(newData)); // Show data in alert as JSON string
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately
    }
  };

  useEffect(() => {
    fetchData();

    // Rest of your useEffect logic
    setColumn([
      // { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned: false, isVisible: true },
      {
        id: 'name',
        name: 'Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'email',
        name: 'Email',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'phone',
        name: 'Phone',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'address',
        name: 'Address',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'designation',
        name: 'Designation',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'pincode',
        name: 'Pincode',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'contactName',
        name: 'Contact Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gpsCoordinates',
        name: 'GPS Coordinates',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gpsLink',
        name: 'GPS Link',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tseId',
        name: 'TSE ID',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tmeId',
        name: 'TME ID',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'asmId',
        name: 'ASM ID',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'actions',
        name: 'Actions',
        isSort: true,
        isFilter: true,
        isPinned: false,
        isVisible: true,
      },
    ]);
  }, []);

  const handlePatch = async (formData: any) => {
    // const formData = JSON.stringify({id:id,body: patchData})
    console.log('editingData>>><<<<', formData);

    debugger;
    try {
      // const config = {
      //   method: 'patch', // or 'POST', 'GET', etc.
      //   url: 'http://20.192.10.19:806/hiveconnect/requestmanagement/outlet/outlet',
      //   data: formData,
      //   headers: {
      //     'X-Custom-Header': 'SampleValue',
      //     'tenant': 'HC_1',
      //     'Content-Type': 'multipart/form-data', // Override the Content-Type here
      //   },
      // };
      // const response = await axios.patch(config);
      // console.log('function called',JSON.stringify(response));
      const response = await apiservice.patchData(
        `:806/hiveconnect/requestmanagement/outlet/outlet`,
        formData
      );
      if (response?.status == 200) {
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately
    }
  };

  const handleClick = () => {
    console.log('outlet');
    router.push('/outletForm');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  console.log('data', page, rowsPerPage, filters);
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
            Home
          </Link>{' '}
          / Outlet Master
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
          >
            Outlets
          </Typography>
          <CustomButton onClick={handleClick} className="btn btn-black">
            Add Outlet
          </CustomButton>
        </Box>
      </Box>
      <TableComp
        data={data}
        column2={column}
        setColumn2={setColumn}
        setSearchInput={setSearchInput}
        setSort={setSort}
        sort={sort}
        setFilters={setFilters}
        filters={filters}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        deleteRow={deleteRow}
        handlePatch={handlePatch}
        searchInput={searchInput}
      />
    </MainLayout>
  );
};

export default Outlet;
