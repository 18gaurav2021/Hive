'use client';
import * as React from 'react';
import { memo } from 'react';

import { Typography,  Box } from '@mui/material';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReusableSelect from '../../components/ReusableSelect/ReusableSelect';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from './MainLayout';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/fonts.css';

const styleSpan = {};

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            border: 'none',
          },
        },
      },
    },
  },
});

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [createUser, setCreateUser] = React.useState('');
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log('values', newValue);
  };

  const handleCreatUser = (event: SelectChangeEvent) => {
    setCreateUser(event.target.value);
    if (event.target.value == 'Creat') {
      router.push('/createUser');
    }
    console.log('user', event.target.value);
  };

  return (
    <MainLayout>
      <Box className="white-box">
        <Typography component='p' className="m-0 text-dark" sx={{fontSize: '14px'}}>
          <Link href='/dashboard' style={{textDecoration: 'none'}}> Home </Link> / Dashboard
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px 0'}}>
          <Typography component='h3' variant='h3' className='h3 page-heading-text'>
            Dashboard
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  );
};
export default Dashboard;
