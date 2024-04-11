import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SiteLayout from "./components/layout/site/SiteLayout";
import DashLayout from "./components/layout/dash/DashLayout";
import { ClassesList } from "./features/classes/list/ClassesList";
import UsersList from "./features/users/list/UsersList";
import AddUser from "./features/users/add/AddUser";
import AddClass from "./features/classes/add/AddClass";
import SingleClass from "./features/classes/view/SingleClass";
import SingleUser from "./features/users/view/SingleUser";
function App() {
  return (
    <div >
      <Router>
        <Routes >
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<h1>site</h1>} />
            <Route path="/dash" element={<DashLayout />}>
              <Route index element={<h1>dashboard</h1>} />
              <Route path="users" element={<Outlet />}>
              <Route index element={<UsersList />} />
              <Route path="add" element={<AddUser/>} />
              <Route path=":id" element={<SingleUser/>} />
            </Route>
              <Route path="classes" element={<Outlet />}>
                <Route index element={<ClassesList />} />
                <Route path="add" element={<AddClass/>} />
                <Route path=":id" element={<SingleClass/>} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
