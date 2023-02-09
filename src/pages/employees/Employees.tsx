import { useEffect, useState } from 'react';
import { Input, notification } from 'antd';
import Table from 'antd/es/table';
import { UsersActiveDirectory } from '../../api/interfaces/users/user.interface';
import { columnsUsersAC, lastColumn } from './table-designs-employees';
import ApiHR from '../../api/ApiHR';
import { useHandleError } from '../../hooks';

export const Employees = () => {
  const [employees, setEmployees] = useState<UsersActiveDirectory[]>([]);
  const [employeesSearch, setEmployeesSearch] = useState<
    UsersActiveDirectory[]
  >([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  //notifications
  const [api, contextHolder] = notification.useNotification();
  //notification from server errors
  const { setServerError } = useHandleError(api);

  //call employees on mount component
  useEffect(() => {
    getUsersFrom();
  }, []);

  //function to filter employees
  const onSearch = (value: string) => {
    if (value === '') {
      setEmployeesSearch(employees);
    } else {
      //TODO: make the debouncer for this
      setEmployeesSearch(
        employees.filter((employee) =>
          employee.name.toLowerCase().includes(value.toLowerCase())
            ? employee
            : '',
        ),
      );
    }
  };
  //function to get all employees
  const getUsersFrom = async () => {
    try {
      setIsLoadingTable(true);
      const resp = await ApiHR.get('users/employees');
      setEmployeesSearch(resp.data);
      setEmployees(resp.data);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  return (
    <>
      <h1>Improving employees</h1>
      {/* show messages from server */}
      {contextHolder}
      <Input
        placeholder="input search text"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        size="large"
        style={{ marginBottom: '20px', marginTop: '20px' }}
      />
      <Table
        loading={isLoadingTable}
        columns={[...columnsUsersAC, ...lastColumn()]}
        rowKey={'id'}
        dataSource={employeesSearch}
      />
    </>
  );
};
