import { useState } from "react";

const data = [
  {
    id: 1,
    name: "珍珠奶茶",
    description: "香濃奶茶搭配QQ珍珠",
    price: 50,
  },
  {
    id: 2,
    name: "冬瓜檸檬",
    description: "清新冬瓜配上新鮮檸檬",
    price: 45,
  },
  {
    id: 3,
    name: "翡翠檸檬",
    description: "綠茶與檸檬的完美結合",
    price: 55,
  },
  {
    id: 4,
    name: "四季春茶",
    description: "香醇四季春茶，回甘無比",
    price: 45,
  },
  {
    id: 5,
    name: "阿薩姆奶茶",
    description: "阿薩姆紅茶搭配香醇鮮奶",
    price: 50,
  },
  {
    id: 6,
    name: "檸檬冰茶",
    description: "檸檬與冰茶的清新組合",
    price: 45,
  },
  {
    id: 7,
    name: "芒果綠茶",
    description: "芒果與綠茶的獨特風味",
    price: 55,
  },
  {
    id: 8,
    name: "抹茶拿鐵",
    description: "抹茶與鮮奶的絕配",
    price: 60,
  },
];

function MenuItem({ cart, setCart }) {
  const [drinks] = useState(data);

  const addToCart = (drink) => {
    console.log("當前:", drink);
    const expandedDrink = { ...drink };
    console.log("展開:", expandedDrink);

    setCart([
      ...cart,

      {
        // drink 的內容加上一些新的屬性
        ...drink,
        id: new Date().getTime(),
        quantity: 1,
        subtotal: drink.price, //之後在updateCart去設定正確總計
      },
    ]);

    const thisCart = { ...cart };
    console.log("購物車:", thisCart);
  };
  return (
    <>
      <div className="list-group">
        {drinks.map((drink) => {
          return (
            <a
              key={drink.id}
              href="#"
              className="list-group-item list-group-item-action"
              onClick={(e) => {
                e.preventDefault(); //防止頁面跳轉
                addToCart(drink);
              }}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{drink.name}</h5>
                <small>{drink.price}</small>
              </div>
              <p className="mb-1">{drink.description}</p>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default MenuItem;
