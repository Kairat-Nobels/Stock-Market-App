'use client';

import { useDebounce } from '@/hooks/useDebounce';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { Star, Trash2 } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = 'button',
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);

  const label = useMemo(() => {
    if (type === 'icon') return added ? '' : '';
    return added ? 'Удалить из списка наблюдения' : 'Добавить в список наблюдения';
  }, [added, type]);

  // Добавление / удаление акции из списка наблюдения
  const toggleWatchlist = async () => {
    const result = added
      ? await removeFromWatchlist(symbol)
      : await addToWatchlist(symbol, company);

    if (result.success) {
      toast.success(
        added ? 'Удалено из списка наблюдения' : 'Добавлено в список наблюдения',
        {
          description: `${company} ${added ? 'удалена из' : 'добавлена в'
            } ваш список наблюдения`,
        }
      );

      onWatchlistChange?.(symbol, !added);
    }
  };

  const debouncedToggle = useDebounce(toggleWatchlist, 300);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setAdded(!added);
    debouncedToggle();
  };

  if (type === 'icon') {
    return (
      <button
        title={
          added
            ? `Удалить ${symbol} из списка наблюдения`
            : `Добавить ${symbol} в список наблюдения`
        }
        aria-label={
          added
            ? `Удалить ${symbol} из списка наблюдения`
            : `Добавить ${symbol} в список наблюдения`
        }
        className={`watchlist-icon-btn ${added ? 'watchlist-icon-added' : ''}`}
        onClick={handleClick}
      >
        <Star fill={added ? 'currentColor' : 'none'} />
      </button>
    );
  }

  return (
    <button
      className={`watchlist-btn ${added ? 'watchlist-remove' : ''}`}
      onClick={handleClick}
    >
      {showTrashIcon && added ? <Trash2 /> : null}
      <span>{label}</span>
    </button>
  );
};

export default WatchlistButton;
