import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Row,
  Button,
  DatePickerProps,
  Tooltip,
  List,
  Typography,
  Switch,
  Card,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import './InputDate.css';
const { RangePicker } = DatePicker;

import * as weekday from 'dayjs/plugin/weekday';
import * as localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);
dayjs.extend(weekday);
interface DateState {
  date: dayjs.Dayjs;
  halfday: boolean;
}
const useRangePicker = () => {
  const [pickedDates, setPickedDates] = useState<dayjs.Dayjs[]>([]);
  const [clickedDates, setClickedDates] =
    useState<RangePickerProps['value']>(null);

  const disableWeekEnds = (current: dayjs.Dayjs) => {
    return !current
      ? false
      : current.day() === 0 || // sundays
          current.day() === 6; // saturdays
  };

  const disableDates = (current: dayjs.Dayjs) => {
    return disableOutOfRange(current) || disableWeekEnds(current);
  };

  const disableOutOfRange = (current: dayjs.Dayjs) => {
    if (!clickedDates) {
      return disableWeekEnds(current);
    }
    const tooLate =
      clickedDates[0] && current.diff(clickedDates[0], 'days') > 7;
    const tooEarly =
      clickedDates[1] && clickedDates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };
  return {
    pickedDates,
    setPickedDates,
    clickedDates,
    setClickedDates,
    disableDates,
  };
};

export const InputDate = () => {
  const { disableDates, pickedDates, setPickedDates, setClickedDates } =
    useRangePicker();

  const handleChange = (dates: RangePickerProps['value']) => {
    console.log(dates);
    // verify dates is an dayjs array & is not empty
    if (dates && dayjs.isDayjs(dates[1]) && dayjs.isDayjs(dates[0])) {
      const daysDiff = dates[1].diff(dates[0], 'days', true);

      // list selected days without sun and satur
      const rangeDates: dayjs.Dayjs[] = [dates[0]];
      let nextDay: dayjs.Dayjs = dates[0];
      for (let i = 0; i < daysDiff; i++) {
        nextDay = nextDay.add(1, 'day');
        if (nextDay.day() !== 6 && nextDay.day() !== 0) {
          rangeDates.push(nextDay);
        }
      }

      // set list in component state
      setPickedDates([...rangeDates]);
      return;
    }
    setPickedDates([]);
  };

  return (
    <>
      <Form.Item label="Date" name="date">
        <Input.Group compact>
          <RangePicker
            format="YYYY-MM-DD"
            style={{ flex: '1' }}
            onChange={handleChange}
            disabledDate={disableDates}
            onCalendarChange={setClickedDates}
          />
          <Button className="input-date-select-button">
            {pickedDates.length} Days
          </Button>
        </Input.Group>
      </Form.Item>
      {!!pickedDates.length && (
        <List
          style={{ marginBottom: '1rem' }}
          bordered
          size="small"
          dataSource={pickedDates}
          renderItem={(item) => (
            <List.Item>
              <>
                {item.format('YYYY-MM-DD')}{' '}
                {item.localeData().weekdays()[item.day()]}
                <div style={{ width: '12  0px' }}>
                  <Typography.Text style={{ paddingRight: '1rem' }}>
                    Half Day
                  </Typography.Text>
                  <Switch />
                </div>
              </>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
