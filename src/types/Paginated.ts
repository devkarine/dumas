export interface Paginated<T> {
  data: T[];
  meta: {
    current_page: number;
    previous_page: number | null;
    next_page: number | null;
    items_per_page: number;
    total_pages: number;
    total_items: number;
  };
}
