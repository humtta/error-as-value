export interface Ok<T> {
  readonly ok: true;
  readonly value: T;
}
