import PropTypes, {arrayOf} from 'prop-types'

export const objProp = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

export const categoryProp = PropTypes.arrayOf(PropTypes.shape({
    categoryOrder:  PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    ingredient: arrayOf(objProp).isRequired
}))