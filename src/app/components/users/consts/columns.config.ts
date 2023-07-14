import {ColumnsInterface} from "../interfaces/columns.interface";

export const COLUMNS_CONFIG: ColumnsInterface[] = [
  {
    key: 'createdDate',
    name: 'Created Date',
    type: 'datetime',
  },
  {
    key: 'name',
    name: 'First Name',
    type: 'text',
  },
  {
    key: 'surname',
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
