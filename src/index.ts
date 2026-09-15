export type Result<T, E = Error> = Ok<T> | Err<E>;

export interface Ok<T> {
  readonly ok: true;
  readonly value: T;
}

export interface Err<E> {
  readonly ok: false;
  readonly error: E;
}

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

export function attempt<T>(fn: () => Promise<T>): Promise<Result<T, Error>>;
export function attempt<T>(fn: () => T): Result<T, Error>;

export function attempt<T>(
  fn: () => T | Promise<T>,
): Result<T, Error> | Promise<Result<T, Error>> {
  try {
    const value = fn();
    return value instanceof Promise ? value.then(ok, toErr) : ok(value);
  } catch (caught) {
    return toErr(caught);
  }
}

function toErr(caught: unknown): Result<never, Error> {
  return err(caught instanceof Error ? caught : new Error(String(caught)));
}
