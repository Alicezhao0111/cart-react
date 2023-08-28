import { useEffect } from "react";
import { useState } from "react";


function CartItem({cart, setCart, setOrder}) {
    
    const [sum, setSum] = useState(0);
    const [description, setDescription] = useState('');

    const createOrder=()=>{
        setOrder({
            id: new Date().getTime(),
            cart,
            description,
            sum
        })
        setCart([])
        setDescription('')
    }

    useEffect(()=>{
        const total=cart.reduce((prev,next)=>{
            return prev+next.price*next.quantity
        },0)
        setSum(total)
    },[cart])
    

  const updateCart = (item, value) => {
    //更新購物車中特定項目的數量和小計
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: parseInt(value), //確保是整數
          subtotal: cartItem.price * parseInt(value),
        };
      }
      return cartItem;
    });
    setCart(newCart);
    console.log("更新數量的購物車 ", newCart);
  };
  return (
    <>
      <div className="col-md-8">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" width="50">
                操作
              </th>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col" width="90">
                數量
              </th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          
          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => {
                        const newCart = cart.filter((cartItem) => {
                          return cartItem.id !== item.id;
                        });
                        setCart(newCart);
                        console.log(newCart); //刪除後的購物車清單
                      }}
                    >
                      x
                    </button>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <small>{item.description}</small>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      onChange={(e) => {
                        const value = e.target.value;
                        updateCart(item, value); //呼叫對應的參數
                      }}
                    >
                      {[...Array(10).keys()].map((item) => {
                        //.keys()->轉換成一個真正的陣列 [0, 1, 2, ... 9]
                        return (
                          <option value={item + 1} key={item}>
                            {item + 1}
                          </option>
                        ); //回調+1
                      })}
                    </select>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.subtotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/*三元運算子開始*/}
        {cart.length===0 ? <div className="alert alert-primary text-center" role="alert">請選擇商品</div>:
        (<><div className="text-end mb-3">
          <h5 className="totalPrice">
            總計: <span>${sum}</span>
          </h5>
        </div>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="備註"
          value={description} //確保textarea的值真的受控於description這個state (當時送出後無法清空才加上)
          onChange={(e) => {
            setDescription(e.target.value);
            console.log("備註:", e.target.value);
          }}
        ></textarea>
        <div className="text-end">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              createOrder();
            }}
          >
            送出
          </button>
        </div></>)
        }
         {/*三元運算子結束 */}
      </div>
    </>
  );
}

export default CartItem;
