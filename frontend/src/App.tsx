import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import { MyShopContextProvider } from "./contexts/MyShopContext";

function App() {
  return (
    <>
      <MyShopContextProvider>
        <Header />
        <Sidebar />
        <Main />
      </MyShopContextProvider>
    </>
  );
}

export default App;
