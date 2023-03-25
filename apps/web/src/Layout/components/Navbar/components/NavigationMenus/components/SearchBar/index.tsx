import { useRouter } from 'next/router';

import { Form, Formik } from 'formik';

import { Input } from '@/components';
import Dropdown from '../../../Dropdown';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const { push } = useRouter();

  function searchRedirect(searchTerm: string) {
    push({
      pathname: '/search/[...searchParams]',
      query: { searchParams: searchTerm },
    });
  }

  return (
    <Dropdown onClose={onClose}>
      <Formik
        initialValues={{ searchTerm: '' }}
        onSubmit={values => searchRedirect(values.searchTerm)}
      >
        <Form className="p-4">
          <Input.Container styleType="secondary">
            <Input
              id="searchTerm"
              placeholder="Search for any movie, user, list or review"
              autoFocus
            />

            <button type="submit">
              <Input.Icon iconType="FaSearch" direction="left" />
            </button>
          </Input.Container>
        </Form>
      </Formik>
    </Dropdown>
  );
};

export default SearchBar;
