import {TableMenuItemsInterface} from "../interfaces/table-menu-items.interface";
import {TableMenuItemsEnum} from "../enums/table-menu-items.enum";

export const TABLE_MENU_ITEMS_CONFIG: TableMenuItemsInterface[] = [
  {
    name: 'Edit',
    icon: 'edit',
    value: TableMenuItemsEnum.EDIT,
  },
  {
    name: 'Delete',
    icon: 'delete_outline',
    value: TableMenuItemsEnum.DELETE,
  },
  {
    name: 'Show User Profile',
    icon: 'person',
    value: TableMenuItemsEnum.DETAILS,
  },
]
