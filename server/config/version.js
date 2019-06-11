const isRelease = process.env.RELEASE;
const releaseDate = process.env.RELEASEDATE;
const today = new Date();
let version = today.getTime();

if(isRelease){
    version = releaseDate;
}

const getRandomNum = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

export const staticVersion = function(){
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    if(month < 10)
        month = '0' + month;

    if(date < 10)
        date = '0' + date;

    let version = year + month + date + '_';

    if(isRelease)
        version +=  releaseDate;
    else
        version += getRandomNum(0, 1000);

    return version;
};

export default version;