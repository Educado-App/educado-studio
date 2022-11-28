const { ValidationError } = require("../../helpers/error")

module.exports = function buildMakeCourse({ Id, makeSection }) {

    return function makeCourse({
        id = Id.makeId(),
        title,
        description,
        author,
        coverImg,
        category,
        published = true,
        sections = [],
        createdAt = new Date(),
        modifiedAt = new Date()
    }) {

        let validSections = sections.map(section => makeSection(section))

        if (!title) throw new ValidationError('Course must have a title')
        if (!author) throw new ValidationError('Course must have an author')
        if (!description) throw new ValidationError('Course must have a description')

        return Object.freeze({
            getId: () => id,
            getTitle: () => title,
            getDescription: () => description,
            getAuthor: () => author,
            getCoverImg: () => coverImg,
            getCategory: () => category,
            isPublished: () => published,
            getCreatedAt: () => createdAt,
            getModifiedAt: () => modifiedAt,
            publish: () => published = true,
            unpublish: () => published = false,
            getSections: () => validSections,
            getSection: (section) => validSections.find(sect => sect.id === section.id),
            addSection,
            removeSectionById,
            moveSectionById

        })

        function moveSectionById({ section: id, to: sectionNumber }) {

            const toMove = validSections.find(section => section.id === id)

            if (toMove.sectionNumber === sectionNumber) {
                // Do nothing, section haven't moved
                return
            }
            else if (toMove.sectionNumber < sectionNumber) {
                validSections = moveDownSection(toMove, sectionNumber)
            }
            else {
                validSections = moveUpSection(toMove, sectionNumber)
            }
        }

        function moveUpSection(section, to) {
            // Moves DOWN every section in between sections current position and its end position
            let updatedSections = validSections.map(sect => {
                
                if (sect.sectionNumber >= to && sect.sectionNumber <= section.sectionNumber) {
                    return {...sect, sectionNumber: ++sect.sectionNumber}
                }

                return sect
            })

            const sectionIdx = updatedSections.findIndex(sect => sect.id === section.id)
            updatedSections[sectionIdx].sectionNumber = to

            return updatedSections
        }

        function moveDownSection(section, to) {
            // Moves UP every section in between sections current position and its end position
            let updatedSections = validSections.map(sect => {
                
                if (sect.sectionNumber >= section.sectionNumber && sect.sectionNumber <= to) {
                    return {...sect, sectionNumber: --sect.sectionNumber}
                }

                return sect
            })

            const sectionIdx = updatedSections.findIndex(sect => sect.id === section.id)
            updatedSections[sectionIdx].sectionNumber = to

            return updatedSections

        }

        function addSection(section) {
            let validSection = makeSection({ sectionNumber: getNextSectionNumber(), ...section })
            validSections.push(validSection)

            return validSection
        }

        function removeSectionById(id) {
            const reducedSections = validSections.filter(section => !(section.id === id))

            validSections = reducedSections
        }

        function getNextSectionNumber() {
            if (validSections.length > 0) {
                const max = Math.max(...validSections.map(section => section.sectionNumber))
                return max + 1
            }
            return 1
        }

    }
}