import React from 'react';

const DatePicker: React.FC<{getPictureByDate: (date: string) => void, date: string}> = ({getPictureByDate, date}) => {
  return (
    <input
      type="date"
      onChange={(event) => {
        getPictureByDate(event.target.value)
      }}
      value={date}
    />
  );
}

export default DatePicker;