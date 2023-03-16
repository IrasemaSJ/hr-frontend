import Table from 'antd/es/table';
import { useHolidaysCatalogue } from '../../hooks';
import { generateColumns } from './table-design-holidays/columns';
import { Button, Card, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { Holidays } from './Holidays';

export const HolidaysCatalogue = () => {
  const {
    holidayRows,
    isLoadingTable,
    createCatalogueHoliday,
    toggleActivateCatalogueHoliday,
    contextHolder,
    editCatalogueHoliday,
  } = useHolidaysCatalogue();

  // Modal variables
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [idHoliday, setIdholiday] = useState('');
  const holidaysColumns = generateColumns({
    toggleActivate: toggleActivateCatalogueHoliday,
    edit: (values) => {
      setIdholiday(values._id);
      form.setFieldsValue(values);
      setIsOpen(true);
    },
  });

  return (
    <>
      <h1 style={{ marginBottom: '1rem' }}>Cataloge of Holidays</h1>
      <CreateHolidayCatalogue handleSubmit={createCatalogueHoliday} />
      <Table
        loading={isLoadingTable}
        columns={holidaysColumns}
        dataSource={holidayRows}
        rowKey="_id"
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true }}
      />

      {/* Edit Modal */}
      {contextHolder}

      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        title="Edit Holiday Catalogue Item"
        okText="Update"
        destroyOnClose
        onOk={() => {
          editCatalogueHoliday(idHoliday, form.getFieldsValue());
          setIsOpen(false);
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="Holiday Name"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const CreateHolidayCatalogue = ({
  handleSubmit,
}: {
  handleSubmit: (values: { name: string }) => void;
}) => {
  const [formCreate] = Form.useForm();

  return (
    <Card>
      <Form
        form={formCreate}
        name="holiday_catalogue"
        layout="inline"
        onFinish={(values) => {
          handleSubmit({ ...values });
          formCreate.resetFields();
        }}
      >
        <Form.Item
          name="name"
          label="Holiday Name"
          rules={[{ required: true }]}
          style={{ flex: 1 }}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
