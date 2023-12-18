// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { CiSearch } from 'react-icons/ci';
// import { FiSearch } from 'react-icons/fi';

// import InputAdornment from '@mui/material/InputAdornment';

// export interface SearchFieldProps{
//   isdisabled ?:boolean;
//   onSearch: (value:string) => void
// }
// const BasicTextFields: React.FC<SearchFieldProps>  = ({ onSearch, isdisabled }) =>{
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="standard-basic" label="Search" variant="standard" 
//         onChange={(e) => onSearch(e.target.value)} 
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               {/* <CiSearch /> */}
//               <FiSearch />
//             </InputAdornment>
//           ),
//         }}
//         disabled={isdisabled}
//       />
//     </Box>
//   );
// }
// export default BasicTextFields

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CiSearch } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';

import InputAdornment from '@mui/material/InputAdornment';

export interface SearchFieldProps{
  isdisabled ?:boolean;
  onSearch: (value:string) => void
  searchInput?: string
}
const BasicTextFields: React.FC<SearchFieldProps>  = ({ onSearch, isdisabled, searchInput }) =>{
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" placeholder="Search" variant="outlined" 
       value={searchInput}
        onChange={(e) => onSearch(e.target.value)} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <CiSearch /> */}
              <FiSearch />
            </InputAdornment>
          ),
        }}
        disabled={false}
      />
    </Box>
  );
}
export default BasicTextFields