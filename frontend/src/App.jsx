import {Route,Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import NewChat from "./pages/NewChat";
import DefaultPage from "./components/DefaultPage";

function App() {
  return (
    <div >

      <Routes>
        <Route path="/" element={<HomePage/>}>
          <Route path="/" element={<DefaultPage/>}/>
          <Route path="/:id" element={<NewChat/>}/>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
