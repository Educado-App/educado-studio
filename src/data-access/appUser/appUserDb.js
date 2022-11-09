/**
  * data-access for an app user
  * 
  * Last Modified: 09-11-2022
  * By: Anton + Charlotte
  **/

export default function makeAppUserDb ({ makeDb }) {
    return Object.freeze({
        create,
        findById,
        findByPhone,
        remove,
        update
    })

    async function create ({ phone: _phone, password: _password }) {
        const db = await makeDb()
        const result = await db
            .collection('appuser')
            .insertOne({_phone, _password})
        const { _phone: phone, _password: password} = result.insertedId
        return {phone, password}
        // -What happens to the date tho?
    }

    async function findById ({id: _id}) {
        const db = await makeDb()
        return await db
            .collection('appuser')
            .findById(_id)
    }

    async function findByPhone ({phone: _phone}) {
        const db = await makeDb()
        return await db
            .collection('appuser')
            .findOne(_phone)
    }

    // Returns count of how many app users are removed
    async function remove ({id: _id}) {
        const db = await makeDb()
        return await db
            .collection('appuser')
            .findByIdAndDelete(_id)
    }

    /** 
      * Hvis update() skal implementeres, skal vi beslutte om det er en funktionalitet der skal bruges i fremtiden.
      * Saafremt, det update() skal implementeres, vil der blive brug for en update-funktion til hver enkelt field.
      * Dvs. en updatePhone(), updatePassword() etc.
      * 
      * Dermed er update() herunder ikke testet eller implementeret endnu.
      */
    async function update ({id: _id, phone: _phone }) {
        const db = await makeDb()
        return await db
            .collection('appuser')
            .findById(_id)
            .update(_phone)
    }

    
}