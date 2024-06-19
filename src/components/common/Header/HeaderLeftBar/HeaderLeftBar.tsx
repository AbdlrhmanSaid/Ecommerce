import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import HeaderBasketLogo from "@assets/svg/cart.svg?react";
import WishlistLogo from "@assets/svg/wishlist.svg?react";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/hooks";

import styles from "./style.module.css";
const { headerLeftBar } = styles;

export const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const cartItemTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        title="Wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistLogo title="wishlist" />}
      />
      <HeaderCounter
        to="cart"
        title="Cart"
        totalQuantity={cartItemTotalQuantity}
        svgIcon={<HeaderBasketLogo title="cart" />}
      />
    </div>
  );
};
