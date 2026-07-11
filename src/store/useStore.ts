import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: (item) => {
        const cart = get().cart;
        const existing = cart.find(
          (c) => c.product.id === item.product.id && c.size === item.size
        );
        if (existing) {
          set({
            cart: cart.map((c) =>
              c.product.id === item.product.id && c.size === item.size
                ? { ...c, quantity: c.quantity + item.quantity }
                : c
            ),
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },

      removeFromCart: (productId, size) => {
        set({
          cart: get().cart.filter(
            (c) => !(c.product.id === productId && c.size === size)
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        set({
          cart: get().cart.map((c) =>
            c.product.id === productId && c.size === size
              ? { ...c, quantity }
              : c
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () =>
        get().cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),

      getCartCount: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      toggleWishlist: (productId) => {
        const wishlist = get().wishlist;
        set({
          wishlist: wishlist.includes(productId)
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId],
        });
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),
    }),
    {
      name: "shoea-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
);
