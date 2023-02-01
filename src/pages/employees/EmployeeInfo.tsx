import { Tabs } from 'antd';
import { HeaderEmployeeInfo, Stepper } from '../../components';
import { SectionEmployeeInfo } from '../../components/section-employee-info/SectionEmployeeInfo';
import { useModal } from '../../hooks';
import './EmployeeInfo.css';
import { TableContingency } from '../../components/table/TableContingency';
import { columnsContigencyEmployeeInfo } from './table-designs/contingency-employeeinfo';

export const EmployeeInfo = () => {
  const { ModalWrapper, openModal, closeModal } = useModal();

  return (
    <>
      <HeaderEmployeeInfo
        name="adrian garcia saaib"
        job="software especialist"
        seniority="2 years, 4 months"
        admission_date="08 feb 2022"
      />
      {/* TODO:check day avaliables responsive container */}
      <SectionEmployeeInfo
        vacation={7}
        contingency={3}
        incapacity={2}
        time_by_time={1}
        bereavement={0}
        marriage={0}
        pregnancy={0}
        no_paid={0}
        onClick={openModal}
      />
      {/* Modal that does vacation request! */}
      <ModalWrapper width={1000}>
        <Stepper closeModal={closeModal} />
      </ModalWrapper>
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: `Vacations`,
            key: '1',
            children: 'Content of tab',
          },
          {
            label: `Contingency`,
            key: '2',
            children: (
              <TableContingency
                url="/contingencies"
                designTable={columnsContigencyEmployeeInfo}
              />
            ),
          },
          {
            label: `Time by Time`,
            key: '3',
            children: `Content of tab`,
          },
        ]}
      />
    </>
  );
};
