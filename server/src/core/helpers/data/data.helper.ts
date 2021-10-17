import { DirectoryItem } from "../../../models/directory-item.model";

export const sortDirectoryItemsByTypeAndName = (array: DirectoryItem[]) => {
  return array.sort(function (a, b) {
    return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
  });
};
