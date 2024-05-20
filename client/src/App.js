import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SiteLayout from "./components/layout/site/SiteLayout";
import DashLayout from "./components/layout/dash/DashLayout";
import { ClassesList } from "./features/classes/list/ClassesList";
import UsersList from "./features/users/list/UsersList";
import AddUser from "./features/users/add/AddUser";
import AddClass from "./features/classes/add/AddClass";
import SingleClass from "./features/classes/view/SingleClass";
import SingleUser from "./features/users/view/SingleUser";
import LoginPage from "./features/auth/login/LoginPage";
import RequireAuth from "./features/auth/login/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import DraftsList from "./features/dictations/draftsDictations/list/DraftsList";
import SingleDraft from "./features/dictations/draftsDictations/view/SingleDraft";
import AddDraft from "./features/dictations/draftsDictations/add/AddDraft";
import SentList from "./features/dictations/sentDictations/list/SentList";
import SingleDictationWords from "./features/dictations/sentDictations/view/SingleDictationWords";
import SentStudentsList from "./features/dictations/sentDictations/list/SentStudentsList";
import SingleDictationAnswers from "./features/dictations/sentDictations/view/SingleDictationAnswers";
function App() {
  return (
    <div >
      <Router>
        <Routes >
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<h1>site</h1>} />
            <Route path="login" element={<LoginPage />} />
            <Route  element={<PersistLogin />}>
              <Route element={<RequireAuth allowRoles={["Teacher", "Student"]} />}>
                <Route path="/dash" element={<DashLayout />}>
                  <Route index element={<h1>dashboard</h1>} />
                  <Route element={<RequireAuth allowRoles={["Teacher"]} />}>
                    <Route path="users" element={<Outlet />}>
                      <Route index element={<UsersList />} />
                      <Route path="add" element={<AddUser />} />
                      <Route path=":userId" element={<SingleUser />} />
                    </Route>
                    <Route path="classes" element={<Outlet />}>
                      <Route index element={<ClassesList />} />
                      <Route path="add" element={<AddClass />} />
                      <Route path=":classId" element={<SingleClass />} />
                    </Route>
                    <Route path="dictations/drafts" element={<Outlet />}>
                      <Route index element={<DraftsList/>} />
                      <Route path="add" element={<AddDraft/>} />
                      <Route path=":draftId" element={<SingleDraft/>} />
                    </Route>
                    <Route path="dictations/sent" element={<Outlet />}>
                      <Route index element={<SentList/>} />
                      <Route path="words/:dictationId" element={<SingleDictationWords/>} />
                      <Route path="answers/:dictationId" element={<SingleDictationAnswers/>} />
                      <Route path=":dictationId" element={<SentStudentsList/>} />
                     
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
