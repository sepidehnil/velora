import { create } from "zustand";
import { CartItem } from "@/types";

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  initialized: boolean;
  init: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useStore = create<StoreState>()(
  (set, get) => ({
    cart: [],
    wishlist: [],
    initialized: false,

    init: async () => {
      if (get().initialized) return;
      const [cartRes, wishlistRes] = await Promise.all([
        fetch("/api/cart"),
        fetch("/api/wishlist"),
      ]);
      const cartData = await cartRes.json();
      const wishlistData = await wishlistRes.json();
      set({
        cart: cartData.cart ?? [],
        wishlist: wishlistData.wishlist ?? [],
        initialized: true,
      });
    },

    addToCart: (item) => {
      const cart = get().cart;
      const existing = cart.find((c) => c.product.id === item.product.id);
      const next = existing
        ? cart.map((c) =>
            c.product.id === item.product.id
              ? { ...c, quantity: c.quantity + item.quantity }
              : c
          )
        : [...cart, item];
      set({ cart: next });

      void fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.product.id,
          quantity: item.quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => set({ cart: data.cart ?? next }));
    },

    removeFromCart: (productId) => {
      const next = get().cart.filter((c) => c.product.id !== productId);
      set({ cart: next });
      void fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => set({ cart: data.cart ?? next }));
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return;
      }
      const next = get().cart.map((c) =>
        c.product.id === productId ? { ...c, quantity } : c
      );
      set({ cart: next });
      void fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })
        .then((res) => res.json())
        .then((data) => set({ cart: data.cart ?? next }));
    },

    clearCart: () => {
      set({ cart: [] });
      void fetch("/api/cart", { method: "DELETE" });
    },

    getCartTotal: () =>
      get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

    getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

    toggleWishlist: (productId) => {
      const wishlist = get().wishlist;
      const wished = wishlist.includes(productId);
      const next = wished
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];
      set({ wishlist: next });

      void fetch("/api/wishlist", {
        method: wished ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => set({ wishlist: data.wishlist ?? next }));
    },

    isInWishlist: (productId) => get().wishlist.includes(productId),
  })
);
