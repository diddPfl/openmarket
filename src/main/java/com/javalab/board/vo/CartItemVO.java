package com.javalab.board.vo;

public class CartItemVO {
    private Long cartItemId;
    private Long cartId;
    private Long itemId;
    private String itemName;
    private int price; // Keep as int
    private int count;

    // Getters and setters for all fields

    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    // Calculate total price based on count
    public int getTotalPrice() {
        return price * count; // Calculate total price as int
    }

    @Override
    public String toString() {
        return "CartItemVO{" +
                "cartItemId=" + cartItemId +
                ", cartId=" + cartId +
                ", itemId=" + itemId +
                ", itemName='" + itemName + '\'' +
                ", price=" + price +
                ", count=" + count +
                '}';
    }
}