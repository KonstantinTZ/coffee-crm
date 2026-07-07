
import './App.css';
import AppRouter from './shared/AppRouter'
import { Header } from './shared/Header/Header';
import { Main } from './shared/Main';

function App() {
  return (
    <div className="App">
      <>
      <Header/>
      {/* <Main/> */}
      <AppRouter/>
      </>
    </div>
  );
}

export default App;
