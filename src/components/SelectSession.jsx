import { useEffect, useState } from 'react';
import axios from 'axios';

const SelectSession = ({ setDisableSearch, setSession }) => {
  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [examType, setExamType] = useState('');
  const [loading, setLoading] = useState(true);

  const [yearList, setYearList] = useState([]);
  const [termList, setTermList] = useState([]);
  const [examTypeList, setExamTypeList] = useState([]);

  const fetchSession = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/getSessions');
      const sessions = response.data.sessions;
      const years = new Set();
      const terms = new Set();
      const examTypes = new Set();

      sessions.forEach((session) => {
        const [sessionYear, sessionTerm, sessionExamType] = session.split('_');
        years.add(sessionYear);
        terms.add(sessionTerm.toUpperCase());
        examTypes.add(sessionExamType.toUpperCase());
      });

      setYearList(Array.from(years).sort().reverse());
      setTermList(Array.from(terms).sort());
      setExamTypeList(Array.from(examTypes).sort());
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Retry after 2 seconds if API fails
      setTimeout(fetchSession, 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    const selectedSession = `${year}_${term.toLowerCase()}_${examType.toLowerCase()}`;
    if (year !== '' && term !== '' && examType !== '') {
      setDisableSearch(false);
    }
    setSession(selectedSession);
  }, [year, term, examType]);

  if (loading && yearList.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-3 w-[75vw] mb-1">
        <div className="p-2 text-lg text-gray-500 w-full text-center">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-3 w-[75vw] mb-1">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 text-lg border rounded-lg border-gray-300 w-full text-center"
        disabled={yearList.length === 0}
      >
        <option value="">Select Year</option>
        {yearList.map((val, index) => (
          <option key={index} value={val}>{val}</option>
        ))}
      </select>
      <select
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="p-2 text-lg border rounded-lg border-gray-300 w-full text-center"
        disabled={termList.length === 0}
      >
        <option value="">Select Exam Month</option>
        {termList.map((val, index) => (
          <option key={index} value={val}>{val}</option>
        ))}
      </select>
      <select
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        className="p-2 text-lg border rounded-lg border-gray-300 w-full text-center"
        disabled={examTypeList.length === 0}
      >
        <option value="">Select Exam Type</option>
        {examTypeList.map((val, index) => (
          <option key={index} value={val}>{val}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectSession;
