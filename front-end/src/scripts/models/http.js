export default{
    get({url, type='GET', data={}}){
        return $.ajax({
            url,
            type:"POST",
            data,
            success:(result)=>{
                // console.log(result);                
            }
        })
    }
}