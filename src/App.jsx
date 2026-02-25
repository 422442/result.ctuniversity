import { useState } from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import ResultPage from './components/ResultPage';

function App() {
  const [frontPage, setFrontPage] = useState(true);
  const [certificateData, setCertificateData] = useState(null);

  return (
    <div>
      {frontPage && (
        <FrontPage
          setFrontPage={setFrontPage}
          setCertificateData={setCertificateData}
        />
      )}
      {!frontPage && (
        <ResultPage
          setFrontPage={setFrontPage}
          certificateData={certificateData}
        />
      )}
    </div>
  );
}

export default App;
