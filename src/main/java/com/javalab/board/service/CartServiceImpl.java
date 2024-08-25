package com.javalab.board.service;

import com.javalab.board.repository.CartRepository;
import com.javalab.board.repository.CartItemRepository;
import com.javalab.board.repository.ItemRepository;
import com.javalab.board.vo.CartItemVO;
import com.javalab.board.vo.CartVO;
import com.javalab.board.vo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CartServiceImpl implements CartService {

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, ItemRepository itemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public CartVO getCartByMemberId(Long memberId) {
        logger.info("Fetching cart for member ID: {}", memberId);
        CartVO cart = cartRepository.findByMemberId(memberId);
        if (cart == null) {
            logger.info("No cart found for member ID: {}. Creating a new one.", memberId);
            cart = createCart(memberId);
        }
        return cart;
    }

    @Override
    @Transactional
    public CartVO createCart(Long memberId) {
        logger.info("Creating new cart for member ID: {}", memberId);
        CartVO cart = new CartVO();
        cart.setMemberId(memberId);
        cartRepository.insertCart(cart);
        return cart;
    }

    @Override
    public List<CartItemVO> getCartItems(Long cartId) {
        logger.info("Fetching cart items for cart ID: {}", cartId);
        List<CartItemVO> items = cartItemRepository.findItemsByCartId(cartId);
        for (CartItemVO item : items) {
            logger.info("Cart Item: {}, Price: {}, Count: {}", item.getItemName(), item.getPrice(), item.getCount());
        }
        return items;
    }

    @Override
    @Transactional
    public void addCartItem(CartItemVO cartItem) {
        logger.info("Adding cart item: {}", cartItem);
        cartItemRepository.insertCartItem(cartItem);
    }

    @Override
    @Transactional
    public void updateCartItem(CartItemVO cartItem) {
        logger.info("Updating cart item: {}", cartItem);
        cartItemRepository.updateCartItem(cartItem);
    }

    @Override
    @Transactional
    public void removeCartItem(Long cartItemId) {
        logger.info("Removing cart item with ID: {}", cartItemId);
        cartItemRepository.deleteCartItem(cartItemId);
    }

    @Override
    @Transactional
    public void clearCart(Long cartId) {
        logger.info("Clearing all items from cart with ID: {}", cartId);
        cartItemRepository.deleteAllCartItems(cartId);
    }

    @Override
    @Transactional
    public void addItemToCart(Long cartId, Long itemId, int count) {
        CartItemVO existingItem = cartItemRepository.findByCartIdAndItemId(cartId, itemId);
        if (existingItem != null) {
            existingItem.setCount(existingItem.getCount() + count);
            updateCartItem(existingItem);
        } else {
            Item item = itemRepository.findById(itemId);
            if (item == null) {
                throw new RuntimeException("Item not found");
            }
            CartItemVO newItem = new CartItemVO();
            newItem.setCartId(cartId);
            newItem.setItemId(itemId);
            newItem.setItemName(item.getItemName());
            newItem.setPrice(item.getPrice());
            newItem.setCount(count);
            logger.info("Adding new item to cart: {}, Price: {}, Count: {}", newItem.getItemName(), newItem.getPrice(), newItem.getCount());
            addCartItem(newItem);
        }
    }

    @Override
    public CartItemVO getCartItem(Long cartItemId) {
        logger.info("Fetching cart item with ID: {}", cartItemId);
        CartItemVO item = cartItemRepository.findById(cartItemId);
        if (item == null) {
            logger.warn("Cart item not found with ID: {}", cartItemId);
        } else {
            logger.info("Found cart item: {}", item);
        }
        return item;
    }

    @Override
    @Transactional
    public void updateCartItemCount(Long cartItemId, int count) {
        logger.info("Updating count for cart item. ID: {}, New Count: {}", cartItemId, count);
        CartItemVO cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem != null) {
            cartItem.setCount(count);
            cartItemRepository.updateCartItem(cartItem);
            logger.info("Updated cart item: {}", cartItem);
        } else {
            logger.error("Cart item not found with ID: {}", cartItemId);
            throw new RuntimeException("Cart item not found");
        }
    }
}