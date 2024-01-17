import React, {
  createContext, useState, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { getLatestCycle } from '../api/cyclesRequests';
import { cycleParser } from '../utils/cycleUtils';

export const CycleContext = createContext();

function CycleContextProvider({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const [rawCycle, setRawCycle] = useState(null);
  const [parsedCycle, setParsedCycle] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cycle = await getLatestCycle(authUser().token);
        localStorage.setItem('cycle', cycle.id);
        setRawCycle(cycle);
        setIsDataFetched(true);
      } catch (error) {
        throw new Error('Error fetching cycle data');
      }
    };

    if (isAuthenticated() && !isDataFetched) {
      fetchData();
    }
  }, [isAuthenticated, authUser, isDataFetched]);

  useEffect(() => {
    if (rawCycle) {
      const parsed = cycleParser(rawCycle);
      setParsedCycle(parsed);
    }
  }, [rawCycle]);

  const memoizedParsedCycle = useMemo(() => parsedCycle, [parsedCycle]);

  const contextValue = useMemo(() => ({
    cycle: memoizedParsedCycle,
    id: localStorage.getItem('cycle'),
  }), [memoizedParsedCycle]);

  return (
    <CycleContext.Provider value={contextValue}>
      {children}
    </CycleContext.Provider>
  );
}

export const useCycle = () => {
  const context = React.useContext(CycleContext);

  if (!context) {
    throw new Error('useCycle must be used within a CycleContextProvider');
  }

  return context;
};

CycleContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CycleContextProvider;
