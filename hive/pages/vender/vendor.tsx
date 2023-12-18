'use client';
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/fonts.css';

import MainLayout from '../MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import CustomButton from '../../../components/CustomButton/CustomButton';
// import Vendorcom from './vender/vendorCom';
import axios from 'axios';
import TableComp from '../TableComp';
import { ApiService } from '../../services/api.service';
import { ListProps } from '../outlet';

const Vendor = () => {
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();
  const handleClick = () => {
    console.log('vendor');
    router.push('/addVendor');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const apiservice = new ApiService();
        const response = await apiservice.fetchData(
          `http://20.192.10.19:802/hiveconnect/Accounts/vendors`
        );
        console.log('response data vendor', response);

        const newData = response?.data?.list.map((item: any) => ({
          code: item.code,
          name: item.name,
          activityId: item.activityId,
          pocContactNumber: item.pocContactNumber,
          legalEntityName: item.legalEntityName,
          contactNumber: item.contactNumber,
          emailAddress: item.emailAddress,
          pocName: item.pocName,
          pocContactNum: item.pocContactNumber,
        }));

        console.log('data response before', newData);
        setData(newData);
        console.log('data response', newData);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    getData();
    setColumn([
      {
        id: 'code',
        name: 'Code',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'name',
        name: 'Vendor Name',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'activityId',
        name: 'Activity',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'legalEntityName',
        name: 'Legal Name',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'contactNumber',
        name: 'Contact No',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'emailAddress',
        name: 'Email Address',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'pocName',
        name: 'POC Name',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'pocContactNumber',
        name: 'POC Contact Num',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'actions',
        name: 'Actions',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
    ]);
  }, []);

  return (
    <div>
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
            / Vendor Master
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
              Vendor
            </Typography>
            <CustomButton onClick={handleClick} className="btn btn-black">
              Add Vendor
            </CustomButton>
          </Box>
        </Box>
        {/* <Vendorcom /> */}
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
    </div>
  );
};

export default Vendor;
