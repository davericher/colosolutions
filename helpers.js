// Get Time
module.exports.getTime = () => {
    var time = new Date(),
        hrs = time.getHours(),
        mins = time.getMinutes();
    if (hrs < 10) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;
    var fTime = '[' + hrs + ":" + mins + ']';
    return fTime;
};
