import { PatientRecordsTable } from '@/lib/components/records-table'
import prisma from '@/lib/prisma'
import React from 'react'


const RecordsPage = async () => {

  const data = await prisma.patient.findMany()

  return (
    <PatientRecordsTable threatData={data} />
  )
}

export default RecordsPage
