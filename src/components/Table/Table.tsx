import React, { useState, useMemo } from 'react';
import styles from './Table.css';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  itemsPerPage = 10,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedAndFilteredData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    if (filterText) {
      sortableItems = sortableItems.filter((item) =>
        Object.values(item).some((val: any) =>
          val.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
    return sortableItems;
  }, [data, sortConfig, filterText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
    <style>{styles}</style>
    <div className="table-container">
      <input
        type="text"
        placeholder="Filter..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="filter-input"
      />
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                onClick={() => column.sortable && requestSort(column.key)}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.header}
                {sortConfig?.key === column.key && (
                  <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key.toString()}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${pageCount}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default Table;
