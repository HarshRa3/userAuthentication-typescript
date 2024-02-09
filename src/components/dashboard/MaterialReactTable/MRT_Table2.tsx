'use client'
import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApiFetching } from '@/app/services/ApiFetching';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type User = {
  _id: string;
  username: string;
  email: string;
  course: string;
};

const usStates = [
  'Mern Stack',
  'Web Designing',
  'Java Full Stack Development',
  'Python Full Stack Development',
];

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [updateError, setUpdateError] = useState<string>('');

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: '_id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        validationRules: {
          required: true,
          maxLength: 50,
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
        },
        validationRules: {
          required: true,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email address',
          },
        },
      },
      {
        accessorKey: 'course',
        header: 'Course',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
        },
        validationRules: {
          required: true,
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
        },
        validationRules: {
          required: true,
        },
      },
    ],
    []
  );

  const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();

  const { mutateAsync: updateUser } = useUpdateUser();

  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    table.setCreatingRow(null); 
  };

  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    try {
      await updateUser(values);
      table.setEditingRow(null); 
      setUpdateError('');
    } catch (error) {
      setUpdateError('Failed to update user. Please try again.');
    }
  };

  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original._id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    getRowId: (row) => row._id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <Box sx={{zIndex:"2",position:'absolute'}}>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons  variant="text" table={table} row={row} />
        </DialogActions>
      </Box>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Link href={'/dashboard/addUser'}>
        <Button variant="outlined">Create New User</Button>
      </Link>
    ),
    state: {
      isLoading: isLoadingUsers,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {updateError && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{updateError}</div>
      )}
    </>
  );
};

function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
        const response: any = await ApiFetching(
          "GET",
          "../api/registeredUserForCourse",
          null
        );
        const data = await response.data.data;
        return data;
      },
    refetchOnWindowFocus: false,
  });
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedUser: User) => {
      try {
        const res:any= await ApiFetching(
          "PUT",
          `../api/registeredUserForCourse/${updatedUser._id}`,
          updatedUser
        );
        if(res.statusText==='OK' && res.status===200){
        return res 
        }
        if(res.response.status===409 && res.response.data.success===false){
          toast.error(res.response.data.message)
        }
      } catch (error) {
        console.log(error);
        throw new Error('Failed to update user');
      }
    },
    onError:async(res)=>{
      console.log('error is:',res);
    }
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      console.log(userId);
      try {
        const response = await ApiFetching(
          "DELETE",
          `../api/registeredUserForCourse/${userId}`,
          null
        );
        return userId;
      } catch (error) {
        throw new Error("Failed to delete user");
      }
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.filter((user: User) => user._id !== userId),
      );
    },
    });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
    <ToastContainer/>
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => { 
return !!value.length;
}

const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user: User) {
  
  return {
    username: !validateRequired(user.username)
      ? 'First Name is Required'
      : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}
