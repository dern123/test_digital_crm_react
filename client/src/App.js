import logo from './logo.svg';
import './App.css';
import Head from "./components/Head/Head";
import Footer from "./components/Footer/Footer";
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Head/>

      <div className="container__main emails">
        <img src="https://picsum.photos/200/300" alt="logo" className="img_main" />
        <AppRoutes/>
        <p>Test content within the container</p>
      </div>

      <Footer name={"CRM React"}/>
    </>
  );
}

export default App;
