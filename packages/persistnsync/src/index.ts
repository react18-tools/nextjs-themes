import { StateCreator } from "zustand";

export type PersistNSyncTypeOptions = { name: string };
type PersistNSyncType = <T>(f: StateCreator<T, [], []>, options: PersistNSyncTypeOptions) => StateCreator<T, [], []>;

export const persistNSync: PersistNSyncType = (f, options) => (set, get, store) => {
  const { name } = options;

  /** avoid error during serverside render */
  if (!globalThis.localStorage) return f(set, get, store);
  const initRef = { init: process.env.NODE_ENV == "development" ? 4 : 2 };
  const savedState = localStorage.getItem(name);

  const channel = globalThis.BroadcastChannel ? new BroadcastChannel(name) : undefined;

  const set_: typeof set = (...args) => {
    if (savedState && initRef.init > 0) {
      set(JSON.parse(savedState));
      initRef.init--;
    } else {
      const prevState = get() as { [k: string]: any };
      set(...args);
      const currentState = get() as { [k: string]: any };
      localStorage.setItem(name, JSON.stringify(currentState));
      if (!channel) return;
      const stateUpdates: { [k: string]: any } = {};
      Object.keys(currentState).forEach(k => {
        if (currentState[k] !== prevState[k]) {
          stateUpdates[k] = currentState[k];
        }
      });
      if (Object.keys(stateUpdates).length) {
        channel?.postMessage(stateUpdates);
      }
    }
  };

  if (channel) {
    channel.onmessage = e => {
      set(e.data);
    };
  }
  return f(set_, get, store);
};
