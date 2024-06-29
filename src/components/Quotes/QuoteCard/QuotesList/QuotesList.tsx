import React from 'react';
import QuoteCard from '../QuoteCard';
import { Quote } from '../../../../types';

interface Props {
  quotes: Quote[];
  onDelete: (id: string) => void;
}

const QuotesList: React.FC<Props> = ({ quotes, onDelete }) => {
  return (
    <div className="d-flex flex-column align-items-center gap-3 pt-5 mb-5">
      <h3 className="text-center">Все цитаты</h3>
      {quotes
        .slice()
        .reverse()
        .map((quote) => (
          <QuoteCard key={quote.id} quote={quote} onDelete={onDelete} />
        ))}
    </div>
  );
};

export default QuotesList;
