import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Dish } from '../../types/Dish';
import secureLocalStorage from 'react-secure-storage';
import { Chef } from '../../types/Chef';
import { CartItem } from '../../types/CartItem';
import { Address } from '../../types/Address';
import { OrderItem } from '../../types/Order';
import { createOrder } from '../../service/api/order';

interface CartContextProps {
  addToCart: (item: Dish, quantity?: number) => void;
  removeFromCart: (item: Dish) => void;
  deleteFromCart: (item: Dish) => void;
  getTotalPrice: () => number;
  getPricePerChef: (chefId: string) => number;
  getItensPerChef: (chefId: string) => CartItem[];
  cartItems: CartItem[];
  chefsInCart: Chef[];
  clearCartItems: () => void;
  getItemsCount: () => number;
  isPaid: boolean;
  confirmPayment: () => void;
  activeAddress: Address | undefined;
  setActiveAddress: Dispatch<SetStateAction<Address | undefined>>;
  sendOrder: () => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProviderContext = ({ children }: CartProviderProps) => {
  const storedCartItems = secureLocalStorage.getItem('cart');
  const items = storedCartItems ? JSON.parse(storedCartItems as string) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [chefsInCart, setChefsInCart] = useState<Chef[]>([]);
  const [isPaid, setIsPaid] = useState(false);
  const [activeAddress, setActiveAddress] = useState<Address>();

  useMemo(() => {
    secureLocalStorage.setItem('cart', JSON.stringify(cartItems));
    const chefs: Chef[] = [];
    cartItems.map(item => {
      if (
        !chefs.includes(
          chefs.find(chef => chef.id === item.item.chef.id) || ({} as Chef)
        )
      ) {
        chefs.push(item.item.chef);
      }
    });
    setChefsInCart(chefs);
  }, [cartItems]);

  useEffect(() => {
    if (activeAddress) {
      secureLocalStorage.setItem(
        'activeAddress',
        JSON.stringify(activeAddress)
      );
    }
  }, [activeAddress]);

  const addToCart = (item: Dish, quantity = 1) => {
    setIsPaid(false);
    const isItemInCart = cartItems.find(
      cartItem => cartItem.item.id === item.id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { item, quantity: quantity }]);
    }
  };

  const deleteFromCart = (item: Dish) =>
    setCartItems(cartItems.filter(cartItem => cartItem.item.id !== item.id));
  const removeFromCart = (item: Dish) => {
    const isItemInCart = cartItems.find(
      cartItem => cartItem.item.id === item.id
    );

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem.item.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };
  const getTotalPrice = () =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.item.unit_price * cartItem.quantity,
      0
    );
  const getPricePerChef = (chefId: string) =>
    cartItems.reduce(
      (total, cartItem) =>
        cartItem.item.chef.id === chefId
          ? total + cartItem.item.unit_price * cartItem.quantity
          : 0,
      0
    );
  const getItensPerChef = (chefId: string) =>
    cartItems.filter(cartItem => cartItem.item.chef.id === chefId);

  const clearCartItems = () => setCartItems([]);

  const getItemsCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const sendOrder = async () => {
    const orderItems: OrderItem[] = cartItems.map(item => ({
      dish_id: item.item.id!,
      amount: item.quantity
    }));
    await createOrder({
      delivery_address_id: activeAddress!.id,
      items_attributes: orderItems
    });
  };

  const confirmPayment = () => setIsPaid(true);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getTotalPrice,
        getPricePerChef,
        cartItems,
        chefsInCart,
        getItensPerChef,
        clearCartItems,
        getItemsCount,
        deleteFromCart,
        isPaid,
        confirmPayment,
        activeAddress,
        setActiveAddress,
        sendOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'This hook needs to be called within the CartContextProvider'
    );
  }

  return { ...context };
};
