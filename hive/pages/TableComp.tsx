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
import { getDictionary } from '../../getDictionary';
import { useParams } from '../../app/[lang]/ParamContext';
import { ListProps } from './outlet';
import BasicTextFields from './SearchBox';

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

export interface TableProps {
  data: any[];
  column2: any[];
  setColumn2?: React.Dispatch<React.SetStateAction<ListProps[]>>;
  setSearchInput?: React.Dispatch<React.SetStateAction<string>>;
  setSort?: React.Dispatch<
    React.SetStateAction<{ field: string; order: string }>
  >;
  sort?: any;
  filters?: object;
  setFilters?: React.Dispatch<React.SetStateAction<Record<any, any>>>;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage?: number;
  setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  deleteRow?: any;
  handlePatch?: (patchData: any, id: any) => void;
  searchInput?: string;
}

const TableComp: React.FC<TableProps> = ({
  data,
  column2,
  setColumn2,
  setSearchInput,
  setSort,
  sort,
  filters,
  setFilters,
  deleteRow,
  handlePatch,
  searchInput,
}) => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [lang, setLang] = useState<any>(null);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColumnValue, setSelectedColumnValue] = useState<string>('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [pinnedColumn, setPinnedColumn] = useState(null);
  const [ShowGlobalHeader, setShowGlobalHeader] = useState<boolean>(true);
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
  const [patchData, setPatchData] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [page, setPage] = useState(0); // Start from the first page
  const [rowsPerPage, setRowsPerPage] = useState(10); //
  const indexOfFirstRow = page * rowsPerPage;
  const indexOfLastRow = indexOfFirstRow + rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  const handleToggle = (value: string, index: any) => () => {
    console.log('toggle>>>', value, index);

    const updatedItems = [...column2];

    // Update the object at the specified index
    updatedItems[index] = { ...updatedItems[index], isVisible: !value };
    setColumn2 && setColumn2(updatedItems);
  };

  console.log('564', column2);

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage && setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getDictionary(params.lang);
      setLang(result);
      setIsLoading(false);
    };

    fetchData();
  }, [params.lang]);
  console.log(lang, 'lang');

  const handleSearch = (searchTerm: string) => {
    //golbal search

    setSearchInput && setSearchInput(searchTerm);
  };

  const applyFilter = () => {
    console.log('fildata', {
      ...filters,
      [selectedColumn]: selectedColumnValue,
    });
    setFilters &&
      setFilters({ ...filters, [selectedColumn]: selectedColumnValue });
    setFilterDialogOpen(false);
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

    setSort && setSort({ field: columnId, order });
    // setData(newData);
  };

  const handleClick = () => {
    setShowGlobalHeader(!ShowGlobalHeader);
  };

  console.log('sorted column', visibleColumns);

  const handleDateSearch = (fromDate: Date | null, toDate: Date | null) => {
    console.log('date>>>>', fromDate, toDate);

    setFilters &&
      setFilters({ ...filters, fromDate: fromDate, toDate: toDate });
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
    setColumn2 && setColumn2(updatedData);
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
    setColumn2 && setColumn2(updatedData);
    console.log(column2);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(column2);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumn2 && setColumn2(items);
  };

  const startEditing = (id: number, currentData: DataItem) => {
    setEditingRowId(id);
    setEditingData(currentData);
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const saveEditing = async (id: string) => {
    // const formData = new FormData();
    // formData.append('id', id);
    // formData.append('body', JSON.stringify(patchData));
    // console.log('editingData>>>',patchData, id, formData)

    if (handlePatch) {
      handlePatch(patchData, id);
    }
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    // setEditingData({
    //   ...editingData,
    //   [id]: e.target.value,
    // });

    const updatedFields = { ...editingData, [id]: e.target.value };
    const patchArr: any = [];

    for (const key in updatedFields) {
      if (updatedFields[key] !== editingData[key]) {
        // updatedFields[key] = editingData[key];
        patchArr.push({
          op: 'replace',
          path: `/${key}`,
          value: updatedFields[key],
        });
      }
    }
    console.log('editingData', updatedFields, editingData, e.target.value, id);
    setPatchData(patchArr);
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
          while (
            lastPinnedIndex + 1 < updatedColumn2.length &&
            updatedColumn2[lastPinnedIndex + 1].isPinned
          ) {
            lastPinnedIndex++;
          }
        }

        // Insert the pinned column just after the last pinned column
        updatedColumn2.splice(lastPinnedIndex + 1, 0, {
          ...pinnedColumnData,
          isPinned: true,
        });

        setColumn2 && setColumn2(updatedColumn2);
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
        while (
          insertionPoint > 0 &&
          updatedColumn2[insertionPoint - 1].isPinned
        ) {
          insertionPoint--;
        }

        // Insert the pinned column at the insertion point
        updatedColumn2.splice(insertionPoint, 0, {
          ...pinnedColumnData,
          isPinned: true,
        });

        // Update the columns array and reset the pinned column
        setColumn2 && setColumn2(updatedColumn2);
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

  // const handleColFilter = (filterData, filterCol) => {
  //   // console.log('fildata',filterData,filterCol)
  //   applyFilter && applyFilter()
  //   }

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

  const clearAllFilters = () => {
    const clearedFilters: any = {};

    filters &&
      Object.keys(filters).forEach((key) => {
        clearedFilters[key] = null;
      });

    setFilters && setFilters(clearedFilters);
  };

  return (
    <>
      <Box component="div" className="main-box">
        {/* <Box>
        <Datepickercomponent
          onSearch={handleDateSearch}
          disabled={ShowGlobalHeader}
        />
      </Box> */}

        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* <SearchBox onSearch={handleSearch} /> */}
          <BasicTextFields onSearch={handleSearch} searchInput={searchInput} />

          <Box>
            {/* <IconButton onClick={() => setOpen(true)} disabled={ShowGlobalHeader}>
            <GiSettingsKnobs />
          </IconButton>
          <CustomButton
            onClick={handleClick}
            variant="contained"
              className='btn'
              sx={{width: 'fit-content !important', ml: '10px'}}
          >
            {ShowGlobalHeader ? 'Show' : 'Hide'}
          </CustomButton> */}
            <CustomButton
              onClick={clearAllFilters}
              variant="contained"
              sx={{ height: '40px', marginLeft: '20px', borderColor: 'black' }}
            >
              Clear
            </CustomButton>
          </Box>
        </Box>

        {/* Grid Section */}

        <Box
          sx={{
            textAlign: 'center',
            overflowX: 'auto',
            marginTop: '10px',
            width: '100%',
          }}
        >
          <Paper>
            <TableContainer
              sx={{
                maxWidth: '100%',
                height: '100%',
              }}
              className="filter-table"
            >
              <Box className="table-responsive">
                <Table className="cust-table table">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="columns" direction="horizontal">
                      {(provided) => (
                        <TableHead
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <TableRow className="sticky-head">
                            <TableCell
                              style={{
                                // spread the styles to keep the existing styles

                                //fontWeight: 'bold',
                                //textAlign: 'center',
                                //fontSize: '17px',
                                //color: 'rgba(0, 0, 0, 0.54)',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                //backgroundColor: '#fff',

                                // To cover the content when scrolling
                              }}
                            >
                              S.No
                            </TableCell>

                            {column2?.map((column, index) =>
                              // visibleColumns.includes(column.id)
                              column.isVisible ? (
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

                                          // fontWeight: 'bold',
                                          // textAlign: 'center',
                                          // fontSize: '17px',
                                          // color: 'rgba(0, 0, 0, 0.54)',
                                          position:
                                            column.id === 'id' ||
                                            column.id === 'actions'
                                              ? 'sticky'
                                              : 'unset',
                                          top: 0,
                                          zIndex: 1,
                                          // backgroundColor: '#fff',

                                          // To cover the content when scrolling
                                        }}
                                      >
                                        {column.isSort &&
                                          column.id !== 'actions' && (
                                            <IconButton
                                              onClick={() =>
                                                handleSort(column.id)
                                              }
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

                                        {column.name}
                                        {column.isFilter &&
                                          column.id !== 'actions' && (
                                            <IconButton
                                              onClick={(e) =>
                                                openFilterPopover(e, column.id)
                                              }
                                              sx={{ ml: '10px' }}
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
                                    sx={{
                                      // fontWeight: 'bold',
                                      // textAlign: 'center',
                                      // fontSize: '17px',
                                      // color: 'rgba(0, 0, 0, 0.54)',
                                      position: 'sticky',
                                      zIndex: 1,
                                      left: column.id === 'id' ? 0 : 'auto',
                                      right:
                                        column.id === 'actions' ? 0 : 'auto',
                                      // backgroundColor: '#fff',
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
                                    {column.name}

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
                      {currentRows?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            style={{
                              position: 'sticky',
                              zIndex: 1,
                              left: 0,
                              backgroundColor: '#fff',
                            }}
                          >
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          {column2?.map((column) =>
                            // visibleColumns.includes(column.id)
                            column.isVisible ? (
                              <TableCell
                                key={column.id}
                                style={{
                                  position:
                                    column.id === 'id' ||
                                    column.id === 'actions'
                                      ? 'sticky'
                                      : 'unset',
                                  zIndex: 1,
                                  left: column.id === 'id' ? 0 : 'auto',
                                  right: column.id === 'actions' ? 0 : 'auto',
                                  // backgroundColor: '#fff',
                                }}
                              >
                                {
                                  editingRowId === index ? (
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
                                        onClick={() => startEditing(index, row)}
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
                                        {/* <VisibilityIcon /> */}
                                      </IconButton>

                                      <IconButton
                                        className="delete-button"
                                        onClick={() => {
                                          setDeletingRowId(row.id);
                                          setDeleteDialogOpen(true);
                                        }}
                                      >
                                        {/* <DeleteIcon /> */}
                                      </IconButton>
                                    </>
                                  ) : lang ? (
                                    lang.form[row[column.id]] || row[column.id]
                                  ) : (
                                    row[column.id]
                                  ) // This line handles the translations
                                }
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
                        {lang ? lang.form.userinfo : 'Loading...'}
                      </DialogTitle>

                      <DialogContent>
                        {selectedUser ? (
                          <Box>
                            <p>
                              <strong>
                                {getTranslation('form.Id', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.id}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Name', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {getTranslation(
                                `form.${selectedUser.name}`,
                                lang
                              ) || selectedUser.name}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Email', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.email}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Phone', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.phone}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Address', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {getTranslation(
                                `form.${selectedUser.address}`,
                                lang
                              ) || selectedUser.address}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Designation', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {getTranslation(
                                `form.${selectedUser.designation}`,
                                lang
                              ) || selectedUser.designation}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.pincode', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.pincode}
                            </p>
                            {/* Add more fields as needed */}
                          </Box>
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
                      <DialogTitle>
                        {' '}
                        {getTranslation('form.ConfirmDelete', lang)}
                      </DialogTitle>
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
              </Box>
              <Pagination
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                totalCount={data?.length}
              />
            </TableContainer>
          </Paper>

          <Dialog
            open={pinnedColumn !== null}
            onClose={() => setPinnedColumn(null)}
          >
            <DialogContent>
              <p> {lang ? lang.form.PinColumn : 'Loading...'}:</p>
              <Button onClick={handlePinToLeft}>
                {' '}
                {lang ? lang.form.PintoLeft : 'Loading...'}
              </Button>
              <Button onClick={handlePinToRight}>
                {' '}
                {lang ? lang.form.PintoRight : 'Loading...'}
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPinnedColumn(null)}>
                {' '}
                {lang ? lang.form.cancel : 'Loading...'}
              </Button>
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
            setSelectedColumnValue={setSelectedColumnValue}
            selectedColumnValue={selectedColumnValue}
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
        </Box>
      </Box>
    </>
  );
};

export default TableComp;
