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
      title: 'Nama',
      dataIndex: 'name',
      filters: filter,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: '30%',
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Aksi",
      render: (text, record) => (
        <div className='flex gap-2 text-white'>
          <button className='bg-green-700 px-4 py-1 rounded-md'>
            Detail
          </button>
          <button className='bg-sky-500 px-4 py-1 rounded-md'>
            Edit
          </button>
          <button className='bg-red-500 px-4 py-1 rounded-md'>
            Hapus
          </button>
        </div>
      )
    }
  ];
  
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />
};

export default DataTable;