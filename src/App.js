import './App.css';
import OrderEventListener from './components/OrderEventListener';
import OrderProvider from './components/OrderProvider';
import Main from './components/Main'

function App() {
  return (
    <div className="App">
      <OrderProvider>
        <OrderEventListener />
        <Main />
      </OrderProvider>
    </div>
  );
}

export default App;
