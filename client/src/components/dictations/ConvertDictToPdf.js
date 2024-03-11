import React from 'react'
import { Document, Page, Text } from '@react-pdf/renderer';

const ConvertDictToPdf = () => {
  return (
    <div>
        <Document>
    <Page>
      <Text>This is a PDF document generated using react-pdf library.</Text>
    </Page>
  </Document>
    </div>
  )
}

export default ConvertDictToPdf