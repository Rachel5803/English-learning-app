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
import StudentsListForDictation from "./features/dictations/sentDictations/list/StudentListForDictation";
import SingleDictationAnswers from "./features/dictations/sentDictations/view/SingleDictationAnswers";
import SingleDictationToAnswer from "./features/dictations/pendingDictations/view/SingleDictationToAnswer";
import PendingDictationsList from "./features/dictations/pendingDictations/list/PendingDictationsList";
import CompletedDictationsList from "./features/dictations/completedDictations/list/CompletedDictationsList";
import SingleUserGrades from "./features/users/view/SingleUserGrades";
import UserProfile from "./features/users/view/UserProfile";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./features/home/HomePage";
function App() {
  return (
    <div >
      <Router>
        <Routes >
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<HomePage/>} />
            <Route path="login" element={<LoginPage />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowRoles={["Teacher", "Student"]} />}>
                <Route path="/dash" element={<DashLayout />}>
                  <Route index element={<Dashboard/>} />
                  <Route path="profile" element={<UserProfile/>} />
                  <Route path="dictations/sent/words/:dictationId" element={<SingleDictationWords />} />
                  <Route path="dictations/sent/answers/:dictationId" element={<SingleDictationAnswers />} />
                  <Route element={<RequireAuth allowRoles={["Teacher"]} />}>
                    <Route path="users" element={<Outlet />}>
                      <Route index element={<UsersList />} />
                      <Route path="add" element={<AddUser />} />
                      <Route path=":userId" element={<SingleUser />} />
                      <Route path="grades/:userId" element={<SingleUserGrades/>} />
                    </Route>
                    <Route path="classes" element={<Outlet />}>
                      <Route index element={<ClassesList />} />
                      <Route path="add" element={<AddClass />} />
                      <Route path=":classId" element={<SingleClass />} />
                    </Route>
                    <Route path="dictations/drafts" element={<Outlet />}>
                      <Route index element={<DraftsList />} />
                      <Route path="add" element={<AddDraft />} />
                      <Route path=":draftId" element={<SingleDraft />} />
                    </Route>
                    <Route path="dictations/sent" element={<Outlet />}>
                      <Route index element={<SentList />} />
                     <Route path="answers/:dictationId" element={<SingleDictationAnswers />} />
                      <Route path=":dictationId" element={<StudentsListForDictation />} />

                    </Route>
                  </Route>
                  <Route element={<RequireAuth allowRoles={["Student"]} />}>
                    <Route path="dictations" element={<Outlet />}>
                      <Route index element={<PendingDictationsList/>} />
                      <Route path="to/answer/:dictationId" element={<SingleDictationToAnswer/>} />
                      <Route path=":userId" element={<SingleUser />} />
                      <Route path="complete" element={<CompletedDictationsList/>} />
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
