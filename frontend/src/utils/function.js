import moment from "moment";

function getApplicationAgo(applicationCreatedDate) {
    let applicationDate = moment(applicationCreatedDate)
    const currentDate = moment();
    const currentMonth = currentDate.month();
    const applicationMonth = moment(applicationDate).month();

    if (currentMonth === applicationMonth && currentDate.year() === moment(applicationDate).year()) {
        // Application was created this month
        const daysAgo = currentDate.diff(applicationDate, 'days');
        if (daysAgo === 0) {
            return 'today';
        } else if (daysAgo === 1) {
            return 'yesterday';
        } else {
            return `${daysAgo} days ago`;
        }
    } else {
        // Application was created in a previous month
        const monthsAgo = currentDate.diff(applicationDate, 'months');
        return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
    }
}


function formatDateWithMonth(appliedDate) {
    let date = moment(appliedDate)
    return moment(date).format('MMM D');
    // return moment(date).format('MMMM D, YYYY');
}

// Example usage
// const applicationDate = moment('2024-03-07'); // Assuming the application date is '2024-03-07'
// console.log(formatDateWithMonth(applicationDate))

export { getApplicationAgo, formatDateWithMonth }