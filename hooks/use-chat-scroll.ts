"use client";
import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  console.log("useChatScroll", count);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topDiv!.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };
    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;

    const topDiv = chatRef?.current;
    console.log("bottomDiv", bottomDiv);
    console.log("topDiv", topDiv);

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) return false;

      const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop;
      console.log(distanceFromBottom);

      return distanceFromBottom < 800;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomDiv!.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [chatRef, bottomRef, count, hasInitialized]);
};
