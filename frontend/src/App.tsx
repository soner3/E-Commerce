import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { MyShopContextProvider } from "./contexts/MyShopContext";

function App() {
  return (
    <>
      <MyShopContextProvider>
        <Header />
        <Main />
        <Footer />
      </MyShopContextProvider>
    </>
  );
}

export default App;
