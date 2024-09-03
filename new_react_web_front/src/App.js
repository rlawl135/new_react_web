import { Route, Routes } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={""} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
