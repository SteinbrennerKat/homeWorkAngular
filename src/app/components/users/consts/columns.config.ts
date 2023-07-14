import {ColumnsInterface} from "../interfaces/columns.interface";

export const COLUMNS_CONFIG: ColumnsInterface[] = [
  {
    key: 'createdAt',
    name: 'Created Date',
    type: 'datetime',
  },
  {
    key: 'firstName',
    name: 'First Name',
    type: 'text',
  },
  {
    key: 'lastName',
    name: 'Last Name',
    type: 'text',
  },
  {
    key: 'email',
    name: 'E-Mail',
    type: 'text',
  },
  {
    key: 'role',
    name: 'User Role',
    type: 'text',
  },
  {
    key: 'actions',
    name: 'Actions',
    type: 'text',
  },
]
