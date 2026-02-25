import { useEffect, useState } from 'react';
import axios from 'axios';

const SelectSession = ({ setDisableSearch, setSession }) => {
  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [examType, setExamType] = useState('');

  const [yearList, setYearList] = useState(['2022', '2023', '2024']);
  const [termList, setTermList] = useState(['summer', 'winter']);
  const [examTypeList, setExamTypeList] = useState(['ett', 'mtt', 'reappear']);

  const fetchSession = async () => {
    try {
      const response = await axios.get('/api/getSessions');
      const sessions = response.data.sessions;
      const years = new Set();
      const terms = new Set();
      const examTypes = new Set();

      sessions.forEach((session) => {
        const [year, term, examType] = session.split('_');
        years.add(year);
        terms.add(term.toUpperCase());
        examTypes.add(examType.toUpperCase());
      });

      setYearList(Array.from(years).sort());
      setTermList(Array.from(terms).sort());
      setExamTypeList(Array.from(examTypes).sort());
    } catch (error) {
      console.error('Error fetching sessions:', error);
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

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-3 w-[75vw] mb-1">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 text-lg border rounded-lg border-gray-300 w-full text-center"
      >
        <option value="">Select Year</option>
        {yearList.map((val, index) => (
          <option key={index}>{val}</option>
        ))}
      </select>
      <select
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="p-2 text-lg border rounded-lg border-gray-300 w-full text-center"
      >
        <option value="">Select Exam Month</option>
        {termList.map((val, index) => (
          <option key={index}>{val}</option>
        ))}
      </select>
      <select
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        className="p-2 text-lg border rounded-lg border-gray-300 w-full text-center"
      >
        <option value="">Select Exam Type</option>
        {examTypeList.map((val, index) => (
          <option key={index}>{val}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectSession;
