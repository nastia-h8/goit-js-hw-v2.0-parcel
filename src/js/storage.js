const save = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);  
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.log("Set state error: ", error.message);
    }
}

const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.log("Set state error: ", error.message);
    }
}

const remove = key => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log("Set state error: ", error.message);
    }
}

export {save, load, remove};