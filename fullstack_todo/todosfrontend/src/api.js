const APIURL = '/api/todos/';

export async function getTodos() {
    return fetch(APIURL)
        .then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(d => {
                        let err = { errorMessage: d.message }
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server not responding' }
                    throw err;
                }
            }
            return res.json()
        })

}
export async function createTodo(val) {
    return fetch(APIURL, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/json',
        }),
        body: JSON.stringify({ name: val })
    })
        .then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(d => {
                        let err = { errorMessage: d.message }
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server not responding' }
                    throw err;
                }
            }
            return res.json()
        })

}
export async function removeTodo(id) {
    const deleteURL = APIURL + id;
    return fetch(deleteURL, {
        method: 'DELETE',
    })
        .then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(d => {
                        let err = { errorMessage: d.message }
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server not responding' }
                    throw err;
                }
            }
            return res.json()
        })


}
export async function updateTodo(todo) {
    const updateURL = APIURL + todo._id;
    return fetch(updateURL, {
        method: 'PUT',
        headers: new Headers({
            'Content-type': 'application/json',
        }),
        body: JSON.stringify({ completed: !todo.completed })
    })
        .then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(d => {
                        let err = { errorMessage: d.message }
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server not responding' }
                    throw err;
                }
            }
            return res.json()
        })

}