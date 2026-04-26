import RecipesManager from "./components/RecipesManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Yalnız bu qalmalıdır

function App() {
    
  return (
    <div className="App">
      {/* Əsas komponentimiz */}
      <RecipesManager />

      {/* 🚀 2. Bildirişlərin görünməsi üçün bu konteyner mütləq olmalıdır */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;