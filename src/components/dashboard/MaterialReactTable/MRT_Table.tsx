'use client'
import { useId, useMemo, useState } from 'react';
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

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  state: string;
};

const Example = () => {
  const usStates: string[] = ['Alabama', 'Alaska', 'Arizona'];

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

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
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () => setValidationErrors({ ...validationErrors, firstName: undefined }),
        },
      },
      
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () => setValidationErrors({ ...validationErrors, email: undefined }),
        },
      },
      {
        accessorKey: 'course',
        header: 'Course',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors]
  );

  const { data: fetchedUsers = [], isError, isLoading } = useGetUsers();

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();
// const data=useGetUsers()
// console.log(data.data,'data is here');

  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
  };

  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null);
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isError
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
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => deleteUser('65c0c9bed786956cc86889de')}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isError,
    },
  });

  return <MaterialReactTable table={table} />
};

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake api call
      return Promise.resolve();
    },
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(['users'], (prevUsers: any) => [...prevUsers, { ...newUserInfo, id: (Math.random() + 1).toString(36).substring(7) }] as User[]);
    },
  });
}

function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response:any = await ApiFetching("GET",'../api/registeredUserForCourse',null)
      const data = await response.data.data;
      console.log(data);
      
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake api call
      return Promise.resolve();
    },
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(['users'], (prevUsers: any) => prevUsers?.map((prevUser: User) => (prevUser.id === newUserInfo.id ? newUserInfo : prevUser)));
    },
  });
}

function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId: string) => {
        try {
          // Send DELETE request to the API to delete the user
          const response = await ApiFetching("DELETE", `../api/registeredUserForCourse/${userId}`, null);
          console.log(response);
          // Return the deleted user ID
          return userId;
        } catch (error) {
          throw new Error('Failed to delete user');
        }
      },
      onMutate: (deletedUserId: string) => {
        // Optimistic update: remove the deleted user from the data in the cache
        const prevUsers = queryClient.getQueryData<User[]>(['users']);
        if (prevUsers) {
          queryClient.setQueryData<User[]>(['users'], prevUsers.filter((user) => user.id !== deletedUserId));
        }
      },
      onError: (error, deletedUserId, context) => {
        // Rollback on error
        if (context?.prevUsers) {
          queryClient.setQueryData<User[]>(['users'], context.prevUsers);
        }
      },
      onSettled: (deletedUserId, error, result) => {
        if (!error && result) {
          // Invalidate the query to refetch the updated data
          queryClient.invalidateQueries(['users']);
        }
      },
    });
  }
  
const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) => !!email.length && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function validateUser(user: User) {
  return {
    firstName: !validateRequired(user.firstName) ? 'First Name is Required' : '',
    lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}
