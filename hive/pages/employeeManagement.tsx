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
import { Grid } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import { isTemplateExpression } from 'typescript';
import { ApiService } from '../services/api.service';
import { ApiService1 } from '../services/api1.service';

export interface ListProps {
  id?: string;
  name?: string;
  isSort?: boolean;
  isFilter?: boolean;
  isFrozen?: boolean;
  isPinned?: boolean;
  isVisible?: boolean;
}

const EmployeeManagement = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patchData, setPatchData] = useState<string[]>([]);

  const apiservice = new ApiService();
  const apiservice1 = new ApiService1();

  const fetchData = async () => {
    try {
      console.log('function called');
      const response = await apiservice.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/client/employees'
      );
      console.log('employee get', response.data);
      const newData = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        contactNumber: item.contactNo,
        phone: item.contactNumber,
        code: item.code,
        designation: item?.designation?.name,
        department: item?.department?.name,
        stateId: item.address ? item.address.stateId : '',
        address: item.address ? item.address.countryId : '',
        city: item.address ? item.address.city : '',
        pincode: item.address ? item.address.pincode : '',
      }));

      if (newData) {
        setData(newData);
        // alert(JSON.stringify(newData));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // Rest of your useEffect logic
    setColumn([
      {
        id: 'id',
        name: 'Id',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: false,
      },
      {
        id: 'name',
        name: 'name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: false,
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
        id: 'contactNumber',
        name: 'Contact Number',
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
        id: 'department',
        name: 'Department',
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
        id: 'city',
        name: 'City',
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
        id: 'actions',
        name: 'Actions',
        isSort: true,
        isFilter: true,
        isPinned: false,
        isVisible: true,
      },
    ]);
  }, []);

  const handlePatch = async (rowId: any) => {
    // const formData = JSON.stringify({id:id,body: patchData})
    const id = rowId;
    const body = [
      {
        op: 'replace',
        path: 'name',
        value: 'anuj@',
      },
    ];

    console.log('editingData>>><<<<', patchData, rowId, 'body>>', body);
    const formData = new FormData();
    formData.append('id', id);
    formData.append('body', JSON.stringify(patchData));

    try {
      const response = await apiservice1.patchData(
        `http://20.219.172.254/hiveconnect/accounts/client/employees`,
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
    router.push('/employeeForm');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  console.log('data', page, rowsPerPage, filters);
  return (
    <div>
      <MainLayout>
        <>
          <Grid
            container
            className="outlet_header box_shadow"
            sx={{ borderRadius: '5px' }}
          >
            <Grid item lg={9} md={9}>
              <p style={{ fontSize: '14px' }}>
                <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>Home</span>
                </Link>{' '}
                / Employee Master
              </p>
              <h3>Employee</h3>
            </Grid>
            <Grid item lg={3} md={3} sx={{ position: 'relative' }}>
              <CustomButton
                onClick={handleClick}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  position: 'absolute',
                  bottom: '15px',
                  height: '50px',
                  right: '10px',
                  '&:hover': {
                    backgroundColor: '#ff6b00', // Change this to the desired hover color
                  },
                }}
              >
                Add Employee
              </CustomButton>
            </Grid>
          </Grid>
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
            // setPatchData={setPatchData}
          />
        </>
      </MainLayout>
    </div>
  );
};

export default EmployeeManagement;
