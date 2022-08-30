import type { DropdownProps } from '../Dropdown';

import Dropdown from '../Dropdown';

const SearchBar: React.FC<DropdownProps> = ({ onClose }) => (
  <Dropdown onClose={onClose}>
    <h1>SearchBar</h1>
  </Dropdown>
);

export default SearchBar;
