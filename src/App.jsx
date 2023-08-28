import "bootstrap/scss/bootstrap.scss";
import { useState } from "react";
import MenuItem from "./components/MenuItem";
import CartItem from "./components/CartItem";
import OrderItem from "./components/orderItem";

function App() {
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState({ cart: [] }); //提供初始值
  

  return (
    <div id="root">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <MenuItem cart={cart} setCart={setCart} />
          </div>
          <CartItem cart={cart} setCart={setCart} setOrder={setOrder} />
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-8">
            <OrderItem order={order} setOrder={setOrder}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
