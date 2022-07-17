import logo from './logo.svg';
import './App.css';
import RouterLink from './components/routes/routerlink';
import Protect from './components/routes/protect';
import Header from './components/header/header';
import Employee from './pages/Employee';

function App() {
  return (
    <section className='bg-slate-300 h-auto '>
       <Header/>
      <RouterLink/>
   </section>
  );
}

export default App;
