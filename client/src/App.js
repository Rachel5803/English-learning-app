import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import AddDetailsDictation from "./components/dictations/AddDetailsDictation";
import AddWordsDictation from "./components/dictations/AddWordsDictation";
import ConvertDictToPdf from "./components/dictations/ConvertDictToPdf";
function App() {
  return (
    <div >
      <Router>
        <Routes >
          <Route path='/' element={<Layout />}>
            <Route index element={<h1>Home page</h1>} />
            <Route path="/personalArea" element={<h1>אזור אישי</h1>} />
            <Route path="/dictation/create" element={<AddDetailsDictation />} />
            <Route path="/dictation/update/words/:id" element={<AddWordsDictation/>}/>
            <Route path="/dictation/convert" element={<ConvertDictToPdf/>}/>
            <Route path="/StudentData" element={<h1>נתוני תלמידים</h1>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
