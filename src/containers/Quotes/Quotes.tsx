import { useCallback, useEffect, useState } from 'react';
import { ApiQuotes, Quote } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import QuotesList from '../../components/Quotes/QuoteCard/QuotesList/QuotesList';

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);

    const response = await axiosApi.get<ApiQuotes | null>('/quotes.json');
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
  }, []);

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
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '300px' }}
        >
          <Spinner />
        </div>
      ) : quotes.length === 0 && !isLoading ? (
        <p className="text-center mt-4">Добавьте цитату</p>
      ) : (
        <QuotesList quotes={quotes} onDelete={deleteQuote}></QuotesList>
      )}
    </div>
  );
};

export default Quotes;
