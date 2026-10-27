
import { database } from "./fbConfig.js";

const discountsRef = database.ref("discounts");

async function save(purchase, discount) {
    const newItemRef = discountsRef.push();

    await newItemRef.set({
        purchase,
        discount
    });
}

async function edit(id, purchase, discount) {
    await discountsRef.child(id).update({
        purchase,
        discount
    });
}

async function removeData(id) {
    await discountsRef.child(id).remove();
}

async function searchAll() {
    const snapshot = await discountsRef.once("value");

    return snapshot.exists() ? snapshot.val() : {};
}

export { save, edit, removeData, searchAll };
