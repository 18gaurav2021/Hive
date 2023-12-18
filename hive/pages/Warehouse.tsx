'use client';
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/fonts.css';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import { useRouter } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { ApiService } from '../services/api.service';
import TableComp from './TableComp';
import { ListProps } from './outlet';

const Warehouse = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      console.log('function called');
      const apiservice = new ApiService();
      const response = await apiservice.fetchData(
        'http://20.192.10.19:804/hiveconnect/configuration/wareHouse/getall'
      );
      console.log('response warehouse', response.data);

      const newData = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        emailAddress: item.emailAddress,
        code: item.code,
        contactName: item.contactName,
        contactNo: item.contactNo,
        city: item.city,
        wareHouseName: item.wareHouseName,
        legalName: item.legalName,
        stateId: item.address ? item.address.stateId : '',
        address: item.address ? item.address.countryId : '', // Update this line based on your new structure
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
        id: 'code',
        name: 'Code',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'contactNo',
        name: 'Contact No',
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
        id: 'stateId',
        name: 'State',
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
        id: 'emailAddress',
        name: 'Email',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'legalName',
        name: 'Legal Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'wareHouseName',
        name: 'Ware House Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'city',
        name: 'City',
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

  const handleClick = () => {
    console.log('warehouse');
    router.push('/warehouseForm');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  console.log('data', page, rowsPerPage, filters);
  return (
    <MainLayout>
      <Box className="white-box" sx={{ paddingBottom: '15px !important' }}>
        <Typography
          className="text-dark"
          sx={{ fontSize: '14px', fontWeight: 400 }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Typography component="span" className="beradcrumb-text">
              Home
            </Typography>
          </Link>{' '}
          / WareHouse Master
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h3"
            variant="h3"
            className="page-heading-text h3 text-dark"
          >
            Warehouse
          </Typography>
          <CustomButton onClick={handleClick} className="btn btn-black">
            Add Warehouse
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
      />
    </MainLayout>
  );
};

export default Warehouse;
