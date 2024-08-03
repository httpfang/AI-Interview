'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

function Interview({params}) {

    const [interviewData, setInterviewData] = useState()
    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails()
    },[]);
// used to get interview details by mockid/interview id
    const GetInterviewDetails =async()=> {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.MockId,params.interviewId ))

        setInterviewData(result[0])
    }
  return (
    <div className='my-6'>
      <h2 className='font-bold text-2xl'>Lets get started</h2>
    </div>
  )
}

export default Interview
