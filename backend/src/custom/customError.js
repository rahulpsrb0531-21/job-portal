import CustomError from '../custom/error.js'


const dataInvalid = new CustomError(
    'Data Invalid!',
    `Uh oh! the data you've sent is not as expected`,
    417
)

const userExists = new CustomError(
    'Em Exists!',
    `The email entered is already registered`,
    // `Uh oh! the phone number entered is already registered`,
    409
)

const applicationExists = new CustomError(
    'Em Exists!',
    `The application is already applied`,
    409
)

const jobAlreadyExists = new CustomError(
    'Em Exists!',
    `The job is already saved`,
    409
)

export default {
    dataInvalid, userExists, applicationExists, jobAlreadyExists
}