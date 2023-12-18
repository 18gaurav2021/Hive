'use client';
import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import '../../styles/globals.css';
import '../../styles/style.css';
import '../../styles/fonts.css';

export interface VendorDocsProps {
  handleFieldChange?: any;
  formData?: any;
  setFocusedField?: any;
  focusedField?: any;
}

const VendorDocs: React.FC<{
  setWareHouse: Dispatch<SetStateAction<boolean>>;
  updateFormData: (data: object) => void; // Add the prop for updating form data
}> = ({}) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileNames: string[] = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      setUploadedDocuments(fileNames);
    }
  };

  const handleSave = () => {
    // Perform save logic specific to VendorDocs
    console.log('VendorDocs Save Logic');

    // Call updateFormData to update the overall form data in Addvendor
    updateFormData({ uploadedDocuments });
  };

  return (
    <Grid
      container
      rowSpacing={{ xs: 3, sm: 3, md: '20px' }}
      columnSpacing={{ xs: 2, sm: 3, md: '54px' }}
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography
          component="h3"
          variant="h3"
          className="h3"
          sx={{ mt: '20px' }}
        >
          Vendor Documents
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <input
          accept="image/*,application/pdf"
          // style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
          className="cust-file-upload"
        />
        {/* <label htmlFor="raised-button-file">
          <button type='button'> Upload Documents </button>
        </label> */}
        {uploadedDocuments.length > 0 && (
          <Typography variant="body2">
            Uploaded Documents: {uploadedDocuments.join(', ')}
          </Typography>
        )}
      </Grid>
      {/* <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Vendor Docs
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default VendorDocs;
function updateFormData(arg0: { uploadedDocuments: string[] }) {
  throw new Error('Function not implemented.');
}
