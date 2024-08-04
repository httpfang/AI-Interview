'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';

function StartInterview({params}) {

    const [interviewData,setInterviewData] =useState()
    const [mockInterviewQuestion, setmockInterviewQuestion] = useState()
    useEffect(()=>{
        GetInterviewDetails
    },[])

    // used to get interview details by mockid/interview id
  const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.MockId, params.interviewId));
      const jsonMockResp =JSON.parse(result[0].jasonMockResp) 
      console.log(jsonMockResp)
      setmockInterviewQuestion(jsonMockResp)
      setInterviewData(result[0]) 
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Question */}
      <QuestionSection  mockInterviewQuestion={mockInterviewQuestion}/>

      {/* video/ audio recording */}
    </div>
  );
}

export default StartInterview
