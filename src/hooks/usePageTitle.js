import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Gestion des CV`;
  }, [title]);
};

export default usePageTitle;
