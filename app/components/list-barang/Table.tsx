import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
  name: string;
  price: number;
  stock: number;
}

type DataProps = {
  data: DataType[],
}

const DataTable = ({data}: DataProps) => {
  const [filter, setFilter] = useState<{ text: string; value: string }[]>([]);

  useEffect(() => {
    const filteredName = Array.from(new Set(data.map((item) => item.name)));
    const nameFilters = filteredName.map((name) => ({
      text: name,
      value: name
    }));

    setFilter(nameFilters);
  }, [data]);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: filter,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
  ];
  
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />
};

export default DataTable;