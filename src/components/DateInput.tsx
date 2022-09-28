import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
    echeanceDate: Dayjs | null
    setEcheanceDate: (value:React.SetStateAction<Dayjs | null>) => void
}

export default function BasicDatePicker({echeanceDate, setEcheanceDate}: Props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Echeance date"
        value={echeanceDate}
        onChange={(newDate) => {
          setEcheanceDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}