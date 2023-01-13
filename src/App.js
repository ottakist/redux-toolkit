import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
function App() {
  const {cartItems} = useSelector(state=>state.cart)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])
  
  return (
    <main>
      <Modal/>
      <Navbar/>
      <CartContainer/>
    </main>
  );
}
export default App;
