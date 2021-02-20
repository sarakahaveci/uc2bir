import { useSelector } from 'react-redux';

const useFileTypeIdFinder = (fileTypeId) => {
  const { data } = useSelector((state) => state.registerData);

  const foundItem = data?.['file-type']?.find((item) => item.id === fileTypeId);

  return foundItem?.id;
};

export default useFileTypeIdFinder;
