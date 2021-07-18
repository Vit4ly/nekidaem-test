import {createStore} from "vuex";

export default createStore({
    state: {
        url: 'https://trello.backend.tests.nekidaem.ru/api/v1',

        newUser: {
            "username": "Vitaliy",
            "email": "user@example.com",
            "password": "Nekidaem7000"
        },
        userLogin: {
            "username": "Vitaliy",
            "password": "Nekidaem7000"
        },
        authToken: '',
        items: [],
        cardConfig: [
            {id: 0, title: 'on hold', color: 'hold'},
            {id: 1, title: 'in progress', color: 'progress'},
            {id: 2, title: 'needs review', color: 'review'},
            {id: 3, title: 'approved', color: 'approved'},
        ]
    },
    mutations: {
        getStorage(state, items) {
            state.items = items
        },

        dropCategory(state, elem) {
            const item = state.items.find(el => el.id === elem.id)
            const idx = state.items.indexOf(item)
            item.row = elem.categoryId
            state.items.splice(idx, 1)
            state.items.push(item)
            localStorage.setItem('items', JSON.stringify(state.items))
        },

        removeItem(state, removed) {
            const idx = state.items.indexOf(removed)
            state.items.splice(idx, 1)
            localStorage.setItem('items', JSON.stringify(state.items))
        }
    },
    actions: {
        async createUser(context) {
            try {
                const respones = await fetch(`${context.state.url}/users/create/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(context.state.newUser)
                })
                const dataUser = await respones.json()
                context.state.userName = dataUser.username
                context.state.email = dataUser.email
                context.state.authToken = dataUser.token
            } catch (e) {
                console.log(e)
            }

        },
        async login(context) {
            try {
                const respones = await fetch(`${context.state.url}/users/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(context.state.userLogin)
                })
                const token = await respones.json()
                context.state.authToken = token.token
            } catch (e) {
                console.log(e)
            }

        },
        async getCards(context) {
            try {
                const respones = await fetch(`${context.state.url}/cards/`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `JWT ${context.state.authToken}`,
                        "Content-Type": "application/json;charset=utf-8",
                    },
                })
                context.state.items = await respones.json()
                localStorage.setItem('items', JSON.stringify(context.state.items))
            } catch (e) {
                console.log(e)
            }
        },
        async createNewCard(context, newElem) {
            const elem = {id: 0, row: newElem.categoryId, seq_num: 0, text: newElem.text}
            try {
                const respones = await fetch(
                    'https://trello.backend.tests.nekidaem.ru/api/v1/cards/',
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `JWT ${context.state.authToken}`,
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(elem)
                    })
                const card = await respones.json()
                context.state.items.push(card)
                localStorage.setItem('items', JSON.stringify(context.state.items))
            } catch (e) {
                console.log(e)
            }
        },
        async deleteCard(context, item) {
            context.commit('removeItem', item)
            const id = item.id
            try {
                 await fetch(
                    `https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`,
                    {
                        method: 'DELETE',
                        headers: {
                            "Authorization": `JWT ${context.state.authToken}`,
                            "Content-Type": "application/json;charset=utf-8",
                        },
                    })
            } catch (e) {
                console.log(e)
            }
        },
        async updateCard(context, id) {
            const item = context.state.items.find(el => el.id === id)
            const idx = context.state.items.indexOf(item)
            try {
                await fetch(
                    `https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`,
                    {
                        method: 'PATCH',
                        headers: {
                            "Authorization": `JWT ${context.state.authToken}`,
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(context.state.items[idx])
                    })
            } catch (e) {
                console.log(e)
            }
        }

    },
    getters: {
        getCardConfig(state) {
            return state.cardConfig
        },
        getItems(state) {
            return state.items
        }
    },
    modules: {},
});
