export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface HeaderState {
  title: string;
  breadcrumbs: Breadcrumb[];
  setHeader: (title: string, breadcrumbs?: Breadcrumb[]) => void;
  resetHeader: () => void;
}
