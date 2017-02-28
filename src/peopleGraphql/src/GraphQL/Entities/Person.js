/**
 * Created by niramsellem on 27.2.2017.
 */
import { City } from '../';

class Person {
    Id: Int
    Name: String
    NickName: String
    Job: String
    Location: City
    Mobile: String
    Mail: String

    constructor(Id:Int, Name:String, NickName:String, Job:String, Location:City, Mobile:String, Mail:String) {
        this.Id = Id;
        this.Name = Name;
        this.NickName = NickName;
        this.Job = Job;
        this.Location = Location;
        this.Mobile = Mobile;
        this.Mail = Mail;
    }
}

export { Person };