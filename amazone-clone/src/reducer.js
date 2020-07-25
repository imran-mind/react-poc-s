export const initialState ={
    basket:[
    ],
    user: null
}

export const getBasketTotal = (basket) =>{
    return basket?.reduce((amount,item)=> parseFloat(item.price) + amount, 0);
}

function reducer(state, action) {
    console.log(action)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case 'REMOVE_FROM_BASKET':
            //Logic for remoing item from basket
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((i)=>i.id===action.id);

            if(index >=0 ){
                //item exist in basket remove it
                newBasket.splice(index,1)
            }else{
                console.log("Can't remove ")
            }
            return {
                ...state,
                basket: newBasket
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;