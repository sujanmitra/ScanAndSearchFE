import { Searchbox } from './Components/Searchbox/Searchbox';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{fontFamily: 'BentonSansBook,Helvetica,Arial,sans-serif', fontSize: '27px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: '100', margin: '10% 0'}}>VICTORIA'S SECRET</h1>
      <Searchbox />
    </div>
  );
}

export default App;
