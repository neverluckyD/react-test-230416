// import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import SearchHistory from "./components/SearchHistory";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="container  p-3">
          <Nav />
          <SearchBar />
          <SearchResult />
          <SearchHistory />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
