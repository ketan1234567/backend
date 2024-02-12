import { InMemoryDbService } from "angular-in-memory-web-api"
export class TestData implements InMemoryDbService{
     createDb(){
        let userDetails=[
            
                { id: 101, firstName: 'Ketan', lastName:"deshmukh",  email: 'Ketan@gmail.com' ,Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 102, firstName: 'sujit',   lastName:"badoriya", email: 'sujit345@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir' },
                { id: 103, firstName: 'hitesh',lastName:"rawat",   email: 'hitesh945@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 104, firstName: 'Rajshree',lastName:"fgrae", email: 'Rajshree954@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 105, firstName: 'snehal', lastName:"bhosle",  email: 'snehal5432@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
               
            
        ];

        //Test Data
        let welcomemsg="Welcome to angular world !";
        return {books:userDetails}
        
    }
}