export interface IInitialSuggestedProducts {
  suggested: null | IsuggestedDataProps[];
  status: 'loading' | 'success' | 'failed';
  loading: boolean;
  totalPages: number;
  currentPage: number;
  error: null | undefined;
}

export interface IsuggestedDataProps {
  status: number;
  showHeader: boolean;
  price: number;
  reason: string;
  date: string;
  name: string;
}
