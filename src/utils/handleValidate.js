/* eslint-disable */
export function validateYouTubeUrl(url) {
    if (url) {
        var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(regExp)) {
            return true;
        }
    }
    return false;
}

export function truncate(str, length) {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
}

export const formatDate = (input) => {
    var datePart = input.match(/\d+/g),
    // year = datePart[0].substring(2), // get only two digits
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
}

export const reverseTimeDate = (timedate) => {
    let temp = timedate.split(" ");
    temp[0] = formatDate(temp[0]);
    return temp.reverse().join("  ");
}

export function YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

export function toHHMMSS (time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

const paddingTime = (n) => { return (n < 10) ? ('0'+n) : n };

export function converter_ISO8601_To_YYYYMMDDHHMMSS (original) {
    // '2018-09-18T06:39:51Z'
    var source_iso = original; 
    // if(source_iso.indexOf(".")==-1) {
    //     source_iso =source_iso.replace("Z", ".000Z");
    // }

    var d = new Date(source_iso);
    var day= paddingTime(d.getUTCDate());
    var month= paddingTime(d.getUTCMonth() + 1);
    var year= d.getUTCFullYear();
    var hours= paddingTime(d.getUTCHours() + 7);
    var minutes= paddingTime(d.getUTCMinutes());
    var seconds= paddingTime(d.getUTCSeconds());

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

export function defaultISODateString() {
    var d = new Date();
    return d.getUTCFullYear() +
        '-' + paddingTime(d.getUTCMonth() + 1) +
        '-' + paddingTime(d.getUTCDate()) 
        // + 'T' + paddingTime(d.getUTCHours() + 7) +
        // ':' + paddingTime(d.getUTCMinutes())
        // // + ':' + paddingTime(d.getUTCSeconds())
}

export const getCurrRoleUser = (profile) => {
    return JSON.parse(profile) && Object.keys(JSON.parse(profile)).length != 0 && JSON.parse(profile).group.role;
}

export const getCurrUserID = (profile) => {
    return JSON.parse(profile) && Object.keys(JSON.parse(profile)).length != 0 && JSON.parse(profile)?.id;
}

export const checkRoleUser = (profile, role) => { return role === getCurrRoleUser(profile);}

export function checkPlanUser (profile) {
    let profileObj = JSON.parse(profile);
    return profileObj 
        && Object.keys(profileObj).length != 0 
        && (profileObj["plan"] !== undefined)
        && profileObj.plan.toUpperCase();
}

export const removeEmpty = (obj) => {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v != null && v != undefined && v != "")
        .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
    );
}

export function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const httpErrorHandler = (error) => {
    if (error === null) throw new Error('Unrecoverable error!! Error is null!')
    if (axios.isAxiosError(error)) {
      //here we have a type guard check, error inside this if will be treated as AxiosError
      const response = error?.response
      const request = error?.request
      const config = error?.config //here we have access the config used to make the api call (we can make a retry using this conf)
  
      if (error.code === 'ERR_NETWORK') {
        console.log('connection problems..')
      } else if (error.code === 'ERR_CANCELED') {
        console.log('connection canceled..')
      }
      if (response) {
        //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
        const statusCode = response?.status
        if (statusCode === 404) {
          console.log('The requested resource does not exist or has been deleted')
        } else if (statusCode === 401) {
          console.log('Please login to access this resource')
          //redirect user to login
        }
      } else if (request) {
        //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
      }
    }
    //Something happened in setting up the request and triggered an Error
    console.log(error.message)
  }