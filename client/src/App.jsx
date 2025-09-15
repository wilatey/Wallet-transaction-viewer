import TransactionViewer from "../pages/TransactionViewer";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Rounte path="/" element={<TransactionViewer />}></Rounte>
      </Routes>
    </div>
  );
}

export default App;
