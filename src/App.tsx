import  Routes  from "./Routes";
import Header from "./components/Header";
import { ChurrasProvider } from "./context/churras.context";

function App() {


  return (
    <ChurrasProvider>
      <Header/>
      <Routes/>
    </ChurrasProvider>
  )
}

export default App
