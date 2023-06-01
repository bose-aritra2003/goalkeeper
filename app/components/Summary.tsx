'use client';

import useBoardStore from "@/app/store/BoardStore";
import {useEffect, useState} from "react";
import getSummary from "@/app/actions/getSummary";
import {SiOpenai} from "react-icons/si";

const Summary = () => {
  const [board] = useBoardStore((state) => [
    state.board,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) {
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const summary = await getSummary(board);
        setSummary(summary);
      } catch (error: any) {
        try {
          const summary = await getSummary(board);
          setSummary(summary);
        } catch (error: any) {
          console.error(error);
          setSummary("GPT is having trouble summarising your tasks for the day...");
        } finally {
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [board]);

  return (
    <div className="px-5">
      <div className="flex items-center justify-between space-x-3 shadow-xl bg-white/80 max-w-3xl rounded-xl w-fit px-4 py-3 sm:py-5 sm:mx-auto">
        <SiOpenai size={64} className={`
          h-10 text-blue-600
          ${loading && 'animate-spin'}
        `}/>
        <p className="text-sm font-light italic text-blue-900">
          {
            summary && !loading ? summary : 'GPT is summarising your tasks for the day...'
          }
        </p>
      </div>
    </div>
  );
}
export default Summary;