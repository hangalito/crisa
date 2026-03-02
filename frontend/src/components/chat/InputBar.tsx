import { FormEvent, KeyboardEvent, useState } from "react";

type InputBarProps = {
  disabled: boolean;
  onSendMessage: (value: string) => Promise<void>;
};

export function InputBar({ disabled, onSendMessage }: InputBarProps) {
  const [value, setValue] = useState("");
  const [invalidPulse, setInvalidPulse] = useState(false);

  const submitMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) {
      setInvalidPulse(true);
      window.setTimeout(() => setInvalidPulse(false), 240);
      return;
    }

    setValue("");
    await onSendMessage(trimmed);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        void submitMessage(event);
      }}
      className="mx-auto flex w-full max-w-4xl items-end gap-2 rounded-[24px] border border-pink-200/70 bg-white/90 p-2 shadow-[0_8px_24px_rgba(236,72,153,0.12)] backdrop-blur dark:border-pink-900/40 dark:bg-slate-950/90"
    >
      <label htmlFor="message" className="sr-only">
        Type your message
      </label>
      <textarea
        id="message"
        name="message"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Write a message to Crisa..."
        rows={1}
        disabled={disabled}
        className={[
          "min-h-11 max-h-40 flex-1 resize-none rounded-2xl border bg-transparent px-4 py-2 text-sm text-slate-900 outline-none transition",
          "placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500",
          invalidPulse
            ? "border-rose-400 ring-2 ring-rose-200 dark:ring-rose-900"
            : "border-transparent focus:border-pink-300 focus:ring-2 focus:ring-pink-200 dark:focus:border-pink-700 dark:focus:ring-pink-900/60",
        ].join(" ")}
        aria-invalid={invalidPulse}
      />
      <button
        type="submit"
        disabled={disabled}
        className="h-11 rounded-2xl bg-pink-600 px-4 text-sm font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:bg-pink-300 dark:bg-pink-500 dark:hover:bg-pink-400 dark:disabled:bg-pink-800"
      >
        {disabled ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
