import { useSnackbar } from "notistack";
import React, { useState } from "react";
export const CartContext = React.createContext();

const CartProvider = ({ children }) => {

  const { enqueueSnackbar } = useSnackbar();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [contador, setContador] = useState(0);

  const cleanCart = () => {
    setCart([]);
    setTotal(0);
    setContador(0);
  };
  const onDeleteProduct = product => {
		const results = cart.filter(
			item => item.codigo !== product.codigo
		);

		setTotal(total - product.precio * product.cantidad);
		setContador(contador - product.cantidad);
		setCart(results);
    enqueueSnackbar("Se elimino un producto del carrito", {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
	};

  const onAddProduct = (items) => {
    const { codigo, nombre, precio, imagenes } = items;

    if (cart.find((item) => item.codigo === codigo)) {
      const products = cart.map((item) =>
        item.codigo === codigo ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setTotal(total + items.precio * items.cantidad);
      setContador(contador + items.cantidad);
      return setCart([...products]);
    }
    setTotal(total + items.precio * items.cantidad);
    setContador(contador + items.cantidad);
    setCart((prevCart) => [
      ...prevCart,
      {
        codigo,
        cantidad: 1,
        nombre,
        precio,
        imagen: imagenes[0],
      },
    ]);
    enqueueSnackbar("Se agrego un producto al carrito :D", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        setTotal,
        contador,
        setContador,
        cleanCart,
        onDeleteProduct,
        onAddProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
