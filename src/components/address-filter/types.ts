export type AddressFilterProps = {
  initialFilter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
  onClose: () => void;
  open: boolean;
};

export type FilterOptions = {
  userName?: string;
  displayName?: string;
  city?: string;
  state?: string;
};
