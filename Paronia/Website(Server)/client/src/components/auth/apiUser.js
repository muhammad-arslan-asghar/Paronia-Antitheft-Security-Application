export const resetpass = (resetInfo) =>{
    // console.log(resetInfo);
    return fetch ( 'http://localhost:5000/api/users/reset/', {
        method: "PUT",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
         },
        body: JSON.stringify(resetInfo)
    }).then( res =>{
        return res.json();
    }).catch(err=> console.log(err));
}