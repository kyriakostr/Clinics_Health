import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Clinics from './pages/Clinics';
import Users from './pages/Users'
import HealthRecords from './pages/HealthRecords'
import UsersofClinic from './pages/UsersofClinic';
import HealthRecordsofUsers from './pages/HealthrecordsofUsers';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
          path='/'
          element={<Home/>}
          />
          <Route  path='/clinics'>
            <Route index element={<Clinics/>}/>
            <Route path=':id'>
              <Route index element={<UsersofClinic/>}/>
              <Route path=':userid' element={<HealthRecordsofUsers/>}/>
            </Route>
          </Route>
          
          <Route
          path='/users'>
            <Route index element={<Users/>}/>
            <Route path=':userid' element={<HealthRecordsofUsers/>}/>
          </Route>
          <Route
          path='/health-records'
          element={<HealthRecords/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
