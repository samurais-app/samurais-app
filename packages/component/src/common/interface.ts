
export type Event = {
  type: any
}
export type EventFunc = (event: Event) => void;
export type EventAsyncFunc = (event: Event) => Promise<void>;
export interface IEvent {
  onChange: EventFunc | EventAsyncFunc;
  onSelect: EventFunc | EventAsyncFunc;
  onClick: EventFunc | EventAsyncFunc;
}

export interface FieldProps {
  error?: string;
}

export type Size = 'small' | 'middle' | 'large';