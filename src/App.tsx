import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Route, Routes } from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes';
import QuoteForm from './containers/QuoteForm/QuoteForm';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/quotes/:category" element={<Quotes />} />
          <Route path="/add-quote" element={<QuoteForm />} />
          <Route path="/quotes/:quoteId/edit" element={<QuoteForm />} />
          <Route
            path="*"
            element={<h1 className="text-center">Страница не найдена!</h1>}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
