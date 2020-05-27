export const addItemToCart = (cartItems, itemToAdd) => {
    const cartItem = cartItems.find(x => x.id === itemToAdd.id);

    if (!cartItem) {
        return [...cartItems, { ...itemToAdd, quantity: 1 }];
    }

    return cartItems.map(x => {
        return x.id === itemToAdd.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
    });
}

export const removeItemFromCart = (cartItems, itemToAdd) => {
    const cartItem = cartItems.find(x => x.id === itemToAdd.id);

    if (cartItem.quantity === 1) {
        return cartItems.filter(x => x.id !== itemToAdd.id);
    }

    return cartItems.map(item =>
        item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
}