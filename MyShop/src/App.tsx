import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // alert(
  //   "No Real Shopping Site! I just hosted one of my React Projects as a placeholder for this Domain. To use Paypal you need a personal Sandbox Account."
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
