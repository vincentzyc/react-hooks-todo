import React, { useEffect, useContext, useReducer } from "react";

import Store from "./context";
import reducer from "./reducer";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function usePersistedContext(context, key = "state") {
  const persistedContext = localStorage.getItem(key);
  return persistedContext ? JSON.parse(persistedContext) : context;
}

function usePersistedReducer([state, dispatch], key = "state") {
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [state]);
  return [state, dispatch];
}

function App() {
  console.log(Store);
  // create a global store to store the state
  const globalStore = usePersistedContext(useContext(Store), "state");

  // `todos` will be a state manager to manage state.
  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    "state" // The localStorage key
  );

  return (
    // State.Provider passes the state and dispatcher to the down
    <div style={{ textAlign: 'center' }}>
      <Store.Provider value={{ state, dispatch }} >
        <TodoForm />
        <TodoList />
      </Store.Provider>
    </div>
  );
}

export default App;
