import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
  id: number,
  name: string;
}

type DataProps = {
  data: DataType[],
  handleDelete: (id: number) => void,
  handleEditModal: (id: number) => void,
}

const DataTable = ({data, handleDelete, handleEditModal}: DataProps) => {
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
      width: '70%',
    },
    {
      title: "Aksi",
      render: (text, record) => (
        <div className='flex gap-2 text-white'>
          <button className='bg-sky-500 px-4 py-1 rounded-md' onClick={() => handleEditModal(record.id)}>
            Edit
          </button>
          <button className='bg-red-500 px-4 py-1 rounded-md' onClick={() => handleDelete(record.id)}>
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