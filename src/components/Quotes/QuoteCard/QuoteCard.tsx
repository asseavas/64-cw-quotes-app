import React from 'react';
import { Link } from 'react-router-dom';
import { Quote } from '../../../types';

interface Props {
  quote: Quote;
  onDelete: (id: string) => void;
}

const QuoteCard: React.FC<Props> = ({ quote, onDelete }) => {
  const deleteById = () => {
    onDelete(quote.id);
  };

  return (
    <div className="card rounded-4 border-0 pt-3 pb-2 px-2 w-100">
      <div className="card-body">
        <p className="card-text">"{quote.text}"</p>
        <p className="card-text mt-3">© {quote.author}</p>
        <div className="d-flex gap-3">
          <Link
            to={'/quotes/' + quote.id + '/edit'}
            className="btn btn-primary px-4 rounded-3 ms-auto"
          >
            Редактировать
          </Link>
          <button
            className="btn btn-danger px-4 rounded-3"
            onClick={deleteById}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
