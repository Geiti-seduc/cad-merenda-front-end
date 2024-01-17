import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Closed from '../../Main/Closed/Closed';
import SchoolHome from '../SchoolHome/SchoolHome';
import BestSuppliers from '../BestSuppliers/BestSuppliers';
import SchoolOrder from '../SchoolOrder/SchoolOrder';
import { useCycle } from '../../../contexts/CycleContextProvider';
import SoonToView from '../SoonToView/SoonToView';

function SchoolCycleHandler() {
  const { cycle } = useCycle();

  useEffect(() => {
    if (cycle) {
      localStorage.setItem('cycle', cycle.id);
    }
  }, [cycle]);

  if (!cycle) {
    return (
      <div className="flex flex-col items-center h-1/2">
        <CircularProgress
          style={{ width: '25px', height: '25px', color: 'white' }}
        />
      </div>
    );
  }
  if (cycle.school === 'OPEN') {
    return <SchoolOrder />;
  }
  if (cycle.supplier === 'OPEN') {
    return <SchoolHome />;
  }
  if (cycle.view === 'OPEN') {
    return <BestSuppliers />;
  }
  if (cycle.supplier === 'FINISHED') {
    return <SoonToView />;
  }

  return <Closed />;
}

export default SchoolCycleHandler;
