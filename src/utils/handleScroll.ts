export const handleScroll = (
  ref: React.RefObject<HTMLElement>,
  callback: (() => unknown) | ((...arg: unknown[]) => unknown) | null
) => {
  if (
    callback &&
    ref.current?.clientHeight &&
    ref.current.scrollHeight - Math.round(ref.current?.scrollTop) ===
      ref.current?.clientHeight
  ) {
    callback();
  }
};
