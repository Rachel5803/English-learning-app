import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { useAddDictationWordsMutation } from './dictationApiSlice'
import { useNavigate } from "react-router-dom"
import { Document, Page, Text, PDFViewer, View } from '@react-pdf/renderer'
const AddWordsDictation = () => {
  const [addDictationWords, { isSuccess, data }] = useAddDictationWordsMutation()
  const { id } = useParams();
  const [wordData, setWordData] = useState([{ word: '', meanings: [''] }]);
  const [isSaved, setIsSaved] = useState(false);
  const [createPdf, setCreatePdf] = useState(false);
  const navigate = useNavigate()

  const styles = {
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    word: {
      marginRight: 10,
      fontSize: 14,
      fontWeight: 'bold',
      fontfamly:'ariel'
      
    },
    meanings: {
      flex: 1,
      fontfamly:'ariel'
    },
    meaning: {
      fontSize: 12,
      fontfamly:'ariel'
      
    },
  };
  const addWordInput = () => {
    setWordData([...wordData, { word: '', meanings: [''] }])
  }
  const addMeaningInput = (index) => {
    const updatedWordData = [...wordData];
    updatedWordData[index].meanings.push('');
    setWordData(updatedWordData);
  };
  const saveWord = (index, key, value) => {
    const updatedWordData = [...wordData];
    updatedWordData[index][key] = value;
    setWordData(updatedWordData);
  }
  const savaMeanings = (wordIndex, meaningIndex, value) => {
    const updatedWordData = [...wordData];
    updatedWordData[wordIndex].meanings[meaningIndex] = value;
    setWordData(updatedWordData);
    console.log(wordData);

  }
  const submitForm = async (e) => {
    e.preventDefault()
    const response = await addDictationWords({ id, words: wordData })
    setIsSaved(true)

  }
  return (
    <div>

      {!isSaved && (<form onSubmit={submitForm}>
        {wordData.map((wordObj, index) => (
          <div key={index}>
            <input
              type="text"
              value={wordObj.word}
              onChange={(e) => saveWord(index, 'word', e.target.value)}
              placeholder="Enter word"
            />
            <button type="button" onClick={() => addMeaningInput(index)}>Add Meaning</button>
            {wordObj.meanings.map((meaning, meaningIndex) => (
              <input
                key={meaningIndex}
                type="text"
                value={meaning}
                onChange={(e) => savaMeanings(index, meaningIndex, e.target.value)}
                placeholder={`Enter meaning ${meaningIndex + 1}`}
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={addWordInput}>Add Word</button>
        <button type="submit">Submit</button>
      </form>)}
      {isSaved && ( 
        <div>
          <p>The dictation has been saved in the system</p>
          <button onClick={() => setCreatePdf(true)} style={{ display: createPdf ? "none" : "block" }}>צור כקובץ pdf</button>
          {createPdf && (<PDFViewer width={600} height={400}>
            <Document>
              <Page>
                {wordData.map((wordObj, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.word}>{index + 1}.  {wordObj.word}</Text>
                    <Text style={styles.meaning} >{wordObj.meanings.join(', ')}</Text>
                  </View>
                ))}
              </Page>
            </Document>
          </PDFViewer>)}

        </div>
        )}
        </div>
  )
}

export default AddWordsDictation