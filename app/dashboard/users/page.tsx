import { fetchData } from '@/actions/getdata';
import { formatDate } from '@/lib/formatDate';
import { ExamDate } from '@/types/allTypes';
import React from 'react';


export default async function page() {
 const examDate = await fetchData<ExamDate>("exams")
 console.log('examDate:', examDate);

  return (
    <div className='h-screen'>
      users manage page
      {
        examDate.map(d=>(
          <div key={d.date.toString()}>
            {formatDate(d.date)} <br />
            {d.name}
             
          </div>
        ))
      }
 
    </div>
  );
}