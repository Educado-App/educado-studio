/**
  * data-access for an app user
  * 
  * Last Modified: 10-11-2022
  * By: Anton + Charlotte
  **/

module.exports = function makeAppUserDb ({ makeDb }) {
    return Object.freeze({
        create,
        findById,
        findByPhone,
        remove,
        //update
    })


    async function create (appUserInfo) {
        // const result = await makeDb.in({
        //     ...appUserInfo
        // })

        return await makeDb.collection('appuser').create(appUserInfo)


        // const result = await db
        //     .collection('appuser')
        //     .insertOne({...appUserInfo})
        //const { ...appUserInfo } = result._doc
        //const { ...appUserInfo } = result.insertedId
        //return { result }
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
    /*
    async function update ({id: _id, phone: _phone }) {
        const db = await makeDb()
        return await db
            .collection('appuser')
            .findById(_id)
            .update(_phone)
    }
    */

    
}