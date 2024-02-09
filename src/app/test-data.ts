import { InMemoryDbService } from "angular-in-memory-web-api"
export class TestData implements InMemoryDbService{
     createDb(){
        let userDetails=[
            
                { id: 101, firstName: 'Ketan', lastName:"deshmukh",  email: 'Ketan@gmail.com' ,Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 102, firstName: 'sujit',   lastName:"badoriya", email: 'sujit345@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir' },
                { id: 103, firstName: 'hitesh',lastName:"rawat",   email: 'hitesh945@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 104, firstName: 'Rajshree',lastName:"fgrae", email: 'Rajshree954@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 105, firstName: 'snehal', lastName:"bhosle",  email: 'snehal5432@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 106, firstName: 'Raj',   lastName:"ingle",   email: 'Raj305@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 107, firstName: 'vivek',  lastName:"deshmukh",  email: 'vivek506@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 108, firstName: 'Rajat',   lastName:"sharam", email: 'rajat879@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 109, firstName: 'suraj',  lastName:"shide",  email: 'suraj876@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
                { id: 1010, firstName: 'Narendra',lastName:"sharam",email: 'Narendra905@gmail.com',Phone: '9970166981',Address: 'sai vihar udgir'},
            
        ];

        //Test Data
        let welcomemsg="Welcome to angular world !";
        return {books:userDetails}
        
    }
}