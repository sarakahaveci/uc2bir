import { useSelector } from 'react-redux';

const useFileTypeIdFinder = (fileTypeName) => {
  const { data } = useSelector((state) => state.registerData);

  const foundItem = data?.['file-type'].find(
    (item) => item.name === fileTypeName
  );

  return foundItem?.id;
};

export default useFileTypeIdFinder;
