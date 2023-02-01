import { Badge, Tabs } from 'antd';
import { TableContingency } from '../../components';
import { columnsContigencyRequestInfo } from './table-design/contingency-request';

export const Request = () => {
  return (
    <>
      <h1>Pending Request</h1>
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: (
              <Badge status="processing">
                <div style={{ padding: '5px' }}>Vacations</div>
              </Badge>
            ),
            key: '1',
            children: '',
          },
          {
            label: (
              <Badge status="warning" count={0}>
                <div style={{ padding: '5px' }}>Contingency</div>
              </Badge>
            ),
            key: '2',
            children: (
              <TableContingency
                designTable={columnsContigencyRequestInfo}
                url="/contingencies-tm/requests"
              />
            ),
          },
          {
            label: (
              <Badge status="warning" count={0}>
                <div style={{ padding: '5px' }}>Time by Time</div>
              </Badge>
            ),
            key: '3',
            children: `Content of tab`,
          },
        ]}
      />
    </>
  );
};
