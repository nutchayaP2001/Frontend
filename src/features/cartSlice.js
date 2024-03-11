
export const addToCart = (productId, quantity, product) => ({
    type: 'ADD_TO_CART',
    payload: {productId, quantity,product},
});

export const postCartToDatabase = (cartItems,salesNo) => ({
    type: 'POST_CART',
    payload: {cartItems, salesNo}
})

export const clearCart = () => ({
    type: 'CLEAR_CART',
})

export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: {productId},
});

export const updateProductCount = (productId, newQuantity) => ({
    type: 'UPDATE_CART_ITEM_QUANTITY',
    payload: { productId, newQuantity }

})

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const { productId, quantity,product } = action.payload;
            const existingItem = state.cartItems.find((item) => item.productId === productId);

            let updatedCart;
            if(existingItem){
                // return {
                //     ...state,
                updatedCart = state.cartItems.map((item) => 
                    item.productId === productId ? {...item, quantity: item.quantity + 1} : item);
                // }
            }else{
                // return{
                //     ...state,
                updatedCart = [...state.cartItems, {productId, quantity,product}]
                // };
            }

            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return {
                ...state,
                cartItems: updatedCart
            };

            case 'CLEAR_CART':
                return{
                    ...state,
                    cartItems: [],
                };
            
            case 'REMOVE_FROM_CART':
                const {productId: deletedItem} = action.payload;
                const removeCart = state.cartItems.filter((item) => item.productId !== deletedItem);
                localStorage.setItem('cartItems', JSON.stringify(removeCart));

                return {
                    ...state,
                    cartItems: removeCart,
                };
                case 'UPDATE_CART_ITEM_QUANTITY':
                    const {productId: updateProId, newQuantity} = action.payload;
                    // return{
                       const updatedQuantity = state.cartItems.map((item) => 
                        item.productId === updateProId ? { ...item, quantity: newQuantity} : item);

                        localStorage.setItem('cartItems', JSON.stringify(updatedQuantity));

                        return {
                            ...state,
                            cartItems: updatedQuantity,
                        };
                    // }

                    case 'POST_CART' :
                        return{
                            ...state,
                            cartItems: [],
                        };

            default:
                return state;

    }
}

export default cartSlice;