import { database } from "./fbConfig.js";
import {
    get,
    ref,
    push,
    set,
    remove,
    update,
    child,
 } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

 const discountsRef = ref(database, "discounts");

 async function save(purchase, discount) {
    const newItemRef = await push(discountsRef);
    await set(newItemRef, {purchase, discount});
 }

 async function edit(id, purchase, discount) {
    const itemRef = await child(discountsRef, id);
    await update(itemRef, {purchase, discount});
 }

 async function removeData(id) {
    const itemRef = await child(discountsRef, id);
    await remove(itemRef);
 }

 async function searchAll() {
    const snapshot = await get(discountsRef);
    return snapshot.exists() ? snapshot.val() : {};
 }

 export { save, edit, removeData, searchAll };