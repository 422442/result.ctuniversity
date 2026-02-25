import React, { useEffect } from 'react';
import logo from '../assets/images/Ct_logo.png';
import image from '../assets/images/CT_University_logo.png';

export default function Certificate({ certificateData }) {
  const textStyle = ' text-[10px] sm:text-[13px] font-normal sm:font-semibold mr-1';
  const resStyle = 'text-[10px] sm:text-[13px] font-bold mt-1 ml-[20%]';
  const tableValueStyle = 'border border-gray-300 px-2 sm:px-4 py-2';

  function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const renderSubjectsTable = () => (
    <table className="w-full border-collapse border border-gray-300 mb-4 text-[10px] sm:text-[13px]">
      <thead>
        <tr className="bg-gray-100">
          <th className={tableValueStyle}>Sr. No.</th>
          <th className={tableValueStyle}>Subject Code</th>
          <th className={tableValueStyle}>Subject</th>
          <th className={tableValueStyle}>Credit</th>
          <th className={tableValueStyle}>Grade</th>
          <th className={tableValueStyle}>Grade Point</th>
        </tr>
      </thead>
      <tbody>
        {certificateData.SUBJECT_CODES.map((subjectCode, index) => (
          <tr key={subjectCode} className="bg-white">
            <td className={tableValueStyle}>{index + 1}</td>
            <td className={tableValueStyle}>{subjectCode}</td>
            <td className={tableValueStyle}>{certificateData.SUBJECTS[index]}</td>
            <td className={tableValueStyle}>{certificateData.CREDITS[index]}</td>
            <td className={tableValueStyle}>{certificateData.GRADES[index]}</td>
            <td className={tableValueStyle}>{certificateData.GPS[index]}</td>
          </tr>
        ))}
        <tr className="bg-gray-100">
          <td className={tableValueStyle}></td>
          <td className={`${tableValueStyle} font-semibold`}>SGPA</td>
          <td></td>
          <td></td>
          <td className={`${tableValueStyle} font-semibold`}>{certificateData.SGPA}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div
      id="printable-certificate"
      className=" p-6 border flex flex-col border-gray-300 rounded shadow-md items-center"
    >
      <div className="flex justify-center relative w-full">
        <img
          src={image}
          alt="CT University Logo"
          className="md:w-[120px] w-[80px]"
        />
        <p className="text-sm absolute top-[-5px] right-0 text-[12px] font-semibold">
          {capitalizeFirstLetter(certificateData.EXAM_MONTH_YEAR)}
        </p>
      </div>
      <div className="text-center mb-4">
        <p className="sm:text-[15px] text-[13px] font-bold mt-2">
          {certificateData.COLLEGE}
        </p>
        <h2 className="text-[12px] mt-2 font-bold italic text-red-700">
          Result cum Grade Card
        </h2>
      </div>
      <div className="mb-4 w-full grid grid-cols-2 gap-4 p-2 ">
        <div className="flex flex-col">
          <p className={`${resStyle} text-left`}>
            <span className={textStyle}>Enrollment Number:</span>{' '}
            {certificateData.ENROLLMENT_NO}
          </p>
          <p className={`${resStyle} text-left`}>
            <span className={textStyle}>Student Name:</span>{' '}
            {certificateData.STUDENT_NAME}
          </p>
        </div>
        <div className="flex flex-col">
          <p className={`${resStyle} text-left`}>
            <span className={textStyle}>Course:</span> {certificateData.COURSE}
          </p>
          <p className={`${resStyle} text-left`}>
            <span className={textStyle}>Semester:</span>{' '}
            {certificateData.SEMESTER}
          </p>
        </div>
      </div>
      <p className="mb-2 text-center text-[10px] sm:text-[13px] font-semibold">
        <span className={textStyle}>Exam Year:</span>{' '}
        {capitalizeFirstLetter(certificateData.EXAM_MONTH_YEAR)}
      </p>
      {renderSubjectsTable()}
      <p
        className={`font-bold ${
          certificateData.STATUS === 'PASS' ? 'text-green-500' : 'text-red-600'
        }`}
      >
        <span className="font-semibold text-black">Status:</span>{' '}
        {certificateData.STATUS}
      </p>
      <p className=" text-[12px] mt-4">
        *This is computer genrated result. For official use kindly get approvel
        from COE office
      </p>
    </div>
  );
}
