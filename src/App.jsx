import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin'
import View from './Components/View';
import Totaldays from './Components/Totaldays';

function App() {
return(
  <>
  <Routes>
    <Route path='/' element={<AdminLogin/>}></Route>
    <Route path='/view' element={<View/>}></Route>
    <Route path='/totaldays' element={<Totaldays/>}></Route>

  </Routes>
  </>
)

}
export default App;
