import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import UnAuthorized from "./components/UnAuthorized";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Lounge from "./components/Lounge";
import RequiredAuth from "./components/RequiredAuth";
import Missing from "./components/Missing";

const ROLES = {
  Admin : 1994,
  Editor : 2005,
  Users : 3005
}

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>

          {/* Public Routes */}
          <Route path="register" element={<Register />}/>
          <Route path="login" element={<Login />}/>
          <Route path="linkpage" element={<LinkPage/>}/>
          <Route path="unauthorized" element={<UnAuthorized/>}/>

          {/* Protected Routes */}
          {/* All Users can access */}
          <Route element={<RequiredAuth rolesArray={[ROLES.Users]}/>}>
            <Route index element={<Home />}/>
          </Route>
          {/* Only Admin can access */}
          <Route element={<RequiredAuth rolesArray={[ROLES.Admin]}/>}>
            <Route path="admin" element={<Admin/>}/>
          </Route>  
          {/* Admin & Editor can access */}
          <Route element={<RequiredAuth rolesArray={[ROLES.Editor]}/>}>
            <Route path="editor" element={<Editor />} />
          </Route>
          {/* Admin & Editor can access */}
          <Route element={<RequiredAuth rolesArray={[ROLES.Admin, ROLES.Editor]}/>}>
            <Route path="lounge" element={<Lounge/>}/>
          </Route>

          <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
