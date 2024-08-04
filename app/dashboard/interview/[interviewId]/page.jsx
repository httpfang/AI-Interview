'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState({});
  const [webCamEnabled, setWebcamEnabled] = useState(false);

  // used to get interview details by mockid/interview id
  const GetInterviewDetails = useCallback(async () => {
    try {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.MockId, params.interviewId));
      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.warn('No interview data found for the given interviewId');
      }
      console.log('Database query result:', result);
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  }, [params.interviewId]);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, [params.interviewId, GetInterviewDetails]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-72 p-20 rounded-lg border bg-secondary my-7" />
              <Button variant='ghost' onClick={() => setWebcamEnabled(true)}>
                Enable web cam and microphone
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-col my-5 gap-5 ">
          <div className="p-5 rounded border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.jobPosition || "N/A"}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData?.jobDesc || "N/A"}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience || "N/A"}
            </h2>
          </div>
          <div className="p-5 border rounded-md border-yellow-100 bg-yellow-300">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Button>Start Interview</Button>
      </div>
    </div>
  );
}

export default Interview;
