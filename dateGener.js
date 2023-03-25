
module.exports = datecall ;

function datecall(){
    var option = {
        weekday : "long",
        day : "numeric",
        month: "long"
    }
    
    var d = new Date() ;
    
    var FOO = d.toLocaleDateString("en-US" , option);

    return FOO ;
}