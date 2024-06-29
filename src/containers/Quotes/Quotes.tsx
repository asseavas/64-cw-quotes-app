import { useCallback, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ApiQuotes, Quote } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import QuotesList from '../../components/Quotes/QuotesList/QuotesList';

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  const categories = [
    { title: 'Все', id: '' },
    { title: 'Айти', id: 'айти' },
    { title: 'Юмор', id: 'юмор' },
    { title: 'Мемы', id: 'мемы' },
    { title: 'Мотивация', id: 'мотивация' },
    { title: 'Аниме', id: 'аниме' },
  ];

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);

    let url = '/quotes.json';
    if (category && category !== '') {
      url += `?orderBy="category"&equalTo="${category}"`;
    }

    const response = await axiosApi.get<ApiQuotes | null>(url);
    const quotesResponse = response.data;

    if (quotesResponse !== null) {
      const quotes: Quote[] = Object.keys(quotesResponse).map((id: string) => {
        return {
          ...quotesResponse[id],
          id,
        };
      });

      setQuotes(quotes);
    } else {
      setQuotes([]);
    }

    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const deleteQuote = useCallback(async (id: string) => {
    try {
      await axiosApi.delete('/quotes/' + id + '.json');
      setQuotes((prev) => prev.filter((quote) => quote.id !== id));
    } catch (error) {
      console.error('There was an error!', error);
    }
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3 mt-5">
          <nav className="nav flex-column mt-5">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={category.id ? '/quotes/' + category.id : '/'}
                className="nav-link"
              >
                {category.title}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="col-md-9">
          <h3 className="text-center mb-3">
            {category
              ? categories.find((cat) => cat.id === category)?.title
              : 'Все цитаты'}
          </h3>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '300px' }}
            >
              <Spinner />
            </div>
          ) : quotes.length === 0 && !isLoading ? (
            <p className="text-center mt-5">Добавьте цитату</p>
          ) : (
            <QuotesList quotes={quotes} onDelete={deleteQuote}></QuotesList>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
