import React, { useCallback, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { enqueueSnackbar } from 'notistack';
import { Quote } from '../../types';

const initialState = {
  category: '',
  author: '',
  text: '',
};

const QuoteForm = () => {
  const [quote, setQuote] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { quoteId } = useParams();
  const navigate = useNavigate();

  const fetchOneQuote = useCallback(async (quoteId: string) => {
    setIsLoading(true);
    const response = await axiosApi.get<Quote | null>(
      '/quotes/' + quoteId + '.json',
    );

    if (response.data) {
      setQuote(response.data);
    } else {
      return <p className="text-center mt-3">Цитата не найдена</p>;
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quoteId !== undefined) {
      void fetchOneQuote(quoteId);
    } else {
      setQuote(initialState);
    }
  }, [quoteId, fetchOneQuote]);

  const onFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setQuote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (quoteId !== undefined) {
        await axiosApi.put('/quotes/' + quoteId + '.json', quote);
      } else {
        await axiosApi.post('/quotes.json', quote);
      }

      navigate('/');
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong!' });
    } finally {
      setIsLoading(false);
    }
  };

  let form = (
    <div className="rounded-4 bg-light-subtle p-4 px-5 w-75">
      <form className="w-100" onSubmit={onFormSubmit}>
        <h4 className="my-4 text-center">
          {quoteId ? 'Редактировать' : 'Добавить новую цитату'}
        </h4>
        <div className="form-group">
          <select
            name="category"
            className="form-select bg-body-secondary border-0 rounded-4 p-3"
            aria-label="Default select example"
            required
            onChange={onFieldChange}
            value={quote.category}
          >
            <option value="" aria-required>
              Категория
            </option>
            <option value="айти">Айти</option>
            <option value="юмор">Юмор</option>
            <option value="мемы">Мемы</option>
            <option value="мотивация">Мотивация</option>
            <option value="аниме">Аниме</option>
          </select>
          <input
            type="text"
            name="author"
            placeholder="Автор"
            className="mt-4 form-control bg-body-secondary border-0 rounded-4 p-3"
            required
            onChange={onFieldChange}
            value={quote.author}
          />
        </div>
        <div className="form-group">
          <textarea
            name="text"
            className="form-control mt-4 bg-body-secondary border-0 rounded-4 p-3"
            placeholder="Цитата"
            required
            onChange={onFieldChange}
            value={quote.text}
          />
        </div>
        <div className="w-100 d-flex">
          <button
            type="submit"
            className="btn btn-primary mt-4 ms-auto px-5 rounded-3"
          >
            {quoteId ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </form>
    </div>
  );

  if (isLoading) {
    form = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '300px' }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container pt-5 d-flex justify-content-center">{form}</div>
  );
};

export default QuoteForm;
