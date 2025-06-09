import { useNavigate } from 'react-router-dom';

const useClearFilter = () => {
  const navigate = useNavigate();
  const clearFilter = ({ pathName, search }: { pathName: string; search?: string }) => {
    navigate({
      pathname: pathName,
      search: search || ''
    });
  };

  return { clearFilter };
};

export default useClearFilter;
