import React from 'react';

import { useImmer } from 'use-immer';

const ShoppingListWithImmer = () => {
    const [shoppingList, updateShoppingList] = useImmer([
        { id: 1, name: 'Apple', quantity: 5, details: { category: 'Fruits', notes: 'Buy organic' } },
        { id: 2, name: 'Milk', quantity: 1, details: { category: 'Dairy', notes: '' } }
    ]);

    const addItem = () => {
        updateShoppingList(draft => {
            draft.push({
                id: Date.now(),
                name: 'New Item',
                quantity: 1,
                details: { category: '', notes: '' }
            });
        });
    };

    const updateItem = (id, updates) => {
        updateShoppingList(draft => {
            const itemIndex = draft.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                draft[itemIndex] = { ...draft[itemIndex], ...updates };
            }
        });
    };

    const removeItem = (id) => {
        updateShoppingList(draft => {
            const itemIndex = draft.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                draft.splice(itemIndex, 1);
            }
        });
    };

    return (
        <div>
            <h1>Shopping List</h1>
            <button onClick={addItem}>Add Item</button>
            <ul>
                {shoppingList.map(item => (
                    <li key={item.id}>
                        <div>
                            Name: <input type="text" value={item.name} onChange={(e) => updateItem(item.id, { name: e.target.value })} />
                        </div>
                        <div>
                            Quantity: <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) })} />
                        </div>
                        <div>
                            Category: <input type="text" value={item.details.category} onChange={(e) => updateItem(item.id, { details: { ...item.details, category: e.target.value } })} />
                        </div>
                        <div>
                            Notes: <input type="text" value={item.details.notes} onChange={(e) => updateItem(item.id, { details: { ...item.details, notes: e.target.value } })} />
                        </div>
                        <button onClick={() => removeItem(item.id)}>Remove Item</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingListWithImmer;
