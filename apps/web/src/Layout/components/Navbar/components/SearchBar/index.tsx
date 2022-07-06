import React from 'react';

import Dropdown, { DropdownProps } from '../Dropdown';

const SearchBar: React.FC<DropdownProps> = ({ onClose }) => (
  <Dropdown onClose={onClose}>
    <h1>SearchBar</h1>
  </Dropdown>
);

export default SearchBar;
