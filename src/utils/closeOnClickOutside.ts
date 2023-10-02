export const closeOnClickOutside = <T extends HTMLElement>(
  e: MouseEvent,
  ref: React.RefObject<T>,
  callback: () => void
) => {
  if (ref.current && !ref.current.contains(e.target as Node)) {
    callback();
  }
};
