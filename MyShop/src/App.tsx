import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  // alert(
  //   "No Real Shopping Site! I just hosted one of my React Projects as a placeholder for this Domain. To use Paypal you need a personal Sandbox Account."
  // );
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Main />
    </BrowserRouter>
  );
}

export default App;
