import PocketBase from 'pocketbase'

const contactAPI = store => {
    store.pb = new PocketBase('http://127.0.0.1:8090');

    store.pb.autoCancellation(false)

    store.getList = async function (collection, args = []) {
        try {
            const response = await store.pb.collection(collection).getList(...args)
            return response
        } catch (err) {
            return err
        }
    }

    store.getFullList = async function (collection, args = {}) {
        try {
            const response = await store.pb.collection(collection).getFullList(args)
            return response
        } catch (err) {
            return err
        }
    }

    store.getListItem = async function (collection, args = []) {
        try {
            const response = await store.pb.collection(collection).getFirstListItem(...args)
            return response
        } catch (err) {
            return err
        }
    }

    store.getFiles = async function (collection, file) {
        try {
            const response = await store.pb.files.getUrl(collection, file, { 'thumb': '100x100' })
            return response
        } catch (err) {
            return err
        }
    }

    store.authWithPassword = async function (credentials) {
        try {
            const response = await store.pb.collection('users').authWithPassword(...credentials)
            return response
        } catch (err) {
            return err
        }
    }

    store.postItem = async function (collection, postObj) {
        try {
            const response = await store.pb.collection(collection).create(postObj)
            return { status: 200, data: response }
        } catch (err) {
            return err
        }
    }

    store.editItem = async function (collection, editId, editObj) {
        try {
            console.log(editObj)
            const response = await store.pb.collection(collection).update(editId, editObj)
            return { status: 200, data: response }
        } catch (err) {
            return err
        }
    }

    store.deleteItem = async function (collection, deleteId) {
        try {
            const response = await store.pb.collection(collection).delete(deleteId)
            return { status: 200, data: response }
        } catch (err) {
            return err
        }
    }
}


export default contactAPI



