'use client';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  MenuItem,
  Stack,
  Autocomplete,
  Popover,
  Box,
} from '@mui/material';

import SearchBox from './SearchBox';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';
import { BiSort } from 'react-icons/bi';
// import "re-resizable/css/styles.css";

import Datepickercomponent from './Datepickercomponent';

import KeepMountedModal from './CustomModal';
import '../styles/appbar.scss';
import '../styles/global.css';

import CustomButton from '../../components/CustomButton/CustomButton';
import ListComp from './ListComp';
import { GiSettingsKnobs } from 'react-icons/gi';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { BsFunnel } from 'react-icons/bs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
// import { FaSnowflake, FaSun } from 'react-icons/fa';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// import 'react-resizable/css/styles.css';
import FilterPopover from '../../components/Popupfilter/FilterPopover';
import {getDictionary} from '../../getDictionary';
import { useParams } from '../../app/[lang]/ParamContext'

interface DataItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  pincode: string;
  startDate: string;
  [key: string]: any;
}

const Warehousecom = () => {

  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [lang, setLang] = useState<any>(null);


  const [data, setData] = useState<DataItem[]>([]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [selectedOption, setSelectedOption] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [pinnedColumn, setPinnedColumn] = useState(null);
  const [ShowGlobalHeader, setShowGlobalHeader] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [frozenColumns, setFrozenColumns] = useState<string[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<any>({}); // Change 'any' to the
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<DataItem | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [columnWidths, setColumnWidths] = useState<any>({});

  const [column2, setColumn2] = useState([
    { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned:false },
    { id: 'name', name: 'Name', isSort: true, isFilter: true, isFrozen: false, isPinned:false },
    {
      id: 'email',
      name: 'Email',
      isSort: true,
      isFilter: true,
      isFrozen: false,
      isPinned: false
    },
    {
      id: 'phone',
      name: 'Phone',
      isSort: true,
      isFilter: true,
      isFrozen: false,
      isPinned: false
    },
    {
      id: 'address',
      name: 'Address',
      isSort: true,
      isFilter: true,
      isFrozen: false,
      isPinned: false
    },
    {
      id: 'designation',
      name: 'Designation',
      isSort: true,
      isFilter: true,
      isFrozen: false,
      isPinned: false
    },
    {
      id: 'pincode',
      name: 'pincode',
      isSort: true,
      isFilter: true,
      isFrozen: false,
      isPinned: false
    },
    { id: 'actions', name: 'Actions', isSort: true, isFilter: true ,isPinned: false},
  ]);

  const [checked, setChecked] = useState<string[]>([]);
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (checked.includes(value)) {
      newChecked.splice(currentIndex, 1);
    } else {
      newChecked.push(value);
    }
    setChecked(newChecked);
    setVisibleColumns(newChecked);

    // console.log('checked', value)
    console.log('checked', newChecked);
  };

  console.log('564', column2);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const handleChangeRowsPerPage = (
    event: SelectChangeEvent<string>
  ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'id', name: 'Id' },
    { id: 'name', name: 'Name' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'address', name: 'Address' },
    { id: 'designation', name: 'Designation' },
    { id: 'pincode', name: 'pincode' },
    { id: 'actions', name: 'Actions' },
  ];


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getDictionary(params.lang);
      setLang(result);  
      setIsLoading(false);
    };
  
    fetchData();
  }, [params.lang]);
