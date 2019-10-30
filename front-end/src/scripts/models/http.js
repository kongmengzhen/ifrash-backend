export default{
    get({url, type='GET', data={}}){
        return $.ajax({
            url,
            type,
            data,
            success:(result)=>{
                // console.log(result);                
            }
        })
    }
}