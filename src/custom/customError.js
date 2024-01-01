import CustomError from '../custom/error.js'


const dataInvalid = new CustomError(
    'Data Invalid!',
    `Uh oh! the data you've sent is not as expected`,
    417
)

export default {
    dataInvalid,
}