console.log(lang,"lang");

  const getData = async () => {
    await axios
      .get('http://localhost:8000/employee')
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);


 




  const handleSearch = (searchTerm: string) => {
    setSearchInput(searchTerm);
    if (searchTerm) {
      const filteredData = data.filter((item) =>
        columns.some((column) => {
          const value = item[column.id];
          return (
            value &&
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
      setData(filteredData);
    } else {
      getData(); // Reset to the original data if the search term is empty.
    }
  };

  const applyFilter = () => {
    if (filters[selectedColumn]) {
      const filteredData = data.filter((item) =>
        String(item[selectedColumn])
          .toLowerCase()
          .includes(String(filters[selectedColumn]).toLowerCase())
      );
      setData(filteredData);
    } else {
      getData();
    }
    // setFilterDialogOpen(false);
    setAnchorEl(null);
  };
  const openFilterDialog = (columnId: React.SetStateAction<string>) => {
    setSelectedColumn(columnId);
    setFilterDialogOpen(true);
  };

  const handleSort = (columnId: string) => {
    const newData = [...data];
    const order =
      sort.field === columnId && sort.order === 'asc' ? 'desc' : 'asc';

    newData.sort((a, b) => {
      if (a[columnId] < b[columnId]) return order === 'asc' ? -1 : 1;
      if (a[columnId] > b[columnId]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setSort({ field: columnId, order });
    setData(newData);
  };

  const handleClick = () => {
    setShowGlobalHeader(!ShowGlobalHeader);
  };

  console.log('sorted column', visibleColumns);

  const handleDateSearch = (fromDate: Date | null, toDate: Date | null) => {
    if (fromDate && toDate) {
      const filteredData = data.filter((item) => {
        const startDate = new Date(item.startDate); // No error here after adding the DataItem interface
        return startDate >= fromDate && startDate <= toDate;
      });
      setData(filteredData);
    } else {
      getData(); // If dates are not selected properly, reset to original data
    }
  };

  const handleColumnSort = (value: { id: string; isSort: boolean }) => {
    const updatedData = column2.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          isSort: !value.isSort,
        };
      }
      return item;
    });
    setColumn2(updatedData);
  };

  const handleColumnFilter = (value: { id: string; isFilter: unknown }) => {
    const updatedData = column2.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          isFilter: !value.isFilter,
        };
      }
      console.log('item', item);
      return item;
    });
    setColumn2(updatedData);
    console.log(column2);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(column2);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumn2(items);
  };

  const startEditing = (id: number, currentData: DataItem) => {
    setEditingRowId(id);
    setEditingData(currentData);
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const saveEditing = (id: number) => {
    // Update the data with the edited values
    const newData = [...data];
    const index = newData.findIndex((item) => item.id === id);
    newData[index] = editingData;
    setData(newData);

    // Clear the editing state
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setEditingData({
      ...editingData,
      [id]: e.target.value,
    });
  };

  const deleteRow = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const toggleFrozen = (columnId: string) => {
    setFrozenColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  const toggleFrozenn = (columnId: any) => {
    if (frozenColumns.includes(columnId)) {
      // Column is currently frozen, unpin it
      setFrozenColumns(frozenColumns.filter((id) => id !== columnId));
      setPinnedColumn(null);
    } else {
      // Column is not frozen, ask for pinning options
      setPinnedColumn(columnId);
    }
  };
  const handlePinToLeft = () => {
    if (pinnedColumn) {
      const updatedColumn2 = [...column2];
      const index = updatedColumn2.findIndex(
        (column) => column.id === pinnedColumn
      );
      if (index !== -1) {
        const pinnedColumnData = updatedColumn2.splice(index, 1)[0];
  
        // Find the last pinned column's index
        let lastPinnedIndex = updatedColumn2.findIndex(
          (column) => column.isPinned
        );
        // If no pinned columns, set the index so that the column is placed right after the ID column
        if (lastPinnedIndex === -1) {
          lastPinnedIndex = 0; // Assuming the ID column is at index 0
        } else {
          // Find the very last pinned column
          while (lastPinnedIndex + 1 < updatedColumn2.length && updatedColumn2[lastPinnedIndex + 1].isPinned) {
            lastPinnedIndex++;
          }
        }
  
        // Insert the pinned column just after the last pinned column
        updatedColumn2.splice(lastPinnedIndex + 1, 0, { ...pinnedColumnData, isPinned: true });
  
        setColumn2(updatedColumn2);
        setPinnedColumn(null);
      }
    }
  };
  

  const handlePinToRight = () => {
    if (pinnedColumn) {
      const updatedColumn2 = [...column2];
      const index = updatedColumn2.findIndex(
        (column) => column.id === pinnedColumn
      );
  
      if (index !== -1) {
        const [pinnedColumnData] = updatedColumn2.splice(index, 1);
  
        // Find the index of the "Actions" column
        const actionsIndex = updatedColumn2.findIndex(
          (column) => column.id === 'actions'
        );
  
        // Find the insertion point which is right before the "Actions" column
        // but after any previously pinned columns
        let insertionPoint = actionsIndex;
        while (insertionPoint > 0 && updatedColumn2[insertionPoint - 1].isPinned) {
          insertionPoint--;
        }
  
        // Insert the pinned column at the insertion point
        updatedColumn2.splice(insertionPoint, 0, { ...pinnedColumnData, isPinned: true });
  
        // Update the columns array and reset the pinned column
        setColumn2(updatedColumn2);
        setPinnedColumn(null);
      }
    }
  };
  const openFilterPopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    columnId: string
  ) => {
    setSelectedColumn(columnId);
    setAnchorEl(event.currentTarget);
    console.log('458', event.currentTarget);
  };

  const closeFilterPopover = () => {
    setAnchorEl(null);
  };


  const getTranslation = (key: string, lang: any) => {
    const keys = key.split('.');
    let value = lang;
    
    for (const k of keys) {
        if (typeof value !== 'object' || value === null) return key; // Ensure value is an object and not null
        value = value[k];
        if (!value) return key; // Fallback to key if not found
    }
  
    return value;
};





  return (
    <Box sx={{backgroundColor: 'white',margin:'20px 0px 10px 0px', padding: '0px 15px 0px 15px', borderRadius: '5px',}} className='box_shadow'>
      <div>
        <Datepickercomponent
          onSearch={handleDateSearch}
          disabled={ShowGlobalHeader}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchBox onSearch={handleSearch} isdisabled={ShowGlobalHeader} />
        <div>
          <IconButton onClick={() => setOpen(true)} disabled={ShowGlobalHeader}>
            {/* <FcDataConfiguration /> */}
            <GiSettingsKnobs />
          </IconButton>
          <CustomButton
            onClick={handleClick}
            variant="contained"
            sx={{ height: '40px', marginLeft: '20px' }}
          >
            {ShowGlobalHeader ? 'Show' : 'Hide'}
          </CustomButton>
        </div>
      </div>

      {/* Grid Section */}

      <div
        style={{ textAlign: 'center', overflowX: 'auto', marginTop: '10px' }}
      >
        <Paper>
          <TableContainer
            style={{
              maxWidth: '100%',
              height: '500px',
              overflowY: 'auto',
              overflowX: 'auto',
            }}
          >
            <Table style={{ minWidth: 'max-content', tableLayout: 'auto' }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="columns" direction="horizontal">
                  {(provided) => (
                    <TableHead
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <TableRow>
                        {column2.map((column, index) =>
                          visibleColumns.includes(column.id) ? (
                            !frozenColumns.includes(column.id) &&
                            column.id !== 'id' &&
                            column.id !== 'actions' ? (
                              <Draggable
                                key={column.id}
                                draggableId={column.id}
                                index={index}
                              >
                                {(provided) => (
                                  <TableCell
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    //  style={{ fontWeight: "bold", textAlign: 'center', fontSize: "17px", color: "rgba(0, 0, 0, 0.54)" }}

                                    key={column.id}
                                    className={
                                      column.id === 'actions'
                                        ? 'actionsColumn'
                                        : column.id === 'id'
                                        ? 'idColumn'
                                        : ''
                                    }
                                    style={{
                                      ...provided.draggableProps.style,
                                      // spread the styles to keep the existing styles

                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: '17px',
                                      color: 'rgba(0, 0, 0, 0.54)',
                                      position:
                                        column.id === 'id' ||
                                        column.id === 'actions'
                                          ? 'sticky'
                                          : 'unset',
                                      top: 0,
                                      zIndex: 1,
                                      backgroundColor: '#fff',

                                      // To cover the content when scrolling
                                    }}
                                  >
                                    {column.isSort &&
                                      column.id !== 'actions' && (
                                        <IconButton
                                          onClick={() => handleSort(column.id)}
                                        >
                                          {sort.field === column.id ? (
                                            sort.order === 'asc' ? (
                                              <BiSortUp />
                                            ) : (
                                              <BiSortDown />
                                            )
                                          ) : (
                                            <BiSort />
                                          )}
                                        </IconButton>
                                      )}
                                   
                                      {getTranslation(`form.${column.name}`, lang)}
                                    {column.isFilter &&
                                      column.id !== 'actions' && (
                                        <IconButton
                                          onClick={(e) =>
                                            openFilterPopover(e, column.id)
                                          }
                                          style={{ float: 'right' }}
                                        >
                                          <BsFunnel />
                                        </IconButton>
                                      )}
                                  </TableCell>
                                )}
                              </Draggable>
                            ) : (
                              <TableCell
                                key={column.id}
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  fontSize: '17px',
                                  color: 'rgba(0, 0, 0, 0.54)',
                                  position: 'sticky',
                                  zIndex: 1,
                                  left: column.id === 'id' ? 0 : 'auto',
                                  right: column.id === 'actions' ? 0 : 'auto',
                                  backgroundColor: '#fff',
                                }}
                              >
                                {(column.isSort || column.id === 'id') &&
                                  column.id !== 'actions' && (
                                    <IconButton
                                      onClick={() => handleSort(column.id)}
                                    >
                                      {sort.field === column.id ? (
                                        sort.order === 'asc' ? (
                                          <BiSortUp />
                                        ) : (
                                          <BiSortDown />
                                        )
                                      ) : (
                                        <BiSort />
                                      )}
                                    </IconButton>
                                  )}
                                 {getTranslation(`form.${column.name}`, lang)}

                                {(column.isFilter || column.id === 'id') &&
                                  column.id !== 'actions' && (
                                    <IconButton
                                      onClick={(e) =>
                                        openFilterPopover(e, column.id)
                                      }
                                    >
                                      <BsFunnel />
                                    </IconButton>
                                  )}
                              </TableCell>
                            )
                          ) : null
                        )}
                        {provided.placeholder}
                      </TableRow>
                    </TableHead>
                  )}
                </Droppable>

                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((row, index) => (
                    <TableRow key={index}>
                      {column2.map((column) =>
                        visibleColumns.includes(column.id) ? (
                          <TableCell
                            key={column.id}
                            style={{
                              position:
                                column.id === 'id' || column.id === 'actions'
                                  ? 'sticky'
                                  : 'unset',
                              zIndex: 1,
                              left: column.id === 'id' ? 0 : 'auto',
                              right: column.id === 'actions' ? 0 : 'auto',
                              backgroundColor: '#fff',
                            }}
                          >
                            {editingRowId === row.id ? (
                              column.id === 'actions' ? (
                                <>
                                  <IconButton
                                    onClick={() => saveEditing(row.id)}
                                  >
                                    <SaveIcon />
                                  </IconButton>
                                  <IconButton onClick={cancelEditing}>
                                    <CancelIcon />
                                  </IconButton>
                                </>
                              ) : (
                                <input
                                  type="text"
                                  defaultValue={row[column.id]}
                                  onChange={(e) =>
                                    handleInputChange(e, column.id)
                                  }
                                  style={{
                                    width: '100%', // Make input take full width of cell
                                    padding: '8px', // Add some padding
                                    boxSizing: 'border-box', // Ensure padding doesn't affect width
                                  }}
                                />
                              )
                            ) : column.id === 'actions' ? (
                              <>
                                <IconButton
                                  className="edit-button"
                                  onClick={() => startEditing(row.id, row)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  className="view-button"
                                  onClick={() => {
                                    setSelectedUser(row);
                                    setViewModalOpen(true);
                                  }}
                                >
                                  <VisibilityIcon />
                                </IconButton>

                                <IconButton
                                  className="delete-button"
                                  onClick={() => {
                                    setDeletingRowId(row.id);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : (
                              lang ? lang.form[row[column.id]] || row[column.id] : row[column.id] // This line handles the translations
                          )}
                          </TableCell>
                        ) : null
                      )}
                    </TableRow>
                  ))}
                </TableBody>

                <Dialog
                  className="user-modal"
                  open={viewModalOpen}
                  onClose={() => setViewModalOpen(false)}
                >
                  <DialogTitle className="centered-title">
                  {lang ? lang.form.userinfo: 'Loading...'}
                  </DialogTitle>


                  <DialogContent>
                    {selectedUser ? (
                      <div>
                      <p>
                          <strong>{getTranslation('form.Id', lang) || 'Loading...'}:</strong> {selectedUser.id}
                      </p>
                      <p>
                          <strong>{getTranslation('form.Name', lang) || 'Loading...'}:</strong>  {getTranslation(`form.${selectedUser.name}`, lang) || selectedUser.name}
                      </p>
                      <p>
                          <strong>{getTranslation('form.Email', lang) || 'Loading...'}:</strong> {selectedUser.email}
                      </p>
                      <p>
                          <strong>{getTranslation('form.Phone', lang) || 'Loading...'}:</strong> {selectedUser.phone}
                      </p>
                      <p>
                          <strong>{getTranslation('form.Address', lang) || 'Loading...'}:</strong> {getTranslation(`form.${selectedUser.address}`, lang) || selectedUser.address}
                      </p>
                      <p>
                          <strong>{getTranslation('form.Designation', lang) || 'Loading...'}:</strong>  {getTranslation(`form.${selectedUser.designation}`, lang) || selectedUser.designation}
                      </p>
                      <p>
                          <strong>{getTranslation('form.pincode', lang) || 'Loading...'}:</strong> {selectedUser.pincode}
                      </p>
                      {/* Add more fields as needed */}
                  </div>
                    ) : null}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setViewModalOpen(false)}
                      color="primary"
                    >
                     {lang ? lang.form.close : 'Loading...'}
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={deleteDialogOpen}
                  onClose={() => setDeleteDialogOpen(false)}
                >
                  <DialogTitle> {getTranslation('form.ConfirmDelete', lang)}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    {lang ? lang.form.Delete : 'Loading...'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setDeleteDialogOpen(false)}
                      color="primary"
                    >
                     {lang ? lang.form.cancel : 'Loading...'}
                    </Button>
                    <Button
                      onClick={() => {
                        if (deletingRowId !== null) {
                          deleteRow(deletingRowId);
                          setDeleteDialogOpen(false);
                        }
                      }}
                      color="primary"
                    >
                      {lang ? lang.form.Yes : 'Loading...'}
                    </Button>
                  </DialogActions>
                </Dialog>
              </DragDropContext>
            </Table>
            <Pagination
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              totalCount={data.length}
            />
          </TableContainer>
        </Paper>

        <Dialog open={pinnedColumn !== null} onClose={() => setPinnedColumn(null)}>
  <DialogContent>
    <p> {lang ? lang.form.PinColumn: 'Loading...'}:</p>
    <Button onClick={handlePinToLeft}> {lang ? lang.form.PintoLeft: 'Loading...'}</Button>
    <Button onClick={handlePinToRight}> {lang ? lang.form.PintoRight: 'Loading...'}</Button>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setPinnedColumn(null)}>  {lang ? lang.form.cancel : 'Loading...'}</Button>
  </DialogActions>
</Dialog>


        <FilterPopover
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          selectedColumn={selectedColumn}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          filters={filters}
          setFilters={setFilters}
          data={data}
          applyFilter={applyFilter}
        />
        <KeepMountedModal open={open} setOpen={setOpen}>
          <ListComp
            ListArr={column2}
            handleColumnSort={handleColumnSort}
            handleColumnFilter={handleColumnFilter}
            handleToggle={handleToggle}
            checked={checked}
            frozenColumns={frozenColumns}
            toggleFrozen={toggleFrozen}
            toggleFrozenn={toggleFrozenn}
          />
        </KeepMountedModal>
      </div>
    </Box>
  );
};

export default  Warehousecom;
