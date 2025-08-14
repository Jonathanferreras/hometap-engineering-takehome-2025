import { useEffect, useState } from "react";

export type ToastType = "error" | "success" | "loading" | string;

export const Toast = ({
  type,
  title,
  body,
  duration = 3000,
}: {
  type: ToastType;
  title: string;
  body: string;
  duration?: number;
}) => {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(true); // utilized ChatGPT for mount/unmount logic so that the toast would dismiss after 3 seconds

  useEffect(() => {
    const t = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!mounted) return null;

  const bgColor =
    type === "error"
      ? "bg-red-600"
      : type === "success"
      ? "bg-green-600"
      : "bg-gray-600";

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000]">
      <div
        role="alert"
        aria-live="assertive"
        data-state={open ? "open" : "closed"}
        onTransitionEnd={(e) => {
          if (!open && e.target === e.currentTarget) setMounted(false);
        }}
        className={`pointer-events-auto fixed right-4 top-4 w-[22rem] max-w-[calc(100vw-2rem)]
               rounded-xl ${bgColor} text-white shadow-lg
               transition duration-300
               data-[state=closed]:opacity-0 data-[state=closed]:translate-y-2`}
      >
        <div className="flex items-start gap-3 p-4">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-1-5a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm.25-6.75a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="mt-1 text-sm text-white/90">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
