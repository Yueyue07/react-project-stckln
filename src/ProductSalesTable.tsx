import { FixedSizeList as List } from 'react-window';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { SaleInfo } from './GetProductAPI';
import './ProductSalesTable.css';
import { ProductSalesTableReducer, State } from './ProductSalesTableReducer';
import { useReducer, useState } from 'react';

export default function ProductSalesTable({ sales }: State) {
  if (!sales) {
    throw new Error('expect sales existed!');
  }
  const [state, dispatch] = useReducer(ProductSalesTableReducer, { sales });
  const onSort = (isAscend: boolean, value: keyof SaleInfo) => {
    if (isAscend) {
      dispatch({ type: 'ascend', value });
    } else {
      dispatch({ type: 'descend', value });
    }
  };

  const data = Array.from(state.sales, (sale, index) => ({
    id: index,
    weekEnding: sale.weekEnding,
    retailSales: `$${sale.retailSales.toLocaleString()}`,
    wholesaleSales: `$${sale.wholesaleSales.toLocaleString()}`,
    unitsSold: sale.unitsSold,
    retailerMargin: `$${sale.retailerMargin.toLocaleString()}`,
  }));
  const columns: { label: keyof SaleInfo; width: number, value: string }[] = [
    { label: 'weekEnding', width: 200, value: 'WEEK ENDING' },
    { label: 'retailSales', width: 200, value: 'RETAIL SALES' },
    { label: 'wholesaleSales', width: 200, value: 'WHOLE SALES' },
    { label: 'unitsSold', width: 200, value: 'UNITS SOLD' },
    { label: 'retailerMargin', width: 200, value: 'ETAILOR MARGIN' },
  ];
  const columnHeaders = columns.map(col => {
    return (
      <ColumnName
        key={col.label}
        name={col.value}
        value={col.label}
        onSort={onSort}
      />
    );
  })
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = data[index];
    return (
      <div style={style} className="table-row" key={index}>
        {columns.map((column) => (
          <div
            key={column.label + index}
            style={{ width: column.width }}
            className="cell"
          >
            {item[column.label]}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="table-container">
      <div className="table-header">
        {columnHeaders}
      </div>
      <List
        height={400}
        itemCount={data.length}
        itemSize={35}
        width={columns.reduce((sum, col) => sum + col.width, 0)}
      >
        {Row}
      </List>
    </div>
  );
}

function ColumnName({
  name,
  value,
  onSort,
}: {
  name: string;
  value: keyof SaleInfo;
  onSort: any;
}) {
  const [isAscend, setIsAscend] = useState<boolean>(false);
  function onSetIsAscend() {
    setIsAscend(!isAscend);
    onSort(isAscend, value);
  }
  let icon = <FaArrowDown size={18} onClick={onSetIsAscend} />;
  if (!isAscend) {
    icon = <FaArrowUp size={18} onClick={onSetIsAscend} />;
  }
  return (
    <div className="column-header">
      {name}
      {icon}
    </div>
  );
}
