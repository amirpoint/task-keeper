import { Injectable } from "@nestjs/common";




@Injectable()
export class AuthService{

    logIn(){
        return { msg: 'signed in.'};
    }
    

}