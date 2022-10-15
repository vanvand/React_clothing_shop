// Outlet needed for nested routes
import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () =>  {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Index routes render in the parent routes outlet at the parent route's path. */}
        {/* just "index" equal to index={true} */}
        <Route index={true} element={<Home />} />
        {/* /* enable nested routes; if your match shop/ anything that follows render the Shop > inside the Shop there are further routes */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>      
    </Routes>
  );
}

export default App;
